/**
 * Build-time data export.
 *
 * Reads the published case studies from the database, downloads their cover
 * images into `public/case-study-images/`, and writes a JSON snapshot the
 * static site is built from. Run this before `vite build`.
 *
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (already in .env).
 */
import { createClient } from "@supabase/supabase-js";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const BUCKET = "case-study-images";
const ROOT = join(dirname(new URL(import.meta.url).pathname), "..");
const IMAGE_DIR = join(ROOT, "public", "case-study-images");
const DATA_FILE = join(ROOT, "src", "data", "case-studies.generated.json");

const url = process.env["VITE_SUPABASE_URL"] ?? process.env["SUPABASE_URL"];
const key =
  process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_PUBLISHABLE_KEY"];

if (!url || !key) {
  console.error(
    "Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY. Keep the .env file next to package.json.",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    },
  },
});

/** Storage object name for a stored image_url value (any historical format). */
function storagePath(value: string | null): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) {
    const marker = `${BUCKET}/`;
    const index = value.indexOf(marker);
    return index === -1 ? null : decodeURIComponent(value.slice(index + marker.length));
  }
  const name = value.split("/").filter(Boolean).pop();
  return name ? decodeURIComponent(name) : null;
}

async function main() {
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not read case studies:", error.message);
    process.exit(1);
  }

  await mkdir(IMAGE_DIR, { recursive: true });
  await mkdir(dirname(DATA_FILE), { recursive: true });

  const items = [];
  for (const row of data ?? []) {
    const path = storagePath(row.image_url as string | null);
    let image: string | null = null;

    if (path) {
      const download = await supabase.storage.from(BUCKET).download(path);
      if (download.error || !download.data) {
        console.warn(`  ! image missing for "${row.slug}" (${path}) — page will render without it`);
      } else {
        const bytes = new Uint8Array(await download.data.arrayBuffer());
        await writeFile(join(IMAGE_DIR, path), bytes);
        image = `/case-study-images/${encodeURIComponent(path)}`;
        console.log(`  + ${path} (${(bytes.length / 1024).toFixed(0)} KB)`);
      }
    }

    items.push({
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category ?? "",
      excerpt: row.excerpt ?? "",
      body: row.body ?? null,
      image,
      imageAlt: row.image_alt ?? "",
      published: true,
      updatedAt: row.updated_at,
    });
  }

  await writeFile(DATA_FILE, `${JSON.stringify({ items }, null, 2)}\n`);
  console.log(`\nExported ${items.length} published case studies to src/data/case-studies.generated.json`);
}

await main();
