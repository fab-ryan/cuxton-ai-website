import Link from "next/link";
import styles from "./ui.module.css";
import type { FacultyMember, NewsArticle, Program, School } from "@/data/university";
import { getSchool, programsBySchool } from "@/data/university";

/* Shared card set. Each one is a single link so the whole surface is
   the target, and the arrow in the footer is decorative only. */

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export function ProgramCard({ program }: { program: Program }) {
  const school = getSchool(program.school);
  return (
    <Link href={`/programs/${program.slug}`} className={styles.card}>
      <div className={styles.metaRow}>
        <span className={styles.pillAccent + " " + styles.pill}>{program.award}</span>
        <span className={styles.pill}>{program.level}</span>
      </div>
      <h3 className={styles.cardTitle}>{program.name}</h3>
      <p className={styles.cardText}>{program.summary}</p>
      <div className={styles.metaRow} style={{ marginTop: "1.25rem", marginBottom: 0 }}>
        <span>{program.duration}</span>
        <span aria-hidden="true">·</span>
        <span>{school?.short}</span>
      </div>
      <div className={styles.cardFoot}>
        View programme <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

export function SchoolCard({ school }: { school: School }) {
  const count = programsBySchool(school.slug).length;
  return (
    <Link href={`/programs?school=${school.slug}`} className={styles.card} style={{ padding: 0 }}>
      <span className={styles.cardMedia}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={school.image} alt="" width={800} height={600} loading="lazy" />
      </span>
      <span style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 className={styles.cardTitle}>{school.name}</h3>
        <p className={styles.cardText}>{school.summary}</p>
        <span className={styles.cardFoot}>
          {count} {count === 1 ? "programme" : "programmes"} <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
}

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className={styles.card} style={{ padding: 0 }}>
      <span className={styles.cardMedia}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image} alt="" width={800} height={450} loading="lazy" />
      </span>
      <span style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <span className={styles.metaRow}>
          <span className={`${styles.pill} ${styles.pillTeal}`}>{article.category}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </span>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <p className={styles.cardText}>{article.excerpt}</p>
        <span className={styles.cardFoot}>
          Read article <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
}

export function FacultyCard({ member }: { member: FacultyMember }) {
  const school = getSchool(member.school);
  return (
    <article id={member.slug} className={styles.card} style={{ padding: 0, scrollMarginTop: "calc(var(--nav-h) + 1.5rem)" }}>
      <div className={styles.cardMedia} style={{ aspectRatio: "1 / 1" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={member.portrait} alt="" width={480} height={480} loading="lazy" />
      </div>
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 className={styles.cardTitle} style={{ marginBottom: "0.25rem" }}>{member.name}</h3>
        <p className={styles.cardText} style={{ color: "var(--cuxton-teal-text)", marginBottom: "0.75rem" }}>
          {member.title}
        </p>
        <p className={styles.cardText}>{member.bio}</p>
        <div className={styles.metaRow} style={{ marginTop: "1.25rem", marginBottom: 0 }}>
          <span>{school?.short}</span>
        </div>
        <ul className={styles.metaRow} style={{ marginTop: "0.75rem", marginBottom: 0, listStyle: "none", padding: 0 }}>
          {member.interests.map((interest) => (
            <li key={interest} className={styles.pill}>{interest}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export { formatDate };
