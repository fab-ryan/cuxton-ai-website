"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./GovernanceFramework.module.css";

/* ─── Vector SVG Icons (Zero Emojis) ─────────────────────────────── */

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const HumanOversightIcon = () => (
  <svg {...iconProps}>
    <path d="M16 21v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v2a4 4 0 0 0 3 3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="m9 15 2 2 4 4" />
  </svg>
);

const AuditIcon = () => (
  <svg {...iconProps}>
    <path d="M14 2H6a2 2 0 0 0 2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2 2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const PermissionIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" />
  </svg>
);

const ChangeManagementIcon = () => (
  <svg {...iconProps}>
    <path d="M21.5 2v6h6M21.34 15.57a10 10 0 1 1-.57 8.38l5.67 5.67" />
  </svg>
);

const DefinedScopeIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="3" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="21" />
    <line x1="3" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="21" y2="12" />
  </svg>
);

const MonitoringIcon = () => (
  <svg {...iconProps}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg {...iconProps} width={18} height={18}>
    <path d="M12 22s8 4 8 10V5l8 3 8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ─── Governance Tenets Data (Zero Hyphens in Copy) ──────────────── */

interface GovernanceTenet {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  extendedDetail: string;
  operationalSafeguard: string;
  icon: React.ReactNode;
}

const GOVERNANCE_TENETS: GovernanceTenet[] = [
  {
    id: "oversight",
    index: "01",
    title: "Human Oversight Authority",
    category: "Executive Command",
    summary: "Consequential actions remain with authorized personnel. AI prepares and recommends while humans decide.",
    extendedDetail: "High consequence operational actions incorporate mandatory human authorization checkpoints. System proposals must receive explicit human confirmation before executing financial transactions or record mutations.",
    operationalSafeguard: "Configurable approval thresholds mandate two person authorization for operations exceeding institutional risk parameters.",
    icon: <HumanOversightIcon />,
  },
  {
    id: "audit",
    index: "02",
    title: "Cryptographic Audit Registry",
    category: "Immutable Attribution",
    summary: "Full telemetry logs, retrieval citations, and inference traces recorded for complete regulatory accountability.",
    extendedDetail: "Every user prompt, vector database retrieval path, model version identifier, and workflow response is permanently preserved with cryptographic hash signatures for external compliance inspection.",
    operationalSafeguard: "Write once read many audit bus guarantees non repudiation and tamper evident event histories.",
    icon: <AuditIcon />,
  },
  {
    id: "permission",
    index: "03",
    title: "Permission Context Inheritance",
    category: "Access Boundary",
    summary: "Retrieval pipelines dynamically inherit the requesting user established Active Directory and LDAP permissions.",
    extendedDetail: "AI models cannot bypass institutional access hierarchies. If an employee lacks credentials to inspect a confidential file, the AI retrieval engine strictly filters that document from inference context.",
    operationalSafeguard: "Row level security and attribute based access control filters execute before data reaches the model context window.",
    icon: <PermissionIcon />,
  },
  {
    id: "change",
    index: "04",
    title: "Deterministic Change Control",
    category: "Release Governance",
    summary: "Model weight revisions, prompt updates, and data integrations undergo regression verification before release.",
    extendedDetail: "Uncontrolled model updates risk hallucination drift and schema deviation. All model promotions follow strict change management protocols including synthetic evaluation suites and security scans.",
    operationalSafeguard: "Automated regression pipelines verify semantic consistency and output schema compliance prior to production deployment.",
    icon: <ChangeManagementIcon />,
  },
  {
    id: "scope",
    index: "05",
    title: "Bounded Operational Scope",
    category: "Execution Sandboxing",
    summary: "Each system operates within explicit task boundaries with zero unauthorized privilege elevation.",
    extendedDetail: "Autonomous agent capabilities are strictly confined to predefined interfaces. Systems cannot access unapproved toolkits, execute arbitrary shell commands, or expand their mandate without authorization.",
    operationalSafeguard: "Containerized runtime enclaves isolate model execution from core enterprise network zones.",
    icon: <DefinedScopeIcon />,
  },
  {
    id: "monitoring",
    index: "06",
    title: "Continuous Drift Telemetry",
    category: "Real Time Observability",
    summary: "Continuous evaluation of inference accuracy, retrieval latency, and anomalous queries informs maintenance.",
    extendedDetail: "Automated observation layers analyze production requests for hallucination markers, confidence decay, distribution drift, and unusual token consumption patterns.",
    operationalSafeguard: "Anomaly triggers automatically route suspicious requests to human security review queues.",
    icon: <MonitoringIcon />,
  },
];

/* ─── Main Component ──────────────────────────────────────────────── */

export default function GovernanceFramework() {
  const [activeTenetId, setActiveTenetId] = useState<string>("oversight");

  const activeTenet = GOVERNANCE_TENETS.find((t) => t.id === activeTenetId) || GOVERNANCE_TENETS[0];

  return (
    <section className={styles.section} id="governance" aria-labelledby="governance-heading">
      {/* High Definition Governance Background Image */}
      <div className={styles.bgImage} aria-hidden="true" />
      {/* Solid Architectural Wash Overlay (NO linear gradient) */}
      <div className={styles.washOverlay} aria-hidden="true" />

      <div className="section py-16 lg:py-24 max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <header className={styles.header}>
          <h2 id="governance-heading" className={styles.heading}>
            Governance principles <br />
            <span className={styles.headingAccent}>engineered into every deployment.</span>
          </h2>
          <p className={styles.lead}>
            AI governance is not an afterthought. It is enforced at the network, model, and application boundary before any system processes institutional information.
          </p>
        </header>

        {/* Dual Column Console */}
        <div className={styles.consoleGrid}>
          {/* Left Column: Six Core Governance Tenets */}
          <div className={styles.tenetsGrid} role="tablist" aria-label="Governance tenets selection">
            {GOVERNANCE_TENETS.map((tenet) => {
              const isActive = tenet.id === activeTenetId;
              return (
                <button
                  key={tenet.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTenetId(tenet.id)}
                  className={`${styles.tenetCard} ${isActive ? styles.tenetCardActive : ""}`}
                >
                  <div className={styles.tenetTop}>
                    <div className={styles.tenetIconBox}>{tenet.icon}</div>
                  </div>
                  <h3 className={styles.tenetTitle}>{tenet.title}</h3>
                  <p className={styles.tenetDesc}>{tenet.summary}</p>
                  <div className={styles.tenetFooter}>
                    <span className={styles.tenetBadge}>{tenet.category}</span>
                    {isActive && <span className={styles.activeIndicatorDot} aria-hidden="true" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Verification & Audit Inspection Console */}
          <aside className={styles.inspectorCard} aria-labelledby="inspector-title">
            <div className={styles.inspectorHeader}>
              <div className={styles.inspectorTitleGroup}>
                <span className={styles.inspectorTitleIcon}><ShieldCheckIcon /></span>
                <span id="inspector-title" className={styles.inspectorTitleText}>Boundary Verification HUD</span>
              </div>
              <div className={styles.statusPillVerified}>
                <span className={styles.statusLiveDot} aria-hidden="true" />
                <span>STATUS: VERIFIED</span>
              </div>
            </div>

            {/* Active Tenet Focus Callout */}
            <div className={styles.focusBox}>
              <div className={styles.focusLabel}>Active Inspection Focus</div>
              <h4 className={styles.focusTitle}>{activeTenet.title}</h4>
              <p className={styles.focusStatement}>{activeTenet.extendedDetail}</p>
            </div>

            {/* Three Strict Inspection Boundaries */}
            <div className={styles.boundariesHeader}>Three Tier Boundary Controls</div>
            <div className={styles.boundariesList}>
              <div className={styles.boundaryItem}>
                <span className={styles.boundaryCheckIcon}><ShieldCheckIcon /></span>
                <div className={styles.boundaryTextGroup}>
                  <span className={styles.boundaryName}>Input Ingestion Boundary</span>
                  <span className={styles.boundaryDetail}>
                    Automated PII masking, credential redaction, and prompt injection defense prior to processing.
                  </span>
                </div>
              </div>

              <div className={styles.boundaryItem}>
                <span className={styles.boundaryCheckIcon}><ShieldCheckIcon /></span>
                <div className={styles.boundaryTextGroup}>
                  <span className={styles.boundaryName}>Execution Enclave Boundary</span>
                  <span className={styles.boundaryDetail}>
                    Hardware memory sanitization, air gapped weights, and zero external telemetry persistence.
                  </span>
                </div>
              </div>

              <div className={styles.boundaryItem}>
                <span className={styles.boundaryCheckIcon}><ShieldCheckIcon /></span>
                <div className={styles.boundaryTextGroup}>
                  <span className={styles.boundaryName}>Output Delivery Boundary</span>
                  <span className={styles.boundaryDetail}>
                    Deterministic JSON schema validation, secondary verifier models, and immutable audit logging.
                  </span>
                </div>
              </div>
            </div>

            {/* Framework Alignment Badges (Zero Emojis, Zero Hyphens) */}
            <div className={styles.frameworksRow}>
              <span className={styles.frameworksLabel}>Frameworks:</span>
              <span className={styles.frameworkBadge}>SOC 2 Type II</span>
              <span className={styles.frameworkBadge}>ISO 27001</span>
              <span className={styles.frameworkBadge}>EU AI Act</span>
              <span className={styles.frameworkBadge}>HIPAA</span>
            </div>

            {/* Action CTA */}
            <Link href="/contact?topic=governance" className={styles.actionBtn}>
              <span>Review Governance Architecture</span>
              <ArrowRightIcon />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
