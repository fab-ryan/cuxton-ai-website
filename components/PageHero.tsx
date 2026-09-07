import Link from "next/link";
import styles from "./PageHero.module.css";

export interface PageHeroProps {
  /** Category badge text above the title */
  eyebrow?: string;
  /** Primary headline text */
  title: string;
  /** Highlighted phrase within the title rendered in solid brand teal or amber */
  titleHighlight?: string;
  /** Highlight color variant */
  highlightColor?: "teal" | "amber";
  /** Explanatory lead paragraph */
  description?: string;
  /** Primary CTA button */
  primaryCta?: {
    label: string;
    href: string;
  };
  /** Optional secondary CTA button */
  secondaryCta?: {
    label: string;
    href: string;
  };
  /** Capability / topic pill tags */
  tags?: string[];
  /** Optional key metrics shown in the telemetry card */
  stats?: {
    value: string;
    label: string;
  }[];
  /** Optional breadcrumbs path */
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  /** Custom aside override for the right column */
  aside?: React.ReactNode;
  /** Optional flag to toggle visual background / aside */
  showVisual?: boolean;
  /** Optional children below actions */
  children?: React.ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  titleHighlight,
  highlightColor = "teal",
  description,
  primaryCta,
  secondaryCta,
  tags,
  stats,
  breadcrumbs,
  aside,
  showVisual,
  children,
}: PageHeroProps) {
  const hasAside = Boolean(aside || (stats && stats.length > 0));
  const highlightClass =
    highlightColor === "amber"
      ? styles.headingHighlightAmber
      : styles.headingHighlight;

  return (
    <section className={`${styles.heroSection} scanlines`} aria-labelledby="page-hero-heading">
      {/* Solid overlay & hex grid (zero linear gradients) */}
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className="absolute inset-0 hex-grid pointer-events-none" aria-hidden="true" />

      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumbs" className={styles.breadcrumbNav}>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={crumb.label} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
                {crumb.href && idx < breadcrumbs.length - 1 ? (
                  <Link href={crumb.href} className={styles.breadcrumbLink}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={styles.breadcrumbCurrent} aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={hasAside ? styles.heroGridWithAside : styles.heroGrid}>
          {/* Left Column */}
          <div>
            {eyebrow && (
              <div className={styles.eyebrowBadge}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                <span>{eyebrow}</span>
              </div>
            )}

            <h1 id="page-hero-heading" className={styles.heading}>
              {title}{" "}
              {titleHighlight && (
                <span className={highlightClass}>{titleHighlight}</span>
              )}
            </h1>

            {description && (
              <p className={styles.subtitle}>
                {description}
              </p>
            )}

            {tags && tags.length > 0 && (
              <div className={styles.tagsRow} aria-label="Capabilities">
                {tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {(primaryCta || secondaryCta) && (
              <div className={styles.actionsRow}>
                {primaryCta && (
                  <Link href={primaryCta.href} className={styles.primaryBtn}>
                    <span>{primaryCta.label}</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}

                {secondaryCta && (
                  <Link href={secondaryCta.href} className={styles.secondaryBtn}>
                    <span>{secondaryCta.label}</span>
                  </Link>
                )}
              </div>
            )}

            {children}
          </div>

          {/* Right Column: Aside or Telemetry Stats Card */}
          {hasAside && (
            <aside aria-label="Architecture Status">
              {aside ? (
                aside
              ) : stats && stats.length > 0 ? (
                <div className={styles.statsCard}>
                  <div className={styles.cardHeader}>
                    <p className={styles.cardTitle}>Sovereign Architecture</p>
                    <div className={styles.statusIndicator}>
                      <span className={styles.statusIndicatorDot} aria-hidden="true" />
                      <span>Verified Active</span>
                    </div>
                  </div>

                  <div className={styles.statsGrid}>
                    {stats.map((stat) => (
                      <div key={stat.label} className={styles.statItem}>
                        <span className={styles.statValue}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
