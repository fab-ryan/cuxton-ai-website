import Link from "next/link";
import styles from "./pageIntro.module.css";

export type Crumb = { label: string; href?: string };

export type PageIntroProps = {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  award?: string;
  title: string;
  lead?: string;
  tags?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  media?: { src: string; alt: string; width: number; height: number };
  children?: React.ReactNode;
};

/* Every interior page opens with this. It carries the breadcrumb trail,
   the page title and at most two actions, over the same dark ground the
   navigation is designed against. */
export default function PageIntro({
  breadcrumbs,
  eyebrow,
  award,
  title,
  lead,
  tags,
  primaryCta,
  secondaryCta,
  media,
  children,
}: PageIntroProps) {
  return (
    <header className={`${styles.intro} on-dark`}>
      <div className="section-container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} style={{ display: "inline-flex", gap: "0.5rem" }}>
                <span className={styles.sep} aria-hidden="true">/</span>
                {crumb.href && i < breadcrumbs.length - 1 ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span className={styles.current} aria-current="page">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={`${styles.grid} ${media ? styles.gridWithMedia : ""}`}>
          <div>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {award && <span className={styles.award}>{award}</span>}
            <h1 className={styles.title}>{title}</h1>
            {lead && <p className={styles.lead}>{lead}</p>}

            {tags && tags.length > 0 && (
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}

            {(primaryCta || secondaryCta) && (
              <div className={styles.actions}>
                {primaryCta && (
                  <Link href={primaryCta.href} className={styles.btnPrimary}>{primaryCta.label}</Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className={styles.btnSecondary}>{secondaryCta.label}</Link>
                )}
              </div>
            )}

            {children}
          </div>

          {media && (
            <div className={styles.media}>
              {/* Static export: SVG line art, served as-is. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="eager" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
