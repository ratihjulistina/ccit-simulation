import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { Document } from "@contentful/rich-text-types";
import { PageHero } from "@/components/SectionHeading";
import { RichText } from "@/components/RichText";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE_URL } from "@/lib/site-content";
import { getCaseStudy } from "@/lib/case-studies.functions";

const caseStudyQuery = (slug: string) =>
  queryOptions({
    queryKey: ["case-study", slug],
    queryFn: () => getCaseStudy({ data: { slug } }),
  });

export const Route = createFileRoute("/case-studies/$slug")({
  loader: async ({ context, params }) => {
    const result = await context.queryClient.ensureQueryData(caseStudyQuery(params.slug));
    if (!result.item && !result.error) throw notFound();
    return {
      title: result.item?.title ?? "Case study",
      excerpt: result.item?.excerpt ?? "",
      image: result.item?.image ?? null,
      slug: params.slug,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case study unavailable | CCIT Simulation" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} | CFD Case Study — CCIT Simulation`;
    const description =
      loaderData.excerpt || "A computational fluid dynamics project delivered by CCIT Simulation Indonesia.";
    const image = loaderData.image ?? `${SITE_URL}/og-case-studies.jpg`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/case-studies/${loaderData.slug}` },
        { property: "og:image", content: image },
        { name: "twitter:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/case-studies/${loaderData.slug}` }],
    };
  },
  notFoundComponent: CaseStudyNotFound,
  component: CaseStudyDetail,
});

function CaseStudyNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-2xl font-bold text-ink">Case study not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The project you are looking for may have been moved or unpublished.
      </p>
      <Link to="/case-studies" className="mt-6 inline-flex text-sm font-semibold text-primary">
        ← Back to all case studies
      </Link>
    </section>
  );
}

function CaseStudyDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(caseStudyQuery(slug));
  const cs = data.item;

  if (!cs) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="text-sm text-muted-foreground">
          {data.error ?? "This case study is unavailable right now."}
        </p>
        <Link to="/case-studies" className="mt-6 inline-flex text-sm font-semibold text-primary">
          ← Back to all case studies
        </Link>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow={cs.category || "Case study"} title={cs.title} body={cs.excerpt} />

      <article className="mx-auto max-w-3xl px-5 py-14">
        <Link to="/case-studies" className="text-sm font-semibold text-primary">
          ← All case studies
        </Link>

        {cs.image && (
          <img
            src={cs.image}
            width={1200}
            height={720}
            alt={cs.imageAlt}
            className="mt-6 w-full rounded-3xl border border-border object-cover"
          />
        )}

        <div className="mt-6">{cs.body ? <RichText document={cs.body as Document} /> : null}</div>

        <div className="mt-10 border-t border-border pt-6">
          <ShareButtons
            url={`${SITE_URL}/case-studies/${cs.slug}`}
            title={`${cs.title} — CFD case study by CCIT Simulation`}
          />
        </div>
      </article>
    </>
  );
}
