// ═══════════════════════════════════════════════════════════════════
//  send-broadcast — Supabase Edge Function (Deno)
//
//  Sends an Executive AI Briefing to every active subscriber, or — with
//  `test: true` — a single copy to the admin who asked, so it can be
//  checked in a real inbox first.
//
//  Every email carries the recipient's own unsubscribe link, so each one
//  is rendered individually and sent through Resend's batch endpoint,
//  100 at a time.
//
//  Deploy:
//    supabase functions deploy send-broadcast
//    supabase secrets set RESEND_API_KEY=re_xxx \
//                         BRIEFING_FROM="CuxtonAI Briefings <briefings@cuxtonai.com>" \
//                         SITE_URL=https://cuxtonai.com
// ═══════════════════════════════════════════════════════════════════
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const BRIEFING_FROM =
  Deno.env.get("BRIEFING_FROM") ??
  Deno.env.get("REPLY_FROM") ??
  "CuxtonAI <info@cuxtonai.com>";
const SITE_URL = (Deno.env.get("SITE_URL") ?? "https://cuxtonai.com").replace(
  /\/+$/,
  "",
);

/** Resend's ceiling for one batch request. */
const BATCH_SIZE = 100;
/** Gap between batch requests, to stay under Resend's default rate limit. */
const BATCH_GAP_MS = 600;
/** Supabase returns at most this many rows per request. */
const PAGE_SIZE = 1000;
/** A "sending" row younger than this blocks a second, overlapping send. */
const IN_FLIGHT_WINDOW_MS = 10 * 60 * 1000;

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") ?? "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Feature = {
  title: string;
  excerpt: string;
  coverImage: string | null;
  url: string;
};
type Recipient = { email: string; unsubscribe_token: string };
type OutgoingEmail = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  headers: Record<string, string>;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Minimal HTML escape — briefing text is admin-authored but still untrusted input. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(
  body: string,
  feature: Feature | null,
  unsubscribeUrl: string,
) {
  const paragraphs = body
    .split(/\n{2,}/)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;line-height:1.7;">${escapeHtml(p).replace(/\n/g, "<br />")}</p>`,
    )
    .join("");

  const featureBlock = feature
    ? `<div style="margin:24px 0 8px;border:1px solid #dbe6f0;border-radius:12px;overflow:hidden;">
      ${
        feature.coverImage
          ? `<img src="${escapeHtml(feature.coverImage)}" alt="" width="494" style="display:block;width:100%;height:auto;border:0;" />`
          : ""
      }
      <div style="padding:20px;">
        <p style="margin:0 0 8px;font-size:17px;font-weight:600;line-height:1.4;color:#0c2233;">${escapeHtml(feature.title)}</p>
        ${
          feature.excerpt
            ? `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#5b7186;">${escapeHtml(feature.excerpt)}</p>`
            : ""
        }
        <a href="${escapeHtml(feature.url)}" style="display:inline-block;background:#1b6b8a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px;">Read the insight</a>
      </div>
    </div>`
    : "";

  return `<!doctype html>
<html><body style="margin:0;padding:32px 16px;background:#f4f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0c2233;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #dbe6f0;border-radius:16px;padding:32px;">
    <p style="margin:0 0 24px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1b6b8a;">CuxtonAI Executive AI Briefing</p>
    ${paragraphs}
    ${featureBlock}
    <hr style="border:none;border-top:1px solid #dbe6f0;margin:28px 0;" />
    <p style="margin:0;font-size:12px;color:#5b7186;line-height:1.6;">
      You are receiving this because you subscribed to Executive AI Briefings at cuxtonai.com.
      <a href="${escapeHtml(unsubscribeUrl)}" style="color:#1b6b8a;">Unsubscribe</a>
    </p>
  </div>
