"use client";

import { useEffect, useState } from "react";
import styles from "./SolutionDetail.module.css";

type SectionLink = { id: string; label: string };

const sections: SectionLink[] = [
  { id: "problem", label: "Problem" },
  { id: "what-we-provide", label: "What we provide" },
  { id: "how-it-works", label: "How it works" },
  { id: "typical-use-cases", label: "Typical use cases" },
  { id: "security", label: "Security & governance" },
  { id: "deliverables", label: "Deliverables" },
  { id: "related-industries", label: "Related industries" },
];

export default function SectionNav() {
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
        <nav className={styles.sectionNav} aria-label="Page sections">
          <div className={styles.sectionNavInner}>
            <span className={styles.sectionNavLabel}>Page Sections:</span>
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
