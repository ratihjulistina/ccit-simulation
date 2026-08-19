import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SectionHeading";
import { industries, SITE_URL } from "@/lib/site-content";

const title = "Industries We Serve | CCIT Simulation Indonesia";
const description =
  "CFD and FEA consulting for oil & gas, power generation, petrochemical, marine, HVAC, automotive, mining, and food & pharma clients across Indonesia.";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/industries` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/industries` }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Trusted by engineering teams across the archipelago"
        body="From offshore platforms to shipyards and process plants, we adapt the modelling approach to your sector's codes and realities."
      />
      <section className="mx-auto max-w-6xl px-5 py-20">
        <ul className="flex flex-wrap gap-3">
          {industries.map((i) => (
            <li
              key={i}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink"
            >
              {i}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}