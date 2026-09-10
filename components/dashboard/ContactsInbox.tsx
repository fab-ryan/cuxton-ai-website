"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { functionUrl, getSupabase } from "@/lib/supabase/client";
import {
  CONTACT_STATUS_LABEL,
  type Contact,
  type ContactReply,
  type ContactStatus,
} from "@/lib/supabase/types";
import { formatDateTime } from "@/lib/insights";
import { useSession } from "./SessionProvider";
import s from "./dashboard.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Contact enquiries: a list on the left, the selected enquiry and its
   reply thread on the right.

   Sending is delegated to the send-contact-reply Edge Function — the
   Resend key must never reach the browser, and this bundle is fully
   public.
   ═══════════════════════════════════════════════════════════════════ */

type Filter = "all" | ContactStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "new", label: "New" },
  { key: "in_review", label: "In review" },
  { key: "responded", label: "Responded" },
  { key: "archived", label: "Archived" },
  { key: "all", label: "All" },
];

const STATUS_CLASS: Record<ContactStatus, string> = {
  new: s.badgeNew,
  in_review: s.badgeReview,
  responded: s.badgeDone,
  archived: s.badgeMuted,
};

export default function ContactsInbox() {
  const { isAdmin, session } = useSession();

  const [rows, setRows] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadContacts = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { data, error: loadError } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    else setRows((data ?? []) as Contact[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    void (async () => {
      await loadContacts();
    })();
  }, [isAdmin, loadContacts]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (filter !== "all" && row.status !== filter) return false;
      if (!needle) return true;
      return [row.first_name, row.last_name, row.email, row.organisation ?? "", row.message]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [rows, filter, query]);

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: rows.length,
      new: 0,
      in_review: 0,
      responded: 0,
      archived: 0,
    };
    for (const row of rows) base[row.status] += 1;
    return base;
  }, [rows]);

  const selected = rows.find((row) => row.id === selectedId) ?? null;

  /** Patch a contact locally and in Postgres, keeping the two in step. */
  const patchContact = useCallback(async (id: string, patch: Partial<Contact>) => {
    const supabase = getSupabase();
    if (!supabase) return false;

    const { error: updateError } = await supabase.from("contacts").update(patch).eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return false;
    }
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
    return true;
  }, []);

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
          placeholder="Search name, email, organisation…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search enquiries"
        />
      </div>

      {error && (
        <div className={`${s.notice} ${s.noticeError}`} role="alert" style={{ marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      <div className={s.split}>
        {/* ─── List ─── */}
        <div className={s.panel}>
          <div className={s.panelHead}>
            <span className={s.panelTitle}>
              {visible.length} {visible.length === 1 ? "enquiry" : "enquiries"}
            </span>
            <button type="button" className={s.linkBtn} onClick={loadContacts}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className={s.empty}>
              <div className={s.spinner} />
            </div>
          ) : visible.length === 0 ? (
            <div className={s.empty}>
              {rows.length === 0
                ? "No enquiries have come in yet. Submissions from the public contact form land here."
                : "Nothing matches that filter."}
            </div>
          ) : (
            <div className={s.listScroll}>
              {visible.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => setSelectedId(row.id)}
                  className={`${s.listItem} ${selectedId === row.id ? s.listItemActive : ""} ${row.status === "new" ? s.rowUnread : ""
                    }`}
                  aria-current={selectedId === row.id ? "true" : undefined}
                >
                  <div className={s.listTop}>
                    <span className={s.listName}>
                      {row.first_name} {row.last_name}
                    </span>
                    <span className={`${s.badge} ${STATUS_CLASS[row.status]}`}>
                      {CONTACT_STATUS_LABEL[row.status]}
                    </span>
                  </div>
                  <div className={s.listMeta}>
                    {row.organisation || row.email}, {formatDateTime(row.created_at)}
                  </div>
                  <p className={s.listSnippet}>{row.message}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ─── Detail ─── */}
        {selected ? (
          <ContactDetail
            key={selected.id}
            contact={selected}
            adminEmail={session?.user.email ?? ""}
            onPatch={patchContact}
            onSent={() => patchContact(selected.id, { status: "responded" })}
          />
        ) : (
          <div className={s.panel}>
            <div className={s.empty}>Select an enquiry to read it and reply.</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Detail pane
   ═══════════════════════════════════════════════════════════════════ */

function ContactDetail({
  contact,
  adminEmail,
  onPatch,
  onSent,
}: {
  contact: Contact;
  adminEmail: string;
  onPatch: (id: string, patch: Partial<Contact>) => Promise<boolean>;
  onSent: () => void;
}) {
  const [replies, setReplies] = useState<ContactReply[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(true);
  const [notes, setNotes] = useState(contact.internal_notes);
  const [notesSaved, setNotesSaved] = useState(false);

  const [subject, setSubject] = useState(
    `Re: your enquiry to CuxtonAI`
  );
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendOk, setSendOk] = useState(false);

  const loadReplies = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { data } = await supabase
      .from("contact_replies")
      .select("*")
      .eq("contact_id", contact.id)
      .order("created_at", { ascending: true });

    setReplies((data ?? []) as ContactReply[]);
    setLoadingReplies(false);
  }, [contact.id]);

  useEffect(() => {
    void (async () => {
      await loadReplies();
    })();
  }, [loadReplies]);

  /* Opening a brand-new enquiry moves it out of the unread pile. */
  useEffect(() => {
    if (contact.status === "new") onPatch(contact.id, { status: "in_review" });
    // Deliberately keyed on the contact only: re-running on every status
    // change would fight the manual status control below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact.id]);

  async function saveNotes() {
    const ok = await onPatch(contact.id, { internal_notes: notes });
    if (ok) {
      setNotesSaved(true);
      window.setTimeout(() => setNotesSaved(false), 2500);
    }
  }

  async function send() {
    setSendError(null);
    setSendOk(false);

    if (!subject.trim() || !body.trim()) {
      setSendError("A subject and a message are both required.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) return setSendError("Supabase is not configured.");

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) return setSendError("Your session has expired. Sign in again.");

    setSending(true);
    try {
      const res = await fetch(functionUrl("send-contact-reply"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId: contact.id,
          subject: subject.trim(),
          body: body.trim(),
        }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSendError(result?.error ?? `The reply could not be sent (${res.status}).`);
      } else {
        setSendOk(true);
        setBody("");
        onSent();
        await loadReplies();
      }
    } catch (err) {
      setSendError(
        `Could not reach the send-contact-reply function: ${err instanceof Error ? err.message : "unknown error"
        }`
      );
    } finally {
      setSending(false);
    }
  }

  const fields: [string, string][] = [
    ["Email", contact.email],
    ["Organisation", contact.organisation || "—"],
    ["Role", contact.role || "—"],
    ["Sector", contact.sector || "—"],
    ["Team size", contact.team_size || "—"],
    ["Received", formatDateTime(contact.created_at)],
  ];

  return (
    <div className={s.detailStack}>
      {/* ── The enquiry ── */}
      <div className={s.panel}>
        <div className={s.panelHead}>
          <div>
            <div className={s.panelTitle}>
              {contact.first_name} {contact.last_name}
            </div>
            <div className={s.listMeta}>{contact.email}</div>
          </div>
          <select
            className="form-field form-select"
            value={contact.status}
            onChange={(e) => onPatch(contact.id, { status: e.target.value as ContactStatus })}
            style={{ width: "auto", padding: "0.4rem 2rem 0.4rem 0.75rem", fontSize: "0.78rem" }}
            aria-label="Enquiry status"
          >
            {(Object.keys(CONTACT_STATUS_LABEL) as ContactStatus[]).map((key) => (
              <option key={key} value={key}>
                {CONTACT_STATUS_LABEL[key]}
              </option>
            ))}
          </select>
        </div>

        <div className={s.panelBody}>
          <div className={s.fieldGrid}>
            {fields.map(([label, value]) => (
              <div key={label}>
                <div className={s.fieldLabel}>{label}</div>
                <div className={s.fieldValue}>
                  {label === "Email" ? (
                    <a
                      href={`mailto:${value}`}
                      style={{ color: "var(--cuxton-teal-text)", textDecoration: "none" }}
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </div>
              </div>
            ))}
          </div>

          {contact.topics.length > 0 && (
            <div style={{ marginBottom: "1.25rem" }}>
              <div className={s.fieldLabel}>Topics of interest</div>
              <div className={s.chipRow}>
                {contact.topics.map((topic) => (
                  <span key={topic} className="tag-teal">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={s.fieldLabel}>Message</div>
          <div className={s.quote}>{contact.message}</div>
        </div>
      </div>

      {/* ── Reply thread ── */}
      <div className={s.panel}>
        <div className={s.panelHead}>
          <span className={s.panelTitle}>
            Replies sent {replies.length > 0 && `(${replies.length})`}
          </span>
        </div>
        <div className={s.panelBody}>
          {loadingReplies ? (
            <div className={s.spinner} />
          ) : replies.length === 0 ? (
            <p className={s.hint} style={{ marginTop: 0 }}>
              No reply has been sent yet.
            </p>
          ) : (
            <div className={s.thread}>
              {replies.map((reply) => (
                <div key={reply.id} className={s.threadItem}>
                  <div className={s.threadHead}>
                    <span className={s.threadSubject}>{reply.subject}</span>
                    <span
                      className={`${s.badge} ${reply.email_status === "sent"
                        ? s.badgeDone
                        : reply.email_status === "failed"
                          ? s.badgeFail
                          : s.badgeMuted
                        }`}
                    >
                      {reply.email_status}
                    </span>
                  </div>
                  <div className={s.threadBody}>{reply.body}</div>
                  <p className={s.hint}>
                    {formatDateTime(reply.created_at)}
                    {reply.email_error ? `, ${reply.email_error}` : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Compose ── */}
      <div className={s.panel}>
        <div className={s.panelHead}>
          <span className={s.panelTitle}>Reply by email</span>
          <span className={s.listMeta}>to {contact.email}</span>
        </div>
        <div className={s.panelBody}>
          <div style={{ marginBottom: "0.9rem" }}>
            <label htmlFor="reply-subject" className="form-label">
              Subject
            </label>
            <input
              id="reply-subject"
              className="form-field"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="reply-body" className="form-label">
              Message
            </label>
            <textarea
              id="reply-body"
              className="form-field form-textarea"
              rows={9}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`Thank you for getting in touch about ${contact.topics[0] ?? "your AI programme"
                }…`}
            />
            <p className={s.hint}>
              Sent as {adminEmail ? `a reply-to for ${adminEmail}` : "the configured sender"}. Blank
              lines become paragraphs.
            </p>
          </div>

          {sendError && (
            <div className={`${s.notice} ${s.noticeError}`} role="alert" style={{ marginBottom: "1rem" }}>
              {sendError}
            </div>
          )}
          {sendOk && (
            <div className={`${s.notice} ${s.noticeOk}`} role="status" style={{ marginBottom: "1rem" }}>
              Reply sent and logged against this enquiry.
            </div>
          )}

          <div className={s.actions}>
            <button
              type="button"
              className="btn-primary"
              onClick={send}
              disabled={sending}
              style={{ opacity: sending ? 0.6 : 1 }}
            >
              {sending ? "Sending…" : "Send reply"}
            </button>
            <a href={`mailto:${contact.email}`} className="btn-secondary">
              Open in mail client
            </a>
          </div>
        </div>
      </div>

      {/* ── Internal notes ── */}
      <div className={s.panel}>
        <div className={s.panelHead}>
          <span className={s.panelTitle}>Internal notes</span>
          {notesSaved && <span className={s.listMeta}>Saved</span>}
        </div>
        <div className={s.panelBody}>
          <textarea
            className="form-field form-textarea"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Context, qualification, next steps. Never sent to the contact."
          />
          <div className={s.actions} style={{ marginTop: "0.75rem" }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={saveNotes}
              disabled={notes === contact.internal_notes}
            >
              Save notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
