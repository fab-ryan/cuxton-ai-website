# CuxtonAI — console backend

The public site is a **static export** (`output: "export"` in `next.config.ts`).
There is no Next.js server, so nothing in this repo can hold a secret or run
privileged code. Supabase supplies the three things the console needs:

| Need | Where it lives |
|---|---|
| Sign in | Supabase Auth, called from the browser |
| Read / write insights, enquiries and subscribers | Postgres, guarded by Row Level Security |
| Sending reply emails | `send-contact-reply` Edge Function (holds the Resend key) |
| Sending briefings to subscribers | `send-broadcast` Edge Function (same Resend key) |

**Row Level Security is the security boundary.** The `DashboardShell` guard is
a convenience that keeps the UI honest; a visitor who bypasses it still cannot
read a draft or an enquiry, because the anon key carries no permission to.

---

## 1. Create the project

Create a Supabase project, then from **Project Settings → API** copy:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
```

Both are shipped to the browser and are public by design.
The **service_role key never goes in `.env.local`** — it belongs only in the
Edge Function secrets (step 4).

## 2. Apply the schema

Paste `supabase/schema.sql` into the Supabase SQL editor and run it, or:

```bash
supabase db push
```

It is idempotent, so re-running after an edit is safe. It creates
`profiles`, `insights`, `contacts`, `contact_replies`, `subscribers` and
`broadcasts`, the triggers that maintain `updated_at` and `published_at`,
the two briefing sign-up functions, and every RLS policy.

### Images

`schema.sql` also creates the **`insight-media`** storage bucket that cover
photos and in-article images upload to. It is **public-read** — the marketing
site is a static export served from a CDN with no session, so every visitor
must be able to fetch the file directly. Writing is admin-only.

SVG is deliberately not in the accepted types: it can carry script, and these
files are served from the site's own origin. JPEG, PNG, WebP, GIF and AVIF are
allowed, up to 10 MB.

If the bucket does not appear under **Storage**, the `insert into
storage.buckets` block did not run — apply it separately from the SQL editor.

## 3. Create your admin account

There is **no public registration** — the console has a sign-in page only.

1. **Authentication → Users → Add user**, with an email and password.
   Tick *Auto Confirm User* so no confirmation email is needed.
2. Promote it, in the SQL editor:

   ```sql
   update public.profiles set role = 'admin' where email = 'you@cuxtonai.com';
   ```

A profile row is created automatically by the `on_auth_user_created` trigger,
with `role = 'viewer'` — which grants nothing. Only `admin` opens the console.

> **Also turn off self-signup.** Under **Authentication → Providers → Email**,
> disable *Enable Sign Ups*. Without this, anyone holding the (public) anon key
> can create an account. They would still land on the "no dashboard access"
> screen and could read nothing, but there is no reason to allow it.

## 4. Deploy the email functions

Replies and briefings are sent by [Resend](https://resend.com). Verify your
sending domain there first, then:

```bash
supabase functions deploy send-contact-reply
supabase functions deploy send-broadcast

supabase secrets set \
  RESEND_API_KEY=re_xxxxxxxxxxxx \
  REPLY_FROM="CuxtonAI <info@cuxtonai.com>" \
  BRIEFING_FROM="CuxtonAI Briefings <briefings@cuxtonai.com>" \
  SITE_URL=https://cuxtonai.com
```

`BRIEFING_FROM` falls back to `REPLY_FROM` when unset. `SITE_URL` is used to
build the article and unsubscribe links inside each briefing, so it must be
the address the site is actually served from.

Optionally pin the browser origin allowed to call it:

```bash
supabase secrets set ALLOWED_ORIGIN=https://cuxtonai.com
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are
injected by the platform — you do not set those.

Both functions re-check the caller's JWT and their `admin` role server-side
before they will send anything, and write their log row (`contact_replies`,
`broadcasts`) **before** attempting delivery, so a failure is recorded rather
than lost.

## 5. Run it

```bash
npm run dev     # http://localhost:3000/login
npm run build   # static export into out/
```

---

## What lives where

