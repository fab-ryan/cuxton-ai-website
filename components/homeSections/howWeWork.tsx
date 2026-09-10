"use client";

import React, { useState } from "react";
import Link from "next/link";
import Reveal from "../Reveal";
import s from "./howWeWork.module.css";

export const HowWeWorkSection = () => {
  const [activeView, setActiveView] = useState<"phases" | "steps">("phases");
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(0);

  const activeStep = engagementSteps[activeStepIndex];
  const activePhase = phases[activeStep.phaseIndex];

  const handlePhaseClick = (index: number) => {
    setSelectedPhaseIndex(index);
    // Find the first step in this phase
    const firstStepOfPhase = engagementSteps.findIndex((s) => s.phaseIndex === index);
    if (firstStepOfPhase !== -1) {
      setActiveStepIndex(firstStepOfPhase);
    }
  };

  const handleInspectStep = (index: number) => {
    setActiveStepIndex(index);
    setActiveView("steps");
  };

  const nextStep = () => {
    if (activeStepIndex < engagementSteps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  return (
    <section className={s.section} id="how-we-work">
            <div className={s.bgOverlay} />
      <div className={s.edgeTransitionTop} aria-hidden="true" />
      <div className={s.edgeTransitionBottom} aria-hidden="true" />

      <div className={`container max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 ${s.themeWrap}`}>
        {/* ─── SECTION HEADER ────────────────────────────────────────── */}
        <Reveal className={s.header}>
          <h2 className={s.heading}>
            Start with the problem.<br />
            <span className={s.headingAccent}>Scale what delivers verifiable value.</span>
          </h2>
          <p className={s.subHeading}>
            We do not begin by prescribing vendor software or experimental models. We begin by understanding your business workflows, regulatory boundaries, and security constraints  guiding every project through an accountable 4-phase engineering lifecycle.
          </p>
        </Reveal>

        {/* ─── VIEW TOGGLE (PHASE OVERVIEW VS STEP INSPECTOR) ───────── */}
        <Reveal delay={60} className={s.viewToggleWrap}>
          <div className={s.viewToggle} role="tablist" aria-label="Methodology Perspective">
            <button
              type="button"
              role="tab"
              aria-selected={activeView === "phases"}
              onClick={() => setActiveView("phases")}
              className={`${s.viewToggleBtn} ${activeView === "phases" ? s.viewToggleBtnActive : ""}`}
            >
              <span className={s.toggleIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
              </span>
              <span>4 Strategic Phases</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeView === "steps"}
              onClick={() => setActiveView("steps")}
              className={`${s.viewToggleBtn} ${activeView === "steps" ? s.viewToggleBtnActive : ""}`}
            >
              <span className={s.toggleIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <circle cx="6" cy="12" r="3" fill="currentColor" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <circle cx="18" cy="12" r="3" fill="currentColor" />
                </svg>
              </span>
              <span>Detailed 8-Step Console</span>
            </button>
          </div>
        </Reveal>

        {/* ════════════════════════════════════════════════════════════
            MODE 1: 4-PHASE OVERVIEW BENTO GRID
            ════════════════════════════════════════════════════════════ */}
        {activeView === "phases" && (
          <Reveal delay={100}>
            <div className={s.phaseGrid}>
              {phases.map((phase, idx) => {
                const isSelected = selectedPhaseIndex === idx;
                return (
                  <div
                    key={phase.id}
                    className={`${s.phaseCard} ${s[`phaseAccent${idx + 1}`]} ${isSelected ? s.phaseCardActive : ""}`}
                    onClick={() => handlePhaseClick(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handlePhaseClick(idx);
                      }
                    }}
                  >
                    <div className={s.phaseTopRow}>
                      <span className={s.phaseNumberBadge}>{phase.phaseCode}</span>
                      <span className={s.phaseTimeframe}>{phase.timeframe}</span>
                    </div>

                    <h3 className={s.phaseTitle}>{phase.title}</h3>
                    <div className={s.phaseTagline}>&ldquo;{phase.tagline}&rdquo;</div>
                    <p className={s.phaseDesc}>{phase.desc}</p>

                    <div className={s.phaseStepsList}>
                      {phase.steps.map((st) => (
                        <span key={st.n} className={s.phaseStepChip}>
                          <span className={s.phaseStepNum}>{st.n}</span> {st.name}
                        </span>
                      ))}
                    </div>

                    <div className={s.deliverableBox}>
                      <div className={s.deliverableIconWrap}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </div>
                      <div className={s.deliverableMeta}>
                        <span className={s.deliverableLabel}>Milestone Deliverable</span>
                        <span className={s.deliverableTitle}>{phase.deliverable}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ marginTop: "1rem", width: "100%", fontSize: "0.82rem", padding: "0.5rem" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInspectStep(phase.steps[0].index);
                      }}
                    >
                      Inspect Phase Steps
                    </button>
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* ════════════════════════════════════════════════════════════
            MODE 2: INTERACTIVE STEP INSPECTOR CONSOLE
            ════════════════════════════════════════════════════════════ */}
        {activeView === "steps" && (
          <Reveal delay={100} className={`${s.inspectorConsole} ${s[`phaseAccent${activeStep.phaseIndex + 1}`]}`}>
            {/* Horizontal Timeline Track */}
            <div className={s.trackWrapper}>
              <div className={s.trackLine}>
                <div
                  className={s.trackProgressFill}
                  style={{ width: `${(activeStepIndex / (engagementSteps.length - 1)) * 100}%` }}
                />
              </div>
              <div className={s.trackSteps}>
                {engagementSteps.map((st, i) => {
                  const isActive = activeStepIndex === i;
                  return (
                    <button
                      key={st.n}
                      type="button"
                      onClick={() => setActiveStepIndex(i)}
                      className={`${s.trackStepBtn} ${isActive ? s.trackStepActive : ""}`}
                    >
                      <div className={s.trackStepCircle}>{st.n}</div>
                      <span className={s.trackStepLabel}>{st.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Details for Active Step */}
            <div className={s.inspectorDetailGrid}>
              <div className={s.inspectorLeft}>
                <div className={s.inspectorStepMeta}>
                  <span className={s.inspectorStepNumber}>Step {activeStep.n}</span>
                  <span className={s.inspectorPhaseTag}>{activePhase.phaseCode}: {activePhase.title}</span>
                </div>

                <h3 className={s.inspectorStepTitle}>{activeStep.name}</h3>
                <div className={s.inspectorTagline}>&ldquo;{activeStep.tagline}&rdquo;</div>
                <p className={s.inspectorNarrative}>{activeStep.desc}</p>

                {/* Nav Buttons */}
                <div className={s.inspectorNavRow}>
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={activeStepIndex === 0}
                    className={s.inspectorNavBtn}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Previous Step
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={activeStepIndex === engagementSteps.length - 1}
                    className={s.inspectorNavBtn}
                  >
                    Next Step
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <span style={{ fontSize: "0.82rem", color: "var(--hww-text-muted)", marginLeft: "0.5rem" }}>
                    {activeStepIndex + 1} of {engagementSteps.length}
                  </span>
                </div>
              </div>

              {/* Right Column: Required Inputs & Concrete Outputs */}
              <div className={s.inspectorRight}>
                <div className={s.specCard}>
                  <div className={s.specCardHeading}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Required Stakeholder Inputs
                  </div>
                  <ul className={s.specList}>
                    {activeStep.inputs.map((inp, idx) => (
                      <li key={idx} className={s.specItem}>
                        <span className={s.specCheck}>&bull;</span>
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={s.specCard}>
                  <div className={`${s.specCardHeading} ${s.specCardHeadingDeliverable}`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Verifiable Outputs &amp; Deliverables
                  </div>
                  <ul className={s.specList}>
                    {activeStep.outputs.map((out, idx) => (
                      <li key={idx} className={s.specItem}>
                        <span className={s.specCheckAmber}>&#10003;</span>
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* ════════════════════════════════════════════════════════════
            3 DELIVERY GUARANTEES / PRINCIPLES
            ════════════════════════════════════════════════════════════ */}
        <Reveal delay={120} className={s.guaranteesHeader}>
          <h3 className={s.guaranteesTitle}>Foundations of Every Engagement</h3>
        </Reveal>

        <Reveal delay={140} className={s.guaranteesGrid}>
          {guarantees.map((g) => (
            <div key={g.title} className={s.guaranteeCard}>
              <div className={s.guaranteeTop}>
                <div className={s.guaranteeIcon}>{g.icon}</div>
                <h4 className={s.guaranteeTitle}>{g.title}</h4>
              </div>
              <p className={s.guaranteeDesc}>{g.desc}</p>
            </div>
          ))}
        </Reveal>

        {/* ─── ACTION BUTTONS ────────────────────────────────────────── */}
        <Reveal delay={160} className={s.footer}>
          <div className={s.footerButtons}>
            <Link href="/how-we-work" className={s.btnPrimary}>
              See Full Engagement Model
            </Link>
            <Link href="/contact" className={s.btnSecondary}>
              Schedule Opportunity Assessment
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   DATA STRUCTURES: PHASES, STEPS, AND GUARANTEES
   ═══════════════════════════════════════════════════════════════════ */

interface StepData {
  n: string;
  name: string;
  phaseIndex: number;
  tagline: string;
  desc: string;
  inputs: string[];
  outputs: string[];
}

const phases = [
  {
    id: "discover-assess",
    phaseCode: "Phase 01",
    title: "Discover & Assess",
    timeframe: "Weeks 1–2",
    tagline: "Understand before prescribing.",
    desc: "We explore cross-functional workflows, audit data availability, evaluate privacy and regulatory boundaries, and identify where AI delivers genuine business impact.",
    deliverable: "Enterprise Feasibility & Value Roadmap",
    steps: [
      { n: "01", name: "Discover", index: 0 },
      { n: "02", name: "Assess", index: 1 },
      { n: "03", name: "Prioritise", index: 2 },
    ],
  },
  {
    id: "architecture-prototype",
    phaseCode: "Phase 02",
    title: "Design & Prototype",
    timeframe: "Weeks 3–5",
    tagline: "Architecture before build.",
    desc: "We architect the security perimeter, select optimal models, and engineer a controlled proof-of-concept tested with real users and approved internal records.",
    deliverable: "Air-Gapped Sandbox PoC & Security Audit",
    steps: [
      { n: "04", name: "Design", index: 3 },
      { n: "05", name: "Prototype", index: 4 },
    ],
  },
  {
    id: "production-enablement",
    phaseCode: "Phase 03",
    title: "Deploy & Enable",
    timeframe: "Weeks 6–8",
    tagline: "Hardened systems with trained staff.",
    desc: "Production deployment with enterprise system integrations, security hardening, monitoring hooks, followed by extensive administrative training and handover.",
    deliverable: "Production System & Operational Runbooks",
    steps: [
      { n: "06", name: "Deploy", index: 5 },
      { n: "07", name: "Enable", index: 6 },
    ],
  },
  {
    id: "operate-scale",
    phaseCode: "Phase 04",
    title: "Operate & Optimise",
    timeframe: "Continuous SLA",
    tagline: "Sustained accuracy and value.",
    desc: "Ongoing performance telemetry, latency monitoring, model tuning, periodic evaluation reviews, and systematic expansion into adjacent business functions.",
    deliverable: "Continuous Telemetry SLA & Expansion Plan",
    steps: [
      { n: "08", name: "Operate & Optimise", index: 7 },
    ],
  },
];

const engagementSteps: StepData[] = [
  {
    n: "01",
    name: "Discover",
    phaseIndex: 0,
    tagline: "Understand before recommending.",
    desc: "We begin with structured conversations with stakeholders across the organisation — operations, technology, legal, compliance, and leadership. We explore business objectives, current workflows, pain points, data availability, and where manual or information-intensive processes create friction.",
    inputs: ["Key stakeholder interviews", "Current operational workflow diagrams", "Inventory of data repositories and tooling"],
    outputs: ["Stakeholder conversation notes", "Workflow and pain-point map", "Initial AI opportunity inventory"],
  },
  {
    n: "02",
    name: "Assess",
    phaseIndex: 0,
    tagline: "Evaluate feasibility before committing to a direction.",
    desc: "Each candidate use case is rigorously assessed across multiple dimensions: data availability and quality, technical feasibility, privacy and regulatory constraints, expected value, implementation complexity, and organisational readiness. We are honest when a use case is not viable.",
    inputs: ["Data sample inspection", "Infrastructure & security access review", "Regulatory and compliance guidelines"],
    outputs: ["Feasibility assessment per use case", "Data and systems readiness review", "Privacy and regulatory constraint mapping"],
  },
  {
    n: "03",
    name: "Prioritise",
    phaseIndex: 0,
    tagline: "Focus on what delivers verifiable value first.",
    desc: "We work with leadership to select one focused use case for initial delivery — prioritised by the combination of expected ROI, technical feasibility, data readiness, and organizational appetite. Clear success metrics are agreed before design begins.",
    inputs: ["Executive priority ranking", "Estimated business impact targets", "Resource allocation commitments"],
    outputs: ["Prioritised use case selection", "Agreed success criteria & KPI metrics", "High-level delivery scope & timeline"],
  },
  {
    n: "04",
    name: "Design",
    phaseIndex: 1,
    tagline: "Architecture before build.",
    desc: "Full technical design of the solution: AI architecture, deployment model, model selection, data pipeline design, integration points, access and permission structure, governance framework, security requirements, and delivery plan. Reviewed and approved before development begins.",
    inputs: ["Enterprise network & cloud topology", "Identity provider integration specs (SSO/RBAC)", "Approved model selection criteria"],
    outputs: ["Technical architecture document", "Data pipeline and integration design", "Governance and security framework", "Milestone delivery plan"],
  },
  {
    n: "05",
    name: "Prototype",
    phaseIndex: 1,
    tagline: "Build a controlled proof of concept.",
    desc: "A functional prototype is built and tested with representative users and approved data in an air-gapped or controlled sandbox. Prototype testing reveals real-world performance, identifies edge cases, and gives users hands-on experience before production investment.",
    inputs: ["Sanitized representative dataset", "Pilot user group participation", "Test validation scenarios"],
    outputs: ["Working prototype in a controlled environment", "User testing sessions and feedback log", "Accuracy & performance benchmark", "Refined production specifications"],
  },
  {
    n: "06",
    name: "Deploy",
    phaseIndex: 2,
    tagline: "Production-ready. Properly integrated.",
    desc: "The production solution is built, integrated with approved systems, security-hardened, and deployed within your agreed infrastructure environment. Comprehensive documentation covers architecture, configuration, operational procedures, and maintenance requirements.",
    inputs: ["Production environment access", "Security audit clearance", "Continuous integration/deployment hooks"],
    outputs: ["Hardened production deployment", "Systems and security integration", "Technical architecture documentation", "Operational maintenance procedures"],
  },
  {
    n: "07",
    name: "Enable",
    phaseIndex: 2,
    tagline: "Equip the people who will operate it.",
    desc: "Technology alone does not create value. We provide training for users and administrators, handover of operational procedures, documentation of governance processes, and — where relevant — an operational playbook the organisation can manage independently.",
    inputs: ["End-user department leads", "IT administrator team roster", "Internal support escalation workflows"],
    outputs: ["User training sessions & video guides", "Administrator handover documentation", "Governance documentation", "Incident and escalation procedures"],
  },
  {
    n: "08",
    name: "Operate & Optimise",
    phaseIndex: 3,
    tagline: "The relationship continues after go-live.",
    desc: "AI systems require ongoing monitoring, maintenance, and periodic improvement. Cuxton provides ongoing support covering performance telemetry, model updates, prompt tuning, security patches, and expansion of the system into adjacent workflows as confidence and capability grow.",
    inputs: ["Production latency and usage telemetry", "User feedback and edge-case reports", "Future quarterly business objectives"],
    outputs: ["Continuous performance monitoring reports", "Model and prompt tuning updates", "Periodic optimisation reviews", "Expansion roadmap for adjacent workflows"],
  },
];

const guarantees = [
  {
    title: "100% Client IP ownership",
    desc: "All custom prompt pipelines, integration middleware, specialized datasets, and fine-tuned weights remain the exclusive intellectual property of your institution.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Model & Vendor Independence",
    desc: "We design modular systems that allow switching underlying foundation models (commercial or open-weights) without re-engineering your core business logic or workflows.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    title: "Air-Gapped & Boundaries",
    desc: "Your enterprise records never leave your designated environment. Zero data is shared, leaked, or utilized to train external public foundation models.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];
