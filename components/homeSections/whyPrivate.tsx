"use client";

import Link from "next/link";
import Reveal from "../Reveal";
import s from "./whyPrivate.module.css";

export const WhyPrivateSection = () => {
  return (
    <section className={`${s.privateSection}`} id="private-ai">
      <div className={s.heroOverlay} />
      <div className={s.themeWrap}>
        <div className="container max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8">
          <div className={s.grid}>
            {/* ─── LEFT COLUMN: STRATEGY & KEY GUARANTEES ─────────────── */}
            <Reveal className={s.leftCol}>
              <h2 className={s.heading}>
                Draw the line first. Build inside it.
              </h2>
              <p className={s.bodyText}>
                If you hold financial, clinical or otherwise regulated records, the
                first question isn&apos;t which model to use. It&apos;s where that data is
                allowed to live. We start by drawing that line with you, and build
                the system inside it.
              </p>

              {/* 3 Core Security Tenets */}
              <div className={s.guarantees}>
                {guarantees.map((g) => (
                  <div key={g.title} className={s.guaranteeCard}>
                    <div className={s.guaranteeIcon}>{g.icon}</div>
                    <div>
                      <h3 className={s.guaranteeTitle}>{g.title}</h3>
                      <p className={s.guaranteeDesc}>{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={s.ctaRow}>
                <Link href="/technology" className="btn-primary">
                  Explore Technology Approach
                </Link>
                <Link href="/contact" className={`btn-secondary ${s.ctaSecondary}`}>
                  Book a Security Briefing
                </Link>
              </div>
            </Reveal>

            {/* ─── RIGHT COLUMN: BOUNDARY ARCHITECTURE & 6 PILLARS ────── */}
            <Reveal delay={120} className={s.rightCol}>
              {/* High-Tech Trust Boundary Card */}
              <div className={s.boundaryCard}>
                <div className={s.boundaryHeader}>
                  <div className={s.boundaryTitle}>
                    <span className={s.pulseDot} />
                    <span>Inside your perimeter</span>
                  </div>
                </div>

                {/* 3 Ingress Pods */}
                <div className={s.boundaryInputs}>
                  {boundaryInputs.map((b) => (
                    <div key={b.label} className={s.inputPod}>
                      <div className={s.inputPodIcon}>{b.icon}</div>
                      <span className={s.inputPodLabel}>{b.label}</span>
                      <span className={s.inputPodSub}>{b.sub}</span>
                    </div>
                  ))}
                </div>

                {/* Convergence Arrow */}
                <div className={s.boundaryConvergence}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path
                      d="M9 0v14M4 9l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Core Enclave Box */}
                <div className={s.boundaryCore}>
                  <div className={s.boundaryCoreIcon}>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      <circle cx="12" cy="16" r="1" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={s.boundaryCoreTitle}>
                      <span>Controlled AI Processing Enclave</span>
                    </h4>
                    <p className={s.boundaryCoreSub}>
                      All inference, retrieval, and fine-tuning execute strictly within your hardware or isolated VPC with zero third-party data egress.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6 Control Pillars Bento Grid */}
              <div className={s.pillarGrid}>
                {privateAIPillars.map((p) => (
                  <div key={p.label} className={s.pillarCard}>
                    <div className={s.cornerTl} aria-hidden="true" />
                    <div className={s.cornerBr} aria-hidden="true" />

                    <div className={s.pillarHeader}>
                      <div className={s.pillarIcon}>{p.icon}</div>
                    </div>

                    <h4 className={s.pillarTitle}>{p.label}</h4>
                    <p className={s.pillarDesc}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── STATIC DATA & ICONS ───────────────────────────────────────── */

const guarantees = [
  {
    title: "Zero Third-Party Data Egress",
    desc: "Models execute strictly inside your perimeter. Prompts, documents, and weights never enter shared multi-tenant clouds.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Cryptographic Hardware Enclaves",
    desc: "Isolated physical clusters or private cloud VPCs protected by hardware memory encryption and isolated networks.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  },
  {
    title: "Immutable Audit & Compliance Logs",
    desc: "Tamper-evident logs of every inference, model version, and access request for internal risk, GDPR, HIPAA, and SOC 2 audits.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

const boundaryInputs = [
  {
    label: "Data Residency",
    sub: "SQL / ERP / Docs",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    label: "Private Models",
    sub: "Dedicated Weights",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </svg>
    ),
  },
  {
    label: "Access & Logs",
    sub: "RBAC Clearances",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const privateAIPillars = [
  {
    label: "Data Sovereignty",
    desc: "Maintain absolute ownership over where data resides, vector memory indexes, and zero-retention storage policies.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Permission-Aware (RBAC)",
    desc: "Semantic retrieval that strictly enforces existing active directory, identity tiers, and departmental boundaries.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: "Auditability",
    desc: "Immutable logs, prompt histories, and telemetry for governance and compliance reporting across regulated sectors.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Deployment Flexibility",
    desc: "Air-gapped on-premise hardware clusters, private VPC clouds, or isolated single tenancy shaped to your physical constraints.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    label: "Model Independence",
    desc: "Use a commercial model, or fine-tune an open-weight one on your own hardware. You can change your mind later without a rebuild.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    label: "Human Oversight Gates",
    desc: "People remain in full control of consequential actions, high-value decisions, and automated escalation workflows.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];
