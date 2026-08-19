import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import { PageHero } from "@/components/SectionHeading";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE_URL } from "@/lib/site-content";
import { getCaseStudies } from "@/lib/case-studies.functions";

const title = "CFD Case Studies | CCIT Simulation Indonesia";
const description =
  "Selected computational fluid dynamics projects by CCIT Simulation — the engineering challenge, the simulation approach, the CFD results, and the client outcome.";

const caseStudiesQuery = queryOptions({
  queryKey: ["case-studies"],
  queryFn: () => getCaseStudies(),
});

export const Route = createFileRoute("/case-studies/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(caseStudiesQuery),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/case-studies` },
      { property: "og:image", content: `${SITE_URL}/og-case-studies.jpg` },
      { name: "twitter:image", content: `${SITE_URL}/og-case-studies.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/case-studies` }],
  }),
  component: CaseStudiesPage,
});

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_n: unknown, children: ReactNode) => (
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_n: unknown, children: ReactNode) => (
      <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">{children}</h3>
    ),
    [BLOCKS.HEADING_3]: (_n: unknown, children: ReactNode) => (
      <h4 className="mt-5 text-sm font-semibold text-ink">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_n: unknown, children: ReactNode) => (
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_n: unknown, children: ReactNode) => (
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_n: unknown, children: ReactNode) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_n: unknown, children: ReactNode) => (
      <blockquote className="mt-4 rounded-xl border-l-2 border-primary bg-muted/60 p-4">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
};

function CaseStudiesPage() {
  const { data } = useSuspenseQuery(caseStudiesQuery);

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Simulation work, from question to decision"
        body="Each project below follows the same structure: the engineering challenge, how we modelled and validated it, the CFD results, and what the client did next."
      />

      {(data.error || data.items.length === 0) && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="rounded-2xl border border-dashed border-border bg-muted/60 px-6 py-10 text-center text-sm text-muted-foreground">
            {data.error ?? "No case studies published yet — check back soon."}
          </p>
        </section>
      )}

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-14">
        {data.items.map((cs) => (
          <article
            key={cs.id}
            id={cs.slug}
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div className="flag-rule h-1.5 w-full" aria-hidden="true" />
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              {cs.image && (
                <img
                  src={cs.image}
                  width={900}
                  height={700}
                  loading="lazy"
                  alt={cs.imageAlt}
                  className="h-56 w-full object-cover lg:h-full"
                />
              )}
              <div className="p-8 md:p-10">
                {cs.category && (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                    {cs.category}
                  </span>
                )}
                <h2 className="mt-4 text-2xl font-bold text-ink">{cs.title}</h2>

                <div className="mt-4">
                  {cs.body
                    ? documentToReactComponents(cs.body as Document, richTextOptions)
                    : null}
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <ShareButtons
                    url={`${SITE_URL}/case-studies#${cs.slug}`}
                    title={`${cs.title} — CFD case study by CCIT Simulation`}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-2xl border border-border bg-muted/60 p-8 text-center">
          <h2 className="text-xl font-semibold text-ink">Have a similar problem?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Send your geometry and operating conditions — we reply with a scope, timeline, and
            fixed quotation within two working days.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
          >
            Discuss your project
          </Link>
        </div>
      </section>
    </>
  );
}
