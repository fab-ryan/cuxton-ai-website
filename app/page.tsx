import type { Metadata } from "next";
import Link from "next/link";
import HomeHero from "@/components/university/home/HomeHero";
import { NewsCard, ProgramCard, SchoolCard, formatDate } from "@/components/university/Cards";
import {
  ABOUT,
  CAMPUS_LIFE,
  EVENTS,
  NEWS,
  PROGRAMS,
  SCHOOLS,
  getSchool,
} from "@/data/university";
import ui from "@/components/university/ui.module.css";
import styles from "@/components/university/home/home.module.css";

export const metadata: Metadata = {
  title: "CuxtonAI Academy University | Artificial intelligence, computing and data",
  description:
    "A university for artificial intelligence, computing, data, security and digital business. Undergraduate, graduate, doctoral and professional programmes across five schools.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CuxtonAI Academy University",
    description:
      "Five schools teaching artificial intelligence, computing, data, security and digital business, from undergraduate degrees to doctoral research.",
    url: "/",
  },
};

/* The teaching sequence, stated once here and referenced from the about
   page. It is the argument for how the university works. */
const SEQUENCE = [
  {
    num: "Stage one",
    title: "Understand",
    text: "Lectures and seminars establish the method and the mathematics underneath it. You are expected to be able to derive it, not recognise it.",
  },
  {
    num: "Stage two",
    title: "Build",
    text: "Every taught module carries laboratory or studio work. You implement the method, break it, and find out where it stops holding.",
  },
  {
    num: "Stage three",
    title: "Be examined",
    text: "Work is assessed on what it demonstrates: coursework, written examination, and a defence of your reasoning where the module warrants one.",
  },
  {
    num: "Stage four",
    title: "Advance",
    text: "Each stage opens the next, through options, a final-year project, and for some students a dissertation or a doctorate.",
  },
];

const featured = PROGRAMS.filter((p) =>
  [
    "bsc-artificial-intelligence",
    "bsc-computer-science",
    "msc-machine-learning",
    "bsc-data-science",
    "msc-cybersecurity",
    "cert-applied-ai",
  ].includes(p.slug)
);

