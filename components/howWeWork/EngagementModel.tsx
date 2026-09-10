"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./EngagementModel.module.css";
import MilestoneSchematic, { TopologyRadarDeck } from "./MilestoneSchematics";

interface PipelineStep {
  input: { label: string; text: string };
  process: { label: string; text: string };
  output: { label: string; text: string };
}

interface StepData {
  n: string;
  name: string;
  tagline: string;
  phaseId: number;
  phaseName: string;
  phaseRoman: string;
  cadence: string;
  pipeline: PipelineStep;
  desc: string;
  stakeholders: string[];
  outputs: string[];
  gatingRequirement: string;
}

interface PhaseData {
  id: number;
  roman: string;
  code: string;
  name: string;
  objective: string;
  stepIndices: number[];
}

const PHASES: PhaseData[] = [
  {
    id: 1,
    roman: "I",
    code: "PHASE 01",
    name: "Strategic Discovery",
    objective: "Identify high-leverage friction points, validate data availability, and eliminate unviable paths early.",
    stepIndices: [0, 1],
  },
  {
    id: 2,
    roman: "II",
    code: "PHASE 02",
    name: "Solution Architecture",
    objective: "Prioritise high-ROI use cases, engineer zero-trust system blueprints, and codify compliance controls.",
    stepIndices: [2, 3],
  },
  {
    id: 3,
    roman: "III",
    code: "PHASE 03",
    name: "Controlled Build",
    objective: "Pressure-test hypotheses in isolated sandboxes, harden security boundaries, and deploy into production.",
    stepIndices: [4, 5],
  },
  {
    id: 4,
    roman: "IV",
    code: "PHASE 04",
    name: "Operational Scale",
    objective: "Train your teams, hand over admin custody, and monitor continuously.",
    stepIndices: [6, 7],
  },
];

