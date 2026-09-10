import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy & Data Governance — CuxtonAI",
  description:
    "CuxtonAI's commitment to data sovereignty, zero unauthorized data retention, and enterprise security standards.",
};

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--background)", minHeight: "80vh" }}>
      <PageHero
        breadcrumbs={[{ label: "Privacy Policy" }]}
        eyebrow="Data Governance & Security"
        title="Privacy &"
        titleHighlight="Data Sovereignty Policy"
        showVisual={false}
        description="CuxtonAI is engineered around enterprise data sovereignty. We design, integrate, and deploy AI architectures that respect proprietary institutional information, client confidentiality, and strict jurisdictional boundaries."
        tags={["Zero Model Training", "Private VPC Boundaries", "SOC 2 Aligned", "Full IP Ownership"]}
      />

      {/* Content */}
      <section style={{ padding: "4rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <article className="card-enterprise" style={{ padding: "2rem 2.5rem", lineHeight: 1.8 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem" }}>
              1. Principles of Data Sovereignty
            </h2>
            <p style={{ color: "rgba(var(--foreground-rgb), 0.75)", marginBottom: "1rem" }}>
              Unlike consumer AI products, CuxtonAI does not harvest client interactions, operational data, or internal
              documentation to train public base models. When we build or integrate an AI solution:
            </p>
            <ul style={{ paddingLeft: "1.25rem", color: "rgba(var(--foreground-rgb), 0.75)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li><strong>Zero Foundation Model Training:</strong> Your organizational data is never ingested into public foundational models.</li>
              <li><strong>Private Execution Boundaries:</strong> Systems are deployed inside your approved virtual private cloud (VPC) or on-premise servers.</li>
              <li><strong>Strict Access Control:</strong> Role-based access control (RBAC) and attribute-based permissions guarantee only authorized personnel access relevant indices.</li>
            </ul>
          </article>

          <article id="security" className="card-enterprise" style={{ padding: "2rem 2.5rem", lineHeight: 1.8 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem" }}>
              2. Security &amp; Compliance Standards
            </h2>
            <p style={{ color: "rgba(var(--foreground-rgb), 0.75)", marginBottom: "1rem" }}>
              Our architectures align with SOC 2 Type II controls, ISO 27001 principles, GDPR, and UK Data Protection regulations.
              Every automated task, retrieval step, and model inference produces verifiable logs for supervisory auditability.
            </p>
          </article>

          <article className="card-enterprise" style={{ padding: "2rem 2.5rem", lineHeight: 1.8 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem" }}>
              3. Inquiries &amp; Data Protection Officer
            </h2>
            <p style={{ color: "rgba(var(--foreground-rgb), 0.75)" }}>
              For data protection questions, enterprise DPA requests, or compliance reviews, contact our security team directly at{" "}
              <a href="mailto:privacy@cuxtonai.com" style={{ color: "var(--cuxton-teal-light)", textDecoration: "none", fontWeight: 600 }}>
                privacy@cuxtonai.com
              </a>.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <Link href="/contact" className="btn-primary" style={{ display: "inline-flex", height: "2.75rem", padding: "0 1.25rem", fontSize: "0.85rem" }}>
                Book a Security Architecture Review
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
