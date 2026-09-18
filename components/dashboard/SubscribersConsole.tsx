"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { functionUrl, getSupabase } from "@/lib/supabase/client";
import {
  BROADCAST_STATUS_LABEL,
  type Broadcast,
  type BroadcastStatus,
  type Insight,
  type Subscriber,
  type SubscriberStatus,
} from "@/lib/supabase/types";
import { formatDate, formatDateTime } from "@/lib/insights";
import { useSession } from "./SessionProvider";
import s from "./dashboard.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Executive briefing subscribers, and the emails sent to them.

   Sign-ups arrive from the footer form. Sending is delegated to the
   send-broadcast Edge Function — the Resend key must never reach the
   browser, and this bundle is fully public.
   ═══════════════════════════════════════════════════════════════════ */

type Filter = "all" | SubscriberStatus;
type FeaturedInsight = Pick<Insight, "id" | "title">;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "unsubscribed", label: "Unsubscribed" },
  { key: "all", label: "All" },
];

const BROADCAST_CLASS: Record<BroadcastStatus, string> = {
  sending: s.badgeReview,
  sent: s.badgeDone,
  partial: s.badgeNew,
  failed: s.badgeFail,
};

/** Supabase returns at most this many rows per request. */
const PAGE_SIZE = 1000;
/** Rows drawn in the table at once; search narrows the rest. */
const RENDER_LIMIT = 500;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export default function SubscribersConsole({ initialInsightId }: { initialInsightId: string | null }) {
  const { isAdmin, session } = useSession();

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [insights, setInsights] = useState<FeaturedInsight[]>([]);
  const [loadedAt, setLoadedAt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("active");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    const all: Subscriber[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error: loadError } = await supabase
        .from("subscribers")
        .select("*")
        .order("created_at", { ascending: false })
        .order("id", { ascending: true })
        .range(from, from + PAGE_SIZE - 1);

      if (loadError) {
        setError(friendly(loadError.message));
        setLoading(false);
        return;
      }
      all.push(...((data ?? []) as Subscriber[]));
      if (!data || data.length < PAGE_SIZE) break;
    }

    const [broadcastRes, insightRes] = await Promise.all([
      supabase.from("broadcasts").select("*").order("created_at", { ascending: false }).limit(50),
      supabase
        .from("insights")
        .select("id, title")
        .eq("status", "published")
        .order("published_at", { ascending: false }),
    ]);

    const loadError = broadcastRes.error ?? insightRes.error;
    if (loadError) setError(friendly(loadError.message));

    setSubscribers(all);
    setBroadcasts((broadcastRes.data ?? []) as Broadcast[]);
    setInsights((insightRes.data ?? []) as FeaturedInsight[]);
    setLoadedAt(Date.now());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    void (async () => {
      await load();
    })();
  }, [isAdmin, load]);

  const counts = useMemo(() => {
    const base: Record<Filter, number> = { all: subscribers.length, active: 0, unsubscribed: 0 };
    for (const row of subscribers) base[row.status] += 1;
    return base;
  }, [subscribers]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return subscribers.filter((row) => {
      if (filter !== "all" && row.status !== filter) return false;
      return !needle || row.email.includes(needle) || row.source.toLowerCase().includes(needle);
    });
  }, [subscribers, filter, query]);

  /** Patch a subscriber locally and in Postgres, keeping the two in step. */
  async function unsubscribe(row: Subscriber) {
    if (!window.confirm(`Stop sending briefings to ${row.email}?`)) return;
    const supabase = getSupabase();
    if (!supabase) return;

    const patch = { status: "unsubscribed" as const, unsubscribed_at: new Date().toISOString() };
    const { error: updateError } = await supabase.from("subscribers").update(patch).eq("id", row.id);
    if (updateError) return setError(updateError.message);
    setSubscribers((prev) => prev.map((r) => (r.id === row.id ? { ...r, ...patch } : r)));
  }

  async function remove(row: Subscriber) {
    if (
      !window.confirm(
        `Delete ${row.email} permanently?\n\nUse this for erasure requests. To simply stop emails, unsubscribe them instead.`
      )
    ) {
      return;
    }
    const supabase = getSupabase();
    if (!supabase) return;

    const { error: deleteError } = await supabase.from("subscribers").delete().eq("id", row.id);
    if (deleteError) return setError(deleteError.message);
    setSubscribers((prev) => prev.filter((r) => r.id !== row.id));
  }

  if (loading) {
    return (
      <div className={s.centre}>
        <div className={s.spinner} />
      </div>
    );
  }

  const joinedRecently = subscribers.filter(
    (row) => row.status === "active" && new Date(row.created_at).getTime() > loadedAt - THIRTY_DAYS_MS
  ).length;
  const delivered = broadcasts.filter((b) => b.sent_count > 0);

  const stats = [
    {
      label: "Active subscribers",
      value: counts.active,
      hint: `${joinedRecently} joined in the last 30 days`,
    },
    {
      label: "Unsubscribed",
      value: counts.unsubscribed,
      hint: "Opted out, no longer emailed",
    },
    {
      label: "Briefings sent",
      value: delivered.length,
      hint: delivered[0] ? `Last sent ${formatDate(delivered[0].created_at)}` : "None sent yet",
    },
  ];

  return (
    <div>
      <div className={s.statGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <div className={s.statLabel}>{stat.label}</div>
            <div className={s.statValue}>{stat.value}</div>
            <div className={s.statHint}>{stat.hint}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className={`${s.notice} ${s.noticeError}`} role="alert" style={{ marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      <div className={s.editorGrid}>
        <BroadcastComposer
          insights={insights}
          broadcasts={broadcasts}
          activeCount={counts.active}
          adminEmail={session?.user.email ?? ""}
          initialInsightId={initialInsightId}
          onSent={load}
        />

        {/* ─── History ─── */}
        <div className={s.panel}>
          <div className={s.panelHead}>
            <span className={s.panelTitle}>Sent briefings</span>
            <button type="button" className={s.linkBtn} onClick={load}>
              Refresh
            </button>
          </div>
          {broadcasts.length === 0 ? (
            <div className={s.empty}>Nothing sent yet. Briefings you send appear here.</div>
          ) : (
            <div className={`${s.panelBody} ${s.listScroll}`}>
              <div className={s.thread}>
                {broadcasts.map((b) => (
                  <div key={b.id} className={s.threadItem}>
                    <div className={s.threadHead}>
                      <span className={s.threadSubject}>{b.subject}</span>
                      <span className={`${s.badge} ${BROADCAST_CLASS[b.status]}`}>
                        {BROADCAST_STATUS_LABEL[b.status]}
                      </span>
                    </div>
                    <p className={s.listSnippet} style={{ marginTop: 0 }}>
                      {b.body}
                    </p>
                    <p className={s.hint}>
                      {formatDateTime(b.created_at)}, sent to {b.sent_count} of {b.recipient_count}
                      {b.failed_count > 0 && `, ${b.failed_count} failed`}
                    </p>
                    {b.last_error && (
                      <p className={s.hint} style={{ color: "var(--status-error)" }}>
                        {b.last_error}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Subscriber list ─── */}
      <div className={s.toolbar} style={{ marginTop: "1.75rem" }}>
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
          placeholder="Search email or source…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search subscribers"
        />
      </div>

      <div className={s.panel}>
        <div className={s.panelHead}>
          <span className={s.panelTitle}>
            {visible.length} {visible.length === 1 ? "subscriber" : "subscribers"}
          </span>
          <button
            type="button"
            className={s.linkBtn}
            onClick={() => downloadCsv(visible)}
            disabled={visible.length === 0}
          >
            Export CSV
          </button>
        </div>

        {visible.length === 0 ? (
          <div className={s.empty}>
            {subscribers.length === 0
              ? "No one has subscribed yet. Sign-ups from the footer form land here."
              : "Nothing matches that filter."}
          </div>
        ) : (
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Source</th>
                  <th>Joined</th>
                  {/* Labelled with aria-label, not an sr-only span: that span is
                      absolutely positioned and escapes the scrolling wrapper,
                      widening the whole page on a phone. */}
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {visible.slice(0, RENDER_LIMIT).map((row) => (
                  <tr key={row.id}>
                    <td style={{ color: "var(--foreground)", fontWeight: 600 }}>{row.email}</td>
                    <td>
                      <span className={`${s.badge} ${row.status === "active" ? s.badgeDone : s.badgeMuted}`}>
                        {row.status === "active" ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td>{row.source}</td>
                    <td className={s.mono}>
                      {formatDate(row.created_at)}
                      {row.unsubscribed_at && (
                        <div className={s.listMeta}>left {formatDate(row.unsubscribed_at)}</div>
                      )}
                    </td>
                    <td>
                      <div className={s.actions} style={{ justifyContent: "flex-end" }}>
                        {row.status === "active" && (
                          <button type="button" className={s.linkBtn} onClick={() => unsubscribe(row)}>
                            Unsubscribe
                          </button>
                        )}
                        <button
                          type="button"
                          className={`${s.linkBtn} ${s.danger}`}
                          onClick={() => remove(row)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length > RENDER_LIMIT && (
              <p className={s.hint} style={{ padding: "0 1.25rem 1rem" }}>
                Showing the newest {RENDER_LIMIT} of {visible.length}. Search to narrow the list; the
                CSV export includes every row.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Composer
   ═══════════════════════════════════════════════════════════════════ */

const EMPTY_FILL = { subject: "", body: "" };

function fillFor(insight: FeaturedInsight | undefined) {
  if (!insight) return EMPTY_FILL;
  return {
    subject: insight.title,
    body: "Our architects have published a new insight. A short summary is below, with a link to the full article.",
  };
}

function BroadcastComposer({
  insights,
  broadcasts,
  activeCount,
  adminEmail,
  initialInsightId,
  onSent,
}: {
  insights: FeaturedInsight[];
  broadcasts: Broadcast[];
  activeCount: number;
  adminEmail: string;
  initialInsightId: string | null;
  onSent: () => Promise<void>;
}) {
  /* Arriving from the editor's "Email this insight" link preselects it. */
  const initial = insights.find((i) => i.id === initialInsightId);

  const [insightId, setInsightId] = useState(initial?.id ?? "");
  /* What the insight picker last filled in. A field still holding it is
     refilled when the pick changes; one the author has edited is left alone. */
  const [fill, setFill] = useState(() => fillFor(initial));
  const [subject, setSubject] = useState(fill.subject);
  const [body, setBody] = useState(fill.body);
  const [sending, setSending] = useState<"test" | "live" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const alreadySent = insightId
    ? broadcasts.find((b) => b.insight_id === insightId && b.sent_count > 0)
    : undefined;

  function chooseInsight(id: string) {
    const next = fillFor(insights.find((i) => i.id === id));
    if (subject === fill.subject) setSubject(next.subject);
    if (body === fill.body) setBody(next.body);
    setFill(next);
    setInsightId(id);
    setNotice(null);
  }

  async function send(test: boolean) {
    setError(null);
    setNotice(null);

    if (!subject.trim() || !body.trim()) {
      setError("A subject and a message are both required.");
      return;
    }
    if (!test) {
      if (activeCount === 0) return setError("There are no active subscribers to send to yet.");
      const noun = activeCount === 1 ? "subscriber" : "subscribers";
      if (!window.confirm(`Send "${subject.trim()}" to ${activeCount} ${noun}?\n\nThis cannot be undone.`)) {
        return;
      }
    }

    const supabase = getSupabase();
    if (!supabase) return setError("Supabase is not configured.");

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) return setError("Your session has expired. Sign in again.");

    setSending(test ? "test" : "live");
    try {
      const res = await fetch(functionUrl("send-broadcast"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: subject.trim(),
          body: body.trim(),
          insightId: insightId || null,
          test,
        }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(result?.error ?? `The briefing could not be sent (${res.status}).`);
      } else if (test) {
        setNotice(`Test sent to ${result.to}. Check it in the inbox before sending to everyone.`);
      } else if (result.failed > 0) {
        setError(
          `Sent to ${result.sent} of ${result.sent + result.failed} subscribers. ` +
            `${result.failed} could not be sent: ${result.lastError}`
        );
      } else {
        setNotice(`Briefing sent to ${result.sent} ${result.sent === 1 ? "subscriber" : "subscribers"}.`);
        setInsightId("");
        setFill(EMPTY_FILL);
        setSubject("");
        setBody("");
      }

      /* A failed live send may still have logged a broadcast row. */
      if (!test) await onSent();
    } catch (err) {
      setError(
        `Could not reach the send-broadcast function: ${err instanceof Error ? err.message : "unknown error"}`
      );
    } finally {
      setSending(null);
    }
  }

  return (
    <div className={s.panel}>
      <div className={s.panelHead}>
        <span className={s.panelTitle}>Compose a briefing</span>
        <span className={s.listMeta}>
          to {activeCount} active {activeCount === 1 ? "subscriber" : "subscribers"}
        </span>
      </div>
      <div className={s.panelBody}>
        <div style={{ marginBottom: "0.9rem" }}>
          <label htmlFor="broadcast-insight" className="form-label">
            Feature an insight
          </label>
          <select
            id="broadcast-insight"
            className="form-field form-select"
            value={insightId}
            onChange={(e) => chooseInsight(e.target.value)}
          >
            <option value="">None, a written briefing only</option>
            {insights.map((insight) => (
              <option key={insight.id} value={insight.id}>
                {insight.title}
              </option>
            ))}
          </select>
          <p className={s.hint}>
            Adds a card below your message with the cover photo, excerpt and a link to the article.
          </p>
        </div>

        {alreadySent && (
          <div className={`${s.notice} ${s.noticeInfo}`} style={{ marginBottom: "0.9rem" }}>
            This insight was already sent to {alreadySent.sent_count}{" "}
            {alreadySent.sent_count === 1 ? "subscriber" : "subscribers"} on{" "}
            {formatDate(alreadySent.created_at)}.
          </div>
        )}

        <div style={{ marginBottom: "0.9rem" }}>
          <label htmlFor="broadcast-subject" className="form-label">
            Subject
          </label>
          <input
            id="broadcast-subject"
            className="form-field"
            value={subject}
            maxLength={300}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="September briefing: governing AI agents in regulated workflows"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="broadcast-body" className="form-label">
            Message
          </label>
          <textarea
            id="broadcast-body"
            className="form-field form-textarea"
            rows={10}
            value={body}
            maxLength={20000}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What changed this month, and why it matters to your programme…"
          />
          <p className={s.hint}>
            Blank lines become paragraphs. Every email carries the recipient&apos;s own unsubscribe link.
          </p>
        </div>

        {error && (
          <div className={`${s.notice} ${s.noticeError}`} role="alert" style={{ marginBottom: "1rem" }}>
            {error}
          </div>
        )}
        {notice && (
          <div className={`${s.notice} ${s.noticeOk}`} role="status" style={{ marginBottom: "1rem" }}>
            {notice}
          </div>
        )}

        <div className={s.actions}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => send(false)}
            disabled={sending !== null || activeCount === 0}
            style={{ opacity: sending !== null || activeCount === 0 ? 0.6 : 1 }}
          >
            {sending === "live"
              ? "Sending…"
              : `Send to ${activeCount} ${activeCount === 1 ? "subscriber" : "subscribers"}`}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => send(true)}
            disabled={sending !== null}
          >
            {sending === "test" ? "Sending test…" : "Send test to me"}
          </button>
        </div>
        {adminEmail && <p className={s.hint}>Test copies go to {adminEmail} only and are not logged.</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════════ */

/** Quote a CSV cell, and defuse values a spreadsheet would run as a formula. */
function csvCell(value: string | null): string {
  const text = value ?? "";
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

function downloadCsv(rows: Subscriber[]) {
  const header = ["email", "status", "source", "joined_at", "unsubscribed_at"];
  const lines = rows.map((row) =>
    [row.email, row.status, row.source, row.created_at, row.unsubscribed_at].map(csvCell).join(",")
  );
  const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `cuxton-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

/** Point at the setup step when the schema has not been applied yet. */
function friendly(message: string): string {
  if (/subscribers|broadcasts/.test(message) && /does not exist|schema cache/.test(message)) {
    return "The subscriber tables are missing. Re-run supabase/schema.sql, then deploy the send-broadcast function (see supabase/README.md).";
  }
  return message;
}
