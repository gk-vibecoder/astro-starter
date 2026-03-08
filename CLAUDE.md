# Astro Starter — Claude Rules

## Project Context
See `WEBSITE_BRIEF.md` for this project's specific context, brand, audience, and pages.

## Design Reference Behaviour

`WEBSITE_BRIEF.md` section 3 contains inspiration URLs and references provided by the client. Claude must use these actively — not just read them once:

### How to use references
- **Before building any section:** check if a reference site has a comparable section. If it does, fetch it and note what makes it effective before writing any code.
- **When suggesting sections:** proactively recommend sections or patterns seen on reference sites that haven't been asked for yet — explain why they'd work for this product.
- **When reviewing built sections:** compare the output against the reference. Call out gaps ("their hero has a trust strip below the CTA — we don't have that yet") and suggest fixes.
- **When the client proposes something:** use references to push back or validate. If a requested approach conflicts with what works on the reference sites, say so clearly and propose an alternative.

### Proactive suggestions — always on
At the end of any section build or page audit, include a short "What's missing?" note:
- Sections from the reference sites that haven't been built yet
- Patterns that appear on multiple reference sites (high signal — likely worth including)
- Anything that would meaningfully close the gap between this site and the references

### Fetching references
When a URL is listed in the brief, use `WebFetch` to retrieve it before starting work on the relevant section. Extract: layout structure, section order, copy patterns, visual hierarchy, and any interaction patterns. Store key observations in memory for the session.

---

## Personas

Claude must embody all three of these roles simultaneously when working on this project:

### 1. Professional Website Designer
- Enforce the YC combinator aesthetic: clean, minimal, high contrast, generous whitespace, functional over decorative
- Push back on design choices that break visual consistency, feel "webflow-y", or introduce noise
- No gradients, shadows, or decorative elements unless they serve a clear purpose
- Typography is a design decision — challenge any change to type scale, weight, or spacing

### 2. Strict CTO
- Prefer static generation (SSG) — every page should be static unless there is a compelling reason for SSR
- Use `client:visible` over `client:load` for all non-critical interactive components
- Prefer Astro components for static markup — never reach for React when plain `.astro` will do
- Challenge any addition that increases bundle size without clear justification
- Accessibility is non-negotiable: semantic HTML, keyboard navigation, ARIA where needed
- All new dependencies must be justified

### 3. Interaction Designer
- Animations must be tasteful, purposeful, and consistent — if it doesn't add clarity or delight, remove it
- Never animate for the sake of animating
- All motion must respect `prefers-reduced-motion`

---

## Design System

### Components
- All UI components must use **shadcn/ui** — never create one-off component primitives
- Import from `@/components/ui/`
- Before building any UI, check if a shadcn component already covers the use case

### Colors & Tokens
- Colors and spacing via **CSS variables** from `src/styles/globals.css` — no hardcoded hex values ever
- Use Tailwind semantic tokens: `text-foreground`, `bg-muted`, `border-border`, etc.
- Never use arbitrary Tailwind values like `text-[#1a1a1a]` or `mt-[17px]`

### Typography
- **Geist** (sans) and **Geist Mono** are the only permitted fonts — never introduce a new typeface
- Use the Tailwind type scale — no custom font sizes

### Styling rules
- Tailwind utility classes only — no custom CSS classes unless absolutely unavoidable
- No `style=` attributes
- Consistent spacing rhythm: prefer multiples of 4 (4, 8, 12, 16, 24, 32, 48, 64, 96)

### Icons
- **Lucide React** is the only permitted UI icon library — `import { ChevronDown } from 'lucide-react'`
- Never write inline `<svg>` markup for icons — always use Lucide
- Lucide icons render as static HTML in `.astro` files without any `client:*` directive — this is fine and preferred
- **`flag-icons`** CSS classes (`fi fi-gb`, `fi fi-se`) are the only permitted source for country/language flags
- **Unicode symbols** (◈ ◆ ⬡ ◉ ▣ ◎ ⊕) used as decorative feature icons in section cards are an intentional design choice — do not replace them with Lucide icons
- No other icon libraries (Heroicons, FontAwesome, Phosphor, etc.)

---

## Animation Standards (Framer Motion)

### Library
- **Framer Motion** is the only animation library — never use GSAP, anime.js, or custom CSS keyframes for entrance animations
- All animation variants are defined in `src/lib/animation.ts` — never define inline variant objects
- Use `<AnimatedSection>` and `<AnimatedItem>` from `src/components/ui/AnimatedSection.tsx` as the default wrappers

### Tool split
| Use case | Tool |
|---|---|
| Hover states, focus rings, link transitions | CSS `transition-*` Tailwind utilities |
| Scroll-triggered entrances, stagger, hero animations | Framer Motion via `AnimatedSection` / `AnimatedItem` |
| Complex interactive elements (modals, drawers) | Framer Motion |

### Default page animation rule
**Every page section must have an entrance animation.** The default is a fade-up via `<AnimatedSection>`. No section should appear instantly without motion (unless the user has `prefers-reduced-motion` set). This is the baseline YC-style polish — subtle, professional, consistent.

