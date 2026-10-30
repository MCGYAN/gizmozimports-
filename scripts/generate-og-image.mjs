/**
 * Branded flyer-style Open Graph cards (Soft Ocean / Light Blue / White).
 * Layout: logo on top → rule → headline → support → ice footer.
 * Not the site hero. Run: node scripts/generate-og-image.mjs
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

function flyerSvg({
  width,
  height,
  line1,
  line2,
  subline,
  footer = 'gizmozimports.com',
  accentHeadline = false,
}) {
  const cx = width / 2;
  const footerH = 78;
  const bodyH = height - footerH;
  const ruleY = Math.round(bodyH * 0.42);
  const h1Y = Math.round(bodyH * 0.55);
  const h2Y = Math.round(bodyH * 0.66);
  const subY = Math.round(bodyH * 0.78);
  const headlineFill = accentHeadline ? ACCENT : '#FFFFFF';

  return Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${OCEAN_RICH}"/>
      <stop offset="45%" stop-color="${OCEAN}"/>
      <stop offset="100%" stop-color="${OCEAN_DEEP}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="18%" r="55%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Flyer body -->
  <rect width="100%" height="${bodyH}" fill="url(#bg)"/>
  <rect width="100%" height="${bodyH}" fill="url(#glow)"/>

  <!-- Inset frame -->
  <rect x="28" y="28" width="${width - 56}" height="${bodyH - 56}" fill="none" stroke="${ACCENT}" stroke-opacity="0.35" stroke-width="2" rx="8"/>

  <!-- Accent rule under logo area -->
  <rect x="${cx - 40}" y="${ruleY}" width="80" height="4" rx="2" fill="${ACCENT}"/>

  <!-- Headline -->
  <text x="${cx}" y="${h1Y}" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="48" font-weight="700" fill="${headlineFill}" letter-spacing="-0.8">${esc(line1)}</text>
  <text x="${cx}" y="${h2Y}" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="48" font-weight="700" fill="${headlineFill}" letter-spacing="-0.8">${esc(line2)}</text>

  <!-- Support -->
  <text x="${cx}" y="${subY}" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="22" font-weight="400" fill="#FFFFFF" opacity="0.9">${esc(subline)}</text>

  <!-- Ice footer band -->
  <rect y="${bodyH}" width="${width}" height="${footerH}" fill="${ACCENT}"/>
  <text x="${cx}" y="${bodyH + 48}" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="${OCEAN}">${esc(footer)}</text>
</svg>`);
}

async function composeFlyer(filename, opts) {
  const width = 1200;
  const height = 630;
  const logo = await sharp(LOGO)
    .resize(440, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const logoLeft = Math.round((width - (logoMeta.width || 440)) / 2);
  const logoTop = 56;

  const image = await sharp({
    create: { width, height, channels: 4, background: { r: 12, g: 74, b: 110, alpha: 1 } },
  })
    .composite([
      { input: flyerSvg({ width, height, ...opts }), left: 0, top: 0 },
      { input: logo, left: logoLeft, top: logoTop },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(join(OUT, filename), image);
  console.log(`Wrote public/og/${filename}`);
}

async function composeSquare(filename, opts) {
  const size = 1080;
  const logo = await sharp(LOGO)
    .resize(480, 170, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const logoLeft = Math.round((size - (logoMeta.width || 480)) / 2);

  const image = await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 12, g: 74, b: 110, alpha: 1 } },
  })
    .composite([
      { input: flyerSvg({ width: size, height: size, ...opts }), left: 0, top: 0 },
      { input: logo, left: logoLeft, top: 80 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(join(OUT, filename), image);
  console.log(`Wrote public/og/${filename}`);
}

const HOME = {
  line1: 'Shop from China.',
  line2: 'We deliver in Ghana.',
  subline: 'Phones, gadgets & everyday items · Clear price · Easy pay',
};

async function main() {
  mkdirSync(OUT, { recursive: true });

  await composeFlyer('flyer.png', HOME);
  await composeFlyer('preview.png', HOME);
  await composeFlyer('share.png', HOME);
  await composeFlyer('twitter.png', HOME);
  await composeFlyer('default.png', HOME);

  await composeFlyer('buy-rmb.png', {
    line1: 'Buy RMB',
    line2: 'with Ghana Cedis',
    subline: 'Pay China suppliers · Clear invoice · Secure payment',
    accentHeadline: true,
  });

  await composeSquare('square.png', HOME);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
