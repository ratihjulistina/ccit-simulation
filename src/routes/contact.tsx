import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-content";

const title = "Contact CCIT Simulation | Request a CFD Quote";
const description =
  "Send your geometry and operating conditions — CCIT Simulation replies with a scope, timeline, and fixed quotation within two working days.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flag-rule h-1.5 w-full" aria-hidden="true" />
        <div className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h1 className="text-3xl font-bold text-ink">Have a flow problem worth solving?</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Send us your geometry, operating conditions, and the question you need answered. We
              reply with a scope, timeline, and fixed quotation within two working days.
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
              const data = new FormData(e.currentTarget);
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
              Open enquiry in your email app
            </button>
          </form>
        </div>
      </div>
    </section>
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