import Link from "next/link";
import styles from "./aboutSection.module.css";

export const AboutSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>About CuxtonAI Academy University</h2>

            <p className={styles.paragraph}>
              Founded on the principles of academic excellence and innovation, CuxtonAI Academy University stands at the forefront of artificial intelligence education and research. Our institution is dedicated to preparing the next generation of AI pioneers, engineers, and researchers.
            </p>

            <p className={styles.paragraph}>
              With over two decades of leadership in AI education, we maintain partnerships with leading technology companies, research institutions, and industry leaders worldwide. Our faculty includes award-winning researchers, practitioners, and thought leaders in artificial intelligence.
            </p>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <div className={styles.highlightTitle}>World-Class Faculty</div>
                <p className={styles.highlightDesc}>Learn from leading researchers and industry experts in artificial intelligence and computer science</p>
              </div>
              <div className={styles.highlight}>
                <div className={styles.highlightTitle}>Cutting-Edge Research</div>
                <p className={styles.highlightDesc}>Participate in groundbreaking research projects that advance the field of artificial intelligence</p>
              </div>
              <div className={styles.highlight}>
                <div className={styles.highlightTitle}>Industry Partnerships</div>
                <p className={styles.highlightDesc}>Benefit from collaborations with leading technology companies and industry organizations</p>
              </div>
            </div>

            <Link href="/about" className={styles.learnMoreBtn}>
              Learn More About Us
            </Link>
          </div>

          <div className={styles.statsBox}>
            <div className={styles.statItem}>
              <div className={styles.statNum}>150+</div>
              <div className={styles.statText}>Faculty Members</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNum}>5000+</div>
              <div className={styles.statText}>Current Students</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNum}>50+</div>
              <div className={styles.statText}>Academic Programs</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNum}>25,000+</div>
              <div className={styles.statText}>Alumni Worldwide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
