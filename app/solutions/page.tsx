import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions — Enterprise AI Integration, Deployment and Automation",
  description:
    "From AI strategy and private deployment to AI agents, workflow automation and knowledge-grounded systems. Cuxton AI delivers the right solution for your organisation's needs.",
};

const solutions = [
  {
    id: "strategy",
    label: "01",
    name: "AI Strategy & Opportunity Discovery",
    tag: "AI Strategy",
    headline: "Find the right problems before choosing the technology.",
    body: "Many AI projects fail because they begin with a technology choice. Cuxton starts with the organisation — interviewing stakeholders, reviewing operational workflows, examining data availability and identifying where AI is likely to produce measurable value. The output is a structured opportunity map with prioritised use cases, value hypotheses and an honest feasibility assessment.",
    outputs: [
      "Structured AI opportunity map",
      "Prioritised use case shortlist with rationale",
      "Feasibility assessment per use case",
      "Recommended next steps and sequencing",
    ],
    href: "/contact",
  },
  {
    id: "private-ai",
    label: "02",
    name: "Private AI Deployment",
    tag: "Infrastructure",
    headline: "Deploy AI in controlled, approved environments.",
    body: "For organisations where data cannot be submitted to shared cloud services, Cuxton builds AI infrastructure within approved boundaries — local servers, on-premise GPU environments, private cloud instances or network-isolated tenancies. Architecture is designed around the organisation's data-sensitivity requirements, access policies and technical constraints.",
    outputs: [
      "Architecture design aligned to data sensitivity requirements",
      "Deployment within approved infrastructure",
      "Model selection and tuning",
      "Security, access and change management documentation",
    ],
    href: "/contact",
  },
  {
    id: "knowledge",
    label: "03",
    name: "Knowledge-Grounded AI",
    tag: "Knowledge Systems",
    headline: "Connect AI to your institutional knowledge.",
    body: "General-purpose AI doesn't know your internal policies, terminology, protocols or documents. Cuxton builds retrieval-augmented systems that connect AI to an organisation's authorised knowledge stores — enabling AI to draw from the right sources, respect permission boundaries and support responses with traceable references.",
    outputs: [
      "Knowledge pipeline design and build",
      "Secure connection to authorised data sources",
      "Permission-aware retrieval aligned to access policies",
      "Attribution and source traceability",
    ],
    href: "/contact",
  },
  {
    id: "agents",
    label: "04",
    name: "AI Agents",
    tag: "AI Agents",
    headline: "AI that can act, not just answer.",
    body: "Cuxton develops AI agents that can perform defined, multi-step tasks on behalf of users and teams — retrieving and synthesising information, preparing outputs, routing requests, supporting customers and initiating workflows within approved boundaries. Access rules, escalation paths and human oversight are defined by the organisation.",
    outputs: [
      "Agent design and build within approved scope",
      "Integration with internal systems and data",
      "Defined escalation and human-in-the-loop controls",
      "Operational monitoring and logging",
    ],
    href: "/contact",
  },
  {
    id: "automation",
    label: "05",
    name: "Workflow Automation",
    tag: "Automation",
    headline: "Reduce repetitive work. Focus skilled time where it matters.",
    body: "Cuxton identifies and automates repetitive, rules-based or information-handling tasks that consume skilled employees' time — data extraction and classification, document processing, report generation, response drafting and operational routing. Automation runs within the organisation's approved systems with clear monitoring and exception handling.",
    outputs: [
      "Workflow analysis and automation opportunity mapping",
      "Automation design and build",
      "Integration with existing operational systems",
      "Exception handling and escalation paths",
    ],
    href: "/contact",
  },
  {
    id: "integration",
    label: "06",
    name: "Enterprise AI Integration",
    tag: "Integration",
    headline: "Connect AI to your existing technology landscape.",
    body: "Cuxton integrates AI capabilities with enterprise applications — ERP, CRM, HRMS, document management and internal APIs — so AI is embedded in existing workflows rather than creating a parallel system. Integration is designed with security, authentication and access control in mind.",
    outputs: [
      "System and API integration architecture",
      "Secure connector build and testing",
      "Identity and access control integration",
      "Documentation and handover",
    ],
    href: "/contact",
  },
  {
    id: "custom",
    label: "07",
    name: "Custom AI Solutions",
    tag: "Custom Build",
    headline: "Specialised applications where standard approaches don't apply.",
    body: "Some problems require AI applications built specifically for the organisation's domain, data structure or operational context. Cuxton designs and builds custom AI solutions where an off-the-shelf product or generic integration would be inadequate — including specialised classification, prediction, analysis or decision-support tools.",
    outputs: [
      "Custom solution design and build",
      "Domain-specific model training or fine-tuning",
      "Evaluation and validation methodology",
      "Documentation and support",
    ],
    href: "/contact",
  },
  {
    id: "realtime",
    label: "08",
    name: "Real-Time Data Intelligence",
    tag: "Analytics",
    headline: "Surface patterns and signals from operational data.",
    body: "Cuxton builds real-time and near-real-time AI systems that process operational data streams to detect patterns, anomalies, risks and opportunities — enabling faster, better-informed decisions without requiring human review of every data point.",
    outputs: [
      "Data pipeline and real-time processing design",
      "Pattern detection and alerting systems",
      "Dashboard and reporting integration",
      "Monitoring and model maintenance procedures",
    ],
    href: "/contact",
  },
  {
    id: "training",
    label: "09",
    name: "AI Training & Enablement",
    tag: "Enablement",
    headline: "Prepare your people to use AI responsibly and effectively.",
    body: "Technology alone does not create value. Cuxton provides training and enablement for organisations adopting AI — covering AI literacy, safe use of AI tools, workflow integration, governance procedures and ongoing learning as capability develops.",
    outputs: [
      "Tailored AI literacy and safe-use training",
      "Governance and responsible-use procedures",
      "Workflow-specific enablement sessions",
      "Ongoing learning resources and support",
    ],
    href: "/contact",
  },
];

