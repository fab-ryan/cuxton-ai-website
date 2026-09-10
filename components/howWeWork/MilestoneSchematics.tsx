"use client";

import React from "react";

/* ═══════════════════════════════════════════════════════════════════
   CUXTON AI — BESPOKE MILESTONE TECHNICAL SCHEMATICS & TOPOLOGY RADAR
   Strict solid token architecture. STRICTLY ZERO linear gradients.
   STRICTLY ZERO emojis.
   ═══════════════════════════════════════════════════════════════════ */

interface SchematicProps {
  stepNumber: string;
  stepName: string;
}

/* ─── 01. DISCOVER: Workflow & Friction Scanner ───────────────────── */
export function DiscoverSchematic() {
  return (
    <svg viewBox="0 0 740 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background Grid Pattern */}
      <rect x="0" y="0" width="740" height="180" rx="10" fill="var(--sch-deepest)" stroke="rgba(27,107,138,0.22)" strokeWidth="1" />
      <line x1="20" y1="90" x2="720" y2="90" stroke="rgba(27,107,138,0.12)" strokeDasharray="4 4" />
      <line x1="230" y1="10" x2="230" y2="170" stroke="rgba(27,107,138,0.12)" strokeDasharray="4 4" />
      <line x1="510" y1="10" x2="510" y2="170" stroke="rgba(27,107,138,0.12)" strokeDasharray="4 4" />

      {/* Input Channels (Left) */}
      <g transform="translate(20, 20)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">INPUT CHANNELS</text>

        {/* Channel 1 */}
        <rect x="0" y="12" width="180" height="26" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <circle cx="14" cy="25" r="3" fill="var(--cuxton-amber)" />
        <text x="26" y="29" fill="var(--sch-text-2)" fontSize="10.5" fontWeight="600" fontFamily="sans-serif">Executive Strategic Intent</text>

        {/* Channel 2 */}
        <rect x="0" y="44" width="180" height="26" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <circle cx="14" cy="57" r="3" fill="var(--cuxton-teal-light)" />
        <text x="26" y="61" fill="var(--sch-text-2)" fontSize="10.5" fontWeight="600" fontFamily="sans-serif">Operational Workflow Logs</text>

        {/* Channel 3 */}
        <rect x="0" y="76" width="180" height="26" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <circle cx="14" cy="89" r="3" fill="var(--cuxton-teal-light)" />
        <text x="26" y="93" fill="var(--sch-text-2)" fontSize="10.5" fontWeight="600" fontFamily="sans-serif">Enterprise IT Systems Map</text>

        {/* Channel 4 */}
        <rect x="0" y="108" width="180" height="26" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <circle cx="14" cy="121" r="3" fill="var(--cuxton-amber)" />
        <text x="26" y="125" fill="var(--sch-text-2)" fontSize="10.5" fontWeight="600" fontFamily="sans-serif">Compliance & Policy Boundary</text>
      </g>

      {/* Connecting Flow Lines to Center */}
      <path d="M200 45 H 240 V 90 H 260" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
      <path d="M200 77 H 260" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" />
      <path d="M200 109 H 260" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" />
      <path d="M200 141 H 240 V 90 H 260" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />

      {/* Central Diagnostic Filter (Center) */}
      <g transform="translate(260, 30)">
        <rect x="0" y="0" width="220" height="120" rx="10" fill="var(--sch-panel-2)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <rect x="0" y="0" width="220" height="24" rx="10" fill="var(--sch-line)" />
        <text x="12" y="16" fill="var(--cuxton-amber)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">FRICTION DIAGNOSTIC ENGINE</text>

        <text x="14" y="44" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Manual Bottleneck Isolation</text>
        <rect x="14" y="52" width="192" height="6" rx="3" fill="var(--sch-deep)" />
        <rect x="14" y="52" width="168" height="6" rx="3" fill="var(--cuxton-teal-light)" />

        <text x="14" y="78" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Data Ingestion Readiness Score</text>
        <rect x="14" y="86" width="192" height="6" rx="3" fill="var(--sch-deep)" />
        <rect x="14" y="86" width="180" height="6" rx="3" fill="var(--cuxton-amber)" />

        <text x="14" y="108" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="monospace">STATUS: 14 FRICTION POINTS IDENTIFIED</text>
      </g>

      {/* Connector from Center to Right */}
      <path d="M480 90 H 530" stroke="var(--cuxton-amber)" strokeWidth="2" strokeDasharray="4 2" fill="none" />
      <polygon points="534,90 526,85 526,95" fill="var(--cuxton-amber)" />

      {/* Verified Deliverable Output (Right) */}
      <g transform="translate(540, 26)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">VERIFIED ASSET</text>
        <rect x="0" y="8" width="180" height="126" rx="8" fill="var(--sch-panel)" stroke="rgba(245,166,35,0.4)" strokeWidth="1.5" />
        <text x="14" y="30" fill="var(--cuxton-amber)" fontSize="12" fontWeight="600" fontFamily="sans-serif">AI Opportunity Catalog</text>
        <text x="14" y="48" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">Quantified Value Sizing</text>
        <line x1="14" y1="58" x2="166" y2="58" stroke="rgba(27,107,138,0.3)" />

        <text x="14" y="76" fill="var(--sch-text-2)" fontSize="10" fontWeight="600" fontFamily="sans-serif">• 12 Candidate Use Cases</text>
        <text x="14" y="94" fill="var(--sch-text-2)" fontSize="10" fontWeight="600" fontFamily="sans-serif">• Baseline ROI Estimates</text>
        <text x="14" y="112" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="700" fontFamily="monospace">READY FOR STAGE 02 GATE</text>
      </g>
    </svg>
  );
}

