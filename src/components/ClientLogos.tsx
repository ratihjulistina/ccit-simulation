import { clients } from "@/lib/site-content";
import { Reveal } from "@/components/Reveal";

export function ClientLogos() {
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
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <div className="group flex h-20 items-center justify-center rounded-xl border border-border bg-background px-4 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  loading="lazy"
                  className="max-h-12 w-auto max-w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
