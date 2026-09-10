"use client";

import { useState } from "react";
import styles from "./CompanyPrinciplesMatrix.module.css";

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--cuxton-teal-text)"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.checkIcon}
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.schematicFooterIcon} aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

interface PrincipleData {
  n: string;
  code: string;
  label: string;
  tagline: string;
  desc: string;
  commitments: string[];
  footerNote: string;
  renderGraphic: () => React.ReactNode;
}

const principlesData: PrincipleData[] = [
  {
    n: "01",
    code: "CUX-PRI-01",
    label: "Problem-First",
    tagline: "Begin with measurable operational friction, never a technology preference.",
    desc: "AI adoption should begin with an authentic business problem, not a technology preference. We invest time in deeply examining your operating workflows, data availability, and true friction points before recommending or building any solution.",
    commitments: [
      "Vendor-neutral diagnosis before any model selection",
      "Rigorous mapping of operational workflows and data readiness",
      "Explicit problem-definition sign-off required prior to engineering",
    ],
    footerNote: "Every engagement begins with an objective discovery audit.",
    renderGraphic: () => (
      <svg width="100%" height="160" viewBox="0 0 340 160" fill="none" aria-hidden="true">
        <rect x="15" y="55" width="85" height="50" rx="6" fill="var(--sch-panel)" stroke="rgba(27, 107, 138, 0.4)" strokeWidth="1.5" />
        <text x="57" y="78" fill="var(--sch-text)" fontSize="10" fontWeight="700" textAnchor="middle">Business</text>
        <text x="57" y="93" fill="var(--sch-amber-text)" fontSize="9" textAnchor="middle">Friction</text>
        
        <path d="M100 80h30" stroke="var(--cuxton-teal-light)" strokeWidth="2" strokeDasharray="3 3" />
        <polygon points="130,80 124,76 124,84" fill="var(--cuxton-teal-light)" />
        
        <rect x="135" y="45" width="95" height="70" rx="6" fill="var(--sch-deep)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <text x="182" y="70" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="700" textAnchor="middle">Necessity</text>
        <text x="182" y="85" fill="var(--sch-text)" fontSize="10" fontWeight="700" textAnchor="middle">Filter</text>
        <text x="182" y="100" fill="var(--sch-text-faint)" fontSize="8" textAnchor="middle">ROI Verification</text>

        <path d="M230 80h30" stroke="var(--cuxton-teal-light)" strokeWidth="2" />
        <polygon points="260,80 254,76 254,84" fill="var(--cuxton-teal-light)" />

        <rect x="265" y="55" width="65" height="50" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-amber)" strokeWidth="1.5" />
        <text x="297" y="78" fill="var(--sch-text)" fontSize="10" fontWeight="700" textAnchor="middle">Targeted</text>
        <text x="297" y="93" fill="var(--sch-amber-text)" fontSize="9" textAnchor="middle">Solution</text>
      </svg>
    ),
  },
  {
    n: "02",
    code: "CUX-PRI-02",
    label: "Honest Feasibility",
    tagline: "We advise when not to build. Trust is more valuable than billable hours.",
    desc: "We will tell a client when a candidate use case is not viable, when data hygiene is insufficient, or when projected ROI does not justify capital expenditure. We decline engagements that lack a credible path to operational value.",
    commitments: [
      "Explicit walk-away criteria if data fails validation gates",
      "Total transparency regarding infrastructure and token costs",
      "Honest assessment of internal team readiness and adoption hurdles",
    ],
    footerNote: "Institutional trust takes years to build and seconds to lose.",
    renderGraphic: () => (
      <svg width="100%" height="160" viewBox="0 0 340 160" fill="none" aria-hidden="true">
        <rect x="20" y="30" width="300" height="100" rx="8" fill="var(--sch-deep)" stroke="rgba(27, 107, 138, 0.35)" strokeWidth="1.5" />
        <text x="35" y="52" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="700">FEASIBILITY STRESS TEST</text>
        
        {/* Metric 1 */}
        <text x="35" y="75" fill="var(--sch-text-dim)" fontSize="9">Data Readiness</text>
        <rect x="130" y="67" width="120" height="8" rx="4" fill="var(--sch-panel)" />
        <rect x="130" y="67" width="105" height="8" rx="4" fill="var(--cuxton-teal-light)" />
        <text x="260" y="75" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700">88% PASS</text>

        {/* Metric 2 */}
        <text x="35" y="95" fill="var(--sch-text-dim)" fontSize="9">Compliance Clearance</text>
        <rect x="130" y="87" width="120" height="8" rx="4" fill="var(--sch-panel)" />
        <rect x="130" y="87" width="120" height="8" rx="4" fill="var(--cuxton-teal-light)" />
        <text x="260" y="95" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700">100% PASS</text>

        {/* Metric 3 */}
        <text x="35" y="115" fill="var(--sch-text-dim)" fontSize="9">Projected ROI Delta</text>
        <rect x="130" y="107" width="120" height="8" rx="4" fill="var(--sch-panel)" />
        <rect x="130" y="107" width="95" height="8" rx="4" fill="var(--cuxton-amber)" />
        <text x="260" y="115" fill="var(--sch-amber-text)" fontSize="9" fontWeight="700">3.8x VERIFIED</text>
      </svg>
    ),
  },
  {
    n: "03",
    code: "CUX-PRI-03",
    label: "Data Control",
    tagline: "Runs on your own infrastructure, never shared with other tenants.",
    desc: "For institutions handling sensitive, proprietary, or regulated information, control over data residency and computational custody is non-negotiable. We architect private environments that ensure zero data leaks to public foundation models.",
    commitments: [
      "On-premise, air-gapped, or VPC single-tenant execution",
      "Zero telemetry, prompt logging, or model retraining on client data",
      "Client-held cryptographic keys (CMEK / BYOK) with audit attestations",
    ],
    footerNote: "Your data stays inside your perimeter. Period.",
    renderGraphic: () => (
      <svg width="100%" height="160" viewBox="0 0 340 160" fill="none" aria-hidden="true">
        {/* Outer Perimeter */}
        <rect x="25" y="25" width="290" height="110" rx="10" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="40" y="45" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700" letterSpacing="0.08em">SECURE SOVEREIGN PERIMETER</text>

        {/* Inner Enclave */}
        <rect x="55" y="55" width="105" height="60" rx="6" fill="var(--sch-deep)" stroke="rgba(27, 107, 138, 0.4)" strokeWidth="1.5" />
        <text x="107" y="78" fill="var(--sch-text)" fontSize="10" fontWeight="700" textAnchor="middle">Proprietary</text>
        <text x="107" y="93" fill="var(--sch-amber-text)" fontSize="9" textAnchor="middle">Data Store</text>

        {/* Internal Inference Engine */}
        <rect x="180" y="55" width="115" height="60" rx="6" fill="var(--sch-deep)" stroke="var(--cuxton-amber)" strokeWidth="1.5" />
        <text x="237" y="78" fill="var(--sch-text)" fontSize="10" fontWeight="700" textAnchor="middle">Private Model</text>
        <text x="237" y="93" fill="var(--cuxton-teal-light)" fontSize="9" textAnchor="middle">Air-Gapped Node</text>

        <path d="M160 85h20" stroke="var(--cuxton-teal-light)" strokeWidth="2" />
        
        {/* Blocked external connection */}
        <line x1="295" y1="85" x2="330" y2="85" stroke="var(--status-error)" strokeWidth="2" strokeDasharray="2 2" />
        <circle cx="312" cy="85" r="7" fill="var(--status-error)" />
        <line x1="308" y1="81" x2="316" y2="89" stroke="var(--sch-text)" strokeWidth="1.5" />
        <line x1="316" y1="81" x2="308" y2="89" stroke="var(--sch-text)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    n: "04",
    code: "CUX-PRI-04",
    label: "Appropriate Use of AI",
    tagline: "Proportional engineering: right tool, right complexity, lowest overhead.",
    desc: "Not every problem requires generative AI, and not every AI system needs a monolithic foundation model. We deploy deterministic algorithms, compact models, and specialized microservices proportionate to the task.",
    commitments: [
      "Rule-based deterministic automation prioritized whenever sufficient",
      "Domain-specialized compact SLMs chosen over 70B parameter models",
      "Substantially reduced latency, carbon footprint, and token expenditure",
    ],
    footerNote: "Simplicity and determinism outperform brute-force scale.",
    renderGraphic: () => (
      <svg width="100%" height="160" viewBox="0 0 340 160" fill="none" aria-hidden="true">
        {/* Matrix comparison */}
        <rect x="25" y="30" width="135" height="100" rx="8" fill="var(--sch-deep)" stroke="var(--status-error)" strokeWidth="1.5" strokeOpacity="0.6" />
        <text x="92" y="50" fill="var(--status-error)" fontSize="9" fontWeight="700" textAnchor="middle">MONOLITHIC LLM</text>
        <text x="92" y="70" fill="var(--sch-text-dim)" fontSize="8" textAnchor="middle">High Latency: 2,400ms</text>
        <text x="92" y="85" fill="var(--sch-text-dim)" fontSize="8" textAnchor="middle">Cost: $$$$ per token</text>
        <text x="92" y="100" fill="var(--sch-text-dim)" fontSize="8" textAnchor="middle">Risk: Hallucinations</text>
        <rect x="52" y="110" width="80" height="14" rx="3" fill="rgba(var(--status-error-rgb), 0.2)" />
        <text x="92" y="121" fill="var(--status-error)" fontSize="8" fontWeight="700" textAnchor="middle">REJECTED</text>

        <rect x="180" y="30" width="135" height="100" rx="8" fill="var(--sch-deep)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <text x="247" y="50" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700" textAnchor="middle">TASK-OPTIMIZED SLM</text>
        <text x="247" y="70" fill="var(--sch-text)" fontSize="8" textAnchor="middle">Latency: &lt; 85ms</text>
        <text x="247" y="85" fill="var(--sch-text)" fontSize="8" textAnchor="middle">Cost: Zero API toll</text>
        <text x="247" y="100" fill="var(--sch-text)" fontSize="8" textAnchor="middle">Output: 100% Deterministic</text>
        <rect x="207" y="110" width="80" height="14" rx="3" fill="rgba(27, 107, 138, 0.35)" />
        <text x="247" y="121" fill="var(--cuxton-teal-light)" fontSize="8" fontWeight="700" textAnchor="middle">APPROVED</text>
      </svg>
    ),
  },
  {
    n: "05",
    code: "CUX-PRI-05",
    label: "Human Oversight",
    tagline: "AI accelerates synthesis; authorized human operators hold ultimate authority.",
    desc: "Consequential decisions must remain with authorized human professionals. AI systems engineered by CuxtonAI are built to elevate human judgement, enforce verification sign-offs, and provide instant manual overrides.",
    commitments: [
      "Irrevocable human-in-the-loop validation gates on critical paths",
      "Explicit confidence scoring and ambiguity thresholds",
      "Audit logs recording who approved what, and when",
    ],
    footerNote: "No black-box execution on mission-critical workflows.",
    renderGraphic: () => (
      <svg width="100%" height="160" viewBox="0 0 340 160" fill="none" aria-hidden="true">
        {/* Model Stage */}
        <rect x="20" y="55" width="80" height="50" rx="6" fill="var(--sch-panel)" stroke="rgba(27, 107, 138, 0.4)" strokeWidth="1.5" />
        <text x="60" y="78" fill="var(--sch-text)" fontSize="10" fontWeight="700" textAnchor="middle">AI Agent</text>
        <text x="60" y="93" fill="var(--cuxton-teal-light)" fontSize="9" textAnchor="middle">Drafts Action</text>

        <path d="M100 80h25" stroke="var(--cuxton-teal-light)" strokeWidth="2" />

        {/* Intercept Gate */}
        <rect x="125" y="45" width="90" height="70" rx="6" fill="var(--sch-deep)" stroke="var(--cuxton-amber)" strokeWidth="2" />
        <circle cx="170" cy="65" r="10" stroke="var(--cuxton-amber)" strokeWidth="1.5" />
        <path d="M165 65h10M170 60v10" stroke="var(--cuxton-amber)" strokeWidth="1.5" />
        <text x="170" y="90" fill="var(--sch-text)" fontSize="9" fontWeight="700" textAnchor="middle">MANDATORY</text>
        <text x="170" y="103" fill="var(--sch-amber-text)" fontSize="9" fontWeight="700" textAnchor="middle">HUMAN SIGN-OFF</text>

        <path d="M215 80h25" stroke="var(--cuxton-teal-light)" strokeWidth="2" />

        {/* Execution */}
        <rect x="240" y="55" width="80" height="50" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <text x="280" y="78" fill="var(--sch-text)" fontSize="10" fontWeight="700" textAnchor="middle">Certified</text>
        <text x="280" y="93" fill="var(--cuxton-teal-light)" fontSize="9" textAnchor="middle">Execution</text>
      </svg>
    ),
  },
  {
    n: "06",
    code: "CUX-PRI-06",
    label: "Institutional Knowledge",
    tagline: "Grounded in authorized corporate memory with verifiable citations.",
    desc: "AI connected directly to an organization's authoritative knowledge base generates far more accurate, reliable, and auditable outputs than generic web-trained models. Every claim links to verifiable internal primary sources.",
    commitments: [
      "Strict Retrieval-Augmented Generation (RAG) tied to verified sources",
      "Clickable document and paragraph-level citation provenance",
      "Dynamic version control and real-time document deprecation synchronization",
    ],
    footerNote: "Ground truth originates from your approved corporate archives.",
    renderGraphic: () => (
      <svg width="100%" height="160" viewBox="0 0 340 160" fill="none" aria-hidden="true">
        {/* Source corpus */}
        <rect x="25" y="45" width="85" height="70" rx="6" fill="var(--sch-panel)" stroke="rgba(27, 107, 138, 0.4)" strokeWidth="1.5" />
        <text x="67" y="72" fill="var(--sch-text)" fontSize="9" fontWeight="700" textAnchor="middle">Approved</text>
        <text x="67" y="87" fill="var(--sch-text)" fontSize="9" fontWeight="700" textAnchor="middle">Policies &amp; Deals</text>
        <text x="67" y="100" fill="var(--sch-amber-text)" fontSize="8" textAnchor="middle">Verified Ground Truth</text>

        <path d="M110 80h25" stroke="var(--cuxton-teal-light)" strokeWidth="2" />

        {/* Vector Enclave */}
        <rect x="135" y="45" width="85" height="70" rx="6" fill="var(--sch-deep)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <text x="177" y="72" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700" textAnchor="middle">Vector Enclave</text>
        <text x="177" y="87" fill="var(--sch-text)" fontSize="8" textAnchor="middle">Semantic Index</text>
        <text x="177" y="100" fill="var(--sch-text-faint)" fontSize="8" textAnchor="middle">Cosine Match</text>

        <path d="M220 80h25" stroke="var(--cuxton-teal-light)" strokeWidth="2" />

        {/* Verifiable Output */}
        <rect x="245" y="45" width="80" height="70" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <text x="285" y="72" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700" textAnchor="middle">Output</text>
        <text x="285" y="87" fill="var(--sch-text)" fontSize="8" textAnchor="middle">+ Source Citations</text>
        <text x="285" y="100" fill="var(--sch-amber-text)" fontSize="8" textAnchor="middle">Audit Ready</text>
      </svg>
    ),
  },
  {
    n: "07",
    code: "CUX-PRI-07",
    label: "Long-Term Partnership",
    tagline: "Autonomous client teams, enduring architectures, complete IP custody.",
    desc: "A system that is well built keeps earning its keep as your teams get better at using it. We train your engineers and operators to run it, change it and extend it without calling us.",
    commitments: [
      "100% intellectual property, custom code, and model weights custody transferred to client",
      "Formal engineering enablement, runbook training, and architectural handoff",
      "Continuous performance drift monitoring and quarterly governance reviews",
    ],
    footerNote: "We build enduring institutional capability, not consultant dependencies.",
    renderGraphic: () => (
      <svg width="100%" height="160" viewBox="0 0 340 160" fill="none" aria-hidden="true">
        {/* Trajectory */}
        <rect x="25" y="30" width="290" height="100" rx="8" fill="var(--sch-deep)" stroke="rgba(27, 107, 138, 0.35)" strokeWidth="1.5" />
        
        {/* Capability curve */}
        <path d="M50 110 Q 140 100, 200 65 T 285 45" fill="none" stroke="var(--cuxton-teal-light)" strokeWidth="2.5" />
        
        <circle cx="50" cy="110" r="4" fill="var(--cuxton-amber)" />
        <text x="50" y="125" fill="var(--sch-text-dim)" fontSize="8" textAnchor="middle">Phase 1: Discovery</text>

        <circle cx="160" cy="85" r="4" fill="var(--cuxton-teal-light)" />
        <text x="160" y="102" fill="var(--sch-text-dim)" fontSize="8" textAnchor="middle">Phase 2: Deploy</text>

        <circle cx="285" cy="45" r="5" fill="var(--cuxton-teal-light)" />
        <text x="285" y="35" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700" textAnchor="middle">Autonomous Client Mastery</text>
      </svg>
    ),
  },
];