/* ─── 02. ASSESS: 6-Pillar Feasibility Radar Matrix ────────────────── */
export function AssessSchematic() {
  return (
    <svg viewBox="0 0 740 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="0" y="0" width="740" height="180" rx="10" fill="var(--sch-deepest)" stroke="rgba(27,107,138,0.22)" strokeWidth="1" />

      {/* Radar Matrix Graphic (Left) */}
      <g transform="translate(30, 20)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">FEASIBILITY RADAR</text>

        {/* Concentric Assessment Polygons */}
        <polygon points="100,20 160,55 160,115 100,145 40,115 40,55" fill="none" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />
        <polygon points="100,45 135,67 135,103 100,123 65,103 65,67" fill="none" stroke="rgba(27,107,138,0.18)" strokeWidth="1" />

        {/* Empirical Assessment Result Shape */}
        <polygon points="100,28 152,58 145,110 100,138 48,110 52,60" fill="rgba(45,154,191,0.15)" stroke="var(--cuxton-teal-light)" strokeWidth="2" />

        {/* Labels at vertices */}
        <text x="100" y="14" fill="var(--sch-text-2)" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">Data Quality (94%)</text>
        <text x="165" y="55" fill="var(--sch-text-2)" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">Compliance (100%)</text>
        <text x="165" y="120" fill="var(--sch-text-2)" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">Scalability (92%)</text>
        <text x="100" y="156" fill="var(--sch-text-2)" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">ROI Speed (86%)</text>
        <text x="35" y="120" fill="var(--sch-text-2)" fontSize="8.5" fontWeight="700" textAnchor="end" fontFamily="sans-serif">Adoption (88%)</text>
        <text x="35" y="55" fill="var(--sch-text-2)" fontSize="8.5" fontWeight="700" textAnchor="end" fontFamily="sans-serif">Tech Viable (91%)</text>
      </g>

      {/* Six Diagnostic Pillar Badges (Center) */}
      <g transform="translate(290, 24)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">SIX-PILLAR STRESS TESTING</text>

        {/* Row 1 */}
        <rect x="0" y="10" width="130" height="30" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1" />
        <text x="10" y="24" fill="var(--sch-text-dim)" fontSize="8" fontFamily="monospace">PILLAR 01</text>
        <text x="10" y="35" fill="var(--sch-text)" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">Data Provenance</text>
        <rect x="104" y="18" width="16" height="14" rx="3" fill="var(--sch-chip)" />
        <path d="M107 25 L111 29 L117 21" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" />

        <rect x="140" y="10" width="130" height="30" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1" />
        <text x="150" y="24" fill="var(--sch-text-dim)" fontSize="8" fontFamily="monospace">PILLAR 02</text>
        <text x="150" y="35" fill="var(--sch-text)" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">EU AI Act / GDPR</text>
        <rect x="244" y="18" width="16" height="14" rx="3" fill="var(--sch-chip)" />
        <path d="M247 25 L251 29 L257 21" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" />

        {/* Row 2 */}
        <rect x="0" y="48" width="130" height="30" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1" />
        <text x="10" y="62" fill="var(--sch-text-dim)" fontSize="8" fontFamily="monospace">PILLAR 03</text>
        <text x="10" y="73" fill="var(--sch-text)" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">Latency & Compute</text>
        <rect x="104" y="56" width="16" height="14" rx="3" fill="var(--sch-chip)" />
        <path d="M107 63 L111 67 L117 59" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" />

        <rect x="140" y="48" width="130" height="30" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1" />
        <text x="150" y="62" fill="var(--sch-text-dim)" fontSize="8" fontFamily="monospace">PILLAR 04</text>
        <text x="150" y="73" fill="var(--sch-text)" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">API Security Bounds</text>
        <rect x="244" y="56" width="16" height="14" rx="3" fill="var(--sch-chip)" />
        <path d="M247 63 L251 67 L257 59" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" />

        {/* Row 3 */}
        <rect x="0" y="86" width="130" height="30" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1" />
        <text x="10" y="100" fill="var(--sch-text-dim)" fontSize="8" fontFamily="monospace">PILLAR 05</text>
        <text x="10" y="111" fill="var(--sch-text)" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">ROI Breakeven Target</text>
        <rect x="104" y="94" width="16" height="14" rx="3" fill="var(--sch-chip)" />
        <path d="M107 101 L111 105 L117 97" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" />

        <rect x="140" y="86" width="130" height="30" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1" />
        <text x="150" y="100" fill="var(--sch-text-dim)" fontSize="8" fontFamily="monospace">PILLAR 06</text>
        <text x="150" y="111" fill="var(--sch-text)" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">Operational Readiness</text>
        <rect x="244" y="94" width="16" height="14" rx="3" fill="var(--sch-chip)" />
        <path d="M247 101 L251 105 L257 97" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" fill="none" />
      </g>

      {/* Audit Clearance Summary (Right) */}
      <g transform="translate(580, 24)">
        <text x="0" y="0" fill="var(--cuxton-amber)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">RISK AUDIT CLEARANCE</text>
        <rect x="0" y="10" width="140" height="126" rx="8" fill="var(--sch-panel)" stroke="rgba(245,166,35,0.4)" strokeWidth="1.5" />
        <rect x="12" y="22" width="116" height="24" rx="4" fill="var(--sch-deep)" stroke="var(--cuxton-teal-light)" strokeWidth="1" />
        <text x="70" y="38" fill="var(--cuxton-teal-light)" fontSize="9.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">ZERO BLOCKERS</text>

        <text x="14" y="66" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Feasibility Score</text>
        <text x="14" y="86" fill="var(--cuxton-amber)" fontSize="18" fontWeight="600" fontFamily="monospace">92.4 / 100</text>
        <text x="14" y="106" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">Confidence: High</text>
        <text x="14" y="122" fill="var(--cuxton-teal-light)" fontSize="9" fontFamily="monospace">APPROVED FOR PRIORITISATION</text>
      </g>
    </svg>
  );
}

