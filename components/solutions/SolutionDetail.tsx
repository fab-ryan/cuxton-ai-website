import Link from "next/link";
import type { Solution } from "@/data/solutions";
import SectionNav from "./SectionNav";
import styles from "./SolutionDetail.module.css";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cuxton-teal-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon} aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function SolutionDetail({ solution }: { solution: Solution }) {
  const {
    label,
    name,
    tag,
    headline,
    body,
    problem,
    whatWeProvide,
    howItWorks,
    typicalUseCases,
    security,
    outputs,
    relatedIndustries,
    closing,
  } = solution;

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className="absolute inset-0 hex-grid pointer-events-none" aria-hidden="true" />
        <div className={styles.ambientGlow} aria-hidden="true" />

        <div className={`${styles.headerInner} section-container`}>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className={styles.breadcrumbNav}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
            <Link href="/solutions" className={styles.breadcrumbLink}>Solutions</Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCategory}>{tag}</span>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent} aria-current="page">{name}</span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left Column: Narrative, Badges, Typography & CTAs */}
            <div className={styles.heroContent}>
              <div className={styles.eyebrowBadge}>
                <span className={styles.badgeIndex}>SOLUTION {label}</span>
                <span className={styles.badgeDot} aria-hidden="true" />
                <span className={styles.badgeTag}>{tag}</span>
              </div>

              <h1 className={styles.title}>{name}</h1>

              <p className={styles.headline}>{headline}</p>

              <p className={styles.bodyText}>{body}</p>

              {/* Enterprise Capability Pills */}
              <div className={styles.capabilityPills}>
                <span className={styles.capabilityPill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Private VPC / On-Prem
                </span>
                <span className={styles.capabilityPill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Zero Data Retention
                </span>
                <span className={styles.capabilityPill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  Bespoke Integration
                </span>
              </div>

              {/* Action Buttons */}
              <div className={styles.ctaGroup}>
                <Link href="/contact" className={styles.primaryCta}>
                  <span>Discuss This Solution</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                <a href="#how-it-works" className={styles.secondaryCta}>
                  <span>Explore Methodology</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Sovereign Solution Blueprint & Telemetry HUD Card */}
            <aside className={styles.heroAside} aria-label="Architecture Specification">
              <div className={styles.blueprintCard}>
                <div className={styles.cardGlow} aria-hidden="true" />

                {/* Card Terminal Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.statusPill}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    <span>Production Ready</span>
                  </div>
                  <span className={styles.cardCode}>[CUX-SOL-{label}]</span>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <div className={styles.cardTitleRow}>
                    <h2 className={styles.cardTitle}>Architecture Specification</h2>
                    <span className={styles.cardBadge}>{tag}</span>
                  </div>

                  <p className={styles.cardDesc}>
                    Institution-grade deployment configured for client-controlled infrastructure, compliance boundaries, and measurable ROI.
                  </p>

                  {/* 2x2 Telemetry Grid */}
                  <div className={styles.telemetryGrid}>
                    <div className={styles.telemetryItem}>
                      <span className={styles.telemetryValue}>Private VPC</span>
                      <span className={styles.telemetryLabel}>Deployment Mode</span>
                    </div>
                    <div className={styles.telemetryItem}>
                      <span className={styles.telemetryValue}>0% External</span>
                      <span className={styles.telemetryLabel}>Data Retention</span>
                    </div>
                    <div className={styles.telemetryItem}>
                      <span className={styles.telemetryValue}>{howItWorks.length} Stages</span>
                      <span className={styles.telemetryLabel}>Execution Roadmap</span>
                    </div>
                    <div className={styles.telemetryItem}>
                      <span className={styles.telemetryValue}>{outputs.length} Outputs</span>
                      <span className={styles.telemetryLabel}>Key Deliverables</span>
                    </div>
                  </div>

                  {/* Deliverables Snapshot */}
                  <div className={styles.deliverablesBox}>
                    <div className={styles.deliverablesHeader}>
                      <span>Core Deliverables Snapshot</span>
                      <span className={styles.deliverablesCount}>{outputs.length} items</span>
                    </div>
                    <ul className={styles.deliverablesList}>
                      {outputs.slice(0, 3).map((item) => (
                        <li key={item} className={styles.deliverableItem}>
                          <CheckIcon />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Security Guarantee Footer */}
                  <div className={styles.cardFooter}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--cuxton-teal-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>ISO 27001 &amp; SOC 2 Sovereign Readiness</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Sticky Section Nav Dock */}
      <SectionNav />

      <div className={`${styles.container} section-container`}>
        {/* Problem */}
        <section id="problem" className={styles.section}>
          <p className={styles.eyebrow}>{problem.eyebrow}</p>
          <p className={styles.intro}>{problem.intro}</p>

          <h3 className={styles.challengesHeading}>Key challenges:</h3>
          <ul className={styles.challengesGrid}>
            {problem.challenges.map((c) => (
              <li key={c} className={styles.challengeItem}>
                <span className={styles.challengeDot} aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <Link href="/contact" className="btn-primary" style={{ height: "2.875rem", padding: "0 1.5rem", display: "inline-flex" }}>
            {problem.ctaLabel}
          </Link>
        </section>

        <div className={styles.divider} />

        {/* What we provide */}
        <section id="what-we-provide" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            What we provide
          </h2>
          <ul className={styles.checklist}>
            {whatWeProvide.map((item) => (
              <li key={item} className={styles.checklistItem}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.divider} />

        {/* How it works */}
        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            How it works
          </h2>
          <ol className={styles.timeline}>
            {howItWorks.map((step, i) => (
              <li key={step.phase} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <span className={styles.timelineNum}>{String(i + 1).padStart(2, "0")}</span>
                  {i < howItWorks.length - 1 && <span className={styles.timelineLine} aria-hidden="true" />}
                </div>
                <div>
                  <p className={styles.timelinePhase}>{step.phase}</p>
                  <p className={styles.timelineNote}>{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className={styles.divider} />

        {/* Typical use cases */}
        <section id="typical-use-cases" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            Typical use cases
          </h2>
          <ul className={styles.useCaseList}>
            {typicalUseCases.map((useCase) => (
              <li key={useCase} className={styles.useCaseItem}>
                <span className={styles.challengeDot} aria-hidden="true" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.divider} />

        {/* Security & governance */}
        <section id="security" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            Security &amp; governance
          </h2>
          <ul className={styles.checklist}>
            {security.map((item) => (
              <li key={item} className={styles.checklistItem}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.divider} />

        {/* Deliverables */}
        <section id="deliverables" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            Deliverables
          </h2>
          <ul className={styles.checklist}>
            {outputs.map((item) => (
              <li key={item} className={styles.checklistItem}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.divider} />

        {/* Related industries */}
        <section id="related-industries" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            Related industries
          </h2>
          <div className={styles.industryChips}>
            {relatedIndustries.map((ind) => (
              <Link key={ind.id} href={`/industries#${ind.id}`} className={styles.industryChip}>
                {ind.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Closing CTA */}
      <section className={styles.closing}>
        <div className={styles.closingInner}>
          <h2 className={styles.closingHeading}>{closing.heading}</h2>
          <p className={styles.closingBody}>{closing.body}</p>
          <div className={styles.closingActions}>
            <Link href="/contact" className="btn-primary" style={{ height: "3.125rem", padding: "0 2rem", display: "inline-flex" }}>
              Discuss This Solution
            </Link>
            <Link href="/solutions" className="btn-secondary" style={{ height: "3.125rem", padding: "0 2rem", display: "inline-flex" }}>
              Explore Our Solutions
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
