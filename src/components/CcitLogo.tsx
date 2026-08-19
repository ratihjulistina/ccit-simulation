type Props = { className?: string; title?: string };

/**
 * Nested spiral arcs resolving into a "C" — the mark used on the CCIT
 * Simulation case-study artwork. Outer arcs red (primary), inner arcs ink.
 */
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
      <g fill="none" strokeLinecap="round">
        <path
          className="text-primary"
          stroke="currentColor"
          strokeWidth="5"
          d="M11.32 14.64A27 27 0 1 1 11.32 49.36"
        />
        <path
          className="text-primary"
          stroke="currentColor"
          strokeWidth="4.5"
          opacity="0.62"
          d="M16.3 18.82A20.5 20.5 0 1 1 16.3 45.18"
        />
        <path
          className="text-ink"
          stroke="currentColor"
          strokeWidth="4"
          d="M21.28 23A14 14 0 1 1 21.28 41"
        />
        <path
          className="text-ink"
          stroke="currentColor"
          strokeWidth="3.5"
          opacity="0.55"
          d="M25.87 26.86A8 8 0 1 1 25.87 37.14"
        />
      </g>
    </svg>
  );
}

export function CcitLogo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <CcitMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          CCIT
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
          Simulation
        </span>
      </span>
    </span>
  );
}
