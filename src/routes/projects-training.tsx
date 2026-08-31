import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { SITE_URL } from "@/lib/site-content";
import trainingReinhardtAsset from "@/assets/training-reinhardt-2024.jpg.asset.json";
import trainingClassAsset from "@/assets/training-class-2024.jpg.asset.json";

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

const portfolio = [
  {
    number: "01",
    name: "Thermal Dispersion & Environmental Impact",
    specialty:
      "Modeling the interaction between industrial discharge and the natural ecosystem to ensure regulatory compliance and operational efficiency.",
    body: "CCIT is a leader in simulating thermal plumes and sedimentation for large-scale power plants and reclamation projects. Our work ensures that cooling water systems remain efficient even as coastal landscapes change.",
    items: [
      {
        title: "PLTU Muara Karang & Tanjung Priok",
        client: "PT PLN, PT PJB, TEPSCO",
        body: "Extensive studies on the impact of North Jakarta reclamation on cooling water systems, including thermal dispersion and sedimentation modeling.",
      },
      {
        title: "PLTU Suralaya",
        client: "PT Rekayasa Industri, PT Lemtek",
        body: "Multiple recalculations and site investigations (Units 1–8) for thermal dispersion and deflector region reclamation.",
      },
      {
        title: "PLTU Lontar & PLTU Banten",
        client: "Lemtek UI",
        body: "Thermal dispersion analysis for coastal power plant sustainability.",
      },
      {
        title: "PLTU I West Kalimantan",
        client: "PT Praba Indo Persada",
        body: "Combined thermal dispersion and fly ash dispersion analysis to assess environmental footprint.",
      },
      {
        title: "PLTU Sofifi & Takalar",
        client: "PT Pusaka Jaya, PT PLN Enjiniring",
        body: "3D mathematical modeling for site investigation and heat distribution.",
      },
    ],
  },
  {
    number: "02",
    name: "Power Plant Component Optimization & Redesign",
    specialty:
      "Utilizing CFD to identify mechanical failures, improve heat transfer, and redesign critical equipment for life extension.",
    body: "We move beyond diagnosis to provide engineering redesigns that solve persistent operational issues in high-pressure environments.",
    items: [
      {
        title: "CO2 Stripper Reboiler 61-105 C",
        client: "PT Pupuk Iskandar Muda (PIM)",
        body: "CFD evaluation and successful redesign of the CO2 Stripper Reboiler.",
      },
      {
        title: "PLTU Suralaya 8",
        client: "PLN Pusenlis",
        body: "Engineering design for the Economizer Hopper and ash distribution systems.",
      },
      {
        title: "PLTU Jeranjang",
        client: "PLN Pusharlis",
        body: "Fluid flow simulation inside the Unit #3 Boiler to optimize performance.",
      },
      {
        title: "LP & High Pressure Heaters",
        client: "PT PJB Muara Karang",
        body: "Failure analysis and structural redesign of Low Pressure (LP) and High Pressure Heaters (HPH).",
      },
      {
        title: "Air Cooled Heat Exchanger",
        client: "PT Permina",
        body: "Assessment and reuse analysis of an Air Cooled Heat Exchanger after 13 years of dormancy.",
      },
    ],
  },
  {
    number: "03",
    name: "Combustion, Fuels, and Aerodynamics",
    specialty:
      "Precise modeling of flame characteristics and aerodynamic behavior to support energy transition and efficiency.",
    body: "Our proprietary code, CFDSOF, allows us to model complex chemical reactions and aerodynamic forces that commercial software often struggles to capture.",
    items: [
      {
        title: "PLTGU Muara Priok",
        client: "PT Indonesia Power, Koperasi PLN",
        body: "Advanced CFD analysis of Dual Fuel Combustion flame characteristics.",
      },
      {
        title: "PLTU Suralaya Units 1–7",
        client: "PT PLN Enjiniring",
        body: "Coal Wide Range Study to assess performance across varying fuel qualities.",
      },
      {
        title: "100 KW Wind Turbine",
        client: "Ministry of Energy (ESDM)",
        body: "Blade design and aerodynamic analysis for a 100 KW wind turbine project.",
      },
      {
        title: "Gondola Aerodynamics",
        client: "PT Rekayasa Industri",
        body: "Specialized calculation review for gondola structural aerodynamics.",
      },
    ],
  },
  {
    number: "04",
    name: "Oil, Gas, and Process Piping",
    specialty:
      "Flow assurance and stress analysis for high-stakes petrochemical and gas infrastructure.",
    body: "We provide rigorous analysis of fluid patterns and structural stresses to prevent pipeline failure and optimize compressor performance.",
    items: [
      {
        title: "Compressor Piping Headers",
        client: "PT Pertamina",
        body: "Analysis of fluid flow patterns within compressor piping headers to reduce vibration and optimize flow.",
      },
      {
        title: "Singa Pipeline",
        client: "PT Kelsri",
        body: "Comprehensive pipeline stress analysis for the Singa Pipeline.",
      },
      {
        title: "Fuel Oil Storage, PLTU #4",
        client: "PT PJB Muara Karang",
        body: "Fire protection system assessment for fuel oil storage.",
      },
      {
        title: "PLTU Riau (Siak River)",
        client: "PLTU Riau",
        body: "Hydrology and sedimentation study to ensure reliable water intake for inland power operations.",
      },
    ],
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
        title="Delivered Projects. Empowered Engineers."
        body="From complex CFD engineering projects to hands-on training, we deliver practical solutions and equip your team with the knowledge and skills to apply them independently."
      />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <Reveal as="span" className="block"><h2 className="text-2xl font-bold text-ink sm:text-3xl">How we engage on projects</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projectTypes.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 100}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1"
            >
              <h3 className="text-base font-semibold text-ink">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
        <Link to="/case-studies" className="mt-8 inline-block text-sm font-semibold text-primary hover:underline">
          Browse our case studies →
        </Link>
      </section>

      <section className="border-t border-border bg-muted/60">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <Reveal as="span" className="block"><h2 className="text-2xl font-bold text-ink sm:text-3xl">Portfolio</h2></Reveal>
          <Reveal as="span" className="block"><p className="mt-4 max-w-4xl text-base leading-relaxed text-muted-foreground">
            While the following case studies highlight over 20 high-profile engagements with industry
            leaders like PT PLN (Persero), PT Pertamina, and PT Rekayasa Industri, they represent only
            a focused snapshot of our broader technical footprint. Since 1994, PT. CCIT Group Indonesia
            has conducted hundreds of specialized simulations, ranging from secret internal R&D for global
            energy firms to rapid-response failure analyses for local power plants. Our success is built
            on the flexibility of our proprietary CFDSOF solver, allowing us to pivot from modeling
            vast coastal thermal plumes in the Java Sea to the microscopic chemical reactions inside a
            CO2 stripper. Whatever your fluid challenge—regardless of scale or complexity—our legacy of
            completed projects is proof that we have the validated experience to engineer your solution.
          </p></Reveal>

          <div className="mt-14 space-y-16">
            {portfolio.map((category) => (
              <Reveal key={category.name}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="text-4xl font-bold text-primary/30">{category.number}</span>
                  <div>
                    <h3 className="text-xl font-bold text-ink sm:text-2xl">{category.name}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{category.specialty}</p>
                  </div>
                </div>
                <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:pl-[4.5rem]">
                  {category.body}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:pl-[4.5rem]">
                  {category.items.map((item, i) => (
                    <Reveal
                      key={item.title}
                      delay={i * 80}
                      className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1"
                    >
                      <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                      <p className="mt-1 text-xs font-medium text-primary">{item.client}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/60">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <Reveal as="span" className="block"><h2 className="text-2xl font-bold text-ink sm:text-3xl">Training programmes</h2></Reveal>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Run on-site in Jakarta and across Indonesia, or online. Every session is worked on your
            real geometry so the outcome is a usable workflow, not slideware.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {programmes.map((c, i) => (
              <Reveal key={c.name} delay={i * 100} className="rounded-2xl border border-border bg-card p-6 transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-semibold text-ink">{c.name}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {c.duration}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </Reveal>
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

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <Reveal as="span" className="block">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Recent training</h2>
          </Reveal>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Hands-on sessions with engineering teams across Indonesia — from in-house workshops to
            open classes.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal delay={100} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={trainingReinhardtAsset.url}
                  alt="CCIT training session at Reinhardt"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-ink">In-house workshop</p>
                <p className="mt-1 text-sm text-muted-foreground">Reinhardt · 2024</p>
              </div>
            </Reveal>
            <Reveal delay={200} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={trainingClassAsset.url}
                  alt="CCIT training class group photo"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-ink">Open training class</p>
                <p className="mt-1 text-sm text-muted-foreground">Jakarta · 2024</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
