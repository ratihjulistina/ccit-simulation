# Static site for cPanel hosting

Turn the site into plain HTML/CSS/JS files you can upload to cPanel. No server code, no Node process on the host.

## What changes

Right now the site needs a running server for three things: reading case studies, the admin dashboard, and serving case-study pictures out of private storage. All three get reworked.

- **Every page becomes a real HTML file** — home, services, case studies, projects & training, about, our team, contact, and one file per case study. Direct links and social sharing keep working, and search engines still see the full text.
- **Case-study pictures get copied into the site itself** during the build, so they load from your own hosting with no backend call. This also fixes the local-preview problem you asked about earlier.
- **Contact form stays as is** — it opens the visitor's email app, which needs no server.
- **WhatsApp button, share buttons, animations, fonts and design** are unchanged.

## The admin dashboard

The admin area keeps working for signing in and adding, editing or deleting case studies and categories — it talks to the database straight from the browser. Inviting new admins by email is dropped, since that step can only run on a server; admins who already have accounts keep their access.

Important trade-off: because the public pages are now fixed files, **a case study you add or edit in the admin area will not appear on the cPanel site until the site is rebuilt and re-uploaded.** The admin area is where you write content; publishing to the live site becomes a separate upload step.

## How you will publish

1. Run the build on your computer (one command).
2. Upload the contents of the output folder to `public_html` in cPanel.

I will include a short README with the exact commands.

## Steps

1. Switch the build to static output, prerendering every page including one per case study.
2. Replace all server functions with direct browser calls to the database using the public key, protected by database access rules.
3. Remove the server-only pieces: admin invite/revoke by email, the image proxy route, and the service-key client.
4. Add database access rules so published case studies and categories are readable by the public, and writes stay admin-only.
5. Download case-study images into the site at build time and point the pages at those local files.
6. Add a small `.htaccess` for clean URLs and caching on Apache/cPanel.
7. Write the build-and-upload README, then verify every page renders as a static file.

## Technical details

- `vite.config.ts`: `tanstackStart.prerender = { enabled: true, autoStaticPathsDiscovery: false }`, explicit `pages` list for all static routes plus `/case-studies/<slug>` for each published row, generated from the database at build time via a prebuild script. Confirm `@lovable.dev/vite-tanstack-config` >= 2.20.0 first (currently `^2.15.0`, so it needs bumping).
- Admin routes stay `ssr: false` and are excluded from prerender; they run as a client-only SPA shell.
- `src/lib/case-studies.functions.ts` is replaced by `src/lib/case-studies.data.ts` using the browser `supabase` client. `getPublishedCaseStudies`/`getPublishedCaseStudy` become build-time data + client fallback.
- Delete: `src/routes/api/public/case-study-image.$.ts`, `grantAdminByEmail`, `revokeAdmin`, `listAdmins`, all `requireSupabaseAuth` usage, and `attachSupabaseAuth` from `src/start.ts`.
- Migration: `TO anon` SELECT policies on `public.case_studies` (`published = true`) and `public.case_study_categories`; keep admin-only write policies via `has_role`. Add `GRANT SELECT ... TO anon` on both tables.
- Images: prebuild script downloads each `case-study-images` object with the service key into `public/case-study-images/<file>`; `image_url` values are mapped to `/case-study-images/<file>` at render time (existing `/api/public/case-study-image/` values map by filename, so no data migration needed). Absolute OG image URLs stay `${SITE_URL}/case-study-images/<file>`.
- `.htaccess`: `Options -MultiViews`, extensionless-URL rewrite to `<path>/index.html`, 404 to the prerendered 404 page, long cache headers for `/assets` and images.
- Admin image upload continues to write to the storage bucket from the browser under the existing admin-only storage policies; the prebuild script pulls new uploads down on the next build.
