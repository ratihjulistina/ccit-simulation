# Design Theme PDF

## Goal
Create a downloadable PDF document summarising the CCIT Simulation website design system — typography, colour palette, spacing, radius, motion, and visual motifs.

## Content to include
- Brand identity: Indonesian red-and-white theme, engineering/CFD positioning
- Typography: Space Grotesk (display/headings), DM Sans (body), letter-spacing -0.02em on headings
- Colour palette: primary red, ink, ink-soft, background, foreground, muted, accent, gradients (flag, ink, red), shadows
- Spacing & radius: 0.625rem base radius, rounded-3xl cards, generous padding
- Visual motifs: flag-rule divider, grid-mesh background, gradient surfaces, floating WhatsApp CTA
- Motion: hero-in animation, scroll reveal, mesh drift, float-soft, logo marquee, reduced-motion support
- Components: card style, buttons (rounded-full, primary/red), form inputs, ServicesWheel
- shadcn/ui base: New York style, slate base, CSS variables, Lucide icons

## Steps
1. Read design tokens from `src/styles.css` and `components.json` (done).
2. Generate a styled DOCX with the design theme content and a colour swatch table.
3. Convert DOCX to PDF using LibreOffice.
4. Inspect PDF pages as images for layout issues.
5. Deliver the final PDF as a chat artifact in `/mnt/documents/`.

## Output
`/mnt/documents/CCIT-Simulation-Design-Theme.pdf`