</body></html>`;
}

function renderText(
  body: string,
  feature: Feature | null,
  unsubscribeUrl: string,
) {
  const parts = [body];
  if (feature) parts.push(`${feature.title}\n${feature.url}`);
  parts.push(`Unsubscribe: ${unsubscribeUrl}`);
  return parts.join("\n\n");
}

function buildEmail(
  to: string,
  subject: string,
  body: string,
  feature: Feature | null,
  unsubscribeUrl: string,
): OutgoingEmail {
  return {
    from: BRIEFING_FROM,
    to: [to],
    subject,
    html: renderHtml(body, feature, unsubscribeUrl),
    text: renderText(body, feature, unsubscribeUrl),
    // Lets mail clients show their own "Unsubscribe" control.
    headers: { "List-Unsubscribe": `<${unsubscribeUrl}>` },
  };
}

/** POST to Resend, retrying briefly if rate-limited. Returns an error message, or null on success. */
async function postToResend(
  path: string,
  payload: unknown,
  idempotencyKey?: string,
) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`https://api.resend.com${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 429 && attempt < 2) {
      await sleep(1500 * (attempt + 1));
      continue;
    }
    if (res.ok) return null;

    const result = await res.json().catch(() => ({}));
    return String(result?.message ?? `Resend returned ${res.status}`);
  }
  return "Resend rate limit exceeded";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // ── 1. Identify the caller from their JWT ──
  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return json({ error: "Missing bearer token" }, 401);
  }

  const asCaller = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userData, error: userError } = await asCaller.auth.getUser();
  if (userError || !userData.user)
    return json({ error: "Invalid session" }, 401);

  // ── 2. Authorise: admins only ──
  const { data: profile } = await asCaller
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  if (profile?.role !== "admin")
    return json({ error: "Admin access required" }, 403);

  // ── 3. Validate input ──
  let payload: {
    subject?: string;
    body?: string;
    insightId?: string | null;
    test?: boolean;
  };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Body must be JSON" }, 400);
  }

  const subject = payload.subject?.trim();
  const body = payload.body?.trim();
  const insightId = payload.insightId?.trim() || null;
  const test = payload.test === true;

  if (!subject || !body)
    return json({ error: "subject and body are both required" }, 400);
  if (body.length > 20000 || subject.length > 300) {
    return json({ error: "Subject or body exceeds the allowed length" }, 400);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_KEY);

  // ── 4. Resolve the featured insight, if any ──
  let feature: Feature | null = null;
  if (insightId) {
    const { data: insight } = await admin
      .from("insights")
      .select("slug, title, excerpt, cover_image, status")
      .eq("id", insightId)
      .maybeSingle();

    if (!insight || insight.status !== "published") {
      return json(
        { error: "Only a published insight can be featured in a briefing" },
        400,
      );
    }

    feature = {
      title: insight.title,
      excerpt: insight.excerpt ?? "",
      // Mail clients fetch images over the open internet; anything else would not load.
      coverImage: insight.cover_image?.startsWith("https://")
        ? insight.cover_image
        : null,
      url: `${SITE_URL}/insights/view?slug=${encodeURIComponent(insight.slug)}`,
    };
  }

  // ── 5a. Test send: one copy to the caller, nothing recorded ──
  if (test) {
    const to = userData.user.email;
    if (!to)
      return json(
        { error: "Your account has no email address to send a test to" },
        400,
      );

    const error = await postToResend(
      "/emails",
      buildEmail(
        to,
        `[Test] ${subject}`,
        body,
        feature,
        `${SITE_URL}/unsubscribe`,
      ),
    );
    if (error)
      return json({ error: `Email provider rejected the test: ${error}` }, 502);
    return json({ ok: true, test: true, to });
  }

  // ── 5b. Refuse to overlap a send that is still running ──
  const { data: inFlight } = await admin
    .from("broadcasts")
    .select("id")
    .eq("status", "sending")
    .gt("created_at", new Date(Date.now() - IN_FLIGHT_WINDOW_MS).toISOString())
    .limit(1);

  if (inFlight && inFlight.length > 0) {
    return json(
      {
        error:
          "Another briefing is still sending. Wait for it to finish first.",
      },
      409,
    );
  }

  // ── 6. Load every active subscriber ──
  const recipients: Recipient[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await admin
      .from("subscribers")
      .select("email, unsubscribe_token")
      .eq("status", "active")
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) return json({ error: "Could not load subscribers" }, 500);
    recipients.push(...((data ?? []) as Recipient[]));
    if (!data || data.length < PAGE_SIZE) break;
  }

  if (recipients.length === 0) {
    return json({ error: "There are no active subscribers to send to" }, 400);
  }

  // ── 7. Record the broadcast before the first email leaves ──
  const { data: broadcast, error: broadcastError } = await admin
    .from("broadcasts")
    .insert({
      author_id: userData.user.id,
      insight_id: insightId,
      subject,
      body,
      status: "sending",
      recipient_count: recipients.length,
    })
    .select("id")
    .single();

  if (broadcastError || !broadcast)
    return json({ error: "Could not record the broadcast" }, 500);

  // ── 8. Send in batches, saving progress after each ──
  let sent = 0;
  let failed = 0;
  let lastError: string | null = null;

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const chunk = recipients.slice(i, i + BATCH_SIZE);
    const emails = chunk.map((r) =>
      buildEmail(
        r.email,
        subject,
        body,
        feature,
        `${SITE_URL}/unsubscribe?token=${encodeURIComponent(r.unsubscribe_token)}`,
      ),
    );

    let error: string | null;
    try {
      // A batch is accepted or rejected as a whole, so it is counted as one.
      error = await postToResend(
        "/emails/batch",
        emails,
        `${broadcast.id}-${i / BATCH_SIZE}`,
      );
    } catch (err) {
      error = err instanceof Error ? err.message : "Unknown transport error";
    }

    if (error) {
      failed += chunk.length;
      lastError = error;
    } else {
      sent += chunk.length;
    }

    await admin
      .from("broadcasts")
      .update({ sent_count: sent, failed_count: failed, last_error: lastError })
      .eq("id", broadcast.id);

    if (i + BATCH_SIZE < recipients.length) await sleep(BATCH_GAP_MS);
  }

  const status = failed === 0 ? "sent" : sent === 0 ? "failed" : "partial";
  await admin
    .from("broadcasts")
    .update({ status, completed_at: new Date().toISOString() })
    .eq("id", broadcast.id);

  if (sent === 0) {
    return json(
      {
        error: `Email provider rejected the briefing: ${lastError}`,
        broadcastId: broadcast.id,
      },
      502,
    );
  }
  return json({
    ok: true,
    broadcastId: broadcast.id,
    status,
    sent,
    failed,
    lastError,
  });
});
