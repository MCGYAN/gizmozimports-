/**
 * Regenerates branded Open Graph share cards (Soft Ocean / Light Blue / White).
 * Run: node scripts/generate-og-image.mjs
 */
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'public', 'og');
const LOGO = join(ROOT, 'public', 'images', 'gizmoz-trades-logo-white.png');

/** Soft Ocean #0C4A6E · Light Blue #8CCFFF · White */
const OCEAN = '#0C4A6E';
const OCEAN_DEEP = '#083A57';
const OCEAN_MID = '#0A5578';
const ACCENT = '#8CCFFF';
const ICE = '#EAF6FF';

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function landscapeSvg({ width, height, headline, subline, accentHeadline = false }) {
  const headlineFill = accentHeadline ? ACCENT : '#FFFFFF';
  return Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${OCEAN}"/>
      <stop offset="48%" stop-color="${OCEAN_DEEP}"/>
      <stop offset="100%" stop-color="${OCEAN_MID}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="18%" cy="22%" r="42%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="88%" cy="78%" r="38%">
      <stop offset="0%" stop-color="${ICE}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${ICE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glowA)"/>
  <rect width="100%" height="100%" fill="url(#glowB)"/>
  <rect x="64" y="${Math.round(height * 0.52)}" width="72" height="6" rx="3" fill="${ACCENT}"/>
  <text x="64" y="${Math.round(height * 0.64)}" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="${headlineFill}" letter-spacing="-1.2">${esc(headline)}</text>
  <text x="64" y="${Math.round(height * 0.74)}" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="26" font-weight="500" fill="${ICE}" opacity="0.92">${esc(subline)}</text>
  <text x="64" y="${height - 56}" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="${ACCENT}">gizmozimports.com</text>
  <text x="${width - 64}" y="${height - 56}" text-anchor="end" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="20" font-weight="500" fill="#FFFFFF" opacity="0.72">China to Ghana</text>
</svg>`);
}

function squareSvg({ size, headline, subline }) {
  return Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${OCEAN}"/>
      <stop offset="55%" stop-color="${OCEAN_DEEP}"/>
      <stop offset="100%" stop-color="${OCEAN_MID}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="20%" cy="18%" r="45%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glowA)"/>
  <rect x="72" y="${Math.round(size * 0.58)}" width="72" height="6" rx="3" fill="${ACCENT}"/>
  <text x="72" y="${Math.round(size * 0.68)}" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="48" font-weight="700" fill="#FFFFFF" letter-spacing="-1">${esc(headline)}</text>
  <text x="72" y="${Math.round(size * 0.76)}" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="24" font-weight="500" fill="${ICE}" opacity="0.92">${esc(subline)}</text>
  <text x="72" y="${size - 64}" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="${ACCENT}">gizmozimports.com</text>
</svg>`);
}

async function composeLandscape(filename, { headline, subline, accentHeadline = false }) {
  const width = 1200;
  const height = 630;
  const logo = await sharp(LOGO)
    .resize(360, 130, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const image = await sharp({
    create: { width, height, channels: 4, background: { r: 12, g: 74, b: 110, alpha: 1 } },
  })
    .composite([
      { input: landscapeSvg({ width, height, headline, subline, accentHeadline }), left: 0, top: 0 },
      { input: logo, left: 64, top: 56 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(join(OUT, filename), image);
  console.log(`Wrote public/og/${filename} (${width}x${height})`);
}

async function composeSquare(filename, { headline, subline }) {
  const size = 1080;
  const logo = await sharp(LOGO)
    .resize(420, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const image = await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 12, g: 74, b: 110, alpha: 1 } },
  })
    .composite([
      { input: squareSvg({ size, headline, subline }), left: 0, top: 0 },
      { input: logo, left: 72, top: 72 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(join(OUT, filename), image);
  console.log(`Wrote public/og/${filename} (${size}x${size})`);
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  await composeLandscape('share.png', {
    headline: 'Buy from China the easy way',
    subline: 'Gadgets, electronics & everyday goods · Clear prices · Real updates',
  });

  await composeLandscape('twitter.png', {
    headline: 'Buy from China the easy way',
    subline: 'Gadgets, electronics & everyday goods · Clear prices · Real updates',
  });

  await composeLandscape('buy-rmb.png', {
    headline: 'Buy RMB with Ghana Cedis',
    subline: 'Pay suppliers in China · Clear invoice · Secure payment',
    accentHeadline: true,
  });

  await composeSquare('square.png', {
    headline: 'Buy from China the easy way',
    subline: 'Clear prices · Real updates · Ghana',
  });

  // Keep legacy path in sync so old crawlers still get the new brand card
  await composeLandscape('default.png', {
    headline: 'Buy from China the easy way',
    subline: 'Gadgets, electronics & everyday goods · Clear prices · Real updates',
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
