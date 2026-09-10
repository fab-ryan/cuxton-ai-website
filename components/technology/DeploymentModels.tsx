"use client";

import React, { useState, Fragment } from "react";
import Link from "next/link";
import styles from "./DeploymentModels.module.css";

/* ─── Model SVG Schematics ───────────────────────────────────────── */

const OnPremiseSchematic = () => (
  <svg viewBox="0 0 540 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.schematicSvg}>
    <defs>
      <filter id="glow-onprem" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Client Physical Boundary Perimeter */}
    <rect x="20" y="30" width="410" height="290" rx="12" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" strokeDasharray="4 4" fill="rgba(27,107,138,0.05)" />
    <text x="36" y="55" fill="var(--cuxton-teal-light)" fontSize="11.5" fontWeight="700" letterSpacing="0.08em" fontFamily="monospace">
      CLIENT PERIMETER (PHYSICAL AIR-GAP)
    </text>

    {/* Internal Enterprise Sources */}
    <rect x="42" y="80" width="118" height="210" rx="10" fill="#16222e" stroke="rgba(27,107,138,0.32)" strokeWidth="1" />
    <circle cx="101" cy="132" r="24" fill="rgba(27,107,138,0.16)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" filter="url(#glow-onprem)" />
    <path d="M92 132h18M101 123v18" stroke="var(--cuxton-teal-light)" strokeWidth="2" strokeLinecap="round" />
    <text x="101" y="177" fill="#e8edf5" fontSize="11.5" fontWeight="750" textAnchor="middle">Local Data</text>
    <text x="101" y="194" fill="rgba(232,237,245,0.5)" fontSize="9.5" textAnchor="middle">DBs · ERP · Docs</text>
    <line x1="60" y1="212" x2="142" y2="212" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />
    <text x="101" y="234" fill="var(--cuxton-amber)" fontSize="9" fontWeight="750" textAnchor="middle">0% Remote Sync</text>

    {/* Internal Direct Fiber Bus */}
    <line x1="160" y1="185" x2="212" y2="185" className={styles.flowLine} stroke="var(--cuxton-teal-light)" strokeWidth="2" />
    <polygon points="210,181 219,185 210,189" fill="var(--cuxton-teal-light)" />

    {/* Bare-Metal Private AI Enclave */}
    <rect x="222" y="62" width="222" height="248" rx="12" fill="#1c2a37" stroke="var(--cuxton-teal)" strokeWidth="1.5" />
    <rect x="238" y="80" width="190" height="32" rx="6" fill="rgba(27,107,138,0.22)" stroke="rgba(var(--cuxton-teal-mid-rgb), 0.32)" />
    <circle cx="253" cy="96" r="4.5" fill="var(--cuxton-teal-mid)" className={styles.pulseDot} filter="url(#glow-onprem)" />
    <text x="265" y="101" fill="#ffffff" fontSize="10.5" fontWeight="750">Bare-Metal GPU Server Enclave</text>

    {/* Compute Specs */}
    <text x="238" y="142" fill="#e8edf5" fontSize="11" fontWeight="650">✓ Private Model Weights</text>
    <text x="238" y="166" fill="#e8edf5" fontSize="11" fontWeight="650">✓ Local Vector Embeddings</text>
    <text x="238" y="190" fill="#e8edf5" fontSize="11" fontWeight="650">✓ Internal TLS 1.3 Routing</text>
    <line x1="238" y1="232" x2="428" y2="232" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />
    <text x="238" y="255" fill="var(--cuxton-teal-light)" fontSize="9.5" fontFamily="monospace">STATUS: ZERO TELEMETRY</text>

    {/* Blocked Public Egress Boundary */}
    <rect x="462" y="30" width="72" height="290" rx="12" fill="rgba(245,166,35,0.05)" stroke="rgba(245,166,35,0.35)" strokeWidth="1" />
    <line x1="444" y1="205" x2="466" y2="205" className={styles.flowLineAmber} stroke="rgba(245,166,35,0.65)" strokeWidth="1.5" />
    <circle cx="498" cy="168" r="21" fill="rgba(245,166,35,0.15)" stroke="var(--cuxton-amber)" strokeWidth="1.5" filter="url(#glow-onprem)" />
    <path d="M490 160l16 16M506 160l-16 16" stroke="var(--cuxton-amber)" strokeWidth="2" strokeLinecap="round" />
    <text x="498" y="208" fill="var(--cuxton-amber)" fontSize="10" fontWeight="600" textAnchor="middle">EGRESS</text>
    <text x="498" y="224" fill="var(--cuxton-amber)" fontSize="10" fontWeight="600" textAnchor="middle">BLOCKED</text>
    <text x="498" y="250" fill="rgba(232,237,245,0.5)" fontSize="8.5" textAnchor="middle">No Internet</text>
  </svg>
);