/* ─── 03. PRIORITISE: Value vs. Complexity Decision Quadrant ───────── */
export function PrioritiseSchematic() {
  return (
    <svg viewBox="0 0 740 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="0" y="0" width="740" height="180" rx="10" fill="var(--sch-deepest)" stroke="rgba(27,107,138,0.22)" strokeWidth="1" />

      {/* 2x2 Decision Matrix (Left/Center) */}
      <g transform="translate(40, 20)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">VALUE VS. COMPLEXITY DECISION QUADRANT</text>

        {/* Coordinate Axes */}
        <line x1="40" y1="130" x2="360" y2="130" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <line x1="40" y1="130" x2="40" y2="20" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <polygon points="364,130 356,126 356,134" fill="var(--cuxton-teal-light)" />
        <polygon points="40,16 36,24 44,24" fill="var(--cuxton-teal-light)" />

        <text x="200" y="146" fill="var(--sch-text-dim)" fontSize="9" textAnchor="middle" fontFamily="sans-serif">IMPLEMENTATION FEASIBILITY & VELOCITY →</text>
        <text x="18" y="75" fill="var(--sch-text-dim)" fontSize="9" textAnchor="middle" transform="rotate(-90 18,75)" fontFamily="sans-serif">BUSINESS VALUE ↑</text>

        {/* Quadrant Divider */}
        <line x1="200" y1="20" x2="200" y2="130" stroke="rgba(27,107,138,0.2)" strokeDasharray="4 4" />
        <line x1="40" y1="75" x2="360" y2="75" stroke="rgba(27,107,138,0.2)" strokeDasharray="4 4" />

        {/* Quadrant Highlight: TARGET PILOT ZONE (Top Right) */}
        <rect x="201" y="21" width="158" height="53" fill="rgba(245,166,35,0.08)" />
        <text x="280" y="34" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">HIGH IMPACT / HIGH FEASIBILITY</text>

        {/* Unselected Candidates (Muted dots) */}
        <circle cx="120" cy="100" r="4" fill="var(--sch-text-dim)" />
        <text x="130" y="103" fill="var(--sch-text-faint)" fontSize="8" fontFamily="sans-serif">Case #4 (Low ROI)</text>

        <circle cx="110" cy="50" r="4" fill="var(--sch-text-dim)" />
        <text x="120" y="53" fill="var(--sch-text-faint)" fontSize="8" fontFamily="sans-serif">Case #2 (High Complexity)</text>

        <circle cx="270" cy="105" r="4" fill="var(--sch-text-dim)" />
        <text x="280" y="108" fill="var(--sch-text-faint)" fontSize="8" fontFamily="sans-serif">Case #3 (Low Leverage)</text>

        {/* SELECTED PILOT USE CASE #1 (Glowing Amber Target) */}
        <circle cx="300" cy="48" r="8" fill="var(--cuxton-amber)" />
        <circle cx="300" cy="48" r="14" stroke="var(--cuxton-amber)" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
        <rect x="210" y="56" width="140" height="18" rx="4" fill="var(--sch-panel)" stroke="var(--cuxton-amber)" strokeWidth="1" />
        <text x="280" y="69" fill="var(--sch-text)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">PILOT SELECTION: USE CASE #1</text>
      </g>

      {/* Prioritization Decision Card (Right) */}
      <g transform="translate(440, 24)">
        <text x="0" y="0" fill="var(--cuxton-amber)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">PILOT PROJECT CHARTER</text>
        <rect x="0" y="10" width="260" height="126" rx="8" fill="var(--sch-panel)" stroke="rgba(245,166,35,0.4)" strokeWidth="1.5" />

        <text x="16" y="32" fill="var(--sch-text)" fontSize="12" fontWeight="600" fontFamily="sans-serif">Charter Scope Boundary</text>
        <text x="16" y="50" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">Unanimous Steering Consensus</text>
        <line x1="16" y1="58" x2="244" y2="58" stroke="rgba(27,107,138,0.3)" />

        <text x="16" y="78" fill="var(--sch-text-2)" fontSize="10.5" fontWeight="600" fontFamily="sans-serif">Targeted Velocity: 6-Week Deployment</text>
        <text x="16" y="96" fill="var(--sch-text-2)" fontSize="10.5" fontWeight="600" fontFamily="sans-serif">Commercial KPI: 65% Process Reduction</text>
        <text x="16" y="116" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" fontFamily="monospace">STATUS: RESOURCE ALLOCATED</text>
      </g>
    </svg>
  );
}

