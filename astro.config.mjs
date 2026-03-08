import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://acme.com',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
