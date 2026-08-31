import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { services } from "@/lib/site-content";

const CX = 250;
const CY = 250;
const R_OUT = 220;
const R_IN = 130;
const R_LABEL = (R_OUT + R_IN) / 2;
const GAP = 1.2; // degrees between segments

function polar(angleDeg: number, r: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function sectorPath(startDeg: number, endDeg: number, rOut: number, rIn: number): string {
  const [x1, y1] = polar(startDeg, rOut);
  const [x2, y2] = polar(endDeg, rOut);
  const [x3, y3] = polar(endDeg, rIn);
  const [x4, y4] = polar(startDeg, rIn);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${x1} ${y1}`,
    `A ${rOut} ${rOut} 0 ${large} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rIn} ${rIn} 0 ${large} 0 ${x4} ${y4}`,
    "Z",
  ].join(" ");
}

function labelArcPath(startDeg: number, endDeg: number, r: number): string {
  const [x1, y1] = polar(startDeg, r);
  const [x2, y2] = polar(endDeg, r);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

export function ServicesWheel() {
  const [active, setActive] = useState(0);
  const n = services.length;
  const segDeg = 360 / n;

  const prev = () => setActive((a) => (a - 1 + n) % n);
  const next = () => setActive((a) => (a + 1) % n);

  const current = services[active]!;
  // rotate so active segment sits at top-right like the reference
  const rotation = -(active * segDeg);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
      {/* Donut wheel */}
      <div className="relative mx-auto w-full max-w-[420px]">
        <svg viewBox="0 0 500 500" className="w-full drop-shadow-[0_24px_50px_rgba(0,0,0,0.12)]">
          <circle cx={CX} cy={CY} r={R_OUT + 12} className="fill-card" />
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: `${CX}px ${CY}px`,
              transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {services.map((s, i) => {
              const start = i * segDeg + GAP / 2;
              const end = (i + 1) * segDeg - GAP / 2;
              const isActive = i === active;
              const mid = (start + end) / 2;
              const [tx, ty] = polar(mid, isActive ? 14 : 0);
              return (
                <path
                  key={s.title}
                  d={sectorPath(start, end, R_OUT, R_IN)}
                  className={`cursor-pointer transition-[fill,transform] duration-300 ${
                    isActive ? "fill-primary" : "fill-primary/25 hover:fill-primary/45"
                  }`}
                  style={{
                    transform: `translate(${tx - CX}px, ${ty - CY}px)`,
                    transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), fill 300ms",
                  }}
                  onClick={() => setActive(i)}
                />
              );
            })}
          </g>
          {/* curved label on active segment (counter-rotated so text stays readable) */}
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: `${CX}px ${CY}px`,
              transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="pointer-events-none"
          >
            {services.map((s, i) => {
              if (i !== active) return null;
              const start = i * segDeg + GAP / 2 + 3;
              const end = (i + 1) * segDeg - GAP / 2 - 3;
              // split title into two balanced lines so long names fit the slice
              const words = s.title.toUpperCase().split(" ");
              let line1 = "";
              let line2 = "";
              for (const w of words) {
                if (line1.length <= line2.length) line1 = line1 ? `${line1} ${w}` : w;
                else line2 = line2 ? `${line2} ${w}` : w;
              }
              const lines = line2 ? [line1, line2] : [line1];
              return (
                <g key={s.title}>
                  <defs>
                    {lines.map((_, li) => (
                      <path
                        key={li}
                        id={`label-arc-${i}-${li}`}
                        d={labelArcPath(start, end, R_LABEL + (li - (lines.length - 1) / 2) * 26)}
                      />
                    ))}
                  </defs>
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      className="fill-primary-foreground text-[11px] font-semibold"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      <textPath href={`#label-arc-${i}-${li}`} startOffset="50%" textAnchor="middle">
                        {line}
                      </textPath>
                    </text>
                  ))}
                </g>
              );
            })}
          </g>
          <circle cx={CX} cy={CY} r={R_IN - 6} className="fill-card" />
          <text
            x={CX}
            y={CY - 8}
            textAnchor="middle"
            className="fill-ink font-display text-5xl font-bold"
          >
            {String(active + 1).padStart(2, "0")}
          </text>
          <text x={CX} y={CY + 24} textAnchor="middle" className="fill-muted-foreground text-[12px] uppercase" style={{ letterSpacing: "0.2em" }}>
            of {String(n).padStart(2, "0")} services
          </text>
        </svg>
      </div>

      {/* Detail card */}
      <div className="w-full">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          {String(active + 1).padStart(2, "0")} — Service
        </p>
        <h3 key={`t-${active}`} className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
          {current.title}
        </h3>
        <p key={`b-${active}`} className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {current.body}
        </p>

        <ul className="mt-6 space-y-2.5">
          {services.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  i === active
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-ink"
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                    i === active ? "bg-primary" : "bg-border"
                  }`}
                />
                {s.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous service"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next service"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
