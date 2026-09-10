import type { Insight } from "@/lib/supabase/types";

/** URL-safe slug from a title. Mirrors the uniqueness constraint on insights.slug. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Rough reading time, rounded up, minimum one minute. */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** First non-empty paragraph, trimmed to a card-sized summary. */
export function deriveExcerpt(body: string, limit = 180): string {
  const first = body.trim().split(/\n{2,}/)[0] ?? "";
  const flat = first.replace(/\s+/g, " ").trim();
  return flat.length <= limit ? flat : `${flat.slice(0, limit).trimEnd()}…`;
}

export function sortByPublished(a: Insight, b: Insight): number {
  const at = a.published_at ?? a.created_at;
  const bt = b.published_at ?? b.created_at;
  return new Date(bt).getTime() - new Date(at).getTime();
}

/**
 * Where to link a published insight.
 *
 * Under `output: "export"` only the slugs present at build time have their
 * own prerendered HTML file. A post published since then is still reachable
 * — through the client-rendered /insights/view route — so the index never
 * links a visitor into a 404 while waiting for the next deploy.
 */
export function insightHref(slug: string, prerendered: ReadonlySet<string>): string {
  return prerendered.has(slug)
    ? `/insights/${slug}`
    : `/insights/view?slug=${encodeURIComponent(slug)}`;
}
