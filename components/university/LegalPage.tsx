import PageIntro from "./PageIntro";
import ui from "./ui.module.css";
import styles from "./legal.module.css";

export type LegalSection = { heading: string; body: React.ReactNode };

/* The three policy pages share one shape: a header, a dated note, and a
   numbered sequence of sections at a comfortable reading measure. */
export default function LegalPage({
  label,
  title,
  lead,
  updated,
  sections,
}: {
  label: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageIntro
        breadcrumbs={[{ label }]}
        eyebrow="Policies"
        title={title}
        lead={lead}
      />

      <section className={`${ui.section} ${ui.sectionFlush}`}>
        <div className={ui.container}>
          <div className={ui.narrow}>
            <p className={styles.updated}>Last updated {updated}</p>

            <ol className={styles.list}>
              {sections.map((section, index) => (
                <li key={section.heading} className={styles.item}>
                  <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className={styles.heading}>{section.heading}</h2>
                    <div className={styles.body}>{section.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
