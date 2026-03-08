Run this after adding or modifying a section, component, or page. Audit every file touched before considering the work done.

## 1. Identify scope
- Run `git diff --name-only` to get the list of modified files.
- If a specific file or component was named, audit that directly.
- Read every changed file in full before starting the audit.

## 2. Design consistency audit

**Spacing & layout**
- [ ] No arbitrary Tailwind values (e.g., `mt-[17px]`, `w-[340px]`) — use the 4-point scale
- [ ] No `style=` attributes anywhere
- [ ] Spacing rhythm is consistent with the rest of the page

**Color & tokens**
- [ ] No hardcoded hex, rgb, or hsl values
- [ ] No arbitrary Tailwind color values (e.g., `text-[#1a1a1a]`, `bg-[#f5f5f5]`)
- [ ] All colors use CSS variables from `src/styles/globals.css`
- [ ] Semantic tokens used: `text-foreground`, `bg-muted`, `border-border`, etc.

**Typography**
- [ ] Geist or Geist Mono only — no new fonts introduced
- [ ] Tailwind type scale only — no custom `text-[Xpx]` or `text-[Xrem]`
- [ ] Heading hierarchy is logical (h1 → h2 → h3), one `<h1>` per page

**Components**
- [ ] No one-off component primitives — shadcn/ui used for all UI patterns
- [ ] Imports from `@/components/ui/` not duplicated elsewhere
- [ ] No component does what an existing component already does

## 3. Animation audit (if animations were added or changed)
- [ ] Duration uses approved scale: 150ms / 300ms / 500ms only
- [ ] Entrances use `ease-out`, exits use `ease-in`
- [ ] Standard fade-up pattern followed: `initial={{ opacity: 0, y: 16 }}`
- [ ] Stagger uses `staggerChildren: 0.08` for lists/grids
- [ ] `useReducedMotion()` check present, or handled via `AnimatedSection`
- [ ] No infinite animations unless purely decorative and extremely subtle
- [ ] Scroll-triggered animations use `whileInView` with `once: true`
- [ ] Animation variants are constants, not inline objects
- [ ] Every animation challenged: does it add clarity or delight? If not, flag for removal.

## 4. Performance audit
- [ ] `client:visible` used for below-fold interactive components
- [ ] `client:idle` used for non-critical widgets
- [ ] `client:load` only for above-fold, immediately interactive elements
- [ ] No React component used where a plain `.astro` component would do
- [ ] No new dependencies added without justification
- [ ] All images have `width` and `height` specified
- [ ] Below-fold images use `loading="lazy"`
- [ ] Hero/LCP image uses `loading="eager"`

## 5. Image audit
- [ ] Astro's `<Image>` component used — no raw `<img>` tags
- [ ] Every image has a descriptive `alt` attribute
- [ ] Decorative images have `alt=""`
- [ ] `width` and `height` always specified

## 6. Accessibility audit
- [ ] Semantic HTML used throughout — correct element for every purpose
- [ ] Interactive elements are keyboard navigable
- [ ] ARIA attributes present where native semantics are insufficient
- [ ] Color contrast meets WCAG AA minimum

## 7. SEO audit (pages only)
- [ ] Unique `title` and `description` set via `astro-seo`
- [ ] Title format matches the brand name defined in `BaseLayout`
- [ ] `og:image` set and the file exists in `/public`
- [ ] One `<h1>` on the page, logical heading hierarchy below it
- [ ] Page URL is lowercase and hyphenated

## 8. TypeScript audit
- [ ] No `any` types
- [ ] Strict mode compatible
- [ ] Props interfaces defined for all components

## 9. Tech debt check
- [ ] No duplicated logic that could be extracted into a shared utility
- [ ] No commented-out code left behind
- [ ] No TODO comments without a corresponding ticket
- [ ] No unused imports or variables
- [ ] No backwards-compatibility shims for code that was simply changed

## 10. Summary
After completing all checks, output:
- A pass/fail for each category
- A prioritized list of issues found (critical → minor)
- Specific file and line references for every issue
- Whether the work is ready to ship or needs changes first
