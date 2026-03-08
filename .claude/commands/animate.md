Add or audit animations on a page or section. Follow every step before writing any code.

## 1. Identify scope
Determine what is being animated:
- A full page (audit all sections)
- A specific section or component
- A new section being built (run `/new-section` first)

Note whether each file is `.astro` or `.tsx` — the stagger pattern differs (see step 3).

Read the relevant file(s) before proceeding.

## 2. Audit current animation state
For each section or component in scope:
- Is it wrapped in `<AnimatedSection>`? If not, it needs to be.
- Is `client:visible` set on every `AnimatedSection` in `.astro` files?
- Are there any inline variant objects? Move them to `src/lib/animation.ts`.
- Are there any CSS transitions being used for entrance effects? Replace with Framer Motion.
- Are any layout properties being animated (`height`, `width`, `top`, `margin`)? Replace with `opacity`/`transform` only.

## 3. Default animation rules (apply to every page)

### In `.tsx` React components (stagger works — shared React tree)
- **Hero**: `<AnimatedSection slow stagger>` with `<AnimatedItem>` per logical block (badge, heading, body, CTAs)
- **Card grids / feature lists**: `<AnimatedSection stagger>` with `<AnimatedItem>` per card
- **All other sections**: wrap content in `<AnimatedSection>`

### In `.astro` files (stagger does NOT work — each `client:visible` is a separate island)
Framer Motion variant context cannot cross island boundaries, so `AnimatedItem` won't inherit stagger timing from a parent `AnimatedSection`. Use this pattern instead:

- **Hero**: Multiple sequential `<AnimatedSection client:visible slow>` with increasing `delay` props (0, 0.12, 0.24, 0.36, 0.48) — one per logical block
- **Section header + grid both visible on entry**: Two `<AnimatedSection client:visible>` — header first, grid with `delay={0.15}`
- **Split layouts (text + visual)**: Left `<AnimatedSection client:visible>`, right `<AnimatedSection client:visible delay={0.2}>`
- **Simple sections**: Single `<AnimatedSection client:visible>` wrapping all content
- **Images**: wrap in `<AnimatedSection client:visible>` — the `fadeIn` variant (no y-movement) can be added to `animation.ts` if needed

**No section appears without an entrance animation.**

## 4. Constraints to verify
- All variants imported from `src/lib/animation.ts` — no inline objects
- Only `opacity` and `transform` are animated — never `height`, `width`, `top`, `left`, `margin`, `padding` (these cause layout recalculation every frame)
- `useReducedMotion()` handled inside `AnimatedSection` — do not add it manually elsewhere
- `whileInView` + `once: true` handled by `inViewProps` — do not override
- Duration scale: fast (150ms), default (300ms), slow (500ms) — nothing outside this
- `AnimatedSection` imported from `@/components/ui/AnimatedSection`
- In `.astro` files: always `client:visible` — never `client:load` for animation wrappers
- The `delay` prop on `AnimatedSection` correctly merges duration + ease + delay — safe to use

## 5. Output an animation plan
Before writing code, output:
- List of sections/components being animated
- File type (`.astro` or `.tsx`) for each — determines stagger approach
- Animation type for each (fade-up, delayed fade-up, slow fade-up, fade-in)
- Any variants needed that don't exist yet in `src/lib/animation.ts`
- Any risks or edge cases

Wait for confirmation, then implement.

## 6. After implementing
- Verify no inline variant objects remain
- Verify all `AnimatedSection` usages in `.astro` files have `client:visible`
- Verify no layout properties are being animated
- Run a quick visual check: does every section entrance feel purposeful and consistent? Is any section still appearing instantly?
