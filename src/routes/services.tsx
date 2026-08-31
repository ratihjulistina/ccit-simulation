import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/components/SectionHeading";
import { services, SITE_URL } from "@/lib/site-content";
import { ClipboardCheck, Search, Wrench, FileSearch, Lightbulb, BarChart3, ShieldAlert, Gauge, Scale } from "lucide-react";

const title = "Engineering Services | CCIT Simulation Indonesia";
const description =
  "Feasibility studies, root-cause analysis, troubleshooting, design review, and independent engineering reviews backed by CFD simulation.";

const icons = [ClipboardCheck, Search, Wrench, FileSearch, Lightbulb, BarChart3, ShieldAlert, Gauge, Scale];

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
        title="Engineering services backed by CFD"
        body="Practical support across the project lifecycle — from early feasibility to independent review."
      />
      <section className="mx-auto max-w-7xl px-5 py-20">
        <Reveal>
          <SectionHeading
            eyebrow="What we solve"
            title="Nine ways we help engineering teams decide"
            body="Each engagement is scoped around a clear decision, delivered with documented analysis and actionable recommendations."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <Reveal
                as="article"
                key={s.title}
                delay={i * 80}
                className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow,opacity] duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-red)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-ink">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}