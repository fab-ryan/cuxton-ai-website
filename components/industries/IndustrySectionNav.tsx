"use client";

import { useEffect, useState } from "react";
import styles from "./IndustryDetail.module.css";

type SectionLink = { id: string; label: string };

const sections: SectionLink[] = [
  { id: "problem", label: "Sector Challenges" },
  { id: "what-we-provide", label: "What We Provide" },
  { id: "how-it-works", label: "Execution Blueprint" },
  { id: "typical-use-cases", label: "Enterprise Use Cases" },
  { id: "security", label: "Security & Governance" },
  { id: "deliverables", label: "Deliverables" },
  { id: "related-solutions", label: "Related Solutions" },
];

export default function IndustrySectionNav() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.sectionNavWrapper}>
      <div className={`section-container ${styles.sectionNavContainer}`}>
        <nav className={styles.sectionNav} aria-label="Industry section navigation">
          <div className={styles.sectionNavInner}>
            <span className={styles.sectionNavLabel}>Industry Sections:</span>
            <div className={styles.sectionNavPills}>
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`${styles.sectionPill} ${activeId === id ? styles.sectionPillActive : ""}`}
                >
                  <span className={styles.sectionPillDot} aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
