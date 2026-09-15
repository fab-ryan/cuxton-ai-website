"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./CapabilitiesShowcase.module.css";

const capabilities = [
  {
    id: "private-ai",
    index: "01",
    name: "Private AI deployment",
    tagline: "Installed and hardened in your environment.",
    desc: "Complete installation, infrastructure sizing, configuration, and security hardening inside your controlled private cloud or on-premise hardware  through to production go-live with zero third-party data egress.",
    tags: ["Model Selection", "Infrastructure Sizing", "Hardware Enclaves", "Air-Gapped VPC", "Zero Egress"],
    ctaLink: "/technology",
    ctaText: "Explore Private Architecture",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </svg>
    ),
  },
  {
    id: "knowledge-grounded",
    index: "02",
    name: "Knowledge-grounded AI",
    tagline: "Answers with the source attached.",
    desc: "Enterprise semantic search and retrieval systems that answer strictly from your institutional knowledge, documents, and databases  attaching deterministic, verifiable citations to every response.",
    tags: ["Internal Corpora", "Hybrid Vector + BM25", "Source Provenance", "RBAC Permission-Aware", "Live Document Sync"],
    ctaLink: "/solutions",
    ctaText: "Explore Knowledge Systems",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: "workflow-automation",
    index: "03",
    name: "Secure workflow automation",
    tagline: "Scoped agents, with a record of what they did.",
    desc: "Specialised AI agents that execute defined internal operations within strict authorization boundaries, with deterministic tool calling and an immutable cryptographic audit record of every action taken.",
    tags: ["Scoped Multi-Agent Swarms", "Deterministic API Calling", "Human-in-the-Loop Signoff", "Immutable Audit Trails"],
    ctaLink: "/solutions",
    ctaText: "Explore Agent Workflows",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "role-specific",
    index: "04",
    name: "Role-specific assistants",
    tagline: "Built around a role, not a chat box.",
    desc: "Workstations shaped specifically around distinct professional roles rather than a generic prompt box  integrating the exact terminology, task templates, and clearance levels required for each job.",
    tags: ["Departmental Lenses", "Custom Domain Vocabularies", "Task Context Guardrails", "Role-Based Clearances"],
    ctaLink: "/solutions",
    ctaText: "Explore Role Assistants",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "enterprise-integration",
    index: "05",
    name: "Enterprise integration",
    tagline: "Into the systems already in service.",
    desc: "Two-way integration with the systems of record you already run, enterprise identity providers, data lakes, and line-of-business applications without disruptive legacy overhauls or platform lock-in.",
    tags: ["Systems of Record (ERP/CRM)", "Active Directory / Okta SSO", "Postgres & Snowflake Connectors", "Event-Driven Bus"],
    ctaLink: "/technology",
    ctaText: "Explore Integration Architecture",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: "governance",
    index: "06",
    name: "Ownership and governance",
    tagline: "Prompts, logs and models stay yours.",
    desc: "All model weights, fine-tuning checkpoints, vector indexes, prompt histories, and inference logs remain 100% client property  stored strictly where your compliance policies dictate and exportable at any time.",
    tags: ["100% Asset Ownership", "Model Version Control", "On-Premise Log Retention", "Zero Vendor Hostage", "Exportable Checkpoints"],
    ctaLink: "/technology",
    ctaText: "Explore Governance & Control",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────────
   BESPOKE ARCHITECTURAL SVG ILLUSTRATIONS (THEME ADAPTIVE)
   All fills and strokes reference CSS variables so they automatically
   harmonize with light or dark themes.
   ───────────────────────────────────────────────────────────────── */

function Illustration({ id }: { id: string }) {
  switch (id) {
    case "private-ai":
      return <PrivateAiIllustration />;
    case "knowledge-grounded":
      return <KnowledgeGroundedIllustration />;
    case "workflow-automation":
      return <WorkflowAutomationIllustration />;
    case "role-specific":
      return <RoleSpecificIllustration />;
    case "enterprise-integration":
      return <EnterpriseIntegrationIllustration />;
    case "governance":
      return <GovernanceIllustration />;
    default:
      return <PrivateAiIllustration />;
  }
}

/* 1. PRIVATE AI DEPLOYMENT: Hardened Air-Gapped Stack */
function PrivateAiIllustration() {
  return (
    <svg className={styles.svgContainer} viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="280" y1="20" x2="280" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B6B8A" stopOpacity="0.05" />
          {/* <stop offset="50%" stopColor="var(--showcase-canvas-bg)" stopOpacity="0.35" /> */}
        </linearGradient>
      </defs>

      {/* Outer Air-Gapped Boundary Fence */}
      <rect x="25" y="20" width="510" height="260" rx="14" stroke="#1B6B8A" strokeWidth="1.5" strokeDasharray="6 6" fill="url(#shieldGrad)" />
      
      {/* Boundary Badges */}
      <rect x="40" y="32" width="130" height="22" rx="4" fill="var(--showcase-card-bg)" stroke="var(--showcase-card-border)" strokeWidth="1" />
      <text x="50" y="47" fill="var(--cuxton-teal-text)" fontSize="9.5" fontFamily="monospace" fontWeight="700">ZONE: AIR-GAPPED VPC</text>
      
      <rect x="380" y="32" width="140" height="22" rx="4" fill="var(--showcase-card-bg)" stroke="rgba(245,166,35,0.4)" strokeWidth="1" />
      <circle cx="392" cy="43" r="3.5" fill="#F5A623" />
      <text x="402" y="47" fill="#F5A623" fontSize="9.5" fontFamily="monospace" fontWeight="700">ZERO DATA RETENTION</text>

      {/* Layer 1: Dedicated Hardware Enclave (Bottom) */}
      <g transform="translate(80, 205)">
        <rect x="0" y="0" width="400" height="52" rx="8" fill="var(--showcase-card-bg)" stroke="var(--showcase-card-border)" strokeWidth="1.2" />
        <rect x="12" y="10" width="45" height="32" rx="4" fill="var(--showcase-card-inner)" stroke="rgba(var(--cuxton-teal-mid-rgb), 0.4)" />
        <circle cx="24" cy="26" r="3" fill="var(--cuxton-teal-mid)" />
        <circle cx="36" cy="26" r="3" fill="#F5A623" />
        <rect x="68" y="14" width="90" height="10" rx="2" fill="var(--showcase-card-border)" />
        <rect x="68" y="28" width="130" height="8" rx="2" fill="var(--showcase-card-border-subtle)" />
        
        {/* Hardware Status */}
        <text x="230" y="31" fill="var(--showcase-text-secondary)" fontSize="9.5" fontFamily="monospace" fontWeight="700">HOST: SECURE ON-PREM CLUSTER</text>
        {/* <rect x="345" y="14" width="42" height="24" rx="4" fill="rgba(var(--cuxton-teal-mid-rgb), 0.15)" stroke="var(--cuxton-teal-mid)" strokeWidth="1" /> */}
        {/* <text x="352" y="30" fill="var(--cuxton-teal-text)" fontSize="9" fontFamily="monospace" fontWeight="700">&lt;12ms</text> */}
      </g>

      {/* Layer 2: Network Isolation & Cryptographic Barrier (Middle) */}
      <g transform="translate(100, 135)">
        <rect x="0" y="0" width="360" height="48" rx="8" fill="var(--showcase-card-inner)" stroke="var(--showcase-card-border)" strokeWidth="1.2" />
        <path d="M20 24h320" stroke="#1B6B8A" strokeWidth="1.5" strokeDasharray="4 4" className={styles.animFlow} />
        <circle cx="180" cy="24" r="16" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.5" />
        {/* Lock Icon */}
        <path d="M176 24v-3a4 4 0 0 1 8 0v3m-10 0h12v7h-12z" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Layer 3: Model Weights Runtime Core (Top) */}
      <g transform="translate(140, 65)">
        <rect x="0" y="0" width="280" height="52" rx="10" fill="var(--showcase-card-bg)" stroke="#F5A623" strokeWidth="1.4" />
        <circle cx="35" cy="26" r="12" fill="rgba(245,166,35,0.15)" stroke="#F5A623" strokeWidth="1.2" />
        <rect x="29" y="20" width="12" height="12" rx="2" stroke="#F5A623" strokeWidth="1.2" fill="none" />
        <text x="60" y="24" fill="var(--showcase-text-primary)" fontSize="8" fontWeight="700">PRIVATE MODEL WEIGHTS</text>
        <text x="60" y="39" fill="var(--showcase-text-muted)" fontSize="9.5" fontFamily="monospace">LLAMA 3 // DEEPSEEK // MISTRAL</text>
      </g>

      {/* Connecting Vertical Data Buses */}
      <path d="M280 117v18" stroke="#F5A623" strokeWidth="2" strokeDasharray="3 3" className={styles.animFlow} />
      <path d="M280 183v22" stroke="var(--cuxton-teal-mid)" strokeWidth="2" strokeDasharray="3 3" className={styles.animFlow} />
    </svg>
  );
}

