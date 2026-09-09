"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase/client";
import type { Insight, InsightStatus } from "@/lib/supabase/types";
import { formatDate } from "@/lib/insights";
import { useSession } from "./SessionProvider";
import s from "./dashboard.module.css";

type Filter = "all" | InsightStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Drafts" },
];

export default function InsightsList() {
  const { isAdmin } = useSession();
  const [rows, setRows] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    const supabase = getSupabase();
    if (!supabase) return;

    let alive = true;
    (async () => {
      const { data, error: loadError } = await supabase
        .from("insights")
        .select("*")
        .order("updated_at", { ascending: false });

      if (!alive) return;
      if (loadError) setError(loadError.message);
      else setRows((data ?? []) as Insight[]);
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, [isAdmin]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (filter !== "all" && row.status !== filter) return false;
      if (!needle) return true;
      return (
        row.title.toLowerCase().includes(needle) ||
        row.tag.toLowerCase().includes(needle) ||
        row.slug.toLowerCase().includes(needle)
      );
    });
  }, [rows, filter, query]);

  const counts = useMemo(
    () => ({
      all: rows.length,
      published: rows.filter((r) => r.status === "published").length,
      draft: rows.filter((r) => r.status === "draft").length,
    }),
    [rows]
  );

  return (
    <div>
      <div className={s.toolbar}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`${s.filterBtn} ${filter === f.key ? s.filterBtnActive : ""}`}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
          >
            {f.label} ({counts[f.key]})
          </button>
        ))}

        <input
          type="search"
          className={`form-field ${s.search}`}
          placeholder="Search title, tag or slug…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search insights"
        />

        <Link href="/dashboard/insights/new" className="btn-primary" style={{ marginLeft: "auto" }}>
          New insight
        </Link>
      </div>

      {error && (
        <div className={`${s.notice} ${s.noticeError}`} role="alert" style={{ marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      <div className={s.panel}>
        {loading ? (
          <div className={s.empty}>
            <div className={s.spinner} />
          </div>
        ) : visible.length === 0 ? (
          <div className={s.empty}>
            {rows.length === 0 ? (
              <>
                No insights yet.
                <br />
                <Link href="/dashboard/insights/new" style={{ color: "var(--cuxton-teal-text)" }}>
                  Write the first one →
                </Link>
              </>
            ) : (
              "Nothing matches that filter."
            )}
          </div>
        ) : (
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Link
                        href={`/dashboard/insights/edit?id=${row.id}`}
                        className={s.rowButton}
                      >
                        {row.title}
                      </Link>
                      <div className={s.listMeta}>/insights/{row.slug}</div>
                    </td>
                    <td>
                      <span className="tag-teal">{row.tag}</span>
                    </td>
                    <td>
                      <span
                        className={`${s.badge} ${
                          row.status === "published" ? s.badgeDone : s.badgeMuted
                        }`}
                      >
                        {row.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className={s.mono}>{formatDate(row.published_at)}</td>
                    <td className={s.mono}>{formatDate(row.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