/* ─── 04. DESIGN: Zero-Trust Architecture Blueprint ────────────────── */
export function DesignSchematic() {
  return (
    <svg viewBox="0 0 740 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="0" y="0" width="740" height="180" rx="10" fill="var(--sch-deepest)" stroke="rgba(27,107,138,0.22)" strokeWidth="1" />

      <g transform="translate(30, 20)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">ZERO-TRUST SYSTEM ARCHITECTURE SPECIFICATION</text>
      </g>

      {/* Architecture Blocks (4 Sequential Enclaves) */}
      <g transform="translate(30, 42)">
        {/* Block 1: Ingestion Sanitizer */}
        <rect x="0" y="0" width="150" height="105" rx="8" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.2" />
        <rect x="0" y="0" width="150" height="22" rx="8" fill="var(--sch-line)" />
        <text x="10" y="15" fill="var(--cuxton-amber)" fontSize="9" fontWeight="600" fontFamily="monospace">01 · INGESTION</text>
        <text x="10" y="42" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Automated Sanitizer</text>
        <text x="10" y="60" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">• PII Masking Engine</text>
        <text x="10" y="76" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">• Prompt Injection Shield</text>
        <text x="10" y="92" fill="var(--cuxton-teal-light)" fontSize="8.5" fontWeight="700" fontFamily="monospace">INPUT HARDENED</text>

        {/* Connector 1 */}
        <path d="M150 52 H 176" stroke="var(--cuxton-teal-light)" strokeWidth="2" fill="none" />
        <polygon points="180,52 174,48 174,56" fill="var(--cuxton-teal-light)" />

        {/* Block 2: RBAC Boundary */}
        <rect x="180" y="0" width="150" height="105" rx="8" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.2" />
        <rect x="180" y="0" width="150" height="22" rx="8" fill="var(--sch-line)" />
        <text x="190" y="15" fill="var(--cuxton-amber)" fontSize="9" fontWeight="600" fontFamily="monospace">02 · PERMISSIONS</text>
        <text x="190" y="42" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Contextual RBAC</text>
        <text x="190" y="60" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">• Session Claim Token</text>
        <text x="190" y="76" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">• Zero Data Retention</text>
        <text x="190" y="92" fill="var(--cuxton-teal-light)" fontSize="8.5" fontWeight="700" fontFamily="monospace">ACCESS ISOLATED</text>

        {/* Connector 2 */}
        <path d="M330 52 H 356" stroke="var(--cuxton-teal-light)" strokeWidth="2" fill="none" />
        <polygon points="360,52 354,48 354,56" fill="var(--cuxton-teal-light)" />

        {/* Block 3: Model Inference Enclave */}
        <rect x="360" y="0" width="150" height="105" rx="8" fill="var(--sch-panel)" stroke="var(--cuxton-amber)" strokeWidth="1.4" />
        <rect x="360" y="0" width="150" height="22" rx="8" fill="var(--sch-amber-bg)" />
        <text x="370" y="15" fill="var(--cuxton-amber)" fontSize="9" fontWeight="600" fontFamily="monospace">03 · INFERENCE</text>
        <text x="370" y="42" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Target Model Enclave</text>
        <text x="370" y="60" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">• Temperature Locked</text>
        <text x="370" y="76" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">• Secondary Guardrail Check</text>
        <text x="370" y="92" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="700" fontFamily="monospace">DETERMINISTIC BOUND</text>

        {/* Connector 3 */}
        <path d="M510 52 H 536" stroke="var(--cuxton-teal-light)" strokeWidth="2" fill="none" />
        <polygon points="540,52 534,48 534,56" fill="var(--cuxton-teal-light)" />

        {/* Block 4: Immutable Audit Telemetry */}
        <rect x="540" y="0" width="140" height="105" rx="8" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.2" />
        <rect x="540" y="0" width="140" height="22" rx="8" fill="var(--sch-line)" />
        <text x="550" y="15" fill="var(--cuxton-amber)" fontSize="9" fontWeight="600" fontFamily="monospace">04 · AUDIT VAULT</text>
        <text x="550" y="42" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Cryptographic Log</text>
        <text x="550" y="60" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">• SHA-256 Attribution</text>
        <text x="550" y="76" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">• SIEM Integration</text>
        <text x="550" y="92" fill="var(--cuxton-teal-light)" fontSize="8.5" fontWeight="700" fontFamily="monospace">SOC2 COMPLIANT</text>
      </g>
    </svg>
  );
}

