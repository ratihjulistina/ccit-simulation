import { clients } from "@/lib/site-content";
import { Reveal } from "@/components/Reveal";

export function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-14">
        <Reveal>
          <h2
            id="clients-heading"
            className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
          >
            Trusted by engineering teams &amp; partners
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <div className="group flex h-16 items-center justify-center rounded-xl border border-border bg-background px-3 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
                <span className="font-display text-center text-sm font-bold uppercase leading-tight tracking-tight text-ink-soft transition-colors group-hover:text-primary sm:text-base">
                  {c.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Placeholder client marks — send us your logo files and we will swap these in.
        </p>
      </div>
    </section>
  );
}
