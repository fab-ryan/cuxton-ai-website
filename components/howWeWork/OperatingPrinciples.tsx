"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./OperatingPrinciples.module.css";

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

/* ─── Bespoke Vector Graphics for Each Principle (Zero Gradients) ─── */

function ProblemFirstGraphic() {
  return (
    <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="420" height="220" rx="10" fill="var(--sch-deep)" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />

      {/* Diagnostic Pipeline */}
      <g transform="translate(20, 20)">
        <text x="0" y="10" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">
          OPERATIONAL DIAGNOSTIC PIPELINE
        </text>

        {/* Stage 1: Problem Ingestion */}
        <rect x="0" y="24" width="115" height="70" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.35)" />
        <text x="10" y="42" fill="var(--cuxton-amber)" fontSize="8" fontWeight="600" fontFamily="monospace">01 · INGESTION</text>
        <text x="10" y="58" fill="var(--sch-text)" fontSize="10" fontWeight="700" fontFamily="sans-serif">Workflow Friction</text>
        <text x="10" y="74" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">Manual Bottleneck</text>

        {/* Connector Arrow */}
        <path d="M115 59 H 135" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <polygon points="138,59 133,55 133,63" fill="var(--cuxton-teal-light)" />

        {/* Stage 2: Necessity Filter */}
        <rect x="138" y="24" width="125" height="70" rx="6" fill="var(--sch-chip)" stroke="var(--cuxton-teal-light)" strokeWidth="1.2" />
        <text x="148" y="42" fill="var(--cuxton-teal-light)" fontSize="8" fontWeight="600" fontFamily="monospace">02 · EVALUATION</text>
        <text x="148" y="58" fill="var(--sch-text)" fontSize="10" fontWeight="700" fontFamily="sans-serif">Is AI Required?</text>
        <text x="148" y="74" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">Deterministic Gate</text>

        {/* Connector Arrow */}
        <path d="M263 59 H 283" stroke="var(--cuxton-amber)" strokeWidth="1.5" />
        <polygon points="286,59 281,55 281,63" fill="var(--cuxton-amber)" />

        {/* Stage 3: High Leverage Solution */}
        <rect x="286" y="24" width="94" height="70" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-amber)" strokeWidth="1.2" />
        <text x="296" y="42" fill="var(--cuxton-amber)" fontSize="8" fontWeight="600" fontFamily="monospace">03 · OUTCOME</text>
        <text x="296" y="58" fill="var(--sch-text)" fontSize="10" fontWeight="700" fontFamily="sans-serif">True ROI</text>
        <text x="296" y="74" fill="#10b981" fontSize="8.5" fontWeight="700" fontFamily="monospace">CLIENT FIRST</text>

        {/* Bottom Comparison Meter */}
        <rect x="0" y="110" width="380" height="48" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <text x="14" y="128" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="monospace">VENDOR RESALE QUOTA</text>
        <text x="14" y="146" fill="var(--cuxton-amber)" fontSize="12" fontWeight="600" fontFamily="monospace">0% (ZERO)</text>

        <text x="200" y="128" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="monospace">CLIENT INCENTIVE ALIGNMENT</text>
        <text x="200" y="146" fill="var(--cuxton-teal-light)" fontSize="12" fontWeight="600" fontFamily="monospace">100% UNBIASED</text>
      </g>
    </svg>
  );
}

