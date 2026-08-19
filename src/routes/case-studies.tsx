import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SectionHeading";
import { SITE_URL } from "@/lib/site-content";
import thermalImg from "@/assets/service-thermal.jpg";
import windImg from "@/assets/service-wind.jpg";
import multiphaseImg from "@/assets/service-multiphase.jpg";

const title = "CFD Case Studies | CCIT Simulation Indonesia";
const description =
  "Selected computational fluid dynamics projects by CCIT Simulation — the engineering challenge, the simulation approach, the CFD results, and the client outcome.";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/case-studies` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/case-studies` }],
  }),
  component: CaseStudiesPage,
});

type CaseStudy = {
  id: string;
  sector: string;
  discipline: string;
  title: string;
  image: string;
  challenge: string;
  approach: string;
  results: { label: string; value: string }[];
  outcome: string;
};

// TEMPLATE CONTENT — replace every [bracketed] value with real project data
// before publishing. Nothing here is a verified client claim.
const caseStudies: CaseStudy[] = [
  {
    id: "separator",
    sector: "[Oil & Gas]",
    discipline: "Multiphase flow",
    title: "[Three-phase separator internals redesign]",
    image: multiphaseImg,
    challenge:
      "[Describe the operational problem the client faced — e.g. liquid carry-over above spec at design throughput, forcing a production rate limit.]",
    approach:
      "[Describe the modelling approach — geometry source, mesh size and independence study, turbulence and multiphase models, boundary conditions, and how the baseline was validated.]",
    results: [
      { label: "[Carry-over reduction]", value: "[--%]" },
      { label: "[Mesh cells]", value: "[-- M]" },
      { label: "[Validation deviation]", value: "[±--%]" },
    ],
    outcome:
      "[State the client-facing result — what decision was made, what was avoided or gained, and over what timeframe. Only include figures the client has confirmed.]",
  },
  {
    id: "thermal",
    sector: "[Power Generation]",
    discipline: "Conjugate heat transfer",
    title: "[Heat exchanger thermal performance uprate]",
    image: thermalImg,
    challenge:
      "[Describe the thermal limitation — e.g. outlet temperature drifting outside the process window during high-ambient operation.]",
    approach:
      "[Describe the CHT setup — solid/fluid domains, radiation model, material properties, and the benchmark data used for validation.]",
    results: [
      { label: "[Duty improvement]", value: "[--%]" },
      { label: "[Peak metal temp]", value: "[-- °C]" },
      { label: "[Pressure drop change]", value: "[-- kPa]" },
    ],
    outcome:
      "[State the outcome — modification adopted, downtime avoided, or capital deferred. Confirmed figures only.]",
  },
  {
    id: "wind",
    sector: "[Building & HVAC]",
    discipline: "External aerodynamics",
    title: "[High-rise wind load and pedestrian comfort study]",
    image: windImg,
    challenge:
      "[Describe the design question — e.g. plaza-level wind speeds needed to be assessed against a comfort criterion before permit submission.]",
    approach:
      "[Describe the wind study setup — domain sizing, terrain roughness, wind rose and directional sectors, turbulence model, and the standard applied.]",
    results: [
      { label: "[Sectors simulated]", value: "[--]" },
      { label: "[Comfort criterion met]", value: "[--% of area]" },
      { label: "[Peak cladding pressure]", value: "[-- Pa]" },
    ],
    outcome:
      "[State what the client did with the result — mitigation adopted, approval obtained, redesign avoided.]",
  },
];

function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Simulation work, from question to decision"
        body="Each project below follows the same structure: the engineering challenge, how we modelled and validated it, the CFD results, and what the client did next."
      />

      <section className="mx-auto max-w-6xl px-5 pt-10">
        <p className="rounded-xl border border-dashed border-primary/50 bg-accent px-4 py-3 text-sm text-accent-foreground">
          <strong className="font-semibold">Template content.</strong> The three entries below are
          placeholders showing the case-study format. Replace every [bracketed] field with real
          project data and confirmed client figures before publishing this page.
        </p>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-14">
        {caseStudies.map((cs) => (
          <article
            key={cs.id}
            id={cs.id}
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div className="flag-rule h-1.5 w-full" aria-hidden="true" />
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              <img
                src={cs.image}
                width={900}
                height={700}
                loading="lazy"
                alt={`CFD result visualisation for ${cs.title}`}
                className="h-56 w-full object-cover lg:h-full"
              />
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                    {cs.sector}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    {cs.discipline}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-ink">{cs.title}</h2>

                <div className="mt-6 space-y-5 text-sm leading-relaxed">
                  <Block label="Challenge" body={cs.challenge} />
                  <Block label="Simulation approach" body={cs.approach} />
                </div>

                <dl className="mt-7 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                  {cs.results.map((r) => (
                    <div key={r.label}>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                        {r.label}
                      </dt>
                      <dd className="font-display mt-1 text-2xl font-bold text-primary">{r.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 rounded-xl border-l-2 border-primary bg-muted/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Client outcome
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cs.outcome}</p>
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

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-muted-foreground">{body}</p>
    </div>
  );
}
