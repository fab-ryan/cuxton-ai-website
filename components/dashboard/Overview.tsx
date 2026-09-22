"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase/client";
import {
  CONTACT_STATUS_LABEL,
  type Contact,
  type ContactStatus,
  type Insight,
} from "@/lib/supabase/types";
import { formatDate } from "@/lib/insights";
import { useSession } from "./SessionProvider";
import s from "./dashboard.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Console overview: a greeting, four headline counts, enquiry activity
   over the last fortnight, the enquiry pipeline by status, and the most
   recent enquiries and insights.

   Every figure is counted from the rows loaded here; nothing is
   estimated.
   ═══════════════════════════════════════════════════════════════════ */

const ACTIVITY_DAYS = 14;

/* Same status colours as the badges elsewhere in the console, so a
   status reads the same in the chart as it does in the inbox. */
const STATUS_STYLE: Record<ContactStatus, { seg: string; badge: string }> = {
  new: { seg: s.segNew, badge: s.badgeNew },
  in_review: { seg: s.segReview, badge: s.badgeReview },
  responded: { seg: s.segDone, badge: s.badgeDone },
  archived: { seg: s.segMuted, badge: s.badgeMuted },
};

const PIPELINE_ORDER: ContactStatus[] = ["new", "in_review", "responded", "archived"];

