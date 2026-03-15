# Animation Standards — Detailed Reference

> For the short mandate, see root `CLAUDE.md`. This file is the full reference: patterns, element tables, timing, and rules.

---

## Library & tools

- **Framer Motion** only — never GSAP, anime.js, or custom CSS keyframes for entrance animations
- All variants defined in `src/lib/animation.ts` — never inline
- `<AnimatedSection>` and `<AnimatedItem>` from `src/components/ui/AnimatedSection.tsx` are the default wrappers

| Use case | Tool |
|---|---|
| Hover states, focus rings, link/color transitions | CSS `transition-*` Tailwind utilities |
| Scroll-triggered entrances, stagger, hero animations | Framer Motion via `AnimatedSection` / `AnimatedItem` |
| Complex interactive elements (modals, drawers) | Framer Motion |
| Infinite loops (marquee/slider) | CSS keyframes via `animate-slider` / `animate-slider-reverse` in `globals.css` |

---

## 1. Entrance animations

Wrap every distinct visual section. No section should appear instantly.

**Pre-completion checklist:**
- [ ] Every section wrapped in `<AnimatedSection>` (or `client:visible` in `.astro`)
- [ ] Card grids use `stagger` so children animate in sequence
- [ ] Hero uses `slow` + `stagger`
- [ ] No `delay` longer than 0.4s

### Pattern — `.tsx` React components (stagger available)

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

### Pattern — `.astro` files (stagger NOT available)

Each `client:visible` is a separate React island — variant context cannot cross boundaries. Use sequential delays instead:

```astro
<!-- Hero -->
<AnimatedSection client:visible slow><Badge /></AnimatedSection>
<AnimatedSection client:visible slow delay={0.12}><h1>...</h1></AnimatedSection>
<AnimatedSection client:visible slow delay={0.24}><p>...</p></AnimatedSection>
<AnimatedSection client:visible slow delay={0.36}><CTAButtons /></AnimatedSection>

<!-- Section header + grid -->
<AnimatedSection client:visible className="text-center mb-16">
  <h2>...</h2>
</AnimatedSection>
<AnimatedSection client:visible delay={0.15} className="grid sm:grid-cols-3 gap-6">
  {cards.map(...)}
</AnimatedSection>

<!-- Split layout -->
<AnimatedSection client:visible><!-- left --></AnimatedSection>
<AnimatedSection client:visible delay={0.2}><!-- right --></AnimatedSection>
```

---

## 2. Microinteractions

Every interactive element must respond visually to hover, focus, or active states.

### Required by element type

| Element | Required classes |
|---|---|
| Text links (nav, inline) | `transition-colors duration-150` + hover state |
| Muted → foreground links | `text-muted-foreground hover:text-foreground transition-colors` |
| Opacity-based links | `hover:opacity-70 transition-opacity` |
| Clickable cards | `hover:bg-muted/40 transition-colors` |
| Card titles on parent hover | `group-hover:opacity-70 transition-opacity` (parent has `group`) |
| Custom buttons | `transition-colors duration-150` minimum |
| Icon buttons | `hover:opacity-70 transition-opacity` or `hover:text-foreground transition-colors` |
| Form inputs | `transition-colors` + `focus:ring-2 focus:ring-ring` |
| Toggles / tabs | `transition-colors` on active state change |
| Disclosure chevrons | `transition-transform duration-200 group-open:rotate-180` |
| Back / breadcrumb links | `hover:text-foreground transition-colors` |

### Hover lift (use sparingly)

Subtle upward translate adds tactility to prominent clickable cards. Use only on feature/pricing/CTA cards — not on every card in a dense grid:

```
hover:-translate-y-0.5 transition-transform duration-150
```

### What NOT to do

- No `transition-all` — too broad, can cause layout thrashing
- Never transition `height`, `width`, `margin`, or `padding`
- No hover states on decorative elements (section labels, dividers)
- Max `duration-200` for hover states — `duration-300`+ feels sluggish

---

## Timing

### Duration scale
| Name    | Value  | Use case                          |
|---------|--------|-----------------------------------|
| fast    | 150ms  | Hover states, micro-interactions  |
| default | 300ms  | Entrance animations, transitions  |
| slow    | 500ms  | Page-level, hero elements         |

### Stagger
- Default grid/list children: `staggerChildren: 0.08`
- Hero / slow sections: `staggerChildren: 0.12`

### Easing
- Entrances: `ease-out`
- Exits: `ease-in`
- Interactive/spring: `type: "spring", stiffness: 300, damping: 30`

---

## Hard rules

- `useReducedMotion()` handled automatically inside `AnimatedSection` — never bypass
- `scroll-behavior: smooth` set globally in `globals.css` behind `prefers-reduced-motion: no-preference`
- Only animate `opacity` and `transform` — never layout properties
- No infinite animations unless purely decorative and extremely subtle
- Scroll-triggered animations use `whileInView` + `once: true` (via `inViewProps` in `src/lib/animation.ts`)
- `AnimatedSection` is a React island — always use `client:visible` in `.astro` files
