"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./OperatingPrinciples.module.css";
import {
  ProblemFirstGraphic,
  HonestFeasibilityGraphic,
  ControlledScopeGraphic,
  HumanOversightGraphic,
  NoComplexityGraphic,
  LongTermThinkingGraphic,
} from "./PrincipleGraphics";

/* ═══════════════════════════════════════════════════════════════════
   CUXTON AI — OPERATING PRINCIPLES ANIMATED SLIDESHOW & SHOWCASE
   Strict solid token architecture. STRICTLY ZERO linear gradients.
   STRICTLY ZERO emojis.
   ═══════════════════════════════════════════════════════════════════ */

interface PrincipleData {
  index: string;
  label: string;
  category: string;
  tagline: string;
  desc: string;
  guarantees: string[];
  metricBadge: string;
  graphicTitle: string;
  graphicStatus: string;
  renderGraphic: () => React.ReactNode;
}

/* ─── PRINCIPLES DATASET ─────────────────────────────────────────── */

const PRINCIPLES_DATA: PrincipleData[] = [
  {
    index: "01",
    label: "Problem-first",
    category: "TENET 01, OPERATIONAL DISCIPLINE",
    tagline: "Understand the business friction before recommending any technology.",
    desc: "Every engagement begins with rigorous operational diagnosis not a model architecture or vendor platform we want to push. We interrogate workflow friction points, unit economics, and data readiness first. If a problem is better solved with traditional deterministic rules, we recommend that with complete candour.",
    guarantees: [
      "Zero vendor resale quotas or proprietary software lock-in",
      "Empirical operational friction sizing agreed upfront",
      "Non-AI baseline alternatives systematically evaluated",
    ],
    metricBadge: "Vendor Bias: 0%, Problem Sizing: Verified",
    graphicTitle: "Workflow Diagnostic Scanner",
    graphicStatus: "DIAGNOSTIC RIGOR ACTIVE",
    renderGraphic: () => <ProblemFirstGraphic />,
  },
  {
    index: "02",
    label: "Honest feasibility",
    category: "TENET 02, CANDID SCIENTIFIC RIGOR",
    tagline: "We tell clients when a use case is not viable before capital is committed.",
    desc: "The highest-leverage advice is often what NOT to build. We rigorously evaluate data completeness, regulatory privacy constraints, latency bounds, and cultural adoption before commencing development. We decline to proceed when the probability of enterprise success is insufficient.",
    guarantees: [
      "Multi-dimensional feasibility scorecard delivered prior to build",
      "Immediate escalation of fatal regulatory or data deficiencies",
      "Capital protected from high-risk speculative experiments",
    ],
    metricBadge: "6-Pillar Audit: Certified, Capital Protected",
    graphicTitle: "Feasibility Scorecard Matrix",
    graphicStatus: "GATE CLEARANCE REQUIRED",
    renderGraphic: () => <HonestFeasibilityGraphic />,
  },
  {
    index: "03",
    label: "Controlled scope",
    category: "TENET 03, PRECISION ENGINEERING",
    tagline: "Initial deployments are deliberately focused to deliver tangible value fast.",
    desc: "Enterprise AI initiatives fail when they attempt to boil the ocean. We deliberately isolate a single, high-conviction pilot workflow with bounded edge cases, tight telemetry, and rapid feedback cycles—proving measurable commercial return before expanding into adjacent operations.",
    guarantees: [
      "Single bounded pilot with strict boundary definitions",
      "Targeted 6-to-8 week initial production delivery horizon",
      "Demonstrated operational ROI before phase-two expansion",
    ],
    metricBadge: "Scope Bound: Strict, Time-to-Value: 8 Weeks",
    graphicTitle: "Bounded Pilot Sandbox Enclave",
    graphicStatus: "PERIMETER LOCKED",
    renderGraphic: () => <ControlledScopeGraphic />,
  },
  {
    index: "04",
    label: "Human oversight",
    category: "TENET 04, GOVERNED DECISION AUTHORITY",
    tagline: "Consequential decisions remain with people. AI supports; humans decide.",
    desc: "We engineer systems where people remain firmly in command. AI generates high-accuracy recommendations, extracts unstructured insights, and isolates anomalies, but consequential authority is architected with mandatory human-in-the-loop checkpoints and irreversible action gates.",
    guarantees: [
      "Mandatory human sign-off checkpoints for critical outcomes",
      "Cryptographic attribution linking every decision to verified staff",
      "Real-time override and fail-safe kill switches on every endpoint",
    ],
    metricBadge: "Human Decision Authority: 100%, Override: 0ms",
    graphicTitle: "Dual-Key Human Authority Gate",
    graphicStatus: "HUMAN SIGN-OFF MANDATORY",
    renderGraphic: () => <HumanOversightGraphic />,
  },
  {
    index: "05",
    label: "No unnecessary complexity",
    category: "TENET 05, ARCHITECTURAL PROPORTIONALITY",
    tagline: "The right solution may not require complex AI. We recommend what works.",
    desc: "Complexity is the enemy of reliability, security, and low-latency inference. We reject deploying multi-billion parameter models where deterministic heuristic rules, fine-tuned micro-models, or clean embeddings provide superior speed, lower cost, and complete explainability.",
    guarantees: [
      "Model parameters strictly proportional to task complexity",
      "Minimised inference compute cost and carbon overhead",
      "Fully inspectable, deterministic validation layers",
    ],
    metricBadge: "Algorithmic Proportionality: Active, Explainable: 100%",
    graphicTitle: "Complexity Optimization Filter",
    graphicStatus: "LEAN SYSTEM CERTIFIED",
    renderGraphic: () => <NoComplexityGraphic />,
  },
  {
    index: "06",
    label: "Long-term thinking",
    category: "TENET 06, SUSTAINED ASSET CUSTODY",
    tagline: "We design for maintainability, autonomous ownership, and enduring value.",
    desc: "Deploying an AI model is only day one. True institutional value requires systems engineered for long-term survival: comprehensive runbooks, automated drift detection, model recalibration pipelines, and complete operational custody transfer to your internal engineers.",
    guarantees: [
      "100% ownership of code, schemas, and proprietary IP",
      "Certified workforce training and administrative runbooks",
      "24/7 continuous telemetry and drift alerting protocols",
    ],
    metricBadge: "Client IP Custody: 100%, Autonomy: Guaranteed",
    graphicTitle: "Custody & Drift Horizon",
    graphicStatus: "ENTERPRISE SCALE CERTIFIED",
    renderGraphic: () => <LongTermThinkingGraphic />,
  },
];

