import Link from "next/link";
import styles from "./newsEventsSection.module.css";

const newsItems = [
  {
    id: 1,
    title: "CuxtonAI Researchers Publish Groundbreaking Study on AI Ethics",
    date: "September 15, 2026",
    category: "Research",
    excerpt: "New research from our faculty explores ethical frameworks for responsible AI development.",
  },
  {
    id: 2,
    title: "Annual AI Innovation Summit Brings Industry Leaders to Campus",
    date: "September 10, 2026",
    category: "Event",
    excerpt: "Students and faculty engaged with leaders from major technology companies in two-day summit.",
  },
  {
    id: 3,
    title: "Class of 2026 Celebrates Commencement",
    date: "September 5, 2026",
    category: "News",
    excerpt: "Our graduates are prepared to shape the future of artificial intelligence across industries.",
  },
];

export const NewsEventsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>News & Events</h2>
          <p className={styles.subtitle}>
            Stay informed about what is happening at CuxtonAI Academy University
          </p>
        </div>

        <div className={styles.newsGrid}>
          {newsItems.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`} className={styles.newsCard}>
              <div className={styles.newsHeader}>
                <span className={styles.category}>{item.category}</span>
                <span className={styles.date}>{item.date}</span>
              </div>

              <h3 className={styles.newsTitle}>{item.title}</h3>
              <p className={styles.newsExcerpt}>{item.excerpt}</p>

              <div className={styles.readMore}>
                Read Article
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/news" className={styles.viewAllBtn}>
            View All News & Events
          </Link>
        </div>
      </div>
    </section>
  );
};
