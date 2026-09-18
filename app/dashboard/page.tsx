import type { Metadata } from "next";
import Link from "next/link";
import {
  SAMPLE_STUDENT,
  SAMPLE_ENROLLMENTS,
  SAMPLE_SKILLS,
  SAMPLE_LESSON_PROGRESS,
  SAMPLE_RECOMMENDED_PRACTICE,
} from "@/data/studentData";
import { SAMPLE_COURSES } from "@/data/courses";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your learning dashboard. Track progress, continue courses, and get AI tutoring.",
};

export default function DashboardPage() {
  // Find current course details
  const currentEnrollment = SAMPLE_ENROLLMENTS.find((e) => e.status === "in_progress");
  const currentCourse = currentEnrollment
    ? SAMPLE_COURSES.find((c) => c.id === currentEnrollment.courseId)
    : null;

  const completedLessons = SAMPLE_LESSON_PROGRESS.filter((l) => l.completed).length;
  const totalLessons = SAMPLE_LESSON_PROGRESS.length;

  return (
    <div className={styles.page}>
      {/* Welcome Section */}
      <section className={styles.welcome}>
        <div className={styles.container}>
          <h1 className={styles.greeting}>
            Welcome back, <span className={styles.name}>{SAMPLE_STUDENT.name}</span>
          </h1>
          <p className={styles.subtitle}>
            You're on a {SAMPLE_STUDENT.currentStreak}-day learning streak! Keep it up.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {/* Continue Learning */}
              {currentCourse && (
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Continue Learning</h2>
                  <div className={styles.courseCard}>
                    <div className={styles.courseImageSmall}>
                      <div className={styles.imagePlaceholder}>{currentCourse.id}</div>
                    </div>
                    <div className={styles.courseInfo}>
                      <h3 className={styles.courseName}>{currentCourse.title}</h3>
                      <p className={styles.courseDesc}>{currentCourse.description}</p>

                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${currentEnrollment!.progress}%` }}
                        />
                      </div>
                      <p className={styles.progressText}>
                        {currentEnrollment!.progress}% Complete
                      </p>

                      <Link
                        href={`/courses/${currentCourse.id}`}
                        className={styles.continueBtn}
                      >
                        Continue Course →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Today's Learning */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Today's Learning</h2>
                <div className={styles.todayContent}>
                  <div className={styles.todayItem}>
                    <div className={styles.todayLabel}>Completed Lessons</div>
                    <div className={styles.todayValue}>{completedLessons}</div>
                    <div className={styles.todayContext}>of {totalLessons}</div>
                  </div>
                  <div className={styles.todayItem}>
                    <div className={styles.todayLabel}>Time Learned</div>
                    <div className={styles.todayValue}>2h 35m</div>
                    <div className={styles.todayContext}>this week</div>
                  </div>
                  <div className={styles.todayItem}>
                    <div className={styles.todayLabel}>Current Streak</div>
                    <div className={styles.todayValue}>🔥 {SAMPLE_STUDENT.currentStreak}</div>
                    <div className={styles.todayContext}>days</div>
                  </div>
                </div>
              </div>

              {/* Skill Progress */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Your Skills</h2>
                <div className={styles.skillsList}>
                  {SAMPLE_SKILLS.slice(0, 5).map((skill) => (
                    <div key={skill.skill} className={styles.skillItem}>
                      <div className={styles.skillHeader}>
                        <span className={styles.skillName}>{skill.skill}</span>
                        <span className={styles.skillLevel}>{skill.level}</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div
                          className={styles.skillFill}
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.rightColumn}>
              {/* AI Tutor Quick Access */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Ask Your AI Tutor</h2>
                <p className={styles.tutorDesc}>
                  Have a question about what you're learning? Get personalized help anytime.
                </p>
                <Link href="/ai-tutor" className={styles.tutorBtn}>
                  Open AI Tutor
                </Link>
              </div>

              {/* Recommended Practice */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Recommended Practice</h2>
                <div className={styles.practiceList}>
                  {SAMPLE_RECOMMENDED_PRACTICE.map((practice) => (
                    <div key={practice.id} className={styles.practiceItem}>
                      <div className={styles.practiceIcon}>
                        {practice.type === "coding_challenge" && "💻"}
                        {practice.type === "quiz" && "📝"}
                        {practice.type === "project" && "🚀"}
                      </div>
                      <div className={styles.practiceInfo}>
                        <h4 className={styles.practiceName}>{practice.title}</h4>
                        <p className={styles.practiceDesc}>{practice.description}</p>
                        <div className={styles.practiceMeta}>
                          <span className={styles.duration}>{practice.duration} min</span>
                          <span className={styles.difficulty}>{practice.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Stats */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Learning Stats</h2>
                <div className={styles.statsContent}>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Total Hours Learned</span>
                    <span className={styles.statValue}>{SAMPLE_STUDENT.totalHoursLearned}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Courses Enrolled</span>
                    <span className={styles.statValue}>{SAMPLE_ENROLLMENTS.length}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Courses Completed</span>
                    <span className={styles.statValue}>
                      {SAMPLE_ENROLLMENTS.filter((e) => e.status === "completed").length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Enrollments */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>All Courses</h2>
                <div className={styles.enrollmentsList}>
                  {SAMPLE_ENROLLMENTS.map((enrollment) => {
                    const course = SAMPLE_COURSES.find((c) => c.id === enrollment.courseId);
                    if (!course) return null;

                    return (
                      <Link
                        key={enrollment.id}
                        href={`/courses/${course.id}`}
                        className={`${styles.enrollmentItem} ${styles[enrollment.status]}`}
                      >
                        <div className={styles.enrollmentInfo}>
                          <h4>{course.title}</h4>
                          <p>{enrollment.progress}% complete</p>
                        </div>
                        <span className={styles.status}>{enrollment.status.replace("_", " ")}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