export default function OperatingPrinciples() {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const activePrinciple = PRINCIPLES_DATA[activeSlideIndex];

  // Autoplay slider logic (advances every 7 seconds when playing)
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % PRINCIPLES_DATA.length);
    }, 7000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % PRINCIPLES_DATA.length);
  };

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + PRINCIPLES_DATA.length) % PRINCIPLES_DATA.length);
  };

  const handleSelect = (idx: number) => {
    setActiveSlideIndex(idx);
    setIsPlaying(false); // Pause on manual interaction so the user can read
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section className={styles.section} id="operating-principles">
      {/* Cinematic Background Image (Generated Artwork) */}
      <div className={styles.bgImage} aria-hidden="true" />
      {/* Solid Architectural Wash Overlay (Strictly zero linear gradient) */}
      <div className={styles.washOverlay} aria-hidden="true" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <header className={styles.header}>
          <h2 className="section-heading">
            How we think about <span className={styles.headingHighlight}>every engagement.</span>
          </h2>
          <p className={styles.lead}>
            Six rules we hold ourselves to on every engagement about what we build, what we tell you, and who stays accountable once it is running.
          </p>
        </header>

        {/* Top Control Bar: Slide Navigation Tabs & Play/Pause Controls */}
        <div className={styles.controlBar}>
          <div className={styles.navPillsRow} role="tablist" aria-label="Operating Principles Slides">
            {PRINCIPLES_DATA.map((p, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={p.index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.navPillBtn} ${isActive ? styles.navPillBtnActive : ""}`}
                  onClick={() => handleSelect(idx)}
                >
                  <span className={styles.pillLabel}>{p.label}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.actionGroup}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause automatic slideshow" : "Play automatic slideshow"}
              title={isPlaying ? "Pause auto-advance" : "Resume auto-advance"}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className={styles.iconBtn}
              onClick={handlePrev}
              aria-label="Previous principle slide"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className={styles.iconBtn}
              onClick={handleNext}
              aria-label="Next principle slide"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* FEATURED SLIDE STAGE (Dual Column Animated Display) */}
        <div className={styles.slideStage} key={`slide-${activePrinciple.index}`}>
          <div className={styles.stageGrid}>
            {/* Left Column: Principle Creed & Guarantees */}
            <div className={styles.slideNarrativeCol}>
              <div className={styles.slideMetaHeader}>

                <span className={styles.slideCategoryTag}>{activePrinciple.category}</span>
              </div>

              <h3 className={styles.slideTitle}>{activePrinciple.label}</h3>
              <p className={styles.slideTagline}>{activePrinciple.tagline}</p>
              <p className={styles.slideDescription}>{activePrinciple.desc}</p>

              {/* Guarantees Box */}
              <div className={styles.guaranteesBox}>
                <div className={styles.guaranteesTitle}>Institutional Guarantees</div>
                <div className={styles.guaranteesList}>
                  {activePrinciple.guarantees.map((item) => (
                    <div key={item} className={styles.guaranteeItem}>
                      <svg className={styles.guaranteeIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Footer Metrics */}
              <div className={styles.stageFooterRow}>
                <div className={styles.statusIndicator}>
                  <span className={styles.statusDot} aria-hidden="true" />
                </div>
                <span className={styles.tenetMetricBadge}>{activePrinciple.metricBadge}</span>
              </div>
            </div>

            {/* Right Column: Visual Graphic Schematic Card */}
            <div className={styles.slideVisualCol}>
              <div className={styles.visualCard}>
                <div className={styles.visualCardHeader}>
                  <span className={styles.visualCardTitle}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    {activePrinciple.graphicTitle}
                  </span>
                  <span className={styles.visualCardStatus}>{activePrinciple.graphicStatus}</span>
                </div>

                <div className={styles.visualGraphicBox}>
                  {activePrinciple.renderGraphic()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ALL-PRINCIPLES QUICK-SELECTOR GRID (6 Cards) */}
        <div>
          <div className={styles.gridSectionTitle}>All 6 Operating Principles at a Glance</div>
          <div className={styles.principlesGrid}>
            {PRINCIPLES_DATA.map((p, idx) => {
              const isActive = idx === activeSlideIndex;

              return (
                <button
                  key={p.index}
                  type="button"
                  className={`${styles.gridCard} ${isActive ? styles.gridCardActive : ""}`}
                  onClick={() => handleSelect(idx)}
                >
                  <div className={styles.gridCardTop}>

                    {isActive && <span className={styles.gridCardActiveDot} aria-hidden="true" />}
                  </div>
                  <h4 className={styles.gridCardTitle}>{p.label}</h4>
                  <p className={styles.gridCardSummary}>{p.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
