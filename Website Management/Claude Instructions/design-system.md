# Design System — Detailed Reference

> For the short mandate, see root `CLAUDE.md`. This file covers spacing, typography, icon rules, and component patterns in full.

---

## Components

- All UI components use **shadcn/ui** — never create one-off primitives
- Import from `@/components/ui/`
- Before building any UI, check if a shadcn component covers the use case

---

## Colors & tokens

- All colors via CSS variables in `src/styles/globals.css` — no hardcoded hex values ever
- Use Tailwind semantic tokens: `text-foreground`, `bg-muted`, `border-border`, etc.
- Never use arbitrary values like `text-[#1a1a1a]` or `bg-[oklch(0.5_0.1_200)]`
- Never use raw Tailwind palette colors (`gray-200`, `zinc-300`) for anything the user sees
- When adjusting a token in `globals.css`, always update both `:root` (light) and `.dark`

### Dark mode — always in scope
- Every visual change must work in both light and dark mode before it is done
- Push back on anything that would break dark mode — hardcoded light colors, fixed opacities, raw palette classes
- CSS variables are what make dark mode work — never bypass them

---

## Typography

- **Geist Variable** (sans) and **Geist Mono Variable** (mono) are the only fonts — never introduce a new typeface
- Use the Tailwind type scale — no custom `font-size` values
- Typography changes (scale, weight, spacing) are design decisions — challenge them

---

## Spacing rhythm

Prefer multiples of 4. Standard section padding: `py-24`. Tinted sections: `border-y border-border bg-muted/30 py-24`.

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96
```

No arbitrary spacing like `mt-[17px]` or `gap-[22px]`.

---

## Styling rules

- Tailwind utility classes only — no custom CSS classes unless absolutely unavoidable
- No `style=` attributes
- No `@apply` except in `globals.css` for base resets

---

## Icons

| Source | Use case |
|---|---|
| **Lucide React** | All UI icons — `import { ChevronDown } from 'lucide-react'` |
| **`flag-icons` CSS** | Country/language flags only — `fi fi-se`, `fi fi-gb` |
| **Unicode symbols** | Decorative feature card icons (◈ ◆ ⬡ ◉ ▣ ◎ ⊕) — intentional, do not replace |

- Never write inline `<svg>` markup for icons
- Lucide icons in `.astro` files render as static HTML with no `client:*` directive needed
- No other icon libraries (Heroicons, FontAwesome, Phosphor, etc.)

---

## Section & card patterns

```
Section label:   text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4
Card style:      rounded-xl border border-border p-6
Icon box:        size-10 rounded-lg bg-muted flex items-center justify-center
Featured card:   bg-foreground with text-background and text-background/70
Form inputs:     border-border bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-ring
```

### Alternating section backgrounds
```
Plain:   py-24
Tinted:  border-y border-border bg-muted/30 py-24
```

---

## Aesthetic principles (YC / Linear / Vercel)

- Clean, minimal, high contrast, generous whitespace
- Functional over decorative — every element earns its place
- No gradients unless they serve a clear purpose
- No drop shadows unless they add depth that matters
- Push back on anything that feels "webflow-y", noisy, or over-designed
