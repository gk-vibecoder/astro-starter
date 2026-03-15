Run this before building a new page. Complete every step before writing any code.

## 1. Define the page
Answer (or ask the user):
- What is this page for? Who is it for, and what should they do or understand after visiting?
- What is the URL? (must be lowercase, hyphenated, descriptive)
- Where does it sit in the site hierarchy — top-level, nested, or blog/content?
- Does this page already exist in any form?

## 2. References
Ask the user before proceeding:
- Do you have any reference sites, pages, or screenshots for this page?
  - **Links:** paste URLs — Claude will fetch and analyse them before writing any code
  - **Screenshots:** share image paths — Claude will read and extract layout/visual patterns from them
- If references are provided: extract layout structure, section order, copy patterns, visual hierarchy, and interaction patterns. Note what makes each effective.
- If no references are provided: check `WEBSITE_BRIEF.md` section 3 for any project-level references that apply to this page type.
- Store key observations in memory before continuing to the next step.

## 3. SEO & routing setup
Establish all of these before any markup is written:

**URL**
- Lowercase and hyphenated (e.g., `/how-it-works`, not `/HowItWorks`)
- Descriptive and readable — reflects the page content
- Consistent with the URL pattern of the rest of the site

**Title**
- Format: `Page Name | [Brand]`
- Length: 50–60 characters (flag if outside range)
- Unique — not shared with any other page
- Accurately describes the page

**Meta description**
- Length: 120–155 characters (flag if outside range)
- Unique — not a copy of the title or another page's description
- Reads naturally; includes a value proposition or call to action

**Open Graph**
- `og:title`, `og:description`, `og:image` all set via `astro-seo`
- `og:image` file physically exists in `/public` — flag if missing
- OG image dimensions: 1200×630px, PNG or JPG (SVG is a placeholder only)
- `og:type`: `website` for standard pages, `article` for blog posts

**Canonical & robots**
- Canonical URL is set and correct
- No unintentional `noindex` — confirm the page should be indexed
- Not accidentally blocked by `robots.txt`

**Structured data**
- Is JSON-LD appropriate? (FAQ, Article, Product, BreadcrumbList, Organization)
- If yes, plan the schema before writing markup

**Sitemap**
- Confirm this page will be picked up by `@astrojs/sitemap`
- Check `astro.config.mjs` for any exclusion rules

**Internal linking**
- Which existing pages will link to this new page?
- What descriptive anchor text will be used?
- Plan at least one inbound internal link before launch

## 4. Heading hierarchy
Plan the full heading structure before writing markup:
- One `<h1>` — what is it?
- Logical h2 → h3 flow beneath it
- No skipped levels

## 4. Audit existing components and layouts
Before writing any markup:
- Check `src/layouts/` — can `BaseLayout.astro` or `BlogLayout.astro` be used or extended?
- Check `src/components/sections/` — which existing sections belong on this page?
- Check `src/components/` and `src/components/ui/` for reusable UI.
- Check if a shadcn/ui component covers any needed patterns.
- Flag any duplication — if a similar page or section already exists, surface it.

## 5. Validate design constraints
Confirm the planned design respects all of the following:

**Layout & spacing**
- Spacing uses multiples of 4 (4, 8, 12, 16, 24, 32, 48, 64, 96) — no arbitrary values
- No `style=` attributes, no arbitrary Tailwind values (`mt-[17px]`, `text-[#1a1a1a]`)

**Color & tokens**
- All colors via CSS variables from `src/styles/globals.css`
- Semantic Tailwind tokens only: `text-foreground`, `bg-muted`, `border-border`, etc.
- No hardcoded hex, rgb, or hsl values

**Typography**
- Geist (sans) and Geist Mono only — no new fonts
- Tailwind type scale only — no custom font sizes

**Components**
- shadcn/ui for all interactive or reusable UI — no one-off primitives
- Imports from `@/components/ui/`
- Prefer `.astro` over React unless interactivity is required

**Rendering strategy**
- Default to SSG (static generation) — no SSR unless there is a compelling reason
- `client:visible` for below-fold interactive components
- `client:idle` for non-critical widgets
- `client:load` only for above-fold, immediately interactive elements

**Images**
- Astro's `<Image>` component only — no raw `<img>` tags
- All images need `alt`, `width`, and `height`
- Hero/LCP image: `loading="eager"`, everything else: `loading="lazy"`

**Animations (if planned)**
- Duration scale: fast (150ms), default (300ms), slow (500ms)
- Entrances: `ease-out` / Exits: `ease-in`
- `useReducedMotion()` handled inside `AnimatedSection` — never bypass it
- Challenge every animation — if it doesn't add clarity or delight, remove it

**Accessibility**
- Semantic HTML throughout
- Keyboard navigable
- ARIA attributes where native semantics are insufficient
- Logical focus order

## 6. Output a page brief
Before writing any code, output:
- Page name, URL, and purpose (two sentences max)
- SEO: proposed title, description, og:image path
- Heading structure (h1 → h2 → h3 outline)
- Layout and sections plan (which existing sections + what's new)
- Rendering strategy (SSG/SSR) and justification if SSR
- Any risks or constraints flagged
- Wait for confirmation before proceeding
