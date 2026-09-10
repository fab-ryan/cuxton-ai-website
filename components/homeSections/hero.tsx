import Link from "next/link";
import styles from "@/app/page.module.css";

export const HeroSection = () => {
  return (

    <section className={`${styles.hero} on-dark`}>
      <div className={styles.hero__overlay} />

      <div className={`w-full ${styles.hero__container} max-w-7xl mx-auto *:px-4 sm:px-6 lg:px-8`}>
        <div className={`${styles.hero__grid} hero-grid`}>

          {/* Left: copy */}
          <div className={styles.hero__copy}>

            <h1 className={styles.hero__headline}>
              AI that runs where your
              <br />
              data is allowed to stay.
            </h1>

            <p className={styles.hero__body}>
              We build AI systems for banks, hospitals and public bodies that
              can&apos;t send their records to a public model. The system runs on
              your infrastructure, reads your documents, respects the permissions
              you already have, and belongs to you when we&apos;re done.
            </p>

            <div className={styles.hero__tags}>
              {["Runs on your infrastructure", "Reads your documents", "You own the build"].map(t => (
                <span key={t} className="tag-teal">{t}</span>
              ))}
            </div>

            <div className={styles.hero__ctas}>
              <Link href="/contact" className={`btn-primary ${styles.hero__ctaPrimary}`}>
                Book a discovery call
              </Link>
              <Link href="/solutions" className={`btn-secondary ${styles.hero__ctaSecondary}`}>
                See what we build
              </Link>
            </div>
          </div>

          {/* Right: Architecture data-flow diagram */}
          <div className={styles.hero__diagram}>
            <ArchDiagram />
          </div>
        </div>
      </div>
    </section>)
}

/* ─────────────────────────────────────────────────────────
   ARCHITECTURE DIAGRAM COMPONENT
   ───────────────────────────────────────────────────────── */
function ArchDiagram() {
  const layers = [
    {
      label: "Organisation",
      sub: "People, Teams, Workflows, Policies",
      color: "rgba(245,166,35,0.12)",
      border: "rgba(245,166,35,0.3)",
      text: "var(--cuxton-amber)",
    },
    {
      label: "AI Infrastructure",
      sub: "Selected models, Compute, Security",
      color: "rgba(27,107,138,0.1)",
      border: "rgba(27,107,138,0.28)",
      text: "var(--cuxton-teal-light)",
    },
    {
      label: "Secure Data & Knowledge",
      sub: "Databases, Documents, Permissions, Retrieval",
      color: "rgba(27,107,138,0.07)",
      border: "rgba(27,107,138,0.2)",
      text: "var(--cuxton-teal-light)",
    },
    {
      label: "AI Applications",
      sub: "Assistants, Agents, Automations, Analytics",
      color: "rgba(245,166,35,0.07)",
      border: "rgba(245,166,35,0.2)",
      text: "var(--cuxton-amber)",
    },
  ];

  return (
    <div className={styles.diagram}>

      <p className={styles.diagram__label}>
        Inside your perimeter
      </p>

      <div className={styles.diagram__frame}>
        {layers.map((layer, i) => (
          <div key={layer.label}>
            <div
              className={styles.diagram__layerBox}
              style={{ background: layer.color, border: `1px solid ${layer.border}` }}
            >
              <p className={styles.diagram__layerTitle} style={{ color: layer.text }}>
                {layer.label}
              </p>
              <p className={styles.diagram__layerSub}>
                {layer.sub}
              </p>
            </div>
            {i < layers.length - 1 && (
              <div className={styles.diagram__arrowWrap}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 0v8M4 6l4 4 4-4" stroke="rgba(27,107,138,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className={styles.diagram__footer}>
        An illustration. What we actually build depends on your systems.
      </p>
    </div>
  );
}
