import Link from "next/link";
import styles from "./heroSection.module.css";

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            CuxtonAI Academy University
          </h1>

          <p className={styles.tagline}>
            Leading education in artificial intelligence, computer science, and technological innovation
          </p>

          <p className={styles.subtext}>
            Join a community of scholars, researchers, and innovators shaping the future of technology through rigorous academic programs and cutting-edge research.
          </p>

          <div className={styles.ctas}>
            <Link href="/admissions" className={styles.ctaPrimary}>
              Apply Now
            </Link>
            <Link href="/about" className={styles.ctaSecondary}>
              Learn About Us
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5,000+</div>
              <div className={styles.statLabel}>Students</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>150+</div>
              <div className={styles.statLabel}>Faculty Members</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Programs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
