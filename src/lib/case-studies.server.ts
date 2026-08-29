import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { CaseStudy, RichTextDoc } from "./case-studies.types";

type Row = Database["public"]["Tables"]["case_studies"]["Row"];

export function mapRow(row: Row): CaseStudy {
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

export function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;

  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}