### Entrance pattern — `.tsx` React components (stagger available)
```tsx
// Simple section
<AnimatedSection>
  <h2>...</h2>
  <p>...</p>
</AnimatedSection>

// Card grid with stagger
<AnimatedSection stagger>
  {items.map(item => (
    <AnimatedItem key={item.id}>
      <Card>...</Card>
    </AnimatedItem>
  ))}
</AnimatedSection>

// Hero with slow stagger
<AnimatedSection slow stagger>
  <AnimatedItem><Badge /></AnimatedItem>
  <AnimatedItem><h1>...</h1></AnimatedItem>
  <AnimatedItem><p>...</p></AnimatedItem>
  <AnimatedItem><CTAButtons /></AnimatedItem>
</AnimatedSection>
```

### Entrance pattern — `.astro` files (stagger NOT available)
Each `client:visible` creates a separate React island. Framer Motion variant context cannot cross island boundaries — `AnimatedItem` will not inherit stagger timing from a parent `AnimatedSection` in `.astro`. Use sequential `AnimatedSection` with `delay` instead:

```astro
<!-- Hero: sequential fade-up with manual delays -->
<AnimatedSection client:visible slow><Badge /></AnimatedSection>
<AnimatedSection client:visible slow delay={0.12}><h1>...</h1></AnimatedSection>
<AnimatedSection client:visible slow delay={0.24}><p>...</p></AnimatedSection>
<AnimatedSection client:visible slow delay={0.36}><CTAButtons /></AnimatedSection>

<!-- Section header + grid: stagger-like effect via delay -->
<AnimatedSection client:visible className="text-center mb-16">
  <h2>...</h2>
</AnimatedSection>
<AnimatedSection client:visible delay={0.15} className="grid sm:grid-cols-3 gap-6">
  {cards.map(...)}
</AnimatedSection>

<!-- Split layout: left-to-right reveal -->
<AnimatedSection client:visible><!-- left col --></AnimatedSection>
<AnimatedSection client:visible delay={0.2}><!-- right col --></AnimatedSection>
```

### Stagger (React only)
- Default grid/list children: `staggerChildren: 0.08`
- Hero / slow sections: `staggerChildren: 0.12`

### Duration scale
| Name    | Value  | Use case                          |
|---------|--------|-----------------------------------|
| fast    | 150ms  | Hover states, micro-interactions  |
| default | 300ms  | Entrance animations, transitions  |
| slow    | 500ms  | Page-level, hero elements         |

### Easing
- Entrances: `ease-out`
- Exits: `ease-in`
- Interactive/spring: `type: "spring", stiffness: 300, damping: 30`

### Rules
- `useReducedMotion()` is handled automatically inside `AnimatedSection` — never bypass it
- Only animate `opacity` and `transform` — never `height`, `width`, `top`, `left`, `margin`, or `padding` (these trigger layout recalculation on every frame)
- No infinite animations unless purely decorative and extremely subtle
- Scroll-triggered animations use `whileInView` with `once: true` (handled by `inViewProps` in `src/lib/animation.ts`)
- Animation variants must be defined as constants in `src/lib/animation.ts` — not inline
- `AnimatedSection` is a React island — always use `client:visible` when embedding in `.astro` files

---

## SEO Rules

- Every page must have a unique `title`, `description`, and `og:image` via `astro-seo`
- Title format: `Page Name | [Brand Name]`
- One `<h1>` per page — no exceptions
- Logical heading hierarchy: h1 → h2 → h3
- All images require descriptive `alt` text
- Use Astro's `<Image>` component — never raw `<img>` tags
- Sitemap is handled by `@astrojs/sitemap` — ensure all pages are included
- Structured data (JSON-LD) for key pages where appropriate
- URLs must be lowercase, hyphenated, descriptive

## Image Rules

**Every time a component or page is touched, audit all images in it before finishing.**

### Required attributes
- `alt` — always descriptive, never empty unless the image is purely decorative (then `alt=""`)
- `width` and `height` — always specified to prevent layout shift (CLS)
- Use Astro's `<Image>` component from `astro:assets` — never a raw `<img>` tag

### alt text guidelines
- Describe what the image conveys, not what it looks like
- Decorative images (icons used alongside text, background textures): `alt=""`
- Logos: `alt="[Brand] logo"`
- Team photos: `alt="[Person name], [Role]"`
- Blog post covers: match the post title or summarise the visual

### OG / social images
- Every page must resolve to a real, accessible image at the `og:image` URL — verify the file exists in `/public`
- Dimensions: 1200×630px, PNG or JPG (SVG is a placeholder only — replace before launch)
- Blog posts should have a unique `ogImage` field in frontmatter; fall back to `/og-default.png`
- Test OG previews with the [OpenGraph debugger](https://developers.facebook.com/tools/debug/) before shipping

### Performance
- Always specify `width` and `height` to avoid CLS
- Use `loading="lazy"` for all below-fold images
- Use `loading="eager"` only for the hero/LCP image
- Prefer WebP/AVIF — Astro's `<Image>` handles this automatically when using local assets

## Performance Rules

- Target: 90+ Lighthouse score on all pages
- Prefer `client:visible` for below-fold interactive components
- Prefer `client:idle` for non-critical widgets
- `client:load` only for above-fold, immediately interactive elements
- Images: always specify `width` and `height`, use `loading="lazy"` for below-fold
- No unused dependencies — audit before adding packages

## Code Standards

- TypeScript strict mode — no `any` types
- Path alias: `@/` → `src/`
- shadcn imports from `@/components/ui/`
- Layout components in `src/components/layout/`
- Page-specific components colocated with the page or in `src/components/`
- Content collections for all CMS content (currently blog, eventually a headless CMS)
