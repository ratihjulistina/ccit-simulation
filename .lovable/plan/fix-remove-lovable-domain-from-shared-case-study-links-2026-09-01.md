# Fix: Remove Lovable domain from shared case-study links

## Problem
The case-study share buttons and Open Graph tags still use the old Lovable preview URL `https://cfit-aero-indonesia.lovable.app`, so shared links contain "lovable" instead of the real CCIT domain.

## Solution
Replace every hardcoded `cfit-aero-indonesia.lovable.app` reference with the custom domain `https://ccitcfd.app`.

## Files to change
1. `src/lib/site-content.ts`
   - Change `SITE_URL` from `https://cfit-aero-indonesia.lovable.app` to `https://ccitcfd.app`.
   - This automatically fixes share buttons and `og:url`/`og:image` on case-study detail pages.

2. `public/sitemap.xml`
   - Update every `<loc>` entry to use `https://ccitcfd.app`.

3. `public/robots.txt`
   - Update the `Sitemap:` directive to `https://ccitcfd.app/sitemap.xml`.

## Out of scope
- `src/integrations/supabase/previewAuthStorage.ts` contains `lovable.app` as part of the preview-zone auth broker; this is correct and must stay unchanged.

## Verification
- Build the project and confirm no typecheck errors.
- Open a published case study and verify the share button URL and page source `og:url`/`canonical` point to `ccitcfd.app`.
