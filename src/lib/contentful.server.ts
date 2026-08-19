import type { Document } from "@contentful/rich-text-types";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/contentful";

export const CASE_STUDY_CONTENT_TYPE = "products";

export type CaseStudyEntry = {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string | null;
  imageAlt: string;
  body: Document | null;
  excerpt: string;
};

type ContentfulAsset = {
  sys: { id: string };
  fields?: { title?: string; description?: string; file?: { url?: string } };
};

type ContentfulEntry = {
  sys: { id: string };
  fields?: Record<string, unknown>;
};

function plainText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { nodeType?: string; value?: string; content?: unknown[] };
  if (n.nodeType === "text") return n.value ?? "";
  return (n.content ?? []).map(plainText).join("");
}

function toExcerpt(body: Document | null): string {
  const text = plainText(body).replace(/\s+/g, " ").trim();
  return text.length > 220 ? `${text.slice(0, 217).trimEnd()}…` : text;
}

function mapEntry(item: ContentfulEntry, assets: Map<string, ContentfulAsset>): CaseStudyEntry {
  const fields = item.fields ?? {};
  const imageLink = fields["image"] as { sys?: { id?: string } } | undefined;
  const asset = imageLink?.sys?.id ? assets.get(imageLink.sys.id) : undefined;
  const rawUrl = asset?.fields?.file?.url;
  const title = typeof fields["title"] === "string" ? (fields["title"] as string) : "Untitled case study";
  const body = (fields["body"] as Document | undefined) ?? null;

  return {
    id: item.sys.id,
    slug:
      typeof fields["slug"] === "string" && fields["slug"]
        ? (fields["slug"] as string)
        : item.sys.id,
    title,
    category: typeof fields["catagory"] === "string" ? (fields["catagory"] as string) : "",
    image: rawUrl ? (rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl) : null,
    imageAlt: asset?.fields?.description || asset?.fields?.title || `CFD result visualisation for ${title}`,
    body,
    excerpt: toExcerpt(body),
  };
}

async function requestEntries(query: string) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["CONTENTFUL_API_KEY"];
  const spaceId = process.env["CONTENTFUL_SPACE_ID"];

  if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
  if (!connectionKey) throw new Error("CONTENTFUL_API_KEY is not configured");
  if (!spaceId) throw new Error("CONTENTFUL_SPACE_ID is not configured");

  const response = await fetch(`${GATEWAY_URL}/spaces/${spaceId}/entries?${query}`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connectionKey,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Contentful request failed [${response.status}]: ${errorBody}`);
    throw new Error(`Contentful request failed [${response.status}]`);
  }

  return (await response.json()) as {
    items?: ContentfulEntry[];
    includes?: { Asset?: ContentfulAsset[] };
  };
}

function assetMap(json: { includes?: { Asset?: ContentfulAsset[] } }) {
  const assets = new Map<string, ContentfulAsset>();
  for (const asset of json.includes?.Asset ?? []) assets.set(asset.sys.id, asset);
  return assets;
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudyEntry | null> {
  const json = await requestEntries(
    `content_type=${CASE_STUDY_CONTENT_TYPE}&include=2&limit=1&fields.slug=${encodeURIComponent(slug)}`,
  );
  const assets = assetMap(json);
  const item = (json.items ?? [])[0];
  if (item) return mapEntry(item, assets);

  // Fallback: entries without a slug field use their entry id as slug.
  const all = await fetchCaseStudies();
  return all.find((entry) => entry.slug === slug) ?? null;
}

export async function fetchCaseStudies(): Promise<CaseStudyEntry[]> {
  const json = await requestEntries(
    `content_type=${CASE_STUDY_CONTENT_TYPE}&include=2&limit=50&order=-sys.createdAt`,
  );
  const assets = assetMap(json);
  return (json.items ?? []).map((item) => mapEntry(item, assets));
}
