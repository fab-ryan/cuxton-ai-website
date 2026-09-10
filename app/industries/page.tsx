import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { industries } from "@/data/industries";
import styles from "@/components/industries/IndustriesIndex.module.css";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Industries & Sector Practices — Cuxton AI",
  description:
    "Cuxton AI builds verifiable AI systems for financial services, healthcare, national defense, academic research, telecommunications, and legal advisory.",
};

export default function IndustriesPage() {
  return (
    <div className={styles.page}>
      {/* --- Hero Section with Visual Background --------------------------- */}
      <PageHero
        breadcrumbs={[{ label: "Industries" }]}
        eyebrow="Industries"
        title="Built for data-rich and"
        titleHighlight="high-trust environments."
        description="Cuxton AI works with institutions where data sensitivity, regulatory requirements and operational complexity make standard AI approaches inadequate."
        primaryCta={{
          label: "Discuss Your Sector",
          href: "/contact",
        }}
        tags={[
          "Financial Services",
          "Healthcare",
          "Government",
          "Education & Research",
          "Telecommunications",
          "Legal & Audit",
        ]}
      />

      {/* --- Alternating Industry Showcase Cards --------------------------- */}
      <section id="showcase" className={styles.showcaseSection}>
        <div className={`container max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left ${styles.showcaseContainer}`}>
          {industries.map((ind, i) => (
            <article
              key={ind.id}
              id={ind.id}
              className={styles.industryCard}
            >
              <div className={`${styles.cardInnerGrid} ${i % 2 === 1 ? styles.cardReverse : ""}`}>
                {/* Left: Content Column */}
                <div className={styles.cardContent}>
                  <div className={styles.cardHeaderArea}>
                    <div className={styles.cardSectorBadge}>
                      <span>SECTOR {ind.label}</span>
                      <span className={styles.cardBadgeDot} aria-hidden="true" />
                      <span className={styles.cardBadgeTag}>{ind.tag}</span>
                    </div>

                    <h2 className={styles.cardTitle}>{ind.name}</h2>
                    <p className={styles.cardSub}>{ind.sub}</p>
                    <p className={styles.cardHeadline}>{ind.headline}</p>
                    <p className={styles.cardBody}>{ind.body}</p>

                    {/* Solutions this sector actually draws on. Real,
                        per-sector links rather than uniform stat cells. */}
                    <div className={styles.appliedSolutions}>
                      <p className={styles.appliedSolutionsLabel}>Solutions applied here</p>
                      <ul className={styles.appliedSolutionsList}>
                        {ind.relatedSolutions.map((sol) => (
                          <li key={sol.id}>
                            <Link href={sol.href} className={styles.appliedSolutionChip}>
                              {sol.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={styles.cardActions}>
                    <Link href={`/industries/${ind.id}`} className={styles.cardPrimaryBtn}>
                      <span>Explore {ind.name} Architecture</span></Link>

                    <Link href="/contact" className={styles.cardSecondaryBtn}>
                      <span>Consult Specialists</span></Link>
                  </div>
                </div>

                {/* Right: Visual Image & Use Cases Preview */}
                <div className={styles.cardMediaColumn}>
                  <div className={styles.imageFrame}>
                    <Image
                      src={ind.image}
                      alt={`${ind.name} architecture visual preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className={styles.cardImage}
                    />
                    <div className={styles.imageOverlayWash} aria-hidden="true" />
                    <div className={styles.imageBadgeOverlay}>
                      <span className={styles.imageBadgeDot} aria-hidden="true" />
                      <span>CUX-IND-{ind.label}</span>
                    </div>
                  </div>

                  {/* Use Cases Preview */}
                  <div className={styles.useCasesContainer}>
                    <p className={styles.useCasesTitle}>Key Enterprise Use Cases</p>
                    <ul className={styles.useCasesGrid}>
                      {ind.typicalUseCases.slice(0, 3).map((uc) => (
                        <li key={uc} className={styles.useCaseCard}>
                          <span className={styles.useCaseBullet} aria-hidden="true" />
                          <div>
                            <p className={styles.useCaseSnippet}>{uc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- Governance & Compliance Guarantees ----------------------------- */}
      <section className={styles.governanceSection}>
        <div className="section-container">
          <div className={styles.sectionHeaderCenter}>
            <p className={styles.centerEyebrow}>Operating Baseline</p>
            <h2 className={styles.centerTitle}>Non-negotiable security across all sectors</h2>
            <p className={styles.centerDesc}>
              Every industry implementation adheres to our hardened engineering principles. No client
              data ever trains external models, leaves your approved boundaries, or compromises institutional auditability.
            </p>
          </div>

          <div className={styles.governanceGrid}>
            <div className={styles.governanceCard}>
              <div className={styles.govIconWrapper} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className={styles.govCardTitle}>Private Enclave Isolation</h3>
              <p className={styles.govCardDesc}>
                Deployed exclusively within client-owned VPCs, on-premise hardware, or air-gapped data centers.
                Zero multi-tenant risks or external API dependencies.
              </p>
            </div>

            <div className={styles.governanceCard}>
              <div className={styles.govIconWrapper} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className={styles.govCardTitle}>Deterministic Lineage &amp; Citations</h3>
              <p className={styles.govCardDesc}>
                Every retrieved fact or generated analysis is strictly grounded in authorized source documents,
                providing clickable provenance for audits and regulatory reviews.
              </p>
            </div>

            <div className={styles.governanceCard}>
              <div className={styles.govIconWrapper} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <h3 className={styles.govCardTitle}>Continuous Compliance &amp; Audit</h3>
              <p className={styles.govCardDesc}>
                Role-based access control, cryptographic audit logs, and alignment with
                SOC 2 Type II, ISO 27001, HIPAA, and federal regulatory standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Bottom CTA ---------------------------------------------------- */}
      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaInner}>
          <h2 className={styles.ctaHeading}>Operating in a specialized or regulated domain?</h2>
          <p className={styles.ctaSub}>
            Cuxton AI works with institutions where standard AI models fail compliance or security boundaries.
            Speak with our sector engineering practice to assess feasibility and architecture options.
          </p>
          <div className={styles.ctaBtnGroup}>
            <Link href="/contact" className={styles.primaryHeroBtn}>
              <span>Start a Confidential Conversation</span></Link>
            <Link href="/solutions" className={styles.secondaryHeroBtn}>
              <span>Explore All Solutions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
