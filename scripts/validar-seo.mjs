/**
 * Revisión de SEO sobre el sitio ya construido.
 * Uso: npm run build && node scripts/validar-seo.mjs
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const BARRA_INV = String.fromCharCode(92);

function paginas(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) paginas(p, out);
    else if (e === 'index.html') out.push(p);
  }
  return out;
}

const archivos = paginas('dist');
const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
const enSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

let fallos = 0;

for (const f of archivos) {
  const html = readFileSync(f, 'utf8');
  const ruta = f.split(BARRA_INV).join('/').replace('dist', '').replace('/index.html', '') || '/';

  const canonica = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const noindex = /content="noindex/.test(html);
  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];

  const errores = [];
  if (!canonica) errores.push('sin canonica');
  if (!titulo) errores.push('sin titulo');
  if (titulo.length > 65) errores.push(`titulo ${titulo.length} car (>65)`);
  if (!desc) errores.push('sin descripcion');
  if (desc.length > 165) errores.push(`descripcion ${desc.length} car (>165)`);
  if (h1 !== 1) errores.push(`${h1} etiquetas h1`);
  if (!og) errores.push('sin og:image');
  if (!noindex && canonica && !enSitemap.has(canonica)) errores.push('canonica no coincide con sitemap');

  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  if (!ld) errores.push('sin JSON-LD');
  else {
    try {
      const datos = JSON.parse(ld);
      const tipos = (datos['@graph'] ?? []).map((n) => n['@type']);
      if (!tipos.includes('ProfessionalService')) errores.push('JSON-LD sin organizacion');
      if (!tipos.includes('WebPage')) errores.push('JSON-LD sin WebPage');
    } catch (e) {
      errores.push(`JSON-LD invalido: ${e.message}`);
    }
  }

  if (errores.length) fallos++;
  const marca = errores.length ? 'FALLA' : noindex ? 'noindex' : 'ok';
  console.log(
    `${marca.padEnd(8)} ${ruta.padEnd(40)} t:${String(titulo.length).padStart(2)} d:${String(desc.length).padStart(3)}  ${errores.join(' · ')}`
  );
}

console.log(`\n${archivos.length} paginas revisadas · ${fallos} con problemas`);
process.exit(fallos ? 1 : 0);