const STEPS: StepData[] = [
  {
    n: "01",
    name: "Discover",
    tagline: "Understand before recommending.",
    phaseId: 1,
    phaseName: "Strategic Discovery",
    phaseRoman: "Phase I",
    cadence: "Weeks 1–2",
    pipeline: {
      input: { label: "Input Sources", text: "Stakeholder Interviews & Workflow Logs" },
      process: { label: "Diagnostic Engine", text: "Friction Mapping & Opportunity Inventory" },
      output: { label: "Target Deliverable", text: "Scored Enterprise AI Candidate Catalog" },
    },
    desc: "We begin with structured, confidential conversations across your organization—operations, technology, legal, compliance, and executive leadership. We systematically analyze business objectives, map workflow friction, review data readiness, and identify where manual or information-dense processes limit organizational velocity.",
    stakeholders: [
      "Executive Leadership & BU Sponsors",
      "Line-of-Business Process Owners",
      "Enterprise IT & Data Architecture",
      "Legal, Risk & Compliance Leads",
    ],
    outputs: [
      "Executive stakeholder interview syntheses",
      "Cross-departmental workflow & friction map",
      "Initial AI opportunity inventory with preliminary value sizing",
    ],
    gatingRequirement: "Executive agreement on mapped operational bottlenecks and mandate to advance candidate use cases to quantitative assessment.",
  },
  {
    n: "02",
    name: "Assess",
    tagline: "Evaluate feasibility before committing to a direction.",
    phaseId: 1,
    phaseName: "Strategic Discovery",
    phaseRoman: "Phase I",
    cadence: "Weeks 2–3",
    pipeline: {
      input: { label: "Input Sources", text: "Candidate Use Cases & Raw Sample Datasets" },
      process: { label: "Diagnostic Engine", text: "6-Pillar Feasibility & Regulatory Stress-Test" },
      output: { label: "Target Deliverable", text: "Multi-Dimensional Feasibility Scorecard" },
    },
    desc: "Every candidate initiative undergoes rigorous, multi-dimensional validation across six pillars: data completeness and quality, technical feasibility, regulatory and privacy constraints (GDPR, EU AI Act), ROI timeframe, integration friction, and cultural adoption readiness. We advise with complete candour when an initiative is unviable or premature.",
    stakeholders: [
      "Chief Risk & Compliance Officers",
      "Information Security & Privacy Stewards",
      "Engineering & Systems Infrastructure",
      "Operational Unit Leaders",
    ],
    outputs: [
      "Multi-dimensional feasibility scorecard per candidate",
      "Data systems, provenance & quality audit",
      "Privacy, compliance & regulatory constraint analysis",
    ],
    gatingRequirement: "Zero unmitigated high-risk regulatory blockers and verified data quality prior to capital prioritization.",
  },
  {
    n: "03",
    name: "Prioritise",
    tagline: "Focus on what will deliver real value first.",
    phaseId: 2,
    phaseName: "Solution Architecture",
    phaseRoman: "Phase II",
    cadence: "Week 4",
    pipeline: {
      input: { label: "Input Sources", text: "Scored Opportunities & Executive Mandate" },
      process: { label: "Diagnostic Engine", text: "Risk-Adjusted Value Filter & Target Sizing" },
      output: { label: "Target Deliverable", text: "Approved Project Charter & KPI Framework" },
    },
    desc: "Working with executive sponsors, we select a single, focused pilot use case engineered to maximize risk-adjusted impact. We define explicit commercial and operational success criteria before architecture begins, eliminating scope ambiguity and ensuring rapid organizational alignment.",
    stakeholders: [
      "Executive Steering Committee",
      "Target Department Operating Sponsor",
      "Lead Technical Architect",
      "Finance & Procurement Leads",
    ],
    outputs: [
      "Formal use case charter & boundary definition",
      "Empirical success criteria & quantitative KPI framework",
      "High-level delivery scope & commercial business case",
    ],
    gatingRequirement: "Unanimous steering committee sign-off on chosen pilot scope, KPI measurement protocol, and delivery resource allocation.",
  },
  {
    n: "04",
    name: "Design",
    tagline: "Architecture before build.",
    phaseId: 2,
    phaseName: "Solution Architecture",
    phaseRoman: "Phase II",
    cadence: "Weeks 5–6",
    pipeline: {
      input: { label: "Input Sources", text: "Charter Scope & Security Policies" },
      process: { label: "Diagnostic Engine", text: "Zero-Trust Architecture & Pipeline Modeling" },
      output: { label: "Target Deliverable", text: "Technical Architecture Specification (TAS)" },
    },
    desc: "We engineer full enterprise blueprints before writing production code. Specifications encompass model selection and fine-tuning parameters, data sanitization pipelines, integration interfaces, zero-trust role-based access control (RBAC), human-in-the-loop oversight gates, telemetry instrumentation, and milestone-governed implementation schedules.",
    stakeholders: [
      "Principal AI & Systems Architects",
      "Enterprise Security & Infrastructure Teams",
      "Domain Specialist End-Users",
      "Data Protection Officer (DPO)",
    ],
    outputs: [
      "Technical architecture specification & schema design",
      "Data pipeline & zero-trust integration interfaces",
      "Governance, auditability & security protocol",
      "Milestone-gated engineering delivery roadmap",
    ],
    gatingRequirement: "Formal written approval of the technical architecture and compliance framework by enterprise infosec and compliance officers.",
  },
  {
    n: "05",
    name: "Prototype",
    tagline: "Build a controlled proof of concept.",
    phaseId: 3,
    phaseName: "Controlled Build",
    phaseRoman: "Phase III",
    cadence: "Weeks 7–10",
    pipeline: {
      input: { label: "Input Sources", text: "Approved Blueprints & Sanitized Datasets" },
      process: { label: "Diagnostic Engine", text: "Isolated Sandbox Trials & Latency Stress-Testing" },
      output: { label: "Target Deliverable", text: "Benchmarked Prototype & Refined Specs" },
    },
    desc: "We construct a functional proof of concept in a secure sandbox utilizing sanitized or synthetic datasets. Controlled trials with representative operators stress-test real-world performance, measure hallucination boundaries, calibrate inference latency, and validate usability assumptions prior to capital-intensive production engineering.",
    stakeholders: [
      "Target End-Users & Workflow Operators",
      "Cuxton AI Engineering Leads",
      "Data Science & QA Reviewers",
      "Business Unit Product Owner",
    ],
    outputs: [
      "Functional sandboxed prototype environment",
      "End-user usability testing logs & feedback matrix",
      "Empirical accuracy, latency & error benchmark report",
      "Refined production engineering specifications",
    ],
    gatingRequirement: "Prototype achieves agreed target accuracy, latency thresholds, and minimum 85% end-user usability score in sandbox trials.",
  },
  {
    n: "06",
    name: "Deploy",
    tagline: "Production-ready. Properly integrated.",
    phaseId: 3,
    phaseName: "Controlled Build",
    phaseRoman: "Phase III",
    cadence: "Weeks 11–14",
    pipeline: {
      input: { label: "Input Sources", text: "Validated Prototype & Hardened Codebase" },
      process: { label: "Diagnostic Engine", text: "Tenant Integration, Pen-Testing & CI/CD Pipeline" },
      output: { label: "Target Deliverable", text: "Production Release in Dedicated Client Tenant" },
    },
    desc: "The validated solution is hardened to enterprise standards, integrated with core business systems, and deployed inside your dedicated tenant—whether cloud or on-premise. Engineering delivery includes automated integration tests, zero-downtime failover configurations, and comprehensive audit telemetry.",
    stakeholders: [
      "DevOps & Enterprise SRE Teams",
      "Production Data Engineers",
      "Infosec Audit Committee",
      "Cuxton AI Deployment Leads",
    ],
    outputs: [
      "Production deployment within client tenant",
      "Hardened API & enterprise system integrations",
      "Infosec verification & penetration audit documentation",
      "Operational procedures, runbooks & disaster recovery guides",
    ],
    gatingRequirement: "Zero critical findings in infosec penetration testing and formal operational handover clearance by IT operations.",
  },
  {
    n: "07",
    name: "Enable",
    tagline: "Equip the people who will use it.",
    phaseId: 4,
    phaseName: "Operational Scale",
    phaseRoman: "Phase IV",
    cadence: "Weeks 14–16",
    pipeline: {
      input: { label: "Input Sources", text: "Live Production System & Standard Procedures" },
      process: { label: "Diagnostic Engine", text: "Role-Based Academy & Autonomous Incident Drills" },
      output: { label: "Target Deliverable", text: "Certified Workforce & Operational Governance Plan" },
    },
    desc: "Enterprise value materializes only when people adopt and trust the technology. We deliver hands-on, role-tailored training for operators and administrators, transfer operational runbooks, and establish ongoing governance procedures that your internal teams can govern autonomously with complete confidence.",
    stakeholders: [
      "Operational End-Users & Supervisors",
      "Internal System Administrators & Tier-1 Support",
      "Executive Leadership",
      "Cuxton AI Enablement Specialists",
    ],
    outputs: [
      "Role-tailored interactive training sessions & video guides",
      "Administrator operational handover documentation",
      "Governance escalation & incident response protocol",
      "User adoption tracking dashboard & reference materials",
    ],
    gatingRequirement: "100% of core operational staff complete verified training curriculum and internal team executes independent incident response drill.",
  },
  {
    n: "08",
    name: "Operate & Optimise",
    tagline: "The relationship continues after go-live.",
    phaseId: 4,
    phaseName: "Operational Scale",
    phaseRoman: "Phase IV",
    cadence: "Ongoing Strategic Oversight",
    pipeline: {
      input: { label: "Input Sources", text: "Continuous Telemetry Logs & Performance Drift" },
      process: { label: "Diagnostic Engine", text: "Model Drift Monitoring & Recalibration Engine" },
      output: { label: "Target Deliverable", text: "Quarterly ROI Reviews & Expansion Roadmap" },
    },
    desc: "High-performing AI systems require continual vigilance. Cuxton provides long-term operational oversight: real-time telemetry tracking, automated model drift detection, data pipeline maintenance, quarterly optimization cycles, and strategic horizon planning to expand validated capabilities into adjacent enterprise workflows.",
    stakeholders: [
      "Executive Steering Sponsor",
      "Internal AI Operations & Support Team",
      "Cuxton AI Principal Advisory",
      "Compliance & Audit Stewards",
    ],
    outputs: [
      "Continuous performance telemetry & drift monitoring",
      "Routine model recalibration & data maintenance",
      "Quarterly executive value & optimization reviews",
      "Strategic roadmap for adjacent enterprise workflows",
    ],
    gatingRequirement: "Quarterly review verification of SLA performance, sustained positive ROI, and re-certification of regulatory compliance.",
  },
];