/* 2. KNOWLEDGE-GROUNDED AI: Semantic Vector RAG & Provenance */
function KnowledgeGroundedIllustration() {
  return (
    <svg className={styles.svgContainer} viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Matrix Grid */}
      <path d="M30 150h500M280 30v240" stroke="var(--showcase-card-border-subtle)" strokeWidth="1" />

      {/* LEFT: Enterprise Document Sources */}
      <g transform="translate(35, 45)">
        <rect x="0" y="0" width="125" height="210" rx="10" fill="var(--showcase-card-bg)" stroke="var(--showcase-card-border)" strokeWidth="1" />
        <text x="14" y="24" fill="var(--showcase-text-muted)" fontSize="9" fontFamily="monospace" fontWeight="700">ENTERPRISE DATA</text>

        {/* Doc 1: Contracts PDF */}
        <g transform="translate(12, 38)">
          <rect x="0" y="0" width="101" height="42" rx="6" fill="var(--showcase-card-inner)" stroke="var(--cuxton-teal-mid)" strokeWidth="1" />
          <text x="10" y="18" fill="var(--showcase-text-primary)" fontSize="10" fontWeight="700">POLICY_v4.PDF</text>
          <text x="10" y="32" fill="var(--cuxton-teal-text)" fontSize="8.5" fontFamily="monospace">CHUNK #184-B</text>
        </g>

        {/* Doc 2: SQL Database */}
        <g transform="translate(12, 90)">
          <rect x="0" y="0" width="101" height="42" rx="6" fill="var(--showcase-card-inner)" stroke="var(--showcase-card-border)" strokeWidth="1" />
          <text x="10" y="18" fill="var(--showcase-text-secondary)" fontSize="10" fontWeight="600">ERP_ACCOUNTS</text>
          <text x="10" y="32" fill="var(--showcase-text-muted)" fontSize="8.5" fontFamily="monospace">SQL REVENUE DB</text>
        </g>

        {/* Doc 3: Internal Wiki */}
        <g transform="translate(12, 142)">
          <rect x="0" y="0" width="101" height="42" rx="6" fill="var(--showcase-card-inner)" stroke="var(--showcase-card-border)" strokeWidth="1" />
          <text x="10" y="18" fill="var(--showcase-text-secondary)" fontSize="10" fontWeight="600">CONFLUENCE</text>
          <text x="10" y="32" fill="var(--showcase-text-muted)" fontSize="8.5" fontFamily="monospace">PROCEDURES</text>
        </g>
      </g>

      {/* CENTER: Vector Embedding Lattice & Semantic Search */}
      <g transform="translate(195, 45)">
        <rect x="0" y="0" width="165" height="210" rx="10" fill="var(--showcase-canvas-bg)" stroke="#1B6B8A" strokeWidth="1.2" />
        <rect x="14" y="12" width="137" height="22" rx="4" fill="var(--showcase-card-inner)" />
        <text x="24" y="27" fill="var(--cuxton-teal-text)" fontSize="9.5" fontFamily="monospace" fontWeight="700">VECTOR EMBEDDING MESH</text>

        {/* Neural Vector Nodes & Distance Arcs */}
        <circle cx="45" cy="75" r="4" fill="var(--cuxton-teal-mid)" />
        <circle cx="120" cy="65" r="3.5" fill="rgba(var(--cuxton-teal-mid-rgb), 0.5)" />
        <circle cx="85" cy="115" r="6" fill="#F5A623" className={styles.animHalo} />
        <circle cx="35" cy="155" r="4" fill="rgba(var(--cuxton-teal-mid-rgb), 0.5)" />
        <circle cx="130" cy="145" r="4" fill="var(--cuxton-teal-mid)" />
        <circle cx="90" cy="180" r="3" fill="rgba(var(--cuxton-teal-mid-rgb), 0.4)" />

        {/* Cosine Similarity Connections */}
        <path d="M45 75L85 115M120 65L85 115M35 155L85 115M130 145L85 115" stroke="rgba(var(--cuxton-teal-mid-rgb), 0.35)" strokeWidth="1.2" strokeDasharray="3 3" />
        <path d="M45 75L120 65M35 155L90 180M130 145L90 180" stroke="var(--showcase-card-border-subtle)" strokeWidth="1" />

        <rect x="35" y="110" width="100" height="18" rx="4" fill="var(--showcase-card-bg)" stroke="#F5A623" strokeWidth="1" />
        <text x="42" y="123" fill="#F5A623" fontSize="8" fontFamily="monospace" fontWeight="700">SIMILARITY: 0.94</text>
      </g>

      {/* RIGHT: Grounded Response with Deterministic Citations */}
      <g transform="translate(390, 45)">
        <rect x="0" y="0" width="135" height="210" rx="10" fill="var(--showcase-card-bg)" stroke="#F5A623" strokeWidth="1.2" />
        <text x="14" y="24" fill="#F5A623" fontSize="9" fontFamily="monospace" fontWeight="700">VERIFIED ANSWER</text>

        <rect x="12" y="38" width="111" height="85" rx="6" fill="var(--showcase-card-inner)" stroke="rgba(245,166,35,0.3)" />
        <rect x="20" y="48" width="75" height="6" rx="2" fill="var(--showcase-text-primary)" opacity="0.8" />
        <rect x="20" y="60" width="95" height="5" rx="2" fill="var(--showcase-text-secondary)" opacity="0.5" />
        <rect x="20" y="70" width="85" height="5" rx="2" fill="var(--showcase-text-secondary)" opacity="0.5" />
        <rect x="20" y="80" width="60" height="5" rx="2" fill="var(--showcase-text-secondary)" opacity="0.5" />
        
        {/* Verification Checkmark Pill */}
        <rect x="20" y="96" width="75" height="18" rx="4" fill="rgba(var(--cuxton-teal-mid-rgb), 0.18)" stroke="var(--cuxton-teal-mid)" strokeWidth="1" />
        <text x="26" y="108" fill="var(--cuxton-teal-text)" fontSize="8" fontFamily="monospace" fontWeight="700">✓ 100% GROUNDED</text>

        {/* Source Citation Attachment */}
        <g transform="translate(12, 135)">
          <rect x="0" y="0" width="111" height="55" rx="6" fill="var(--showcase-card-bg)" stroke="#F5A623" strokeWidth="1" />
          <text x="8" y="16" fill="#F5A623" fontSize="8" fontFamily="monospace" fontWeight="700">ATTACHED SOURCE:</text>
          <text x="8" y="32" fill="var(--showcase-text-primary)" fontSize="9" fontWeight="700">POLICY_v4.PDF</text>
          <text x="8" y="46" fill="var(--showcase-text-muted)" fontSize="8" fontFamily="monospace">PAGE 12 // SEC. 4.1</text>
        </g>
      </g>

      {/* Provenance Arrow from Source to Answer */}
      <path d="M147 105 C 170 105, 175 160, 195 160" stroke="var(--cuxton-teal-mid)" strokeWidth="1.8" strokeDasharray="4 4" className={styles.animFlow} fill="none" />
      <path d="M360 160 C 375 160, 375 162, 390 162" stroke="#F5A623" strokeWidth="1.8" strokeDasharray="4 4" className={styles.animFlow} fill="none" />
    </svg>
  );
}

