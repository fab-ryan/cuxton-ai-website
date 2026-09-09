/* ═══════════════════════════════════════════════════════════════════
   Row shapes for the tables defined in supabase/schema.sql.
   Kept hand-written rather than generated so the app has one small,
   readable contract to code against.
   ═══════════════════════════════════════════════════════════════════ */

export type Role = "admin" | "viewer";
export type InsightStatus = "draft" | "published";
export type ContactStatus = "new" | "in_review" | "responded" | "archived";
export type EmailStatus = "pending" | "sent" | "failed";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  created_at: string;
};

export type Insight = {
  id: string;
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  /** Plain-text rendition of `body_json`, used for excerpts and reading time. */
  body: string;
  /** The rich-text document itself, in Tiptap's JSON shape. See lib/richtext.ts. */
  body_json: unknown;
  cover_image: string | null;
  read_minutes: number | null;
  status: InsightStatus;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  organisation: string | null;
  role: string | null;
  sector: string | null;
  team_size: string | null;
  message: string;
  topics: string[];
  status: ContactStatus;
  internal_notes: string;
  created_at: string;
  updated_at: string;
};

export type ContactReply = {
  id: string;
  contact_id: string;
  author_id: string | null;
  subject: string;
  body: string;
  email_status: EmailStatus;
  email_error: string | null;
  provider_message_id: string | null;
  created_at: string;
};

/* ─── Presentation helpers shared by the dashboard ─── */

export const CONTACT_STATUS_LABEL: Record<ContactStatus, string> = {
  new: "New",
  in_review: "In review",
  responded: "Responded",
  archived: "Archived",
};

export const INSIGHT_TAGS = [
  "AI Strategy",
  "Architecture",
  "AI Agents",
  "Grounding",
  "Governance",
  "Automation",
  "Integration",
  "Security",
] as const;