const PrivateCloudSchematic = () => (
  <svg viewBox="0 0 540 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.schematicSvg}>
    <defs>
      <filter id="glow-privatecloud" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Enterprise Origin */}
    <rect x="20" y="68" width="140" height="210" rx="10" fill="#16222e" stroke="rgba(27,107,138,0.32)" strokeWidth="1" />
    <rect x="34" y="84" width="112" height="30" rx="5" fill="rgba(27,107,138,0.2)" />
    <text x="90" y="104" fill="#e8edf5" fontSize="11" fontWeight="750" textAnchor="middle">Client Infrastructure</text>
    <text x="90" y="144" fill="rgba(232,237,245,0.65)" fontSize="9.5" textAnchor="middle">Internal Core Apps</text>
    <text x="90" y="163" fill="rgba(232,237,245,0.65)" fontSize="9.5" textAnchor="middle">Identity &amp; Okta / AD</text>
    <rect x="34" y="228" width="112" height="28" rx="5" fill="rgba(var(--cuxton-teal-mid-rgb), 0.14)" stroke="rgba(var(--cuxton-teal-mid-rgb), 0.32)" />
    <text x="90" y="246" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="750" textAnchor="middle">No Public IP</text>

    {/* Dedicated PrivateLink Conduit */}
    <rect x="180" y="140" width="130" height="62" rx="8" fill="#1c2a37" stroke="var(--cuxton-teal-light)" strokeWidth="1.2" />
    <circle cx="245" cy="160" r="3.5" fill="var(--cuxton-teal-light)" className={styles.pulseDot} filter="url(#glow-privatecloud)" />
    <text x="245" y="177" fill="#ffffff" fontSize="9.5" fontWeight="750" textAnchor="middle">AWS PrivateLink</text>
    <text x="245" y="191" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="700" textAnchor="middle">Encrypted Dedicated Tunnel</text>

    <line x1="160" y1="171" x2="178" y2="171" className={styles.flowLine} stroke="var(--cuxton-teal-light)" strokeWidth="2" />
    <line x1="310" y1="171" x2="328" y2="171" className={styles.flowLine} stroke="var(--cuxton-teal-light)" strokeWidth="2" />
    <polygon points="326,167 335,171 326,175" fill="var(--cuxton-teal-light)" />

    {/* Dedicated VPC Perimeter */}
    <rect x="330" y="30" width="190" height="290" rx="12" stroke="var(--cuxton-teal)" strokeWidth="1.5" strokeDasharray="4 4" fill="rgba(27,107,138,0.06)" />
    <text x="345" y="54" fill="var(--cuxton-teal-light)" fontSize="9.5" fontWeight="750" letterSpacing="0.05em" fontFamily="monospace">
      DEDICATED SINGLE-TENANT VPC
    </text>

    {/* Compute Stack inside VPC */}
    <rect x="345" y="72" width="160" height="80" rx="8" fill="#16222e" stroke="rgba(var(--cuxton-teal-mid-rgb), 0.35)" />
    <text x="358" y="94" fill="#ffffff" fontSize="10.5" fontWeight="750">Isolated Inference</text>
    <text x="358" y="111" fill="rgba(232,237,245,0.7)" fontSize="9">Dedicated GPUs (H100/A100)</text>
    <text x="358" y="127" fill="rgba(232,237,245,0.7)" fontSize="9">Zero Shared Host</text>
    <text x="358" y="144" fill="var(--cuxton-teal-light)" fontSize="8" fontFamily="monospace">Non-Training Contract Enforced</text>

    {/* Vector DB inside VPC */}
    <rect x="345" y="164" width="160" height="80" rx="8" fill="#1c2a37" stroke="rgba(27,107,138,0.32)" />
    <text x="358" y="186" fill="var(--cuxton-amber)" fontSize="10.5" fontWeight="750">Dedicated Vector Mesh</text>
    <text x="358" y="205" fill="rgba(232,237,245,0.65)" fontSize="9">Encrypted at rest (CMK)</text>
    <text x="358" y="222" fill="rgba(232,237,245,0.45)" fontSize="8">SOC 2 Type II · ISO 27001</text>
    <text x="358" y="238" fill="rgba(232,237,245,0.45)" fontSize="8">Aligned</text>

    <line x1="345" y1="262" x2="505" y2="262" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />
    <text x="345" y="284" fill="var(--cuxton-teal-light)" fontSize="9" fontFamily="monospace">ZERO CROSS-TENANT ACCESS</text>
  </svg>
);

