// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * El sitio se publica en dos sitios distintos:
 *
 *  · GitHub Pages, dentro del subdirectorio /QuualityWebPage/ — provisional,
 *    para poder revisarlo mientras no exista el dominio.
 *  · qualityac.co, en la raíz — destino final.
 *
 * El workflow de despliegue activa DESPLIEGUE=pages. En local y para el
 * dominio propio no se define nada y el sitio se construye para la raíz.
 *
 * ⚠ PENDIENTE: al apuntar qualityac.co, basta con dejar de pasar esa variable.
 */
const enPages = process.env.DESPLIEGUE === 'pages';

export default defineConfig({
  site: enPages ? 'https://otromigala.github.io' : 'https://qualityac.co',
  base: enPages ? '/QuualityWebPage' : undefined,
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
    define: {
      // El despliegue provisional se marca noindex: si Google llega a indexarlo,
      // competiría contra el dominio real como contenido duplicado.
      'import.meta.env.EN_PAGES': JSON.stringify(enPages),
    },
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
