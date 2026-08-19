# Adopt the case-study image logo as the site logo

The mark in the top-left of the case-studies social image — concentric red and
white arcs spiralling into a "C" — becomes the official CCIT Simulation logo
everywhere on the site.

## What gets built

1. **New mark** — `src/components/CcitLogo.tsx` is rewritten so `CcitMark`
   draws the spiral-arc "C": a set of nested arcs, the outer ones red, the
   inner ones light, opening to the right, matching the proportions in the
   image. Hand-authored SVG, theme-token colors, crisp from 16px up.
2. **Wordmark lockup** — `CcitLogo` pairs the mark with "CCIT" in heavy
   display type plus the smaller "SIMULATION" line, echoing the image's
   layout.
3. **Header** — swaps in the new mark; nav and CTA unchanged.
4. **Footer** — same lockup as today, new mark.
5. **Favicon** — a fresh 64x64 `public/favicon.png` rendered from the new
   geometry so the tab icon matches.

## Technical notes

- The logo stays vector SVG in React (no cropped raster from the JPG), so it
  scales and inherits `--primary` / `--ink` — no hardcoded hex.
- Only presentation files change: `CcitLogo.tsx`, `SiteChrome.tsx`,
  `public/favicon.png`. No route, content, or backend changes.
- If you'd rather have the exact pixels from the image instead of a redrawn
  vector, say so and I'll crop and export the mark as a PNG asset instead.
