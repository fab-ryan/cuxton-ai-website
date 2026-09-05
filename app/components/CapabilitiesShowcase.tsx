"use client";

import { useState } from "react";
import styles from "./CapabilitiesShowcase.module.css";

const capabilities = [
  {
    id: "private-ai",
    name: "Private AI deployment",
    tagline: "Installed and hardened in your environment.",
    desc: "Installation, configuration and hardening inside your controlled environment, through to production go-live.",
    tags: ["Model selection", "Infrastructure sizing", "Security hardening", "Isolated patterns"],
    illustration: "stack" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" />
      </svg>
    ),
  },
  {
    id: "knowledge-grounded",
    name: "Knowledge-grounded AI",
    tagline: "Answers with the source attached.",
    desc: "Systems that answer from your documents and institutional knowledge, with the source attached to the answer.",
    tags: ["Internal corpora", "Structured and unstructured", "Source attribution"],
    illustration: "docs" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: "workflow-automation",
    name: "Secure workflow automation",
    tagline: "Scoped agents, with a record of what they did.",
    desc: "Agents that carry out defined internal processes within explicit boundaries, with a record of what they did.",
    tags: ["Scoped agents", "Process assistance", "Action logging"],
    illustration: "chain" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "role-specific",
    name: "Role-specific assistants",
    tagline: "Built around a role, not a chat box.",
    desc: "Interfaces shaped around a role rather than a general chat box — the vocabulary, the tasks and the permissions of that job.",
    tags: ["Per-role scoping", "Departmental workflows", "Domain vocabulary"],
    illustration: "orbit" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "enterprise-integration",
    name: "Enterprise integration",
    tagline: "Into the systems already in service.",
    desc: "Connection into the applications, data platforms and business workflows already in service.",
    tags: ["Systems of record", "Identity and access", "Existing data platforms"],
    illustration: "hub" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: "governance",
    name: "Ownership and governance",
    tagline: "Prompts, logs and models stay yours.",
    desc: "Prompts, logs, indexes, models and AI assets remain organisational property, held where your policies say they should be.",
    tags: ["Prompt and log ownership", "Model version control", "Retention under your policy", "Exportable AI assets"],
    illustration: "rows" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function Illustration({ variant }: { variant: (typeof capabilities)[number]["illustration"] }) {
  if (variant === "stack") {
    return (
      <div className={styles.illustrationInner}>
        {[0, 1, 2].map(i => (
          <div key={i} className={`${styles.illusRow} ${i === 1 ? styles.illusRowActive : ""}`}>
            <div className={styles.illusRowDot} />
            <div className={styles.illusRowBar} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "rows") {
    return (
      <div className={styles.illustrationInner}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className={`${styles.illusRow} ${i === 1 ? styles.illusRowActive : ""}`}>
            <div className={styles.illusRowDot} />
            <div className={styles.illusRowBar} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "docs") {
    return (
      <div className={styles.illusDocs}>
        <div className={styles.illusDocsStack}>
          <div className={`${styles.illusDoc} ${styles.illusDocBack}`} />
          <div className={styles.illusDoc} />
        </div>
        <svg className={styles.illusDocsGraph} width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M20 60 L60 40 M60 40 L100 20 M60 40 L60 90 M60 90 L95 100" stroke="rgba(27,107,138,0.3)" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="20" cy="60" r="3" fill="rgba(27,107,138,0.5)" />
          <circle cx="60" cy="40" r="3" fill="rgba(27,107,138,0.5)" />
          <circle cx="60" cy="90" r="3" fill="rgba(27,107,138,0.5)" />
          <circle cx="100" cy="20" r="5" fill="var(--cuxton-amber)" />
          <circle cx="95" cy="100" r="3" fill="rgba(27,107,138,0.5)" />
        </svg>
      </div>
    );
  }

  if (variant === "chain") {
    return (
      <div className={styles.illustrationInner}>
        <div className={styles.illusNodeChain}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && <div className={styles.illusNodeLine} />}
              <div className={`${styles.illusNode} ${i === 1 ? styles.illusNodeActive : ""}`}>
                <div className={styles.illusNodeDot} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "orbit") {
    return (
      <div className={styles.illusOrbit}>
        <div className={styles.illusOrbitRing} />
        <div className={`${styles.illusOrbitRing} ${styles.illusOrbitRingInner}`} />
        <div className={styles.illusOrbitCore} />
        <div className={styles.illusOrbitDot} style={{ top: -4, left: "50%" }} />
        <div className={styles.illusOrbitDot} style={{ top: 24, right: -4 }} />
      </div>
    );
  }

  // hub
  return (
    <div className={styles.illusHub}>
      <div className={styles.illusHubInputs}>
        {[0, 1, 2].map(i => <div key={i} className={styles.illusHubInput} />)}
      </div>
      <div className={styles.illusHubLines}>
        {[0, 1, 2].map(i => <div key={i} className={styles.illusHubLine} />)}
      </div>
      <div className={styles.illusHubCore}>
        <div className={styles.illusHubCoreDot} />
      </div>
    </div>
  );
}

export default function CapabilitiesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = capabilities[activeIndex];
  const total = capabilities.length;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerHeading}>
          <div className="section-label">Our Solutions</div>
          <h2 className="section-heading">What a Cuxton<br />deployment includes</h2>
        </div>
        <div className={styles.headerAside}>
          <p className={styles.headerAsideText}>
            Six capability areas. Engagements normally begin with two or three and extend from there.
          </p>
          <p className={styles.headerCounter}>{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</p>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.tabs} role="tablist" aria-label="Cuxton deployment capabilities">
          {capabilities.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`capability-tab-${c.id}`}
              aria-selected={i === activeIndex}
              aria-controls={`capability-panel-${c.id}`}
              className={`${styles.tab} ${i === activeIndex ? styles.tabActive : ""}`}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <span className={styles.tabIcon}>{c.icon}</span>
              <span>
                <span className={styles.tabLabel}>{c.name}</span>
                {i === activeIndex && <span className={styles.tabTagline}>{c.tagline}</span>}
              </span>
            </button>
          ))}
        </div>

        <div
          className={styles.panel}
          role="tabpanel"
          id={`capability-panel-${active.id}`}
          aria-labelledby={`capability-tab-${active.id}`}
        >
          <svg className={`${styles.corner} ${styles.cornerTl}`} viewBox="0 0 14 14" fill="none"><path d="M1 6V1h5" stroke="currentColor" strokeWidth="1.5" /></svg>
          <svg className={`${styles.corner} ${styles.cornerTr}`} viewBox="0 0 14 14" fill="none"><path d="M8 1h5v5" stroke="currentColor" strokeWidth="1.5" /></svg>
          <svg className={`${styles.corner} ${styles.cornerBl}`} viewBox="0 0 14 14" fill="none"><path d="M6 13H1V8" stroke="currentColor" strokeWidth="1.5" /></svg>
          <svg className={`${styles.corner} ${styles.cornerBr}`} viewBox="0 0 14 14" fill="none"><path d="M13 8v5H8" stroke="currentColor" strokeWidth="1.5" /></svg>

          <div className={styles.illustration}>
            <Illustration variant={active.illustration} />
          </div>

          <div className={styles.footer}>
            <div className={styles.footerText}>
              <p className={styles.footerTitle}>{active.name}</p>
              <p className={styles.footerDesc}>{active.desc}</p>
            </div>
            <div className={styles.footerTags}>
              {active.tags.map(tag => (
                <div key={tag} className={styles.footerTag}>
                  <span className={styles.footerTagDot} />
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
