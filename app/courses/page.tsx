import type { Metadata } from "next";
import Link from "next/link";
import { SAMPLE_COURSES } from "@/data/courses";
import styles from "./courses.module.css";

export const metadata: Metadata = {
  title: "Browse All Courses",
  description: "Explore hundreds of courses in programming, AI, web development, and more. Learn at your own pace with expert instruction.",
};

export default function CoursesPage() {
  const levelGroups = {
    Beginner: SAMPLE_COURSES.filter((c) => c.level === "Beginner"),
    Intermediate: SAMPLE_COURSES.filter((c) => c.level === "Intermediate"),
    Advanced: SAMPLE_COURSES.filter((c) => c.level === "Advanced"),
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Explore Our Courses</h1>
          <p className={styles.subtitle}>
            Learn from hundreds of expertly-designed courses. Find the perfect course for your goals.
          </p>

          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.active}`}>All</button>
            <button className={styles.filterBtn}>Programming</button>
            <button className={styles.filterBtn}>Web Development</button>
            <button className={styles.filterBtn}>AI & ML</button>
            <button className={styles.filterBtn}>Data</button>
          </div>
        </div>
      </section>

      {/* Courses by Level */}
      <section className={styles.coursesSection}>
        <div className={styles.container}>
          {Object.entries(levelGroups).map(([level, courses]) => (
            courses.length > 0 && (
              <div key={level} className={styles.levelGroup}>
                <h2 className={styles.levelTitle}>{level} Courses</h2>
                <p className={styles.levelDesc}>
                  {level === "Beginner" && "Perfect for those just starting out"}
                  {level === "Intermediate" && "Build on your existing knowledge"}
                  {level === "Advanced" && "Master advanced concepts and patterns"}
                </p>

                <div className={styles.courseGrid}>
                  {courses.map((course) => (
                    <Link key={course.id} href={`/courses/${course.id}`} className={styles.courseCard}>
                      <div className={styles.courseImage}>
                        <div className={styles.imagePlaceholder}>{course.id}</div>
                        <div className={styles.levelBadge}>{course.level}</div>
                      </div>

                      <div className={styles.courseContent}>
                        <h3 className={styles.courseTitle}>{course.title}</h3>
                        <p className={styles.courseDesc}>{course.description}</p>

                        <div className={styles.courseStats}>
                          <div className={styles.stat}>
                            <span className={styles.statLabel}>Duration</span>
                            <span className={styles.statValue}>{course.duration} weeks</span>
                          </div>
                          <div className={styles.stat}>
                            <span className={styles.statLabel}>Students</span>
                            <span className={styles.statValue}>{(course.studentsEnrolled / 1000).toFixed(1)}k</span>
                          </div>
                          <div className={styles.stat}>
                            <span className={styles.statLabel}>Rating</span>
                            <span className={styles.statValue}>⭐ {course.rating}</span>
                          </div>
                        </div>

                        <div className={styles.skills}>
                          {course.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className={styles.skill}>{skill}</span>
                          ))}
                          {course.skills.length > 3 && (
                            <span className={styles.skill}>+{course.skills.length - 3}</span>
                          )}
                        </div>

                        <div className={styles.cta}>
                          <span className={styles.ctaText}>View Course →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>
    </div>
  );
}
