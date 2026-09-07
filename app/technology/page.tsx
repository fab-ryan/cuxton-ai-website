import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Technology — Private AI Architecture and Controlled Deployment",
  description:
    "Cuxton AI designs AI architecture around data sensitivity, deployment constraints and governance requirements. Private cloud, on-premise and isolated tenancy deployment options.",
};

const deploymentModels = [
  {
    name: "On-Premise",
    tag: "Highest control",
    desc: "AI infrastructure runs entirely on the organisation's own hardware, within its own facilities and network. No data leaves the organisation's physical or logical boundary.",
    bestFor: ["Highest-sensitivity environments", "Regulatory requirements for sovereign data", "Organisations with existing compute infrastructure"],
    considerations: ["Requires on-site hardware and technical capacity", "Organisation manages infrastructure updates"],
  },
  {
    name: "Private Cloud",
    tag: "Flexible control",
    desc: "AI infrastructure runs in a dedicated cloud environment provisioned exclusively for the organisation — not shared with other tenants. Hardware is cloud-hosted but logically isolated.",
    bestFor: ["Cloud-comfortable institutions requiring isolation", "Scalable private compute", "Lower infrastructure management burden"],
    considerations: ["Infrastructure managed by cloud provider", "Requires clear contractual data commitments"],
  },
  {
    name: "Isolated Tenancy",
    tag: "Controlled cloud",
    desc: "AI models and infrastructure run in a network-isolated compartment within an approved cloud region, with dedicated resources and defined egress controls.",
    bestFor: ["Institutions comfortable with cloud hosting", "Situations where full private cloud is impractical", "Clear data-region requirements"],
    considerations: ["Requires clear tenancy isolation commitments", "Appropriate for moderately sensitive environments"],
  },
  {
    name: "Hybrid",
    tag: "Layered",
    desc: "Sensitive processing runs on-premise or in private infrastructure, while less sensitive operations can use more flexible environments. Different data classifications route to appropriate tiers.",
    bestFor: ["Organisations with mixed data-sensitivity levels", "Staged AI adoption programmes", "Maximising cost-efficiency for lower-sensitivity use cases"],
    considerations: ["Requires clear data-classification policy", "More complex architecture to design and manage"],
  },
];

const archLayers = [
  {
    n: "01",
    label: "Institution",
    desc: "Existing organisational infrastructure, identity management, business systems and network boundaries. AI is designed to integrate with — not replace — existing governance and access controls.",
  },
  {
    n: "02",
    label: "Controlled Data & Knowledge Layer",
    desc: "Databases, document repositories and institutional knowledge stores connected through permission-aware retrieval pipelines. Data remains in approved locations; retrieval respects access boundaries defined by the organisation.",
  },
  {
    n: "03",
    label: "AI Infrastructure",
    desc: "Selected models — open-weight, commercial API or custom-trained — deployed within the approved infrastructure tier. Cuxton selects or recommends models based on the task, data requirements, performance constraints and cost considerations.",
  },
  {
    n: "04",
    label: "AI Applications",
    desc: "Assistants, agents, automation workflows and analytical tools presented to users through appropriate interfaces — internal portals, existing enterprise applications, APIs or dedicated front-ends.",
  },
];

const govPrinciples = [
  { label: "Human in the loop", desc: "Consequential decisions remain with authorised people. AI prepares, summarises and suggests; humans decide." },
  { label: "Audit and attribution", desc: "Logs, sources and retrieval paths are recorded for accountability and continuous improvement." },
  { label: "Permission-aware", desc: "Retrieval and access respect the organisation's existing access control structures." },
  { label: "Change management", desc: "Model updates, prompt changes and data source additions are tested and documented before deployment." },
  { label: "Defined scope", desc: "Each AI system has a clear, bounded set of tasks. Scope creep is managed through a deliberate change process." },
  { label: "Monitoring", desc: "Ongoing monitoring of accuracy, anomalies and usage patterns informs maintenance and improvement decisions." },
];

