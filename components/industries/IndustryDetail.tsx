import Image from "next/image";
import Link from "next/link";
import type { Industry } from "@/data/industries";
import IndustrySectionNav from "./IndustrySectionNav";
import styles from "./IndustryDetail.module.css";

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
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
);

export default function IndustryDetail({ industry }: { industry: Industry }) {
  const {
    label,
    name,
    tag,
    sub,
    headline,
    body,
    image,
    problem,
    whatWeProvide,
    howItWorks,
    typicalUseCases,
    security,
    outputs,
    relatedSolutions,
    closing,
  } = industry;

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={`${styles.headerInner} section-container`}>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className={styles.breadcrumbNav}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
            <Link href="/industries" className={styles.breadcrumbLink}>Industries</Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCategory}>{tag}</span>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent} aria-current="page">{name}</span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left Column: Sector Narrative, Badges, Typography & CTAs */}
            <div className={styles.heroContent}>
              <div className={styles.eyebrowBadge}>
                <span className={styles.badgeIndex}>SECTOR {label}</span>
                <span className={styles.badgeDot} aria-hidden="true" />
                <span className={styles.badgeTag}>{tag}</span>
              </div>

              <h1 className={styles.title}>{name}</h1>

              <p className={styles.subtext}>{sub}</p>

              <p className={styles.headline}>{headline}</p>

              <p className={styles.bodyText}>{body}</p>

              {/* Enterprise Capability Pills */}
              <div className={styles.capabilityPills}>
                <span className={styles.capabilityPill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Private Enclave
                </span>
                <span className={styles.capabilityPill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Zero Data Retention
                </span>
                <span className={styles.capabilityPill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Audit Provenance
                </span>
              </div>

              {/* Action Buttons */}
              <div className={styles.ctaGroup}>
                <Link href="/contact" className={styles.primaryCta}>
                  <span>Consult Sector Specialists</span></Link>

                <a href="#how-it-works" className={styles.secondaryCta}>
                  <span>Explore Execution Roadmap</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Industry Blueprint & Visual HUD Card */}
            <aside className={styles.heroAside} aria-label="Sector Architecture Specification">
              <div className={styles.blueprintCard}>
                {/* Visual Image Preview */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt={`${name} private AI architecture showcase`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    priority
                    className={styles.sectorImage}
                  />
                  <div className={styles.imageWash} aria-hidden="true" />
                  <div className={styles.imageBadge}>
                    <span className={styles.imageBadgeDot} aria-hidden="true" />
                    <span>CUX-IND-{label}</span>
                  </div>
                </div>

                {/* Card Terminal Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.statusPill}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    <span>Production Verified</span>
                  </div>
                  <span className={styles.cardCode}>{tag}</span>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <div className={styles.cardTitleRow}>
                    <h2 className={styles.cardTitle}>{name} Specification</h2>
                  </div>

                  <p className={styles.cardDesc}>
                    Institutional framework designed for client-controlled infrastructure, compliance boundaries, and verifiable audit trails.
                  </p>

                  {/* 2x2 Telemetry Grid */}
                  <div className={styles.telemetryGrid}>
                    <div className={styles.telemetryItem}>
                      <span className={styles.telemetryValue}>Private / On-Prem</span>
                      <span className={styles.telemetryLabel}>Deployment Perimeter</span>
                    </div>
                    <div className={styles.telemetryItem}>
                      <span className={styles.telemetryValue}>Zero Cloud Exfil</span>
                      <span className={styles.telemetryLabel}>Data Retention</span>
                    </div>
                    <div className={styles.telemetryItem}>
                      <span className={styles.telemetryValue}>{howItWorks.length} Phases</span>
                      <span className={styles.telemetryLabel}>Rollout Lifecycle</span>
                    </div>
                    <div className={styles.telemetryItem}>
                      <span className={styles.telemetryValue}>{outputs.length} Deliverables</span>
                      <span className={styles.telemetryLabel}>Certified Outputs</span>
                    </div>
                  </div>

                  {/* Deliverables Snapshot */}
                  <div className={styles.deliverablesBox}>
                    <div className={styles.deliverablesHeader}>
                      <span>Core Deliverables Snapshot</span>
                      <span className={styles.deliverablesCount}>{outputs.length} verified</span>
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
                    <span>ISO 27001, SOC 2 &amp; Private Enclave Ready</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Sticky Section Nav Dock */}
      <IndustrySectionNav />

      <div className={`${styles.container} section-container`}>
        {/* Sector Challenges */}
        <section id="problem" className={styles.section}>
          <p className={styles.eyebrow}>{problem.eyebrow}</p>
          <p className={styles.intro}>{problem.intro}</p>

          <h3 className={styles.challengesHeading}>Sector-Specific Challenges:</h3>
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

        {/* What We Provide */}
        <section id="what-we-provide" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            What We Provide for {name}
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

        {/* Execution Blueprint / How It Works */}
        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            Execution Roadmap &amp; Methodology
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

        {/* Typical Use Cases */}
        <section id="typical-use-cases" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            Typical Sector Use Cases
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

        {/* Security & Governance */}
        <section id="security" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            Security, Compliance &amp; Governance
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
            Key Deliverables &amp; Artifacts
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

        {/* Related Solutions */}
        <section id="related-solutions" className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <span className={styles.sectionHeadingDot} aria-hidden="true" />
            Recommended Solutions for {name}
          </h2>
          <div className={styles.industryChips}>
            {relatedSolutions.map((sol) => (
              <Link key={sol.id} href={sol.href} className={styles.industryChip}>
                <span>{sol.name}</span></Link>
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
              Discuss {name} Project
            </Link>
            <Link href="/industries" className="btn-secondary" style={{ height: "3.125rem", padding: "0 2rem", display: "inline-flex" }}>
              Explore All Industries
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
