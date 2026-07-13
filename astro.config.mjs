// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://innogenio.com',
  vite: {
    plugins: [tailwindcss()]
  },
  server: { host: true },
  integrations: [
    // emits /sitemap-index.xml with hreflang alternates per locale
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', de: 'de' }
      }
    })
  ],
  // localized copy lives in src/constants/pagedata/<locale>/; the default
  // locale serves from "/" and every other locale from "/<locale>/"
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: { prefixDefaultLocale: false }
  }
});