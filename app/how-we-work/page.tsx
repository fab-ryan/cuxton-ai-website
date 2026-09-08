import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import EngagementModel from "@/components/howWeWork/EngagementModel";
import OperatingPrinciples from "@/components/howWeWork/OperatingPrinciples";

export const metadata: Metadata = {
  title: "How We Work — Cuxton AI Engagement Model",
  description:
    "Cuxton AI's 8-step engagement model: from AI opportunity discovery through to operational deployment, training and long-term support.",
};

export default function HowWeWorkPage() {
  return (
    <div style={{ background: "var(--background)" }}>

      <PageHero
        breadcrumbs={[{ label: "How We Work" }]}
        eyebrow="Engagement Model"
        title="Start with the problem."
        titleHighlight="Scale what works."
        description="Cuxton AI follows a structured, 8-step engagement model designed to evaluate the right use case, engineer it securely and enable your organisation to operate it with absolute confidence."
        primaryCta={{
          label: "Start with a Discovery Session",
          href: "/contact",
        }}
        tags={[
          "Feasibility-First",
          "Fixed Milestones",
          "Knowledge Transfer",
          "Continuous Oversight",
        ]}
      />

      {/* 8-Step Accountable Engagement Model Console */}
      <EngagementModel />

      {/* Operating Principles Interactive Animated Showcase */}
      <OperatingPrinciples />

      {/* CTA */}
      <section style={{ padding: "4rem 0" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Ready to explore what AI could do for your organisation?
          </h2>
          <p className="section-sub" style={{ margin: "0 auto 2rem" }}>
            A discovery conversation is where every engagement starts. We&apos;ll discuss your objectives,
            workflows and constraints — without requiring confidential information in the first contact.
          </p>
          <Link href="/contact" className="btn-primary" style={{ height: "3.25rem", padding: "0 2rem" }}>
            Book an AI Discovery Session
          </Link>
        </div>
      </section>
    </div>
  );
}