export default function HomePage() {
  const upcoming = EVENTS.slice(0, 4);
  const latest = NEWS.slice(0, 3);

  return (
    <>
      <HomeHero />

      {/* ── Schools ─────────────────────────────────────────── */}
      <section className={`${ui.section} ${ui.sectionFlush}`} aria-labelledby="schools-heading">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>The schools</span>
              <h2 id="schools-heading" className={ui.title}>
                One subject, approached from five directions
              </h2>
              <p className={ui.lead}>
                The schools share a first year wherever the material overlaps, and
                students move between them for options and projects. That is the
                point: these disciplines are not separable in practice, so they are
                not taught as though they were.
              </p>
            </div>
            <Link href="/programs" className={ui.linkRow}>
              All programmes <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={`${ui.gridGap} ${ui.cols3}`}>
            {SCHOOLS.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured programmes ─────────────────────────────── */}
      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="programs-heading">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>Study here</span>
              <h2 id="programs-heading" className={ui.title}>Programmes</h2>
              <p className={ui.lead}>
                Undergraduate degrees, taught master&apos;s programmes, doctoral
                research and short professional certificates. Every programme page
                sets out the full curriculum, how it is assessed, and what is
                required to be admitted.
              </p>
            </div>
            <Link href="/programs" className={ui.linkRow}>
              Browse all {PROGRAMS.length} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={`${ui.gridGap} ${ui.cols3}`}>
            {featured.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How study works ─────────────────────────────────── */}
      <section className={ui.section} aria-labelledby="sequence-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>How study works</span>
            <h2 id="sequence-heading" className={ui.title}>
              Understand it, build it, then defend it
            </h2>
            <p className={ui.lead}>
              The same sequence runs through every module at every level. Nothing
              is completed by attendance, and nothing is assessed on recall alone.
            </p>
          </div>

          <div className={styles.steps}>
            {SEQUENCE.map((stage) => (
              <div key={stage.title} className={styles.step}>
                <span className={styles.stepNum}>{stage.num}</span>
                <h3 className={styles.stepTitle}>{stage.title}</h3>
                <p className={styles.stepText}>{stage.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research ────────────────────────────────────────── */}
      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="research-heading">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>Research</span>
              <h2 id="research-heading" className={ui.title}>
                The people who publish are the people who teach
              </h2>
              <p className={ui.lead}>
                Research groups sit inside the schools rather than alongside them.
                Undergraduate project students work within active groups, and
                doctoral candidates teach.
              </p>
            </div>
            <Link href="/research" className={ui.linkRow}>
              Research at the university <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.researchList}>
            {ABOUT.research.map((group) => (
              <div key={group.title} className={styles.researchRow}>
                <h3 className={styles.researchTitle}>{group.title}</h3>
                <p className={styles.researchDetail}>{group.detail}</p>
                <span className={styles.researchSchool}>{getSchool(group.school)?.short}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Campus ──────────────────────────────────────────── */}
      <section className={ui.section} aria-labelledby="campus-heading">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>On campus</span>
              <h2 id="campus-heading" className={ui.title}>Where the work happens</h2>
              <p className={ui.lead}>{CAMPUS_LIFE.intro}</p>
            </div>
            <Link href="/campus-life" className={ui.linkRow}>
              Campus life <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={`${ui.gridGap} ${ui.cols4}`}>
            {CAMPUS_LIFE.facilities.map((facility) => (
              <article key={facility.title} className={ui.card} style={{ padding: 0 }}>
                <div className={ui.cardMedia}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={facility.image} alt="" width={800} height={600} loading="lazy" />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 className={ui.cardTitle}>{facility.title}</h3>
                  <p className={ui.cardText}>{facility.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── News and events ─────────────────────────────────── */}
      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="news-heading">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>News and events</span>
              <h2 id="news-heading" className={ui.title}>What is happening</h2>
            </div>
            <Link href="/news" className={ui.linkRow}>
              All news and events <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={`${ui.gridGap} ${ui.cols3}`}>
            {latest.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>

          <h3 className={ui.titleSm} style={{ marginTop: "3.5rem" }}>Coming up</h3>
          <div className={styles.events}>
            {upcoming.map((event) => (
              <div key={event.title} className={styles.event}>
                <time className={styles.eventDate} dateTime={event.date}>
                  {formatDate(event.date)}
                </time>
                <div>
                  <p className={styles.eventTitle}>{event.title}</p>
                  <p className={styles.eventDetail}>{event.detail}</p>
                </div>
                <span className={styles.eventMeta}>{event.venue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ─────────────────────────────────────────── */}
      <section className={`${styles.cta} on-dark`} aria-labelledby="cta-heading">
        <div className={ui.container}>
          <div className={styles.ctaGrid}>
            <div>
              <h2 id="cta-heading" className={styles.ctaTitle}>
                Come and see whether it suits you
              </h2>
              <p className={styles.ctaLead}>
                Applications are considered as they arrive rather than held to a
                single decision date. If you are undecided between two programmes,
                the admissions office will talk it through with you before you
                apply.
              </p>
            </div>

            <div className={styles.ctaRoutes}>
              <Link href="/admissions" className={styles.ctaRoute}>
                <span>
                  <span className={styles.ctaRouteTitle}>Apply</span>
                  <span className={styles.ctaRouteText}>
                    Entry requirements, the four-step process and what to prepare.
                  </span>
                </span>
                <span className={styles.ctaArrow} aria-hidden="true">→</span>
              </Link>
              <Link href="/news/autumn-open-day" className={styles.ctaRoute}>
                <span>
                  <span className={styles.ctaRouteTitle}>Visit</span>
                  <span className={styles.ctaRouteText}>
                    Open days, laboratory tours and the admissions clinic.
                  </span>
                </span>
                <span className={styles.ctaArrow} aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className={styles.ctaRoute}>
                <span>
                  <span className={styles.ctaRouteTitle}>Ask a question</span>
                  <span className={styles.ctaRouteText}>
                    Admissions, student services and the research office.
                  </span>
                </span>
                <span className={styles.ctaArrow} aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
