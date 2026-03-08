Run this to audit SEO on a specific page or across the entire site.

## 1. Determine scope
Ask the user:
> "Audit the full site or a specific page? Type a page path (e.g. `src/pages/index.astro`) or `all` for a site-wide audit."

Wait for the answer before proceeding.

---

## Page audit (single page)

Read the full file before starting. Then check every item below.

### URLs & routing
- [ ] URL is lowercase and hyphenated — no camelCase or underscores
- [ ] URL is descriptive and readable
- [ ] No trailing slashes or inconsistencies with the rest of the site

### Title
- [ ] Set via `astro-seo`
- [ ] Format: `Page Name | [Brand]`
- [ ] Length: 50–60 characters (flag if shorter or longer)
- [ ] Unique — not shared with any other page
- [ ] Accurately describes the page content

### Meta description
- [ ] Set via `astro-seo`
- [ ] Length: 120–155 characters (flag if outside range)
- [ ] Unique — not shared with any other page
- [ ] Reads naturally, includes a value proposition or call to action
- [ ] Does not just repeat the title

### Open Graph
- [ ] `og:title` set
- [ ] `og:description` set
- [ ] `og:image` set and the file physically exists in `/public`
- [ ] OG image dimensions are 1200×630px
- [ ] OG image is PNG or JPG (not SVG — SVG is a placeholder only)
- [ ] `og:type` set appropriately (`website` for pages, `article` for blog posts)

### Canonical & robots
- [ ] Canonical URL is set and correct
- [ ] No unintentional `noindex` or `nofollow` directives
- [ ] Page is not accidentally blocked by `robots.txt`

### Heading hierarchy
- [ ] Exactly one `<h1>` on the page
- [ ] `<h1>` text is descriptive and matches the page intent
- [ ] Headings follow logical order: h1 → h2 → h3 (no skipped levels)
- [ ] No heading used purely for styling purposes

### Images
- [ ] All images use Astro's `<Image>` component — no raw `<img>` tags
- [ ] Every image has a descriptive `alt` attribute
- [ ] Decorative images have `alt=""`
- [ ] `width` and `height` always specified (prevents CLS)
- [ ] Hero/LCP image uses `loading="eager"`, all others use `loading="lazy"`

### Structured data (JSON-LD)
- [ ] Is structured data appropriate for this page? (FAQ, Article, Product, BreadcrumbList, Organization)
- [ ] If yes, is it present and valid?
- [ ] If no, confirm it's intentionally omitted

### Internal linking
- [ ] Page is linked to from at least one other page on the site
- [ ] Links to it use descriptive anchor text (not "click here" or "read more")
- [ ] Key calls to action link to logical destinations

### Sitemap
- [ ] Page will be included by `@astrojs/sitemap`
- [ ] No accidental exclusion via config

### Content quality signals
- [ ] Page has enough unique content to be indexable (not thin content)
- [ ] Primary keyword or topic is clear from the title, h1, and first paragraph
- [ ] No duplicate content copied from another page

---

## Global audit (all pages)

Scan every file in `src/pages/` (excluding API routes and dynamic segments that don't need individual meta).

For each page, check and tabulate:

| Page | Title | Description | OG Image exists | H1 | Issues |
|------|-------|-------------|-----------------|-----|--------|

Flag any page that:
- Is missing a `title` or `description`
- Has a title outside 50–60 characters
- Has a description outside 120–155 characters
- Shares a title or description with another page (duplicates)
- Has no `og:image` or the image file doesn't exist in `/public`
- Has zero or more than one `<h1>`
- Has a broken heading hierarchy
- Contains raw `<img>` tags
- Has images missing `alt` text
- Is not reachable via internal links

### Also check globally:
- [ ] `robots.txt` exists in `/public` and is correctly configured
- [ ] `@astrojs/sitemap` is configured in `astro.config.mjs`
- [ ] No pages are accidentally excluded from the sitemap
- [ ] OG default image (`/public/og-default.png`) exists and is 1200×630px
- [ ] No duplicate page titles or descriptions across the site

---

## Output format

After completing the audit, output:
- **Pass** / **Fail** / **Warning** for each category
- A prioritized issues list: Critical → High → Low
- Specific file and line references for every issue found
- A recommended fix for each issue
- Whether the page/site is ready to ship from an SEO standpoint
