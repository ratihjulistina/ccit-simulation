import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SectionHeading";
import { processSteps, SITE_URL } from "@/lib/site-content";

const title = "Our CFD Workflow | CCIT Simulation";
const description =
  "A transparent, validation-first CFD workflow: scoping, meshing, solving against benchmarks, and reporting decisions you can act on.";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/process` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/process` }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A transparent, validation-first workflow"
        body="You see the assumptions, the mesh study, and the validation basis — every step of the way."
      />
      <section className="mx-auto max-w-6xl px-5 py-20">
        <ol className="grid gap-6 md:grid-cols-4">
          {processSteps.map((p) => (
            <li key={p.step} className="rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-sm font-bold tracking-widest text-primary">{p.step}</span>
              <h2 className="mt-3 text-base font-semibold text-ink">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}