/* 3. WORKFLOW AUTOMATION: Autonomous Agent Pipeline */
function WorkflowAutomationIllustration() {
  return (
    <svg className={styles.svgContainer} viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Track */}
      <rect x="30" y="25" width="500" height="250" rx="12" fill="var(--showcase-canvas-bg)" stroke="var(--showcase-card-border)" />
      
      {/* Main Orchestration Flow Line */}
      <path d="M70 130 H 480" stroke="#1B6B8A" strokeWidth="2.5" />
      <path d="M70 130 H 480" stroke="var(--cuxton-teal-mid)" strokeWidth="2.5" strokeDasharray="8 12" className={styles.animFlow} />

      {/* Stage 1: Trigger / Event Ingestion */}
      <g transform="translate(60, 85)">
        <rect x="0" y="0" width="85" height="90" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.5" />
        <circle cx="42.5" cy="30" r="14" fill="rgba(var(--cuxton-teal-mid-rgb), 0.15)" />
        <path d="M36 30l4 4 8-8" stroke="var(--cuxton-teal-mid)" strokeWidth="2" strokeLinecap="round" />
        <text x="14" y="60" fill="var(--showcase-text-primary)" fontSize="9.5" fontWeight="700">AGENT 01</text>
        <text x="10" y="74" fill="var(--cuxton-teal-text)" fontSize="8" fontFamily="monospace">INGESTION</text>
      </g>

      {/* Stage 2: Reasoning & Policy Evaluation */}
      <g transform="translate(180, 85)">
        <rect x="0" y="0" width="85" height="90" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.5" />
        <circle cx="42.5" cy="30" r="14" fill="rgba(var(--cuxton-teal-mid-rgb), 0.15)" />
        <path d="M35 30h15M42.5 23v14" stroke="var(--cuxton-teal-mid)" strokeWidth="2" strokeLinecap="round" />
        <text x="14" y="60" fill="var(--showcase-text-primary)" fontSize="9.5" fontWeight="700">AGENT 02</text>
        <text x="14" y="74" fill="var(--cuxton-teal-text)" fontSize="8" fontFamily="monospace">ANALYSIS</text>
      </g>

      {/* Stage 3: Tool Execution (API Bus) */}
      <g transform="translate(300, 85)">
        <rect x="0" y="0" width="85" height="90" rx="8" fill="var(--showcase-card-bg)" stroke="#F5A623" strokeWidth="1.5" />
        <circle cx="42.5" cy="30" r="14" fill="rgba(245,166,35,0.15)" />
        <rect x="36" y="24" width="13" height="12" rx="2" stroke="#F5A623" strokeWidth="1.6" />
        <text x="14" y="60" fill="var(--showcase-text-primary)" fontSize="9.5" fontWeight="700">TOOL BUS</text>
        <text x="14" y="74" fill="#F5A623" fontSize="8" fontFamily="monospace">REST API</text>
      </g>

      {/* Stage 4: Human-in-the-Loop Signoff Gate */}
      <g transform="translate(420, 85)">
        <rect x="0" y="0" width="85" height="90" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.5" />
        <circle cx="42.5" cy="30" r="14" fill="rgba(var(--cuxton-teal-mid-rgb), 0.15)" />
        <path d="M37 25a5 5 0 1 1 10 0 5 5 0 0 1-10 0v2m5 8h.01" stroke="var(--cuxton-teal-mid)" strokeWidth="2" strokeLinecap="round" />
        <text x="12" y="60" fill="var(--showcase-text-primary)" fontSize="9" fontWeight="700">HUMAN GATE</text>
        <text x="12" y="74" fill="var(--cuxton-teal-text)" fontSize="8" fontFamily="monospace">APPROVAL</text>
      </g>

      {/* Bottom Cryptographic Audit Ledger */}
      <g transform="translate(60, 205)">
        <rect x="0" y="0" width="445" height="46" rx="6" fill="var(--showcase-card-inner)" stroke="var(--showcase-card-border)" />
        <text x="16" y="20" fill="var(--showcase-text-muted)" fontSize="8.5" fontFamily="monospace">IMMUTABLE EXECUTION LOG // SHA-256 VERIFIED</text>
        <text x="16" y="34" fill="var(--cuxton-teal-text)" fontSize="9.5" fontFamily="monospace" fontWeight="700">TX#8491: TASK COMPLETED • DISPATCHED TO ERP • DURATION: 284ms</text>
        <circle cx="420" cy="23" r="4" fill="#F5A623" />
      </g>
    </svg>
  );
}

/* 4. ROLE-SPECIFIC ASSISTANTS: Scoped Departmental Lenses */
function RoleSpecificIllustration() {
  return (
    <svg className={styles.svgContainer} viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central Permission Shield */}
      <circle cx="280" cy="150" r="115" stroke="#1B6B8A" strokeWidth="1" strokeDasharray="4 4" className={styles.animSpin} />
      <circle cx="280" cy="150" r="85" stroke="rgba(var(--cuxton-teal-mid-rgb), 0.25)" strokeWidth="1.5" />
      
      {/* Central Orchestrator Core */}
      <g transform="translate(240, 115)">
        <rect x="0" y="0" width="80" height="70" rx="10" fill="var(--showcase-card-bg)" stroke="#F5A623" strokeWidth="1.5" />
        <circle cx="40" cy="28" r="14" fill="rgba(245,166,35,0.15)" />
        <path d="M35 28h10M40 23v10" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
        <text x="14" y="52" fill="var(--showcase-text-primary)" fontSize="9" fontWeight="700">ROLE CORE</text>
        <text x="16" y="62" fill="#F5A623" fontSize="7.5" fontFamily="monospace">ORCHESTRATOR</text>
      </g>

      {/* Role Pod 1: Legal & Compliance */}
      <g transform="translate(45, 60)" className={styles.animFloat}>
        <rect x="0" y="0" width="130" height="75" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.4" />
        <rect x="10" y="10" width="110" height="18" rx="4" fill="var(--showcase-card-inner)" />
        <text x="16" y="23" fill="var(--cuxton-teal-text)" fontSize="9" fontWeight="700">LEGAL COUNSEL</text>
        <text x="10" y="44" fill="var(--showcase-text-secondary)" fontSize="8.5">• Regulatory Redlining</text>
        <text x="10" y="57" fill="var(--showcase-text-secondary)" fontSize="8.5">• Risk Clause Triage</text>
        <text x="10" y="69" fill="#F5A623" fontSize="8" fontFamily="monospace">SCOPE: PRIVILEGED</text>
      </g>
      <path d="M175 97 L 240 135" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Role Pod 2: Finance & Risk Underwriting */}
      <g transform="translate(385, 60)">
        <rect x="0" y="0" width="130" height="75" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.4" />
        <rect x="10" y="10" width="110" height="18" rx="4" fill="var(--showcase-card-inner)" />
        <text x="16" y="23" fill="var(--cuxton-teal-text)" fontSize="9" fontWeight="700">RISK & UNDERWRITING</text>
        <text x="10" y="44" fill="var(--showcase-text-secondary)" fontSize="8.5">• Portfolio Stress-Tests</text>
        <text x="10" y="57" fill="var(--showcase-text-secondary)" fontSize="8.5">• Capital Adequacy Model</text>
        <text x="10" y="69" fill="#F5A623" fontSize="8" fontFamily="monospace">SCOPE: INTERNAL_FIN</text>
      </g>
      <path d="M385 97 L 320 135" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Role Pod 3: Operations & Case Support */}
      <g transform="translate(215, 205)">
        <rect x="0" y="0" width="130" height="70" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.4" />
        <rect x="10" y="8" width="110" height="18" rx="4" fill="var(--showcase-card-inner)" />
        <text x="16" y="21" fill="var(--cuxton-teal-text)" fontSize="9" fontWeight="700">OPERATIONS SPECIALIST</text>
        <text x="10" y="40" fill="var(--showcase-text-secondary)" fontSize="8.5">• High-Volume Triage</text>
        <text x="10" y="52" fill="var(--showcase-text-secondary)" fontSize="8.5">• Automated Dispatch</text>
        <text x="10" y="63" fill="#F5A623" fontSize="8" fontFamily="monospace">SCOPE: OPS_TIER_2</text>
      </g>
      <path d="M280 185 L 280 205" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" strokeDasharray="3 3" />
    </svg>
  );
}

