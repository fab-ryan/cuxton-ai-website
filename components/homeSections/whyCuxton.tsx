"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "../Reveal";
import s from "./whyCuxton.module.css";

export const WhyCuxtonSection = () => {
  const [showMatrix, setShowMatrix] = useState(false);

  return (
    <section className={s.section} id="why-cuxton">
      <div className={`container w-full max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8  ${s.themeWrap}`}>
        {/* ─── SECTION HEADER ────────────────────────────────────────── */}
        <Reveal className={s.header}>
          <h2 className={s.heading}>
            We don&apos;t have a licence to sell you.
          </h2>
          <p className={s.subHeading}>
            Most AI vendors start from the software they need to move. We start
            from the work your teams actually do, and build around the knowledge
            your organisation already has. You own what we build.
          </p>
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
                </div>

                <h3 className={s.cardTitle}>We tell you when AI is the wrong tool</h3>
                <p className={s.cardDesc}>
                  We start by looking at where work actually gets stuck, what it
                  costs you, and whether your data is in good enough shape to build
                  on. If a use case won&apos;t work, or won&apos;t pay for itself, we say so
                  before you spend anything.
                </p>
              </div>
            </div>

            <div className={s.heroCardVisual}>
              <Image
                src="/principles/cuxton_principles_pillar.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className={s.heroVisualImg}
              />
              <div className={s.heroVisualOverlay} />
              <div className={s.heroVisualBadge}>
                <span className={s.heroVisualDot} />
                <span className={s.heroVisualText}>Inside your perimeter</span>
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
            </div>

            <h3 className={s.cardTitle}>You can change your mind about the model</h3>
            <p className={s.cardDesc}>
              We use commercial models where they fit, and run open-weight
              models like Llama or Mistral inside your own network where privacy
              or cost makes that the better answer. Either way, the model sits
              behind an interface you can swap out later.
            </p>
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
            </div>

            <h3 className={s.cardTitle}>You own everything we build</h3>
            <p className={s.cardDesc}>
              The pipelines, the integration code and the fine-tuned weights are
              yours, in your repositories, at the end of the engagement. Your
              records are never used to train anyone else&apos;s model.
            </p>
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
            </div>

            <h3 className={s.cardTitle}>Every answer shows its source</h3>
            <p className={s.cardDesc}>
              The system reads from your own document stores, and it respects the
              permissions those stores already have — people see what they are
              cleared to see. Every answer cites the document it came from, so
              your auditors can check it.
            </p>
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
            </div>

            <h3 className={s.cardTitle}>People stay in charge of decisions</h3>
            <p className={s.cardDesc}>
              Anything with real consequences stops for a person to approve it.
              Those approvals are logged, so you can show who signed off on what,
              and when.
            </p>
          </Reveal>
        </div>

        {/* ════════════════════════════════════════════════════════════
            THE CUXTON DIFFERENCE — COMPARISON MATRIX
            ════════════════════════════════════════════════════════════ */}
        <Reveal delay={120} className={s.matrixContainer}>
          <div className={s.matrixHeader}>
            <div className={s.matrixTitleGroup}>
              <h3 className={s.matrixTitle}>How we compare</h3>
              <p className={s.matrixSub}>Where we differ from a software vendor or a traditional consultancy</p>
            </div>
            <button
              type="button"
              onClick={() => setShowMatrix(!showMatrix)}
              className="btn-secondary"
              style={{ fontSize: "0.82rem", padding: "0.45rem 1rem" }}
            >
              {showMatrix ? "Hide comparison" : "Show comparison"}
            </button>
          </div>

          {showMatrix && (
            <div className={s.tableWrap}>
              <table className={s.matrixTable}>
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th className={s.thCuxton}>CuxtonAI</th>
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
              See how we work
            </Link>
            <Link href="/contact" className={s.btnSecondary}>
              Talk to us
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
    dimension: "What we're paid for",
    cuxton: "A bounded piece of engineering, judged on whether the work it replaces actually got faster.",
    saas: "Seats and usage. The bill grows whether or not the tool is used well.",
    consulting: "Hours. A longer engagement is worth more to them than a shorter one.",
  },
  {
    dimension: "Where your data sits",
    cuxton: "In your own cloud account or on your own hardware. It is never used to train anyone else's model.",
    saas: "Shared cloud infrastructure, usually with sub-processors you'll need to review.",
    consulting: "Whichever vendor API they resell, with the standard disclaimers attached.",
  },
  {
    dimension: "Who owns the work",
    cuxton: "You do — the prompts, the pipelines, the integration code and the fine-tuned weights.",
    saas: "The vendor owns the platform. You rent access to your own workflows.",
    consulting: "Often built on their internal framework, which you licence rather than own.",
  },
  {
    dimension: "Changing the model later",
    cuxton: "The model sits behind an interface. Swapping it is a change to one layer, not a rebuild.",
    saas: "You get whatever the vendor ships, when they ship it.",
    consulting: "Limited to the vendors they have a partnership with.",
  },
  {
    dimension: "After go-live",
    cuxton: "We monitor accuracy against agreed thresholds and hand over runbooks your team can use.",
    saas: "A support queue and an annual renewal conversation.",
    consulting: "The team rolls off at delivery, usually without documentation.",
  },
];
