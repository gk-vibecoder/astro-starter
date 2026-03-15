import { defineCollection, z } from 'astro:content';

// Blog posts — MDX with full i18n support
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    ogImage: z.string().optional(),
    lang: z.enum(['en', 'sv']).default('en'),
  }),
});

// News / press articles
// Categories: Company, Product, Partnerships, Events
const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['Company', 'Product', 'Partnerships', 'Events']),
    readingTime: z.number().optional(), // minutes
    draft: z.boolean().default(false),
    image: z.string().optional(),
    ogImage: z.string().optional(),
    lang: z.enum(['en', 'sv']).default('en'),
  }),
});

// FAQ — question/answer pairs with category grouping
// Detail pages at /faq/[slug] + embedded FAQ section on home
const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),   // full question — used as h1 on detail page
    answer: z.string(),     // short answer — meta description + FAQPage schema
    category: z.enum([
      'General',
      'Pricing',
      'Features',
      'Security',
      'Getting Started',
    ]),
    lang: z.enum(['en', 'sv']).default('en'),
    draft: z.boolean().default(false),
    order: z.number().optional(), // display order within category
  }),
});

// Testimonials / customer stories
// Used by embedded Testimonials section AND detail pages at /testimonials/[slug]
const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),     // meta description
    name: z.string(),
    role: z.string(),
    company: z.string().optional(),
    initials: z.string().max(2),
    avatar: z.string().optional(),
    quote: z.string(),           // pull quote — used by embedded section
    outcome: z.string(),         // key result one-liner
    category: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    lang: z.enum(['en', 'sv']).default('en'),
  }),
});

export const collections = {
  blog,
  news,
  faq,
  testimonials,
};