/* ─── 05. PROTOTYPE: Controlled Sandbox Validation Lab ─────────────── */
export function PrototypeSchematic() {
  return (
    <svg viewBox="0 0 740 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="0" y="0" width="740" height="180" rx="10" fill="var(--sch-deepest)" stroke="rgba(27,107,138,0.22)" strokeWidth="1" />

      {/* Sandbox Enclave Perimeter */}
      <g transform="translate(30, 20)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">CONTROLLED AIR-GAPPED PROTOTYPE LAB</text>

        <rect x="0" y="12" width="440" height="126" rx="8" fill="var(--sch-deep)" stroke="var(--cuxton-teal-light)" strokeDasharray="4 3" strokeWidth="1.5" />
        <text x="14" y="32" fill="var(--cuxton-amber)" fontSize="10" fontWeight="600" fontFamily="monospace">AIR-GAPPED BENCHMARK SANDBOX</text>

        {/* Metric Card 1 */}
        <rect x="14" y="44" width="125" height="80" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <text x="24" y="62" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">Inference Latency</text>
        <text x="24" y="86" fill="var(--cuxton-teal-light)" fontSize="20" fontWeight="600" fontFamily="monospace">142 ms</text>
        <text x="24" y="106" fill="#10b981" fontSize="9" fontWeight="700" fontFamily="monospace">TARGET &lt; 250ms OK</text>

        {/* Metric Card 2 */}
        <rect x="150" y="44" width="130" height="80" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <text x="160" y="62" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">Deterministic Accuracy</text>
        <text x="160" y="86" fill="var(--cuxton-amber)" fontSize="20" fontWeight="600" fontFamily="monospace">99.2%</text>
        <text x="160" y="106" fill="#10b981" fontSize="9" fontWeight="700" fontFamily="monospace">GATE PASSED</text>

        {/* Metric Card 3 */}
        <rect x="290" y="44" width="135" height="80" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
        <text x="300" y="62" fill="var(--sch-text-dim)" fontSize="9" fontFamily="sans-serif">Hallucination Bound</text>
        <text x="300" y="86" fill="var(--cuxton-teal-light)" fontSize="20" fontWeight="600" fontFamily="monospace">&lt; 0.05%</text>
        <text x="300" y="106" fill="#10b981" fontSize="9" fontWeight="700" fontFamily="monospace">VERIFIED SECURE</text>
      </g>

      {/* User Trial Results (Right) */}
      <g transform="translate(500, 24)">
        <text x="0" y="0" fill="var(--cuxton-amber)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">USER TESTING RESULTS</text>
        <rect x="0" y="10" width="200" height="126" rx="8" fill="var(--sch-panel)" stroke="rgba(245,166,35,0.4)" strokeWidth="1.5" />

        <text x="14" y="32" fill="var(--sch-text)" fontSize="11.5" fontWeight="600" fontFamily="sans-serif">End-User Usability Score</text>
        <text x="14" y="56" fill="var(--cuxton-teal-light)" fontSize="22" fontWeight="600" fontFamily="monospace">94.8%</text>
        <line x1="14" y1="68" x2="186" y2="68" stroke="rgba(27,107,138,0.3)" />

        <text x="14" y="86" fill="var(--sch-text-2)" fontSize="10" fontWeight="600" fontFamily="sans-serif">• 18 Pilot Testers Completed</text>
        <text x="14" y="104" fill="var(--sch-text-2)" fontSize="10" fontWeight="600" fontFamily="sans-serif">• Production Gap Matrix Clear</text>
        <text x="14" y="122" fill="var(--cuxton-amber)" fontSize="9.5" fontWeight="600" fontFamily="monospace">READY FOR PRODUCTION BUILD</text>
      </g>
    </svg>
  );
}

