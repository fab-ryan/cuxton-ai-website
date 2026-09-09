"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase/client";
import type { Insight } from "@/lib/supabase/types";
import { formatDate, insightHref, sortByPublished } from "@/lib/insights";
import s from "./insights.module.css";

/* ═══════════════════════════════════════════════════════════════════
   The index is prerendered at build with whatever was published then,
   and refreshed in the browser so a post published since the last
   deploy still shows up here. Its own /insights/<slug> page only
   exists after the next build — see supabase/README.md.
   ═══════════════════════════════════════════════════════════════════ */

export default function InsightsIndex({ initial }: { initial: Insight[] }) {
  const [rows, setRows] = useState<Insight[]>(initial);

  /* Slugs that were published when the site was built, and so have a
     prerendered page. Anything found later links to /insights/view. */
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
      .then(({ data }) => {
        if (alive && data) setRows((data as Insight[]).sort(sortByPublished));
      });

    return () => {
      alive = false;
    };
  }, []);

  if (rows.length === 0) {
    return (
      <div className={s.stateNote}>
        The first insights are being written.
        <br />
        In the meantime, <Link href="/contact" style={{ color: "var(--cuxton-teal-text)" }}>
          book a discovery session
        </Link>{" "}
        to talk through your own programme.
      </div>
    );
  }

  return (
    <div className={s.grid}>
      {rows.map((insight) => (
        <Link
          key={insight.id}
          href={insightHref(insight.slug, prerendered)}
          className={`card-enterprise card-top-accent ${s.card}`}
        >
          <span className={`tag-teal ${s.cardTag}`}>{insight.tag}</span>
          <h2 className={s.cardTitle}>{insight.title}</h2>
          {insight.excerpt && <p className={s.cardExcerpt}>{insight.excerpt}</p>}
          <div className={s.cardFoot}>
            <span>
              {formatDate(insight.published_at)}
              {insight.read_minutes ? ` · ${insight.read_minutes} min read` : ""}
            </span>
            <span className={s.cardCta}>Read →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
