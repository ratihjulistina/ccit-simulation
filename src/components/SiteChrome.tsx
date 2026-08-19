import { Link } from "@tanstack/react-router";
import { CcitLogo } from "@/components/CcitLogo";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/case-studies", label: "Case studies" },
  { to: "/process", label: "Process" },
  { to: "/industries", label: "Industries" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link to="/" aria-label="CCIT Simulation home">
          <CcitLogo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5"
        >
          Request a quote
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted-foreground">
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
        <p>© {new Date().getFullYear()} CCIT Simulation · Engineering simulation consultancy, Indonesia</p>
      </div>
    </footer>
  );
}