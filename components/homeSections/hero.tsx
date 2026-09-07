import Link from "next/link";
import styles from "@/app/page.module.css";

export const HeroSection = () => {
  return (

    <section className={`${styles.hero} scanlines `} >
      <div className={styles.hero__overlay} />
      <div className="absolute inset-0 hex-grid pointer-events-none" />
      <div className={styles.hero__glow} />

      <div className={`w-full ${styles.hero__container} max-w-7xl mx-auto *:px-4 sm:px-6 lg:px-8`}>
        <div className={`${styles.hero__grid} hero-grid`}>

          {/* Left: copy */}
          <div className={styles.hero__copy}>
            <div className="section-label anim-fade d1">
              Private &amp; Practical Enterprise AI
            </div>

            <h1 className={`${styles.hero__headline} anim-fade-up d2`}>
              <span className={styles.hero__headlineAccent}>Enterprise AI</span>
              <br />
              <span className={styles.hero__headlineLine}>built around your data,</span>
              <br />
              <span className={styles.hero__headlineLine}>workflows and control.</span>
            </h1>

            <p className={`${styles.hero__body} anim-fade-up d3`}>
              Cuxton AI helps institutions discover where AI can create real value, then integrates,
              customises or builds secure AI systems, agents and automations around the organisation&apos;s
              own knowledge, infrastructure and operational needs.
            </p>

            <div className={`${styles.hero__tags} anim-fade-up d4`}>
              {["Private deployment", "AI agents", "Workflow automation", "Knowledge-grounded"].map(t => (
                <span key={t} className="tag-teal">{t}</span>
              ))}
            </div>

            <div className={`${styles.hero__ctas} anim-fade-up d5`}>
              <Link href="/contact" className={`btn-primary ${styles.hero__ctaPrimary}`}>
                Book an AI Discovery Session
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/solutions" className={`btn-secondary ${styles.hero__ctaSecondary}`}>
                Explore Solutions
              </Link>
            </div>
          </div>

          {/* Right: Architecture data-flow diagram */}
          <div className={`anim-fade-scale d3 ${styles.hero__diagram}`}>
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
      sub: "People · Teams · Workflows · Policies",
      color: "rgba(245,166,35,0.12)",
      border: "rgba(245,166,35,0.3)",
      text: "var(--cuxton-amber)",
    },
    {
      label: "AI Infrastructure",
      sub: "Selected models · Compute · Security",
      color: "rgba(27,107,138,0.1)",
      border: "rgba(27,107,138,0.28)",
      text: "var(--cuxton-teal-light)",
    },
    {
      label: "Secure Data & Knowledge",
      sub: "Databases · Documents · Permissions · Retrieval",
      color: "rgba(27,107,138,0.07)",
      border: "rgba(27,107,138,0.2)",
      text: "var(--cuxton-teal-light)",
    },
    {
      label: "AI Applications",
      sub: "Assistants · Agents · Automations · Analytics",
      color: "rgba(245,166,35,0.07)",
      border: "rgba(245,166,35,0.2)",
      text: "var(--cuxton-amber)",
    },
  ];

  return (
    <div className={styles.diagram}>
      <div className={styles.diagram__glow} />

      <p className={styles.diagram__label}>
        Controlled Environment
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
        Illustrative architecture — actual design depends on client requirements
      </p>
    </div>
  );
}
