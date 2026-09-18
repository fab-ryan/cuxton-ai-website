import Link from "next/link";
import styles from "./academyHero.module.css";

export const AcademyHeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.background} />
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Learn anything.<br />
            Build real skills.<br />
            <span className={styles.highlight}>Grow with AI.</span>
          </h1>

          <p className={styles.subheading}>
            CuxtonAI Academy combines structured courses, personalized AI tutoring, hands-on practice, and assessments to help you learn with confidence.
          </p>

          <div className={styles.features}>
            {[
              "Learn from expert-designed courses",
              "Get personalized AI tutoring",
              "Practice and get instant feedback",
            ].map((feature) => (
              <div key={feature} className={styles.feature}>
                <div className={styles.checkmark}>✓</div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className={styles.ctas}>
            <Link href="/courses" className={styles.ctaPrimary}>
              Explore Courses
            </Link>
            <Link href="#how-it-works" className={styles.ctaSecondary}>
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
