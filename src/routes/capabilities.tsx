import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SectionHeading";
import { capabilities, SITE_URL } from "@/lib/site-content";

const title = "Simulation Capabilities | CCIT Simulation";
const description =
  "Combustion, rotating machinery, FEA, marine hydrodynamics, and design optimisation using ANSYS Fluent, CFX, OpenFOAM, and Mechanical.";

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/capabilities` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/capabilities` }],
  }),
  component: CapabilitiesPage,
});

function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Beyond flow: a complete simulation partner"
        body="Fluids, heat, structures and optimisation under one roof, using ANSYS Fluent, CFX, OpenFOAM, and Mechanical."
      />
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title} className="border-l-2 border-primary/70 pl-4">
              <h2 className="text-base font-semibold text-ink">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}