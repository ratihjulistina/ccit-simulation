# Make case-study images work when running locally

## Why they break locally

Case-study images are stored in a private storage bucket (`case-study-images`) and served through a server route (`/api/public/case-study-image/...`). That route uses the admin backend key (`SUPABASE_SERVICE_ROLE_KEY`), which exists on Lovable's servers but is **not** in your local `.env` — so on `bun run dev` the image requests fail and cards show no picture.

## Fix: public storage URLs instead of the proxy

Case-study cover images are public content anyway (they appear on the public website), so the simplest and most robust approach is to make the bucket public and use direct storage URLs. These URLs work identically in local dev, preview, and production — no secret key needed.

## Steps

1. **Make the bucket public** — set `public = true` on the `case-study-images` storage bucket.
2. **Update existing rows** — rewrite `image_url` in `case_studies` from `/api/public/case-study-image/<path>` to the full public storage URL `https://<backend>/storage/v1/object/public/case-study-images/<path>`.
3. **Update the admin editor** (`src/routes/_authenticated/admin.$id.tsx`) — after uploading, store the public storage URL (`supabase.storage.from(...).getPublicUrl(path)`) instead of the proxy path.
4. **Keep the proxy route** as a fallback (old links still work), but no code will generate new proxy URLs.
5. **Verify** — check `/case-studies` and a detail page in the preview; confirm the Open Graph share image logic in `case-studies.$slug.tsx` still produces an absolute URL (it already handles `http` URLs).

## Technical details

- Migration: `update storage.buckets set public = true where id = 'case-study-images';` plus an `UPDATE public.case_studies SET image_url = replace(image_url, '/api/public/case-study-image/', 'https://bnbufnnjepngwxpwhgkh.supabase.co/storage/v1/object/public/case-study-images/')` where the URL starts with the proxy prefix.
- Editor change: replace the manual `/api/public/case-study-image/${path}` string with `supabase.storage.from("case-study-images").getPublicUrl(path).data.publicUrl`.
- Storage write policy stays admin-only — making the bucket public only affects reads.
- No changes to auth, RLS policies, or any other feature.
