import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Enterprise AI Built Around Your Data, Workflows and Control",
  description:
    "Cuxton AI helps institutions discover where AI can create real value, then integrates, customises or builds secure AI systems, agents and automations around the organisation's own knowledge and infrastructure.",
};

/* ─────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────── */

const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    name: "AI Strategy & Discovery",
    desc: "Find the highest-value, realistic AI opportunities before investing in technology.",
    href: "/solutions#strategy",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    name: "Private AI Deployment",
    desc: "Deploy AI within approved local, on-premise or private-cloud environments.",
    href: "/solutions#private-ai",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    name: "Knowledge-Grounded AI",
    desc: "Connect AI to authorised institutional documents, databases and knowledge.",
    href: "/solutions#knowledge",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
    ),
    name: "AI Agents",
    desc: "Task-oriented agents that perform defined work within approved boundaries.",
    href: "/solutions#agents",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    name: "Workflow Automation",
    desc: "Reduce repetitive manual work and accelerate operational processes.",
    href: "/solutions#automation",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    name: "Enterprise Integration",
    desc: "Connect AI safely with existing applications, identity and business systems.",
    href: "/solutions#integration",
  },
];

const industries = [
  {
    name: "Financial Services",
    desc: "Fraud detection, compliance assistants, internal knowledge and data-analysis agents.",
    href: "/industries#finance",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: "Healthcare",
    desc: "Clinical knowledge assistants, document support, operational analytics and pattern detection.",
    href: "/industries#healthcare",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: "Government",
    desc: "Sovereign knowledge systems, service-request automation and secure institutional assistants.",
    href: "/industries#government",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Education & Research",
    desc: "Student analytics, institutional knowledge assistants, research support and administrative AI.",
    href: "/industries#education",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    name: "Telecommunications",
    desc: "Customer-service agents, operations analytics, knowledge systems and enterprise integration.",
    href: "/industries#telecom",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1.05 4.05A11 11 0 0 1 22.95 19.95" /><path d="M4.22 7.22a7.5 7.5 0 0 1 10.56 10.56" /><path d="M7.39 10.39a4 4 0 0 1 5.66 5.66" /><circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Legal & Audit",
    desc: "Evidence retrieval, document review support, internal knowledge and attribution trails.",
    href: "/industries#legal",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
      </svg>
    ),
  },
];

const differentiators = [
  { label: "Problem-first", desc: "We begin with the institution's operational need, not a product we want to sell." },
  { label: "Model-agnostic", desc: "We use an existing model when it's the right answer and customise or build when the problem requires it." },
  { label: "Privacy-aware", desc: "Architecture is designed around data sensitivity, permissions and organisational control." },
  { label: "Institution-grounded", desc: "AI connected to authorised internal knowledge for more relevant, verifiable responses." },
  { label: "End-to-end", desc: "Strategy, engineering, integration, deployment, training and support can sit within one engagement." },
  { label: "Long-term partner", desc: "The relationship can continue through optimisation, maintenance and expansion." },
];

const engagementSteps = [
  { n: "01", name: "Discover", desc: "Stakeholder conversations, business objectives, workflows, pain points and candidate AI opportunities." },
  { n: "02", name: "Assess", desc: "Data availability, systems, privacy constraints, feasibility and expected value." },
  { n: "03", name: "Prioritise", desc: "Select a focused use case with clear users, success measures and implementation boundaries." },
  { n: "04", name: "Design", desc: "Architecture, model choice, data approach, integrations, governance and delivery plan." },
  { n: "05", name: "Prototype", desc: "Build a controlled proof of concept and test with representative users and data." },
  { n: "06", name: "Deploy", desc: "Production integration, security hardening, documentation and go-live." },
  { n: "07", name: "Enable", desc: "Training, handover, governance procedures and operational processes." },
  { n: "08", name: "Operate & Optimise", desc: "Monitoring, updates, tuning, support and expansion into proven workflows." },
];

