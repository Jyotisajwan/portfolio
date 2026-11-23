# Central SVG component system

Reusable static SVG geometry is maintained in one shared file: **`assets/svg-sprite.js`**.

Every page loads it first thing in `<body>` (`<script src="assets/svg-sprite.js"></script>`); it injects the sprite inline. Use a symbol wherever an icon is needed:

```html
<svg class="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
  <use href="#icon-<symbol-id>" />
</svg>
```

- **Reference icons with `href="#icon-…"`, never `href="assets/….svg#icon-…"`.** Browsers block an external `<use>` file when the site is opened from disk (`file://`), which made every icon disappear. The inline sprite works from disk and over http(s).
- Keep layout, sizing, and contextual styling on the consuming `<svg>` element.
- Add or update reusable icon geometry in `assets/svg-sprite.js`, then reference its stable symbol ID. New pages must include the sprite `<script>` right after `<body>`.
- `books.js` star ratings also reference the shared sprite.
- `assets/svg-sprite.svg` is a superseded reference copy (not loaded by the site); don't edit it expecting the page to change.
- Keep complex animated illustrations self-contained when they rely on internal IDs, gradients, or SMIL motion. The Siri orb currently uses these features, so it remains standalone rather than being flattened into reusable static symbols.

# Project workflow diagrams (`workflows.css`)

All 8 case-study diagrams (Lightning Studio, Search & Discovery, Astrid, BP Genius, Shopify growth chart, Support Knowledge Agent, HRMS Sync, OCR Payslip) are **inline** `<svg class="wf">` elements in `index.html`. They are inline (not `<img>`) on purpose: an `<img>` SVG cannot see page CSS, so it could never share a stylesheet.

**Single source of truth: [workflows.css](workflows.css).** Colours, fonts, type sizes, stroke widths, radii, dot look, figure frame and reduced-motion handling are all tokens/classes there. To restyle every diagram at once, change a `--wf-*` token in `:root`. The diagram markup carries only geometry and content: no `fill`, `stroke`, `font-size`, hex colours or `<style>` blocks.

Shared defs (arrowhead `#wf-arrow`, chart gradient `#wf-area`) live once in `<svg class="wf-defs">` right after `<body>`.

Adding a diagram:

```html
<figure class="wf-figure">
  <svg class="wf" viewBox="-65 0 1250 300" style="--wf-vw:1250" role="img" aria-labelledby="wf-x-t wf-x-d">
    <title id="wf-x-t">…</title><desc id="wf-x-d">…</desc>
    <g><rect class="wf-node" x=".." y=".." width="200" height="82" rx="12"/>
      <text class="wf-node-title" …>1. Title</text><text class="wf-node-sub" …>Sub-line</text></g>
    <path class="wf-connector" marker-end="url(#wf-arrow)" d="M.. H.."/>
    <circle class="wf-dot" r="5.5"><animateMotion dur="…" repeatCount="indefinite" path="…"/></circle>
  </svg>
  <figcaption>…</figcaption>
</figure>
```

- `--wf-vw` must equal the viewBox width. Width is derived from it so every diagram renders at the same px-per-unit (same type/stroke/dot size everywhere).
- Classes: type `wf-eyebrow wf-title wf-sub wf-node-title wf-node-title--sm wf-node-sub wf-label wf-kpi`; shapes `wf-node wf-node--accent wf-chip wf-tag wf-zone wf-outline wf-rule`; lines `wf-connector wf-connector--soft`; chart `wf-data-line wf-data-point`; motion `wf-dot`.
- Arrowheads are opt-in per connector via `marker-end="url(#wf-arrow)"`.
- Dot speed convention: `dur = pathLength / 105` seconds.
- Diagrams are static: no hover/click states or per-diagram scripts. Keep new diagrams in the same format (header → node row → rule + stat line → caption).
- The old `workflows/*.svg` files are no longer referenced by the site. They still carry hardcoded styles, so don't edit them expecting the page to change; delete them when you're happy with the inline versions.
