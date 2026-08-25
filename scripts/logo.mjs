import sharp from 'sharp';

const SRC = 'scripts/source-logo.png';
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const alpha = await sharp(SRC).ensureAlpha().extractChannel(3).stats();
console.log(`origen: ${width}x${height} | alpha min/max: ${alpha.channels[0].min}/${alpha.channels[0].max}`);

// Colores de marca dominantes (solo pixeles opacos y saturados)
const buckets = new Map();
for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] < 200) continue;
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === 0 || (max - min) / max < 0.4) continue;
  const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
  const c = buckets.get(key) || { r: 0, g: 0, b: 0, n: 0 };
  c.r += r; c.g += g; c.b += b; c.n++;
  buckets.set(key, c);
}
const hex = (v, n) => Math.round(v / n).toString(16).padStart(2, '0');
console.log('colores de marca:', [...buckets.values()].sort((a, b) => b.n - a.n).slice(0, 4)
  .map(c => `#${hex(c.r, c.n)}${hex(c.g, c.n)}${hex(c.b, c.n)}`).join('  '));

// Logo recortado para fondos claros
await sharp(SRC).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile('public/brand/logo.png');
const m = await sharp('public/brand/logo.png').metadata();
console.log(`logo.png -> ${m.width}x${m.height}`);

// Variante para fondos oscuros: azul y gris oscuro -> blanco, amarillo intacto
const d0 = await sharp('public/brand/logo.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const d = Buffer.from(d0.data);
for (let i = 0; i < d.length; i += 4) {
  if (d[i + 3] < 8) continue;
  const [r, g, b] = [d[i], d[i + 1], d[i + 2]];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const esAmarillo = r > 140 && g > 110 && b < 120 && sat > 0.4;
  if (!esAmarillo) { d[i] = 255; d[i + 1] = 255; d[i + 2] = 255; }
}
await sharp(d, { raw: { width: d0.info.width, height: d0.info.height, channels: 4 } })
  .png({ compressionLevel: 9 }).toFile('public/brand/logo-dark.png');

// Marca de agua / isotipo: solo la Q con el check (cuadrante izquierdo)
await sharp('public/brand/logo.png')
  .extract({ left: 0, top: 0, width: Math.round(m.width * 0.42), height: Math.round(m.height * 0.92) })
  .trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile('public/brand/isotipo.png');

for (const f of ['logo.png', 'logo-dark.png', 'isotipo.png']) {
  const s = await sharp(`public/brand/${f}`).metadata();
  console.log(`  ${f}: ${s.width}x${s.height}  ${(s.size / 1024).toFixed(0)}KB`);
}