function HonestFeasibilityGraphic() {
  return (
    <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="420" height="220" rx="10" fill="var(--sch-deep)" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />

      <g transform="translate(20, 20)">
        <text x="0" y="10" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">
          CANDID FEASIBILITY &amp; RISK AUDIT
        </text>

        {/* 4 Pillars Status Bars */}
        <rect x="0" y="24" width="230" height="26" rx="4" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <text x="10" y="41" fill="var(--sch-text)" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Data Quality &amp; Cleanliness</text>
        <text x="180" y="41" fill="var(--cuxton-teal-light)" fontSize="9.5" fontWeight="600" fontFamily="monospace">94% PASS</text>

        <rect x="0" y="56" width="230" height="26" rx="4" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <text x="10" y="73" fill="var(--sch-text)" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Regulatory Bounds (GDPR/AI Act)</text>
        <text x="180" y="73" fill="#10b981" fontSize="9.5" fontWeight="600" fontFamily="monospace">100% CLEAR</text>

        <rect x="0" y="88" width="230" height="26" rx="4" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <text x="10" y="105" fill="var(--sch-text)" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Technical Infrastructure Viability</text>
        <text x="180" y="105" fill="var(--cuxton-teal-light)" fontSize="9.5" fontWeight="600" fontFamily="monospace">91% PASS</text>

        <rect x="0" y="120" width="230" height="26" rx="4" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <text x="10" y="137" fill="var(--sch-text)" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Unit Economics Breakeven Horizon</text>
        <text x="180" y="137" fill="var(--cuxton-amber)" fontSize="9.5" fontWeight="600" fontFamily="monospace">8-MONTH</text>

        {/* Protection Seal (Right) */}
        <rect x="245" y="24" width="135" height="122" rx="8" fill="var(--sch-panel)" stroke="rgba(245,166,35,0.4)" strokeWidth="1.2" />
        <text x="257" y="44" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="600" fontFamily="monospace">CAPITAL PROTECTION</text>
        <text x="257" y="66" fill="var(--sch-text)" fontSize="11" fontWeight="600" fontFamily="sans-serif">Zero Sunk Costs</text>
        <text x="257" y="84" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">If an initiative is fatal,</text>
        <text x="257" y="98" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">we stop early.</text>
        <rect x="257" y="112" width="111" height="18" rx="4" fill="var(--sch-chip)" />
        <text x="312" y="124" fill="var(--cuxton-teal-light)" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">NO FALSE CLAIMS</text>
      </g>
    </svg>
  );
}

function ControlledScopeGraphic() {
  return (
    <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="420" height="220" rx="10" fill="var(--sch-deep)" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />

      <g transform="translate(20, 20)">
        <text x="0" y="10" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">
          CONTROLLED PILOT BOUNDARY VS. SCOPE CREEP
        </text>

        {/* Outer Unbounded Danger Zone */}
        <rect x="0" y="24" width="380" height="135" rx="8" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.2)" strokeDasharray="4 3" />
        <text x="14" y="42" fill="var(--sch-text-faint)" fontSize="8.5" fontWeight="700" fontFamily="monospace">UNBOUNDED SCOPE (PROJECT FAILURE TRAP)</text>

        {/* Inner Bounded Pilot Sandbox */}
        <rect x="40" y="52" width="300" height="92" rx="6" fill="var(--sch-panel-2)" stroke="var(--cuxton-amber)" strokeWidth="1.5" />
        <text x="54" y="72" fill="var(--cuxton-amber)" fontSize="9.5" fontWeight="600" fontFamily="monospace">CUXTON CONTROLLED PILOT PERIMETER</text>

        {/* 3 Step Rapid Delivery Nodes */}
        <g transform="translate(54, 82)">
          <rect x="0" y="0" width="80" height="48" rx="4" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" />
          <text x="8" y="18" fill="var(--cuxton-teal-light)" fontSize="7.5" fontWeight="600" fontFamily="monospace">WEEKS 1–2</text>
          <text x="8" y="34" fill="var(--sch-text)" fontSize="9" fontWeight="700" fontFamily="sans-serif">Isolate Flow</text>

          <path d="M80 24 H 95" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />

          <rect x="95" y="0" width="84" height="48" rx="4" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" />
          <text x="103" y="18" fill="var(--cuxton-teal-light)" fontSize="7.5" fontWeight="600" fontFamily="monospace">WEEKS 3–6</text>
          <text x="103" y="34" fill="var(--sch-text)" fontSize="9" fontWeight="700" fontFamily="sans-serif">Build &amp; Test</text>

          <path d="M179 24 H 194" stroke="var(--cuxton-amber)" strokeWidth="1.5" />

          <rect x="194" y="0" width="80" height="48" rx="4" fill="var(--sch-panel)" stroke="var(--cuxton-amber)" />
          <text x="202" y="18" fill="var(--cuxton-amber)" fontSize="7.5" fontWeight="600" fontFamily="monospace">WEEKS 7–8</text>
          <text x="202" y="34" fill="var(--sch-text)" fontSize="9" fontWeight="700" fontFamily="sans-serif">Live Value</text>
        </g>
      </g>
    </svg>
  );
}

