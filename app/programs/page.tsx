import type { Metadata } from "next";
import { Suspense } from "react";
import PageIntro from "@/components/university/PageIntro";
import ProgramsExplorer from "@/components/university/ProgramsExplorer";
import { SchoolCard } from "@/components/university/Cards";
import { PROGRAMS, SCHOOLS } from "@/data/university";
import ui from "@/components/university/ui.module.css";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Undergraduate, graduate, doctoral and professional programmes in artificial intelligence, computing, data science, cybersecurity and digital business.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <PageIntro
        breadcrumbs={[{ label: "Programmes" }]}
        eyebrow="Study"
        title="Programmes"
        lead={`${PROGRAMS.length} programmes across ${SCHOOLS.length} schools, from three-year undergraduate degrees to doctoral research and short professional certificates. Filter by level or by school.`}
      />

      <section className={`${ui.section} ${ui.sectionFlush}`}>
        <div className={ui.container}>
          <Suspense fallback={null}>
            <ProgramsExplorer />
          </Suspense>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="schools-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>Where programmes sit</span>
            <h2 id="schools-heading" className={ui.title}>The five schools</h2>
            <p className={ui.lead}>
              Each programme belongs to a school, but the boundaries are porous.
              Options, projects and doctoral supervision regularly cross them.
            </p>
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