```
app/login/                     sign-in page
app/dashboard/                 console (overview, insights, contacts, subscribers)
app/unsubscribe/               briefing opt-out, linked from every briefing
app/insights/                  public index + prerendered article pages
app/insights/view/             client-rendered article fallback (see below)

components/dashboard/          console UI, session context, route guard
  RichTextEditor.tsx           Tiptap editor + image upload
  CoverImageField.tsx          cover photo dropzone
components/insights/           public article rendering
  RichContent.tsx              JSON -> React, the sanitising renderer
lib/richtext.ts                document types, URL guards, text extraction
lib/supabase/storage.ts        image upload / delete
lib/supabase/client.ts         browser client (anon key)
lib/supabase/build.ts          build-time reader for prerendering
supabase/schema.sql            tables, triggers, RLS
supabase/functions/            Edge Function (Deno — excluded from tsconfig)
```

## How article content is stored

The editor is [Tiptap](https://tiptap.dev). It writes two columns on every
save:

| Column | Holds | Read by |
|---|---|---|
| `body_json` | the rich-text document, as JSON | the article page |
| `body` | its plain-text rendition | excerpts, reading time, search |

**No HTML string is ever stored or injected.** `RichContent` walks the JSON
tree and builds React elements from a whitelist of node types, so nothing an
author types or pastes can become markup on the public site. Link hrefs and
image sources are re-checked on the way out — `javascript:`, `data:` and
`vbscript:` URLs are dropped, and an unrecognised node renders as nothing.

Posts written before the editor existed have no `body_json`; they still render
through the original plain-text parser, and open in the editor as paragraphs.
Nothing had to be migrated.

## Executive briefings

The **Join** form in the site footer calls `subscribe_to_briefings()`, and the
console's **Subscribers** page sends a briefing to everyone active.

**Signing up.** The anon key cannot touch the `subscribers` table at all. It
can only call two `SECURITY DEFINER` functions: `subscribe_to_briefings()` and
`unsubscribe_from_briefings()`. The first answers the same way whether or not
the address was already on the list, so the form cannot be used to find out
who is subscribed. Signing up again after unsubscribing reactivates the
address.

**Sending.** Write a message, optionally pick a published insight to feature
(a card with its cover, excerpt and link is added under the message), then
**Send test to me** before **Send to everyone**. Each published insight's
editor also has an *Email this insight to subscribers* link that opens the
composer with it selected, and shows whether it has been sent already.
Nothing is emailed automatically on publish: sending to the whole list cannot
be undone, so it is always a deliberate step.

**Unsubscribing.** Every email carries the recipient's own link to
`/unsubscribe?token=…`, and a `List-Unsubscribe` header so mail clients show
their own control. The page waits for a click, because corporate mail
gateways open links to scan them. Admins can also unsubscribe or delete (for
erasure requests) an address from the console.

**Limits.** Emails go out through Resend's batch endpoint, 100 per request
with a short pause between requests, and the `broadcasts` row is updated after
every batch. That is roughly 6,000 recipients a minute. Edge Functions have
a wall-clock limit (150 s on the free plan), so past about 10,000 active
subscribers the send should move to a queue.

## Two consequences of the static export

**1. A new insight needs a deploy to get its own URL.**
`next build` writes one HTML file per published insight. A post published
afterwards has no file yet, so the index links it to
`/insights/view?slug=…` — a single client-rendered page that resolves any
slug. It is readable immediately; the next deploy gives it a real
`/insights/<slug>` page and the index switches over automatically. That
fallback is `noindex`, so the two never compete in search.

Edits to an *already-published* post appear immediately everywhere, because
each article page refetches itself in the browser.

**2. Records are addressed by query string, not path.**
The editor is `/dashboard/insights/edit?id=…` rather than
`/dashboard/insights/[id]`, because a dynamic segment under `output: "export"`
would need every id known at build time.

## Worth doing before launch

- **Spam on the public form.** The `contacts` insert policy is deliberately
  narrow — an anonymous poster cannot set `status` or `internal_notes`, and
  every field is length-capped — but it does not stop volume. Add Cloudflare
  Turnstile or hCaptcha to `/contact` if enquiries start being abused.
- **Double opt-in for briefings.** Sign-up is single opt-in: anyone can enter
  anyone's address. Every briefing has an unsubscribe link, but if bogus
  sign-ups appear, add a confirmation email before an address becomes active.
- **Backups.** Enable Point-in-Time Recovery on the Supabase project; the
  enquiry history is not stored anywhere else.