/* ─── 06. DEPLOY: Hardened Production Deployment Topology ─────────── */
export function DeploySchematic() {
  return (
    <svg viewBox="0 0 740 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="0" y="0" width="740" height="180" rx="10" fill="var(--sch-deepest)" stroke="rgba(27,107,138,0.22)" strokeWidth="1" />

      <g transform="translate(30, 20)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">DEDICATED CLIENT TENANT INFRASTRUCTURE</text>

        {/* VPC Perimeter Border */}
        <rect x="0" y="12" width="680" height="126" rx="8" fill="var(--sch-deep)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
        <rect x="0" y="12" width="180" height="20" rx="8" fill="var(--sch-line)" />
        <text x="10" y="26" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="600" fontFamily="monospace">SECURE ENCLAVE BOUNDARY</text>

        {/* Core Components inside Tenant */}
        {/* Component 1 */}
        <g transform="translate(18, 42)">
          <rect x="0" y="0" width="130" height="82" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.4)" />
          <text x="10" y="18" fill="var(--cuxton-teal-light)" fontSize="8" fontWeight="600" fontFamily="monospace">API GATEWAY</text>
          <text x="10" y="36" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Hardened Edge</text>
          <text x="10" y="54" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">Rate Limited / mTLS</text>
          <text x="10" y="70" fill="#10b981" fontSize="8.5" fontWeight="700" fontFamily="monospace">ACTIVE 24/7</text>
        </g>

        <path d="M152 83 H 178" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />

        {/* Component 2 */}
        <g transform="translate(180, 42)">
          <rect x="0" y="0" width="140" height="82" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.4)" />
          <text x="10" y="18" fill="var(--cuxton-teal-light)" fontSize="8" fontWeight="600" fontFamily="monospace">CONTAINER CLUSTER</text>
          <text x="10" y="36" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Multi-Zone Pods</text>
          <text x="10" y="54" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">Zero-Downtime Failover</text>
          <text x="10" y="70" fill="#10b981" fontSize="8.5" fontWeight="700" fontFamily="monospace">HEALTHY (3 REPLICAS)</text>
        </g>

        <path d="M324 83 H 350" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />

        {/* Component 3 */}
        <g transform="translate(352, 42)">
          <rect x="0" y="0" width="140" height="82" rx="6" fill="var(--sch-panel)" stroke="var(--cuxton-amber)" strokeWidth="1.2" />
          <text x="10" y="18" fill="var(--cuxton-amber)" fontSize="8" fontWeight="600" fontFamily="monospace">INFRASTRUCTURE SEC</text>
          <text x="10" y="36" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Pen-Test Verified</text>
          <text x="10" y="54" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">Zero Critical Defects</text>
          <text x="10" y="70" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="700" fontFamily="monospace">AUDIT CERTIFIED</text>
        </g>

        <path d="M496 83 H 522" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />

        {/* Component 4 */}
        <g transform="translate(524, 42)">
          <rect x="0" y="0" width="138" height="82" rx="6" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.4)" />
          <text x="10" y="18" fill="var(--cuxton-teal-light)" fontSize="8" fontWeight="600" fontFamily="monospace">RUNBOOKS &amp; SRE</text>
          <text x="10" y="36" fill="var(--sch-text)" fontSize="11" fontWeight="700" fontFamily="sans-serif">Disaster Recovery</text>
          <text x="10" y="54" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="sans-serif">RTO &lt; 5m / RPO &lt; 1m</text>
          <text x="10" y="70" fill="var(--cuxton-teal-light)" fontSize="8.5" fontWeight="700" fontFamily="monospace">OPS CLEARED</text>
        </g>
      </g>
    </svg>
  );
}