/* 5. ENTERPRISE INTEGRATION: Hybrid Integration Hub */
function EnterpriseIntegrationIllustration() {
  return (
    <svg className={styles.svgContainer} viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central Integration Core Hub */}
      <g transform="translate(215, 105)">
        <rect x="0" y="0" width="130" height="90" rx="12" fill="var(--showcase-card-bg)" stroke="#F5A623" strokeWidth="1.8" />
        <circle cx="65" cy="35" r="18" fill="rgba(245,166,35,0.15)" stroke="#F5A623" strokeWidth="1.2" />
        <path d="M57 35h16M65 27v16" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
        <text x="24" y="65" fill="var(--showcase-text-primary)" fontSize="10" fontWeight="700">CUXTON HUB</text>
        <text x="18" y="78" fill="var(--cuxton-teal-text)" fontSize="8.5" fontFamily="monospace">NEURAL API BUS</text>
      </g>

      {/* Connector 1: SAP / Oracle ERP (Top-Left) */}
      <g transform="translate(35, 45)">
        <rect x="0" y="0" width="135" height="56" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <text x="14" y="24" fill="var(--showcase-text-primary)" fontSize="10.5" fontWeight="700">SAP // ORACLE ERP</text>
        <text x="14" y="42" fill="var(--cuxton-teal-text)" fontSize="8.5" fontFamily="monospace">CORE SYSTEM OF RECORD</text>
      </g>
      <path d="M170 73 L 215 125" stroke="var(--cuxton-teal-mid)" strokeWidth="1.8" strokeDasharray="4 4" className={styles.animFlow} />

      {/* Connector 2: Active Directory & Okta SSO (Bottom-Left) */}
      <g transform="translate(35, 195)">
        <rect x="0" y="0" width="135" height="56" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <text x="14" y="24" fill="var(--showcase-text-primary)" fontSize="10.5" fontWeight="700">OKTA // AD SSO</text>
        <text x="14" y="42" fill="var(--cuxton-teal-text)" fontSize="8.5" fontFamily="monospace">IDENTITY & RBAC CLEARANCE</text>
      </g>
      <path d="M170 223 L 215 175" stroke="var(--cuxton-teal-mid)" strokeWidth="1.8" strokeDasharray="4 4" className={styles.animFlow} />

      {/* Connector 3: Postgres & Snowflake Data Lake (Top-Right) */}
      <g transform="translate(390, 45)">
        <rect x="0" y="0" width="135" height="56" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <text x="14" y="24" fill="var(--showcase-text-primary)" fontSize="10.5" fontWeight="700">SNOWFLAKE // SQL</text>
        <text x="14" y="42" fill="var(--cuxton-teal-text)" fontSize="8.5" fontFamily="monospace">ENTERPRISE DATA LAKE</text>
      </g>
      <path d="M390 73 L 345 125" stroke="var(--cuxton-teal-mid)" strokeWidth="1.8" strokeDasharray="4 4" className={styles.animFlow} />

      {/* Connector 4: Custom REST / Webhook Bus (Bottom-Right) */}
      <g transform="translate(390, 195)">
        <rect x="0" y="0" width="135" height="56" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <text x="14" y="24" fill="var(--showcase-text-primary)" fontSize="10.5" fontWeight="700">REST & WEBHOOKS</text>
        <text x="14" y="42" fill="var(--cuxton-teal-text)" fontSize="8.5" fontFamily="monospace">LINE-OF-BUSINESS APIS</text>
      </g>
      <path d="M390 223 L 345 175" stroke="var(--cuxton-teal-mid)" strokeWidth="1.8" strokeDasharray="4 4" className={styles.animFlow} />
    </svg>
  );
}

