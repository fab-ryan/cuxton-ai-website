import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/university/PageIntro";
import { ProgramCard } from "@/components/university/Cards";
import { ABOUT, PROGRAMS, UNIVERSITY_CONTACT, getSchool } from "@/data/university";
import ui from "@/components/university/ui.module.css";
import styles from "@/components/university/home/home.module.css";
import detail from "@/app/programs/programs.module.css";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research groups across machine learning, systems, evidence and causality, secure systems, and technology policy, with doctoral study in each.",
  alternates: { canonical: "/research" },
};

const CULTURE = [
  {
    title: "Groups sit inside schools",
    detail:
      "There is no separate research institute. The people publishing are the people convening modules, and project students work inside active groups.",
  },
  {
    title: "Two supervisors, always",
    detail:
      "Doctoral candidates have a primary supervisor and a second from another group, which keeps a project from narrowing too early.",
  },
  {
    title: "Progression is formal",
    detail:
      "A written report and a viva at the end of the first year decide whether a project continues in its current form.",
  },
  {
    title: "Cross-school supervision",
    detail:
      "Proposals that cut across schools are welcomed rather than tolerated, and are jointly supervised.",
  },
];

export default function ResearchPage() {
  const doctoral = PROGRAMS.filter((p) => p.level === "Doctoral");
  const researchOffice = UNIVERSITY_CONTACT.offices.find((o) => o.title === "Research office");

  return (
    <>
      <PageIntro
        breadcrumbs={[{ label: "Research" }]}
        eyebrow="Research"
        title="Research is where the teaching comes from"
        lead="Six groups across the five schools, each one connected to modules taught at undergraduate and graduate level. Doctoral candidates join a group rather than a department."
        media={{ src: "/university/research-lab.svg", alt: "", width: 800, height: 600 }}
        primaryCta={{ label: "Doctoral programmes", href: "/programs?level=doctoral" }}
        secondaryCta={{ label: "Contact the research office", href: "/contact" }}
      />

      <section className={`${ui.section} ${ui.sectionFlush}`} aria-labelledby="groups-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Research groups</span>
            <h2 id="groups-heading" className={ui.title}>What is being worked on</h2>
            <p className={ui.lead}>
              Before applying for doctoral study, read the interests listed on the
              faculty pages and write to a potential supervisor with a short
              outline. Formal application follows agreement in principle.
            </p>
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

          <Link href="/faculty" className={ui.linkRow} style={{ marginTop: "2rem" }}>
            Faculty and their interests <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="culture-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>How research works here</span>
            <h2 id="culture-heading" className={ui.title}>Four things worth knowing</h2>
          </div>
          <div className={styles.steps}>
            {CULTURE.map((item, index) => (
              <div key={item.title} className={styles.step}>
                <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepText}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={ui.section} aria-labelledby="doctoral-heading">
        <div className={ui.container}>
          <div className={detail.split}>
            <div>
              <h2 id="doctoral-heading" className={ui.title} style={{ marginBottom: "1.5rem" }}>
                Doctoral study
              </h2>
              <div className={ui.prose}>
                <p>
                  Both doctoral programmes follow the same structure: a first year
                  of grounding and a formal progression review, then two or more
                  years of supervised research, then a thesis examined orally by an
                  external examiner.
                </p>
                <p>
                  Funding is attached to specific projects and advertised with them.
                  Self-funded and part-time candidates are admitted on the same
                  academic basis, with an extended timescale where appropriate.
                </p>
                {researchOffice && (
                  <p>
                    Enquiries about supervision go to{" "}
                    <a href={`mailto:${researchOffice.email}`} className={ui.linkRow}>
                      {researchOffice.email}
                    </a>
                    .
                  </p>
                )}
              </div>
            </div>

            <div className={`${ui.gridGap}`}>
              {doctoral.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
