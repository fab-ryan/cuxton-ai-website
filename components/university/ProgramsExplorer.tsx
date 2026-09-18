"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProgramCard } from "./Cards";
import { PROGRAMS, PROGRAM_LEVELS, SCHOOLS, type ProgramLevel } from "@/data/university";
import ui from "./ui.module.css";
import styles from "./explorer.module.css";

/* Filtering happens in the browser against the full catalogue, which is
   a couple of dozen records. The school filter can be pre-set through a
   ?school= query so the school cards on the home page can link into a
   filtered view. */
export default function ProgramsExplorer() {
  const params = useSearchParams();
  const initialSchool = params.get("school") ?? "all";
  const initialLevel = (params.get("level") ?? "all").toLowerCase();

  const [level, setLevel] = useState<ProgramLevel | "all">(
    PROGRAM_LEVELS.find((l) => l.toLowerCase() === initialLevel) ?? "all"
  );
  const [school, setSchool] = useState<string>(
    SCHOOLS.some((s) => s.slug === initialSchool) ? initialSchool : "all"
  );

  const results = useMemo(
    () =>
      PROGRAMS.filter(
        (p) =>
          (level === "all" || p.level === level) &&
          (school === "all" || p.school === school)
      ),
    [level, school]
  );

  return (
    <div>
      <div className={styles.bar}>
        <div>
          <span className={styles.filterLabel} id="level-filter">Level of study</span>
          <div className={styles.group} role="group" aria-labelledby="level-filter">
            <button
              type="button"
              className={`${styles.chip} ${level === "all" ? styles.chipActive : ""}`}
              aria-pressed={level === "all"}
              onClick={() => setLevel("all")}
            >
              All levels
            </button>
            {PROGRAM_LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                className={`${styles.chip} ${level === l ? styles.chipActive : ""}`}
                aria-pressed={level === l}
                onClick={() => setLevel(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className={styles.filterLabel} id="school-filter">School</span>
          <div className={styles.group} role="group" aria-labelledby="school-filter">
            <button
              type="button"
              className={`${styles.chip} ${school === "all" ? styles.chipActive : ""}`}
              aria-pressed={school === "all"}
              onClick={() => setSchool("all")}
            >
              All schools
            </button>
            {SCHOOLS.map((s) => (
              <button
                key={s.slug}
                type="button"
                className={`${styles.chip} ${school === s.slug ? styles.chipActive : ""}`}
                aria-pressed={school === s.slug}
                onClick={() => setSchool(s.slug)}
              >
                {s.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.count} aria-live="polite">
        Showing {results.length} of {PROGRAMS.length} programmes
      </p>

      {results.length === 0 ? (
        <div className={styles.empty} style={{ marginTop: "1.5rem" }}>
          No programme matches that combination yet. Try a different school or level.
        </div>
      ) : (
        <div className={`${ui.gridGap} ${ui.cols3}`} style={{ marginTop: "1.5rem" }}>
          {results.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}
