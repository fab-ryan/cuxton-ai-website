"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase/client";
import {
  CONTACT_STATUS_LABEL,
  type Contact,
  type Insight,
} from "@/lib/supabase/types";
import { formatDate, formatDateTime } from "@/lib/insights";
import { useSession } from "./SessionProvider";
import s from "./dashboard.module.css";

export default function Overview() {
  const { isAdmin, profile } = useSession();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, [isAdmin]);

  if (loading) {
    return (
      <div className={s.centre}>
        <div className={s.spinner} />
      </div>
    );
  }

  const published = insights.filter((i) => i.status === "published").length;
  const drafts = insights.length - published;
  const awaiting = contacts.filter((c) => c.status === "new" || c.status === "in_review").length;

  const stats = [
    {
      label: "Published insights",
      value: published,
      hint: `${drafts} ${drafts === 1 ? "draft" : "drafts"} in progress`,
    },
    {
      label: "Awaiting a reply",
      value: awaiting,
      hint: "New or in review",
    },
    {
      label: "Total enquiries",
      value: contacts.length,
      hint: `${contacts.filter((c) => c.status === "responded").length} responded`,
    },
    {
      label: "Archived",
      value: contacts.filter((c) => c.status === "archived").length,
      hint: "Closed without further action",
    },
  ];

  const firstName = profile?.full_name?.split(" ")[0];

  return (
    <div>
      <p
        style={{
          fontSize: "0.88rem",
          color: "rgba(var(--foreground-rgb),0.5)",
          marginBottom: "1.5rem",
        }}
      >
        {firstName ? `Welcome back, ${firstName}. ` : ""}
        {awaiting > 0
          ? `${awaiting} ${awaiting === 1 ? "enquiry needs" : "enquiries need"} a response.`
          : "Every enquiry has been handled."}
      </p>

      <div className={s.statGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <div className={s.statLabel}>{stat.label}</div>
            <div className={s.statValue}>{stat.value}</div>
            <div className={s.statHint}>{stat.hint}</div>
          </div>
        ))}
      </div>

      <div className={s.split}>
        {/* ─── Recent enquiries ─── */}
        <div className={s.panel}>
          <div className={s.panelHead}>
            <span className={s.panelTitle}>Latest enquiries</span>
            <Link href="/dashboard/contacts" className={s.linkBtn} style={{ textDecoration: "none" }}>
              Open inbox →
            </Link>
          </div>
          {contacts.length === 0 ? (
            <div className={s.empty}>
              Nothing yet. Submissions from <code>/contact</code> arrive here.
            </div>
          ) : (
            <div>
              {contacts.slice(0, 6).map((contact) => (
                <Link
                  key={contact.id}
                  href="/dashboard/contacts"
                  className={s.listItem}
                  style={{ textDecoration: "none" }}
                >
                  <div className={s.listTop}>
                    <span className={s.listName}>
                      {contact.first_name} {contact.last_name}
                    </span>
                    <span className={s.listMeta}>{CONTACT_STATUS_LABEL[contact.status]}</span>
                  </div>
                  <div className={s.listMeta}>
                    {contact.organisation || contact.email} · {formatDateTime(contact.created_at)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ─── Recent insights ─── */}
        <div className={s.panel}>
          <div className={s.panelHead}>
            <span className={s.panelTitle}>Recently edited insights</span>
            <Link
              href="/dashboard/insights/new"
              className={s.linkBtn}
              style={{ textDecoration: "none" }}
            >
              New insight →
            </Link>
          </div>
          {insights.length === 0 ? (
            <div className={s.empty}>
              No insights yet.{" "}
              <Link href="/dashboard/insights/new" style={{ color: "var(--cuxton-teal-text)" }}>
                Write the first one →
              </Link>
            </div>
          ) : (
            <div>
              {insights.slice(0, 6).map((insight) => (
                <Link
                  key={insight.id}
                  href={`/dashboard/insights/edit?id=${insight.id}`}
                  className={s.listItem}
                  style={{ textDecoration: "none" }}
                >
                  <div className={s.listTop}>
                    <span className={s.listName}>{insight.title}</span>
                    <span
                      className={`${s.badge} ${
                        insight.status === "published" ? s.badgeDone : s.badgeMuted
                      }`}
                    >
                      {insight.status === "published" ? "Live" : "Draft"}
                    </span>
                  </div>
                  <div className={s.listMeta}>
                    {insight.tag} · updated {formatDate(insight.updated_at)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
