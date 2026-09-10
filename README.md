# CuxtonAI — website & console

The marketing site for CuxtonAI, plus the admin console that runs its
insights and enquiries. One Next.js app that builds to **static HTML** and is
backed by Supabase for everything dynamic.

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict), `@/*` path alias |
| Styling | Tailwind CSS v4 + CSS Modules, brand tokens in `app/globals.css` |
| Backend | Supabase — Auth, Postgres (RLS), Storage, one Edge Function |
| Editor | Tiptap, stored as JSON (no HTML is ever stored or injected) |
| Output | `output: "export"` → static files in `out/`, hostable anywhere |

There is **no Next.js server at runtime**. Nothing in this repo can hold a
secret; Row Level Security is the security boundary. See
[supabase/README.md](supabase/README.md) for the backend and its rationale.

---

## Quick start

Requires Node **≥ 20.9**.

```bash
npm install
cp .env.local.example .env.local   # fill in from Supabase → Project Settings → API
npm run dev                        # http://localhost:3000
```

The marketing pages render fine **without** Supabase credentials — the client
returns `null` and the console shows a configuration notice rather than
crashing. You only need `.env.local` for `/login`, `/dashboard` and live
insights.

### Environment

Both variables are shipped to the browser and are public by design.

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the project's anon key |

Never put the `service_role` key in a `NEXT_PUBLIC_` variable — it belongs
only in the Edge Function secrets.

### Backend setup

First time against a fresh Supabase project, follow
[supabase/README.md](supabase/README.md): apply `supabase/schema.sql`, create
an admin user (there is no public registration), and deploy the
`send-contact-reply` function. It takes about ten minutes.

---

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Static export into `out/` |
| `npm run lint` | ESLint (`eslint-config-next`) |

`npm start` does **not** work here — `next start` refuses to run under
`output: "export"`. To preview a build, serve the folder:

```bash
npm run build && npx serve@latest out
```

The `export` script in `package.json` is a leftover from older Next versions;
`next export` no longer exists and `npm run build` already writes `out/`.

---

## Layout

```
app/
  page.tsx                 home, assembled from components/homeSections/*
  solutions/[slug]/        five service pages, from data/solutions.ts
  industries/[slug]/       six sector pages, from data/industries.ts
  technology/  company/  how-we-work/  contact/
  privacy/  terms/  cookies/
  insights/                public index + one prerendered page per post
  insights/view/           client-rendered fallback for posts published
                           since the last deploy (noindex)
  login/                   sign-in
  dashboard/               console: overview, insights, contacts
components/
  SiteChrome.tsx           suppresses nav/footer on /login and /dashboard
  homeSections/            one component per home section
  solutions/ industries/ technology/ company/ howWeWork/
  insights/RichContent.tsx JSON → React, the sanitising renderer
  dashboard/               console UI, session context, route guard, editor
data/                      hard-coded marketing copy (solutions, industries)
lib/
  insights.ts              slugify, excerpt, reading time, link resolution
  richtext.ts              document types, URL guards, text extraction
  supabase/client.ts       browser client (anon key)
  supabase/build.ts        build-time reader used to prerender articles
  supabase/storage.ts      image upload / delete
supabase/                  schema.sql, Edge Function, backend README
public/                    imagery and inline-SVG schematics
```

**Where content lives.** Solutions and industries are hard-coded in `data/` —
edit the file, redeploy. Insights and enquiries live in Supabase and are
managed from the console at `/dashboard`.

## Two things the static export implies

1. **A new insight needs a deploy to get its own URL.** `next build` writes one
   HTML file per published post. Anything published since then is linked to
   `/insights/view?slug=…`, a client-rendered page that resolves any slug, so
   it is readable immediately; the next deploy gives it a real page and the
   index switches over. Edits to already-published posts appear immediately,
   because each article refetches itself in the browser.
2. **Records are addressed by query string.** The editor is
   `/dashboard/insights/edit?id=…` rather than a dynamic segment, which under
   `output: "export"` would need every id known at build time.

## Design notes

Brand tokens are defined once at the top of `app/globals.css`: teal `#1B6B8A`
is **structure** (rules, borders, diagram lines), amber `#F5A623` is **state**
(the trust boundary, warnings) and is never decoration. The ground is a matte
slate-navy; a light theme follows `prefers-color-scheme`.

Motion is deliberately scarce. `components/Reveal.tsx` used to fade every
section in on scroll and now renders its children directly — it keeps its prop
signature so call sites did not have to change. The site's motion budget is
spent on the trust perimeter drawing itself once.

## Deploying

`npm run build` produces `out/` — plain HTML, CSS and JS. Upload it to any
static host or CDN (Vercel, Netlify, S3 + CloudFront, GitHub Pages, nginx).
Set the two `NEXT_PUBLIC_` variables in the build environment so published
insights are baked into the HTML for search engines.

## See also

- [supabase/README.md](supabase/README.md) — schema, RLS, admin account, the
  reply Edge Function, and how article content is stored
- [AGENTS.md](AGENTS.md) — note for AI agents: this Next.js version differs
  from older conventions; check `node_modules/next/dist/docs/` before coding
