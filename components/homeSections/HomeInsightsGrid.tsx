"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { getSupabase } from "@/lib/supabase/client";
import type { Insight } from "@/lib/supabase/types";
import { formatDate, insightHref } from "@/lib/insights";

type Placeholder = { title: string; tag: string };

export default function HomeInsightsGrid({
  initial,
  placeholders,
}: {
  initial: Insight[];
  placeholders: Placeholder[];
}) {
  const [rows, setRows] = useState<Insight[]>(initial);

  /* Only build-time slugs have a prerendered page; see insightHref. */
  const prerendered = useMemo(
    () => new Set(initial.map((insight) => insight.slug)),
    [initial]
  );

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    let alive = true;
    supabase
      .from("insights")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (alive && data) setRows(data as Insight[]);
      });

    return () => {
      alive = false;
    };
  }, []);

  if (rows.length === 0) {
    return (
      <div className={styles.insights__grid}>
        {placeholders.map((item) => (
          <div
            key={item.title}
            className={`card-enterprise ${styles.cardAccent} ${styles.insights__card}`}
          >
            <span className={`tag-teal ${styles.insights__cardTag}`}>{item.tag}</span>
            <h3 className={styles.insights__cardTitle}>{item.title}</h3>
            <div className={styles.insights__cardFooter}>Coming soon</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.insights__grid}>
      {rows.map((insight) => (
        <Link
          key={insight.id}
          href={insightHref(insight.slug, prerendered)}
          className={`card-enterprise ${styles.cardAccent} ${styles.insights__card}`}
          style={{ textDecoration: "none" }}
        >
          <span className={`tag-teal ${styles.insights__cardTag}`}>{insight.tag}</span>
          <h3 className={styles.insights__cardTitle}>{insight.title}</h3>
          <div className={styles.insights__cardFooter}>
            {formatDate(insight.published_at)}
            {insight.read_minutes ? `, ${insight.read_minutes} min read` : ""}
          </div>
        </Link>
      ))}
    </div>
  );
}