export default function SolutionsPage() {
  return (
    <div style={{ background: "var(--background)" }}>

      {/* Hero */}
      <section style={{ padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}
        className="bg-cosmic scanlines">
        <div className="absolute inset-0 hex-grid pointer-events-none" />
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(27,107,138,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label anim-fade d1">Solutions</div>
          <h1 className="section-heading anim-fade-up d2" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", maxWidth: 640, marginBottom: "1.25rem" }}>
            The right AI for the right problem.
          </h1>
          <p className="section-sub anim-fade-up d3" style={{ marginBottom: "2.5rem" }}>
            From identifying where AI can help to building, deploying and enabling it — Cuxton delivers
            AI that is relevant, controlled and connected to the organisation&apos;s actual operations.
          </p>
          <Link href="/contact" className="btn-primary anim-fade-up d4">
            Book an AI Discovery Session
          </Link>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="section-py">
        <div className="section-container">
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {solutions.map((sol, i) => (
              <div key={sol.id} id={sol.id}>
                <div className="card-enterprise card-top-accent" style={{ padding: "2.25rem 2.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="sol-inner">
                    {/* Left */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
                        <span style={{
                          fontSize: "0.65rem", fontWeight: 800, color: "var(--cuxton-amber)",
                          letterSpacing: "0.1em",
                        }}>{sol.label}</span>
                        <span className="tag-teal">{sol.tag}</span>
                      </div>
                      <h2 style={{
                        fontSize: "1.375rem", fontWeight: 800, color: "var(--foreground)",
                        lineHeight: 1.25, marginBottom: "0.625rem",
                      }}>
                        {sol.name}
                      </h2>
                      <p style={{
                        fontSize: "0.95rem", fontWeight: 600, color: "var(--cuxton-teal-light)",
                        marginBottom: "1rem",
                      }}>
                        {sol.headline}
                      </p>
                      <p style={{ fontSize: "0.875rem", color: "rgba(232,237,245,0.55)", lineHeight: 1.75 }}>
                        {sol.body}
                      </p>
                    </div>

                    {/* Right: outputs */}
                    <div style={{
                      background: "rgba(27,107,138,0.06)",
                      border: "1px solid rgba(27,107,138,0.14)",
                      borderRadius: 16, padding: "1.5rem",
                      alignSelf: "start",
                    }}>
                      <p style={{
                        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
                        textTransform: "uppercase", color: "var(--cuxton-amber)",
                        marginBottom: "1rem", opacity: 0.85,
                      }}>
                        What we deliver
                      </p>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                        {sol.outputs.map(o => (
                          <li key={o} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cuxton-teal-light)"
                              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span style={{ fontSize: "0.82rem", color: "rgba(232,237,245,0.6)", lineHeight: 1.55 }}>{o}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="btn-primary"
                        style={{ marginTop: "1.5rem", height: "2.625rem", padding: "0 1.25rem", fontSize: "0.8rem", display: "inline-flex" }}>
                        Discuss this solution
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) { .sol-inner { grid-template-columns: 1.4fr 1fr !important; } }
        `}</style>
      </section>

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
