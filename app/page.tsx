import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import CapabilitiesShowcase from "./components/CapabilitiesShowcase";

export const metadata: Metadata = {
  title: "Enterprise AI Built Around Your Data, Workflows and Control",
  description:
    "Cuxton AI helps institutions discover where AI can create real value, then integrates, customises or builds secure AI systems, agents and automations around the organisation's own knowledge and infrastructure.",
};

/* ─────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────── */

/* Two "featured" industries shown as large cards, matching the depth
   already written for these on /industries — kept in sync with that
   page's copy rather than re-authored here. */
const featuredIndustries = [
  {
    name: "Financial Services",
    sub: "Banks · Insurers · Asset Managers · Financial Infrastructure",
    intro: "Financial institutions handle sensitive client data, operate under strict regulatory requirements and face growing demand for efficient, accurate and compliant operations.",
    href: "/industries#finance",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    useCases: [
      ["Compliance monitoring assistants", "Document review, flagging and classification within controlled environments."],
      ["Internal knowledge systems", "Connect AI to approved policies, regulations and internal guidance."],
      ["Fraud and anomaly detection", "Real-time analysis of transactional data to flag patterns for review."],
      ["Customer service agents", "Routine enquiries handled within defined response boundaries."],
    ],
    tags: ["Compliance policies", "Regulatory filings", "Risk reports", "Audit trails"],
  },
  {
    name: "Healthcare",
    sub: "Hospitals · Clinics · Research Organisations · Health Authorities",
    intro: "Healthcare AI must operate under strict data-protection, clinical governance and patient-safety requirements — supporting professionals without making clinical decisions.",
    href: "/industries#healthcare",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    useCases: [
      ["Clinical knowledge assistants", "Fast access to approved protocols and guidelines — without exposing patient data."],
      ["Medical document support", "Review, summarisation and classification within appropriate boundaries."],
      ["Operational analytics", "Pattern analysis to support resource and capacity planning."],
      ["Research knowledge retrieval", "Connect research teams to approved data and literature with attribution."],
    ],
    tags: ["Clinical protocols", "Care guidelines", "Discharge summaries", "Research literature"],
  },
];

