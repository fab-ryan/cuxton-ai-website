import styles from "./howItWorks.module.css";

const steps = [
  {
    number: 1,
    title: "Choose Your Course",
    description: "Pick a course that matches your learning goals. We have paths for every skill level.",
  },
  {
    number: 2,
    title: "Learn From Experts",
    description: "Study carefully structured lessons with real-world examples and best practices.",
  },
  {
    number: 3,
    title: "Practice & Apply",
    description: "Solve exercises, build projects, and get instant feedback on your work.",
  },
  {
    number: 4,
    title: "Get AI Tutoring",
    description: "Ask questions anytime. Our AI tutor helps you understand concepts deeper.",
  },
  {
    number: 5,
    title: "Track Progress",
    description: "Watch your skills grow. See exactly what you've learned and what's next.",
  },
  {
    number: 6,
    title: "Master & Grow",
    description: "Complete courses, earn achievements, and apply your skills in real projects.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>How Learning Works</h2>
          <p className={styles.subtitle}>
            A proven learning methodology that helps you understand concepts deeply and retain skills
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.methodology}>
          <h3 className={styles.methodologyTitle}>The Learning Loop</h3>
          <div className={styles.loop}>
            <div className={styles.loopItem}>
              <span className={styles.loopLabel}>Learn</span>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.loopItem}>
              <span className={styles.loopLabel}>Practice</span>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.loopItem}>
              <span className={styles.loopLabel}>Get Feedback</span>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.loopItem}>
              <span className={styles.loopLabel}>Understand</span>
            </div>
          </div>
          <p className={styles.loopDescription}>
            Repeated, deliberate practice builds lasting skills. We structure every course around this loop.
          </p>
        </div>
      </div>
    </section>
  );
};