export default function TechnologyPage() {
  return (
    <div style={{ background: "var(--background)" }}>

      <PageHero
        breadcrumbs={[{ label: "Technology" }]}
        eyebrow="Technology"
        title="Private AI architecture designed around"
        titleHighlight="your environment."
        description="Cuxton AI builds AI architecture that begins with where data is allowed to be — not where it is most convenient to process it. Deployment model, model choice and integration design are determined by your organisation's data sensitivity, regulatory context and technical constraints."
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
      <section className="section-py">
        <div className="section-container">
          <div className="section-label">Deployment Models</div>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            We work with the infrastructure your organisation can approve.
          </h2>
          <p className="section-sub" style={{ marginBottom: "3rem" }}>
            There is no single right deployment model. Cuxton designs around the organisation&apos;s
            data-sensitivity requirements, existing infrastructure and operational constraints.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {deploymentModels.map(m => (
              <div key={m.name} className="card-enterprise card-top-accent" style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--foreground)" }}>{m.name}</h3>
                  <span className="tag-teal" style={{ fontSize: "0.68rem" }}>{m.tag}</span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "rgba(var(--foreground-rgb),0.55)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  {m.desc}
                </p>
                <div style={{ marginBottom: "1rem" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--cuxton-teal-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.625rem" }}>
                    Best for
                  </p>
                  {m.bestFor.map(b => (
                    <div key={b} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.375rem" }}>
                      <span style={{ color: "var(--cuxton-teal-light)", fontSize: "0.8rem" }}>→</span>
                      <span style={{ fontSize: "0.78rem", color: "rgba(var(--foreground-rgb),0.5)" }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(var(--foreground-rgb),0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.625rem" }}>
                    Considerations
                  </p>
                  {m.considerations.map(c => (
                    <div key={c} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.375rem" }}>
                      <span style={{ color: "rgba(var(--foreground-rgb),0.3)", fontSize: "0.8rem" }}>—</span>
                      <span style={{ fontSize: "0.78rem", color: "rgba(var(--foreground-rgb),0.35)" }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture layers */}
      <section className="section-py" style={{ background: "var(--bg-surface)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "center" }}
            className="arch-outer">
            <div>
              <div className="section-label">Architecture</div>
              <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>
                A layered architecture that maintains control at every level.
              </h2>
              <p className="section-sub">
                Every layer — from data connectivity to AI application — is designed with the
                organisation&apos;s governance requirements in mind. AI does not override permissions
                or access controls that exist in the institution&apos;s existing systems.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {archLayers.map((layer, i) => (
                <div key={layer.n} style={{ display: "flex", gap: "1.25rem", position: "relative" }}>
                  {/* Line */}
                  {i < archLayers.length - 1 && (
                    <div style={{
                      position: "absolute", left: 20, top: 48, bottom: 0,
                      width: 1,
                      background: "linear-gradient(180deg, rgba(27,107,138,0.3) 0%, rgba(27,107,138,0.05) 100%)",
                    }} />
                  )}
                  {/* Number badge */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: "rgba(27,107,138,0.12)",
                    border: "1px solid rgba(27,107,138,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.65rem", fontWeight: 800, color: "var(--cuxton-amber)",
                    flexShrink: 0, letterSpacing: "0.05em",
                  }}>
                    {layer.n}
                  </div>
                  <div style={{ paddingBottom: "2rem", flex: 1 }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>
                      {layer.label}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "rgba(var(--foreground-rgb),0.48)", lineHeight: 1.7 }}>
                      {layer.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) { .arch-outer { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>

      {/* Model approach */}
      <section className="section-py">
        <div className="section-container" style={{ maxWidth: 840 }}>
          <div className="section-label">Model Selection</div>
          <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>
            Model-agnostic. Selection driven by requirements.
          </h2>
          <p className="section-sub" style={{ marginBottom: "2.5rem" }}>
            Cuxton does not have a preferred AI model vendor. The right model for each situation depends on
            the task, data sensitivity, performance requirements, latency constraints, cost and
            interpretability needs.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              ["Open-weight models", "Deployed locally or privately, suitable for highest-sensitivity environments."],
              ["Commercial APIs", "Where approved data-processing agreements exist and data sensitivity permits."],
              ["Fine-tuned models", "Customised for specific domains, terminology or task types."],
              ["Ensemble approaches", "Combining model outputs where no single model is optimal for all sub-tasks."],
            ].map(([title, desc]) => (
              <div key={title} className="card-enterprise" style={{ padding: "1.375rem" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--cuxton-teal-light)", marginBottom: "0.5rem" }}>{title}</p>
                <p style={{ fontSize: "0.78rem", color: "rgba(var(--foreground-rgb),0.45)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="section-py" style={{ background: "var(--bg-surface)" }}>
        <div className="section-container">
          <div className="section-label">Governance</div>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Governance principles built into every deployment.
          </h2>
          <p className="section-sub" style={{ marginBottom: "3rem" }}>
            AI governance is not an afterthought — it is designed into the architecture from the start.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {govPrinciples.map(p => (
              <div key={p.label} className="card-enterprise" style={{ padding: "1.5rem" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>
                  {p.label}
                </p>
                <p style={{ fontSize: "0.78rem", color: "rgba(var(--foreground-rgb),0.45)", lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
