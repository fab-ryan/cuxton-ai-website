import Link from "next/link";
import styles from "./aiTutorSection.module.css";

export const AITutorSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>
              Your Personal AI Tutor
            </h2>
            <p className={styles.subtitle}>
              Learn from an AI assistant that understands your course, adapts to your pace, and helps you go deeper.
            </p>

            <ul className={styles.features}>
              <li>
                <span className={styles.check}>✓</span>
                <div>
                  <strong>Course-Aware:</strong> The tutor understands what you're learning right now
                </div>
              </li>
              <li>
                <span className={styles.check}>✓</span>
                <div>
                  <strong>Adaptive:</strong> Adjusts explanations based on your learning pace and style
                </div>
              </li>
              <li>
                <span className={styles.check}>✓</span>
                <div>
                  <strong>Encouraging:</strong> Asks guiding questions instead of just giving answers
                </div>
              </li>
              <li>
                <span className={styles.check}>✓</span>
                <div>
                  <strong>Available 24/7:</strong> Get help anytime you need it, at your convenience
                </div>
              </li>
              <li>
                <span className={styles.check}>✓</span>
                <div>
                  <strong>Supportive:</strong> Helps you understand concepts deeply, not just memorize
                </div>
              </li>
            </ul>

            <Link href="/ai-tutor" className={styles.cta}>
              Meet Your AI Tutor
            </Link>
          </div>

          <div className={styles.demo}>
            <div className={styles.chatBox}>
              <div className={styles.chatHeader}>AI Tutor</div>
              <div className={styles.chat}>
                <div className={styles.tutorMessage}>
                  <div className={styles.avatar}>🤖</div>
                  <div className={styles.message}>
                    Let's break down async/await. Before I explain it, what do you think happens when a function needs to wait for something to finish?
                  </div>
                </div>
                <div className={styles.studentMessage}>
                  <div className={styles.message}>
                    I'm not sure... does the program just pause?
                  </div>
                  <div className={styles.avatar}>👤</div>
                </div>
                <div className={styles.tutorMessage}>
                  <div className={styles.avatar}>🤖</div>
                  <div className={styles.message}>
                    Good thinking! In JavaScript, it's actually more interesting. The program doesn't freeze...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
