// SPDX-License-Identifier: MIT
import { env, SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { D1Storage } from "../src/storage/d1";

describe("GET /", () => {
  it("serves a public instance summary without auth or xAPI version headers", async () => {
    const res = await SELF.fetch("https://proof.test/");
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    expect(res.headers.get("Content-Type")).toContain("text/html");
    const body = await res.text();
    expect(body).toContain('href="/dashboard"');
    expect(body).toContain('href="/privacy"');
    expect(body).toContain("Learning activity results");
    expect(body).toContain("retained for 365 days");
    expect(body).toContain("Operator access");
    expect(body.indexOf("Operator access")).toBeLessThan(body.indexOf("<main"));
    expect(body).not.toContain("Cloudflare account");
    expect(body).toContain("<main");
  });

  it("uses configured operator, retention, contact, and policy details", async () => {
    const storage = new D1Storage(env.DB);
    const current = await storage.getSettings();
    await storage.updateSettings({
      ...current,
      operatorName: "Example Learning Co-op",
      privacyUrl: "https://learn.example/privacy",
      privacyContact: "privacy@learn.example",
      retentionDays: 90,
    });

    const res = await SELF.fetch("https://proof.test/");
    const body = await res.text();
    expect(body).toContain("Learning results for Example Learning Co-op");
    expect(body).toContain("Example Learning Co-op uses Praxity Proof to record participation and results");
    expect(body).toContain("retained for 90 days");
    expect(body).toContain("privacy@learn.example");
    expect(body).toContain('href="https://learn.example/privacy"');
  });
});

describe("GET /about", () => {
  it("serves the public about page without auth or xAPI version headers", async () => {
    const res = await SELF.fetch("https://proof.test/about");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/html");
    const body = await res.text();
    expect(body).toContain("honest subset");
    expect(body).toContain('href="https://github.com/yetanalytics/lrsql"');
    expect(body).toContain("lrsql");
    expect(body).toContain('href="/llms.txt"');
    expect(body).toContain("<h2>Privacy</h2>");
  });
});
