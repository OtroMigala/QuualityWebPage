/**
 * Antepone la base del sitio a las rutas internas.
 *
 * Astro NO reescribe solo los `href` y `src` absolutos que uno escribe a mano.
 * Si el sitio se publica en un subdirectorio —como pasa en GitHub Pages, donde
 * vive en /QuualityWebPage/— todas esas rutas apuntarían a la raíz del dominio
 * y el sitio saldría sin logo, sin estilos y con los enlaces rotos.
 *
 * En la raíz (dominio propio) BASE_URL es '/', y ruta('/aula') devuelve '/aula'.
 * Bajo GitHub Pages devuelve '/QuualityWebPage/aula'.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function ruta(camino: string): string {
  const limpio = camino.startsWith('/') ? camino : `/${camino}`;
  return `${BASE}${limpio}`;
}

/**
 * La operación inversa: quita la base de una ruta del navegador para poder
 * compararla con los `href` tal como están escritos en src/data/site.ts.
 */
export function sinBase(pathname: string): string {
  const p = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return p.replace(/\/+$/, '') || '/';
}
