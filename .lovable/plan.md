# Fix blank sections on scroll + page jumping to top on reload

## Problems (confirmed in code)

1. **Blank sections while scrolling:** Every section wrapped in `<Reveal>` starts at `opacity: 0` and only becomes visible after JavaScript loads and an IntersectionObserver fires. On slow devices, during hydration, or if JS is delayed, whole sections stay invisible — the same problem the hero had before.
2. **Reload jumps to top:** The router has `scrollRestoration: true`, but restoration happens before images/content reach full height (images without fixed dimensions, late-rendering sections), so the saved scroll position no longer exists and the browser ends up at the top.

## Changes

### 1. Scroll reveals without JavaScript dependency
- `src/styles.css`: change `.reveal` to be **visible by default** and animate with pure CSS scroll-driven animations (`animation-timeline: view()`), with the same 700ms ease and 18px rise as today. Browsers without support simply show the content (progressive enhancement — no more possible blank state).
- `src/components/Reveal.tsx`: simplify to a plain wrapper that keeps the `delay` prop (mapped to `animation-range-start` offset so staggered reveals still work) and drops the IntersectionObserver/`useState` logic entirely.
- Keep the `prefers-reduced-motion` override so animations are disabled for users who request it.

### 2. Stable layout so scroll restoration works on reload
- Add explicit `width`/`height` (or `aspect-ratio`) attributes to images on the homepage (hero, industry photo cards, client logos, training gallery) so the page height is stable before images finish loading — the router's scroll restoration then lands at the correct position instead of the top.
- Verify no other code calls `window.scrollTo(0, 0)` on mount (quick grep; remove if found).

### 3. Verify
- Scroll the homepage in the preview: every section is visible immediately and animates as it enters the viewport.
- Scroll partway down, reload the page: the browser returns to the same scroll position.
- Check the build log for errors.

## Technical notes
- `animation-timeline: view()` is supported in current Chrome/Edge/Safari; Firefox falls back to fully visible content (no animation), which is an acceptable graceful degradation and strictly better than blank sections.
- No router config changes needed — `scrollRestoration: true` stays; we fix the layout instability that was defeating it.
