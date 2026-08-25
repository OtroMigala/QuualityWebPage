// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ⚠ PENDIENTE: confirmar el dominio definitivo. De este valor dependen el
// sitemap, las URL canónicas y las etiquetas Open Graph.
export default defineConfig({
  site: 'https://qualityac.co',
  trailingSlash: 'ignore',

  integrations: [
    sitemap({
      // El panel del estudiante no debe indexarse: es privado y son datos simulados.
      filter: (pagina) => !pagina.includes('/aula/mi-aprendizaje'),
      i18n: { defaultLocale: 'es', locales: { es: 'es-CO' } },
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      // three.js va en su propio chunk para que nunca bloquee el render inicial
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three')) return 'three';
          },
        },
      },
    },
  },
});
