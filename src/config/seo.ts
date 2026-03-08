// ─────────────────────────────────────────────────────────────────────────────
// Central SEO config — edit titles and descriptions here.
// Changes propagate to every page automatically.
//
// RULES:
//   - Do NOT include "| Acme" or "— Acme" in titles — it is appended
//     automatically by BaseLayout via titleTemplate.
//   - Descriptions: 120–160 characters, unique per page, no keyword stuffing.
//   - og.image: path relative to /public (e.g. '/og-home.png').
//     File must exist. Falls back to /og-default.svg if omitted.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Acme",
  url: "https://acme.com",
  description: "The modern platform powered by AI.",
  ogImage: "/og-default.png",
  twitterHandle: "@acme",
};

export interface PageSeo {
  title: string;
  description: string;
  og?: { image?: string };
  noindex?: boolean;
}

export const seo = {

  // ── Core pages ─────────────────────────────────────────────────────────────

  home: {
    title: 'The Modern Platform Powered by AI',
    description:
      'Acme gives you powerful AI tools to manage, analyze, and grow your business — all in one place. Powered by Aria AI.',
  },

  aboutUs: {
    title: 'Our Story',
    description:
      "We're building the modern platform for the next generation of teams and founders. Learn about our story, team, and mission.",
  },

  contact: {
    title: 'Contact',
    description:
      "Have a question, partnership inquiry, or feedback? Get in touch with the Acme team and we'll get back to you as soon as possible.",
  },

  faq: {
    title: 'FAQ',
    description:
      'Answers to the most common questions about Acme — what it does, how it works, pricing, security, and how to get started.',
  },

  // ── Content ────────────────────────────────────────────────────────────────

  blog: {
    title: 'Blog',
    description:
      'Insights, product updates, and stories from the Acme team. Written for modern teams and founders.',
  },

  // ── Legal (noindex — not for search engines) ───────────────────────────────

  privacyPolicy: {
    title: 'Privacy Policy',
    description:
      'How Acme collects, uses, stores, and protects your personal data in compliance with applicable privacy regulations.',
    noindex: true,
  },

  termsOfService: {
    title: 'Terms of Service',
    description:
      'The terms and conditions that govern your use of the Acme platform, including acceptable use, liability limitations, and account policies.',
    noindex: true,
  },

} satisfies Record<string, PageSeo>;
