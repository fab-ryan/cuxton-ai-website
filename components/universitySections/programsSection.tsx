import Link from "next/link";
import styles from "./programsSection.module.css";

const programs = [
  {
    id: "bachelor-ai",
    name: "Bachelor of Science in Artificial Intelligence",
    description: "A comprehensive four-year program covering machine learning, neural networks, natural language processing, and AI ethics.",
    degree: "B.S.",
    duration: "4 years",
  },
  {
    id: "master-ml",
    name: "Master of Science in Machine Learning",
    description: "Advanced research-focused program for graduate students specializing in deep learning and advanced AI applications.",
    degree: "M.S.",
    duration: "2 years",
  },
  {
    id: "bachelor-cs",
    name: "Bachelor of Science in Computer Science",
    description: "Foundational computer science education with emphasis on software engineering, algorithms, and systems design.",
    degree: "B.S.",
    duration: "4 years",
  },
  {
    id: "phd-ai",
    name: "Doctor of Philosophy in Artificial Intelligence",
    description: "Research doctoral program for scholars conducting groundbreaking research in AI and machine intelligence.",
    degree: "Ph.D.",
    duration: "5-6 years",
  },
  {
    id: "master-cs",
    name: "Master of Science in Computer Science",
    description: "Graduate program covering advanced topics in distributed systems, cybersecurity, and computational theory.",
    degree: "M.S.",
    duration: "2 years",
  },
  {
    id: "certificate",
    name: "Professional Certificate in AI Engineering",
    description: "For working professionals seeking to advance their expertise in applied artificial intelligence and machine learning.",
    degree: "Certificate",
    duration: "1 year",
  },
];

export const ProgramsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Academic Programs</h2>
          <p className={styles.subtitle}>
            Discover our range of degree and certificate programs in artificial intelligence and computer science
          </p>
        </div>

        <div className={styles.programGrid}>
          {programs.map((program) => (
            <Link key={program.id} href={`/programs/${program.id}`} className={styles.programCard}>
              <div className={styles.programHeader}>
                <span className={styles.degree}>{program.degree}</span>
                <span className={styles.duration}>{program.duration}</span>
              </div>

              <h3 className={styles.programName}>{program.name}</h3>
              <p className={styles.programDesc}>{program.description}</p>

              <div className={styles.link}>
                Learn More
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/programs" className={styles.viewAllBtn}>
            View All Programs
          </Link>
        </div>
      </div>
    </section>
  );
};
