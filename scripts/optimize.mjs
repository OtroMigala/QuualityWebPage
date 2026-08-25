import sharp from 'sharp';
import { statSync } from 'fs';

const jobs = [
  ['logo.png', 'logo.webp', 440], ['logo.png', 'logo@2x.webp', 880],
  ['logo-dark.png', 'logo-dark.webp', 440], ['logo-dark.png', 'logo-dark@2x.webp', 880],
  ['isotipo.png', 'isotipo.webp', 256],
];
for (const [src, out, w] of jobs) {
  await sharp(`public/brand/${src}`).resize({ width: w })
    .webp({ quality: 92, effort: 6 }).toFile(`public/brand/${out}`);
  console.log(`${out.padEnd(20)} ${w}px  ${(statSync(`public/brand/${out}`).size / 1024).toFixed(1)}KB`);
}
// favicon
await sharp('public/brand/isotipo.png').resize(180, 180, { fit: 'contain', background: { r: 1, g: 49, b: 117, alpha: 1 } })
  .png().toFile('public/favicon.png');
console.log(`favicon.png          ${(statSync('public/favicon.png').size / 1024).toFixed(1)}KB`);
