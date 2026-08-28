import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CcitLogo } from "@/components/CcitLogo";
import { Menu, X, MessageCircle } from "lucide-react";

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
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      <a
        href={`https://api.whatsapp.com/send?phone=${phone}&text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="whatsapp-pulse relative inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:px-5 md:py-3 md:text-base"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" aria-hidden="true" />
        <span>Chat with us</span>
      </a>
    </div>
  );
}
