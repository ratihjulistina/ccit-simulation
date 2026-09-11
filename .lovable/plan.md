# Complete static-site migration

Finish converting the CCIT Simulation site from a dynamic TanStack Start app into a fully static site that can be uploaded to cPanel. The admin dashboard stays editable, but changes only appear on the public site after a rebuild and re-upload.

## What will change

- Public `/case-studies` and `/case-studies/<slug>` pages will read from a build-time JSON snapshot instead of the database.
- Case-study cover images will be downloaded into `public/case-study-images/` during the build and served as local static files.
- Admin pages will talk directly to Supabase from the browser (no server functions) for sign-in, case-study CRUD, and category CRUD.
- The invite/revoke-admin feature will be removed, keeping only the existing admin account(s).
- Server functions, the image proxy, and server-only Supabase service-role usage will be removed from public/admin code paths.
- The build will prerender every public page into static HTML.
- An Apache `.htaccess` file and README will be added for cPanel deployment.

## Technical steps

1. **Public case-study data**
   - Update `src/routes/case-studies.index.tsx` to import `publishedCaseStudies` from `src/lib/case-studies.static.ts` and render it directly.
   - Update `src/routes/case-studies.$slug.tsx` to look up the slug in `findPublishedCaseStudy` from the static module.
   - Keep the existing head/SEO/share metadata; only the data source changes.

2. **Admin routes use browser Supabase**
   - Rewrite `src/routes/_authenticated/admin.index.tsx` to import helpers from `src/lib/case-studies.data.ts` instead of `case-studies.functions.ts`.
   - Remove the `AdminManager` invite/revoke UI and the `claimFirstAdmin` flow. Keep a simple "You don't have admin access" message for non-admins.
   - Rewrite `src/routes/_authenticated/admin.$id.tsx` to use `case-studies.data.ts` for load/save and browser storage upload.
   - Rewrite `src/routes/_authenticated/admin.categories.tsx` to use `case-studies.data.ts` for category CRUD.
   - Keep the auth layout at `src/routes/_authenticated/route.tsx` so `/admin` still requires sign-in.

3. **Image paths**
   - Update the admin upload flow so new images are stored in Supabase Storage and referenced by object path.
   - Update `scripts/generate-static-data.ts` to rewrite every published case-study image URL to `/case-study-images/<filename>` in the generated JSON.
   - Download each image into `public/case-study-images/` during the prebuild step.

4. **Build-time page list for prerendering**
   - Make `scripts/generate-static-data.ts` also write `src/data/prerender-pages.json` containing every public route plus each published case-study slug.
   - Update `vite.config.ts` to read that JSON and pass the full list to `tanstackStart.pages`, with `prerender.enabled: true` and `autoStaticPathsDiscovery: false`.

5. **Scripts and cleanup**
   - Add a `prebuild` script in `package.json` that runs `scripts/generate-static-data.ts` before `vite build`.
   - Delete `src/lib/case-studies.functions.ts`, `src/lib/case-studies.server.ts`, and `src/routes/api/public/case-study-image.$.ts`.
   - Remove `src/routes/set-password.tsx` (no longer needed without email invites).
   - Remove the `useServerFn` import and related calls from admin routes.

6. **cPanel deployment files**
   - Add `public/.htaccess` with clean URL rewrites to `index.html` and cache headers for static assets.
   - Add `DEPLOY.md` with step-by-step instructions: install Bun, copy `.env`, run `bun install`, run `bun run build`, upload the `dist/` folder to cPanel public_html.

7. **Verification**
   - Run `bunx tsc --noEmit` to confirm no type errors.
   - Run `bun run build` and confirm every public page is written as `dist/<route>/index.html`.
   - Confirm case-study images appear in `dist/case-study-images/`.

## Trade-off to confirm

After this change, editing a case study in `/admin` updates the database immediately, but visitors still see the old version until you run `bun run build` and re-upload the `dist/` folder to cPanel. This matches the goal of a static cPanel-hosted site.