const IsolatedTenancySchematic = () => (
  <svg viewBox="0 0 540 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.schematicSvg}>
    <defs>
      <filter id="glow-isolated" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Regional Boundary */}
    <rect x="20" y="30" width="500" height="290" rx="12" stroke="rgba(27,107,138,0.4)" strokeWidth="1.2" strokeDasharray="3 3" fill="rgba(22, 34, 46,0.4)" />
    <text x="36" y="55" fill="var(--cuxton-teal-light)" fontSize="10.5" fontWeight="750" letterSpacing="0.06em" fontFamily="monospace">
      CLOUD REGION (EU / UK / US)
    </text>

    {/* Compartment Isolation Box */}
    <rect x="40" y="72" width="300" height="210" rx="10" fill="#16222e" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
    <rect x="56" y="88" width="268" height="32" rx="6" fill="rgba(27,107,138,0.22)" />
    <text x="190" y="109" fill="#ffffff" fontSize="11" fontWeight="750" textAnchor="middle">Tenant Isolated IAM Compartment</text>

    <text x="56" y="150" fill="#e8edf5" fontSize="10.5" fontWeight="650">✓ Cryptographic Hardware Separation</text>
    <text x="56" y="174" fill="#e8edf5" fontSize="10.5" fontWeight="650">✓ Tenant-Specific Encryption Enclaves</text>
    <text x="56" y="198" fill="#e8edf5" fontSize="10.5" fontWeight="650">✓ Immutable Telemetry &amp; Access Logs</text>
    <line x1="56" y1="222" x2="324" y2="222" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />
    <text x="56" y="246" fill="var(--cuxton-teal-light)" fontSize="9.5" fontFamily="monospace">RESIDENCY: GUARANTEED SOVEREIGN</text>

    <line x1="340" y1="177" x2="362" y2="177" className={styles.flowLineAmber} stroke="rgba(245,166,35,0.65)" strokeWidth="1.5" />

    {/* Egress Gate & Filter */}
    <rect x="365" y="72" width="140" height="210" rx="10" fill="#1c2a37" stroke="rgba(245,166,35,0.4)" strokeWidth="1" />
    <circle cx="435" cy="118" r="21" fill="rgba(245,166,35,0.15)" stroke="var(--cuxton-amber)" strokeWidth="1.5" filter="url(#glow-isolated)" />
    <path d="M427 118l5.5 5.5L444 111" stroke="var(--cuxton-amber)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="435" y="162" fill="var(--cuxton-amber)" fontSize="10.5" fontWeight="750" textAnchor="middle">Strict Egress</text>
    <text x="435" y="178" fill="var(--cuxton-amber)" fontSize="10.5" fontWeight="750" textAnchor="middle">Allowlist</text>
    <text x="435" y="204" fill="rgba(232,237,245,0.6)" fontSize="9" textAnchor="middle">Pre-Approved</text>
    <text x="435" y="219" fill="rgba(232,237,245,0.6)" fontSize="9" textAnchor="middle">IP Endpoints</text>
    <text x="435" y="246" fill="rgba(232,237,245,0.4)" fontSize="8" textAnchor="middle">Anomalies Auto-Terminated</text>
  </svg>
);

