import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-cfd.jpg";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ClientLogos } from "@/components/ClientLogos";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { ServicesWheel } from "@/components/ServicesWheel";

import { industries, stats, successSecrets, SITE_URL } from "@/lib/site-content";

const title = "CCIT Simulation | CFD & Engineering Simulation Consulting";
const description =
  "CCIT Simulation is an Indonesian engineering consultancy delivering CFD, thermal, and FEA simulation services for energy, process, marine, and building industries.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: "CCIT Simulation | CFD Consulting Indonesia" },
      {
        property: "og:description",
        content:
          "Computational fluid dynamics, thermal, and structural simulation consulting from Indonesia. Validated engineering insight, faster design decisions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "PT CCIT Group Indonesia",
          description,
          url: SITE_URL,
          email: "admin@ccit.co.id",
          telephone: "+62-813-1523-9718",
          areaServed: "Indonesia",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Jl. KHM Usman No. 22A, Beji",
            addressLocality: "Depok",
            postalCode: "16425",
            addressRegion: "West Java",
            addressCountry: "ID",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="surface-ink relative overflow-hidden">
        <div className="grid-mesh animate-mesh-drift absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> CFD Consulting · Indonesia
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Simulation-driven engineering,{" "}
              <span className="text-gradient-red">solved with confidence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
              CCIT Simulation is an Indonesian engineering consultancy specialising in computational fluid dynamics, delivering high-precision simulation and engineering solutions for the global power, energy, mining, and HVAC industries.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
              >
                Start a project
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="flag-rule absolute -left-3 top-6 hidden h-40 w-1.5 rounded-full lg:block" aria-hidden="true" />
            <img
              src={heroImg}
              width={1600}
              height={1008}
              alt="CFD velocity streamlines over a turbine stage and a car body"
              className="animate-float-soft w-full rounded-2xl border border-white/10 shadow-[var(--shadow-card)]"
            />
          </Reveal>
        </div>
        <div className="relative border-t border-white/10">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-8 sm:grid-cols-4">
            {stats.map(([value, label], i) => (
              <Reveal key={label} delay={i * 100}>
                <dt className="font-display text-3xl font-bold text-primary">{value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-white/55">{label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <ClientLogos />

      <section className="surface-ink relative overflow-hidden">
        <div className="grid-mesh animate-mesh-drift absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
              Why we are different
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {successSecrets.title}: <span className="text-gradient-red">{successSecrets.subtitle}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75">{successSecrets.intro}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {successSecrets.points.map((point, i) => (
              <Reveal
                key={point.title}
                delay={i * 100}
                as="article"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-[transform,box-shadow,background] duration-500 hover:-translate-y-1.5 hover:bg-white/[0.06] hover:shadow-[var(--shadow-red)]"
              >
                <span className="font-display text-sm font-bold tracking-widest text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{point.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 max-w-4xl">
            <blockquote className="rounded-2xl border-l-4 border-primary bg-white/[0.05] p-6 backdrop-blur-sm lg:p-8">
              <p className="text-lg font-medium italic leading-relaxed text-white/90 lg:text-xl">
                “{successSecrets.closing}”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Engineering services backed by CFD"
            body="Practical support across the project lifecycle — from early feasibility to independent review."
          />
        </Reveal>
        <Reveal className="mt-12">
          <ServicesWheel />
        </Reveal>
        <Reveal className="mt-10">
          <Link to="/services" className="text-sm font-semibold text-primary hover:underline">
            See all services →
          </Link>
        </Reveal>
      </section>

      <section className="border-y border-border bg-muted/60">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              title="Trusted by engineering teams across the archipelago"
              body="Oil & gas, power, marine, buildings and manufacturing — each with its own codes, constraints, and validation basis."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, idx) => (
              <Reveal
                key={ind.name}
                delay={idx * 60}
                className="group relative h-48 overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]"
              >
                <img
                  src={ind.image}
                  alt={`${ind.name} industry`}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-10 text-sm font-semibold text-white">
                  {ind.name}
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      <section id="testimonials" className="mx-auto max-w-7xl px-5 py-20 scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="What engineering teams say about working with us"
            body="Real feedback from projects across energy, power, and process industries."
          />
        </Reveal>
        <TestimonialCarousel />

      </section>
    </>
  );
}