export default function CompanyPrinciplesMatrix() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = principlesData[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : principlesData.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < principlesData.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className={styles.matrixSection}>
      <div className={styles.bgImage} aria-hidden="true" />
      <div className={styles.washOverlay} aria-hidden="true" />

      <div className={`${styles.container} ${styles.sectionContent}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.heading}>
            Principles that govern our{" "}
            <span className={styles.headingHighlight}>advisory &amp; engineering.</span>
          </h2>
          <p className={styles.subtext}>
            These are not aspirational marketing statements. They are the non-negotiable operational
            principles that dictate how we evaluate opportunities, what architectures we recommend,
            and when we advise against building.
          </p>
        </div>

        {/* Tab Selector Bar */}
        <div className={styles.tabBar} role="tablist" aria-label="Operating Principles">
          {principlesData.map((p, i) => (
            <button
              key={p.n}
              role="tab"
              aria-selected={activeIdx === i}
              className={`${styles.tabBtn} ${activeIdx === i ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveIdx(i)}
            >
              <span className={styles.tabNum}>{p.n}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Featured Stage Card */}
        <div className={styles.stageCard}>
          <div className={styles.stageGrid}>
            {/* Left Narrative Column */}
            <div className={styles.narrativeCol}>
              <div>
                <div className={styles.narrativeHeader}>
                  <div className={styles.tenetBadge}>
                    <span>TENET {current.n} / 07</span>
                    <span className={styles.tenetBadgeDot} aria-hidden="true" />
                  </div>
                  <span className={styles.tenetCode}>{current.code}</span>
                </div>

                <h3 className={styles.principleTitle}>{current.label}</h3>
                <p className={styles.principleTagline}>{current.tagline}</p>
                <p className={styles.principleDesc}>{current.desc}</p>

                {/* Commitments Box */}
                <div className={styles.commitmentsBox}>
                  <p className={styles.commitmentsTitle}>Operational Commitments</p>
                  <ul className={styles.commitmentsList}>
                    {current.commitments.map((c) => (
                      <li key={c} className={styles.commitmentItem}>
                        <CheckIcon />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className={styles.pagerFooter}>
                <span className={styles.pagerIndex}>
                  PRINCIPLE {current.n} OF {principlesData.length}
                </span>
                <div className={styles.pagerControls}>
                  <button
                    onClick={handlePrev}
                    className={styles.pagerBtn}
                    aria-label="Previous principle"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    onClick={handleNext}
                    className={styles.pagerBtn}
                    aria-label="Next principle"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Schematic Visual Column */}
            <div className={styles.schematicCol}>
              <div className={styles.schematicHeader}>
                <div className={styles.schematicBadge}>
                  <span className={styles.schematicDot} aria-hidden="true" />
                </div>
                
              </div>

              <div className={styles.schematicVisualStage}>
                {current.renderGraphic()}
              </div>

              <div className={styles.schematicFooter}>
                <ShieldIcon />
                <span>{current.footerNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
