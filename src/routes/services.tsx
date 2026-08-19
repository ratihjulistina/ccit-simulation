import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/components/SectionHeading";
import { services, SITE_URL } from "@/lib/site-content";

const title = "CFD Simulation Services | CCIT Simulation Indonesia";
const description =
  "Aerodynamics, thermal, and multiphase CFD simulation services for Indonesian energy, process, marine, and building projects.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/services` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="CFD expertise across the full flow spectrum"
        body="Every study is scoped around a decision you need to make — not a pretty picture."
      />
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="What we solve"
          title="Three core simulation practices"
          body="Each engagement is delivered with a documented mesh study, validation basis, and an actionable recommendation."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <img
                src={s.image}
                width={900}
                height={700}
                loading="lazy"
                alt={s.title}
                className="h-44 w-full object-cover"
              />
              <div className="flag-rule h-1 w-full" aria-hidden="true" />
              <div className="p-6">
                <h2 className="text-lg font-semibold text-ink">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}