/* 6. GOVERNANCE & OWNERSHIP: Asset Vault & Compliance Ledger */
function GovernanceIllustration() {
  return (
    <svg className={styles.svgContainer} viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer boundary */}
      <rect x="30" y="20" width="500" height="260" rx="14" fill="var(--showcase-canvas-bg)" stroke="#F5A623" strokeWidth="1.5" />
      
      {/* Vault Header Bar */}
      <rect x="30" y="20" width="500" height="38" rx="14" fill="var(--showcase-card-bg)" stroke="var(--showcase-card-border)" strokeWidth="1" />
      <circle cx="50" cy="39" r="4" fill="#F5A623" />
      <text x="62" y="43" fill="var(--showcase-text-primary)" fontSize="10" fontFamily="monospace" fontWeight="700">SOVEREIGN AI ASSET VAULT // 100% CLIENT PROPERTY</text>
      <text x="410" y="43" fill="var(--cuxton-teal-text)" fontSize="9" fontFamily="monospace">RETENTION: ON-PREM</text>

      {/* 3 control pillars */}
      {/* Pillar 1: Model Checkpoints */}
      <g transform="translate(55, 78)">
        <rect x="0" y="0" width="135" height="135" rx="8" fill="var(--showcase-card-inner)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <rect x="12" y="14" width="111" height="22" rx="4" fill="var(--showcase-card-bg)" />
        <text x="18" y="29" fill="var(--cuxton-teal-text)" fontSize="9.5" fontWeight="700">MODEL WEIGHTS</text>
        <text x="12" y="54" fill="var(--showcase-text-secondary)" fontSize="8.5">• Full LoRA Checkpoints</text>
        <text x="12" y="70" fill="var(--showcase-text-secondary)" fontSize="8.5">• Version Control v2.4.1</text>
        <text x="12" y="86" fill="var(--showcase-text-secondary)" fontSize="8.5">• SHA-256 Validated</text>
        <rect x="12" y="102" width="111" height="20" rx="4" fill="rgba(var(--cuxton-teal-mid-rgb), 0.15)" />
        <text x="22" y="116" fill="var(--cuxton-teal-text)" fontSize="8" fontFamily="monospace" fontWeight="700">EXPORTABLE ASSET</text>
      </g>

      {/* Pillar 2: Prompts & Audit Ledger */}
      <g transform="translate(212, 78)">
        <rect x="0" y="0" width="135" height="135" rx="8" fill="var(--showcase-card-inner)" stroke="#F5A623" strokeWidth="1.2" />
        <rect x="12" y="14" width="111" height="22" rx="4" fill="var(--showcase-card-bg)" />
        <text x="18" y="29" fill="#F5A623" fontSize="9.5" fontWeight="700">INFERENCE LOGS</text>
        <text x="12" y="54" fill="var(--showcase-text-secondary)" fontSize="8.5">• Tamper-Evident Ledger</text>
        <text x="12" y="70" fill="var(--showcase-text-secondary)" fontSize="8.5">• Zero Cloud Mirroring</text>
        <text x="12" y="86" fill="var(--showcase-text-secondary)" fontSize="8.5">• Audit Compliance</text>
        <rect x="12" y="102" width="111" height="20" rx="4" fill="rgba(245,166,35,0.15)" />
        <text x="24" y="116" fill="#F5A623" fontSize="8" fontFamily="monospace" fontWeight="700">LOCAL RETENTION</text>
      </g>

      {/* Pillar 3: Policy Guardrail Suite */}
      <g transform="translate(370, 78)">
        <rect x="0" y="0" width="135" height="135" rx="8" fill="var(--showcase-card-inner)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <rect x="12" y="14" width="111" height="22" rx="4" fill="var(--showcase-card-bg)" />
        <text x="18" y="29" fill="var(--cuxton-teal-text)" fontSize="9.5" fontWeight="700">POLICY GUARDRAILS</text>
        <text x="12" y="54" fill="var(--showcase-text-secondary)" fontSize="8.5">• PII Scrubbing Rules</text>
        <text x="12" y="70" fill="var(--showcase-text-secondary)" fontSize="8.5">• Eval Test Framework</text>
        <text x="12" y="86" fill="var(--showcase-text-secondary)" fontSize="8.5">• Hallucination Check</text>
        <rect x="12" y="102" width="111" height="20" rx="4" fill="rgba(var(--cuxton-teal-mid-rgb), 0.15)" />
        <text x="24" y="116" fill="var(--cuxton-teal-text)" fontSize="8" fontFamily="monospace" fontWeight="700">SAFETY ENFORCED</text>
      </g>

      {/* Bottom Ownership Guarantee Banner */}
      <g transform="translate(55, 230)">
        <rect x="0" y="0" width="450" height="34" rx="6" fill="var(--showcase-card-bg)" stroke="rgba(245,166,35,0.3)" />
        <text x="14" y="21" fill="var(--showcase-text-primary)" fontSize="9.5" fontWeight="600">ZERO VENDOR LOCK-IN GUARANTEE:</text>
        <text x="210" y="21" fill="#F5A623" fontSize="9.5" fontFamily="monospace" fontWeight="700">MODELS &amp; INDEXES FULLY PORTABLE</text>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MOBILE ILLUSTRATIONS (≤640px)

   The diagrams above are 560×300 and label things down to 8px. Scaled
   into a phone's ~300px of usable width they render at roughly half
   size, which puts that type under 5px — present, but unreadable.

   These are portrait 340×420 recompositions of the same six ideas:
   the same blocks stacked instead of spread, the incidental detail
   dropped, and nothing smaller than 10px. They share one viewBox so
   the panel doesn't change height as you switch tabs.
   ───────────────────────────────────────────────────────────────── */

function MobileIllustration({ id }: { id: string }) {
  switch (id) {
    case "private-ai":
      return <PrivateAiMobile />;
    case "knowledge-grounded":
      return <KnowledgeGroundedMobile />;
    case "workflow-automation":
      return <WorkflowAutomationMobile />;
    case "role-specific":
      return <RoleSpecificMobile />;
    case "enterprise-integration":
      return <EnterpriseIntegrationMobile />;
    case "governance":
      return <GovernanceMobile />;
    default:
      return <PrivateAiMobile />;
  }
}

/* 1. PRIVATE AI — hardened stack, bottom-up */
function PrivateAiMobile() {
  return (
    <svg className={styles.svgMobile} viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="324" height="404" rx="12" stroke="var(--cuxton-teal)" strokeWidth="1.5" strokeDasharray="6 6" />

      {/* Boundary badges */}
      <rect x="22" y="24" width="154" height="28" rx="4" fill="var(--showcase-card-bg)" stroke="var(--showcase-card-border)" strokeWidth="1" />
      <text x="33" y="43" fill="var(--cuxton-teal-text)" fontSize="11" fontFamily="monospace" fontWeight="700">ZONE: AIR-GAPPED</text>
      <rect x="186" y="24" width="132" height="28" rx="4" fill="var(--showcase-card-bg)" stroke="rgba(245,166,35,0.4)" strokeWidth="1" />
      <circle cx="200" cy="38" r="4" fill="var(--cuxton-amber)" />
      <text x="212" y="43" fill="var(--cuxton-amber)" fontSize="11" fontFamily="monospace" fontWeight="700">ZERO EGRESS</text>

      {/* Model weights */}
      <g transform="translate(26, 86)">
        <rect x="0" y="0" width="288" height="76" rx="10" fill="var(--showcase-card-bg)" stroke="var(--cuxton-amber)" strokeWidth="1.4" />
        <circle cx="38" cy="38" r="18" fill="rgba(245,166,35,0.15)" stroke="var(--cuxton-amber)" strokeWidth="1.2" />
        <rect x="30" y="30" width="16" height="16" rx="3" stroke="var(--cuxton-amber)" strokeWidth="1.4" />
        <text x="70" y="34" fill="var(--showcase-text-primary)" fontSize="13" fontWeight="700">PRIVATE MODEL WEIGHTS</text>
        <text x="70" y="55" fill="var(--showcase-text-muted)" fontSize="11" fontFamily="monospace">LLAMA 3 // MISTRAL</text>
      </g>
      <path d="M170 162V190" stroke="var(--cuxton-amber)" strokeWidth="2" className={styles.animFlow} />

      {/* Cryptographic barrier */}
      <g transform="translate(26, 190)">
        <rect x="0" y="0" width="288" height="76" rx="10" fill="var(--showcase-card-inner)" stroke="var(--showcase-card-border)" strokeWidth="1.2" />
        <circle cx="38" cy="38" r="18" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.4" />
        <path d="M33 38v-3a5 5 0 0 1 10 0v3m-12 0h14v9h-14z" stroke="var(--cuxton-amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="70" y="34" fill="var(--showcase-text-primary)" fontSize="13" fontWeight="700">ENCRYPTED ENCLAVE</text>
        <text x="70" y="55" fill="var(--cuxton-teal-text)" fontSize="11" fontFamily="monospace">HSM KEY ISOLATION</text>
      </g>
      <path d="M170 266V294" stroke="var(--cuxton-teal-mid)" strokeWidth="2" className={styles.animFlow} />

      {/* Host hardware */}
      <g transform="translate(26, 294)">
        <rect x="0" y="0" width="288" height="76" rx="10" fill="var(--showcase-card-bg)" stroke="var(--showcase-card-border)" strokeWidth="1.2" />
        <rect x="20" y="24" width="38" height="28" rx="4" fill="var(--showcase-card-inner)" stroke="rgba(var(--cuxton-teal-mid-rgb), 0.4)" />
        <circle cx="31" cy="38" r="3.5" fill="var(--cuxton-teal-mid)" />
        <circle cx="46" cy="38" r="3.5" fill="var(--cuxton-amber)" />
        <text x="70" y="34" fill="var(--showcase-text-primary)" fontSize="13" fontWeight="700">ON-PREM CLUSTER</text>
        <text x="70" y="55" fill="var(--showcase-text-muted)" fontSize="11" fontFamily="monospace">DEDICATED HARDWARE</text>
      </g>

      <text x="170" y="394" fill="var(--cuxton-amber)" fontSize="11" fontFamily="monospace" fontWeight="700" textAnchor="middle">NO THIRD-PARTY EGRESS</text>
    </svg>
  );
}

/* 2. KNOWLEDGE-GROUNDED — sources, mesh, cited answer */
function KnowledgeGroundedMobile() {
  return (
    <svg className={styles.svgMobile} viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Enterprise sources */}
      <g transform="translate(20, 14)">
        <rect x="0" y="0" width="300" height="132" rx="10" fill="var(--showcase-card-bg)" stroke="var(--showcase-card-border)" strokeWidth="1" />
        <text x="14" y="24" fill="var(--showcase-text-muted)" fontSize="11" fontFamily="monospace" fontWeight="700">ENTERPRISE DATA</text>
        <g transform="translate(12, 34)">
          <rect x="0" y="0" width="276" height="28" rx="6" fill="var(--showcase-card-inner)" stroke="var(--cuxton-teal-mid)" strokeWidth="1" />
          <text x="12" y="19" fill="var(--showcase-text-primary)" fontSize="12" fontWeight="700">POLICY_v4.PDF</text>
          <text x="264" y="19" fill="var(--cuxton-teal-text)" fontSize="10" fontFamily="monospace" textAnchor="end">CHUNK #184-B</text>
        </g>
        <g transform="translate(12, 68)">
          <rect x="0" y="0" width="276" height="28" rx="6" fill="var(--showcase-card-inner)" stroke="var(--showcase-card-border)" strokeWidth="1" />
          <text x="12" y="19" fill="var(--showcase-text-secondary)" fontSize="12" fontWeight="600">ERP_ACCOUNTS</text>
          <text x="264" y="19" fill="var(--showcase-text-muted)" fontSize="10" fontFamily="monospace" textAnchor="end">SQL REVENUE</text>
        </g>
        <g transform="translate(12, 102)">
          <rect x="0" y="0" width="276" height="28" rx="6" fill="var(--showcase-card-inner)" stroke="var(--showcase-card-border)" strokeWidth="1" />
          <text x="12" y="19" fill="var(--showcase-text-secondary)" fontSize="12" fontWeight="600">CONFLUENCE</text>
          <text x="264" y="19" fill="var(--showcase-text-muted)" fontSize="10" fontFamily="monospace" textAnchor="end">PROCEDURES</text>
        </g>
      </g>
      <path d="M170 146V168" stroke="var(--cuxton-teal-mid)" strokeWidth="1.8" className={styles.animFlow} />

      {/* Vector mesh */}
      <g transform="translate(20, 168)">
        <rect x="0" y="0" width="300" height="106" rx="10" fill="var(--showcase-canvas-bg)" stroke="var(--cuxton-teal)" strokeWidth="1.2" />
        <text x="14" y="24" fill="var(--cuxton-teal-text)" fontSize="11" fontFamily="monospace" fontWeight="700">VECTOR EMBEDDING MESH</text>
        <path d="M45 56L150 64M255 50L150 64M75 86L150 64M240 88L150 64" stroke="rgba(var(--cuxton-teal-mid-rgb), 0.35)" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="45" cy="56" r="5" fill="var(--cuxton-teal-mid)" />
        <circle cx="255" cy="50" r="4.5" fill="rgba(var(--cuxton-teal-mid-rgb), 0.5)" />
        <circle cx="75" cy="86" r="4" fill="rgba(var(--cuxton-teal-mid-rgb), 0.5)" />
        <circle cx="240" cy="88" r="4.5" fill="var(--cuxton-teal-mid)" />
        <circle cx="150" cy="64" r="8" fill="var(--cuxton-amber)" className={styles.animHalo} />
        <rect x="104" y="76" width="130" height="22" rx="4" fill="var(--showcase-card-bg)" stroke="var(--cuxton-amber)" strokeWidth="1" />
        <text x="114" y="91" fill="var(--cuxton-amber)" fontSize="11" fontFamily="monospace" fontWeight="700">SIMILARITY: 0.94</text>
      </g>
      <path d="M170 274V296" stroke="var(--cuxton-amber)" strokeWidth="1.8" className={styles.animFlow} />

      {/* Grounded answer */}
      <g transform="translate(20, 296)">
        <rect x="0" y="0" width="300" height="110" rx="10" fill="var(--showcase-card-bg)" stroke="var(--cuxton-amber)" strokeWidth="1.2" />
        <text x="14" y="24" fill="var(--cuxton-amber)" fontSize="11" fontFamily="monospace" fontWeight="700">VERIFIED ANSWER</text>
        <rect x="14" y="34" width="200" height="7" rx="2" fill="var(--showcase-text-primary)" opacity="0.8" />
        <rect x="14" y="47" width="258" height="6" rx="2" fill="var(--showcase-text-secondary)" opacity="0.5" />
        <rect x="14" y="59" width="220" height="6" rx="2" fill="var(--showcase-text-secondary)" opacity="0.5" />
        <rect x="14" y="74" width="126" height="22" rx="4" fill="rgba(var(--cuxton-teal-mid-rgb), 0.18)" stroke="var(--cuxton-teal-mid)" strokeWidth="1" />
        <text x="23" y="89" fill="var(--cuxton-teal-text)" fontSize="10" fontFamily="monospace" fontWeight="700">✓ 100% GROUNDED</text>
        <rect x="150" y="74" width="136" height="22" rx="4" fill="var(--showcase-card-inner)" stroke="rgba(245,166,35,0.45)" strokeWidth="1" />
        <text x="159" y="89" fill="var(--cuxton-amber)" fontSize="10" fontFamily="monospace" fontWeight="700">POLICY_v4.PDF p12</text>
      </g>
    </svg>
  );
}