/* ─── 07. ENABLE: Workforce Certification & Custody Handover ──────── */
export function EnableSchematic() {
  return (
    <svg viewBox="0 0 740 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="0" y="0" width="740" height="180" rx="10" fill="var(--sch-deepest)" stroke="rgba(27,107,138,0.22)" strokeWidth="1" />

      <g transform="translate(30, 20)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">WORKFORCE ENABLEMENT &amp; CUSTODY MATRIX</text>

        {/* Track 1: End-User Operators */}
        <g transform="translate(0, 16)">
          <rect x="0" y="0" width="210" height="120" rx="8" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.2" />
          <rect x="0" y="0" width="210" height="22" rx="8" fill="var(--sch-line)" />
          <text x="12" y="15" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="600" fontFamily="monospace">TRACK 01 · OPERATORS</text>

          <text x="12" y="42" fill="var(--sch-text)" fontSize="11.5" fontWeight="700" fontFamily="sans-serif">Interactive Academy</text>
          <text x="12" y="60" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">• Workflow Integration Labs</text>
          <text x="12" y="78" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">• Exception Handling Drills</text>
          <rect x="12" y="90" width="186" height="18" rx="4" fill="var(--sch-deep)" />
          <text x="105" y="103" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace">100% OPERATORS CERTIFIED</text>
        </g>

        {/* Track 2: System Administrators */}
        <g transform="translate(235, 16)">
          <rect x="0" y="0" width="210" height="120" rx="8" fill="var(--sch-panel)" stroke="var(--cuxton-amber)" strokeWidth="1.2" />
          <rect x="0" y="0" width="210" height="22" rx="8" fill="var(--sch-amber-bg)" />
          <text x="12" y="15" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="600" fontFamily="monospace">TRACK 02 · SYSTEM ADMINS</text>

          <text x="12" y="42" fill="var(--sch-text)" fontSize="11.5" fontWeight="700" fontFamily="sans-serif">Operational Custody</text>
          <text x="12" y="60" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">• Incident Response Playbooks</text>
          <text x="12" y="78" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">• Independent Drill Execution</text>
          <rect x="12" y="90" width="186" height="18" rx="4" fill="var(--sch-deep)" />
          <text x="105" y="103" fill="var(--cuxton-amber)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace">ADMIN DRILL PASSED</text>
        </g>

        {/* Track 3: Governance Council */}
        <g transform="translate(470, 16)">
          <rect x="0" y="0" width="210" height="120" rx="8" fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.2" />
          <rect x="0" y="0" width="210" height="22" rx="8" fill="var(--sch-line)" />
          <text x="12" y="15" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="600" fontFamily="monospace">TRACK 03 · LEADERSHIP</text>

          <text x="12" y="42" fill="var(--sch-text)" fontSize="11.5" fontWeight="700" fontFamily="sans-serif">Governance Protocol</text>
          <text x="12" y="60" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">• Continuous Audit Dashboard</text>
          <text x="12" y="78" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">• Escalation Threshold Framework</text>
          <rect x="12" y="90" width="186" height="18" rx="4" fill="var(--sch-deep)" />
          <text x="105" y="103" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace">GOVERNANCE CODIFIED</text>
        </g>
      </g>
    </svg>
  );
}

/* ─── 08. OPERATE: Continuous Telemetry & Drift Observability ──────── */
export function OperateSchematic() {
  return (
    <svg viewBox="0 0 740 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="0" y="0" width="740" height="180" rx="10" fill="var(--sch-deepest)" stroke="rgba(27,107,138,0.22)" strokeWidth="1" />

      <g transform="translate(30, 20)">
        <text x="0" y="0" fill="var(--cuxton-teal-light)" fontSize="10" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">CONTINUOUS OBSERVABILITY &amp; DRIFT TELEMETRY</text>

        {/* Telemetry Waveform Graph (Left) */}
        <g transform="translate(0, 16)">
          <rect x="0" y="0" width="410" height="120" rx="8" fill="var(--sch-panel)" stroke="rgba(27,107,138,0.3)" />
          <line x1="15" y1="60" x2="395" y2="60" stroke="rgba(27,107,138,0.2)" strokeDasharray="3 3" />

          {/* Stable Performance Wave (Zero linear gradient) */}
          <path d="M20 60 Q 50 45, 80 60 T 140 60 T 200 62 T 260 58 T 320 60 T 380 59" stroke="var(--cuxton-teal-light)" strokeWidth="2" fill="none" />
          <circle cx="380" cy="59" r="4" fill="var(--cuxton-teal-light)" />

          {/* Metric Overlays */}
          <text x="20" y="24" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="monospace">SYSTEM AVAILABILITY</text>
          <text x="20" y="44" fill="var(--sch-text)" fontSize="16" fontWeight="600" fontFamily="monospace">99.98%</text>

          <text x="160" y="24" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="monospace">DATA DRIFT VARIANCE</text>
          <text x="160" y="44" fill="#10b981" fontSize="16" fontWeight="600" fontFamily="monospace">0.02% (NOMINAL)</text>

          <text x="310" y="24" fill="var(--sch-text-dim)" fontSize="8.5" fontFamily="monospace">AUTOMATED RETRAIN</text>
          <text x="310" y="44" fill="var(--cuxton-amber)" fontSize="16" fontWeight="600" fontFamily="monospace">ACTIVE BOUND</text>

          <text x="20" y="105" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700" fontFamily="monospace">24/7 SIEM DRIFT OBSERVABILITY ACTIVE</text>
        </g>

        {/* Long-Term Horizon Strategy (Right) */}
        <g transform="translate(435, 16)">
          <rect x="0" y="0" width="245" height="120" rx="8" fill="var(--sch-panel)" stroke="rgba(245,166,35,0.4)" strokeWidth="1.5" />
          <text x="14" y="24" fill="var(--cuxton-amber)" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="monospace">QUARTERLY EXPANSION HORIZON</text>

          <text x="14" y="46" fill="var(--sch-text)" fontSize="12" fontWeight="600" fontFamily="sans-serif">Value Scale Roadmap</text>
          <text x="14" y="66" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">• Quarterly Steering Review</text>
          <text x="14" y="84" fill="var(--sch-text-dim)" fontSize="9.5" fontFamily="sans-serif">• Adjacent Workflow Mapping</text>
          <rect x="14" y="94" width="217" height="16" rx="3" fill="var(--sch-deep)" />
          <text x="122" y="106" fill="var(--cuxton-teal-light)" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">ENTERPRISE SCALE CERTIFIED</text>
        </g>
      </g>
    </svg>
  );
}

