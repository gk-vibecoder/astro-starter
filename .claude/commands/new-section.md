Run this before building a new section. Complete every step before writing any code.

## 1. Define the section
Answer (or ask the user):
- What is this section for? What should a visitor think, feel, or do after seeing it?
- Where does it sit on the page — above fold, mid-page, or near the footer?
- What page does it belong to?

## 2. Audit existing components
Before writing any markup:
- Check `src/components/` and `src/components/sections/` for anything similar or reusable.
- Check if a shadcn/ui component covers the pattern (Button, Badge, Card, Separator, etc.).
- Check if an existing section (Hero, Features, CTA, StatsStrip) can be extended rather than duplicated.
- If something new must be built, confirm it cannot be composed from existing primitives first.
- Flag any duplication risk explicitly.

## 3. Validate design constraints
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
- Heading used in this section fits the page's existing hierarchy (no skipping levels)

**Components**
- shadcn/ui for all interactive or reusable UI — no one-off primitives
- Imports from `@/components/ui/`
- Prefer `.astro` over React unless interactivity is required

**Animations (if planned)**
- Duration scale: fast (150ms), default (300ms), slow (500ms) — nothing outside this
- Entrances: `ease-out` / Exits: `ease-in`
- Standard entrance pattern: `initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}`
- `useReducedMotion()` handled inside `AnimatedSection` — never bypass it
- Challenge every animation — if it doesn't add clarity or delight, remove it

**Performance**
- `client:visible` for below-fold interactive components
- `client:idle` for non-critical widgets
- `client:load` only for above-fold, immediately interactive elements

**Accessibility**
- Semantic HTML — correct element for every purpose
- All images need descriptive `alt` text; decorative images get `alt=""`
- Keyboard navigable, ARIA where needed

**SEO impact**
- Confirm the heading used in this section fits the page's existing h1 → h2 → h3 hierarchy — never add a second `<h1>`
- All images use Astro's `<Image>` component — no raw `<img>` tags
- Every image has a descriptive `alt` attribute; decorative images get `alt=""`
- `width` and `height` always specified on images to prevent CLS
- Semantic HTML — search engines read section structure; use correct elements (`<section>`, `<article>`, `<nav>`, etc.)
- If this section introduces new linked content, anchor text must be descriptive (not "click here" or "read more")

## 4. Output a section brief
Before writing any code, output:
- Section name and purpose (one sentence)
- Layout pattern (e.g., two-column, card grid, centered text)
- Components to reuse vs. build new
- Animation plan (or "none")
- Any constraints or risks flagged
- Wait for confirmation before proceeding
