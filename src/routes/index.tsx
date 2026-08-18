import { createFileRoute } from "@tanstack/react-router";
import { CcitMark } from "@/components/CcitLogo";
import heroImg from "@/assets/hero-cfd.jpg";
import thermalImg from "@/assets/service-thermal.jpg";
import windImg from "@/assets/service-wind.jpg";
import multiphaseImg from "@/assets/service-multiphase.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CCIT Simulation | CFD & Engineering Simulation Consulting" },
      {
        name: "description",
        content:
          "CCIT Simulation is an Indonesian engineering consultancy delivering CFD, thermal, and FEA simulation services for energy, process, marine, and building industries.",
      },
      { property: "og:title", content: "CCIT Simulation | CFD Consulting Indonesia" },
      {
        property: "og:description",
        content:
          "Computational fluid dynamics, thermal, and structural simulation consulting from Indonesia. Validated engineering insight, faster design decisions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    title: "Aerodynamics & External Flow",
    body: "Drag, lift, and wake analysis for vehicles, aircraft components, and wind-exposed structures using validated turbulence modelling.",
    image: windImg,
    tags: ["RANS / LES", "Wind loading", "Pedestrian comfort"],
  },
  {
    title: "Thermal & Heat Transfer",
    body: "Conjugate heat transfer, electronics cooling, HVAC, furnace and heat exchanger performance with conduction–convection–radiation coupling.",
    image: thermalImg,
    tags: ["CHT", "Electronics cooling", "Heat exchangers"],
  },
  {
    title: "Multiphase & Process Flow",
    body: "Slug flow, mixing, cavitation, erosion and separator studies for oil & gas, chemical, and water treatment systems.",
    image: multiphaseImg,
    tags: ["VOF / Euler", "Erosion", "Mixing"],
  },
];

const capabilities = [
  { title: "Combustion & Reacting Flow", body: "Burners, boilers, and flare systems with species transport and emissions prediction." },
  { title: "Rotating Machinery", body: "Pumps, fans, turbines and propellers — performance curves, cavitation, and MRF/sliding-mesh analysis." },
  { title: "FEA & Structural Integrity", body: "Static, fatigue, vibration, and FSI coupling to keep hardware inside code allowables." },
  { title: "Marine & Offshore Hydrodynamics", body: "Hull resistance, sloshing, mooring loads and green-water effects for Indonesian waters." },
  { title: "Design Optimisation", body: "Parametric sweeps and automated DOE to converge on the best geometry, not just a working one." },
  { title: "Training & Capability Building", body: "In-house CFD workshops so your engineering team can own the workflow after handover." },
];

const process = [
  { step: "01", title: "Scope & Objectives", body: "We translate your engineering question into measurable simulation targets and acceptance criteria." },
  { step: "02", title: "Model & Mesh", body: "Clean CAD, resolved boundary layers, and a mesh independence study — no black boxes." },
  { step: "03", title: "Solve & Validate", body: "Solver settings benchmarked against test data, correlations, or field measurements." },
  { step: "04", title: "Report & Decide", body: "Clear visuals, quantified margins, and a concrete design recommendation you can act on." },
];

