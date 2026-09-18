import Link from "next/link";
import { SAMPLE_COURSES } from "@/data/courses";
import styles from "./featuredCourses.module.css";

export const FeaturedCoursesSection = () => {
  const featured = SAMPLE_COURSES.slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Courses</h2>
          <p className={styles.subtitle}>Start your learning journey with our most popular courses</p>
        </div>

        <div className={styles.courseGrid}>
          {featured.map((course) => (
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
                  <span className={styles.ctaText}>Explore Course →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/courses" className={styles.viewAll}>
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};
