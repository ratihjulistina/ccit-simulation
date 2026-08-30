export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type RichTextDoc = {
  type: string;
  content?: RichTextNode[] | undefined;
};

export type RichTextNode = {
  type: string;
  text?: string | undefined;
  attrs?: Record<string, JsonValue> | null | undefined;
  marks?: { type: string; attrs?: Record<string, JsonValue> | null | undefined }[] | undefined;
  content?: RichTextNode[] | undefined;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: RichTextDoc | null;
  image: string | null;
  imageAlt: string;
  published: boolean;
  updatedAt: string;
};

export type CaseStudyInput = {
  id?: string | null;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: RichTextDoc | null;
  imageUrl: string | null;
  imageAlt: string;
  published: boolean;
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