const secondaryIndustries = [
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

/* Illustrated agent pipeline — icon per step, connected top-to-bottom */
const agentSteps = [
  {
    step: "Receive",
    desc: "Enquiry arrives through an approved channel",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
  },
  {
    step: "Understand",
    desc: "Agent interprets the request and intent",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    step: "Retrieve",
    desc: "Fetches authorised company information",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    step: "Respond",
    desc: "Prepares or sends an appropriate response",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 17H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-5l-3 3z" /><path d="M9 10h6M9 13h4" />
      </svg>
    ),
  },
  {
    step: "Escalate",
    desc: "Routes exceptions to a human team with full context",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div style={{ background: "var(--background)" }}>

      {/* ════════════════════════════════════════════
          1. HERO — full-width photograph background
          ════════════════════════════════════════════ */}
      <section className={`${styles.hero} scanlines`}>
        <div className={styles.hero__overlay} />
        <div className="absolute inset-0 hex-grid pointer-events-none" />
        <div className={styles.hero__glow} />

        <div className={`section-container ${styles.hero__container}`}>
          <div className={`${styles.hero__grid} hero-grid`}>

            {/* Left: copy */}
            <div className={styles.hero__copy}>
              <div className="section-label anim-fade d1">
                Private &amp; Practical Enterprise AI
              </div>

              <h1 className={`${styles.hero__headline} anim-fade-up d2`}>
                <span className={styles.hero__headlineAccent}>Enterprise AI</span>
                <br />
                <span className={styles.hero__headlineLine}>built around your data,</span>
                <br />
                <span className={styles.hero__headlineLine}>workflows and control.</span>
              </h1>

              <p className={`${styles.hero__body} anim-fade-up d3`}>
                Cuxton AI helps institutions discover where AI can create real value, then integrates,
                customises or builds secure AI systems, agents and automations around the organisation&apos;s
                own knowledge, infrastructure and operational needs.
              </p>

              <div className={`${styles.hero__tags} anim-fade-up d4`}>
                {["Private deployment", "AI agents", "Workflow automation", "Knowledge-grounded"].map(t => (
                  <span key={t} className="tag-teal">{t}</span>
                ))}
              </div>

              <div className={`${styles.hero__ctas} anim-fade-up d5`}>
                <Link href="/contact" className={`btn-primary ${styles.hero__ctaPrimary}`}>
                  Book an AI Discovery Session
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/solutions" className={`btn-secondary ${styles.hero__ctaSecondary}`}>
                  Explore Solutions
                </Link>
              </div>
            </div>

            {/* Right: Architecture data-flow diagram */}
            <div className={`anim-fade-scale d3 ${styles.hero__diagram}`}>
              <ArchDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. THE PROBLEM
          ════════════════════════════════════════════ */}
      <section className={`section-py ${styles.problem}`}>
        <div className="section-container">
          <div className="section-label">The Challenge</div>
          <h2 className={`section-heading ${styles.problem__heading}`}>
            AI should fit your organisation — not the other way around.
          </h2>
          <p className={`section-sub ${styles.problem__intro}`}>
            Many institutions have valuable data, repetitive processes and clear AI opportunities — but adoption
            becomes difficult when the environment adds friction.
          </p>

          <div className={styles.problem__grid}>
            {[
              ["Sensitive data constraints", "Data may not be appropriate for uncontrolled external environments."],
              ["Lack of institutional context", "General-purpose models don't automatically understand internal policies or terminology."],
              ["Disconnected knowledge", "Valuable documents and databases remain hard to search and use."],
              ["Operational drag", "Repetitive work consumes skilled employees' time and focus."],
              ["Technology-first AI projects", "Programmes often begin with a model choice instead of a measurable business problem."],
            ].map(([title, body]) => (
              <div key={title} className={`card-enterprise ${styles.cardAccent} ${styles.problem__card}`}>
                <div className={styles.problem__cardDot} />
                <p className={styles.problem__cardTitle}>{title}</p>
                <p className={styles.problem__cardBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-container"><div className={styles.divider} /></div>

      {/* ════════════════════════════════════════════
          3. WHAT A CUXTON DEPLOYMENT INCLUDES
          ════════════════════════════════════════════ */}
      <section className="section-py">
        <div className="section-container">
          <CapabilitiesShowcase />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. WHY PRIVATE / CONTROLLED AI
          ════════════════════════════════════════════ */}
      <section className={`section-py ${styles.private}`}>
        <div className="section-container">
          <div className={`${styles.private__grid} private-grid`}>
            <div>
              <div className="section-label">Private AI</div>
              <h2 className={`section-heading ${styles.private__heading}`}>
                Control where<br />it matters.
              </h2>
              <p className={`section-sub ${styles.private__body}`}>
                For institutions handling sensitive or proprietary information, AI architecture must begin with
                where data is allowed to be. Cuxton designs around that boundary — helping clients maintain
                stronger control over data, access, logs, model behaviour and change management.
              </p>
              <Link href="/technology" className="btn-secondary">
                Explore our technology approach
              </Link>
            </div>
            <div>
              <BoundaryDiagram />
              <div className={styles.private__pillars}>
                {privateAIPillars.map(p => (
                  <div key={p.label} className={`card-enterprise ${styles.private__pillar}`}>
                    <p className={styles.private__pillarLabel}>
                      {p.label}
                    </p>
                    <p className={styles.private__pillarBody}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. INDUSTRIES
          ════════════════════════════════════════════ */}
      <section className="section-py">
        <div className="section-container">
          <div className={styles.industries__header}>
            <div>
              <div className="section-label">Industries</div>
              <h2 className="section-heading">Built for environments<br />where the data cannot move.</h2>
            </div>
            <p className={styles.industriesIntro}>
              Our deepest focus is financial services and healthcare — sectors where the governance
              requirement is explicit rather than aspirational. Four more sectors below.
            </p>
          </div>

          <div className={styles.industriesFeatured}>
            {featuredIndustries.map(ind => (
              <Link key={ind.name} href={ind.href} className={styles.industries__cardLink}>
                <div className={`card-enterprise ${styles.industriesFeatured__card}`}>
                  <div className={styles.industriesFeatured__head}>
                    <h3 className={styles.industriesFeatured__title}>{ind.name}</h3>
                    <div className={styles.industriesFeatured__badge}>{ind.icon}</div>
                  </div>
                  <p className={styles.industriesFeatured__sub}>{ind.sub}</p>
                  <p className={styles.industriesFeatured__intro}>{ind.intro}</p>

                  <div className={styles.industriesFeatured__useCases}>
                    {ind.useCases.map(([title, desc]) => (
                      <div key={title} className={styles.industriesFeatured__useCase}>
                        <p className={styles.industriesFeatured__useCaseTitle}>{title}</p>
                        <p className={styles.industriesFeatured__useCaseDesc}>{desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className={styles.industriesFeatured__tags}>
                    {ind.tags.map(tag => (
                      <span key={tag} className={styles.industriesFeatured__tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.industries__grid} style={{ marginTop: "1.25rem" }}>
            {secondaryIndustries.map(ind => (
              <Link key={ind.name} href={ind.href} className={styles.industries__cardLink}>
                <div className={`card-enterprise ${styles.cardAccent} ${styles.cardAccentAmber} card-amber-accent ${styles.industries__card}`}>
                  <div className={styles.industries__cardIcon}>
                    {ind.icon}
                  </div>
                  <h3 className={styles.industries__cardTitle}>
                    {ind.name}
                  </h3>
                  <p className={styles.industries__cardBody}>
                    {ind.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/industries" className="btn-secondary">All industries</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. AI AGENTS & AUTOMATION
          ════════════════════════════════════════════ */}
      <section className={`section-py ${styles.agents}`}>
        <div className="section-container">
          <div className={`${styles.agents__grid} agents-grid`}>
            {/* Example scenario card */}
            <div className={`card-enterprise ${styles.agents__scenario}`}>
              <div className={styles.agents__scenarioGlow} />
              <div className={`tag-amber ${styles.agents__scenarioTag}`}>Example — Customer Service Agent</div>
              <div className={styles.agents__scenarioSteps}>
                {agentSteps.map(({ step, desc, icon }, i) => (
                  <div key={step} className={styles.agents__scenarioStepRow}>
                    <div className={styles.agents__scenarioStep}>
                      <div className={`${styles.agents__scenarioStepBadge} ${i === 4 ? styles.agents__scenarioStepBadgeEscalate : ""}`}>
                        {icon}
                      </div>
                      <div>
                        <span className={styles.agents__scenarioStepLabel}>{step}</span>
                        <span className={styles.agents__scenarioStepDesc}>{desc}</span>
                      </div>
                    </div>
                    {i < agentSteps.length - 1 && (
                      <div className={`${styles.agents__scenarioConnector} ${i === 3 ? styles.agents__scenarioConnectorEscalate : ""}`}>
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                          <path d="M6 0v11M2 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="section-label">AI Agents</div>
              <h2 className={`section-heading ${styles.agents__copyHeading}`}>
                AI that can do more<br />than answer questions.
              </h2>
              <p className={`section-sub ${styles.agents__copyBody}`}>
                Cuxton develops AI agents that can perform approved tasks on behalf of users and teams — retrieving
                information, preparing responses, routing requests, summarising documents and supporting
                customer interactions.
              </p>
              <p className={`section-sub ${styles.agents__copyBodyLast}`}>
                Access rules, escalation paths and human oversight are defined by the organisation.
              </p>
              <Link href="/solutions#agents" className="btn-primary">
                Learn about AI Agents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          7. HOW WE WORK
          ════════════════════════════════════════════ */}
      <section className="section-py">
        <div className="section-container">
          <div className={styles.process__header}>
            <div className={`section-label ${styles.process__headerLabel}`}>How We Work</div>
            <h2 className={`section-heading ${styles.process__headerHeading}`}>
              Start with the problem. Scale what works.
            </h2>
            <p className={`section-sub ${styles.process__headerBody}`}>
              We don&apos;t begin by prescribing a model. We begin by understanding the problem, workflow,
              data, users and desired outcome.
            </p>
          </div>

          <div className={styles.process__grid}>
            {engagementSteps.map((s) => (
              <div key={s.name} className={`card-enterprise ${styles.process__card}`}>
                <div className={styles.process__cardHead}>
                  <span className={styles.process__cardNumber}>{s.n}</span>
                  <div className={styles.process__cardRule} />
                </div>
                <h3 className={styles.process__cardTitle}>
                  {s.name}
                </h3>
                <p className={styles.process__cardBody}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.process__footer}>
            <Link href="/how-we-work" className="btn-secondary">
              See our full engagement model
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          8. WHY CUXTON
          ════════════════════════════════════════════ */}
      <section className={`section-py ${styles.principles}`}>
        <div className="section-container">
          <div className={styles.principles__header}>
            <div className={`section-label ${styles.principles__headerLabel}`}>Why Cuxton AI</div>
            <h2 className="section-heading">
              Built on principles,<br />not product preferences.
            </h2>
          </div>
          <div className={styles.principles__grid}>
            {differentiators.map(d => (
              <div key={d.label} className={`card-enterprise ${styles.principles__card}`}>
                <div className={styles.principles__cardHead}>
                  <div className={styles.principles__cardDot} />
                  <h3 className={styles.principles__cardTitle}>
                    {d.label}
                  </h3>
                </div>
                <p className={styles.principles__cardBody}>
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
          <div className={styles.insights__header}>
            <div>
              <div className="section-label">Insights</div>
              <h2 className="section-heading">Practical thinking on<br />private and enterprise AI.</h2>
            </div>
          </div>

          <div className={styles.insights__grid}>
            {insights.map(item => (
              <div key={item.title} className={`card-enterprise ${styles.cardAccent} ${styles.insights__card}`}>
                <span className={`tag-teal ${styles.insights__cardTag}`}>{item.tag}</span>
                <h3 className={styles.insights__cardTitle}>
                  {item.title}
                </h3>
                <div className={styles.insights__cardFooter}>
                  Coming soon
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          10. FINAL CTA — second, subtler use of the hero photo
          ════════════════════════════════════════════ */}
      <section className={styles.cta}>
        <div className={styles.cta__image} />
        <div className={styles.cta__glow} />
        <div className="hex-grid absolute inset-0 pointer-events-none" />

        <div className={`section-container ${styles.cta__container}`}>
          <div className={`section-label ${styles.cta__label}`}>
            Start the Conversation
          </div>
          <h2 className={styles.cta__heading}>
            Where could AI create measurable value in your organisation?
          </h2>
          <p className={styles.cta__body}>
            Start with a focused discovery conversation. We&apos;ll discuss your objectives, current systems,
            data constraints and candidate workflows — without requiring confidential information in the first contact.
          </p>
          <div className={styles.cta__actions}>
            <Link href="/contact" className={`btn-primary ${styles.cta__actionPrimary}`}>
              Book an AI Discovery Session
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/solutions" className={`btn-secondary ${styles.cta__actionSecondary}`}>
              Explore Solutions
            </Link>
          </div>
          <p className={styles.cta__disclaimer}>
            No confidential or patient-identifiable data should be submitted through the public form.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CONTROL BOUNDARY DIAGRAM — illustrates "Private AI": data,
   models and access/logs all feed into AI processing that never
   leaves the organisation's own perimeter.
   ───────────────────────────────────────────────────────── */
const boundaryInputs = [
  {
    label: "Data",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    label: "Models",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="12" height="12" rx="2" /><path d="M6 2v2M12 2v2M18 2v2M6 20v2M12 20v2M18 20v2M2 6h2M2 12h2M2 18h2M20 6h2M20 12h2M20 18h2" />
      </svg>
    ),
  },
  {
    label: "Access & Logs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M11.5 9.5 20 1M17 3l2 2M14 6l2 2" />
      </svg>
    ),
  },
];

function BoundaryDiagram() {
  return (
    <div className={styles.boundary}>
      <p className={styles.boundary__label}>Your Organisation&apos;s Boundary</p>
      <div className={styles.boundary__frame}>
        <div className={styles.boundary__row}>
          {boundaryInputs.map(n => (
            <div key={n.label} className={styles.boundary__node}>
              <div className={styles.boundary__nodeIcon}>{n.icon}</div>
              <span className={styles.boundary__nodeLabel}>{n.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.boundary__merge}>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
            <path d="M6 0v11M2 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className={styles.boundary__core}>
          <div className={styles.boundary__coreIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <div>
            <p className={styles.boundary__coreTitle}>Controlled AI</p>
            <p className={styles.boundary__coreSub}>Processing stays inside your perimeter</p>
          </div>
        </div>
      </div>
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
    <div className={styles.diagram}>
      <div className={styles.diagram__glow} />

      <p className={styles.diagram__label}>
        Controlled Environment
      </p>

      <div className={styles.diagram__frame}>
        {layers.map((layer, i) => (
          <div key={layer.label}>
            <div
              className={styles.diagram__layerBox}
              style={{ background: layer.color, border: `1px solid ${layer.border}` }}
            >
              <p className={styles.diagram__layerTitle} style={{ color: layer.text }}>
                {layer.label}
              </p>
              <p className={styles.diagram__layerSub}>
                {layer.sub}
              </p>
            </div>
            {i < layers.length - 1 && (
              <div className={styles.diagram__arrowWrap}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 0v8M4 6l4 4 4-4" stroke="rgba(27,107,138,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className={styles.diagram__footer}>
        Illustrative architecture — actual design depends on client requirements
      </p>
    </div>
  );
}
