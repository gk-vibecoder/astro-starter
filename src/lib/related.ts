export type RelatedArticle = {
  title: string;
  description: string;
  href: string;
  category?: string;
  meta?: string;
  image?: string;
};

/**
 * Strips locale suffix and file extension from a collection entry ID.
 * Use this everywhere instead of `entry.slug` — Astro 5 `entry.slug` is
 * unreliable for locale-suffixed filenames (e.g. `post.sv.mdx` → `post.sv`).
 *
 * @example normalizeId('my-post.sv.mdx') // → 'my-post'
 * @example normalizeId('my-post.mdx')    // → 'my-post'
 */
export const normalizeId = (id: string) => id.replace(/(?:\.sv)?\.(md|mdx)$/, '');

/**
 * Pick related articles from a pre-mapped list.
 * Prioritises items in the same category, then fills with others.
 * The `id` field is used only for deduplication and is stripped from the output.
 */
export function pickRelated(
  items: Array<RelatedArticle & { id: string }>,
  currentId: string,
  currentCategory: string | undefined,
  limit = 3,
): RelatedArticle[] {
  const currentNorm = normalizeId(currentId);
  const others = items.filter((a) => normalizeId(a.id) !== currentNorm);

  const prioritized = currentCategory
    ? [
        ...others.filter((a) => a.category === currentCategory),
        ...others.filter((a) => a.category !== currentCategory),
      ]
    : others;

  return prioritized.slice(0, limit).map(({ id: _id, ...rest }) => rest);
}
