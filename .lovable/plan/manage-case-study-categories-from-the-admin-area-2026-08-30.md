# Manage case-study categories from the admin area

Today the category is typed free-hand in the case-study editor, so typos create near-duplicate labels. This adds a managed list of categories.

## What you get

- A new **Categories** page in the admin area (linked from the dashboard).
- Create a category, rename it, delete it.
- Renaming a category automatically updates every case study using it.
- Deleting a category is blocked while case studies still use it — the page tells you how many, so you rename or reassign first.
- In the case-study editor, Category becomes a dropdown of your categories (plus a "no category" option) instead of a free-text box.
- Existing category values already in your case studies are imported into the list, so nothing is lost.

## Steps

1. Add a `categories` table with admin-only write access and public read.
2. Import the distinct category names already used by existing case studies.
3. Add admin server functions: list, create, rename (with cascade), delete (guarded).
4. Build the `/admin/categories` page and link it from the dashboard.
5. Switch the case-study editor's Category field to a dropdown.

## Technical details

- New table `public.case_study_categories`: `id`, `name` (unique, citext-style unique index on lower(name)), `created_at`, `updated_at` + existing `set_updated_at` trigger. GRANTs: `SELECT` to `anon`/`authenticated`, full write to `authenticated` gated by `has_role(auth.uid(),'admin')` policies, `ALL` to `service_role`.
- `case_studies.category` stays a text column (no FK), keeping public reads and the existing card UI unchanged. Rename runs an `UPDATE public.case_studies SET category = new WHERE category = old` inside the same admin server function.
- New server fns in `src/lib/case-studies.functions.ts`: `adminListCategories`, `adminCreateCategory`, `adminRenameCategory`, `adminDeleteCategory` — all `.middleware([requireSupabaseAuth])` with an explicit `has_role` re-check and Zod validation (1–60 chars, trimmed, unique case-insensitive).
- New route `src/routes/_authenticated/admin.categories.tsx` (`createFileRoute("/_authenticated/admin/categories")`) styled like the existing dashboard, using sonner toasts.
- `src/routes/_authenticated/admin.$id.tsx`: replace the category `<input>` with a `<select>` fed by `adminListCategories`; if a case study holds a category no longer in the list, it is shown as a selectable legacy option so saving doesn't silently drop it.
