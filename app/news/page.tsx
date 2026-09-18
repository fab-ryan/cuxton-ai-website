import type { Metadata } from "next";
import PageIntro from "@/components/university/PageIntro";
import NewsIndex from "@/components/university/NewsIndex";
import { formatDate } from "@/components/university/Cards";
import { EVENTS } from "@/data/university";
import ui from "@/components/university/ui.module.css";
import styles from "@/components/university/home/home.module.css";

export const metadata: Metadata = {
  title: "News and events",
  description:
    "Research announcements, campus news, open days, public lectures and application deadlines at CuxtonAI Academy University.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageIntro
        breadcrumbs={[{ label: "News and events" }]}
        eyebrow="News and events"
        title="What is happening"
        lead="Research from the schools, changes on campus, and every date a prospective or current student needs in one place."
      />

      <section className={`${ui.section} ${ui.sectionFlush}`}>
        <div className={ui.container}>
          <NewsIndex />
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="events-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Calendar</span>
            <h2 id="events-heading" className={ui.title}>Coming up</h2>
            <p className={ui.lead}>
              Open days and public lectures are free to attend. Deadlines apply to
              applications for the intake named.
            </p>
          </div>

          <div className={styles.events}>
            {EVENTS.map((event) => (
              <div key={event.title} className={styles.event}>
                <time className={styles.eventDate} dateTime={event.date}>
                  {formatDate(event.date)}
                </time>
                <div>
                  <p className={styles.eventTitle}>{event.title}</p>
                  <p className={styles.eventDetail}>{event.detail}</p>
                </div>
                <span className={styles.eventMeta}>
                  {event.time} · {event.venue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
