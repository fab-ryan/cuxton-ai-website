import type { Metadata } from "next";
import Link from "next/link";
import { SAMPLE_COURSES } from "@/data/courses";
import styles from "./courseDetail.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = SAMPLE_COURSES.find((c) => c.id === slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export async function generateStaticParams() {
  return SAMPLE_COURSES.map((course) => ({
    slug: course.id,
  }));
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = SAMPLE_COURSES.find((c) => c.id === slug);

  if (!course) {
    return (
      <div className={styles.notFound}>
        <h1>Course Not Found</h1>
        <p>The course you're looking for doesn't exist.</p>
        <Link href="/courses">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <Link href="/courses" className={styles.breadcrumb}>
            ← Back to Courses
          </Link>

          <div className={styles.headerGrid}>
            <div className={styles.headerContent}>
              <div className={styles.badges}>
                <span className={styles.levelBadge}>{course.level}</span>
                <span className={styles.instructorBadge}>{course.instructor}</span>
              </div>

              <h1 className={styles.title}>{course.title}</h1>
              <p className={styles.description}>{course.description}</p>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Duration</span>
                  <span className={styles.statValue}>{course.duration} weeks</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Students</span>
                  <span className={styles.statValue}>{(course.studentsEnrolled / 1000).toFixed(1)}k enrolled</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Rating</span>
                  <span className={styles.statValue}>⭐ {course.rating}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Modules</span>
                  <span className={styles.statValue}>{course.modules.length}</span>
                </div>
              </div>

              <Link href="#enroll" className={styles.enrollBtn}>
                Enroll Now
              </Link>
            </div>

            <div className={styles.sideImage}>
              <div className={styles.imagePlaceholder}>{course.id}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            {/* Main Content */}
            <div className={styles.mainContent}>
              {/* Skills */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Skills You'll Learn</h2>
                <div className={styles.skills}>
                  {course.skills.map((skill) => (
                    <span key={skill} className={styles.skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Course Curriculum</h2>
                <p className={styles.sectionSubtitle}>
                  {course.modules.length} modules • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                </p>

                <div className={styles.modules}>
                  {course.modules.map((module, moduleIdx) => (
                    <div key={module.id} className={styles.module}>
                      <button className={styles.moduleHeader}>
                        <div className={styles.moduleNumber}>{moduleIdx + 1}</div>
                        <div className={styles.moduleInfo}>
                          <h3 className={styles.moduleTitle}>{module.title}</h3>
                          <p className={styles.moduleDesc}>{module.description}</p>
                        </div>
                        <span className={styles.lessonCount}>{module.lessons.length} lessons</span>
                      </button>

                      <div className={styles.lessons}>
                        {module.lessons.map((lesson, lessonIdx) => (
                          <div key={lesson.id} className={styles.lesson}>
                            <div className={styles.lessonNumber}>
                              {moduleIdx + 1}.{lessonIdx + 1}
                            </div>
                            <div className={styles.lessonInfo}>
                              <h4 className={styles.lessonTitle}>{lesson.title}</h4>
                              <p className={styles.lessonDesc}>{lesson.description}</p>
                            </div>
                            <div className={styles.lessonMeta}>
                              <span className={styles.duration}>{lesson.duration} min</span>
                              {lesson.hasQuiz && (
                                <span className={styles.quiz}>Quiz</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>About This Course</h3>
                <div className={styles.cardContent}>
                  <div className={styles.info}>
                    <span className={styles.infoLabel}>Instructor</span>
                    <span className={styles.infoValue}>{course.instructor}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoLabel}>Level</span>
                    <span className={styles.infoValue}>{course.level}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoLabel}>Duration</span>
                    <span className={styles.infoValue}>{course.duration} weeks</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoLabel}>Total Lessons</span>
                    <span className={styles.infoValue}>{course.modules.reduce((acc, m) => acc + m.lessons.length, 0)}</span>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <h3 className={styles.cardTitle}>What You'll Get</h3>
                <ul className={styles.benefits}>
                  <li>✓ Expert-designed curriculum</li>
                  <li>✓ Hands-on practice exercises</li>
                  <li>✓ AI tutor support</li>
                  <li>✓ Progress tracking</li>
                  <li>✓ Lifetime access</li>
                  <li>✓ Course certificate</li>
                </ul>
              </div>

              <button id="enroll" className={styles.enrollBtnSidebar}>
                Start Learning
              </button>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