const HybridSchematic = () => (
  <svg viewBox="0 0 540 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.schematicSvg}>
    <defs>
      <filter id="glow-hybrid" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Tier 1: On-Premise Core Vault */}
    <rect x="20" y="30" width="230" height="290" rx="10" fill="#16222e" stroke="var(--cuxton-amber)" strokeWidth="1.2" strokeDasharray="3 3" />
    <rect x="36" y="46" width="198" height="30" rx="5" fill="rgba(245,166,35,0.15)" stroke="rgba(245,166,35,0.3)" />
    <text x="135" y="66" fill="var(--cuxton-amber)" fontSize="10.5" fontWeight="750" textAnchor="middle">Tier 1: On-Premise Core Vault</text>
    <text x="36" y="108" fill="#ffffff" fontSize="10.5" fontWeight="700">Highest Sensitivity Data</text>
    <text x="36" y="130" fill="rgba(232,237,245,0.7)" fontSize="9.5">• Core Banking &amp; Patient Records</text>
    <text x="36" y="150" fill="rgba(232,237,245,0.7)" fontSize="9.5">• Proprietary Risk Models</text>
    <line x1="36" y1="174" x2="234" y2="174" stroke="rgba(245,166,35,0.2)" strokeWidth="1" />
    <text x="36" y="198" fill="var(--cuxton-amber)" fontSize="9.5" fontWeight="750">EXECUTES LOCALLY ONLY</text>
    <text x="36" y="216" fill="rgba(232,237,245,0.45)" fontSize="8.5">Zero external transmission</text>

    {/* Dynamic Classification Router in Middle */}
    <rect x="272" y="110" width="90" height="120" rx="8" fill="#1c2a37" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
    <circle cx="317" cy="140" r="4" fill="var(--cuxton-teal-light)" className={styles.pulseDot} filter="url(#glow-hybrid)" />
    <text x="317" y="163" fill="#ffffff" fontSize="9.5" fontWeight="600" textAnchor="middle">DYNAMIC</text>
    <text x="317" y="180" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700" textAnchor="middle">POLICY</text>
    <text x="317" y="196" fill="var(--cuxton-teal-light)" fontSize="9" fontWeight="700" textAnchor="middle">ROUTER</text>
    <line x1="250" y1="170" x2="270" y2="170" className={styles.flowLine} stroke="var(--cuxton-teal-light)" strokeWidth="2" />
    <line x1="362" y1="170" x2="382" y2="170" className={styles.flowLine} stroke="var(--cuxton-teal-light)" strokeWidth="2" />
    <polygon points="380,166 389,170 380,174" fill="var(--cuxton-teal-light)" />

    {/* Tier 2: Dedicated Cloud Elastic Enclave */}
    <rect x="384" y="30" width="136" height="290" rx="10" fill="#16222e" stroke="var(--cuxton-teal)" strokeWidth="1.2" strokeDasharray="3 3" />
    <rect x="397" y="46" width="110" height="30" rx="5" fill="rgba(27,107,138,0.2)" stroke="rgba(var(--cuxton-teal-mid-rgb), 0.3)" />
    <text x="452" y="66" fill="var(--cuxton-teal-light)" fontSize="9.5" fontWeight="750" textAnchor="middle">Tier 2: Dedicated Cloud</text>
    <text x="397" y="108" fill="#ffffff" fontSize="10" fontWeight="700">Elastic Scale Tasks</text>
    <text x="397" y="130" fill="rgba(232,237,245,0.7)" fontSize="8.5">• Sanitized Summaries</text>
    <text x="397" y="148" fill="rgba(232,237,245,0.7)" fontSize="8.5">• High-Volume Web</text>
    <text x="397" y="163" fill="rgba(232,237,245,0.7)" fontSize="8.5">  Research</text>
    <line x1="397" y1="186" x2="507" y2="186" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />
    <text x="397" y="207" fill="var(--cuxton-teal-light)" fontSize="8.5" fontWeight="700">AUTO-SCALING</text>
    <text x="397" y="222" fill="var(--cuxton-teal-light)" fontSize="8.5" fontWeight="700">COMPUTE</text>
    <text x="397" y="244" fill="rgba(232,237,245,0.45)" fontSize="8">Cost-optimized throughput</text>
  </svg>
);

