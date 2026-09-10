import generated from "@/data/case-studies.generated.json";
import type { CaseStudy, RichTextDoc } from "./case-studies.types";

type GeneratedItem = Omit<CaseStudy, "body"> & { body: unknown };

/**
 * Published case studies, baked into the site at build time by
 * `scripts/generate-static-data.ts`. No network call at runtime.
 */
export const publishedCaseStudies: CaseStudy[] = (
  (generated as { items: GeneratedItem[] }).items ?? []
).map((item) => ({ ...item, body: (item.body as RichTextDoc | null) ?? null }));

export function findPublishedCaseStudy(slug: string): CaseStudy | null {
  return publishedCaseStudies.find((item) => item.slug === slug) ?? null;
}

export const publishedCaseStudySlugs = publishedCaseStudies.map((item) => item.slug);
