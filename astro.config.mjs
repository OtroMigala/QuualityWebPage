// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://qualityac.co',
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
