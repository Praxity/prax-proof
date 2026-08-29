// SPDX-License-Identifier: MIT
// The light half of every pair is the canonical value from prax/packages/tokens
// (MIT); the dark half is Proof's. Canvas is the page, surface is a quiet panel
// (packages/tokens/design.md). light-dark() resolves against the root's
// color-scheme, so the selector only has to flip that one property.
export const DASHBOARD_CSS = `
:root {
  color-scheme: light dark;

  --prax-font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --prax-font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  /* Three weights, one job each: body, label, heading. */
  --prax-type-body-weight: 400;
  --prax-type-heading-weight: 700;
  /* Proof-only: the canonical set has no label tier. */
  --prax-type-label-weight: 600;
  --prax-color-canvas: light-dark(#ffffff, #10151c);
  --prax-color-surface: light-dark(#f7f8fa, #1a212b);
  --prax-color-text: light-dark(#172033, #e4e9f0);
  --prax-color-muted: light-dark(#5a6578, #9fabbd);
  --prax-color-border: light-dark(#c8d0dc, #2f3a48);
  --prax-color-accent: light-dark(#0f766e, #4ecdb9);
  --prax-color-danger: light-dark(#b42318, #ff9d92);
  --prax-radius-1: 0.25rem;
  --prax-radius-2: 0.5rem;
  --prax-shadow-card: 0 1px 2px light-dark(rgb(23 32 51 / 0.08), rgb(0 0 0 / 0.4));

  /* Proof-only: reporting states the canonical set has no token for. One hue per
     meaning. Teal reads "finished", amber reads "look here", neutral reads
     "still going" because in-progress is a state, not an alert. */
  --prax-color-accent-surface: light-dark(#cfeae4, #12463f);
  /* Theme-independent on purpose: the drop-off row is a highlighter band, so it
     stays pale yellow on a dark page rather than turning olive. Hue is what makes
     this read as marker ink rather than cream: below ~50deg it slides into the
     beige wedge, above ~57deg it goes acid. */
  --prax-color-warning-surface: #f8e56a;
  --prax-color-neutral-surface: light-dark(#e3e8ee, #262f3b);
  /* Bar track. Chosen so the accent fill clears 3:1 against it, which is what
     makes the filled proportion legible, not the track edge against the panel. */
  --prax-color-track: light-dark(#bcc6d3, #3f4b5a);
  /* Deliberately NOT the accent: focus rings must contrast with adjacent teal
     ink, not blend with it. */
  --prax-color-focus: light-dark(#1d4ed8, #8ab8ff);
}
/* The selector pins a scheme; without it the OS preference wins. */
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"] { color-scheme: dark; }
* { box-sizing: border-box; }
/* On the root, not just body: background propagation from body leaves the root
   transparent, which makes contrast tooling read the page as white. */
html { background: var(--prax-color-canvas); }
body {
  margin: 0; background: var(--prax-color-canvas); color: var(--prax-color-text);
  font-family: var(--prax-font-body);
  font-size: 16px; line-height: 1.55; font-weight: var(--prax-type-body-weight);
}
a { color: var(--prax-color-accent); }
:focus-visible { outline: 3px solid var(--prax-color-focus); outline-offset: 2px; }
input, select, button { border: 1px solid var(--prax-color-muted); border-radius: var(--prax-radius-1); padding: 0.35rem 0.6rem; font: inherit; }
/* Inputs and selects are left to color-scheme: WebKit ignores author color on a
   native menulist, so forcing a background there yields black ink on dark.
   Buttons do honour author colors, and need them, because a button's UA default
   background is silver and .prax-danger text does not clear 4.5:1 against it. */
button { background: var(--prax-color-surface); color: var(--prax-color-text); }
code, pre { overflow-wrap: anywhere; }
pre { max-width: 100%; white-space: pre-wrap; }
.prax-skip {
  position: absolute; left: -999px; top: 0; background: var(--prax-color-canvas);
  border: 1px solid var(--prax-color-border);
  padding: 0.5rem 1rem; z-index: 10;
}
.prax-skip:focus { left: 0; }
header.prax-top {
  border-bottom: 3px solid var(--prax-color-accent); background: var(--prax-color-surface);
  padding: 0.75rem 1.25rem;
  display: flex; flex-wrap: wrap; gap: 0.5rem 1rem;
  align-items: center; justify-content: space-between;
}
/* The control only works with script, so it only exists with script. */
.prax-theme { display: none; }
:root[data-js] .prax-theme { display: flex; align-items: center; gap: 0.5rem; }
.prax-theme label { font-size: 0.8rem; color: var(--prax-color-muted); }
.prax-theme select { padding: 0.3rem 0.4rem; font-size: 0.8rem; }
header.prax-top strong { font-weight: var(--prax-type-heading-weight); }
header.prax-top nav { display: inline; }
header.prax-top [aria-current="page"] { color: var(--prax-color-text); font-weight: var(--prax-type-label-weight); }
main { max-width: 960px; margin: 0 auto; padding: 1.5rem 1.25rem 4rem; }
h1, h2 { font-weight: var(--prax-type-heading-weight); }
h1 { font-size: 2rem; letter-spacing: -0.015em; margin: 0.5rem 0 1rem; }
h2 { font-size: 1.25rem; margin: 2rem 0 0.75rem; }
table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; background: var(--prax-color-surface);
  border: 1px solid var(--prax-color-border); border-radius: var(--prax-radius-2);
  box-shadow: var(--prax-shadow-card); }
.prax-table-wrap { max-width: 100%; overflow-x: auto; }
caption { text-align: left; font-size: 0.8rem; color: var(--prax-color-muted); margin-bottom: 0.5rem; }
th { text-align: left; font-size: 0.8rem; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--prax-color-muted); font-weight: var(--prax-type-label-weight); padding: 0.6rem 0.75rem; border-bottom: 2px solid var(--prax-color-border); }
td { padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--prax-color-border); }
.prax-stats { display: flex; gap: 1rem; flex-wrap: wrap; margin: 1rem 0 1.5rem; }
.prax-stat { flex: 1 1 140px; background: var(--prax-color-surface);
  border: 1px solid var(--prax-color-border); border-radius: var(--prax-radius-2); padding: 0.9rem 1rem;
  box-shadow: var(--prax-shadow-card); }
.prax-stat b { display: block; font-size: 1.5rem; font-weight: var(--prax-type-heading-weight); font-family: var(--prax-font-mono); letter-spacing: -0.02em; }
.prax-stat span { font-size: 0.8rem; color: var(--prax-color-muted); text-transform: uppercase; letter-spacing: 0.05em; }
/* The headline number earns its emphasis from size alone. */
.prax-stat-hero b { font-size: 1.75rem; }
.prax-stat .prax-sub { display:block; font-size: 0.8rem; color: var(--prax-color-muted); text-transform: none; letter-spacing: 0; margin-top: 0.25rem; }
.prax-badge { display: inline-block; font-size: 0.8rem; font-weight: var(--prax-type-label-weight);
  padding: 0.1rem 0.6rem; border-radius: 999px; }
.prax-badge.done { background: var(--prax-color-accent-surface); color: var(--prax-color-text); }
.prax-badge.open { background: var(--prax-color-neutral-surface); color: var(--prax-color-text); }
.prax-bars { display: grid; gap: 0.35rem; margin: 0.75rem 0; }
.prax-bar { display: grid; grid-template-columns: 7rem 1fr auto; gap: 0.75rem; align-items: center; font-size: 0.8rem; }
.prax-bar .fill { background: var(--prax-color-accent); height: 1rem; border-radius: var(--prax-radius-1); }
.prax-bar .fill.has-value { min-width: 2px; }
.prax-track { width: 9rem; height: 0.9rem; background: var(--prax-color-track); border-radius: var(--prax-radius-1); display: inline-block; vertical-align: middle; margin-right: 0.5rem; }
.prax-track-fill { height: 100%; background: var(--prax-color-accent); border-radius: var(--prax-radius-1); }
.prax-track-fill[data-has-value="true"] { min-width: 2px; }
/* A highlighter marks words, not the page width. The stroke sits on the phrase
   that explains the row; the row itself keeps only a trace of the same yellow so
   it stays findable when scanning the left edge. Filling the whole row was too
   loud on a dark page, and put the teal bar directly on saturated yellow. */
.prax-drop-row td { background: color-mix(in srgb, var(--prax-color-warning-surface) 14%, transparent); }
/* color-scheme: light makes the inherited ink token resolve dark, so the stroke
   reads the same in either theme. */
mark { color-scheme: light; background: var(--prax-color-warning-surface); color: var(--prax-color-text);
  font-weight: var(--prax-type-label-weight); padding: 0.05rem 0.3rem; border-radius: var(--prax-radius-1); }
.prax-soft { color: var(--prax-color-muted); }
.prax-empty { background: var(--prax-color-surface); border: 1px dashed var(--prax-color-border);
  border-radius: var(--prax-radius-2); padding: 2rem; text-align: center; color: var(--prax-color-muted); }
form.prax-form { display: grid; grid-template-columns: minmax(10rem, 14rem) minmax(12rem, 1fr); gap: 0.75rem 1rem; align-items: center; max-width: 48rem; }
form.prax-form input, form.prax-form select { width: 100%; }
form.prax-form .prax-form-actions { grid-column: 2; }
.prax-field-help { grid-column: 2; margin: -0.5rem 0 0; color: var(--prax-color-muted); }
.prax-message, .prax-error {
  background: var(--prax-color-surface); border-left: 4px solid var(--prax-color-accent);
  padding: 0.75rem 1rem; margin: 1rem 0;
}
.prax-error { border-left-color: var(--prax-color-danger); }
.prax-error h2 { margin-top: 0; }
.prax-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
.prax-visually-hidden {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.prax-danger { color: var(--prax-color-danger); }
@media (max-width: 640px) {
  header.prax-top { line-height: 2; }
  main { padding: 1rem 0.75rem 3rem; }
  form.prax-form { grid-template-columns: 1fr; }
  form.prax-form .prax-form-actions { grid-column: 1; }
  .prax-stats { gap: 0.6rem; }
  .prax-stat { flex-basis: calc(50% - 0.6rem); }
  .prax-track { width: 5rem; }
  th, td { padding: 0.5rem; }
}
`;
