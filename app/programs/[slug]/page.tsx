import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/university/PageIntro";
import { ProgramCard } from "@/components/university/Cards";
import {
  PROGRAMS,
  getFaculty,
  getProgram,
  getSchool,
  programsBySchool,
} from "@/data/university";
import ui from "@/components/university/ui.module.css";
import styles from "../programs.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Programme not found" };

  return {
    title: `${program.award} ${program.name}`,
    description: program.summary,
    alternates: { canonical: `/programs/${program.slug}` },
    openGraph: {
      title: `${program.award} ${program.name} | CuxtonAI Academy University`,
      description: program.summary,
      url: `/programs/${program.slug}`,
    },
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const school = getSchool(program.school);
  const staff = program.faculty.map(getFaculty).filter((m) => m !== undefined);
  const related = programsBySchool(program.school).filter((p) => p.slug !== program.slug);

  const specs = [
    { label: "Duration", value: program.duration },
    { label: "Study mode", value: program.mode },
    { label: "Credits", value: program.credits },
    { label: "Intake", value: program.intake.join(", ") },
  ];

  return (
    <>
      <PageIntro
        breadcrumbs={[
          { label: "Programmes", href: "/programs" },
          { label: `${program.award} ${program.name}` },
        ]}
        eyebrow={school?.name}
        award={program.award}
        title={program.name}
        lead={program.summary}
        tags={[program.level, program.duration, program.location]}
        primaryCta={{ label: "Apply for this programme", href: "/admissions" }}
        secondaryCta={{ label: "Ask a question", href: "/contact" }}
        media={{ src: program.image, alt: "", width: 800, height: 600 }}
      />

      {/* ── Key facts ───────────────────────────────────────── */}
      <section className={`${ui.section} ${ui.sectionFlush}`} style={{ paddingBottom: 0 }}>
        <div className={ui.container}>
          <dl className={ui.specs}>
            {specs.map((spec) => (
              <div key={spec.label} className={ui.spec}>
                <dt className={ui.specLabel}>{spec.label}</dt>
                <dd className={ui.specValue} style={{ margin: 0 }}>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Overview ────────────────────────────────────────── */}
      <section className={ui.section} aria-labelledby="overview-heading">
        <div className={ui.container}>
          <div className={styles.split}>
            <div>
              <h2 id="overview-heading" className={ui.title} style={{ marginBottom: "1.5rem" }}>
                About this programme
              </h2>
              <div className={ui.prose}>
                {program.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className={styles.aside}>
              <h3 className={styles.asideTitle}>What sets it apart</h3>
              {program.highlights.map((highlight) => (
                <div key={highlight.title} className={styles.highlight}>
                  <p className={styles.highlightTitle}>{highlight.title}</p>
                  <p className={styles.highlightText}>{highlight.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ──────────────────────────────────────── */}
      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="curriculum-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Curriculum</span>
            <h2 id="curriculum-heading" className={ui.title}>What you study, and when</h2>
            <p className={ui.lead}>
              Module codes are shown as they appear on the transcript. Optional
              modules are marked; everything else is compulsory.
            </p>
          </div>

          {program.curriculum.map((stage) => (
            <div key={stage.title} className={styles.stage}>
              <div className={styles.stageHead}>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
                <p className={styles.stageNote}>{stage.note}</p>
              </div>
              {stage.modules.map((module) => (
                <div key={module.code + module.name} className={styles.moduleRow}>
                  <span className={styles.moduleCode}>{module.code}</span>
                  <span className={styles.moduleName}>{module.name}</span>
                  <span className={styles.moduleCredits}>
                    {module.credits > 0 ? `${module.credits} credits` : "Non-credit"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Assessment and entry ────────────────────────────── */}
      <section className={ui.section} aria-labelledby="assessment-heading">
        <div className={ui.container}>
          <div className={styles.split}>
            <div>
              <h2 id="assessment-heading" className={ui.titleSm}>How you are assessed</h2>
              <ul className={ui.checklist}>
                {program.assessment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={ui.titleSm} id="entry">What is required to enter</h2>
              <ul className={ui.checklist}>
                {program.entry.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/admissions" className={ui.linkRow} style={{ marginTop: "1.5rem" }}>
                Full admissions process <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Where it leads, and who teaches ─────────────────── */}
      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="outcomes-heading">
        <div className={ui.container}>
          <div className={styles.split}>
            <div>
              <h2 id="outcomes-heading" className={ui.titleSm}>Where graduates go</h2>
              <p className={ui.cardText} style={{ marginBottom: "1.5rem" }}>
                Roles this programme is designed to prepare you for. It is a
                statement of intent about the curriculum, not a prediction about
                any individual.
              </p>
              <div className={styles.careerList}>
                {program.careers.map((career) => (
                  <span key={career} className={styles.career}>{career}</span>
                ))}
              </div>
            </div>

            <div>
              <h2 className={ui.titleSm}>Who teaches it</h2>
              {staff.map((member) => (
                <Link key={member.slug} href={`/faculty#${member.slug}`} className={styles.staffRow}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.portrait} alt="" width={52} height={52} loading="lazy" />
                  <span>
                    <span className={styles.staffName} style={{ display: "block" }}>{member.name}</span>
                    <span className={styles.staffTitle} style={{ display: "block" }}>{member.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className={ui.section} aria-labelledby="related-heading">
          <div className={ui.container}>
            <div className={ui.headSplit}>
              <div>
                <span className={ui.eyebrow}>Also in this school</span>
                <h2 id="related-heading" className={ui.title}>{school?.name}</h2>
              </div>
              <Link href="/programs" className={ui.linkRow}>
                All programmes <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={`${ui.gridGap} ${ui.cols3}`}>
              {related.map((item) => (
                <ProgramCard key={item.slug} program={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
