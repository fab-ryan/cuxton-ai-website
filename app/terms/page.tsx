import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use — Cuxton AI",
  description:
    "Terms of use and enterprise engagement policies for Cuxton AI.",
};

export default function TermsPage() {
  return (
    <div style={{ background: "var(--background)", minHeight: "80vh" }}>
      <PageHero
        breadcrumbs={[{ label: "Terms of Use" }]}
        eyebrow="Legal Agreements"
        title="Terms of"
        titleHighlight="Service & Engagement"
        showVisual={false}
        description="These terms govern the use of the Cuxton AI website, enterprise consultative engagements, and software evaluation frameworks."
        tags={["Enterprise Master Agreements", "Client IP Protection", "Jurisdictional Compliance"]}
      />

      <section style={{ padding: "4rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <article className="card-enterprise" style={{ padding: "2rem 2.5rem", lineHeight: 1.8 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem" }}>
              1. Engagement &amp; Advisory Scope
            </h2>
            <p style={{ color: "rgba(var(--foreground-rgb), 0.75)" }}>
              Cuxton AI provides enterprise AI consultancy, architectural design, and deployment services under tailored
              Master Services Agreements (MSAs) and Statements of Work (SOWs). Information published on this site is provided
              for informational purposes regarding capabilities and methodology.
            </p>
          </article>

          <article className="card-enterprise" style={{ padding: "2rem 2.5rem", lineHeight: 1.8 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem" }}>
              2. Intellectual Property &amp; Code
            </h2>
            <p style={{ color: "rgba(var(--foreground-rgb), 0.75)" }}>
              Unless otherwise agreed in an enterprise SOW, custom models, system prompts, pipelines, and integrations developed
              specifically for institutional clients remain the exclusive intellectual property of the respective client.
            </p>
          </article>

          <article className="card-enterprise" style={{ padding: "2rem 2.5rem", lineHeight: 1.8 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem" }}>
              3. Contact
            </h2>
            <p style={{ color: "rgba(var(--foreground-rgb), 0.75)" }}>
              For contractual or legal inquiries, reach out to{" "}
              <a href="mailto:legal@cuxtonai.com" style={{ color: "var(--cuxton-teal-light)", textDecoration: "none", fontWeight: 600 }}>
                legal@cuxtonai.com
              </a>.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <Link href="/contact" className="btn-secondary" style={{ display: "inline-flex", height: "2.75rem", padding: "0 1.25rem", fontSize: "0.85rem" }}>
                Contact Legal &amp; Compliance Team
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
