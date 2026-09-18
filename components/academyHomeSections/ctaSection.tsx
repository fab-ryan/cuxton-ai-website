import Link from "next/link";
import styles from "./ctaSection.module.css";

export const CTASection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Ready to Start Learning?</h2>
        <p className={styles.subtitle}>
          Join thousands of students who are mastering new skills with CuxtonAI Academy.
        </p>

        <div className={styles.ctas}>
          <Link href="/courses" className={styles.ctaPrimary}>
            Explore Courses Today
          </Link>
          <Link href="#why-academy" className={styles.ctaSecondary}>
            Learn More
          </Link>
        </div>

        <p className={styles.footer}>
          <strong>No credit card required.</strong> Get started free and explore our courses.
        </p>
      </div>
    </section>
  );
};
