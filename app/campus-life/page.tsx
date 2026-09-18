import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/university/PageIntro";
import { CAMPUS_LIFE } from "@/data/university";
import ui from "@/components/university/ui.module.css";
import styles from "@/components/university/home/home.module.css";

export const metadata: Metadata = {
  title: "Campus life",
  description:
    "Facilities, housing, societies and student support at CuxtonAI Academy University.",
  alternates: { canonical: "/campus-life" },
};

export default function CampusLifePage() {
  return (
    <>
      <PageIntro
        breadcrumbs={[{ label: "Campus life" }]}
        eyebrow="Campus"
        title="Life outside the timetable"
        lead={CAMPUS_LIFE.intro}
        media={{ src: "/university/commons.svg", alt: "", width: 800, height: 600 }}
        primaryCta={{ label: "Visit on an open day", href: "/news/autumn-open-day" }}
      />

      <section className={`${ui.section} ${ui.sectionFlush}`} aria-labelledby="facilities-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Facilities</span>
            <h2 id="facilities-heading" className={ui.title}>Where you will actually be</h2>
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

      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="housing-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Housing</span>
            <h2 id="housing-heading" className={ui.title}>Where you will live</h2>
            <p className={ui.lead}>
              Housing applications are separate from the application for a place,
              and open once an offer has been accepted.
            </p>
          </div>

          <div className={`${ui.gridGap} ${ui.cols3}`}>
            {CAMPUS_LIFE.housing.map((option) => (
              <article key={option.name} className={ui.card}>
                <h3 className={ui.cardTitle}>{option.name}</h3>
                <p className={ui.cardText}>{option.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={ui.section} aria-labelledby="societies-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Societies</span>
            <h2 id="societies-heading" className={ui.title}>Run by students, for students</h2>
            <p className={ui.lead}>
              Societies are administered by the students&apos; union rather than the
              university. Any student can start one.
            </p>
          </div>

          <div className={`${ui.gridGap} ${ui.cols3}`}>
            {CAMPUS_LIFE.societies.map((society) => (
              <article key={society.name} className={ui.card}>
                <h3 className={ui.cardTitle}>{society.name}</h3>
                <p className={ui.cardText}>{society.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="support-heading">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>Support</span>
              <h2 id="support-heading" className={ui.title}>If something goes wrong</h2>
              <p className={ui.lead}>
                Support services are confidential and independent of academic
                assessment. Using them does not appear on your record.
              </p>
            </div>
            <Link href="/contact" className={ui.linkRow}>
              Contact student services <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.steps}>
            {CAMPUS_LIFE.support.map((service) => (
              <div key={service.title} className={styles.step}>
                <h3 className={styles.stepTitle}>{service.title}</h3>
                <p className={styles.stepText}>{service.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