function Glyph({ d }: { d: string }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const ARROW = "M5 12h14M13 6l6 6-6 6";

/** Local midnight `offset` days from the day containing `now`. */
function dayStart(now: number, offset = 0): number {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d.getTime();
}

function timeAgo(iso: string, now: number): string {
  const minutes = Math.round((now - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

function greeting(now: number): string {
  const hour = new Date(now).getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function initials(first: string, last: string): string {
  return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase() || "?";
}

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

/* ─── Enquiries per day ────────────────────────────────────────── */

function ActivityChart({ contacts, now }: { contacts: Contact[]; now: number }) {
  const perDay = new Map<number, number>();
  for (const contact of contacts) {
    const key = dayStart(new Date(contact.created_at).getTime());
    perDay.set(key, (perDay.get(key) ?? 0) + 1);
  }

  const days = Array.from({ length: ACTIVITY_DAYS }, (_, i) => {
    const start = dayStart(now, i - (ACTIVITY_DAYS - 1));
    return { start, count: perDay.get(start) ?? 0 };
  });

  const total = days.reduce((sum, day) => sum + day.count, 0);
  const windowStart = days[0].start;
  const previous = contacts.filter((c) => {
    const t = new Date(c.created_at).getTime();
    return t >= dayStart(now, -(ACTIVITY_DAYS * 2 - 1)) && t < windowStart;
  }).length;

  const peak = Math.max(...days.map((d) => d.count));
  /* Even ceiling so the midline lands on a whole number. */
  const scaleMax = Math.max(2, Math.ceil(peak / 2) * 2);

  const dayLabel = (t: number, style: "short" | "long") =>
    new Date(t).toLocaleDateString(
      "en-GB",
      style === "long"
        ? { weekday: "short", day: "numeric", month: "short" }
        : { day: "numeric", month: "short" }
    );

  const delta = total - previous;
  const deltaText =
    previous === 0 && total === 0
      ? "None in the previous 14 days either"
      : delta === 0
        ? "Level with the previous 14 days"
        : `${delta > 0 ? "▲" : "▼"} ${Math.abs(delta)} vs the previous 14 days`;

  return (
    <section className={s.panel}>
      <div className={s.panelHead}>
        <div>
          <h2 className={s.panelTitle}>Enquiries, last 14 days</h2>
          <p className={s.panelSub}>
            <span className={s.panelFigure}>{total}</span>
            <span className={delta > 0 ? s.deltaUp : delta < 0 ? s.deltaDown : undefined}>
              {deltaText}
            </span>
          </p>
        </div>
        <Link href="/dashboard/contacts" className={s.linkBtn} style={{ textDecoration: "none" }}>
          Open inbox
        </Link>
      </div>

      <div className={s.panelBody}>
        <div className={s.chart} aria-hidden="true">
          <div className={s.chartPlot}>
            <span className={s.gridLine} style={{ bottom: "100%" }} data-value={scaleMax} />
            <span className={s.gridLine} style={{ bottom: "50%" }} data-value={scaleMax / 2} />
            <span className={`${s.gridLine} ${s.baseline}`} style={{ bottom: 0 }} data-value={0} />

            {days.map((day, i) => {
              const isToday = i === days.length - 1;
              return (
                <div
                  key={day.start}
                  className={s.barCol}
                  data-tip={`${isToday ? "Today" : dayLabel(day.start, "long")}\n${plural(day.count, "enquiry", "enquiries")}`}
                >
                  <span
                    className={`${s.bar} ${day.count === 0 ? s.barEmpty : ""} ${isToday ? s.barToday : ""}`}
                    style={day.count ? { height: `${(day.count / scaleMax) * 100}%` } : undefined}
                  />
                </div>
              );
            })}

            {total === 0 && <p className={s.chartEmpty}>No enquiries in this period</p>}
          </div>
          <div className={s.chartAxis}>
            <span>{dayLabel(days[0].start, "short")}</span>
            <span>{dayLabel(days[7].start, "short")}</span>
            <span>Today</span>
          </div>
        </div>

        {/* The same figures for screen readers. */}
        <table className="sr-only">
          <caption>Enquiries received per day, last 14 days</caption>
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Enquiries</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day.start}>
                <td>{dayLabel(day.start, "long")}</td>
                <td>{day.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─── Enquiries by status ──────────────────────────────────────── */

function Pipeline({ contacts }: { contacts: Contact[] }) {
  const total = contacts.length;
  const rows = PIPELINE_ORDER.map((status) => ({
    status,
    count: contacts.filter((c) => c.status === status).length,
  }));

  return (
    <section className={s.panel}>
      <div className={s.panelHead}>
        <div>
          <h2 className={s.panelTitle}>Enquiry pipeline</h2>
          <p className={s.panelSub}>
            <span className={s.panelFigure}>{total}</span>
            {total === 1 ? "enquiry" : "enquiries"} by status
          </p>
        </div>
      </div>

      <div className={s.panelBody}>
        <div className={s.pipeBar} aria-hidden="true">
          {total === 0 ? (
            <span className={`${s.pipeSeg} ${s.segEmpty}`} style={{ flexGrow: 1 }} />
          ) : (
            rows
              .filter((row) => row.count > 0)
              .map((row) => (
                <span
                  key={row.status}
                  className={`${s.pipeSeg} ${STATUS_STYLE[row.status].seg}`}
                  style={{ flexGrow: row.count }}
                  data-tip={`${CONTACT_STATUS_LABEL[row.status]}\n${row.count} of ${total}`}
                />
              ))
          )}
        </div>

        <ul className={s.pipeLegend}>
          {rows.map((row) => (
            <li key={row.status} className={s.pipeRow}>
              <span className={`${s.swatch} ${STATUS_STYLE[row.status].seg}`} aria-hidden="true" />
              <span className={s.pipeLabel}>{CONTACT_STATUS_LABEL[row.status]}</span>
              <span className={s.pipeCount}>{row.count}</span>
              <span className={s.pipePct}>
                {total ? `${Math.round((row.count / total) * 100)}%` : "–"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Loading placeholder in the shape of the page ─────────────── */

function OverviewSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading overview">
      <div className={`${s.skeleton} ${s.hello}`} style={{ minHeight: 148 }} />
      <div className={s.statGrid}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`${s.skeleton} ${s.stat}`} style={{ height: 146 }} />
        ))}
      </div>
      <div className={s.chartRow}>
        <div className={`${s.skeleton} ${s.panel}`} style={{ height: 290 }} />
        <div className={`${s.skeleton} ${s.panel}`} style={{ height: 290 }} />
      </div>
    </div>
  );
}

export default function Overview() {
  const { isAdmin, profile } = useSession();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedAt, setLoadedAt] = useState(0);

  useEffect(() => {
    if (!isAdmin) return;
    const supabase = getSupabase();
    if (!supabase) return;

    let alive = true;
    (async () => {
      const [insightRes, contactRes] = await Promise.all([
        supabase.from("insights").select("*").order("updated_at", { ascending: false }),
        supabase.from("contacts").select("*").order("created_at", { ascending: false }),
      ]);

      if (!alive) return;
      setInsights((insightRes.data ?? []) as Insight[]);
      setContacts((contactRes.data ?? []) as Contact[]);
      setLoadedAt(Date.now());
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, [isAdmin]);

  if (loading) return <OverviewSkeleton />;

  const published = insights.filter((i) => i.status === "published").length;
  const drafts = insights.length - published;
  const newCount = contacts.filter((c) => c.status === "new").length;
  const awaiting = contacts.filter((c) => c.status === "new" || c.status === "in_review").length;

  const stats = [
    {
      label: "Published insights",
      value: published,
      hint: `${plural(drafts, "draft", "drafts")} in progress`,
      href: "/dashboard/insights",
      icon: "M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM14 4v6h6M8 14h8M8 17h5",
      alert: false,
    },
    {
      label: "Awaiting a reply",
      value: awaiting,
      hint: awaiting ? `${newCount} new, ${awaiting - newCount} in review` : "New or in review",
      href: "/dashboard/contacts",
      icon: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
      alert: awaiting > 0,
    },
    {
      label: "Total enquiries",
      value: contacts.length,
      hint: `${contacts.filter((c) => c.status === "responded").length} responded`,
      href: "/dashboard/contacts",
      icon: "M3 6h18v12H3zM3 7l9 6 9-6",
      alert: false,
    },
    {
      label: "Archived",
      value: contacts.filter((c) => c.status === "archived").length,
      hint: "Closed without further action",
      href: "/dashboard/contacts",
      icon: "M3 4h18v4H3zM5 8v12h14V8M10 12h4",
      alert: false,
    },
  ];

  const firstName = profile?.full_name?.split(" ")[0];
  const today = new Date(loadedAt).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* ─── Greeting ─── */}
      <section className={s.hello}>
        <div className={s.helloText}>
          <p className={s.helloDate}>{today}</p>
          <h2 className={s.helloTitle}>
            {greeting(loadedAt)}
            {firstName ? `, ${firstName}` : ""}
          </h2>
          <p className={s.helloSummary}>
            {awaiting > 0
              ? `${plural(awaiting, "enquiry needs", "enquiries need")} a response.`
              : "Every enquiry has been handled."}{" "}
            {drafts > 0 && `${plural(drafts, "draft is", "drafts are")} waiting to be published.`}
          </p>
        </div>
        <div className={s.helloActions}>
          <Link href="/dashboard/contacts" className="btn-primary">
            Open inbox
            {awaiting > 0 && <span className={s.navCount}>{awaiting}</span>}
          </Link>
          <Link href="/dashboard/insights/new" className="btn-secondary">
            New insight
          </Link>
        </div>
      </section>

      {/* ─── Headline counts ─── */}
      <div className={s.statGrid}>
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`${s.stat} ${s.statLink} ${stat.alert ? s.statAlert : ""}`}
          >
            <div className={s.statTop}>
              <span className={s.statIcon}>
                <Glyph d={stat.icon} />
              </span>
              <span className={s.statLabel}>{stat.label}</span>
              <span className={s.statArrow}>
                <Glyph d={ARROW} />
              </span>
            </div>
            <div className={s.statValue}>{stat.value.toLocaleString("en-GB")}</div>
            <div className={s.statHint}>{stat.hint}</div>
          </Link>
        ))}
      </div>

      {/* ─── Charts ─── */}
      <div className={s.chartRow}>
        <ActivityChart contacts={contacts} now={loadedAt} />
        <Pipeline contacts={contacts} />
      </div>

      {/* ─── Recent activity ─── */}
      <div className={s.split}>
        <section className={s.panel}>
          <div className={s.panelHead}>
            <h2 className={s.panelTitle}>Latest enquiries</h2>
            <Link href="/dashboard/contacts" className={s.linkBtn} style={{ textDecoration: "none" }}>
              View all
            </Link>
          </div>
          {contacts.length === 0 ? (
            <div className={s.empty}>
              Nothing yet. Submissions from <code>/contact</code> arrive here.
            </div>
          ) : (
            <div>
              {contacts.slice(0, 6).map((contact) => (
                <Link key={contact.id} href="/dashboard/contacts" className={s.feedItem}>
                  <span className={s.feedAvatar} aria-hidden="true">
                    {initials(contact.first_name, contact.last_name)}
                  </span>
                  <span className={s.feedMain}>
                    <span className={s.listName}>
                      {contact.first_name} {contact.last_name}
                    </span>
                    <span className={s.listMeta}>
                      {contact.organisation || contact.email} · {timeAgo(contact.created_at, loadedAt)}
                    </span>
                  </span>
                  <span className={`${s.badge} ${STATUS_STYLE[contact.status].badge}`}>
                    {CONTACT_STATUS_LABEL[contact.status]}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className={s.panel}>
          <div className={s.panelHead}>
            <h2 className={s.panelTitle}>Recently edited insights</h2>
            <Link href="/dashboard/insights" className={s.linkBtn} style={{ textDecoration: "none" }}>
              View all
            </Link>
          </div>
          {insights.length === 0 ? (
            <div className={s.empty}>
              No insights yet.{" "}
              <Link href="/dashboard/insights/new" style={{ color: "var(--cuxton-teal-text)" }}>
                Write the first one
              </Link>
            </div>
          ) : (
            <div>
              {insights.slice(0, 6).map((insight) => (
                <Link
                  key={insight.id}
                  href={`/dashboard/insights/edit?id=${insight.id}`}
                  className={s.feedItem}
                >
                  <span className={s.feedThumb} aria-hidden="true">
                    {insight.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={insight.cover_image} alt="" />
                    ) : (
                      <Glyph d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM14 4v6h6" />
                    )}
                  </span>
                  <span className={s.feedMain}>
                    <span className={s.listName}>{insight.title}</span>
                    <span className={s.listMeta}>
                      {insight.tag} · updated {timeAgo(insight.updated_at, loadedAt)}
                    </span>
                  </span>
                  <span
                    className={`${s.badge} ${
                      insight.status === "published" ? s.badgeDone : s.badgeMuted
                    }`}
                  >
                    {insight.status === "published" ? "Live" : "Draft"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
