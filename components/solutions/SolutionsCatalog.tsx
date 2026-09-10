"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Solution } from "@/data/solutions";
import styles from "./SolutionsCatalog.module.css";


const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const SOLUTION_ICONS: Record<string, React.ReactElement> = {
  strategy: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2.5 2.5-2.5 2.5 2.5-2.5 2.5-2.5z" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  "private-ai": (
    <svg {...iconProps}>
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 1 1 8 0v4" />
    </svg>
  ),
  knowledge: (
    <svg {...iconProps}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  agents: (
    <svg {...iconProps}>
      <rect x="5" y="7" width="14" height="12" rx="2" />
      <path d="M9 7V4h6v3" />
      <circle cx="9.5" cy="13" r="1" />
      <circle cx="14.5" cy="13" r="1" />
      <path d="M9 17h6" />
    </svg>
  ),
  automation: (
    <svg {...iconProps}>
      <circle cx="5" cy="6" r="2.25" />
      <circle cx="19" cy="6" r="2.25" />
      <circle cx="12" cy="18" r="2.25" />
      <path d="M7 7.5 10.2 16M17 7.5 13.8 16" />
    </svg>
  ),
  integration: (
    <svg {...iconProps}>
      <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  ),
  custom: (
    <svg {...iconProps}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  ),
  realtime: (
    <svg {...iconProps}>
      <polyline points="21 12 17 12 14 20 9 4 6 12 2 12" />
    </svg>
  ),
  training: (
    <svg {...iconProps}>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
};

const PILLARS = [
  {
    id: "all",
    label: "All Solutions",
    count: 9,
  },
  {
    id: "strategy-governance",
    label: "Strategy & Governance",
    count: 2,
    eyebrow: "Strategic Foundations",
    title: "AI Strategy, Governance & Workforce Readiness",
    tagline: "Establish clear value, feasibility, and safe operational guidelines before deploying production code.",
    solutionIds: ["strategy", "training"],
  },
  {
    id: "infrastructure-privacy",
    label: "Infrastructure",
    count: 2,
    eyebrow: "Security",
    title: "Private Enclaves & Native Enterprise Integration",
    tagline: "Deploy secure, network-isolated compute environments that guarantee client data never trains external models.",
    solutionIds: ["private-ai", "integration"],
  },
  {
    id: "agents-automation",
    label: "Agents & Automation",
    count: 2,
    eyebrow: "Operational Execution",
    title: "Autonomous Agents & Multi-Step Workflow Pipelines",
    tagline: "Hand repetitive processes to agents that stop for a person-in-the-loop oversight.",
    solutionIds: ["agents", "automation"],
  },
  {
    id: "knowledge-intelligence",
    label: "Knowledge & Intelligence",
    count: 3,
    eyebrow: "Institutional Intelligence",
    title: "Knowledge-Grounded Systems & Live Analytics",
    tagline: "Transform unstructured internal archives and high-velocity operational telemetry into verified decisions.",
    solutionIds: ["knowledge", "realtime", "custom"],
  },
];

interface SolutionsCatalogProps {
  solutions: Solution[];
}

export default function SolutionsCatalog({ solutions }: SolutionsCatalogProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const activePillars = useMemo(() => {
    if (activeTab === "all") {
      return PILLARS.filter((p) => p.id !== "all");
    }
    return PILLARS.filter((p) => p.id === activeTab);
  }, [activeTab]);

  return (
    <section className={styles.catalogSection} aria-label="Cuxton AI Solutions Portfolio">
      {/* Sticky Filter Navigation Bar */}
      <div className={styles.stickyFilterNav}>
        <div className="section-container">
          <div className={styles.filterBar}>
            <div className={styles.filterPills} role="tablist" aria-label="Solution domains">
              {PILLARS.map((p) => {
                const isActive = activeTab === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ""}`}
                    onClick={() => setActiveTab(p.id)}
                  >
                    <span>{p.label}</span>
                    <span className={styles.filterPillCount}>{p.count}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.catalogStats}>
              <span className={styles.catalogStatsDot} aria-hidden="true" />
              <span>&amp; Enterprise-Ready Architecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Grouped by Strategic Pillar */}
      <div className="section-container">
        {activePillars.map((pillar) => {
          const pillarSolutions = (pillar.solutionIds || [])
            .map((id) => solutions.find((s) => s.id === id))
            .filter((s): s is Solution => Boolean(s));

          const pillarIndex = PILLARS.findIndex((p) => p.id === pillar.id);
          const accent = pillarIndex % 2 === 0 ? "" : styles.accentAmber;

          return (
            <div key={pillar.id} className={styles.pillarGroup}>
              {/* Pillar Header Banner */}
              <div className={styles.pillarHeader}>
                <div className={styles.pillarEyebrow}>
                  <span className={styles.pillarEyebrowDot} aria-hidden="true" />
                  <span>{pillar.eyebrow}</span>
                </div>
                <h2 className={styles.pillarTitle}>{pillar.title}</h2>
                <p className={styles.pillarTagline}>{pillar.tagline}</p>
              </div>

              {/* Scannable Icon Grid */}
              <div className={styles.grid}>
                {pillarSolutions.map((sol) => (
                  <Link
                    key={sol.id}
                    id={sol.id}
                    href={`/solutions/${sol.id}`}
                    className={`${styles.card} ${accent}`}
                  >
                    <div className={styles.cardHead}>
                      <span className={styles.iconTile}>{SOLUTION_ICONS[sol.id]}</span>
                      <span className={styles.serial}>{sol.label}</span>
                    </div>

                    <span className={styles.tag}>{sol.tag}</span>

                    <h3 className={styles.cardTitle}>{sol.name}</h3>
                    <p className={styles.cardDesc}>{sol.headline}</p>

                    <span className={styles.cardCta}>
                      Learn more
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
