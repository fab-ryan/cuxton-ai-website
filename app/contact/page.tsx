import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/university/PageIntro";
import EnquiryForm from "@/components/university/EnquiryForm";
import { formatDate } from "@/components/university/Cards";
import { EVENTS, UNIVERSITY_CONTACT } from "@/data/university";
import { companyContact } from "@/data/company";
import ui from "@/components/university/ui.module.css";
import detail from "@/app/programs/programs.module.css";
import styles from "@/components/university/home/home.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the admissions office, student services or the research office at CuxtonAI Academy University, and find the campus address.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const openDays = EVENTS.filter((event) => event.type === "Open day");

  return (
    <>
      <PageIntro
        breadcrumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="Ask us something"
        lead="Four offices handle everything the university is asked. Write to the one that fits, or use the form and it will be addressed for you."
      />

      <section className={`${ui.section} ${ui.sectionFlush}`} aria-labelledby="offices-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Offices</span>
            <h2 id="offices-heading" className={ui.title}>Who to write to</h2>
          </div>

          <div className={`${ui.gridGap} ${ui.cols4}`}>
            {UNIVERSITY_CONTACT.offices.map((office) => (
              <article key={office.email} className={ui.card}>
                <h3 className={ui.cardTitle}>{office.title}</h3>
                <p className={ui.cardText}>{office.detail}</p>
                <a href={`mailto:${office.email}`} className={ui.cardFoot}>
                  {office.email}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="form-heading">
        <div className={ui.container}>
          <div className={detail.split}>
            <div>
              <span className={ui.eyebrow}>Enquiry</span>
              <h2 id="form-heading" className={ui.title} style={{ marginBottom: "1.25rem" }}>
                Send a question
              </h2>
              <p className={ui.lead} style={{ marginBottom: "2rem" }}>
                Admissions questions are usually answered within a few working days.
                If you are asking about doctoral supervision, name the research area
                you are interested in and the office will route it to the right
                group.
              </p>
              <EnquiryForm />
            </div>

            <div>
              <div className={detail.aside} style={{ marginBottom: "1.5rem" }}>
                <h3 className={detail.asideTitle}>Campus address</h3>
                <p className={ui.cardText} style={{ lineHeight: 1.8 }}>
                  {UNIVERSITY_CONTACT.name}
                  <br />
                  {companyContact.office.lines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                  {companyContact.office.country}
                </p>
                <a
                  href={companyContact.office.mapViewHref}
                  className={ui.linkRow}
                  style={{ marginTop: "1.25rem" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in maps <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className={detail.aside}>
                <h3 className={detail.asideTitle}>Visit instead</h3>
                <p className={ui.cardText} style={{ marginBottom: "1.25rem" }}>
                  Open days include an admissions clinic with no appointment needed.
                  Most questions are answered faster in person than by email.
                </p>
                <div className={styles.events} style={{ borderTop: "1px solid var(--border)" }}>
                  {openDays.map((event) => (
                    <div key={event.title} className={styles.event}>
                      <time className={styles.eventDate} dateTime={event.date}>
                        {formatDate(event.date)}
                      </time>
                      <div>
                        <p className={styles.eventTitle}>{event.title}</p>
                        <p className={styles.eventDetail}>{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/news" className={ui.linkRow} style={{ marginTop: "1.25rem" }}>
                  All events <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