export default function EngagementModel() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isAutoScrollingRef = useRef<boolean>(false);

  const activeStep = STEPS[activeStepIndex];
  const activePhase = PHASES.find((p) => p.id === activeStep.phaseId) || PHASES[0];
  const progressPercent = Math.round(((activeStepIndex + 1) / STEPS.length) * 100);

  // Scrollspy: the card crossing the reference line is the active one.
  // A plain measurement beats IntersectionObserver here — with cards this
  // tall several intersect the band at once, and whichever entry the
  // observer reported last would win, so the rail marked the wrong step.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (isAutoScrollingRef.current) return;

      const line = window.innerHeight * 0.35;
      const revealLine = window.innerHeight - 60;
      let bestIndex = 0;
      let bestDistance = Infinity;
      const reachedIndices: number[] = [];

      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        // Zero distance when the card spans the line; only one card can.
        const distance =
          top <= line && bottom >= line
            ? 0
            : Math.min(Math.abs(top - line), Math.abs(bottom - line));

        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }

        // Anything at or above the reveal line counts as reached — including
        // cards already scrolled past, which is what makes this survive a
        // jump straight to the bottom of the page.
        if (top < revealLine) reachedIndices.push(index);
      });

      setActiveStepIndex((prev) => (prev === bestIndex ? prev : bestIndex));

      setRevealed((prev) => {
        const missing = reachedIndices.filter((i) => !prev.has(i));
        if (missing.length === 0) return prev;
        const next = new Set(prev);
        missing.forEach((i) => next.add(i));
        return next;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Scroll restoration on reload and #hash jumps both land after mount,
    // and late images/fonts shift everything without firing a scroll event.
    window.addEventListener("load", onScroll);
    const bodyResize = new ResizeObserver(onScroll);
    bodyResize.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
      bodyResize.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Reveal is handled inside the scroll measurement above rather than by an
  // IntersectionObserver. The observer sampled, so a fast fling or a jump
  // straight to the bottom skipped cards entirely and left them stuck at
  // opacity 0 with no second chance to fire.

  const scrollToStep = (index: number) => {
    setActiveStepIndex(index);
    isAutoScrollingRef.current = true;

    const targetEl = document.getElementById(`step-card-${STEPS[index].n}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 700);
  };

  return (
    <section className={styles.section} id="engagement-model">

      <div className="container relative z-10 max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Eight disciplined milestones.{" "}
            <span className={styles.headingHighlight}>Zero unverified claims.</span>
          </h2>
          <p className={styles.lead}>
            Our delivery methodology is continuous and milestone-gated: each stage demonstrates tangible progress,
            engages designated governance stakeholders, and produces verified institutional assets before capital is committed to the next.
          </p>
        </div>

        {/* Mobile Sticky Top HUD (< 1024px) */}
        <div className={styles.mobileStickyBar} role="region" aria-label="Mobile Navigation Tracker">
          <div className={styles.mobileTopRow}>
            <span className={styles.mobileStepBadge}>
              MILESTONE {activeStep.n} / 08
            </span>
            <span className={styles.mobileStepName}>
              {activeStep.name}, {activeStep.cadence}
            </span>
          </div>

          <div className={styles.mobileProgressBarTrack} aria-hidden="true">
            <div
              className={styles.mobileProgressBarFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className={styles.mobilePillsRow}>
            {STEPS.map((step, idx) => {
              const isSelected = idx === activeStepIndex;
              return (
                <button
                  key={step.n}
                  type="button"
                  className={`${styles.mobilePillBtn} ${isSelected ? styles.mobilePillBtnActive : ""}`}
                  onClick={() => scrollToStep(idx)}
                  aria-label={`Jump to milestone ${step.n}: ${step.name}`}
                >
                  <span>{step.n}</span>
                  <span>{step.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual-Column Sticky Scrollytelling Architecture */}
        <div className={styles.scrollLayout}>
          {/* Left Column: Desktop Sticky Command Deck */}
          <aside className={styles.stickyDeck} aria-label="Milestone Progress Rail">
            {/* Active Phase Overview Card */}
            <div className={styles.phaseOverviewCard}>
              <div className={styles.phaseMetaRow}>
                <span className={styles.phaseCodeBadge}>{activePhase.code}</span>
                <span className={styles.progressText}>{progressPercent}% COMPLETED</span>
              </div>
              <h3 key={`t-${activePhase.id}`} className={`${styles.phaseTitle} ${styles.deckSwap}`}>
                {activePhase.roman}. {activePhase.name}
              </h3>
              <p key={`o-${activePhase.id}`} className={`${styles.phaseObjective} ${styles.deckSwap}`}>
                {activePhase.objective}
              </p>

              <div className={styles.overallProgressBarTrack} aria-hidden="true">
                <div
                  className={styles.overallProgressBarFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Live Enterprise Topology Radar Graphic */}
            <div className={styles.deckRadarBox}>
              <div className={styles.deckRadarTitle}>Enterprise Topology Radar</div>
              <TopologyRadarDeck activeStepIndex={activeStepIndex} />
            </div>

            {/* Vertical Connected Timeline Navigation Rail */}
            <nav className={styles.timelineNav} aria-label="Milestones Navigation">
              <div className={styles.timelineTitle}>Engagement Milestones</div>
              <div className={styles.timelineNodesList}>
                {STEPS.map((step, idx) => {
                  const isActive = idx === activeStepIndex;
                  const isPast = idx < activeStepIndex;

                  return (
                    <button
                      key={step.n}
                      type="button"
                      className={`${styles.timelineNodeBtn} ${isActive ? styles.timelineNodeBtnActive : ""} ${isPast ? styles.timelineNodeBtnPast : ""}`}
                      onClick={() => scrollToStep(idx)}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <div className={styles.nodeDot}>
                        {isPast ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          step.n
                        )}
                      </div>
                      <div className={styles.nodeContentGroup}>
                        <span className={styles.nodeName}>{step.name}</span>
                        {isActive && (
                          <span className={styles.nodeCadence}>
                            {step.phaseRoman}, {step.cadence}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* The advancement gate is not repeated here — each milestone
                card already carries it, and the deck has to fit the viewport
                without its own scrollbar. */}

            {/* Sticky Deck Primary CTA */}
            <Link href="/contact" className={styles.deckCtaBtn}>
              <span>Start with Discovery</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </aside>

          {/* Right Column: Scrolling Stream of 8 Milestone Cards */}
          <main className={styles.milestoneStream}>
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;

              return (
                <article
                  key={step.n}
                  id={`step-card-${step.n}`}
                  data-step-index={idx}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`${styles.milestoneCard} ${isActive ? styles.milestoneCardActive : ""} reveal-io ${
                    revealed.has(idx) ? "reveal-io--visible" : ""
                  }`}
                >
                  {/* Card Header */}
                  <header className={styles.cardHeader}>
                    <div>
                      <div className={styles.cardMetaGroup}>
                        <span className={styles.stepNumBadge}>MILESTONE {step.n}</span>
                        <span className={styles.phaseTag}>
                          {step.phaseRoman}, {step.phaseName}
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{step.name}</h3>
                      <p className={styles.cardTagline}>{step.tagline}</p>
                    </div>

                    <div className={styles.cadencePill}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cuxton-teal-light)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{step.cadence}</span>
                    </div>
                  </header>

                  {/* Bespoke Technical Visual Schematic for this Milestone */}
                  <div className={styles.schematicContainer}>
                    <div className={styles.schematicHeader}>
                      <span className={styles.schematicTitle}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                        Technical Schematic, Milestone {step.n}
                      </span>
                      <span className={styles.schematicStatus}>
                        <span className={styles.schematicStatusDot} aria-hidden="true" />
                        SPECIFICATION ACTIVE
                      </span>
                    </div>
                    <MilestoneSchematic stepNumber={step.n} />
                  </div>

                  {/* Visual Workflow Pipeline Diagram (Input -> Diagnostic -> Target Deliverable) */}
                  <section className={styles.pipelineSection} aria-label={`Workflow Pipeline for Milestone ${step.n}`}>
                    <div className={styles.pipelineLabel}>Structured Workflow Pipeline</div>
                    <div className={styles.pipelineFlow}>
                      <div className={styles.pipelineNode}>
                        <span className={styles.nodeRoleBadge}>{step.pipeline.input.label}</span>
                        <span className={styles.nodeValue}>{step.pipeline.input.text}</span>
                      </div>

                      <div className={styles.pipelineConnector} aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>

                      <div className={styles.pipelineNode}>
                        <span className={styles.nodeRoleBadge}>{step.pipeline.process.label}</span>
                        <span className={styles.nodeValue}>{step.pipeline.process.text}</span>
                      </div>

                      <div className={styles.pipelineConnector} aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>

                      <div className={styles.pipelineNode}>
                        <span className={styles.nodeRoleBadge}>{step.pipeline.output.label}</span>
                        <span className={styles.nodeValue}>{step.pipeline.output.text}</span>
                      </div>
                    </div>
                  </section>

                  {/* Methodology Narrative */}
                  <section className={styles.methodologySection}>
                    <div className={styles.sectionBlockLabel}>Milestone Execution Methodology</div>
                    <p className={styles.methodologyText}>{step.desc}</p>
                  </section>

                  {/* Two-Column Specification Box: Stakeholders & Deliverables */}
                  <div className={styles.specsGrid}>
                    {/* Left: Key Stakeholders */}
                    <div className={styles.specsBox}>
                      <div className={styles.sectionBlockLabel}>Key Stakeholders Engaged</div>
                      <div className={styles.stakeholdersList}>
                        {step.stakeholders.map((role) => (
                          <div key={role} className={styles.stakeholderRow}>
                            <div className={styles.stakeholderDot} aria-hidden="true" />
                            <span>{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Institutional Deliverables */}
                    <div className={styles.specsBox}>
                      <div className={styles.sectionBlockLabel}>Verified Institutional Deliverables</div>
                      <div className={styles.deliverablesList}>
                        {step.outputs.map((item) => (
                          <div key={item} className={styles.deliverableRow}>
                            <svg className={styles.deliverableCheckIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Milestone Advancement Gate Card */}
                  <div className={styles.advancementGateCard}>
                    <div className={styles.gateHeader}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cuxton-amber)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span className={styles.gateTitle}>Milestone Advancement Gate</span>
                    </div>
                    <p className={styles.gateDescription}>{step.gatingRequirement}</p>
                  </div>
                </article>
              );
            })}

            {/* Bottom Stream Action Banner */}
            <div className={styles.streamFooter}>
              <div className={styles.streamFooterText}>
                <h4 className={styles.streamFooterTitle}>Ready to initiate Milestone 01?</h4>
                <p className={styles.streamFooterDesc}>
                  Every deployment begins with a structured, confidential Discovery conversation to evaluate your operational objectives and data feasibility.
                </p>
              </div>
              <Link href="/contact" className={styles.streamFooterBtn}>
                <span>Book a Discovery Session</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
