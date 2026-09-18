import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/university/PageIntro";
import { FacultyCard } from "@/components/university/Cards";
import { FACULTY, SCHOOLS } from "@/data/university";
import ui from "@/components/university/ui.module.css";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Academic staff across the five schools, their research interests and the modules they convene.",
  alternates: { canonical: "/faculty" },
};

export default function FacultyPage() {
  return (
    <>
      <PageIntro
        breadcrumbs={[{ label: "Faculty" }]}
        eyebrow="People"
        title="Faculty"
        lead="Academic staff are listed by school, with the research interests that doctoral applicants should read before writing, and the modules each person convenes."
      />

      {SCHOOLS.map((school, index) => {
        const members = FACULTY.filter((m) => m.school === school.slug);
        if (members.length === 0) return null;

        return (
          <section
            key={school.slug}
            className={`${ui.section} ${index === 0 ? ui.sectionFlush : ""} ${index % 2 === 1 ? ui.sectionAlt : ""}`}
            aria-labelledby={`faculty-${school.slug}`}
          >
            <div className={ui.container}>
              <div className={ui.headSplit}>
                <div>
                  <span className={ui.eyebrow}>{school.short}</span>
                  <h2 id={`faculty-${school.slug}`} className={ui.title}>{school.name}</h2>
                  <p className={ui.lead}>{school.summary}</p>
                </div>
                <Link href={`/programs?school=${school.slug}`} className={ui.linkRow}>
                  Programmes in this school <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className={`${ui.gridGap} ${ui.cols3}`}>
                {members.map((member) => (
                  <FacultyCard key={member.slug} member={member} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
