import sharp from 'sharp';
import { statSync } from 'fs';

const W = 1200, H = 630;

// Fondo: degradado azul de marca + rejilla sutil, todo generado por codigo
const fondo = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#01397f"/>
      <stop offset="55%" stop-color="#012a63"/>
      <stop offset="100%" stop-color="#011536"/>
    </linearGradient>
    <radialGradient id="halo" cx="78%" cy="22%" r="55%">
      <stop offset="0%" stop-color="#0a4a9e" stop-opacity=".55"/>
      <stop offset="100%" stop-color="#0a4a9e" stop-opacity="0"/>
    </radialGradient>
    <pattern id="rej" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity=".055" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#rej)"/>
  <rect width="${W}" height="${H}" fill="url(#halo)"/>
  <circle cx="990" cy="150" r="196" fill="none" stroke="#fdbe01" stroke-opacity=".34" stroke-width="2"/>
  <circle cx="990" cy="150" r="248" fill="none" stroke="#6f9fe0" stroke-opacity=".18" stroke-width="1.5"/>
  <rect x="80" y="470" width="86" height="5" rx="2.5" fill="#fdbe01"/>
</svg>`);

const logo = await sharp('public/brand/logo-dark.webp').resize({ width: 620 }).png().toBuffer();
const { height: hLogo } = await sharp(logo).metadata();

await sharp(fondo)
  .composite([{ input: logo, top: Math.round(H / 2 - hLogo / 2 - 40), left: 80 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og.jpg');

const { width, height } = await sharp('public/og.jpg').metadata();
console.log(`og.jpg  ${width}x${height}  ${(statSync('public/og.jpg').size / 1024).toFixed(1)}KB`);