/* ─── Selector / Telemetry Icons ─────────────────────────────────── */

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ModelIcons: Record<string, React.ReactElement> = {
  "on-premise": (
    <svg {...iconProps}>
      <rect x="2" y="3" width="20" height="8" rx="2" />
      <rect x="2" y="13" width="20" height="8" rx="2" />
      <path d="M6 7h.01M6 17h.01" />
    </svg>
  ),
  "private-cloud": (
    <svg {...iconProps}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  "isolated-tenancy": (
    <svg {...iconProps}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  hybrid: (
    <svg {...iconProps}>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </svg>
  ),
};

const EgressIcon = () => (
  <svg {...iconProps} width={18} height={18}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const ComputeIcon = () => (
  <svg {...iconProps} width={18} height={18}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>
);

const ComplianceIcon = () => (
  <svg {...iconProps} width={18} height={18}>
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const HardwareIcon = () => (
  <svg {...iconProps} width={17} height={17}>
    <rect x="2" y="3" width="20" height="8" rx="2" />
    <rect x="2" y="13" width="20" height="8" rx="2" />
    <path d="M6 7h.01M6 17h.01" />
  </svg>
);

const VelocityIcon = () => (
  <svg {...iconProps} width={17} height={17}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

const ManagementIcon = () => (
  <svg {...iconProps} width={17} height={17}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PrecedentIcon = () => (
  <svg {...iconProps} width={17} height={17}>
    <path d="M3 21h18M4 21V9l8-5 8 5v12M9 21V13h6v8" />
  </svg>
);

/* ─── Model Configurations ───────────────────────────────────────── */

export interface DeploymentModel {
  id: string;
  n: string;
  name: string;
  tag: string;
  controlRating: string;
  targetProfile: string;
  summary: string;
  telemetry: {
    dataEgress: string;
    hardware: string;
    isolation: string;
    compliance: string;
  };
  advantages: string[];
  tradeoff: string;
  schematic: React.ReactElement;
}

export const deploymentModels: DeploymentModel[] = [
  {
    id: "on-premise",
    n: "01",
    name: "On-Premise Bare-Metal",
    tag: "Physical Air-Gap",
    controlRating: "Full control",
    targetProfile: "National Defense, Central Banks, Intelligence, Sovereign Wealth & Critical Infrastructure",
    summary:
      "AI infrastructure runs entirely inside your physical datacenter on client-owned appliances. Prompts, retrieval documents, and weights never cross your facility's network boundary.",
    telemetry: {
      dataEgress: "0% External Egress",
      hardware: "Client Bare-Metal",
      isolation: "Physical Air-Gap",
      compliance: "Statutory / Defense Standard",
    },
    advantages: [
      "Guarantees that no external entity can inspect, intercept, or train upon institutional prompts",
      "Full compatibility with statutory national security air-gapping mandates",
      "Direct hardware optimization against existing on-premise compute and storage fabrics",
    ],
    tradeoff:
      "Requires internal hardware procurement, physical space, power, cooling, and on-site hardware maintenance management.",
    schematic: <OnPremiseSchematic />,
  },
  {
    id: "private-cloud",
    n: "02",
    name: "Dedicated Private Cloud",
    tag: "Single-Tenant VPC",
    controlRating: "Dedicated Cloud Perimeter",
    targetProfile: "Global Asset Managers, Tier-1 Banks, Healthcare Networks & Regulated Enterprises",
    summary:
      "Isolated Virtual Private Cloud (VPC) provisioned exclusively for your organization. Compute runs on dedicated host instances connected via private fiber (PrivateLink / DirectConnect) with zero public exposure.",
    telemetry: {
      dataEgress: "PrivateLink / DirectConnect",
      hardware: "Single-Tenant Dedicated",
      isolation: "Cryptographic VPC Boundary",
      compliance: "SOC 2 Type II / ISO 27001",
    },
    advantages: [
      "Immediate elasticity and access to GPU scale without physical hardware procurement lead times",
      "Cryptographic network isolation ensuring zero co-mingling with other cloud tenants",
      "Pre-vetted Data Processing Agreements (DPAs) enforcing zero data retention and no model training",
    ],
    tradeoff:
      "Relies on cloud provider's underlying physical infrastructure SLAs while keeping logical governance client-controlled.",
    schematic: <PrivateCloudSchematic />,
  },
  {
    id: "isolated-tenancy",
    n: "03",
    name: "Isolated Tenancy",
    tag: "Region",
    controlRating: "Region-Gated Tenancy",
    targetProfile: "Regulated Regional Enterprises, Public Sector Entities & Cloud Adopters",
    summary:
      "Hardened, network-isolated compartments operating within approved geopolitical cloud regions, backed by dedicated IAM roles, residency guarantees, and continuous egress monitoring.",
    telemetry: {
      dataEgress: "Strict Allowlist Only",
      hardware: "Dedicated Instance Enclave",
      isolation: "Compartment-Level IAM",
      compliance: "EU GDPR / Mandates",
    },
    advantages: [
      "Guaranteed geopolitical data residency matching strict regional statutory compliance rules",
      "Significantly lower infrastructure management overhead compared to dedicated physical hardware",
      "Deterministic egress allowlisting preventing data leakage to unauthorized endpoints",
    ],
    tradeoff:
      "Requires automated continuous logging and audited boundary checks for moderately sensitive operational workflows.",
    schematic: <IsolatedTenancySchematic />,
  },
  {
    id: "hybrid",
    n: "04",
    name: "Hybrid Architecture",
    tag: "Policy-Enforced Routing",
    controlRating: "Multi-Tier Dynamic",
    targetProfile: "Large Distributed Enterprises, Insurance Groups & Organizations with Mixed Data Tiers",
    summary:
      "Confidential core assets (PII, secret IP, trading logic) stay strictly in on-premise enclaves, while sanitized, high-volume workloads intelligently burst to dedicated cloud compute via an automated classification gateway.",
    telemetry: {
      dataEgress: "Policy-Enforced Routing",
      hardware: "Split On-Prem + Cloud",
      isolation: "Multi-Tier Gateway",
      compliance: "Dynamic Enterprise Policy",
    },
    advantages: [
      "Optimizes compute expenditure by routing low-sensitivity queries to cost-effective elastic cloud instances",
      "Guarantees ultra-strict on-premise custody for high-risk proprietary documents and core records",
      "Enables a smooth, phased modernization roadmap without all-or-nothing infrastructure commitments",
    ],
    tradeoff:
      "Requires automated data classification policies and disciplined multi-environment gateway governance.",
    schematic: <HybridSchematic />,
  },
];

/* ─── Extra Dimension & Feature Icons ───────────────────────────── */

const ShieldCategoryIcon = () => (
  <svg {...iconProps} width={16} height={16}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ComputeCategoryIcon = () => (
  <svg {...iconProps} width={16} height={16}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>
);

const GovernanceCategoryIcon = () => (
  <svg {...iconProps} width={16} height={16}>
    <path d="M3 21h18M4 21V9l8-5 8 5v12M9 21V13h6v8" />
  </svg>
);

const KeyIcon = () => (
  <svg {...iconProps} width={17} height={17}>
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6M15.5 7.5l3 3M18.5 4.5l3 3" />
  </svg>
);

const PerimeterIcon = () => (
  <svg {...iconProps} width={17} height={17}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const ElasticityIcon = () => (
  <svg {...iconProps} width={17} height={17}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

/* ─── Categorized Architecture Matrix Schema ────────────────────── */

interface MatrixCell {
  primary: string;
  detail: string;
  badgeType: "amber" | "teal" | "neutral";
}

interface MatrixRow {
  feature: string;
  subtitle: string;
  icon: React.ReactElement;
  values: Record<string, MatrixCell>;
}

interface MatrixCategory {
  id: string;
  title: string;
  tag: string;
  icon: React.ReactElement;
  rows: MatrixRow[];
}

const MATRIX_CATEGORIES: MatrixCategory[] = [
  {
    id: "custody",
    title: "Data Custody & Boundary Protection",
    tag: "Security Perimeter",
    icon: <ShieldCategoryIcon />,
    rows: [
      {
        feature: "Data Residency & Egress",
        subtitle: "External network boundary & outbound traffic",
        icon: <EgressIcon />,
        values: {
          "on-premise": {
            primary: "0% External Egress",
            detail: "Physical air-gap, No outbound network route",
            badgeType: "amber",
          },
          "private-cloud": {
            primary: "Zero Public IP",
            detail: "AWS PrivateLink / Azure ExpressRoute",
            badgeType: "teal",
          },
          "isolated-tenancy": {
            primary: "Strict Allowlist",
            detail: "Pre-approved endpoints only",
            badgeType: "teal",
          },
          hybrid: {
            primary: "Policy-Enforced",
            detail: "Confidential data stays strictly on-premise",
            badgeType: "neutral",
          },
        },
      },
      {
        feature: "Cryptographic Key Custody",
        subtitle: "HSM storage & customer key control",
        icon: <KeyIcon />,
        values: {
          "on-premise": {
            primary: "Client Hardware HSM",
            detail: "Physical on-site key custody & audit",
            badgeType: "amber",
          },
          "private-cloud": {
            primary: "Customer-Managed Keys",
            detail: "KMS with zero cloud vendor access",
            badgeType: "teal",
          },
          "isolated-tenancy": {
            primary: "Tenant Enclave Keys",
            detail: "Regional cryptographic partition",
            badgeType: "teal",
          },
          hybrid: {
            primary: "Dual Key Rings",
            detail: "Split on-premise and cloud KMS vaults",
            badgeType: "neutral",
          },
        },
      },
      {
        feature: "Perimeter Isolation Tier",
        subtitle: "Compute containment & tenancy model",
        icon: <PerimeterIcon />,
        values: {
          "on-premise": {
            primary: "Physical Air-Gap",
            detail: "Isolated bare-metal rack enclosure",
            badgeType: "amber",
          },
          "private-cloud": {
            primary: "Single-Tenant VPC",
            detail: "Dedicated hosts with zero co-tenancy",
            badgeType: "teal",
          },
          "isolated-tenancy": {
            primary: "Compartment",
            detail: "Geopolitically region-gated IAM perimeter",
            badgeType: "teal",
          },
          hybrid: {
            primary: "Dynamic Policy Router",
            detail: "Real-time query sensitivity classification",
            badgeType: "neutral",
          },
        },
      },
    ],
  },
  {
    id: "velocity",
    title: "Velocity & Compute Execution",
    tag: "Infrastructure Scale",
    icon: <ComputeCategoryIcon />,
    rows: [
      {
        feature: "Deployment Velocity",
        subtitle: "Time to verified production readiness",
        icon: <VelocityIcon />,
        values: {
          "on-premise": {
            primary: "4–8 Weeks",
            detail: "Hardware procurement, racking & burn-in",
            badgeType: "neutral",
          },
          "private-cloud": {
            primary: "1–2 Weeks",
            detail: "Automated dedicated VPC & GPU provisioning",
            badgeType: "teal",
          },
          "isolated-tenancy": {
            primary: "3–5 Days",
            detail: "Rapid launch in cloud regions",
            badgeType: "amber",
          },
          hybrid: {
            primary: "2–4 Weeks",
            detail: "Phased perimeter & gateway integration",
            badgeType: "neutral",
          },
        },
      },
      {
        feature: "Hardware & GPU Model",
        subtitle: "Physical server & accelerator ownership",
        icon: <HardwareIcon />,
        values: {
          "on-premise": {
            primary: "Client Bare-Metal",
            detail: "Owned internal H100 / A100 clusters",
            badgeType: "amber",
          },
          "private-cloud": {
            primary: "Dedicated Cloud Hosts",
            detail: "Single-tenant cloud GPU instances",
            badgeType: "teal",
          },
          "isolated-tenancy": {
            primary: "Hardened VM Enclave",
            detail: "High-assurance tenant-isolated instances",
            badgeType: "teal",
          },
          hybrid: {
            primary: "Split Architecture",
            detail: "On-premise core + cloud burst GPUs",
            badgeType: "neutral",
          },
        },
      },
      {
        feature: "Elastic Scaling Capacity",
        subtitle: "Throughput adaptation for peak batch tasks",
        icon: <ElasticityIcon />,
        values: {
          "on-premise": {
            primary: "Fixed Capacity",
            detail: "Bounded by installed physical nodes",
            badgeType: "neutral",
          },
          "private-cloud": {
            primary: "Elastic On-Demand",
            detail: "Scales on-demand within dedicated VPC",
            badgeType: "teal",
          },
          "isolated-tenancy": {
            primary: "Managed Elasticity",
            detail: "Provider-backed auto-scaling tiers",
            badgeType: "teal",
          },
          hybrid: {
            primary: "Dynamic Cloud Burst",
            detail: "Sanitized overflow to private cloud",
            badgeType: "neutral",
          },
        },
      },
    ],
  },
  {
    id: "governance",
    title: "Governance & Institutional Precedents",
    tag: "Compliance & Ops",
    icon: <GovernanceCategoryIcon />,
    rows: [
      {
        feature: "Operational Responsibility",
        subtitle: "Day-to-day infrastructure administration",
        icon: <ManagementIcon />,
        values: {
          "on-premise": {
            primary: "Client Datacenter Team",
            detail: "Internal engineering oversees hardware",
            badgeType: "neutral",
          },
          "private-cloud": {
            primary: "Managed Cloud SLA",
            detail: "Hardware managed, governance client-held",
            badgeType: "teal",
          },
          "isolated-tenancy": {
            primary: "Cloud Provider Managed",
            detail: "Continuous uptime & security patch SLAs",
            badgeType: "teal",
          },
          hybrid: {
            primary: "Joint Orchestration",
            detail: "Client owns core, cloud provider for burst",
            badgeType: "neutral",
          },
        },
      },
      {
        feature: "Institutional Precedents",
        subtitle: "Typical regulatory approval benchmark",
        icon: <PrecedentIcon />,
        values: {
          "on-premise": {
            primary: "Defense & Central Banks",
            detail: "National security & statutory mandates",
            badgeType: "amber",
          },
          "private-cloud": {
            primary: "Tier-1 Asset Managers",
            detail: "SOC 2 Type II / ISO 27001 regulated",
            badgeType: "teal",
          },
          "isolated-tenancy": {
            primary: "Public Sector",
            detail: "Regional statutory & GDPR mandates",
            badgeType: "teal",
          },
          hybrid: {
            primary: "Fortune 500 Enterprises",
            detail: "Phased multi-division modernization",
            badgeType: "neutral",
          },
        },
      },
    ],
  },
];

/* ─── Component Implementation ───────────────────────────────────── */

export default function DeploymentModels() {
  const [activeId, setActiveId] = useState<string>("on-premise");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const currentModel = deploymentModels.find((m) => m.id === activeId) || deploymentModels[0];

  const visibleCategories =
    selectedCategory === "all"
      ? MATRIX_CATEGORIES
      : MATRIX_CATEGORIES.filter((c) => c.id === selectedCategory);

  const totalMetricsCount = MATRIX_CATEGORIES.reduce((acc, c) => acc + c.rows.length, 0);

  return (
    <section className={styles.section} id="deployment-models" aria-labelledby="deployment-heading">
      <div className={styles.blueprintBgGrid} aria-hidden="true" />

      <div className="section py-16 lg:py-24 max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left ">
        {/* Section Header */}
        <div className={styles.header}>
          <h2 id="deployment-heading" className={styles.title}>
            Choose the Infrastructure Boundary Your Organisation Can Approve.
          </h2>
          <p className={styles.subtitle}>
            Enterprise AI cannot rely on public black-box endpoints. Explore the 4 deployment postures engineered
            around your data sensitivity, network boundaries, and statutory regulatory requirements.
          </p>
        </div>

        {/* Approachable 4-Station Selector Bar */}
        <div className={styles.selectorBarWrapper} role="tablist" aria-label="Deployment topology selector">
          <div className={styles.selectorBar}>
            {deploymentModels.map((model) => {
              const isActive = model.id === activeId;
              return (
                <button
                  key={model.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.selectorTab} ${isActive ? styles.selectorTabActive : ""}`}
                  onClick={() => setActiveId(model.id)}
                >
                  <div className={styles.tabIcon}>{ModelIcons[model.id]}</div>
                  <div className={styles.tabTextGroup}>
                    <span className={styles.tabSerial}>{model.tag}</span>
                    <span className={styles.tabTitle}>{model.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Console: Blueprint Stage & Briefing Deck */}
        <div className={styles.console}>
          {/* Console Header Status Bar */}
          <div className={styles.consoleStatusBar}>
            <div className={styles.statusLeft}>
              <span className={styles.activeBadge}>
                <span className={styles.activeDot} />
                TOPOLOGY {currentModel.n} ACTIVE
              </span>
              <span className={styles.activePostName}>{currentModel.name}</span>
            </div>
            <div className={styles.statusRight}>
              <span className={styles.statusMetric}>
                Control Level: <strong>{currentModel.controlRating}</strong>
              </span>
              <span className={styles.statusMetric}>
                Boundary: <strong>{currentModel.telemetry.isolation}</strong>
              </span>
            </div>
          </div>

          {/* Console Body Split */}
          <div className={styles.consoleBody}>
            {/* Left: Architectural Schematic Canvas */}
            <div className={styles.blueprintStage}>
              <div className={styles.schematicBlock}>
                <div className={styles.schematicHeader}>
                  <p className={styles.schematicTitle}>Architectural Flow Schematic</p>
                  <p className={styles.schematicSub}>
                    Verified network isolation, data custody boundaries, and external egress barriers.
                  </p>
                </div>

                <div className={styles.svgCanvasWrap}>
                  {currentModel.schematic}
                </div>
              </div>

              {/* Diagram Legend */}
              <div className={styles.legendRow}>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.legendDotTeal}`} />
                  Verified boundary
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.legendDotAmber}`} />
                  Restricted / blocked
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.legendDotPulse}`} />
                  Live status signal
                </span>
              </div>

              {/* 3 Telemetry HUD Dials */}
              <div className={styles.telemetryGrid}>
                <div className={styles.telemetryCard}>
                  <span className={styles.telemetryIcon}><EgressIcon /></span>
                  <div className={styles.telemetryTextGroup}>
                    <span className={styles.telemetryLabel}>Data Egress</span>
                    <span className={styles.telemetryVal}>{currentModel.telemetry.dataEgress}</span>
                  </div>
                </div>
                <div className={styles.telemetryCard}>
                  <span className={styles.telemetryIcon}><ComputeIcon /></span>
                  <div className={styles.telemetryTextGroup}>
                    <span className={styles.telemetryLabel}>Compute Location</span>
                    <span className={styles.telemetryVal}>{currentModel.telemetry.hardware}</span>
                  </div>
                </div>
                <div className={styles.telemetryCard}>
                  <span className={styles.telemetryIcon}><ComplianceIcon /></span>
                  <div className={styles.telemetryTextGroup}>
                    <span className={styles.telemetryLabel}>Compliance Alignment</span>
                    <span className={styles.telemetryVal}>{currentModel.telemetry.compliance}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Executive Briefing & Decision Deck */}
            <div className={styles.briefingStage}>
              <div>
                <div className={styles.briefingHeader}>
                  <span className={styles.postureTagline}>{currentModel.tag}</span>
                  <h3 className={styles.postureName}>{currentModel.name}</h3>
                  <p className={styles.postureDesc}>{currentModel.summary}</p>
                </div>

                {/* Institutional Profile Callout */}
                <div className={styles.profileCallout}>
                  <span className={styles.profileBadge}>Target Environment:</span>
                  <p className={styles.profileText}>{currentModel.targetProfile}</p>
                </div>

                {/* Advantages Checklist */}
                <ul className={styles.advantageList}>
                  {currentModel.advantages.map((adv) => (
                    <li key={adv} className={styles.advantageItem}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--cuxton-teal-light)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.checkIcon}
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>

                {/* Operational Trade-off */}
                <div className={styles.tradeoffBox}>
                  <h4 className={styles.tradeoffTitle}>Governance &amp; Operations Reality</h4>
                  <p className={styles.tradeoffText}>{currentModel.tradeoff}</p>
                </div>
              </div>

              {/* Action Buttons */}
              {/* <div className={styles.briefingFooter}>
                <Link href={`/contact?deployment=${currentModel.id}`} className={styles.primaryAction}>
                  <span>Assess {currentModel.name} Feasibility</span></Link>
                <Link href="/solutions#private-ai" className={styles.secondaryAction}>
                  <span>Explore Solutions</span>
                </Link>
              </div> */}
            </div>
          </div>
        </div>

        {/* Comparative Architecture Matrix (Categorized & Actionable) */}
        <div className={styles.matrixContainer}>
          <div className={styles.matrixHeader}>
            <div>
              <h3 className={styles.matrixTitle}>Architecture &amp; Governance Matrix</h3>
              <p className={styles.matrixSub}>
                How the options compare on perimeter defence, hardware velocity, and statutory approvals.
              </p>
            </div>
            <span className={styles.matrixHint}>Click any column to spotlight that architecture
            </span>
          </div>

          {/* Quick-Filter Pills for Dimensions */}
          <div className={styles.matrixFilterBar} role="tablist" aria-label="Matrix dimension filter">
            <button
              type="button"
              className={`${styles.matrixFilterBtn} ${selectedCategory === "all" ? styles.matrixFilterActive : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              <span>All Dimensions ({totalMetricsCount})</span>
            </button>
            {MATRIX_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${styles.matrixFilterBtn} ${selectedCategory === cat.id ? styles.matrixFilterActive : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.icon}
                <span>{cat.title} ({cat.rows.length})</span>
              </button>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}
