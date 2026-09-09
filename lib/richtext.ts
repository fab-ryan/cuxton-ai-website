/* ═══════════════════════════════════════════════════════════════════
   The rich-text document, in Tiptap's JSON shape.

   Storing the document rather than a rendered HTML string is what keeps
   the public site safe: `RichContent` walks this tree and builds React
   elements, so nothing an author types can ever become markup. The one
   thing that still needs guarding is URLs, since `href` and `src` are
   attacker-controlled strings even inside a well-formed tree.
   ═══════════════════════════════════════════════════════════════════ */

export type RichMark = {
  type: string;
  attrs?: Record<string, unknown> | null;
};

export type RichNode = {
  type: string;
  attrs?: Record<string, unknown> | null;
  content?: RichNode[];
  marks?: RichMark[];
  text?: string;
};

export type RichDoc = {
  type: "doc";
  content?: RichNode[];
};

/** An empty document, which is what Tiptap produces for a blank editor. */
export const EMPTY_DOC: RichDoc = { type: "doc", content: [] };

/** Narrow an unknown jsonb value to a document we are willing to render. */
export function asRichDoc(value: unknown): RichDoc | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as RichDoc;
  if (candidate.type !== "doc") return null;
  if (candidate.content && !Array.isArray(candidate.content)) return null;
  return candidate;
}

/** True when the document has no text and no media worth rendering. */
export function isDocEmpty(doc: RichDoc | null): boolean {
  if (!doc) return true;
  if (!doc.content || doc.content.length === 0) return true;
  return docToPlainText(doc).trim() === "" && !hasNode(doc, "image");
}

function hasNode(node: RichNode | RichDoc, type: string): boolean {
  if ((node as RichNode).type === type) return true;
  return (node.content ?? []).some((child) => hasNode(child, type));
}

/**
 * Flatten a document to plain text.
 *
 * Block boundaries become blank lines so the result reads like prose —
 * excerpts, reading time and any future search index all work from this
 * rather than from the tree.
 */
export function docToPlainText(doc: RichDoc | null): string {
  if (!doc?.content) return "";

  const BLOCKS = new Set([
    "paragraph",
    "heading",
    "blockquote",
    "listItem",
    "codeBlock",
    "horizontalRule",
  ]);

  const parts: string[] = [];

  const walk = (node: RichNode) => {
    if (node.type === "text" && node.text) {
      parts.push(node.text);
      return;
    }
    if (node.type === "hardBreak") {
      parts.push(" ");
      return;
    }
    (node.content ?? []).forEach(walk);
    if (BLOCKS.has(node.type)) parts.push("\n\n");
  };

  doc.content.forEach(walk);

  return parts.join("").replace(/\n{3,}/g, "\n\n").trim();
}

/* ─── URL guards ──────────────────────────────────────────────────
   An author can type anything into a link dialog, and a pasted
   document can carry arbitrary attrs. `javascript:` and `data:` hrefs
   are the classic way markup-free content still executes, so both are
   rejected here rather than trusted to the browser.
   ───────────────────────────────────────────────────────────────── */

const SAFE_LINK_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/** A link href we are willing to emit, or null to render the text unlinked. */
export function safeHref(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const href = value.trim();
  if (!href) return null;

  // Relative and anchor links stay on this site and are always fine.
  if (href.startsWith("/") || href.startsWith("#")) return href;

  try {
    const url = new URL(href);
    return SAFE_LINK_PROTOCOLS.has(url.protocol) ? href : null;
  } catch {
    return null;
  }
}

/** An image src we are willing to emit, or null to drop the image. */
export function safeImageSrc(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const src = value.trim();
  if (!src) return null;

  if (src.startsWith("/")) return src;

  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:" ? src : null;
  } catch {
    return null;
  }
}

/** Read a string attribute, or an empty string when it is absent or wrong-typed. */
export function attrString(attrs: RichNode["attrs"], key: string): string {
  const value = attrs?.[key];
  return typeof value === "string" ? value : "";
}
