import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CcitLogo } from "@/components/CcitLogo";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Services", exact: false },
  { to: "/case-studies", label: "Case studies", exact: false },
  { to: "/projects-training", label: "Projects & Training", exact: false },
  { to: "/about", label: "About", exact: false },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Link to="/" aria-label="CCIT Simulation home">
          <CcitLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.exact }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
          >
            Request a quote
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="border-t border-border/80 bg-background md:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 text-base font-medium text-muted-foreground">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2.5 transition-colors hover:bg-accent hover:text-primary"
                activeProps={{ className: "bg-accent text-primary" }}
                activeOptions={{ exact: item.exact }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)]"
            >
              Request a quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CcitLogo />
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        <p>© {new Date().getFullYear()} PT CCIT Group Indonesia · Jl. KHM Usman No. 22A, Beji, Depok 16425, West Java · admin@ccit.co.id · +62 813-1523-9718</p>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const phone = "6281315239718";
  const message = encodeURIComponent(
    "Hi CCIT Simulation, I would like to discuss a CFD / engineering simulation project. Could you share more about your services and how you can support our needs?"
  );
  return (
    <div className="group fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      <span className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
        contact with us
      </span>
      <a
        href={`https://api.whatsapp.com/send?phone=${phone}&text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="whatsapp-pulse relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
