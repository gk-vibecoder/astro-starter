# Code & Performance — Detailed Reference

> For the short mandate, see root `CLAUDE.md`. This file covers TypeScript conventions, component architecture, and performance rules.

---

## TypeScript

- Strict mode — no `any` types
- Path alias: `@/` → `src/`
- Always type props interfaces explicitly — no implicit `any` from untyped props

---

## Component architecture

| Location | Purpose |
|---|---|
| `src/components/sections/` | Full-width page sections with own layout/spacing |
| `src/components/` root | Sub-components used inside sections |
| `src/components/ui/` | shadcn primitives only — never put custom components here |
| `src/layouts/` | Page shells — `BaseLayout`, `ArticleLayout`, `IndexLayout` |
| `src/lib/` | Utilities, helpers, animation variants |

- Page-specific components: colocate with the page or put in `src/components/`
- shadcn imports always from `@/components/ui/`
- Layout components in `src/components/layout/`

---

## Astro / React split

- Prefer `.astro` components for static markup — never reach for React when plain Astro will do
- React (`.tsx`) only when interactivity or Framer Motion is needed
- Lucide icons in `.astro` files: import and use directly — no `client:*` needed, renders static HTML

---

## Performance

- Target: 90+ Lighthouse score on all pages
- **SSG first** — every page should be static unless there is a compelling reason for SSR
- `client:visible` for all below-fold interactive components
- `client:idle` for non-critical widgets
- `client:load` only for above-fold, immediately interactive elements
- No unused dependencies — justify every new package before adding

---

## Layouts

Three layouts — pick the right one for the page type:

| Layout | Use for | Key props |
|---|---|---|
| `BaseLayout` | Static pages (landing, feature, legal) | `title`, `description`, `alternateHref?`, `pageSchema?` |
| `ArticleLayout` | CMS detail pages (blog, news, FAQ, etc.) | All BaseLayout props + `date?`, `category?`, `backHref?`, `backLabel?`, `headings?`, `relatedArticles?`, `showCTA?`, `showNewsletter?` |
| `IndexLayout` | CMS listing/index pages | All BaseLayout props + `heroTitle`, `heroDescription?`, `eyebrow?`, `align?` |

### ArticleLayout features (opt-in via props)
- **TOC sidebar** — pass `headings` from `render()`. Shown when 2+ h2/h3 headings exist.
- **Related articles** — pass `relatedArticles` from `pickRelated()`. Renders "Keep reading" grid above CTA.
- **Back navigation** — pass `backHref` + `backLabel`. Omit both for no back link.
- **CTA** — shown by default. Pass `showCTA={false}` to hide.
- **`header-extra` slot** — for custom content between title and body.

### All layouts require `alternateHref` on locale-specific pages
→ See `cms-collections.md` for the pattern.

---

## Content collections

→ See `Website Management/Claude Instructions/cms-collections.md` for all CMS conventions.

---

## Avoid

- Over-engineering: don't add features, refactor, or "improve" beyond what was asked
- Premature abstraction: three similar lines is better than a utility function used once
- Backwards-compatibility hacks: if something is unused, delete it
- Error handling for scenarios that can't happen — trust internal code and framework guarantees
