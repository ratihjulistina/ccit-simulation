# Remove Lovable branding and prepare for independent hosting

## Goal
Remove the visible “Edit with Lovable” badge and all Lovable-specific runtime/hosting dependencies so the site can be deployed independently, while keeping the existing Supabase backend and database.

## Current findings
- `publish_settings` reports `hide_badge: false` — the badge is injected by Lovable hosting.
- `src/lib/site-content.ts` still points to the wrong Lovable URL: `https://cfit-aero-indonesia.lovable.app`.
- `vite.config.ts` imports from `@lovable.dev/vite-tanstack-config`.
- `src/lib/lovable-error-reporting.ts` only exists to forward errors to the Lovable editor (`window.__lovableEvents`, `window.__lovableReportRuntimeError`).
- `src/integrations/supabase/previewAuthStorage.ts` is a Lovable preview-only auth broker.
- `src/integrations/supabase/cron-auth.ts` reads `LOVABLE_CRON_SECRET` / `LOVABLE_CRON_SECRET_PREVIOUS`.
- Auto-generated Supabase client files contain error messages that say “Connect Supabase in Lovable Cloud”.
- `AGENTS.md` and `README.md` contain Lovable-specific instructions.

## Plan

### 1. Hide the Lovable badge
- Call `publish_settings--set_badge_visibility` with `hide_badge: true` so the published/preview site no longer shows “Edit with Lovable”.

### 2. Remove Lovable-only runtime code
- Delete `src/lib/lovable-error-reporting.ts`.
- Remove its import and usage from `src/routes/__root.tsx` (error boundary report call).
- Replace `brokeredPreviewStorage()` in `src/integrations/supabase/client.ts` with standard `localStorage` persistence so auth works outside the Lovable preview iframe.
- Update `src/integrations/supabase/cron-auth.ts` to read a generic `CRON_SECRET` env variable instead of `LOVABLE_CRON_SECRET` / `LOVABLE_CRON_SECRET_PREVIOUS`.

### 3. Replace Lovable Vite configuration
- Rewrite `vite.config.ts` to use standard TanStack Start + Vite React + Tailwind CSS plugins instead of `@lovable.dev/vite-tanstack-config`.
- Keep the custom `src/server.ts` SSR wrapper wired as the server entry.
- Remove the `@lovable.dev/vite-tanstack-config` dependency from `package.json`.

### 4. Update site URL and environment messages
- Change `SITE_URL` in `src/lib/site-content.ts` to the real public domain (`https://ccitcfd.app` or `https://www.ccitcfd.app`).
- Replace “Connect Supabase in Lovable Cloud” messages in auto-generated Supabase files with neutral text.

### 5. Clean up Lovable-only documentation
- Replace `AGENTS.md` with a short project-specific contributor note.
- Rewrite `README.md` to describe the project and local dev setup without Lovable branding.

### 6. Verify independent build
- Run `bun install` after dependency changes.
- Run `bun run build` to confirm the project builds with the standard Vite/TanStack config.
- Check that the site still loads and the admin/auth flow works against the existing Supabase project.

### 7. Independent hosting guidance
- Document required environment variables: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`.
- Note that the project targets a Cloudflare Worker-style runtime (Nitro default from TanStack Start), so the host must support Node.js-compat Workers or the build target can be adjusted.

## Out of scope
- Migrating the Supabase project itself — the existing backend stays in place.
- Adding a new backend or replacing the auth system.
- Removing the Lovable Cloud connection from the backend (that happens outside the repo).
