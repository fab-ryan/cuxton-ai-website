import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/university/PageIntro";
import Faq from "@/components/university/Faq";
import { formatDate } from "@/components/university/Cards";
import { ADMISSIONS, EVENTS, PROGRAMS, UNIVERSITY_CONTACT } from "@/data/university";
import ui from "@/components/university/ui.module.css";
import styles from "./admissions.module.css";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "How to apply to CuxtonAI Academy University: the four-step process, entry requirements by level, fees and funding, key dates and answers to common questions.",
  alternates: { canonical: "/admissions" },
};

export default function AdmissionsPage() {
  const admissionsOffice = UNIVERSITY_CONTACT.offices.find((o) => o.title === "Admissions");
  const dates = EVENTS.filter((e) => e.type === "Deadline" || e.type === "Open day");

  return (
    <>
      <PageIntro
        breadcrumbs={[{ label: "Admissions" }]}
        eyebrow="Admissions"
        title="How to apply"
        lead={ADMISSIONS.intro}
        primaryCta={{ label: "Browse programmes", href: "/programs" }}
        secondaryCta={{ label: "Ask the admissions office", href: "/contact" }}
      />

      <section className={`${ui.section} ${ui.sectionFlush}`} aria-labelledby="process-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>The process</span>
            <h2 id="process-heading" className={ui.title}>Four steps, in order</h2>
            <p className={ui.lead}>
              Applications are considered as they arrive rather than held to a
              single decision date, so applying early genuinely helps.
            </p>
          </div>

          <div className={styles.steps}>
            {ADMISSIONS.steps.map((step) => (
              <div key={step.step} className={styles.step}>
                <span className={styles.stepNum}>{step.step}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="requirements-heading" id="requirements">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>Entry requirements</span>
              <h2 id="requirements-heading" className={ui.title}>What each level asks for</h2>
              <p className={ui.lead}>
                These are the general requirements. Individual programmes add to
                them, and each programme page states its own in full.
              </p>
            </div>
            <Link href="/programs" className={ui.linkRow}>
              Programme pages <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.reqGrid}>
            {ADMISSIONS.requirements.map((group) => {
              const count = PROGRAMS.filter((p) => p.level === group.level).length;
              return (
                <div key={group.level} className={styles.reqCard}>
                  <h3 className={styles.reqLevel}>{group.level}</h3>
                  <span className={styles.reqCount}>
                    {count} {count === 1 ? "programme" : "programmes"}
                  </span>
                  <ul className={ui.checklist}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={ui.section} aria-labelledby="fees-heading" id="fees">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Fees and funding</span>
            <h2 id="fees-heading" className={ui.title}>What it costs, and how that is handled</h2>
            <p className={ui.lead}>
              Figures are set per programme and per academic year and are confirmed
              in the offer letter, so no amount is quoted here that could go out of
              date between the two.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {ADMISSIONS.fees.map((fee) => (
              <div key={fee.title} className={styles.feeRow}>
                <h3 className={styles.feeTitle}>{fee.title}</h3>
                <p className={styles.feeText}>{fee.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="dates-heading">
        <div className={ui.container}>
          <div className={ui.headSplit}>
            <div>
              <span className={ui.eyebrow}>Key dates</span>
              <h2 id="dates-heading" className={ui.title}>Deadlines and open days</h2>
            </div>
            <Link href="/news" className={ui.linkRow}>
              All events <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.dates}>
            {dates.map((event) => (
              <div key={event.title} className={styles.dateRow}>
                <time className={styles.dateWhen} dateTime={event.date}>
                  {formatDate(event.date)}
                </time>
                <div>
                  <p className={styles.dateWhat}>{event.title}</p>
                  <p className={styles.dateNote}>{event.detail}</p>
                </div>
                <span className={styles.dateKind}>{event.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={ui.section} aria-labelledby="faq-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Common questions</span>
            <h2 id="faq-heading" className={ui.title}>Before you apply</h2>
          </div>

          <Faq items={ADMISSIONS.faqs} />

          {admissionsOffice && (
            <p className={ui.lead} style={{ marginTop: "2.5rem" }}>
              If your question is not answered here, write to{" "}
              <a href={`mailto:${admissionsOffice.email}`} className={ui.linkRow}>
                {admissionsOffice.email}
              </a>
              . Questions about fee status, non-standard qualifications and credit
              transfer are best asked before you apply rather than after.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
