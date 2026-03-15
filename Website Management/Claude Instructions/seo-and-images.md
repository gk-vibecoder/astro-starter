# SEO & Images — Detailed Reference

> For the short mandate, see root `CLAUDE.md`. This file covers structured data, OG images, and alt text guidelines.

---

## SEO

### Per-page requirements
- Unique `title`, `description`, `og:image` on every page via `astro-seo`
- Title format: `Page Name | [Brand Name]`
- One `<h1>` per page — no exceptions
- Logical heading hierarchy: h1 → h2 → h3
- Sitemap handled by `@astrojs/sitemap` — all pages must be included
- URLs: lowercase, hyphenated, descriptive

### Structured data (JSON-LD)

- Organization + WebSite schema: included globally via `BaseLayout`
- Article schema: included via `ArticleLayout` for all article-type content (blog, news, etc.)
- Page-specific schemas: pass as `pageSchema` prop to `BaseLayout` (stringified JSON-LD)

### Audit responsibilities

When auditing SEO, check both:
1. **Technical SEO** — meta tags, headings, image alts, sitemap, structured data, canonical URLs
2. **Content alignment** — do titles/descriptions/H1s reflect the page's target intent?

---

## Images

### Required attributes (every image, every time)
- `alt` — always descriptive; `alt=""` only for purely decorative images
- `width` and `height` — always specified to prevent CLS
- Use Astro's `<Image>` component from `astro:assets` — never a raw `<img>` tag

**Every time a component or page is touched, audit all images in it.**

### Alt text guidelines

| Image type | Alt text pattern |
|---|---|
| Product/UI screenshots | Describe what it shows, e.g. `"Aria AI dashboard showing analytics overview"` |
| Decorative (icons alongside text, textures) | `alt=""` |
| Logos | `"[Brand] logo"` |
| Team photos | `"[Name], [Role]"` |
| Blog post covers | Match the post title or summarise the visual |

### OG / social images

- Every page must resolve to a real image at the `og:image` URL — verify file exists in `/public`
- Dimensions: 1200×630px, PNG or JPG (SVG is placeholder only — replace before launch)
- Blog/content posts: unique `ogImage` field in frontmatter, fall back to `/og-default.png`

### Performance

- Always specify `width` and `height` to avoid CLS
- `loading="lazy"` for all below-fold images
- `loading="eager"` only for the hero/LCP image
- Prefer WebP/AVIF — Astro's `<Image>` handles this automatically for local assets
