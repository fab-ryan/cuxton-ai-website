import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { solutions } from "@/data/solutions";

import SolutionsCatalog from "@/components/solutions/SolutionsCatalog";

export const metadata: Metadata = {
  title: "Solutions — Enterprise AI Integration, Deployment and Automation",
  description:
    "From AI strategy and private deployment to AI agents, workflow automation and knowledge-grounded systems. Cuxton AI delivers the right solution for your organisation's needs.",
};

export default function SolutionsPage() {
  return (
    <div style={{ background: "var(--background)" }}>

      <PageHero
        breadcrumbs={[{ label: "Solutions" }]}
        eyebrow="Solutions Catalog"
        title="The right AI for the"
        titleHighlight="right problem."
        description="From identifying where AI can help to building, deploying and enabling it  Cuxton delivers AI that is relevant, controlled and connected to your organisation's actual operations."
        primaryCta={{
          label: "Book an AI Discovery Session",
          href: "/contact",
        }}
        tags={[
          "AI Strategy",
          "Private Deployment",
          "Knowledge Grounding",
          "AI Agents",
          "Workflow Automation",
        ]}
        stats={[
          { value: "0%", label: "Public Model Training" },
          { value: "100%", label: "Client IP ownership" },
          { value: "VPC", label: "Isolated Compute Ready" },
        ]}
      />

      {/* Interactive Solutions Catalog with Filters & Bento Layout */}
      <SolutionsCatalog solutions={solutions} />

      {/* CTA */}
      <section style={{ padding: "4rem 0", background: "var(--bg-surface)", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(27,107,138,0.09) 0%, transparent 70%)",
        }} />
        <div className="section-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Not sure which solution applies to your situation?
          </h2>
          <p className="section-sub" style={{ margin: "0 auto 2rem" }}>
            Book an AI Discovery Session. We&apos;ll discuss your objectives and identify where AI could create measurable value.
          </p>
          <Link href="/contact" className="btn-primary" style={{ height: "3.25rem", padding: "0 2rem" }}>
            Book a Discovery Session
          </Link>
        </div>
      </section>
    </div>
  );
}
