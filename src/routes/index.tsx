import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-cfd.jpg";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ClientLogos } from "@/components/ClientLogos";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";


import { services, industries, stats, capabilities, processSteps, successSecrets, SITE_URL } from "@/lib/site-content";

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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <Reveal
                key={s.title}
                delay={i * 80}
                as="article"
                className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow,opacity] duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-red)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Reveal>
            );
          })}
        </div>
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
          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((i, idx) => (
              <Reveal
                key={i}
                as="span"
                delay={idx * 60}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                {i}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="mx-auto max-w-7xl px-5 py-20 scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="Beyond flow: a complete simulation partner"
            body="Fluids, heat, structures and optimisation under one roof, using ANSYS Fluent, CFX, OpenFOAM, and Mechanical."
          />
        </Reveal>
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="border-l-2 border-primary/70 pl-4">
              <h3 className="text-base font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="process" className="border-t border-border bg-muted/60 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="A transparent, validation-first workflow"
              body="You see the assumptions, the mesh study, and the validation basis — every step of the way."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {processSteps.map((p, i) => (
              <Reveal
                key={p.step}
                delay={i * 100}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="font-display text-sm font-bold tracking-widest text-primary">{p.step}</span>
                <h3 className="mt-3 text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link to="/contact" className="text-sm font-semibold text-primary hover:underline">
              Discuss your project with us →
            </Link>
          </Reveal>
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