function HumanOversightGraphic() {
  return (
    <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="420" height="220" rx="10" fill="var(--sch-deep)" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />

      <g transform="translate(20, 20)">
        <text x="0" y="10" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">
          IRREVOCABLE HUMAN DECISION AUTHORITY GATE
        </text>

        {/* AI Synthetic Analysis Stage */}
        <rect x="0" y="28" width="140" height="115" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.35)" />
        <rect x="0" y="28" width="140" height="22" rx="6" fill="var(--sch-line)" />
        <text x="10" y="42" fill="var(--cuxton-teal-light)" fontSize="8" fontWeight="600" fontFamily="monospace">AI INFERENCE LAYER</text>
        <text x="10" y="68" fill="var(--sch-text)" fontSize="10" fontWeight="700" fontFamily="sans-serif">Deep Synthesis</text>
        <text x="10" y="84" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Draft Extraction</text>
        <text x="10" y="98" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Risk Flagging</text>
        <text x="10" y="126" fill="var(--cuxton-teal-light)" fontSize="8" fontWeight="600" fontFamily="monospace">RECOMMENDATION ONLY</text>

        {/* Mandatory Authorization Barrier */}
        <path d="M140 85 H 175" stroke="var(--cuxton-amber)" strokeWidth="2" strokeDasharray="3 2" />

        {/* Human Checkpoint */}
        <rect x="175" y="28" width="140" height="115" rx="6" fill="var(--sch-panel-2)" stroke="var(--cuxton-amber)" strokeWidth="1.5" />
        <rect x="175" y="28" width="140" height="22" rx="6" fill="var(--sch-amber-bg)" />
        <text x="185" y="42" fill="var(--cuxton-amber)" fontSize="8" fontWeight="600" fontFamily="monospace">HUMAN OPERATOR GATE</text>
        <text x="185" y="68" fill="var(--sch-text)" fontSize="10" fontWeight="700" fontFamily="sans-serif">Verified Approval</text>
        <text x="185" y="84" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Personnel Signature</text>
        <text x="185" y="98" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Mandatory Sign-Off</text>
        <text x="185" y="126" fill="var(--cuxton-amber)" fontSize="8" fontWeight="600" fontFamily="monospace">AUTHORITY REQUIRED</text>

        {/* Execution Output */}
        <path d="M315 85 H 345" stroke="#10b981" strokeWidth="2" />
        <polygon points="348,85 342,81 342,89" fill="#10b981" />

        <rect x="345" y="55" width="55" height="60" rx="6" fill="var(--sch-panel)" stroke="#10b981" />
        <text x="352" y="78" fill="#10b981" fontSize="8" fontWeight="600" fontFamily="monospace">ACTION</text>
        <text x="352" y="96" fill="var(--sch-text)" fontSize="9" fontWeight="700" fontFamily="sans-serif">Execute</text>
      </g>
    </svg>
  );
}

function NoComplexityGraphic() {
  return (
    <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="420" height="220" rx="10" fill="var(--sch-deep)" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />

      <g transform="translate(20, 20)">
        <text x="0" y="10" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">
          ALGORITHMIC PROPORTIONALITY (OCCAM&apos;S RAZOR)
        </text>

        {/* Bloated AI Overhead (Rejected) */}
        <rect x="0" y="26" width="180" height="120" rx="6" fill="var(--sch-panel)" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
        <text x="12" y="44" fill="#ef4444" fontSize="8.5" fontWeight="600" fontFamily="monospace">REJECTED OVERHEAD</text>
        <text x="12" y="64" fill="var(--sch-text)" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">70B+ Monolithic Model</text>
        <text x="12" y="82" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• High Compute Bill ($$$)</text>
        <text x="12" y="98" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• 2,500ms Latency</text>
        <text x="12" y="114" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Black-Box Drift Risk</text>
        <rect x="12" y="124" width="156" height="14" rx="3" fill="var(--sch-red-bg)" />
        <text x="90" y="134" fill="#ef4444" fontSize="7.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">UNNECESSARY COMPLEXITY</text>

        {/* Lean Focused Architecture (Cuxton Approved) */}
        <rect x="200" y="26" width="180" height="120" rx="6" fill="var(--sch-chip)" stroke="var(--cuxton-teal-light)" strokeWidth="1.4" />
        <text x="212" y="44" fill="var(--cuxton-teal-light)" fontSize="8.5" fontWeight="600" fontFamily="monospace">CUXTON LEAN ARCHITECTURE</text>
        <text x="212" y="64" fill="var(--sch-text)" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">Task-Optimized Micro AI</text>
        <text x="212" y="82" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• 92% Lower Compute Cost</text>
        <text x="212" y="98" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Sub-150ms Determinism</text>
        <text x="212" y="114" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Full Audit Transparency</text>
        <rect x="212" y="124" width="156" height="14" rx="3" fill="var(--sch-panel)" />
        <text x="290" y="134" fill="#10b981" fontSize="7.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">PROPORTIONAL &amp; RELIABLE</text>
      </g>
    </svg>
  );
}

