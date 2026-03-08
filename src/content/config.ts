import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    // i18n: language of this document. Defaults to 'en'. Used to filter by locale.
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
    ogImage: z.string().optional(),
    // i18n: language of this document. Defaults to 'en'.
    lang: z.enum(['en', 'sv']).default('en'),
  }),
});

export const collections = {
  blog,
  news,
};
