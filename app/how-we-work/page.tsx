import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Work — Cuxton AI Engagement Model",
  description:
    "Cuxton AI's 8-step engagement model: from AI opportunity discovery through to operational deployment, training and long-term support.",
};

const steps = [
  {
    n: "01",
    name: "Discover",
    tagline: "Understand before recommending.",
    desc: "We begin with structured conversations with stakeholders across the organisation — operations, technology, legal, compliance and leadership. We explore business objectives, current workflows, pain points, data availability and where manual or information-intensive processes create the most friction.",
    outputs: ["Stakeholder conversation notes", "Workflow and pain-point map", "Initial AI opportunity inventory"],
  },
  {
    n: "02",
    name: "Assess",
    tagline: "Evaluate feasibility before committing to a direction.",
    desc: "Each candidate use case is assessed across multiple dimensions: data availability and quality, technical feasibility, privacy and regulatory constraints, expected value, implementation complexity and organisational readiness. We are honest when a use case is not viable or not worth pursuing.",
    outputs: ["Feasibility assessment per use case", "Data and systems review", "Privacy and regulatory constraint mapping"],
  },
  {
    n: "03",
    name: "Prioritise",
    tagline: "Focus on what will deliver real value first.",
    desc: "We work with the client to select one focused use case for initial delivery — prioritised by the combination of expected value, feasibility, data readiness and organisational appetite. Clear success measures are agreed before design begins.",
    outputs: ["Prioritised use case selection", "Agreed success criteria and measurement approach", "High-level delivery scope"],
  },
  {
    n: "04",
    name: "Design",
    tagline: "Architecture before build.",
    desc: "Full technical design of the solution: AI architecture, deployment model, model selection, data pipeline design, integration points, access and permission structure, governance framework, security requirements and delivery plan. Design is reviewed and approved before development begins.",
    outputs: ["Technical architecture document", "Data pipeline and integration design", "Governance and security framework", "Delivery plan with milestones"],
  },
  {
    n: "05",
    name: "Prototype",
    tagline: "Build a controlled proof of concept.",
    desc: "A functional prototype is built and tested with representative users and approved data. Prototype testing reveals real-world performance, identifies gaps between design assumptions and actual behaviour, and gives users early experience of the AI — enabling informed feedback before production investment.",
    outputs: ["Working prototype in a controlled environment", "User testing sessions and feedback", "Performance and gap assessment", "Refined requirements for production build"],
  },
  {
    n: "06",
    name: "Deploy",
    tagline: "Production-ready. Properly integrated.",
    desc: "The production solution is built, integrated with approved systems, security-hardened and deployed within the agreed infrastructure environment. Documentation covers architecture, configuration, operational procedures and maintenance requirements.",
    outputs: ["Production deployment", "Systems and security integration", "Technical documentation", "Operational procedures"],
  },
  {
    n: "07",
    name: "Enable",
    tagline: "Equip the people who will use it.",
    desc: "Technology alone does not create value. We provide training for users and administrators, handover of operational procedures, documentation of governance processes and — where relevant — a governance framework the organisation can manage going forward.",
    outputs: ["User training sessions", "Administrator handover", "Governance documentation", "Escalation and incident procedures"],
  },
  {
    n: "08",
    name: "Operate & Optimise",
    tagline: "The relationship continues after go-live.",
    desc: "AI systems require ongoing monitoring, maintenance and periodic improvement. Cuxton can provide ongoing support covering performance monitoring, model updates, data pipeline maintenance, optimisation cycles and expansion of the system into adjacent workflows as confidence and capability grow.",
    outputs: ["Performance monitoring and reporting", "Model and data maintenance", "Periodic optimisation reviews", "Expansion planning"],
  },
];

