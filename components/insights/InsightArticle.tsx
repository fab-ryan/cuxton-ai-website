"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Insight } from "@/lib/supabase/types";
import { formatDate } from "@/lib/insights";
import InsightBody from "./InsightBody";
import s from "./insights.module.css";

/* Prerendered from the build-time snapshot, then refreshed in the browser
   so a correction published after the last deploy is visible immediately. */

export default function InsightArticle({
  slug,
  initial,
}: {
  slug: string;
  initial: Insight | null;
}) {
  const [insight, setInsight] = useState<Insight | null>(initial);
  /* Settled up front when the build already supplied the article, or when
     there is no Supabase client to ask. */
  const [checked, setChecked] = useState(Boolean(initial) || !isSupabaseConfigured);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    let alive = true;
    supabase
      .from("insights")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data }) => {
        if (!alive) return;
        if (data) setInsight(data as Insight);
        setChecked(true);
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  if (!insight) {
    return (
      <div className={s.stateNote}>
        {checked ? (
          <>
            That insight is not available.
            <br />
            <Link href="/insights" style={{ color: "var(--cuxton-teal-text)" }}>
              Back to all insights
            </Link>
          </>
        ) : (
          "Loading…"
        )}
      </div>
    );
  }

  return (
    <article className={s.article}>
      <Link href="/insights" className={s.back}>
        ← All insights
      </Link>

      <span className="tag-teal">{insight.tag}</span>

      <h1
        style={{
          fontSize: "clamp(1.65rem, 4vw, 2.4rem)",
          fontWeight: 800,
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
          color: "var(--foreground)",
          margin: "1rem 0 1.25rem",
        }}
      >
        {insight.title}
      </h1>

      <div className={s.articleMeta}>
        <span>{formatDate(insight.published_at)}</span>
        {insight.read_minutes ? <span>· {insight.read_minutes} min read</span> : null}
      </div>

      {insight.cover_image && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={insight.cover_image} alt="" className={s.cover} />
      )}

      <InsightBody body={insight.body} bodyJson={insight.body_json} />

      <div
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.9rem",
            color: "rgba(var(--foreground-rgb),0.5)",
            marginBottom: "1.25rem",
            lineHeight: 1.7,
          }}
        >
          Working through a decision like this inside your own institution?
        </p>
        <Link href="/contact" className="btn-primary">
          Book a discovery session
        </Link>
      </div>
    </article>
  );
}