function LongTermThinkingGraphic() {
  return (
    <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="420" height="220" rx="10" fill="var(--sch-deep)" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />

      <g transform="translate(20, 20)">
        <text x="0" y="10" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">
          ASSET CUSTODY &amp; DRIFT MONITORING
        </text>

        {/* 3 Pillars of Long-Term Sustainability */}
        <g transform="translate(0, 26)">
          <rect x="0" y="0" width="120" height="118" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1" />
          <text x="10" y="20" fill="var(--cuxton-teal-light)" fontSize="8" fontWeight="600" fontFamily="monospace">01 · IP ASSET</text>
          <text x="10" y="38" fill="var(--sch-text)" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">100% Client IP</text>
          <text x="10" y="56" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• All Code Owned</text>
          <text x="10" y="72" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Zero Lock-in</text>
          <rect x="10" y="90" width="100" height="18" rx="3" fill="var(--sch-chip)" />
          <text x="60" y="102" fill="var(--cuxton-teal-light)" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="monospace">OWNERSHIP</text>
        </g>

        <g transform="translate(130, 26)">
          <rect x="0" y="0" width="120" height="118" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-amber)" strokeWidth="1" />
          <text x="10" y="20" fill="var(--cuxton-amber)" fontSize="8" fontWeight="600" fontFamily="monospace">02 · HANDOVER</text>
          <text x="10" y="38" fill="var(--sch-text)" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">Internal Team</text>
          <text x="10" y="56" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Runbooks</text>
          <text x="10" y="72" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Drills Passed</text>
          <rect x="10" y="90" width="100" height="18" rx="3" fill="var(--sch-amber-bg)" />
          <text x="60" y="102" fill="var(--cuxton-amber)" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="monospace">AUTONOMY</text>
        </g>

        <g transform="translate(260, 26)">
          <rect x="0" y="0" width="120" height="118" rx="6" fill="var(--sch-panel)" stroke="#10b981" strokeWidth="1" />
          <text x="10" y="20" fill="#10b981" fontSize="8" fontWeight="600" fontFamily="monospace">03 · VIGILANCE</text>
          <text x="10" y="38" fill="var(--sch-text)" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">Telemetry</text>
          <text x="10" y="56" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• Drift Monitor</text>
          <text x="10" y="72" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">• SLA Retrain</text>
          <rect x="10" y="90" width="100" height="18" rx="3" fill="var(--sch-green-bg)" />
          <text x="60" y="102" fill="#10b981" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="monospace">RESILIENCE</text>
        </g>
      </g>
    </svg>
  );
}

/* ─── PRINCIPLES DATASET ─────────────────────────────────────────── */

const PRINCIPLES_DATA: PrincipleData[] = [
  {
    index: "01",
    label: "Problem-first",
    category: "TENET 01, OPERATIONAL DISCIPLINE",
    tagline: "Understand the business friction before recommending any technology.",
    desc: "Every engagement begins with rigorous operational diagnosis—not a model architecture or vendor platform we want to push. We interrogate workflow friction points, unit economics, and data readiness first. If a problem is better solved with traditional deterministic rules, we recommend that with complete candour.",
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
            Six rules we hold ourselves to on every engagement — about what we build, what we tell you, and who stays accountable once it is running.
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
