import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/university/PageIntro";
import { SchoolCard } from "@/components/university/Cards";
import { ABOUT, FACTS, SCHOOLS, getFaculty } from "@/data/university";
import ui from "@/components/university/ui.module.css";
import styles from "@/components/university/home/home.module.css";
import detail from "@/app/programs/programs.module.css";

export const metadata: Metadata = {
  title: "About the university",
  description:
    "What CuxtonAI Academy University teaches, how it teaches it, and who leads the schools. Five connected disciplines, taught in depth.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const leaders = ABOUT.leadership
    .map((entry) => ({ ...entry, member: getFaculty(entry.slug) }))
    .filter((entry) => entry.member !== undefined);

  return (
    <>
      <PageIntro
        breadcrumbs={[{ label: "About" }]}
        eyebrow="About"
        title="A university with a deliberately narrow subject and a deliberately deep one"
        lead={ABOUT.mission}
        media={{ src: "/university/quad.svg", alt: "", width: 800, height: 600 }}
      />

      <section className={`${ui.section} ${ui.sectionFlush}`} aria-labelledby="position-heading">
        <div className={ui.container}>
          <div className={detail.split}>
            <div>
              <h2 id="position-heading" className={ui.title} style={{ marginBottom: "1.5rem" }}>
                Why the university exists
              </h2>
              <div className={ui.prose}>
                {ABOUT.positioning.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className={detail.aside}>
              <h3 className={detail.asideTitle}>The university in numbers</h3>
              <div className={ui.facts} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                <div className={ui.fact}>
                  <span className={ui.factValue}>{FACTS.schools}</span>
                  <span className={ui.factLabel}>Schools</span>
                </div>
                <div className={ui.fact}>
                  <span className={ui.factValue}>{FACTS.programs}</span>
                  <span className={ui.factLabel}>Programmes</span>
                </div>
                <div className={ui.fact}>
                  <span className={ui.factValue}>{FACTS.researchGroups}</span>
                  <span className={ui.factLabel}>Research groups</span>
                </div>
                <div className={ui.fact}>
                  <span className={ui.factValue}>{FACTS.levels}</span>
                  <span className={ui.factLabel}>Levels of study</span>
                </div>
              </div>
              <p className={ui.cardText} style={{ marginTop: "1.25rem" }}>
                Every figure above counts something this site lists in full. There
                are no head-counts or rankings here, because there is no institution
                behind them to count.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────── */}
      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="values-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>How we teach</span>
            <h2 id="values-heading" className={ui.title}>Four commitments</h2>
            <p className={ui.lead}>
              These are not aspirations printed on a wall. Each one shows up in how
              modules are built and how work is marked.
            </p>
          </div>

          <div className={styles.steps}>
            {ABOUT.values.map((value, index) => (
              <div key={value.title} className={styles.step}>
                <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.stepTitle}>{value.title}</h3>
                <p className={styles.stepText}>{value.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ──────────────────────────────────────── */}
      <section className={ui.section} aria-labelledby="leadership-heading">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>Leadership</span>
              <h2 id="leadership-heading" className={ui.title}>Deans and chairs</h2>
              <p className={ui.lead}>
                The schools are led by people who still teach. Each name below
                convenes modules as well as running a school.
              </p>
            </div>
            <Link href="/faculty" className={ui.linkRow}>
              All faculty <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={`${ui.gridGap} ${ui.cols4}`}>
            {leaders.map(({ member, role }) => (
              <article key={member!.slug} className={ui.card} style={{ padding: 0 }}>
                <div className={ui.cardMedia} style={{ aspectRatio: "1 / 1" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member!.portrait} alt="" width={480} height={480} loading="lazy" />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 className={ui.cardTitle} style={{ marginBottom: "0.25rem" }}>{member!.name}</h3>
                  <p className={ui.cardText} style={{ color: "var(--cuxton-teal-text)" }}>{role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schools ─────────────────────────────────────────── */}
      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="schools-heading">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>Structure</span>
              <h2 id="schools-heading" className={ui.title}>The five schools</h2>
            </div>
            <Link href="/programs" className={ui.linkRow}>
              Browse programmes <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={`${ui.gridGap} ${ui.cols3}`}>
            {SCHOOLS.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
