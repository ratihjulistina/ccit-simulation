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
};

type ContentfulAsset = {
  sys: { id: string };
  fields?: { title?: string; description?: string; file?: { url?: string } };
};

type ContentfulEntry = {
  sys: { id: string };
  fields?: Record<string, unknown>;
};

export async function fetchCaseStudies(): Promise<CaseStudyEntry[]> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["CONTENTFUL_API_KEY"];
  const spaceId = process.env["CONTENTFUL_SPACE_ID"];

  if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
  if (!connectionKey) throw new Error("CONTENTFUL_API_KEY is not configured");
  if (!spaceId) throw new Error("CONTENTFUL_SPACE_ID is not configured");

  const url = `${GATEWAY_URL}/spaces/${spaceId}/entries?content_type=${CASE_STUDY_CONTENT_TYPE}&include=2&limit=50&order=-sys.createdAt`;

  const response = await fetch(url, {
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

  const json = (await response.json()) as {
    items?: ContentfulEntry[];
    includes?: { Asset?: ContentfulAsset[] };
  };

  const assets = new Map<string, ContentfulAsset>();
  for (const asset of json.includes?.Asset ?? []) assets.set(asset.sys.id, asset);

  return (json.items ?? []).map((item) => {
    const fields = item.fields ?? {};
    const imageLink = fields["image"] as { sys?: { id?: string } } | undefined;
    const asset = imageLink?.sys?.id ? assets.get(imageLink.sys.id) : undefined;
    const rawUrl = asset?.fields?.file?.url;

    const title = typeof fields["title"] === "string" ? (fields["title"] as string) : "Untitled case study";

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
      body: (fields["body"] as Document | undefined) ?? null,
    };
  });
}
