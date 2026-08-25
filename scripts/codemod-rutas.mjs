/**
 * Envuelve todas las rutas internas absolutas con ruta(), para que el sitio
 * funcione tanto en la raíz de un dominio como dentro de un subdirectorio.
 * Uso: node scripts/codemod-rutas.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';

function astroFiles(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) astroFiles(p, out);
    else if (e.endsWith('.astro')) out.push(p);
  }
  return out;
}

// Rutas que NO se tocan: protocolos, anclas y las que ya pasan por ruta()
const EXTERNA = /^(https?:|mailto:|tel:|#|\/\/)/;

let totalCambios = 0;

for (const archivo of astroFiles('src')) {
  let src = readFileSync(archivo, 'utf8');
  const original = src;
  let n = 0;

  // href="/algo"  y  src="/algo"
  src = src.replace(/\b(href|src)="(\/[^"]*)"/g, (m, attr, valor) => {
    if (EXTERNA.test(valor)) return m;
    n++;
    return `${attr}={ruta('${valor}')}`;
  });

  // href={`/algo/${x}`}
  src = src.replace(/\b(href|src)=\{`(\/[^`]*)`\}/g, (m, attr, valor) => {
    n++;
    return `${attr}={ruta(\`${valor}\`)}`;
  });

  // srcset="/a.webp 440w, /b.webp 880w"
  src = src.replace(/\bsrcset="([^"]+)"/g, (m, valor) => {
    if (!valor.includes('/')) return m;
    const partes = valor.split(',').map((p) => {
      const [url, ...desc] = p.trim().split(/\s+/);
      if (!url.startsWith('/')) return p.trim();
      return `\${ruta('${url}')}${desc.length ? ' ' + desc.join(' ') : ''}`;
    });
    n++;
    return `srcset={\`${partes.join(', ')}\`}`;
  });

  // href={item.href} y href={n.href} — vienen de src/data/site.ts
  src = src.replace(/\bhref=\{(item|n)\.href\}/g, (m, v) => {
    n++;
    return `href={ruta(${v}.href)}`;
  });

  if (!n) continue;

  // Insertar el import en el frontmatter
  const destino = relative(dirname(archivo), join('src', 'lib', 'rutas'))
    .split('\\')
    .join('/');
  const especificador = destino.startsWith('.') ? destino : `./${destino}`;
  const linea = `import { ruta } from '${especificador}';`;

  if (!src.includes("from '" + especificador + "'")) {
    if (src.startsWith('---')) {
      const fin = src.indexOf('---', 3);
      src = src.slice(0, fin) + linea + '\n' + src.slice(fin);
    } else {
      src = `---\n${linea}\n---\n\n` + src;
    }
  }

  if (src !== original) {
    writeFileSync(archivo, src);
    totalCambios += n;
    console.log(`${String(n).padStart(3)} cambios  ${archivo}`);
  }
}

console.log(`\nTotal: ${totalCambios} rutas envueltas con ruta()`);
