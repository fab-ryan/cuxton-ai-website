import Link from "next/link";
import styles from "./hero.module.css";
import { FACTS } from "@/data/university";

/* Figures come from FACTS, which counts the content in data/university.ts.
   Nothing here is asserted that the site cannot itself show. */
const facts = [
  { value: String(FACTS.schools), label: "Schools, taught as one connected subject" },
  { value: String(FACTS.programs), label: "Programmes currently listed" },
  { value: String(FACTS.levels), label: "Levels, from undergraduate to doctoral" },
  { value: String(FACTS.researchGroups), label: "Research groups across the university" },
];

export default function HomeHero() {
  return (
    <section className={`${styles.hero} on-dark`} aria-labelledby="home-hero-title">
      <div className="section-container">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>CuxtonAI Academy University</span>

            <h1 id="home-hero-title" className={styles.title}>
              A university for artificial intelligence, computing and data.
            </h1>

            <p className={styles.lead}>
              Five schools, taught in depth and taught together. Degrees from
              undergraduate to doctoral, with practical work in every module and
              the judgement to use it examined alongside the method.
            </p>

            <div className={styles.actions}>
              <Link href="/programs" className={styles.primary}>Explore programmes</Link>
              <Link href="/admissions" className={styles.secondary}>How to apply</Link>
            </div>
          </div>

          <div className={styles.art} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/university/hero-campus.svg" alt="" width={1600} height={900} />
          </div>
        </div>

        <div className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <span className={styles.factValue}>{fact.value}</span>
              <span className={styles.factLabel}>{fact.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
