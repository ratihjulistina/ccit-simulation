/**
 * Admin data access, straight from the browser.
 *
 * The static site has no server, so every admin read and write goes to the
 * database directly with the signed-in user's session. Database access rules
 * (RLS) are the security boundary: only accounts with the admin role can write.
 */
import { supabase } from "@/integrations/supabase/client";
import type { CaseStudy, CaseStudyInput, RichTextDoc } from "./case-studies.types";

const BUCKET = "case-study-images";

type Row = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  body: unknown;
  image_url: string | null;
  image_alt: string | null;
  published: boolean;
  updated_at: string;
};

function mapRow(row: Row): CaseStudy {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category ?? "",
    excerpt: row.excerpt ?? "",
    body: (row.body as RichTextDoc | null) ?? null,
    image: row.image_url ?? null,
    imageAlt: row.image_alt ?? "",
    published: row.published,
    updatedAt: row.updated_at,
  };
}

/** Storage object name for a stored image_url value, whatever format it uses. */
export function storagePathFromImageUrl(value: string | null): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) {
    const marker = `${BUCKET}/`;
    const index = value.indexOf(marker);
    return index === -1 ? null : decodeURIComponent(value.slice(index + marker.length));
  }
  const name = value.split("/").filter(Boolean).pop();
  return name ? decodeURIComponent(name) : null;
}

/** Temporary viewable URL for an admin preview (the bucket is not public). */
export async function previewImageUrl(value: string | null): Promise<string | null> {
  const path = storagePathFromImageUrl(value);
  if (!path) return null;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60);
  return data?.signedUrl ?? null;
}

export async function uploadCaseStudyImage(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  return path;
}

export async function getMyAdminStatus() {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user?.id;
  if (!userId) return { isAdmin: false };
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  return { isAdmin: Boolean(data) };
}

export async function adminListCaseStudies() {
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { items: ((data ?? []) as Row[]).map(mapRow) };
}

export async function adminGetCaseStudy(id: string) {
  const { data, error } = await supabase.from("case_studies").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return { item: data ? mapRow(data as Row) : null };
}

export async function adminSaveCaseStudy(input: CaseStudyInput) {
  const slug = input.slug.trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Use lowercase letters, numbers and dashes only in the URL slug.");
  }
  if (input.title.trim().length < 3) throw new Error("Please enter a title.");

  const payload = {
    slug,
    title: input.title.trim().slice(0, 160),
    category: input.category.trim().slice(0, 60),
    excerpt: input.excerpt.trim().slice(0, 400),
    body: input.body,
    image_url: input.imageUrl,
    image_alt: input.imageAlt.trim().slice(0, 200),
    published: input.published,
  };

  const query = input.id
    ? supabase.from("case_studies").update(payload).eq("id", input.id)
    : supabase.from("case_studies").insert(payload);

  const { data, error } = await query.select("id, slug").single();
  if (error) {
    throw new Error(
      error.code === "23505" ? "Another case study already uses that URL slug." : error.message,
    );
  }
  return data;
}

export async function adminDeleteCaseStudy(id: string) {
  const { error } = await supabase.from("case_studies").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function adminListCategories() {
  const { data: rows, error } = await supabase
    .from("case_study_categories")
    .select("id, name")
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);

  const { data: used, error: usedError } = await supabase.from("case_studies").select("category");
  if (usedError) throw new Error(usedError.message);

  const counts = new Map<string, number>();
  for (const row of used ?? []) {
    const key = (row.category ?? "").trim().toLowerCase();
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return {
    items: (rows ?? []).map((row) => ({
      id: row.id as string,
      name: row.name as string,
      usageCount: counts.get(String(row.name).toLowerCase()) ?? 0,
    })),
  };
}

export async function adminCreateCategory(name: string) {
  const value = name.trim().slice(0, 60);
  if (!value) throw new Error("Name is required.");
  const { error } = await supabase.from("case_study_categories").insert({ name: value });
  if (error) {
    throw new Error(error.code === "23505" ? "That category already exists." : error.message);
  }
  return { ok: true };
}

export async function adminRenameCategory(id: string, name: string) {
  const value = name.trim().slice(0, 60);
  if (!value) throw new Error("Name is required.");

  const { data: current, error: readError } = await supabase
    .from("case_study_categories")
    .select("name")
    .eq("id", id)
    .maybeSingle();
  if (readError) throw new Error(readError.message);
  if (!current) throw new Error("Category not found.");

  const { error } = await supabase
    .from("case_study_categories")
    .update({ name: value })
    .eq("id", id);
  if (error) {
    throw new Error(
      error.code === "23505" ? "Another category already uses that name." : error.message,
    );
  }

  if (current.name !== value) {
    const { error: cascadeError } = await supabase
      .from("case_studies")
      .update({ category: value })
      .eq("category", current.name);
    if (cascadeError) throw new Error(cascadeError.message);
  }
  return { ok: true };
}

export async function adminDeleteCategory(id: string) {
  const { data: current, error: readError } = await supabase
    .from("case_study_categories")
    .select("name")
    .eq("id", id)
    .maybeSingle();
  if (readError) throw new Error(readError.message);
  if (!current) throw new Error("Category not found.");

  const { count, error: countError } = await supabase
    .from("case_studies")
    .select("id", { count: "exact", head: true })
    .eq("category", current.name);
  if (countError) throw new Error(countError.message);
  if ((count ?? 0) > 0) {
    throw new Error(
      `${count} case stud${count === 1 ? "y" : "ies"} still use this category. Change them first.`,
    );
  }

  const { error } = await supabase.from("case_study_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}
