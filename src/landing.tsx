// SPDX-License-Identifier: MIT
import type { Context } from "hono";
import type { Env } from "./env";
import { D1Storage } from "./storage/d1";
import type { InstanceSettings } from "./storage/types";

export function Landing(props: { settings: InstanceSettings }) {
  const operator = props.settings.operatorName.trim();
  const title = operator ? `Learning results for ${operator}` : "Learning activity results";
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="/theme.js"></script>
        <link rel="stylesheet" href="/dashboard.css" />
        <title>{title} · Praxity Proof</title>
      </head>
      <body>
        <a class="prax-skip" href="#main">Skip to content</a>
        <header class="prax-top">
          <strong>Praxity Proof</strong>
          <div class="prax-theme">
            <label for="prax-theme">Theme</label>
            <select id="prax-theme" name="theme">
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </header>
        <main id="main" class="prax-landing" tabindex={-1}>
          <h1>{title}</h1>
          <p class="prax-lede">
            {operator
              ? `${operator} uses Praxity Proof to record participation and results from some learning activities it provides.`
              : "This Praxity Proof instance records participation and results from some learning activities."}
          </p>

          <div class="prax-facts">
            <section class="prax-fact">
              <h2>What may be recorded</h2>
              <p>Your learner identifier, activity progress, answers, completion, scores, and duration. The exact information depends on the activity.</p>
            </section>
            <section class="prax-fact">
              <h2>How long it is kept</h2>
              <p>Learning statements on this instance are retained for {String(props.settings.retentionDays)} days, then deleted.</p>
            </section>
          </div>

          <section class="prax-contact">
            <h2>Questions about your data?</h2>
            <p>{props.settings.privacyContact
              ? <>Contact {operator || "the activity operator"} at {props.settings.privacyContact}.</>
              : "Ask the activity operator how to make a privacy request."}</p>
          </section>

          <p class="prax-actions">
            <a class="prax-primary" href="/privacy">Read this instance's privacy notice</a>
            {props.settings.privacyUrl ? (
              <a href={props.settings.privacyUrl} rel="noopener">Operator's full privacy policy</a>
            ) : null}
          </p>
          <p class="prax-operator"><a href="/dashboard">Operator access</a></p>
        </main>
      </body>
    </html>
  );
}

export async function landingHandler(c: Context<{ Bindings: Env }>) {
  const settings = await new D1Storage(c.env.DB).getSettings();
  return c.html(<Landing settings={settings} />, 200, { "Cache-Control": "no-store" });
}
