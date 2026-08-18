# CCIT Simulation Logo

## The mark

An abstract CFD streamline symbol: three flowing lines that curve around an
implied centre and resolve into a subtle "C" — red streamlines over white,
echoing the Indonesian flag's two-band split. Clean, geometric, readable at
16px. Paired with the "CCIT Simulation" wordmark in the site's display font.

## What gets built

1. **Logo asset** — a square SVG mark drawn as a React component
   (`src/components/CcitLogo.tsx`) so it inherits theme colors and stays crisp
   at any size. Two layouts: mark only, and mark + wordmark.
2. **Header** — replaces the current red/white flag square next to the company
   name with the streamline mark.
3. **Footer** — mark + wordmark lockup instead of the plain text name.
4. **Favicon** — a 64x64 PNG rendered from the same mark, saved to
   `public/favicon.png`, referenced from the root route head, with the default
   Lovable `favicon.ico` removed.

## Technical notes

- The mark is hand-authored SVG (paths, no raster), colored with the existing
  `--primary` red and `--ink` tokens — no hardcoded hex in components.
- Favicon PNG generated from the same geometry so the browser tab, header, and
  footer all show one consistent mark.
- No new dependencies; no backend changes.
