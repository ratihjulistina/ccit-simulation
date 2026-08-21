import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SectionHeading";
import { industries, stats, SITE_URL } from "@/lib/site-content";

const title = "About CCIT Simulation | CFD Consultancy Indonesia";
const description =
  "CCIT Simulation is an Indonesian engineering simulation consultancy in Jakarta, delivering validated CFD, thermal, and FEA studies for industry since day one.";

const values = [
  {
    title: "Validation before visuals",
    body: "Every model is benchmarked against test data, correlations, or field measurements before we draw a conclusion.",
  },
  {
    title: "Decisions, not reports",
    body: "We scope each study around the engineering decision you need to make, and we state the recommendation plainly.",
  },
  {
    title: "Local context, global standards",
    body: "Indonesian codes, climate, and site realities — modelled to the same rigour expected by international EPCs.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/about` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="An Indonesian simulation consultancy built by engineers"
        body="CCIT Simulation helps plants, shipyards, and manufacturers understand exactly what the flow, heat, and loads are doing inside their equipment."
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Who we are</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We are a Jakarta-based team of simulation engineers specialising in computational
              fluid dynamics, heat transfer, and structural analysis. Our work sits between design
              intent and physical reality: we build the model, prove it against evidence, and hand
              back a clear answer your team can act on.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Clients come to us to cut prototyping cost, de-risk retrofits, troubleshoot equipment
              that underperforms in the field, and to build simulation capability inside their own
              engineering departments.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-6 self-start rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            {stats.map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl font-bold text-primary">{value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-border bg-muted/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">How we think</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-l-2 border-primary/70 pl-4">
                <h3 className="text-base font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Industries we serve</h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {industries.map((i) => (
            <li
              key={i}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink"
            >
              {i}
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="mt-10 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
        >
          Talk to our team
        </Link>
      </section>
    </>
  );
}
