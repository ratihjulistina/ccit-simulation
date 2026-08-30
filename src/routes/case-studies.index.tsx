import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { SITE_URL } from "@/lib/site-content";
import { getPublishedCaseStudies } from "@/lib/case-studies.functions";

const title = "CFD Case Studies | CCIT Simulation Indonesia";
const description =
  "Selected computational fluid dynamics projects by CCIT Simulation — the engineering challenge, the simulation approach, the CFD results, and the client outcome.";

const caseStudiesQuery = queryOptions({
  queryKey: ["case-studies"],
  queryFn: () => getPublishedCaseStudies(),
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

function CaseStudiesPage() {
  const { data } = useSuspenseQuery(caseStudiesQuery);
  const items = data.items;
  const showEmptyState = items.length === 0;

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Simulation work, from question to decision"
        body="Each project below follows the same structure: the engineering challenge, how we modelled and validated it, the CFD results, and what the client did next."
      />

      {showEmptyState && (
        <section className="mx-auto max-w-7xl px-5 pt-16">
          <p className="rounded-2xl border border-dashed border-border bg-muted/60 px-6 py-4 text-center text-sm text-muted-foreground">
            {data.error ?? "New case studies are being prepared and will appear here soon."}
          </p>
        </section>
      )}

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((cs, i) => (
          <Reveal key={cs.id} delay={i * 100} className="flex">
          <Link
            to="/case-studies/$slug"
            params={{ slug: cs.slug }}
            className="group flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-red)]"
          >
            <div className="flag-rule h-1.5 w-full" aria-hidden="true" />
            {cs.image && (
              <img
                src={cs.image}
                width={800}
                height={520}
                loading="lazy"
                alt={cs.imageAlt}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="flex flex-1 flex-col p-6">
              {cs.category && (
                <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                  {cs.category}
                </span>
              )}
              <h2 className="mt-3 text-lg font-bold text-ink">{cs.title}</h2>
              {cs.excerpt && (
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                  {cs.excerpt}
                </p>
              )}
              <span className="mt-5 text-sm font-semibold text-primary">Read full case study →</span>
            </div>
          </Link>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <Reveal className="rounded-2xl border border-border bg-muted/60 p-8 text-center">
          <h2 className="text-xl font-semibold text-ink">Have a similar problem?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Send your geometry and operating conditions — we reply with a scope, timeline, and fixed
            quotation within two working days.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
          >
            Discuss your project
          </Link>
        </Reveal>
      </section>
    </>
  );
}