/* ─── STICKY COMMAND DECK TOPOLOGY RADAR ───────────────────────────── */
export function TopologyRadarDeck({ activeStepIndex }: { activeStepIndex: number }) {
  const steps = [
    { n: "01", name: "Discover", angle: -90 },
    { n: "02", name: "Assess", angle: -45 },
    { n: "03", name: "Prioritise", angle: 0 },
    { n: "04", name: "Design", angle: 45 },
    { n: "05", name: "Prototype", angle: 90 },
    { n: "06", name: "Deploy", angle: 135 },
    { n: "07", name: "Enable", angle: 180 },
    { n: "08", name: "Operate", angle: 225 },
  ];

  const centerX = 130;
  const centerY = 90;
  const radius = 64;

  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background Container */}
      <rect x="0" y="0" width="260" height="180" rx="10" fill="var(--sch-deep)" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />

      {/* Concentric Radar Rings (Zero linear gradient) */}
      <circle cx={centerX} cy={centerY} r={radius} stroke="rgba(27,107,138,0.3)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={centerX} cy={centerY} r={radius * 0.55} stroke="rgba(27,107,138,0.2)" strokeWidth="1" />
      <circle cx={centerX} cy={centerY} r={8} fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
      <circle cx={centerX} cy={centerY} r={3} fill="var(--cuxton-amber)" />

      {/* Axis Lines */}
      <line x1={centerX - radius - 10} y1={centerY} x2={centerX + radius + 10} y2={centerY} stroke="rgba(27,107,138,0.15)" strokeWidth="1" />
      <line x1={centerX} y1={centerY - radius - 10} x2={centerX} y2={centerY + radius + 10} stroke="rgba(27,107,138,0.15)" strokeWidth="1" />

      {/* 8 Milestone Nodes Spaced along Perimeter */}
      {steps.map((s, idx) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(rad);
        const y = centerY + radius * Math.sin(rad);
        const isActive = idx === activeStepIndex;
        const isPast = idx < activeStepIndex;

        return (
          <g key={s.n}>
            {/* Connector to Center */}
            <line
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={isActive ? "var(--cuxton-amber)" : isPast ? "var(--cuxton-teal-light)" : "rgba(27,107,138,0.2)"}
              strokeWidth={isActive ? 1.5 : 1}
            />

            {/* Node Circle */}
            <circle
              cx={x}
              cy={y}
              r={isActive ? 12 : 9}
              fill={isActive ? "var(--cuxton-amber)" : isPast ? "var(--sch-panel-2)" : "var(--sch-deep)"}
              stroke={isActive ? "var(--sch-text)" : isPast ? "var(--cuxton-teal-light)" : "rgba(27,107,138,0.4)"}
              strokeWidth={isActive ? 2 : 1.2}
            />

            {/* Node Text */}
            <text
              x={x}
              y={y + 3.5}
              fill={isActive ? "var(--sch-deep)" : isPast ? "var(--cuxton-teal-light)" : "var(--sch-text-dim)"}
              fontSize={isActive ? "8.5" : "7.5"}
              fontWeight="600"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {s.n}
            </text>
          </g>
        );
      })}

      {/* Live Label at Bottom */}
      <text x={centerX} y="168" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">
        Step {steps[activeStepIndex].n} — {steps[activeStepIndex].name}
      </text>
    </svg>
  );
}

/* ─── Component Factory: Render Schematic by Step Number ──────────── */
export default function MilestoneSchematic({ stepNumber }: { stepNumber: string }) {
  switch (stepNumber) {
    case "01":
      return <DiscoverSchematic />;
    case "02":
      return <AssessSchematic />;
    case "03":
      return <PrioritiseSchematic />;
    case "04":
      return <DesignSchematic />;
    case "05":
      return <PrototypeSchematic />;
    case "06":
      return <DeploySchematic />;
    case "07":
      return <EnableSchematic />;
    case "08":
      return <OperateSchematic />;
    default:
      return null;
  }
}
