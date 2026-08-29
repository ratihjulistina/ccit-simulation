# Admin dashboard for case studies (replacing Contentful)

Yes — a small built-in dashboard is a better fit here. Contentful adds an external account, a paid quota (which already blocked the site), and a rigid schema. An in-app dashboard keeps everything in one place and works with the exact fields the cards already use.

## What you get

- A sign-in page. Anyone can create an account, but only accounts marked as admin can reach the dashboard or change anything.
- `/admin` dashboard: list of all case studies with published/draft status, plus New / Edit / Delete.
- Editor with the same fields as today: title, category, cover image (upload), excerpt, and a rich-text body (headings, bold/italic, lists, links).
- Cover images uploaded straight from the editor and stored in Cloud storage.
- Public `/case-studies` grid and `/case-studies/{slug}` detail pages read from the database. Drafts stay hidden from the public; admins can preview them.
- Contentful code and the dummy case studies are removed. The library starts empty, and the public page shows a friendly "case studies coming soon" state until you publish the first one.

## Steps

1. Enable Lovable Cloud (database, auth, storage, server code).
2. Create the `case_studies` table, a separate `user_roles` table for admin rights, and an image storage bucket with the right access rules.
3. Build the sign-in page and the protected `/admin` area.
4. Build the dashboard list and the case-study editor (with image upload and rich-text body).
5. Repoint the public case-study pages at the database; delete the Contentful and dummy modules.
6. Make you the first admin, then you can promote others from the dashboard.

## Technical details

- Table `public.case_studies`: `id`, `slug` (unique), `title`, `category`, `excerpt`, `body` (jsonb, rich-text document), `image_url`, `image_alt`, `published` (bool), `created_at`, `updated_at`. Explicit GRANTs; RLS: `anon`/`authenticated` SELECT where `published = true`; full write only via `has_role(auth.uid(),'admin')`.
- `public.user_roles` + `app_role` enum + security-definer `has_role()` per the standard pattern. Never store the role on a profile row.
- Storage bucket `case-study-images`: public read, admin-only write.
- Reads/writes go through `createServerFn` in `src/lib/case-studies.functions.ts`; admin mutations use `.middleware([requireSupabaseAuth])` and re-check `has_role` server-side. Zod validation on every input (slug format, lengths).
- Admin routes live under `src/routes/_authenticated/admin*` using the managed auth layout; the dashboard additionally checks admin role and shows "not authorised" otherwise. Public auth page at `/auth` (email + password).
- Rich text: keep the existing `@contentful/rich-text-react-renderer` renderer? No — switch the body to a Tiptap editor storing its own JSON, and render it with a small renderer component. `src/components/RichText.tsx` is updated accordingly.
- Deleted: `src/lib/contentful.server.ts`, `src/lib/case-studies.dummy.ts`, the Contentful connector usage.
- Existing head/meta, canonical tags, share buttons and card layout stay as they are.
