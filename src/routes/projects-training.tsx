import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SectionHeading";
import { SITE_URL } from "@/lib/site-content";

const title = "Projects & Training | CCIT Simulation";
const description =
  "Industrial simulation projects and hands-on CFD training programmes from CCIT Simulation — in-house workshops, mentoring, and capability building for Indonesian engineering teams.";

const programmes = [
  {
    name: "CFD Fundamentals",
    duration: "3 days",
    body: "Governing equations, turbulence modelling choices, meshing strategy, and solver setup — taught on your own geometry.",
  },
  {
    name: "Applied Thermal & CHT",
    duration: "2 days",
    body: "Conjugate heat transfer for electronics, HVAC, and process equipment, including radiation and validation practice.",
  },
  {
    name: "Multiphase & Process Flow",
    duration: "3 days",
    body: "VOF and Euler–Euler workflows for separators, mixing tanks, slug flow, and erosion assessment.",
  },
  {
    name: "FEA & Structural Integrity",
    duration: "2 days",
    body: "Static, fatigue, and vibration analysis with code-compliant post-processing and FSI coupling basics.",
  },
];

const projectTypes = [
  {
    name: "Turnkey simulation projects",
    body: "We take the engineering question end to end: scoping, modelling, validation, and a decision-ready report.",
  },
  {
    name: "Embedded engineering support",
    body: "Our analysts work alongside your design team through a design cycle, on retainer or per sprint.",
  },
  {
    name: "Simulation audit & second opinion",
    body: "Independent review of an existing model, mesh, and solver setup before you commit capital.",
  },
  {
    name: "In-house capability build-out",
    body: "Templates, best-practice guides, and mentoring so your team can own the workflow after handover.",
  },
];

export const Route = createFileRoute("/projects-training")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/projects-training` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/projects-training` }],
  }),
  component: ProjectsTrainingPage,
});

function ProjectsTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects & Training"
        title="Delivered projects, and the training to run them yourself"
        body="We deliver simulation work for industry, and we teach engineering teams to build the same capability in-house."
      />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">How we engage on projects</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projectTypes.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <h3 className="text-base font-semibold text-ink">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
        <Link to="/case-studies" className="mt-8 inline-block text-sm font-semibold text-primary hover:underline">
          Browse our case studies →
        </Link>
      </section>

      <section className="border-t border-border bg-muted/60">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">Training programmes</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Run on-site in Jakarta and across Indonesia, or online. Every session is worked on your
            real geometry so the outcome is a usable workflow, not slideware.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {programmes.map((c) => (
              <div key={c.name} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-semibold text-ink">{c.name}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {c.duration}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-10 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
          >
            Request a training schedule
          </Link>
        </div>
      </section>
    </>
  );
}
