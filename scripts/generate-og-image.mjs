/**
 * Regenerates branded Open Graph share cards.
 * Structure matches the WhatsApp preview: centered logo + headline + subline.
 * Colours: Soft Ocean #0C4A6E · Light Blue #8CCFFF · White.
 * Run: node scripts/generate-og-image.mjs
 */
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'public', 'og');
const LOGO = join(ROOT, 'public', 'images', 'gizmoz-trades-logo-white.png');

const OCEAN = '#0C4A6E';
const OCEAN_DEEP = '#083A57';
const OCEAN_RICH = '#0E5A86';
const ACCENT = '#8CCFFF';
const ICE = '#EAF6FF';

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Centered stack — same structure as the live WhatsApp card. */
function landscapeSvg({ width, height, headline, subline, accentHeadline = false }) {
  const cx = width / 2;
  const headlineFill = accentHeadline ? ACCENT : '#FFFFFF';
  const headlineY = Math.round(height * 0.58);
  const subY = Math.round(height * 0.72);

  return Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${OCEAN_RICH}"/>
      <stop offset="42%" stop-color="${OCEAN}"/>
      <stop offset="100%" stop-color="${OCEAN_DEEP}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="28%" cy="18%" r="48%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="78%" cy="88%" r="40%">
      <stop offset="0%" stop-color="${ICE}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="${ICE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glowA)"/>
  <rect width="100%" height="100%" fill="url(#glowB)"/>
  <text x="${cx}" y="${headlineY}" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="${headlineFill}" letter-spacing="-0.6">${esc(headline)}</text>
  <text x="${cx}" y="${subY}" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="24" font-weight="400" fill="#FFFFFF" opacity="0.9">${esc(subline)}</text>
</svg>`);
}

function squareSvg({ size, headline, subline }) {
  const cx = size / 2;
  return Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${OCEAN_RICH}"/>
      <stop offset="45%" stop-color="${OCEAN}"/>
      <stop offset="100%" stop-color="${OCEAN_DEEP}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="30%" cy="20%" r="50%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glowA)"/>
  <text x="${cx}" y="${Math.round(size * 0.58)}" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="38" font-weight="700" fill="#FFFFFF">${esc(headline)}</text>
  <text x="${cx}" y="${Math.round(size * 0.68)}" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="22" font-weight="400" fill="#FFFFFF" opacity="0.9">${esc(subline)}</text>
</svg>`);
}

async function composeLandscape(filename, { headline, subline, accentHeadline = false }) {
  const width = 1200;
  const height = 630;
  const logo = await sharp(LOGO)
    .resize(520, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const logoLeft = Math.round((width - (logoMeta.width || 520)) / 2);
  const logoTop = 110;

  const image = await sharp({
    create: { width, height, channels: 4, background: { r: 12, g: 74, b: 110, alpha: 1 } },
  })
    .composite([
      { input: landscapeSvg({ width, height, headline, subline, accentHeadline }), left: 0, top: 0 },
      { input: logo, left: logoLeft, top: logoTop },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(join(OUT, filename), image);
  console.log(`Wrote public/og/${filename} (${width}x${height})`);
}

async function composeSquare(filename, { headline, subline }) {
  const size = 1080;
  const logo = await sharp(LOGO)
    .resize(560, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const logoLeft = Math.round((size - (logoMeta.width || 560)) / 2);
  const logoTop = 180;

  const image = await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 12, g: 74, b: 110, alpha: 1 } },
  })
    .composite([
      { input: squareSvg({ size, headline, subline }), left: 0, top: 0 },
      { input: logo, left: logoLeft, top: logoTop },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(join(OUT, filename), image);
  console.log(`Wrote public/og/${filename} (${size}x${size})`);
}

const HOME = {
  headline: 'Import from China to Ghana without the stress',
  subline: 'Gadgets, electronics & everyday goods · Clear prices · Real updates',
};

async function main() {
  mkdirSync(OUT, { recursive: true });

  // New filename so WhatsApp/Facebook refetch past share.png
  await composeLandscape('preview.png', HOME);
  await composeLandscape('share.png', HOME);
  await composeLandscape('twitter.png', HOME);
  await composeLandscape('default.png', HOME);

  await composeLandscape('buy-rmb.png', {
    headline: 'Buy RMB with Ghana Cedis',
    subline: 'Pay suppliers in China · Clear invoice · Secure payment',
    accentHeadline: true,
  });

  await composeSquare('square.png', {
    headline: 'Import from China to Ghana',
    subline: 'Clear prices · Real updates',
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