/* 3. WORKFLOW AUTOMATION — agent pipeline over an audit ledger */
function WorkflowAutomationMobile() {
  return (
    <svg className={styles.svgMobile} viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(20, 14)">
        <rect x="0" y="0" width="300" height="62" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.5" />
        <circle cx="34" cy="31" r="16" fill="rgba(var(--cuxton-teal-mid-rgb), 0.15)" />
        <path d="M27 31l5 5 9-10" stroke="var(--cuxton-teal-mid)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="64" y="27" fill="var(--showcase-text-primary)" fontSize="13" fontWeight="700">AGENT 01</text>
        <text x="64" y="47" fill="var(--cuxton-teal-text)" fontSize="11" fontFamily="monospace">EVENT INGESTION</text>
      </g>
      <path d="M54 76V92" stroke="var(--cuxton-teal-mid)" strokeWidth="2" className={styles.animFlow} />

      <g transform="translate(20, 92)">
        <rect x="0" y="0" width="300" height="62" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.5" />
        <circle cx="34" cy="31" r="16" fill="rgba(var(--cuxton-teal-mid-rgb), 0.15)" />
        <path d="M26 31h16M34 23v16" stroke="var(--cuxton-teal-mid)" strokeWidth="2.2" strokeLinecap="round" />
        <text x="64" y="27" fill="var(--showcase-text-primary)" fontSize="13" fontWeight="700">AGENT 02</text>
        <text x="64" y="47" fill="var(--cuxton-teal-text)" fontSize="11" fontFamily="monospace">REASONING &amp; POLICY</text>
      </g>
      <path d="M54 154V170" stroke="var(--cuxton-teal-mid)" strokeWidth="2" className={styles.animFlow} />

      <g transform="translate(20, 170)">
        <rect x="0" y="0" width="300" height="62" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-amber)" strokeWidth="1.5" />
        <circle cx="34" cy="31" r="16" fill="rgba(245,166,35,0.15)" />
        <rect x="27" y="24" width="15" height="14" rx="2" stroke="var(--cuxton-amber)" strokeWidth="1.8" />
        <text x="64" y="27" fill="var(--showcase-text-primary)" fontSize="13" fontWeight="700">TOOL BUS</text>
        <text x="64" y="47" fill="var(--cuxton-amber)" fontSize="11" fontFamily="monospace">DETERMINISTIC API</text>
      </g>
      <path d="M54 232V248" stroke="var(--cuxton-amber)" strokeWidth="2" className={styles.animFlow} />

      <g transform="translate(20, 248)">
        <rect x="0" y="0" width="300" height="62" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.5" />
        <circle cx="34" cy="31" r="16" fill="rgba(var(--cuxton-teal-mid-rgb), 0.15)" />
        <path d="M28 27a6 6 0 1 1 12 0 6 6 0 0 1-12 0m-2 13a8 8 0 0 1 16 0" stroke="var(--cuxton-teal-mid)" strokeWidth="1.8" strokeLinecap="round" />
        <text x="64" y="27" fill="var(--showcase-text-primary)" fontSize="13" fontWeight="700">HUMAN GATE</text>
        <text x="64" y="47" fill="var(--cuxton-teal-text)" fontSize="11" fontFamily="monospace">APPROVAL REQUIRED</text>
      </g>
      <path d="M54 310V328" stroke="var(--cuxton-teal-mid)" strokeWidth="2" className={styles.animFlow} />

      {/* Immutable ledger */}
      <g transform="translate(20, 328)">
        <rect x="0" y="0" width="300" height="78" rx="6" fill="var(--showcase-card-inner)" stroke="var(--showcase-card-border)" />
        <text x="14" y="23" fill="var(--showcase-text-muted)" fontSize="10" fontFamily="monospace">IMMUTABLE LOG // SHA-256</text>
        <text x="14" y="46" fill="var(--cuxton-teal-text)" fontSize="12" fontFamily="monospace" fontWeight="700">TX#8491: COMPLETED</text>
        <text x="14" y="66" fill="var(--showcase-text-muted)" fontSize="10.5" fontFamily="monospace">DISPATCHED TO ERP • 284ms</text>
        <circle cx="280" cy="19" r="4.5" fill="var(--cuxton-amber)" />
      </g>
    </svg>
  );
}

