import styles from "./studentLifeSection.module.css";

const lifeAspects = [
  {
    title: "Campus Facilities",
    description: "State-of-the-art research laboratories, computing facilities, and collaborative learning spaces equipped with the latest technology.",
  },
  {
    title: "Student Organizations",
    description: "Join over 80 student clubs and organizations focused on AI research, entrepreneurship, mentorship, and community engagement.",
  },
  {
    title: "Internship & Career Programs",
    description: "Connect with leading technology companies through internships, career fairs, and industry mentorship opportunities.",
  },
  {
    title: "Research Opportunities",
    description: "Engage in cutting-edge research projects alongside world-renowned faculty members and contribute to advancing the field.",
  },
  {
    title: "Scholarships & Financial Aid",
    description: "Merit-based and need-based scholarships to support talented students from diverse backgrounds.",
  },
  {
    title: "Student Support Services",
    description: "Academic advising, mental health services, career counseling, and community resources to support your success.",
  },
];

export const StudentLifeSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Student Life at CuxtonAI Academy</h2>
          <p className={styles.subtitle}>
            Experience a vibrant campus community dedicated to academic excellence, innovation, and personal growth
          </p>
        </div>

        <div className={styles.grid}>
          {lifeAspects.map((aspect, index) => (
            <div key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{aspect.title}</h3>
              <p className={styles.cardDesc}>{aspect.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
