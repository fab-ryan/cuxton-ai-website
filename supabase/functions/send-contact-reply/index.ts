// ═══════════════════════════════════════════════════════════════════
//  send-contact-reply — Supabase Edge Function (Deno)
//
//  The site is a static export, so there is no Next.js server to send
//  mail from. The dashboard calls this function instead; it is the only
//  place the Resend API key exists.
//
//  Deploy:
//    supabase functions deploy send-contact-reply
//    supabase secrets set RESEND_API_KEY=re_xxx \
//                         REPLY_FROM="CuxtonAI <hello@cuxtonai.com>"
// ═══════════════════════════════════════════════════════════════════
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const REPLY_FROM = Deno.env.get("REPLY_FROM") ?? "CuxtonAI <hello@cuxtonai.com>";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") ?? "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** Minimal HTML escape — reply bodies are admin-authored but still untrusted input. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(recipientName: string, body: string) {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px;line-height:1.7;">${escapeHtml(p).replace(/\n/g, "<br />")}</p>`)
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:32px 16px;background:#f4f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0c2233;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #dbe6f0;border-radius:16px;padding:32px;">
    <p style="margin:0 0 24px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1b6b8a;">CuxtonAI</p>
    <p style="margin:0 0 16px;line-height:1.7;">Hello ${escapeHtml(recipientName)},</p>
    ${paragraphs}
    <hr style="border:none;border-top:1px solid #dbe6f0;margin:28px 0;" />
    <p style="margin:0;font-size:12px;color:#5b7186;line-height:1.6;">
      This message is a reply to the enquiry you submitted at cuxtonai.com.
    </p>
  </div>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
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
  if (userError || !userData.user) return json({ error: "Invalid session" }, 401);

  // ── 2. Authorise: admins only ──
  const { data: profile } = await asCaller
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  if (profile?.role !== "admin") return json({ error: "Admin access required" }, 403);

  // ── 3. Validate input ──
  let payload: { contactId?: string; subject?: string; body?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Body must be JSON" }, 400);
  }

  const contactId = payload.contactId?.trim();
  const subject = payload.subject?.trim();
  const body = payload.body?.trim();

  if (!contactId || !subject || !body) {
    return json({ error: "contactId, subject and body are all required" }, 400);
  }
  if (body.length > 20000 || subject.length > 300) {
    return json({ error: "Subject or body exceeds the allowed length" }, 400);
  }

  // ── 4. Load the contact (service role: reply rows bypass RLS) ──
  const admin = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: contact, error: contactError } = await admin
    .from("contacts")
    .select("id, first_name, last_name, email")
    .eq("id", contactId)
    .single();

  if (contactError || !contact) return json({ error: "Contact not found" }, 404);

  // ── 5. Record the attempt before sending, so a failure is never silent ──
  const { data: reply, error: replyError } = await admin
    .from("contact_replies")
    .insert({
      contact_id: contact.id,
      author_id: userData.user.id,
      subject,
      body,
      email_status: "pending",
    })
    .select("id")
    .single();

  if (replyError || !reply) return json({ error: "Could not record the reply" }, 500);

  // ── 6. Send ──
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: REPLY_FROM,
        to: [contact.email],
        reply_to: userData.user.email,
        subject,
        html: renderEmail(contact.first_name, body),
        text: body,
      }),
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message = result?.message ?? `Resend returned ${res.status}`;
      await admin
        .from("contact_replies")
        .update({ email_status: "failed", email_error: String(message) })
        .eq("id", reply.id);
      return json({ error: `Email provider rejected the message: ${message}` }, 502);
    }

    await admin
      .from("contact_replies")
      .update({ email_status: "sent", provider_message_id: result?.id ?? null })
      .eq("id", reply.id);

    await admin
      .from("contacts")
      .update({ status: "responded" })
      .eq("id", contact.id);

    return json({ ok: true, replyId: reply.id, messageId: result?.id ?? null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown transport error";
    await admin
      .from("contact_replies")
      .update({ email_status: "failed", email_error: message })
      .eq("id", reply.id);
    return json({ error: `Could not reach the email provider: ${message}` }, 502);
  }
});
