// SPDX-License-Identifier: MIT
import type { PropsWithChildren } from "hono/jsx";

export type DashboardSection = "activities" | "keys" | "settings";

export function Layout(props: PropsWithChildren<{
  title: string;
  current?: DashboardSection;
  focusId?: string;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.title} · Proof</title>
        <script src="/theme.js"></script>
        <link rel="stylesheet" href="/dashboard.css" />
        <script src="/dashboard.js" defer></script>
      </head>
      <body data-focus-id={props.focusId}>
        <a class="prax-skip" href="#main">Skip to content</a>
        <header class="prax-top">
          <div>
          <strong>Proof</strong>
          {" — "}
          <nav aria-label="Primary">
            <a href="/dashboard" aria-current={props.current === "activities" ? "page" : undefined}>Activities</a>
            {" · "}
            <a href="/dashboard/keys" aria-current={props.current === "keys" ? "page" : undefined}>Keys</a>
            {" · "}
            <a href="/dashboard/settings" aria-current={props.current === "settings" ? "page" : undefined}>Settings</a>
            {" · "}
            <a href="/privacy">Privacy notice</a>
          </nav>
          </div>
          <div class="prax-theme">
            <label for="prax-theme">Theme</label>
            <select id="prax-theme" name="theme">
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </header>
        <main id="main" tabindex={-1}>{props.children}</main>
      </body>
    </html>
  );
}

export const DASHBOARD_JS = `document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".prax-table-wrap[tabindex='0']").forEach((region) => {
    region.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      region.scrollLeft += event.key === "ArrowRight" ? 80 : -80;
    });
  });
  const focusId = document.body.dataset.focusId;
  if (focusId) {
    requestAnimationFrame(() => document.getElementById(focusId)?.focus());
  }
});`;

export function StatCard(props: { label: string; value: string; sub?: string; hero?: boolean }) {
  return (
    <div class={props.hero ? "prax-stat prax-stat-hero" : "prax-stat"}>
      <b>{props.value}</b>
      <span>{props.label}</span>
      {props.sub ? <span class="prax-sub">{props.sub}</span> : null}
    </div>
  );
}

export const THEME_JS = `(function () {
  var root = document.documentElement;
  root.dataset.js = "1";
  var stored = null;
  try { stored = localStorage.getItem("prax-theme"); } catch (e) {}
  if (stored !== "light" && stored !== "dark") stored = null;
  if (stored) root.dataset.theme = stored;
  document.addEventListener("DOMContentLoaded", function () {
    var sel = document.getElementById("prax-theme");
    if (!sel) return;
    sel.value = stored || "auto";
    sel.addEventListener("change", function () {
      var v = sel.value;
      if (v === "auto") delete root.dataset.theme;
      else root.dataset.theme = v;
      try {
        if (v === "auto") localStorage.removeItem("prax-theme");
        else localStorage.setItem("prax-theme", v);
      } catch (e) {}
    });
  });
})();`;