const principles = [
  { label: "Problem-first", desc: "Every engagement begins with understanding the business problem — not the AI solution." },
  { label: "Honest feasibility", desc: "We tell clients when a use case is not viable. Our value is in finding what will actually work." },
  { label: "Controlled scope", desc: "Initial deployments are deliberately focused. Broad scope early is how AI projects fail." },
  { label: "Human oversight", desc: "Consequential decisions remain with people. AI supports; humans decide." },
  { label: "No unnecessary complexity", desc: "The right solution may not require complex AI. We recommend what the problem requires." },
  { label: "Long-term thinking", desc: "We design for maintainability, not just initial delivery." },
];

export default function HowWeWorkPage() {
  return (
    <div style={{ background: "var(--background)" }}>

      {/* Hero */}
      <section style={{ padding: "5rem 0 4.5rem", position: "relative", overflow: "hidden" }}
        className="bg-cosmic scanlines">
        <div className="absolute inset-0 hex-grid pointer-events-none" />
        <div style={{
          position: "absolute", right: "10%", top: "50%",
          transform: "translateY(-50%)",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(27,107,138,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="section-container" style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
          <div className="section-label anim-fade d1">How We Work</div>
          <h1 className="section-heading anim-fade-up d2"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", marginBottom: "1.25rem" }}>
            Start with the problem.<br />Scale what works.
          </h1>
          <p className="section-sub anim-fade-up d3" style={{ marginBottom: "2.5rem" }}>
            Cuxton AI follows a structured, 8-step engagement model designed to find the right use case,
            build it properly and enable the organisation to operate it with confidence.
          </p>
          <Link href="/contact" className="btn-primary anim-fade-up d4">
            Start with a Discovery Session
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="section-py">
        <div className="section-container">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {steps.map((step, i) => (
              <div key={step.n} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}
                className="step-grid">

                {/* Number + name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: "rgba(27,107,138,0.12)",
                      border: "1px solid rgba(27,107,138,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.65rem", fontWeight: 800,
                      color: "var(--cuxton-amber)", letterSpacing: "0.05em", flexShrink: 0,
                    }}>
                      {step.n}
                    </div>
                    <h2 style={{
                      fontSize: "1.25rem", fontWeight: 800,
                      color: "var(--foreground)", lineHeight: 1.2,
                    }}>
                      {step.name}
                    </h2>
                  </div>
                  <p style={{
                    fontSize: "0.875rem", fontWeight: 600,
                    color: "var(--cuxton-teal-light)", marginLeft: "3.5rem",
                  }}>
                    {step.tagline}
                  </p>
                </div>

                {/* Content */}
                <div className="step-content card-enterprise"
                  id={`step-content-${i}`}
                  style={{ padding: "1.75rem", display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
                  <p style={{ fontSize: "0.875rem", color: "rgba(var(--foreground-rgb),0.55)", lineHeight: 1.75 }}>
                    {step.desc}
                  </p>
                  <div>
                    <p style={{
                      fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--cuxton-amber)",
                      marginBottom: "0.75rem", opacity: 0.8,
                    }}>
                      Outputs
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {step.outputs.map(o => (
                        <div key={o} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--cuxton-teal-light)"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span style={{ fontSize: "0.8rem", color: "rgba(var(--foreground-rgb),0.55)" }}>{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="section-divider" style={{ gridColumn: "1 / -1" }} />
                )}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) {
            .step-grid { grid-template-columns: 220px 1fr !important; align-items: start; }
          }
        `}</style>
      </section>

      {/* Operating principles */}
      <section className="section-py" style={{ background: "var(--bg-surface)" }}>
        <div className="section-container">
          <div className="section-label">Operating Principles</div>
          <h2 className="section-heading" style={{ marginBottom: "3rem" }}>
            How we think about every engagement.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {principles.map(p => (
              <div key={p.label} className="card-enterprise" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.625rem", alignItems: "center", marginBottom: "0.625rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cuxton-amber)", flexShrink: 0 }} />
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)" }}>{p.label}</h3>
                </div>
                <p style={{ fontSize: "0.82rem", color: "rgba(var(--foreground-rgb),0.48)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
