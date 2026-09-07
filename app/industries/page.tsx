import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Industries — AI for Financial Services, Healthcare, Government and More",
  description:
    "Cuxton AI works with institutions in financial services, healthcare, government, education, telecommunications and legal services to deliver secure, practical AI solutions.",
};

const industries = [
  {
    id: "finance",
    name: "Financial Services",
    sub: "Banks · Insurers · Asset Managers · Financial Infrastructure",
    intro:
      "Financial institutions handle sensitive client data, operate under strict regulatory requirements and face growing demand for efficient, accurate and compliant operations. AI must fit within approved data boundaries, regulatory frameworks and risk controls.",
    useCases: [
      ["Compliance monitoring assistants", "Support compliance teams with document review, flagging and classification within controlled environments."],
      ["Internal knowledge systems", "Connect AI to approved policies, regulations, product documentation and internal guidance for staff use."],
      ["Fraud and anomaly detection", "Real-time analysis of transactional data to identify patterns that require investigation."],
      ["Customer service agents", "Automated handling of routine enquiries within defined response boundaries and escalation paths."],
      ["Report preparation support", "AI-assisted drafting of regulatory reports, client communications and internal documents."],
      ["Data analysis and modelling", "Accelerate quantitative work on approved internal or market data sets."],
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    sub: "Hospitals · Clinics · Research Organisations · Health Authorities",
    intro:
      "Healthcare AI must operate under strict data-protection, clinical governance and patient-safety requirements. AI may not make clinical decisions but can support professionals, improve information access and reduce administrative burden.",
    useCases: [
      ["Clinical knowledge assistants", "Provide clinical staff with fast access to approved protocols, guidelines and evidence — without exposing patient data."],
      ["Medical document support", "AI-assisted review, summarisation and classification of clinical documentation within appropriate boundaries."],
      ["Operational analytics", "Pattern analysis across operational data to support resource planning, capacity management and service design."],
      ["Research knowledge retrieval", "Connect research teams to approved internal data and literature with source attribution."],
      ["Administrative workflow automation", "Reduce administrative repetition across scheduling, correspondence, reporting and data capture."],
      ["Staff training and information support", "AI systems that answer staff questions about procedures, policies and operational information."],
    ],
  },
  {
    id: "government",
    name: "Government",
    sub: "Ministries · Regulatory Bodies · Public Service Institutions",
    intro:
      "Government institutions require AI that can operate within sovereign data boundaries, meet public accountability standards and support — not replace — informed human decision-making on matters that affect citizens.",
    useCases: [
      ["Sovereign knowledge systems", "Knowledge retrieval systems that operate entirely within national infrastructure."],
      ["Service request automation", "Handle citizen enquiries, routing, triage and status tracking at scale within defined procedures."],
      ["Institutional assistants", "Internal AI tools that help civil servants access policy documents, procedures and institutional knowledge."],
      ["Document processing", "Classification, extraction and summarisation of government documents within controlled environments."],
      ["Operational intelligence", "AI analysis of aggregated operational data to support planning, resource allocation and reporting."],
      ["Regulatory support", "Assist regulatory teams with document review, pattern identification and classification tasks."],
    ],
  },
  {
    id: "education",
    name: "Education & Research",
    sub: "Universities · Research Institutes · Schools · Training Providers",
    intro:
      "Educational and research institutions accumulate significant institutional knowledge, manage complex student populations and produce research that benefits from improved information retrieval and analytical support.",
    useCases: [
      ["Research knowledge assistants", "Enable researchers to retrieve, synthesise and reference approved internal and external literature."],
      ["Student analytics", "Early identification of students at risk of disengagement or poor outcomes using approved data."],
      ["Institutional knowledge systems", "Connect staff to approved policies, procedures, course information and guidance."],
      ["Administrative automation", "Reduce repetitive administrative work across enrolment, correspondence and reporting."],
      ["Training and curriculum support", "AI tools that support course designers, educators and assessment teams."],
      ["AI literacy education", "Develop institutional AI literacy and governance frameworks for responsible use."],
    ],
  },
  {
    id: "telecom",
    name: "Telecommunications",
    sub: "Network Operators · Large Enterprise · Data-Rich Operations",
    intro:
      "Large telecommunications and enterprise organisations manage complex operations, vast data volumes and customer interactions at scale. AI can improve operational intelligence, customer service and internal efficiency where data governance allows.",
    useCases: [
      ["Customer service agents", "Automated resolution of routine customer enquiries and issue triage within controlled boundaries."],
      ["Network operations intelligence", "Pattern detection and anomaly identification across network data to support operations teams."],
      ["Knowledge systems for technical staff", "Fast access to approved technical documentation, procedures and troubleshooting guidance."],
      ["Workflow and process automation", "Reduce manual work across operations, billing support, provisioning and reporting."],
      ["Enterprise integration", "Connect AI to existing CRM, billing and operational systems securely."],
      ["Data analysis support", "AI-assisted analysis of large operational datasets for capacity planning and decision support."],
    ],
  },
  {
    id: "legal",
    name: "Legal & Audit",
    sub: "Law Firms · In-House Legal · Audit Practices · Professional Services",
    intro:
      "Legal and audit work is fundamentally about analysing documents, applying professional judgement and maintaining accurate attribution. AI can accelerate information retrieval and document analysis while human judgement remains central to decisions.",
    useCases: [
      ["Document review support", "AI-assisted review of large document sets to identify relevant materials, patterns and inconsistencies."],
      ["Evidence retrieval", "Connect AI to approved matter documents and institutional knowledge with source attribution."],
      ["Contract analysis", "Extract and classify key provisions, obligations and risk indicators from large contract volumes."],
      ["Research assistance", "AI tools that help legal professionals retrieve relevant precedent and statutory material."],
      ["Knowledge management", "Connect teams to accumulated institutional knowledge with attribution and version control."],
      ["Compliance and audit support", "AI tools that support compliance monitoring, reporting and exception identification."],
    ],
  },
];

export default function IndustriesPage() {
  return (
    <div style={{ background: "var(--background)" }}>

      <PageHero
        breadcrumbs={[{ label: "Industries" }]}
        eyebrow="Industries"
        title="Built for data-rich and"
        titleHighlight="high-trust environments."
        description="Cuxton AI works with institutions where data sensitivity, regulatory requirements and operational complexity make standard AI approaches inadequate."
        primaryCta={{
          label: "Discuss Your Sector",
          href: "/contact",
        }}
        tags={[
          "Financial Services",
          "Healthcare",
          "Government",
          "Education & Research",
          "Telecommunications",
          "Legal & Audit",
        ]}
      />

      {/* Industry panels */}
      <section className="section-py">
        <div className="section-container">
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {industries.map((ind, i) => (
              <div key={ind.id} id={ind.id}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}
                  className={`ind-grid ${i % 2 === 1 ? "ind-reverse" : ""}`}>

                  {/* Info */}
                  <div>
                    <div className="section-label">{ind.name}</div>
                    <h2 style={{
                      fontSize: "1.5rem", fontWeight: 800, color: "var(--foreground)",
                      lineHeight: 1.25, marginBottom: "0.5rem",
                    }}>
                      {ind.name}
                    </h2>
                    <p style={{
                      fontSize: "0.78rem", color: "rgba(var(--foreground-rgb),0.35)",
                      marginBottom: "1.25rem", letterSpacing: "0.02em",
                    }}>
                      {ind.sub}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "rgba(var(--foreground-rgb),0.55)", lineHeight: 1.75, marginBottom: "2rem" }}>
                      {ind.intro}
                    </p>
                    <Link href="/contact" className="btn-primary"
                      style={{ height: "2.75rem", padding: "0 1.5rem", fontSize: "0.85rem", display: "inline-flex" }}>
                      Discuss {ind.name}
                    </Link>
                  </div>

                  {/* Use cases */}
                  <div className="card-enterprise" style={{ padding: "1.75rem" }}>
                    <p style={{
                      fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--cuxton-amber)",
                      marginBottom: "1.25rem", opacity: 0.8,
                    }}>
                      Example Use Cases
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                      {ind.useCases.map(([title, desc]) => (
                        <div key={title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                          <div style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: "var(--cuxton-teal-light)",
                            flexShrink: 0, marginTop: "0.45rem",
                          }} />
                          <div>
                            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.2rem" }}>
                              {title}
                            </p>
                            <p style={{ fontSize: "0.78rem", color: "rgba(var(--foreground-rgb),0.45)", lineHeight: 1.55 }}>
                              {desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {i < industries.length - 1 && (
                  <div className="section-divider" style={{ marginTop: "4rem" }} />
                )}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) {
            .ind-grid { grid-template-columns: 1fr 1fr !important; }
            .ind-reverse { direction: rtl; }
            .ind-reverse > * { direction: ltr; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 0", background: "var(--bg-surface)" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Working in a different sector?
          </h2>
          <p className="section-sub" style={{ margin: "0 auto 2rem" }}>
            Cuxton AI works with any institution where AI must fit within data-sensitivity, compliance
            and operational constraints. Get in touch to discuss your specific context.
          </p>
          <Link href="/contact" className="btn-primary" style={{ height: "3.25rem", padding: "0 2rem" }}>
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