/* 4. ROLE-SPECIFIC — one core, three scoped lenses */
function RoleSpecificMobile() {
  return (
    <svg className={styles.svgMobile} viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Orchestrator core */}
      <g transform="translate(90, 12)">
        <rect x="0" y="0" width="160" height="74" rx="10" fill="var(--showcase-card-bg)" stroke="var(--cuxton-amber)" strokeWidth="1.5" />
        <circle cx="80" cy="26" r="15" fill="rgba(245,166,35,0.15)" />
        <path d="M73 26h14M80 19v14" stroke="var(--cuxton-amber)" strokeWidth="2" strokeLinecap="round" />
        <text x="80" y="56" fill="var(--showcase-text-primary)" fontSize="13" fontWeight="700" textAnchor="middle">ROLE CORE</text>
        <text x="80" y="69" fill="var(--cuxton-amber)" fontSize="10" fontFamily="monospace" textAnchor="middle">ORCHESTRATOR</text>
      </g>

      {/* Distribution spine */}
      <path d="M170 86v14H36v256" stroke="var(--cuxton-teal-mid)" strokeWidth="1.4" className={styles.animFlow} />
      <path d="M36 150h12M36 252h12M36 354h12" stroke="var(--cuxton-teal-mid)" strokeWidth="1.4" className={styles.animFlow} />

      <g transform="translate(48, 104)">
        <rect x="0" y="0" width="272" height="92" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.4" />
        <rect x="10" y="10" width="252" height="24" rx="4" fill="var(--showcase-card-inner)" />
        <text x="20" y="27" fill="var(--cuxton-teal-text)" fontSize="12" fontWeight="700">LEGAL COUNSEL</text>
        <text x="12" y="53" fill="var(--showcase-text-secondary)" fontSize="11">• Regulatory redlining</text>
        <text x="12" y="70" fill="var(--showcase-text-secondary)" fontSize="11">• Risk clause triage</text>
        <text x="12" y="85" fill="var(--cuxton-amber)" fontSize="10" fontFamily="monospace">SCOPE: PRIVILEGED</text>
      </g>

      <g transform="translate(48, 206)">
        <rect x="0" y="0" width="272" height="92" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.4" />
        <rect x="10" y="10" width="252" height="24" rx="4" fill="var(--showcase-card-inner)" />
        <text x="20" y="27" fill="var(--cuxton-teal-text)" fontSize="12" fontWeight="700">RISK &amp; UNDERWRITING</text>
        <text x="12" y="53" fill="var(--showcase-text-secondary)" fontSize="11">• Portfolio stress-tests</text>
        <text x="12" y="70" fill="var(--showcase-text-secondary)" fontSize="11">• Capital adequacy models</text>
        <text x="12" y="85" fill="var(--cuxton-amber)" fontSize="10" fontFamily="monospace">SCOPE: INTERNAL_FIN</text>
      </g>

      <g transform="translate(48, 308)">
        <rect x="0" y="0" width="272" height="92" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.4" />
        <rect x="10" y="10" width="252" height="24" rx="4" fill="var(--showcase-card-inner)" />
        <text x="20" y="27" fill="var(--cuxton-teal-text)" fontSize="12" fontWeight="700">OPERATIONS SPECIALIST</text>
        <text x="12" y="53" fill="var(--showcase-text-secondary)" fontSize="11">• High-volume triage</text>
        <text x="12" y="70" fill="var(--showcase-text-secondary)" fontSize="11">• Automated dispatch</text>
        <text x="12" y="85" fill="var(--cuxton-amber)" fontSize="10" fontFamily="monospace">SCOPE: OPS_TIER_2</text>
      </g>
    </svg>
  );
}

/* 5. ENTERPRISE INTEGRATION — hub between systems already in service */
function EnterpriseIntegrationMobile() {
  return (
    <svg className={styles.svgMobile} viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="152" height="66" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <text x="14" y="29" fill="var(--showcase-text-primary)" fontSize="12" fontWeight="700">SAP // ORACLE</text>
        <text x="14" y="49" fill="var(--cuxton-teal-text)" fontSize="10" fontFamily="monospace">SYSTEM OF RECORD</text>
      </g>
      <g transform="translate(174, 14)">
        <rect x="0" y="0" width="152" height="66" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <text x="14" y="29" fill="var(--showcase-text-primary)" fontSize="12" fontWeight="700">SNOWFLAKE</text>
        <text x="14" y="49" fill="var(--cuxton-teal-text)" fontSize="10" fontFamily="monospace">ENTERPRISE LAKE</text>
      </g>
      <path d="M90 80l50 68M250 80l-50 68" stroke="var(--cuxton-teal-mid)" strokeWidth="1.8" className={styles.animFlow} />

      {/* Integration hub */}
      <g transform="translate(85, 148)">
        <rect x="0" y="0" width="170" height="96" rx="12" fill="var(--showcase-card-bg)" stroke="var(--cuxton-amber)" strokeWidth="1.8" />
        <circle cx="85" cy="34" r="20" fill="rgba(245,166,35,0.15)" stroke="var(--cuxton-amber)" strokeWidth="1.2" />
        <path d="M75 34h20M85 24v20" stroke="var(--cuxton-amber)" strokeWidth="2" strokeLinecap="round" />
        <text x="85" y="73" fill="var(--showcase-text-primary)" fontSize="14" fontWeight="700" textAnchor="middle">CUXTON HUB</text>
        <text x="85" y="88" fill="var(--cuxton-teal-text)" fontSize="11" fontFamily="monospace" textAnchor="middle">NEURAL API BUS</text>
      </g>
      <path d="M140 244l-50 44M200 244l50 44" stroke="var(--cuxton-teal-mid)" strokeWidth="1.8" className={styles.animFlow} />

      <g transform="translate(14, 288)">
        <rect x="0" y="0" width="152" height="66" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <text x="14" y="29" fill="var(--showcase-text-primary)" fontSize="12" fontWeight="700">OKTA // AD SSO</text>
        <text x="14" y="49" fill="var(--cuxton-teal-text)" fontSize="10" fontFamily="monospace">IDENTITY &amp; RBAC</text>
      </g>
      <g transform="translate(174, 288)">
        <rect x="0" y="0" width="152" height="66" rx="8" fill="var(--showcase-card-bg)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <text x="14" y="29" fill="var(--showcase-text-primary)" fontSize="12" fontWeight="700">REST &amp; WEBHOOKS</text>
        <text x="14" y="49" fill="var(--cuxton-teal-text)" fontSize="10" fontFamily="monospace">LINE-OF-BUSINESS</text>
      </g>

      <text x="170" y="390" fill="var(--cuxton-amber)" fontSize="11" fontFamily="monospace" fontWeight="700" textAnchor="middle">TWO-WAY // NO LOCK-IN</text>
    </svg>
  );
}