const insights = [
  { title: "Private AI vs public AI: how to choose the right deployment model", tag: "Architecture" },
  { title: "A framework for choosing your first enterprise AI use case", tag: "AI Strategy" },
  { title: "What an AI agent can safely automate inside an institution", tag: "AI Agents" },
  { title: "Why enterprise AI needs authorised knowledge and source attribution", tag: "Grounding" },
  { title: "Building an enterprise AI governance model", tag: "Governance" },
  { title: "On-premise vs private cloud vs isolated tenancy for AI", tag: "Architecture" },
];

const privateAIPillars = [
  { label: "Data control", desc: "Maintain clear ownership over where data resides and how it is used." },
  { label: "Permission-aware", desc: "Retrieval that respects existing access rules and role boundaries." },
  { label: "Auditability", desc: "Logs, records and visibility for governance and compliance requirements." },
  { label: "Deployment choice", desc: "On-premise, private cloud or isolated tenancy — based on your constraints." },
  { label: "Model choice", desc: "Select or switch models without lock-in to a single vendor or platform." },
  { label: "Human oversight", desc: "People remain in control of consequential decisions and escalation paths." },
];

/* ─────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div style={{ background: "var(--background)" }}>

      {/* ════════════════════════════════════════════
          1. HERO
          ════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "6rem" }}
        className="bg-cosmic scanlines">
        <div className="absolute inset-0 hex-grid pointer-events-none" />

        {/* Radial glow */}
        <div className="absolute pointer-events-none" style={{
          width: 800, height: 800,
          left: "50%", top: "40%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(27,107,138,0.16) 0%, rgba(245,166,35,0.04) 45%, transparent 70%)",
        }} />

        <div className="section-container" style={{ position: "relative", zIndex: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "center" }}
            className="hero-grid">

            {/* Left: copy */}
            <div style={{ maxWidth: 620 }}>
              {/* Eyebrow */}
              <div className="section-label anim-fade d1">
                Private &amp; Practical Enterprise AI
              </div>

              {/* Headline */}
              <h1 style={{
                fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                marginBottom: "1.5rem",
              }} className="anim-fade-up d2">
                <span className="text-gradient-hero">Enterprise AI</span>
                <br />
                <span style={{ color: "var(--foreground)" }}>built around your data,</span>
                <br />
                <span style={{ color: "var(--foreground)" }}>workflows and control.</span>
              </h1>

              {/* Body */}
              <p className="section-sub anim-fade-up d3" style={{ maxWidth: 540 }}>
                Cuxton AI helps institutions discover where AI can create real value, then integrates,
                customises or builds secure AI systems, agents and automations around the organisation&apos;s
                own knowledge, infrastructure and operational needs.
              </p>

              {/* Trust line */}
              <div className="anim-fade-up d4" style={{
                display: "flex", flexWrap: "wrap", gap: "0.625rem",
                marginTop: "1.75rem", marginBottom: "2.25rem",
              }}>
                {["Private deployment", "AI agents", "Workflow automation", "Knowledge-grounded"].map(t => (
                  <span key={t} className="tag-teal">{t}</span>
                ))}
              </div>

              {/* CTAs */}
              <div className="anim-fade-up d5" style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
                <Link href="/contact" className="btn-primary" style={{ height: "3.25rem", padding: "0 1.75rem", fontSize: "0.9rem" }}>
                  Book an AI Discovery Session
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/solutions" className="btn-secondary" style={{ height: "3.25rem", padding: "0 1.75rem", fontSize: "0.9rem" }}>
                  Explore Solutions
                </Link>
              </div>
            </div>

            {/* Right: Architecture data-flow diagram */}
            <div className="anim-fade-scale d3" style={{ position: "relative" }}>
              <ArchDiagram />
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            .hero-grid { grid-template-columns: 1.1fr 0.9fr !important; }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════
          2. THE PROBLEM
          ════════════════════════════════════════════ */}
      <section className="section-py" style={{ background: "var(--bg-surface)" }}>
        <div className="section-container">
          <div className="section-label">The Challenge</div>
          <h2 className="section-heading" style={{ maxWidth: 560, marginBottom: "1.25rem" }}>
            AI should fit your organisation — not the other way around.
          </h2>
          <p className="section-sub" style={{ marginBottom: "3rem" }}>
            Many institutions have valuable data, repetitive processes and clear AI opportunities — but adoption
            becomes difficult when the environment adds friction.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {[
              ["Sensitive data constraints", "Data may not be appropriate for uncontrolled external environments."],
              ["Lack of institutional context", "General-purpose models don't automatically understand internal policies or terminology."],
              ["Disconnected knowledge", "Valuable documents and databases remain hard to search and use."],
              ["Operational drag", "Repetitive work consumes skilled employees' time and focus."],
              ["Technology-first AI projects", "Programmes often begin with a model choice instead of a measurable business problem."],
            ].map(([title, body]) => (
              <div key={title} className="card-enterprise card-top-accent" style={{ padding: "1.5rem" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "var(--cuxton-amber)", marginBottom: "1rem",
                }} />
                <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem", lineHeight: 1.4 }}>{title}</p>
                <p style={{ fontSize: "0.825rem", color: "rgba(232,237,245,0.5)", lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-container"><div className="section-divider" /></div>

      {/* ════════════════════════════════════════════
          3. WHAT CUXTON AI DOES
          ════════════════════════════════════════════ */}
      <section className="section-py">
        <div className="section-container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "3rem" }}>
            <div>
              <div className="section-label">Our Solutions</div>
              <h2 className="section-heading">From AI opportunity<br />to operational solution.</h2>
            </div>
            <Link href="/solutions" className="btn-secondary">View all solutions</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {services.map(s => (
              <Link key={s.name} href={s.href} style={{ textDecoration: "none" }}>
                <div className="card-enterprise card-top-accent" style={{ padding: "1.75rem", height: "100%" }}>
                  <div className="card-icon" style={{ color: "var(--cuxton-teal-light)", marginBottom: "1.25rem" }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.625rem", lineHeight: 1.35 }}>
                    {s.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(232,237,245,0.5)", lineHeight: 1.65 }}>
                    {s.desc}
                  </p>
                  <div style={{
                    marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.375rem",
                    fontSize: "0.8rem", fontWeight: 600, color: "var(--cuxton-teal-light)",
                  }}>
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. WHY PRIVATE / CONTROLLED AI
          ════════════════════════════════════════════ */}
      <section className="section-py" style={{ background: "var(--bg-surface)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "center" }}
            className="private-grid">
            <div>
              <div className="section-label">Private AI</div>
              <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>
                Control where<br />it matters.
              </h2>
              <p className="section-sub" style={{ marginBottom: "2rem" }}>
                For institutions handling sensitive or proprietary information, AI architecture must begin with
                where data is allowed to be. Cuxton designs around that boundary — helping clients maintain
                stronger control over data, access, logs, model behaviour and change management.
              </p>
              <Link href="/technology" className="btn-secondary">
                Explore our technology approach
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
              {privateAIPillars.map(p => (
                <div key={p.label} className="card-enterprise" style={{ padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--cuxton-teal-light)", marginBottom: "0.4rem" }}>
                    {p.label}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(232,237,245,0.45)", lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) { .private-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════
          5. INDUSTRIES
          ════════════════════════════════════════════ */}
      <section className="section-py">
        <div className="section-container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "3rem" }}>
            <div>
              <div className="section-label">Industries</div>
              <h2 className="section-heading">Built for data-rich<br />and high-trust environments.</h2>
            </div>
            <Link href="/industries" className="btn-secondary">All industries</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {industries.map(ind => (
              <Link key={ind.name} href={ind.href} style={{ textDecoration: "none" }}>
                <div className="card-enterprise card-top-amber card-top-accent card-amber-accent" style={{ padding: "1.75rem", height: "100%" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(245,166,35,0.08)",
                    border: "1px solid rgba(245,166,35,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--cuxton-amber)", marginBottom: "1.25rem",
                    flexShrink: 0,
                  }}>
                    {ind.icon}
                  </div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>
                    {ind.name}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "rgba(232,237,245,0.48)", lineHeight: 1.65 }}>
                    {ind.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. AI AGENTS & AUTOMATION
          ════════════════════════════════════════════ */}
      <section className="section-py" style={{ background: "var(--bg-surface)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "center" }}
            className="agents-grid">
            {/* Example scenario card */}
            <div className="card-enterprise" style={{ padding: "2rem", position: "relative", overflow: "hidden" }}>
              {/* Glow accent */}
              <div style={{
                position: "absolute", top: 0, right: 0, width: 200, height: 200,
                background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div className="tag-amber" style={{ marginBottom: "1.5rem" }}>Example — Customer Service Agent</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {[
                  ["Receive", "Enquiry arrives through an approved channel"],
                  ["Understand", "Agent interprets the request and intent"],
                  ["Retrieve", "Fetches authorised company information"],
                  ["Respond", "Prepares or sends an appropriate response"],
                  ["Escalate", "Routes exceptions to a human team with full context"],
                ].map(([step, desc], i) => (
                  <div key={step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: i === 4 ? "rgba(245,166,35,0.1)" : "rgba(27,107,138,0.12)",
                      border: `1px solid ${i === 4 ? "rgba(245,166,35,0.25)" : "rgba(27,107,138,0.2)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.65rem", fontWeight: 800, flexShrink: 0,
                      color: i === 4 ? "var(--cuxton-amber)" : "var(--cuxton-teal-light)",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)" }}>{step}</span>
                      <span style={{ fontSize: "0.82rem", color: "rgba(232,237,245,0.45)", marginLeft: "0.5rem" }}>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="section-label">AI Agents</div>
              <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>
                AI that can do more<br />than answer questions.
              </h2>
              <p className="section-sub" style={{ marginBottom: "1.25rem" }}>
                Cuxton develops AI agents that can perform approved tasks on behalf of users and teams — retrieving
                information, preparing responses, routing requests, summarising documents and supporting
                customer interactions.
              </p>
              <p className="section-sub" style={{ marginBottom: "2rem" }}>
                Access rules, escalation paths and human oversight are defined by the organisation.
              </p>
              <Link href="/solutions#agents" className="btn-primary">
                Learn about AI Agents
              </Link>
            </div>
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) { .agents-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════
          7. HOW WE WORK
          ════════════════════════════════════════════ */}
      <section className="section-py">
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>How We Work</div>
            <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
              Start with the problem. Scale what works.
            </h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              We don&apos;t begin by prescribing a model. We begin by understanding the problem, workflow,
              data, users and desired outcome.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem" }}>
            {engagementSteps.map((s, i) => (
              <div key={s.name} className="card-enterprise" style={{ padding: "1.5rem" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem",
                }}>
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 800, color: "var(--cuxton-amber)",
                    letterSpacing: "0.05em",
                  }}>{s.n}</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(27,107,138,0.15)" }} />
                </div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>
                  {s.name}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "rgba(232,237,245,0.45)", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/how-we-work" className="btn-secondary">
              See our full engagement model
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          8. WHY CUXTON
          ════════════════════════════════════════════ */}
      <section className="section-py" style={{ background: "var(--bg-surface)" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Why Cuxton AI</div>
            <h2 className="section-heading">
              Built on principles,<br />not product preferences.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {differentiators.map(d => (
              <div key={d.label} className="card-enterprise" style={{ padding: "1.625rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--cuxton-amber)", flexShrink: 0,
                  }} />
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)" }}>
                    {d.label}
                  </h3>
                </div>
                <p style={{ fontSize: "0.82rem", color: "rgba(232,237,245,0.48)", lineHeight: 1.65 }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          9. INSIGHTS
          ════════════════════════════════════════════ */}
      <section className="section-py">
        <div className="section-container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "3rem" }}>
            <div>
              <div className="section-label">Insights</div>
              <h2 className="section-heading">Practical thinking on<br />private and enterprise AI.</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.25rem" }}>
            {insights.map(item => (
              <div key={item.title} className="card-enterprise card-top-accent" style={{ padding: "1.75rem" }}>
                <span className="tag-teal" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>{item.tag}</span>
                <h3 style={{
                  fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)",
                  lineHeight: 1.5, marginBottom: "1rem",
                }}>
                  {item.title}
                </h3>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.375rem",
                  fontSize: "0.78rem", fontWeight: 600, color: "rgba(232,237,245,0.35)",
                  marginTop: "auto",
                }}>
                  Coming soon
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          10. FINAL CTA
          ════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", background: "var(--bg-surface)", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(27,107,138,0.1) 0%, transparent 70%)",
        }} />
        <div className="hex-grid absolute inset-0 pointer-events-none" />

        <div className="section-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
            Start the Conversation
          </div>
          <h2 style={{
            fontSize: "clamp(1.875rem, 4.5vw, 3rem)",
            fontWeight: 800, lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
            maxWidth: 640, margin: "0 auto 1.25rem",
          }}>
            Where could AI create measurable value in your organisation?
          </h2>
          <p style={{
            fontSize: "1rem", color: "rgba(232,237,245,0.5)", lineHeight: 1.7,
            maxWidth: 520, margin: "0 auto 2.5rem",
          }}>
            Start with a focused discovery conversation. We&apos;ll discuss your objectives, current systems,
            data constraints and candidate workflows — without requiring confidential information in the first contact.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link href="/contact" className="btn-primary"
              style={{ height: "3.375rem", padding: "0 2rem", fontSize: "0.95rem" }}>
              Book an AI Discovery Session
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/solutions" className="btn-secondary"
              style={{ height: "3.375rem", padding: "0 2rem", fontSize: "0.95rem" }}>
              Explore Solutions
            </Link>
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.78rem", color: "rgba(232,237,245,0.25)" }}>
            No confidential or patient-identifiable data should be submitted through the public form.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ARCHITECTURE DIAGRAM COMPONENT
   ───────────────────────────────────────────────────────── */
function ArchDiagram() {
  const layers = [
    {
      label: "Organisation",
      sub: "People · Teams · Workflows · Policies",
      color: "rgba(245,166,35,0.12)",
      border: "rgba(245,166,35,0.3)",
      text: "var(--cuxton-amber)",
    },
    {
      label: "AI Infrastructure",
      sub: "Selected models · Compute · Security",
      color: "rgba(27,107,138,0.1)",
      border: "rgba(27,107,138,0.28)",
      text: "var(--cuxton-teal-light)",
    },
    {
      label: "Secure Data & Knowledge",
      sub: "Databases · Documents · Permissions · Retrieval",
      color: "rgba(27,107,138,0.07)",
      border: "rgba(27,107,138,0.2)",
      text: "var(--cuxton-teal-light)",
    },
    {
      label: "AI Applications",
      sub: "Assistants · Agents · Automations · Analytics",
      color: "rgba(245,166,35,0.07)",
      border: "rgba(245,166,35,0.2)",
      text: "var(--cuxton-amber)",
    },
  ];

  return (
    <div style={{
      background: "rgba(9,21,37,0.7)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(27,107,138,0.18)",
      borderRadius: 24,
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -40, right: -40, width: 180, height: 180,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <p style={{
        fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em",
        textTransform: "uppercase", color: "var(--cuxton-amber)",
        marginBottom: "1.5rem", opacity: 0.8,
      }}>
        Controlled Environment
      </p>

      <div style={{
        border: "1px dashed rgba(27,107,138,0.25)",
        borderRadius: 16,
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}>
        {layers.map((layer, i) => (
          <div key={layer.label}>
            <div style={{
              background: layer.color,
              border: `1px solid ${layer.border}`,
              borderRadius: 12,
              padding: "1rem 1.25rem",
            }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: layer.text, marginBottom: "0.25rem" }}>
                {layer.label}
              </p>
              <p style={{ fontSize: "0.72rem", color: "rgba(232,237,245,0.4)", lineHeight: 1.4 }}>
                {layer.sub}
              </p>
            </div>
            {i < layers.length - 1 && (
              <div style={{ display: "flex", justifyContent: "center", padding: "0.25rem 0" }}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 0v8M4 6l4 4 4-4" stroke="rgba(27,107,138,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom label */}
      <p style={{
        marginTop: "1.25rem", textAlign: "center",
        fontSize: "0.68rem", color: "rgba(232,237,245,0.25)", letterSpacing: "0.05em",
      }}>
        Illustrative architecture — actual design depends on client requirements
      </p>
    </div>
  );
}
