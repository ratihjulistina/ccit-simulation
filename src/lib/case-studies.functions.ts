import { createServerFn } from "@tanstack/react-start";

export const getCaseStudies = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchCaseStudies } = await import("./contentful.server");
  try {
    return { items: await fetchCaseStudies(), error: null as string | null };
  } catch (error) {
    console.error("Failed to load case studies from Contentful", error);
    return { items: [], error: "Case studies are temporarily unavailable." };
  }
});

export const getCaseStudy = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug) }))
  .handler(async ({ data }) => {
    const { fetchCaseStudyBySlug } = await import("./contentful.server");
    try {
      return { item: await fetchCaseStudyBySlug(data.slug), error: null as string | null };
    } catch (error) {
      console.error("Failed to load case study from Contentful", error);
      return { item: null, error: "This case study is temporarily unavailable." };
    }
  });
