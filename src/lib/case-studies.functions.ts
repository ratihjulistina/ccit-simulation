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
