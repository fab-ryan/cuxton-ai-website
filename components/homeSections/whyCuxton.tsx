"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "../Reveal";
import s from "./whyCuxton.module.css";

export const WhyCuxtonSection = () => {
  const [showMatrix, setShowMatrix] = useState(true);

  return (
    <section className={s.section} id="why-cuxton">
      <div className={`container w-full max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8  ${s.themeWrap}`}>
        {/* ─── SECTION HEADER ────────────────────────────────────────── */}
        <Reveal className={s.header}>
          <div className="section-label">Why Cuxton AI · Engineering Principles</div>
          <h2 className={s.heading}>
            Built on principles,<br />
            <span className={s.headingAccent}>not product sales quotas.</span>
          </h2>
          <p className={s.subHeading}>
            Most AI vendors begin with software licenses they need to sell. Cuxton is an engineering-first sovereign AI consultancy  beginning with your operational reality and building around your institutional knowledge with zero vendor lock-in.
          </p>
        </Reveal>

        {/* ─── INSTITUTIONAL PROOF METRICS BAR ───────────────────────── */}
        <Reveal delay={60} className={s.metricsBar}>
          <div className={s.metricPill}>
            <span className={s.metricPillIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <span className={s.metricPillVal}>100%</span>
            <span className={s.metricPillLabel}>Client IP Ownership</span>
          </div>

          <div className={s.metricPill}>
            <span className={s.metricPillIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
            </span>
            <span className={s.metricPillVal}>Zero</span>
            <span className={s.metricPillLabel}>Vendor Lock-in</span>
          </div>

          <div className={s.metricPill}>
            <span className={s.metricPillIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <span className={s.metricPillVal}>Air-Gapped</span>
            <span className={s.metricPillLabel}>Sovereign Security</span>
          </div>

          <div className={s.metricPill}>
            <span className={s.metricPillIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </span>
            <span className={s.metricPillVal}>Verifiable</span>
            <span className={s.metricPillLabel}>Institutional Grounding</span>
          </div>
        </Reveal>

        {/* ════════════════════════════════════════════════════════════
            BENTO GRID OF PRINCIPLES
            ════════════════════════════════════════════════════════════ */}
        <div className={s.bentoGrid}>
          {/* ─── Hero Principle: Problem-First & Honest Feasibility (Span 7) ─── */}
          <Reveal delay={80} className={`${s.bentoCard} ${s.heroCard}`}>
            <div className={s.heroCardContent}>
              <div>
                <div className={s.cardTop}>
                  <div className={s.cardIconWrap}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <span className={s.cardTenetBadge}>Core Tenet 01</span>
                </div>

                <h3 className={s.cardTitle}>Problem-First &amp; Honest Feasibility</h3>
                <div className={s.cardTagline}>&ldquo;Understand before recommending. Feasibility before build.&rdquo;</div>
                <p className={s.cardDesc}>
                  We begin with your institution&apos;s operational friction, unit economics, and data readiness not a model or vendor platform we want to push. If an AI use case is not technically viable or won&apos;t yield verifiable ROI, we tell you candidly before you commit resources.
                </p>
              </div>

              <div className={s.cardFooter}>
                <span className={s.cardFooterDot} />
                <span className={s.cardFooterText}>0% Vendor Quotas · 100% Client-Aligned Incentives</span>
              </div>
            </div>

            <div className={s.heroCardVisual}>
              <Image
                src="/principles/cuxton_principles_pillar.jpg"
                alt="Cuxton AI Sovereign Engineering Pillar"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className={s.heroVisualImg}
              />
              <div className={s.heroVisualOverlay} />
              <div className={s.heroVisualBadge}>
                <span className={s.heroVisualDot} />
                <span className={s.heroVisualText}>Sovereign AI Infrastructure Enclave</span>
              </div>
            </div>
          </Reveal>

          {/* ─── Principle 2: Model & Infrastructure Agnostic (Span 5) ─── */}
          <Reveal delay={110} className={`${s.bentoCard} ${s.cardSpan5}`}>
            <div className={s.cardTop}>
              <div className={s.cardIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
              </div>
              <span className={s.cardTenetBadge}>Tenet 02</span>
            </div>

            <h3 className={s.cardTitle}>Model &amp; Vendor Independence</h3>
            <div className={s.cardTagline}>&ldquo;The right model for the problem never vendor lock-in.&rdquo;</div>
            <p className={s.cardDesc}>
              We use state-of-the-art commercial models when appropriate and customize private open-weights (Llama, Mistral) on your sovereign VPC when privacy or cost demands it. We engineer modular abstractions so you can swap foundation models seamlessly.
            </p>

            <div className={s.cardFooter}>
              <span className={s.cardFooterDot} />
              <span className={s.cardFooterText}>Deploy on AWS, Azure, GCP or On-Premise</span>
            </div>
          </Reveal>

          {/* ─── Principle 3: Absolute Data Sovereignty & IP (Span 4) ─── */}
          <Reveal delay={140} className={`${s.bentoCard} ${s.cardSpan4}`}>
            <div className={s.cardTop}>
              <div className={s.cardIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className={s.cardTenetBadge}>Tenet 03</span>
            </div>

            <h3 className={s.cardTitle}>Exclusive Client IP Ownership</h3>
            <div className={s.cardTagline}>&ldquo;Your data, code, and weights remain 100% yours.&rdquo;</div>
            <p className={s.cardDesc}>
              Architecture engineered around strict data sensitivity boundaries. Every prompt pipeline, integration middleware, and fine-tuned model weight belongs entirely to your institution. Your records never train external public models.
            </p>

            <div className={s.cardFooter}>
              <span className={s.cardFooterDot} />
              <span className={s.cardFooterText}>Zero Data Leakage · 100% IP Sovereignty</span>
            </div>
          </Reveal>

          {/* ─── Principle 4: Grounded in Institutional Knowledge (Span 4) ─── */}
          <Reveal delay={170} className={`${s.bentoCard} ${s.cardSpan4}`}>
            <div className={s.cardTop}>
              <div className={s.cardIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <span className={s.cardTenetBadge}>Tenet 04</span>
            </div>

            <h3 className={s.cardTitle}>Institutional Grounding</h3>
            <div className={s.cardTagline}>&ldquo;Verifiable enterprise truth over speculative generation.&rdquo;</div>
            <p className={s.cardDesc}>
              AI connected directly to authorized enterprise repositories with strict role-based access control (RBAC). Every output includes transparent source citations, eliminating ungrounded hallucinations and maintaining regulatory defensibility.
            </p>

            <div className={s.cardFooter}>
              <span className={s.cardFooterDot} />
              <span className={s.cardFooterText}>Cryptographic Source Attribution &amp; Auditability</span>
            </div>
          </Reveal>

          {/* ─── Principle 5: Human-in-the-Loop Governance (Span 4) ─── */}
          <Reveal delay={200} className={`${s.bentoCard} ${s.cardSpan4}`}>
            <div className={s.cardTop}>
              <div className={s.cardIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className={s.cardTenetBadge}>Tenet 05</span>
            </div>

            <h3 className={s.cardTitle}>Human Oversight by Design</h3>
            <div className={s.cardTagline}>&ldquo;Consequential decisions remain with authorized people.&rdquo;</div>
            <p className={s.cardDesc}>
              AI systems we build are designed to amplify human capability, not bypass organizational accountability. Consequential operational workflows incorporate deterministic verification checkpoints and immutable audit logs.
            </p>

            <div className={s.cardFooter}>
              <span className={s.cardFooterDot} />
              <span className={s.cardFooterText}>Mandatory Supervisory Verification Gates</span>
            </div>
          </Reveal>
        </div>

        {/* ════════════════════════════════════════════════════════════
            THE CUXTON DIFFERENCE — COMPARISON MATRIX
            ════════════════════════════════════════════════════════════ */}
        <Reveal delay={120} className={s.matrixContainer}>
          <div className={s.matrixHeader}>
            <div className={s.matrixTitleGroup}>
              <h3 className={s.matrixTitle}>The Cuxton Difference: Clear Enterprise Alignment</h3>
              <p className={s.matrixSub}>How our sovereign engineering model compares to traditional alternatives</p>
            </div>
            <button
              type="button"
              onClick={() => setShowMatrix(!showMatrix)}
              className="btn-secondary"
              style={{ fontSize: "0.82rem", padding: "0.45rem 1rem" }}
            >
              {showMatrix ? "Hide Comparison Matrix" : "View Comparison Matrix"}
            </button>
          </div>

          {showMatrix && (
            <div className={s.tableWrap}>
              <table className={s.matrixTable}>
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th className={s.thCuxton}>Cuxton AI</th>
                    <th>Generic SaaS Vendors</th>
                    <th>Traditional IT Consultancies</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.dimension}>
                      <td className={s.tdDimension}>{row.dimension}</td>
                      <td className={s.tdCuxton}>
                        <div className={s.tableStatusRow}>
                          <span className={s.statusIconPass}>&#10003;</span>
                          <span>{row.cuxton}</span>
                        </div>
                      </td>
                      <td className={s.tdCompetitor}>
                        <div className={s.tableStatusRow}>
                          <span className={s.statusIconWarn}>&times;</span>
                          <span>{row.saas}</span>
                        </div>
                      </td>
                      <td className={s.tdCompetitor}>
                        <div className={s.tableStatusRow}>
                          <span className={s.statusIconWarn}>&times;</span>
                          <span>{row.consulting}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Reveal>

        {/* ─── FOOTER ACTION BUTTONS ─────────────────────────────────── */}
        <Reveal delay={140} className={s.footer}>
          <div className={s.footerButtons}>
            <Link href="/how-we-work" className={s.btnPrimary}>
              See Our Engagement Model &rarr;
            </Link>
            <Link href="/contact" className={s.btnSecondary}>
              Schedule Consultation
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ─── COMPARISON MATRIX DATA ────────────────────────────────────────── */

const comparisonRows = [
  {
    dimension: "Primary Incentives",
    cuxton: "Bounded engineering focused exclusively on measurable operational ROI.",
    saas: "Maximizing recurring seat subscriptions and continuous per-token consumption.",
    consulting: "Maximizing billable consulting hours and multi-month slide deck deliveries.",
  },
  {
    dimension: "Data Sovereignty",
    cuxton: "Air-gapped VPC or on-premise execution; zero client records train third-party models.",
    saas: "Multi-tenant cloud infrastructure with third-party sub-processors.",
    consulting: "Standard vendor API configurations with generic compliance disclaimers.",
  },
  {
    dimension: "IP Ownership",
    cuxton: "100% client ownership of all prompts, pipelines, integration code, and fine-tuned weights.",
    saas: "Vendor owns the proprietary platform, pipeline logic, and workflow automation.",
    consulting: "Template code frequently encumbered with proprietary consultant frameworks.",
  },
  {
    dimension: "Model Flexibility",
    cuxton: "Modular, model-agnostic architecture. Seamlessly swap models as technology advances.",
    saas: "Strictly locked into the vendor's closed proprietary ecosystem.",
    consulting: "Limited by specific vendor reseller partnerships and certifications.",
  },
  {
    dimension: "Long-Term Alignment",
    cuxton: "Ongoing telemetry monitoring, accuracy SLA guarantees, and progressive scaling.",
    saas: "Support desk tickets with escalating annual license renewals.",
    consulting: "Consultants roll off engagement upon delivery, leaving internal teams without runbooks.",
  },
];
