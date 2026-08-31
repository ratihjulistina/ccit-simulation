import { clients } from "@/lib/site-content";
import { Reveal } from "@/components/Reveal";

export function ClientLogos() {
  const loop = [...clients, ...clients];

  return (
    <section aria-labelledby="clients-heading" className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
        <Reveal>
          <h2
            id="clients-heading"
            className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
          >
            Trusted by engineering teams &amp; partners
          </h2>
        </Reveal>

        <div className="logo-marquee group relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-card to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-card to-transparent" aria-hidden="true" />
          <ul className="logo-marquee-track items-center gap-6">
            {loop.map((c, i) => (
              <li key={`${c.name}-${i}`} aria-hidden={i >= clients.length}>
                <div className="flex h-24 w-40 items-center justify-center rounded-xl border border-border bg-background px-4 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] sm:w-48">
                  <img
                    src={c.logo}
                    alt={`${c.name} logo`}
                    loading="lazy"
                    className="h-12 w-auto max-w-full object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