/* 6. GOVERNANCE — the vault and what stays inside it */
function GovernanceMobile() {
  return (
    <svg className={styles.svgMobile} viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="316" height="400" rx="12" fill="var(--showcase-canvas-bg)" stroke="var(--cuxton-amber)" strokeWidth="1.5" />

      {/* Vault header */}
      <rect x="12" y="10" width="316" height="46" rx="12" fill="var(--showcase-card-bg)" stroke="var(--showcase-card-border)" strokeWidth="1" />
      <circle cx="32" cy="27" r="4.5" fill="var(--cuxton-amber)" />
      <text x="46" y="27" fill="var(--showcase-text-primary)" fontSize="12" fontFamily="monospace" fontWeight="700">SOVEREIGN ASSET VAULT</text>
      <text x="46" y="45" fill="var(--cuxton-teal-text)" fontSize="10" fontFamily="monospace">100% CLIENT PROPERTY // ON-PREM</text>

      <g transform="translate(28, 66)">
        <rect x="0" y="0" width="284" height="88" rx="8" fill="var(--showcase-card-inner)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <rect x="12" y="10" width="260" height="24" rx="4" fill="var(--showcase-card-bg)" />
        <text x="22" y="27" fill="var(--cuxton-teal-text)" fontSize="12" fontWeight="700">MODEL WEIGHTS</text>
        <text x="14" y="53" fill="var(--showcase-text-secondary)" fontSize="10.5">• Full LoRA checkpoints • v2.4.1</text>
        <text x="14" y="69" fill="var(--showcase-text-secondary)" fontSize="10.5">• SHA-256 validated</text>
        <text x="14" y="83" fill="var(--cuxton-teal-text)" fontSize="10" fontFamily="monospace" fontWeight="700">EXPORTABLE ASSET</text>
      </g>

      <g transform="translate(28, 162)">
        <rect x="0" y="0" width="284" height="88" rx="8" fill="var(--showcase-card-inner)" stroke="var(--cuxton-amber)" strokeWidth="1.2" />
        <rect x="12" y="10" width="260" height="24" rx="4" fill="var(--showcase-card-bg)" />
        <text x="22" y="27" fill="var(--cuxton-amber)" fontSize="12" fontWeight="700">INFERENCE LOGS</text>
        <text x="14" y="53" fill="var(--showcase-text-secondary)" fontSize="10.5">• Tamper-evident ledger</text>
        <text x="14" y="69" fill="var(--showcase-text-secondary)" fontSize="10.5">• Zero cloud mirroring</text>
        <text x="14" y="83" fill="var(--cuxton-amber)" fontSize="10" fontFamily="monospace" fontWeight="700">LOCAL RETENTION</text>
      </g>

      <g transform="translate(28, 258)">
        <rect x="0" y="0" width="284" height="88" rx="8" fill="var(--showcase-card-inner)" stroke="var(--cuxton-teal-mid)" strokeWidth="1.2" />
        <rect x="12" y="10" width="260" height="24" rx="4" fill="var(--showcase-card-bg)" />
        <text x="22" y="27" fill="var(--cuxton-teal-text)" fontSize="12" fontWeight="700">POLICY GUARDRAILS</text>
        <text x="14" y="53" fill="var(--showcase-text-secondary)" fontSize="10.5">• PII scrubbing • Eval tests</text>
        <text x="14" y="69" fill="var(--showcase-text-secondary)" fontSize="10.5">• Hallucination checks</text>
        <text x="14" y="83" fill="var(--cuxton-teal-text)" fontSize="10" fontFamily="monospace" fontWeight="700">SAFETY ENFORCED</text>
      </g>

      <g transform="translate(28, 356)">
        <rect x="0" y="0" width="284" height="44" rx="6" fill="var(--showcase-card-bg)" stroke="rgba(245,166,35,0.35)" />
        <text x="14" y="19" fill="var(--showcase-text-primary)" fontSize="11" fontWeight="600">ZERO VENDOR LOCK-IN</text>
        <text x="14" y="35" fill="var(--cuxton-amber)" fontSize="10.5" fontFamily="monospace" fontWeight="700">MODELS &amp; INDEXES PORTABLE</text>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */

export default function CapabilitiesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = capabilities[activeIndex];
  const total = capabilities.length;

  return (
    <div className={`${styles.showcaseWrap}`}>
      <div className={styles.header}>
        <div className={styles.headerHeading}>
          <h2 className={styles.heading}>
            What a CuxtonAI<br />deployment includes
          </h2>
        </div>
        <div className={styles.headerAside}>
          <p className={styles.headerAsideText}>
            Six core enterprise capability areas. Engagements typically commence with two or three foundational blocks
            and extend it to other teams later.
          </p>
          <div className={styles.headerCounter}>
            <span>/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Left: Interactive Tab Buttons */}
        <div className={styles.tabs} role="tablist" aria-label="Cuxton deployment capabilities">
          {capabilities.map((c, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`capability-tab-${c.id}`}
                aria-selected={isActive}
                aria-controls={`capability-panel-${c.id}`}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className={styles.tabIcon}>{c.icon}</span>
                <span className={styles.tabBody}>
                  <span className={styles.tabLabel}>{c.name}</span>
                  <span className={styles.tabTagline}>{c.tagline}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Architectural Detail Panel with Dynamic SVG */}
        <div
          className={styles.panel}
          role="tabpanel"
          id={`capability-panel-${active.id}`}
          aria-labelledby={`capability-tab-${active.id}`}
        >
          {/* Architectural Corner Marks */}
          <svg className={`${styles.corner} ${styles.cornerTl}`} viewBox="0 0 14 14" fill="none">
            <path d="M1 6V1h5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg className={`${styles.corner} ${styles.cornerTr}`} viewBox="0 0 14 14" fill="none">
            <path d="M8 1h5v5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg className={`${styles.corner} ${styles.cornerBl}`} viewBox="0 0 14 14" fill="none">
            <path d="M6 13H1V8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg className={`${styles.corner} ${styles.cornerBr}`} viewBox="0 0 14 14" fill="none">
            <path d="M13 8v5H8" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Panel Telemetry Header */}
          <div className={styles.panelTopBar}>
            <div className={styles.panelStatus}>
              <span className={styles.pulseDot} />
              <span>{active.name}</span>
            </div>
            
          </div>

          {/* Bespoke Architectural SVG Illustration.
              Both render; CSS shows exactly one, so whichever is
              display:none also stays out of the accessibility tree. */}
          <div className={styles.illustration}>
            <Illustration id={active.id} />
            <MobileIllustration id={active.id} />
          </div>

          {/* Footer Metadata & Stack Pills */}
          <div className={styles.footer}>
            <div className={styles.footerText}>
              <h3 className={styles.footerTitle}>
                <span>{active.name}</span>
                
              </h3>
              <p className={styles.footerDesc}>{active.desc}</p>
            </div>

            <div className={styles.footerRight}>
              <div className={styles.footerTags}>
                {active.tags.map((tag) => (
                  <div key={tag} className={styles.footerTag}>
                    <span className={styles.footerTagDot} />
                    {tag}
                  </div>
                ))}
              </div>

              <Link href={active.ctaLink} className={styles.actionLink}>
                <span>{active.ctaText}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
