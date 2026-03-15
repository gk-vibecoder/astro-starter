# CMS & Content Collections — Detailed Reference

> For the short mandate, see root `CLAUDE.md`. This file covers content collection conventions, routing patterns, and locale handling for all CMS content.

---

## Collection schema

Every collection in `src/content/config.ts` must include a `lang` field:
```ts
lang: z.enum(['en', 'sv']).default('en'),
```

---

## File naming

EN files: `{slug}.mdx` / `{slug}.md`
SV files: `{slug}.sv.mdx` / `{slug}.sv.md`

All locale variants live in the same directory, distinguished by the `lang` field in frontmatter.

---

## `normalizeId` (use everywhere — never use `entry.slug`)

```ts
const normalizeId = (id: string) => id.replace(/(?:\.sv)?\.(md|mdx)$/, '');
```

Strips the locale suffix and file extension to produce a clean URL slug.

**Why:** `entry.slug` in Astro 5 is unreliable for locale-suffixed filenames — `my-post.sv.mdx` produces `my-post.sv` instead of `my-post`. Using `normalizeId(entry.id)` guarantees consistent slugs across locales.

**Rule:** Use `normalizeId(entry.id)` for:
- `params.slug` in `getStaticPaths`
- All `href` links to detail pages (including related articles)
- `alternateHref` values

Never use `entry.slug` for any of these.

**Astro scoping caveat:** `getStaticPaths` runs in an isolated scope — it cannot access variables defined outside it in the same frontmatter. Define `normalizeId` *inside* `getStaticPaths`, and define it again in the runtime scope if needed for `alternateHref` or related article hrefs.

---

## Detail pages — `getStaticPaths`

### EN detail pages

Filter for `lang === 'en'` only. `normalizeId` must be defined inside `getStaticPaths`:
```ts
export async function getStaticPaths() {
  const normalizeId = (id: string) => id.replace(/(?:\.sv)?\.(md|mdx)$/, '');
  const entries = await getCollection('collection', (e) => !e.data.draft && e.data.lang === 'en');
  return entries.map((entry) => ({
    params: { slug: normalizeId(entry.id) },
    props: { entry },
  }));
}

// Redefine in runtime scope for alternateHref / related article hrefs
const normalizeId = (id: string) => id.replace(/(?:\.sv)?\.(md|mdx)$/, '');
```

### SV detail pages — SV-first with EN fallback

```ts
export async function getStaticPaths() {
  const normalizeId = (id: string) => id.replace(/(?:\.sv)?\.(md|mdx)$/, '');
  const svEntries = await getCollection('collection', (e) => !e.data.draft && e.data.lang === 'sv');
  const enEntries = await getCollection('collection', (e) => !e.data.draft && e.data.lang === 'en');
  const svIds = new Set(svEntries.map((e) => normalizeId(e.id)));

  const entries = [
    ...svEntries,
    ...enEntries.filter((e) => !svIds.has(normalizeId(e.id))),
  ];

  return entries.map((entry) => ({
    params: { slug: normalizeId(entry.id) },
    props: { entry },
  }));
}

// Redefine in runtime scope
const normalizeId = (id: string) => id.replace(/(?:\.sv)?\.(md|mdx)$/, '');
```

This ensures SV content is used where it exists, with EN fallback for untranslated entries.

---

## Index pages — locale filtering

Every `getCollection()` call on an index page must filter by `lang`:
```ts
// EN index
const entries = await getCollection('collection', (e) => !e.data.draft && e.data.lang === 'en');

// SV index — SV-first + EN fallback, dedup by normalizeId
const svEntries = await getCollection('collection', (e) => !e.data.draft && e.data.lang === 'sv');
const enEntries = await getCollection('collection', (e) => !e.data.draft && e.data.lang === 'en');
const svIds = new Set(svEntries.map((e) => normalizeId(e.id)));
const entries = [...svEntries, ...enEntries.filter((e) => !svIds.has(normalizeId(e.id)))];
```

Never call `getCollection()` without a lang filter — it will mix locales on the page.

---

## `alternateHref` (required on every detail page)

Every detail page must pass `alternateHref` to its layout so the header language switcher resolves correctly.

```ts
// EN detail page
const cleanSlug = normalizeId(entry.id);
// pass to layout:
alternateHref={`/sv/collection/${cleanSlug}`}

// SV detail page
const cleanSlug = normalizeId(entry.id);
// pass to layout:
alternateHref={`/collection/${cleanSlug}`}
```

Omitting `alternateHref` breaks the lang switcher.

---

## Related articles

When using `pickRelated`, the `getCollection` query must also filter by locale:
```ts
const allArticles = await getCollection('collection', (e) => !e.data.draft && e.data.lang === 'en');
const relatedArticles = pickRelated(
  allArticles.map((a) => ({
    id: a.id,
    title: a.data.title,
    description: a.data.description,
    href: `/collection/${normalizeId(a.id)}`,
    category: a.data.category,
  })),
  currentEntry.id,
  currentEntry.data.category,
);
```

---

## Adding a new collection — checklist

1. **Schema** — add to `src/content/config.ts` with `lang` field
2. **Content** — create EN files, then SV variants with `.sv.` suffix and `lang: sv`
3. **EN index page** — `src/pages/{collection}/index.astro`, filter by `lang === 'en'`
4. **SV index page** — `src/pages/sv/{collection}/index.astro`, SV-first + EN fallback
5. **EN detail page** — `src/pages/{collection}/[slug].astro`, `normalizeId` for params, include `alternateHref`
6. **SV detail page** — `src/pages/sv/{collection}/[slug].astro`, SV-first + EN fallback, include `alternateHref`
7. **SEO config** — add page metadata to `src/config/seo.ts` and `src/config/seo.sv.ts`
8. **Navigation** — add links to header/footer if applicable
