import Link from "next/link";
import styles from "./ctaSection.module.css";

export const CTASection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Join Our Community</h2>
          <p className={styles.subtitle}>
            Begin your journey in artificial intelligence and computer science at CuxtonAI Academy University
          </p>

          <div className={styles.ctas}>
            <Link href="/admissions" className={styles.ctaPrimary}>
              Apply Now
            </Link>
            <Link href="/contact" className={styles.ctaSecondary}>
              Contact Admissions
            </Link>
          </div>

          <p className={styles.footer}>
            Admissions are open for Fall and Spring sessions. Learn about our application requirements and financial aid options.
          </p>
        </div>
      </div>
    </section>
  );
};
