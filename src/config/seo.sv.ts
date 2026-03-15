// ─────────────────────────────────────────────────────────────────────────────
// Swedish SEO config — edit Swedish titles and descriptions here.
// Mirrors src/config/seo.ts — every page in seo.ts must appear here.
//
// RULES (same as seo.ts):
//   - Do NOT include "| Acme" in titles — appended automatically by BaseLayout.
//   - Descriptions: 120–160 characters, unique per page.
//   - Mark all [FILL IN] placeholders before launch.
// ─────────────────────────────────────────────────────────────────────────────

import type { PageSeo } from './seo';

export const seoSv = {

  // ── Core pages ─────────────────────────────────────────────────────────────

  home: {
    title: '[FILL IN — Swedish home title]',
    description: '[FILL IN — Swedish home meta description, 120–160 chars]',
  },

  aboutUs: {
    title: '[FILL IN — Swedish about title]',
    description: '[FILL IN — Swedish about meta description, 120–160 chars]',
  },

  contact: {
    title: '[FILL IN — Swedish contact title]',
    description: '[FILL IN — Swedish contact meta description, 120–160 chars]',
  },

  faq: {
    title: '[FILL IN — Swedish FAQ title]',
    description: '[FILL IN — Swedish FAQ meta description, 120–160 chars]',
  },

  // ── Content ────────────────────────────────────────────────────────────────

  blog: {
    title: '[FILL IN — Swedish blog title]',
    description: '[FILL IN — Swedish blog meta description, 120–160 chars]',
  },

  // ── Legal (noindex — not for search engines) ───────────────────────────────

  privacyPolicy: {
    title: '[FILL IN — Swedish privacy policy title]',
    description: '[FILL IN — Swedish privacy policy meta description]',
    noindex: true,
  },

  termsOfService: {
    title: '[FILL IN — Swedish terms title]',
    description: '[FILL IN — Swedish terms meta description]',
    noindex: true,
  },

} satisfies Record<string, PageSeo>;
