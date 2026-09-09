"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { INSIGHT_TAGS, type Insight, type InsightStatus } from "@/lib/supabase/types";
import { deriveExcerpt, formatDateTime, readingMinutes, slugify } from "@/lib/insights";
import { asRichDoc, EMPTY_DOC, isDocEmpty, type RichDoc } from "@/lib/richtext";
import RichTextEditor from "./RichTextEditor";
import CoverImageField from "./CoverImageField";
import { useSession } from "./SessionProvider";
import s from "./dashboard.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Create / edit an insight.

   One component serves both routes: `insightId` is null on /new and set
   from the ?id= query on /edit. Slug is derived from the title until
   the author touches it, after which it is left alone — renaming a
   published post should not silently break its URL.
   ═══════════════════════════════════════════════════════════════════ */

type Draft = {
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  /** Plain-text rendition of `doc`, kept for excerpts, reading time and search. */
  body: string;
  /** The rich-text document the editor actually edits. */
  doc: RichDoc;
  cover_image: string;
  status: InsightStatus;
};

const EMPTY: Draft = {
  title: "",
  slug: "",
  tag: "Architecture",
  excerpt: "",
  body: "",
  doc: EMPTY_DOC,
  cover_image: "",
  status: "draft",
};

export default function InsightEditor({ insightId }: { insightId: string | null }) {
  const router = useRouter();
  const { session, isAdmin } = useSession();

  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [original, setOriginal] = useState<Insight | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(Boolean(insightId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const set = useCallback(<K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setNotice(null);
  }, []);

  /* ── Load an existing post ── */
  useEffect(() => {
    if (!insightId || !isAdmin) return;
    const supabase = getSupabase();
    if (!supabase) return;

    let alive = true;
    (async () => {
      const { data, error: loadError } = await supabase
        .from("insights")
        .select("*")
        .eq("id", insightId)
        .maybeSingle();

      if (!alive) return;

      if (loadError) {
        setError(loadError.message);
      } else if (!data) {
        setError("That insight no longer exists.");
      } else {
        const row = data as Insight;
        setOriginal(row);
        setDraft({
          title: row.title,
          slug: row.slug,
          tag: row.tag,
          excerpt: row.excerpt,
          body: row.body,
          // A post written before the rich editor existed has no document.
          // Its plain text is carried into one paragraph so it stays editable
          // rather than opening blank.
          doc: asRichDoc(row.body_json) ?? plainTextToDoc(row.body),
          cover_image: row.cover_image ?? "",
          status: row.status,
        });
        setSlugTouched(true);
      }
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, [insightId, isAdmin]);

  /* Keep the slug in step with the title until the author edits it. */
  const handleTitle = (value: string) => {
    setDraft((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
    setNotice(null);
  };

  async function save(nextStatus?: InsightStatus) {
    const status = nextStatus ?? draft.status;
    const candidate = { ...draft, status };

    setError(null);
    setNotice(null);

    const invalid = validateDraft(candidate);
    if (invalid) return setError(invalid);

    const supabase = getSupabase();
    if (!supabase) return setError("Supabase is not configured.");

    setSaving(true);

    const payload = {
      title: candidate.title.trim(),
      slug: candidate.slug.trim(),
      tag: candidate.tag,
      excerpt: candidate.excerpt.trim() || deriveExcerpt(candidate.body),
      body: candidate.body,
      body_json: candidate.doc,
      cover_image: candidate.cover_image.trim() || null,
      read_minutes: readingMinutes(candidate.body),
      status,
    };

    if (insightId) {
      const { error: updateError } = await supabase
        .from("insights")
        .update(payload)
        .eq("id", insightId);

      setSaving(false);
      if (updateError) return setError(friendly(updateError.message));

      setDraft(candidate);
      setNotice(
        status === "published" ? "Saved and published." : "Saved as a draft."
      );
      return;
    }

    const { data, error: insertError } = await supabase
      .from("insights")
      .insert({ ...payload, author_id: session?.user.id ?? null })
      .select("id")
      .single();

    setSaving(false);
    if (insertError) return setError(friendly(insertError.message));

    router.replace(`/dashboard/insights/edit?id=${data.id}`);
  }

  async function remove() {
    if (!insightId) return;
    if (!window.confirm("Delete this insight permanently? This cannot be undone.")) return;

    const supabase = getSupabase();
    if (!supabase) return;

    setSaving(true);
    const { error: deleteError } = await supabase.from("insights").delete().eq("id", insightId);
    setSaving(false);

    if (deleteError) return setError(deleteError.message);
    router.push("/dashboard/insights");
  }

  if (loading) {
    return (
      <div className={s.centre}>
        <div className={s.spinner} />
      </div>
    );
  }

  const validationError = validateDraft({ ...draft, status: "published" });

  return (
    <div>
      <div className={s.toolbar} style={{ justifyContent: "space-between" }}>
        <Link href="/dashboard/insights" className={s.linkBtn} style={{ textDecoration: "none" }}>
          ← All insights
        </Link>
        <div className={s.actions}>
          {/* The client-rendered route, which resolves any published slug
              whether or not the last deploy prerendered a page for it. */}
          {original?.status === "published" && (
            <Link
              href={`/insights/view?slug=${encodeURIComponent(original.slug)}`}
              className={s.linkBtn}
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              View live ↗
            </Link>
          )}
          {insightId && (
            <button type="button" className={`${s.linkBtn} ${s.danger}`} onClick={remove}>
              Delete
            </button>
          )}
        </div>
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

      <div className={s.editorGrid}>
        {/* ─── Main column ─── */}
        <div className={s.panel}>
          <div className={s.panelBody}>
            <div style={{ marginBottom: "1.1rem" }}>
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                id="title"
                className="form-field"
                value={draft.title}
                onChange={(e) => handleTitle(e.target.value)}
                placeholder="Private AI vs public AI: how to choose the right deployment model"
              />
            </div>

            <div style={{ marginBottom: "1.1rem" }}>
              <label htmlFor="excerpt" className="form-label">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                className="form-field form-textarea"
                rows={2}
                value={draft.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="Optional the first paragraph is used if you leave this blank."
              />
              <p className={s.hint}>Shown on the insight cards and in search results.</p>
            </div>

            <div>
              <span className="form-label">Body</span>
              {/* The editor owns its own state after mount, so it is given the
                  document once. The `loading` gate above guarantees an existing
                  post has already been fetched by the time this renders. */}
              <RichTextEditor
                initialDoc={draft.doc}
                onChange={(doc, plainText) =>
                  setDraft((prev) => ({ ...prev, doc, body: plainText }))
                }
                placeholder="Write the article. Drag an image straight in, or use the toolbar."
              />
            </div>
          </div>
        </div>

        {/* ─── Sidebar ─── */}
        <div className={s.sideStack}>
          <div className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>Publishing</span>
              <span
                className={`${s.badge} ${draft.status === "published" ? s.badgeDone : s.badgeMuted}`}
              >
                {draft.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
            <div className={s.panelBody}>
              <div className={s.actions} style={{ marginBottom: "0.9rem" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => save("draft")}
                  disabled={saving}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  {saving ? "Working…" : "Save draft"}
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => save("published")}
                  disabled={saving || Boolean(validationError)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    opacity: saving || validationError ? 0.55 : 1,
                  }}
                >
                  {draft.status === "published" ? "Update" : "Publish"}
                </button>
              </div>

              {draft.status === "published" && insightId && (
                <button
                  type="button"
                  className={s.linkBtn}
                  onClick={() => save("draft")}
                  disabled={saving}
                >
                  Unpublish and return to draft
                </button>
              )}

              {validationError && (
                <p className={s.hint} style={{ color: "#d15757" }}>
                  {validationError}
                </p>
              )}

              {original && (
                <p className={s.hint} style={{ marginTop: "0.75rem" }}>
                  Last saved {formatDateTime(original.updated_at)}
                </p>
              )}
            </div>
          </div>

          <div className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>Metadata</span>
            </div>
            <div className={s.panelBody}>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <select
                  id="tag"
                  className="form-field form-select"
                  value={draft.tag}
                  onChange={(e) => set("tag", e.target.value)}
                >
                  {INSIGHT_TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="slug" className="form-label">
                  URL slug
                </label>
                <input
                  id="slug"
                  className="form-field"
                  value={draft.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value);
                  }}
                  placeholder="private-ai-vs-public-ai"
                />
                <p className={s.hint}>/insights/{draft.slug || "…"}</p>
              </div>

              <div>
                <span className="form-label">Cover photo</span>
                <CoverImageField
                  value={draft.cover_image}
                  onChange={(url) => set("cover_image", url)}
                />
              </div>
            </div>
          </div>

          <div className={`${s.notice} ${s.noticeInfo}`}>
            The public site is a static export. Edits to an already-published insight appear
            immediately, but a <strong>brand-new</strong> post only gets its own page at{" "}
            <code>/insights/{draft.slug || "slug"}</code> after the next site deploy.
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Wrap plain text in a minimal document.
 *
 * Only used for posts written before the rich editor existed: their text
 * becomes one paragraph per blank-line-separated block, so the author can
 * carry on in the editor instead of facing an empty page.
 */
function plainTextToDoc(text: string): RichDoc {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return EMPTY_DOC;

  return {
    type: "doc",
    content: paragraphs.map((chunk) => ({
      type: "paragraph",
      content: [{ type: "text", text: chunk.replace(/\n/g, " ") }],
    })),
  };
}

/** The rules a draft must satisfy before it can be saved. */
function validateDraft(draft: Draft): string | null {
  if (!draft.title.trim()) return "A title is required.";
  if (!draft.slug.trim()) return "A slug is required.";
  if (!/^[a-z0-9-]+$/.test(draft.slug)) {
    return "The slug may only contain lowercase letters, numbers and hyphens.";
  }
  if (draft.status === "published" && isDocEmpty(draft.doc)) {
    return "A published insight needs a body.";
  }
  return null;
}

/** Turn the few Postgres errors an author can actually cause into plain English. */
function friendly(message: string): string {
  if (message.includes("insights_slug_key") || message.includes("duplicate key")) {
    return "Another insight already uses that slug. Pick a different one.";
  }
  if (message.includes("row-level security")) {
    return "Your account is not permitted to change insights.";
  }
  return message;
}
