# Cuxton AI — console backend

The public site is a **static export** (`output: "export"` in `next.config.ts`).
There is no Next.js server, so nothing in this repo can hold a secret or run
privileged code. Supabase supplies the three things the console needs:

| Need | Where it lives |
|---|---|
| Sign in | Supabase Auth, called from the browser |
| Read / write insights and enquiries | Postgres, guarded by Row Level Security |
| Sending reply emails | `send-contact-reply` Edge Function (holds the Resend key) |

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
`profiles`, `insights`, `contacts` and `contact_replies`, the triggers that
maintain `updated_at` and `published_at`, and every RLS policy.

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

## 4. Deploy the email function

Replies are sent by [Resend](https://resend.com). Verify your sending domain
there first, then:

```bash
supabase functions deploy send-contact-reply

supabase secrets set \
  RESEND_API_KEY=re_xxxxxxxxxxxx \
  REPLY_FROM="Cuxton AI <hello@cuxtonai.com>"
```

Optionally pin the browser origin allowed to call it:

```bash
supabase secrets set ALLOWED_ORIGIN=https://cuxtonai.com
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are
injected by the platform — you do not set those.

The function re-checks the caller's JWT and their `admin` role server-side
before it will send anything, and writes a `contact_replies` row **before**
attempting delivery, so a failure is recorded rather than lost.

## 5. Run it

```bash
npm run dev     # http://localhost:3000/login
npm run build   # static export into out/
```

---

## What lives where

```
app/login/                     sign-in page
app/dashboard/                 console (overview, insights, contacts)
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
- **Backups.** Enable Point-in-Time Recovery on the Supabase project; the
  enquiry history is not stored anywhere else.
