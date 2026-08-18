type Props = { className?: string; title?: string };

export function CcitMark({ className, title = "CCIT Simulation" }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="31" fill="currentColor" opacity="0.06" />
      <g
        stroke="currentColor"
        strokeLinecap="round"
        fill="none"
        strokeWidth="4.5"
      >
        <path d="M46 17.5C40.5 12.5 32.5 11 25.5 14.5 16.5 19 12.5 30 15.5 39.5" />
        <path d="M46 46.5C40.5 51.5 32.5 53 25.5 49.5 21.4 47.4 18.3 43.7 16.6 39.4" opacity="0.75" />
        <path d="M52 32c-6.6 0-12 2.4-16.4 6" opacity="0.5" strokeWidth="4" />
      </g>
      <g stroke="currentColor" strokeLinecap="round" strokeWidth="3" opacity="0.35">
        <path d="M4 24h9" />
        <path d="M4 32h6" />
        <path d="M4 40h9" />
      </g>
    </svg>
  );
}

export function CcitLogo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <CcitMark className="h-8 w-8 text-primary" />
      <span className="font-display text-base font-bold tracking-tight text-ink">
        CCIT <span className="text-primary">Simulation</span>
      </span>
    </span>
  );
}