const industries = [
  "Oil & Gas", "Power Generation", "Petrochemical", "Marine & Shipyard",
  "Building & HVAC", "Automotive", "Mining", "Food & Pharma",
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2.5">
            <CcitMark className="h-9 w-9 text-primary" />
            <span className="font-display text-base font-bold tracking-tight text-ink">
              CCIT <span className="text-primary">Simulation</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#services">Services</a>
            <a className="transition-colors hover:text-primary" href="#capabilities">Capabilities</a>
            <a className="transition-colors hover:text-primary" href="#process">Process</a>
            <a className="transition-colors hover:text-primary" href="#industries">Industries</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
          >
            Request a quote
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="surface-ink relative overflow-hidden">
          <div className="grid-mesh absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> CFD Consulting · Indonesia
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                Simulation-driven engineering,{" "}
                <span className="text-gradient-red">solved with confidence.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
                CCIT Simulation is an Indonesian engineering consultancy specialising in
                computational fluid dynamics. We help plants, shipyards, and manufacturers
                cut prototyping cost, de-risk designs, and understand exactly what the flow
                is doing inside their equipment.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
                >
                  Start a project
                </a>
                <a
                  href="#services"
                  className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Explore services
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="flag-rule absolute -left-3 top-6 hidden h-40 w-1.5 rounded-full lg:block" aria-hidden="true" />
              <img
                src={heroImg}
                width={1600}
                height={1008}
                alt="CFD velocity streamlines over a turbine stage and a car body"
                className="w-full rounded-2xl border border-white/10 shadow-[var(--shadow-card)]"
              />
            </div>
          </div>
          <div className="relative border-t border-white/10">
            <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 py-8 sm:grid-cols-4">
              {[
                ["120+", "Simulation studies delivered"],
                ["15+", "Industrial sectors served"],
                ["40%", "Average prototyping cost saved"],
                ["±5%", "Typical validation deviation"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-3xl font-bold text-primary">{value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-white/55">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading
            eyebrow="Services"
            title="CFD expertise across the full flow spectrum"
            body="Every study is scoped around a decision you need to make — not a pretty picture."
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
                  <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
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

        {/* Capabilities */}
        <section id="capabilities" className="border-y border-border bg-muted/60">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <SectionHeading
              eyebrow="Capabilities"
              title="Beyond flow: a complete simulation partner"
              body="Fluids, heat, structures and optimisation under one roof, using ANSYS Fluent, CFX, OpenFOAM, and Mechanical."
            />
            <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c) => (
                <div key={c.title} className="border-l-2 border-primary/70 pl-4">
                  <h3 className="text-base font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading
            eyebrow="How we work"
            title="A transparent, validation-first workflow"
            body="You see the assumptions, the mesh study, and the validation basis — every step of the way."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {process.map((p) => (
              <li key={p.step} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-sm font-bold tracking-widest text-primary">{p.step}</span>
                <h3 className="mt-3 text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Industries */}
        <section id="industries" className="surface-ink">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Industries</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
              Trusted by engineering teams across the archipelago
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              {industries.map((i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-primary hover:text-white"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-20">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flag-rule h-1.5 w-full" aria-hidden="true" />
            <div className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
              <div>
                <h2 className="text-3xl font-bold text-ink">Have a flow problem worth solving?</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Send us your geometry, operating conditions, and the question you need
                  answered. We reply with a scope, timeline, and fixed quotation within two
                  working days.
                </p>
                <div className="mt-8 space-y-3 text-sm">
                  <p className="font-semibold text-ink">CCIT Simulation</p>
                  <p className="text-muted-foreground">Jakarta, Indonesia</p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a className="font-medium text-primary hover:underline" href="mailto:info@ccitsimulation.com">
                      info@ccitsimulation.com
                    </a>
                  </p>
                </div>
              </div>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  window.location.href = `mailto:info@ccitsimulation.com?subject=${encodeURIComponent(
                    `CFD enquiry from ${String(data.get("name") ?? "")}`,
                  )}&body=${encodeURIComponent(String(data.get("message") ?? ""))}`;
                }}
              >
                <Field label="Name" name="name" placeholder="Your full name" />
                <Field label="Company email" name="email" type="email" placeholder="you@company.com" />
                <div>
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Project brief
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Geometry, operating conditions, and what you need to find out."
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
                >
                  Send enquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2.5">
            <CcitMark className="h-8 w-8 text-primary" />
            <span className="font-display font-semibold text-ink">CCIT Simulation</span>
          </span>
          <p>© {new Date().getFullYear()} CCIT Simulation · Engineering simulation consultancy, Indonesia</p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
