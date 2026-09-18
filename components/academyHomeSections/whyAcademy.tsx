import styles from "./whyAcademy.module.css";

const reasons = [
  {
    icon: "🎓",
    title: "Expert-Designed Courses",
    description: "Learn from carefully structured courses built by industry experts and educators.",
  },
  {
    icon: "🤖",
    title: "Personalized AI Tutoring",
    description: "Get one-on-one guidance from an AI tutor that adapts to your learning pace.",
  },
  {
    icon: "💪",
    title: "Practice & Feedback",
    description: "Hands-on exercises with instant feedback to reinforce what you learn.",
  },
  {
    icon: "📊",
    title: "Track Your Progress",
    description: "Visualize your learning journey and see exactly how far you've come.",
  },
  {
    icon: "🛣️",
    title: "Learning Paths",
    description: "Follow curated paths that guide you from beginner to expert in any skill.",
  },
  {
    icon: "🏆",
    title: "Real Skills",
    description: "Learn practical abilities you can immediately apply in real projects.",
  },
];

export const WhyAcademySection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why CuxtonAI Academy?</h2>
          <p className={styles.subtitle}>
            We've designed a learning platform that works the way your brain learns best.
          </p>
        </div>

        <div className={styles.grid}>
          {reasons.map((reason, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{reason.icon}</div>
              <h3 className={styles.cardTitle}>{reason.title}</h3>
              <p className={styles.cardDescription}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
