import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cookie Policy — CuxtonAI",
  description:
    "Information on cookies, tracking, and minimal telemetry used on the CuxtonAI website.",
};

export default function CookiePolicyPage() {
  return (
    <div style={{ background: "var(--background)", minHeight: "80vh" }}>
      <PageHero
        breadcrumbs={[{ label: "Cookie Policy" }]}
        eyebrow="Privacy Transparency"
        title="Minimal &"
        titleHighlight="Transparent Cookie Policy"
        showVisual={false}
        description="CuxtonAI respects user privacy. We do not use intrusive third-party cross-site advertising cookies or commercial tracking beacons."
        tags={["Zero Tracking Ads", "Essential Only", "User Managed"]}
      />

      <section style={{ padding: "4rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <article className="card-enterprise" style={{ padding: "2rem 2.5rem", lineHeight: 1.8 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem" }}>
              1. Essential Cookies Only
            </h2>
            <p style={{ color: "rgba(var(--foreground-rgb), 0.75)" }}>
              We only use strictly necessary session cookies required for core website routing, accessibility preferences,
              and security validation. We do not sell data or maintain ad-network trackers.
            </p>
          </article>

          <article className="card-enterprise" style={{ padding: "2rem 2.5rem", lineHeight: 1.8 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem" }}>
              2. Managing Preferences
            </h2>
            <p style={{ color: "rgba(var(--foreground-rgb), 0.75)" }}>
              You can block or disable cookies at any time through your browser settings. Doing so will not degrade your ability
              to review CuxtonAI solutions and content.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <Link href="/privacy" className="btn-secondary" style={{ display: "inline-flex", height: "2.75rem", padding: "0 1.25rem", fontSize: "0.85rem" }}>
                Read Full Privacy Policy
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
