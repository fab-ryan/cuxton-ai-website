# CuxtonAI Academy University — website

The public website for CuxtonAI Academy University: a university teaching
artificial intelligence, computing, data, security and digital business across
five schools, from undergraduate degrees to doctoral research.

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict), `@/*` path alias |
| Styling | Tailwind CSS v4 + CSS Modules, brand tokens in `app/globals.css` |
| Content | A single TypeScript file, `data/university.ts`. No database, no CMS |
| Images | Hand-authored SVG line art in `public/university/` |
| Output | `output: "export"` → static files in `out/`, hostable anywhere |

There is no server, no database and no runtime API. Every page is prerendered
to HTML at build time.

---

## Quick start

Requires Node **≥ 20.9**.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into out/
npx eslint .    # lint
```

---

## Routes

```
/                      Home
/about                 The university, its teaching and its leadership
/programs              Programme catalogue, filterable by level and school
/programs/[slug]       Programme detail: curriculum, assessment, entry, staff
/admissions            Process, entry requirements, fees, key dates, questions
/research              Research groups, research culture, doctoral study
/faculty               Academic staff by school
/campus-life           Facilities, housing, societies, student support
/news                  News and events index, filterable by category
/news/[slug]           Article
/contact               Offices, enquiry form, campus address
/privacy /terms /cookies
```

`/programs` accepts `?school=<slug>` and `?level=<level>` so that other pages
can link into a pre-filtered view.

---

## Content

All copy, programmes, modules, faculty, news and events live in
[`data/university.ts`](data/university.ts). Editing that file is how the site
changes; nothing else reads from anywhere else.

Two rules were applied when writing it, and are worth keeping:

1. **No invented figures.** No head-counts, rankings, employment rates,
   ratings, testimonials or accreditation claims. The numbers shown on the
   home and about pages come from `FACTS`, which counts the content in the
   file, so every figure on the site is true of the site itself.
2. **The placeholder status is stated.** The footer and the terms page say
   plainly that the programmes, faculty and news are illustrative content for
   a demonstration build rather than a record of a real institution.

The enquiry form on `/contact` has no backend. It composes the message and
hands it to the visitor's own mail client, addressed to the office matching
the chosen topic. That is deliberate: a form that silently discards what
someone typed is worse than no form.

---

## Design system

Brand tokens are defined once in [`app/globals.css`](app/globals.css) and
inherited by every component:

- **Teal** is structure — rules, borders, diagram lines, links.
- **Amber** is state — the active nav item, one accent per illustration.
- **Green and red** appear only as pass/fail status, never as decoration.
- Square corners everywhere; pill radius only on status tags.
- Hairline borders carry structure. No drop shadows, and no gradients.
- Nothing animates on load or scroll. Motion responds to user action only.

Light and dark themes follow the system preference. Sections that stay dark in
both themes carry the `.on-dark` class, which re-asserts the dark palette for
its subtree.

Typography pairs Inter for interface and body copy with Source Serif 4
(`--font-display`) for headings, which is what gives the site its institutional
register without changing how it reads.

Shared page primitives live in
[`components/university/ui.module.css`](components/university/ui.module.css)
and are imported by the pages that need them.

---

## Illustrations

There are no photographs. `public/university/` holds SVG line art drawn in the
brand palette: a campus elevation for the home hero, scene plates for the
schools and campus pages, abstract plates for news items, monogram plates for
faculty, and a crest.

They are flat, gradient-free and drawn on a dark ground, so they read the same
in both themes. The generator for the parametric ones is a short script; the
scene drawings are hand-authored.

---

## Accessibility

- A skip link to `#main-content` on every page.
- One `h1` per page, headings in order, sections labelled with
  `aria-labelledby`.
- The FAQ uses native `<details>`, so keyboard and screen-reader behaviour is
  the browser's.
- The mobile menu traps nothing, closes on `Escape`, locks background scroll,
  and reports state with `aria-expanded`.
- Focus is visible everywhere via a single amber outline rule.
- `prefers-reduced-motion` is honoured globally.

---

## Notes

- `package.json` still lists Supabase and Tiptap. Nothing imports them any
  more, so they do not reach the bundle; they can be removed with
  `npm uninstall` when convenient.
- `supabase/` and `.env` are left over from the previous version of this
  application and are no longer read by anything in `app/`.
