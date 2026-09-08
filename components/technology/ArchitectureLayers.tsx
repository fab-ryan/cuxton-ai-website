import Link from "next/link";
import styles from "./ArchitectureLayers.module.css";

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

const IdentityIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10.5" r="2.5" />
    <path d="M5.5 16.5c.65-1.8 2-2.7 3.5-2.7s2.85.9 3.5 2.7" />
    <path d="M15.5 9.5h3M15.5 13.5h3" />
  </svg>
);

const DataIcon = () => (
  <svg {...iconProps}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </svg>
);

const ComputeIcon = () => (
  <svg {...iconProps}>
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </svg>
);

const ApplicationIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const CheckShieldIcon = () => (
  <svg {...iconProps} width={14} height={14} strokeWidth={2.25}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg {...iconProps} width={14} height={14} strokeWidth={2.25}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ExchangeIcon = () => (
  <svg {...iconProps} width={13} height={13} strokeWidth={2}>
    <path d="M8 3 4 7l4 4M4 7h16M16 13l4 4-4 4M20 17H4" />
  </svg>
);

export const architectureLayers = [
  {
    n: "01",
    plane: "control",
    icon: <IdentityIcon />,
    tagline: "Identity & Boundary",
    controlTier: "RBAC & ABAC Enforced",
    title: "Institutional Systems & Identity Management",
    desc: "Integrates directly with your existing enterprise infrastructure, single sign-on (SSO), directory services, and network boundaries. AI systems respect established access hierarchies rather than overriding them, ensuring no unauthorized privilege elevation.",
    components: ["Active Directory / LDAP", "SAML 2.0 & OIDC", "Network DMZ", "Immutable Audit Bus"],
    iface: "Identity context & ACLs propagate",
  },
  {
    n: "02",
    plane: "control",
    icon: <DataIcon />,
    tagline: "Zero Cache Leakage",
    controlTier: "Native ACL Filtering",
    title: "Controlled Data & Knowledge Mesh",
    desc: "Connects operational databases, document repositories, and institutional knowledge lakes through secure, permission-aware retrieval pipelines. Data remains encrypted within approved boundaries, and retrieval strictly enforces user-level access rights.",
    components: ["Enterprise Vector Indexes", "Document Permissions Filter", "Row-Level DB Security", "Zero-Retention Caching"],
    iface: "Permission-filtered retrieval only",
  },
  {
    n: "03",
    plane: "execution",
    icon: <ComputeIcon />,
    tagline: "Air-Gapped & Sovereign",
    controlTier: "Hardware-Level Boundary",
    title: "Sovereign AI Compute Tier",
    desc: "Executes approved open-weight models, customized architectures, or private API endpoints within isolated compute enclaves. Cuxton configures compute location based on your latency, regulatory residency, and data sensitivity requirements.",
    components: ["Dedicated GPU Clusters", "Hardware Air-Gapping", "Model Routing Gateway", "Real-Time Guardrail Filters"],
    iface: "Guardrailed inference & tool calls",
  },
  {
    n: "04",
    plane: "execution",
    icon: <ApplicationIcon />,
    tagline: "Human-in-the-Loop",
    controlTier: "Bounded Scope",
    title: "Specialized AI Applications & Agent Swarms",
    desc: "Task-bounded agents, analytical assistants, and automation pipelines presented through approved internal interfaces, existing tools, or bespoke front-ends. High-consequence actions incorporate mandatory human approval gates.",
    components: ["Human Oversight Gates", "Agent Orchestration Mesh", "Internal Enterprise Portals", "REST & GraphQL APIs"],
    iface: null,
  },
];

const planes = [
  {
    id: "control",
    label: "Institutional Control Plane",
    note: "Where access is defined and enforced",
  },
  {
    id: "execution",
    label: "AI Execution Plane",
    note: "Where models run and work gets done",
  },
];

const guarantees = [
  {
    title: "Native IAM & RBAC Inheritance",
    desc: "AI queries dynamically inherit the requesting user's security context. If a user cannot access a file directly, the AI model cannot access it either.",
  },
  {
    title: "Zero Privilege Escalation",
    desc: "Strict logical barriers prevent model outputs or prompt injections from escalating system permissions beyond pre-approved scopes.",
  },
  {
    title: "Cryptographic Attribution & Audit",
    desc: "Every prompt, vector retrieval path, model decision, and workflow action is recorded with full auditability for continuous compliance.",
  },
];

export default function ArchitectureLayers() {
  return (
    <section className={styles.section} id="architecture" aria-labelledby="architecture-heading">
      {/* High-definition architectural render backdrop */}
      <div className={styles.bgImage} aria-hidden="true" />
      {/* Dark wash overlay for high contrast and pristine legibility */}
      <div className={styles.bgOverlay} aria-hidden="true" />
      {/* Precision CAD blueprint vector coordinate grid */}
      <div className={styles.bgPattern} aria-hidden="true" />

      <div className={`section py-16 max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left ${styles.content}`}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className="section-label">Layered Control Plane</span>
          </div>
          <h2 id="architecture-heading" className={styles.heading}>
            A layered architecture that maintains control at every level.
          </h2>
          <p className={styles.lead}>
            Every layer  from data connectivity to autonomous agent execution  is engineered with the
            organisation&apos;s governance requirements in mind. AI does not bypass security boundaries,
            compromise data sovereignty, or override institutional permissions.
          </p>
        </div>

        {/* Governance Boundary enclosing the full stack */}
        <div className={styles.boundary}>
          <div className={styles.boundaryLabel}>
            <span className={styles.boundaryDot} aria-hidden="true" />
            <span>Governance Boundary</span>
            <span className={styles.boundaryNote}>Policy &amp; audit enforced at every layer</span>
          </div>

          {planes.map((plane) => {
            const planeLayers = architectureLayers.filter((l) => l.plane === plane.id);

            return (
              <div key={plane.id} className={`${styles.plane} ${styles[plane.id] || ""}`}>
                <div className={styles.planeHeader}>
                  <span className={styles.planeMarker} aria-hidden="true" />
                  <span className={styles.planeLabel}>{plane.label}</span>
                  <span className={styles.planeNote}>{plane.note}</span>
                  <span className={styles.planeRule} aria-hidden="true" />
                </div>

                {planeLayers.map((layer, i) => (
                  <div key={layer.n} className={styles.layerGroup}>
                    <article className={styles.layer}>
                      {/* Left rail: layer index + icon */}
                      <div className={styles.rail}>
                        <span className={styles.layerNum}>{layer.n}</span>
                        <span className={styles.layerIcon}>{layer.icon}</span>
                      </div>

                      {/* Narrative body */}
                      <div className={styles.body}>
                        <div className={styles.bodyHead}>
                          <span className={styles.tagline}>{layer.tagline}</span>
                          <span className={styles.controlBadge}>{layer.controlTier}</span>
                        </div>
                        <h3 className={styles.layerTitle}>{layer.title}</h3>
                        <p className={styles.layerDesc}>{layer.desc}</p>
                      </div>

                      {/* Modules contained in this layer */}
                      <div className={styles.modules}>
                        <span className={styles.moduleLabel}>Components</span>
                        <div className={styles.moduleGrid}>
                          {layer.components.map((c) => (
                            <span key={c} className={styles.module}>
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>

                    {/* Interface contract crossing to the next layer */}
                    {layer.iface && i < planeLayers.length - 1 && (
                      <div className={styles.connector}>
                        <span className={styles.connectorLine} aria-hidden="true" />
                        <span className={styles.connectorLabel}>
                          <ExchangeIcon />
                          {layer.iface}
                        </span>
                        <span className={styles.connectorLine} aria-hidden="true" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

          {/* Guarantees docked inside the boundary */}
          <div className={styles.guaranteeStrip}>
            {guarantees.map((g) => (
              <div key={g.title} className={styles.guaranteeItem}>
                <span className={styles.guaranteeIcon}>
                  <CheckShieldIcon />
                </span>
                <div>
                  <h4 className={styles.guaranteeTitle}>{g.title}</h4>
                  <p className={styles.guaranteeDesc}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <Link href="/contact?topic=architecture" className={styles.overviewCta}>
            <span>Discuss Your Architecture</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
