import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

import DeploymentModels from "@/components/technology/DeploymentModels";
import ArchitectureLayers from "@/components/technology/ArchitectureLayers";
import ModelSelection from "@/components/technology/ModelSelection";
import GovernanceFramework from "@/components/technology/GovernanceFramework";

export const metadata: Metadata = {
  title: "Technology - Private AI Architecture and Controlled Deployment",
  description:
    "CuxtonAI designs AI architecture around data sensitivity, deployment constraints and governance requirements. Private cloud, on-premise and isolated tenancy deployment options.",
};

export default function TechnologyPage() {
  return (
    <div style={{ background: "var(--background)" }}>

      <PageHero
        breadcrumbs={[{ label: "Technology" }]}
        eyebrow="Technology"
        title="Private AI architecture designed around"
        titleHighlight="your environment."
        description="CuxtonAI builds AI architecture that begins with where data is allowed to be not where it is most convenient to process it. Deployment model, model choice and integration design are determined by your organisation's data sensitivity, regulatory context and technical constraints."
        primaryCta={{
          label: "Request an Architecture Assessment",
          href: "/contact",
        }}
        tags={[
          "On-Premise",
          "Private Cloud",
          "Isolated Tenancy",
          "Hybrid Architecture",
        ]}
        stats={[
          { value: "Air-Gapped", label: "Deployment Ready" },
          { value: "Zero", label: "Vendor Model Lock-in" },
          { value: "SOC 2", label: "Control Aligned" },
        ]}
      />

      {/* Deployment models */}
      <DeploymentModels />

      {/* Architecture layers */}
      <ArchitectureLayers />

      {/* Intelligent Model Selection & Routing Console */}
      <ModelSelection />

      {/* Institutional AI Governance Framework */}
      <GovernanceFramework />

      {/* CTA */}
      <section style={{ padding: "4rem 0" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Ready to discuss architecture for your environment?
          </h2>
          <p className="section-sub" style={{ margin: "0 auto 2rem" }}>
            Book a technical discovery conversation. We&apos;ll discuss your infrastructure constraints, data
            sensitivity requirements and the architectural options appropriate to your context.
          </p>
          <Link href="/contact" className="btn-primary" style={{ height: "3.25rem", padding: "0 2rem" }}>
            Request an Architecture Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
