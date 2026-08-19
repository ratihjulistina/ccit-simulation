# Case studies from Contentful

Replace the hardcoded placeholder case studies on `/case-studies` with real entries pulled from your Contentful space.

## Steps

1. **Connect Contentful** — a connect card appears in chat; pick your Contentful account. This links the credentials (space ID + delivery key) to the project's server runtime. Nothing is exposed in the browser.
2. **Inspect your content type** — read the content type and a sample entry from your space to learn the real field names (title, sector, discipline, challenge, approach, result metrics, outcome, image).
3. **Fetch on the server** — add a server function that calls the Contentful Delivery API through the Lovable connector gateway, resolves linked entries and asset image URLs, and returns a clean list of case studies.
4. **Render the page** — the route loads that data and renders it with the existing card layout (challenge → approach → result metrics → client outcome → share buttons). The "template content" warning banner is removed.
5. **Fallbacks & SEO** — if Contentful is unreachable, show a short "case studies unavailable" message rather than a crash; keep per-entry anchors so share links still deep-link, and keep the page's existing meta/canonical tags.

Note: field names in your content type may not match the current layout one-to-one (e.g. results metrics). After step 2 I'll map what exists and tell you if anything on the card has no matching field.

## Technical details

- `src/lib/case-studies.functions.ts`: `createServerFn` calling `https://connector-gateway.lovable.dev/contentful/spaces/{CONTENTFUL_SPACE_ID}/entries?content_type=...&include=2` with `Authorization: Bearer LOVABLE_API_KEY` and `X-Connection-Api-Key: CONTENTFUL_API_KEY`, both read inside the handler.
- A `.server.ts` helper resolves `includes.Entry` / `includes.Asset` links and maps raw JSON to the existing `CaseStudy` type.
- Rich text fields, if used, render via `@contentful/rich-text-react-renderer` (added only if needed).
- `src/routes/case-studies.tsx`: loader uses `context.queryClient.ensureQueryData`, component uses `useSuspenseQuery`; card markup unchanged.
- No caching added (content stays fresh); can add later if you want.
