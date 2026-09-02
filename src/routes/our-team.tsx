import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/our-team")({
  head: () => ({
    meta: [
      { title: "Our Team — CCIT Simulation" },
      {
        name: "description",
        content:
          "Meet the CFD and engineering simulation specialists behind CCIT Simulation, PT CCIT Group Indonesia.",
      },
      { property: "og:title", content: "Our Team — CCIT Simulation" },
      {
        property: "og:description",
        content:
          "Meet the CFD and engineering simulation specialists behind CCIT Simulation, PT CCIT Group Indonesia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurTeamPage,
});

function OurTeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Our people"
            title="Meet the team"
            subtitle="The engineers, researchers, and simulation specialists powering CCIT Simulation."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-8 text-center md:p-16">
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              Team profiles coming soon
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We are preparing detailed profiles for our CFD consultants,
              project engineers, and training leads. Check back shortly, or
              reach out if you would like to connect with a specialist now.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
            >
              Contact us
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
