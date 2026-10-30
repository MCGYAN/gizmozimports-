import { ImageResponse } from 'next/og';
import { SEO } from '@/lib/seo';
import { SITE_LOGO_DARK_BG_PATH } from '@/lib/brand';

/** Edge avoids a Node `@vercel/og` + `fileURLToPath` bug when the project path contains spaces. */
export const runtime = 'edge';

export const alt = `${SEO.brandName}. ${SEO.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoSrc = `${SEO.siteUrl}${SITE_LOGO_DARK_BG_PATH}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background: 'linear-gradient(135deg, #0C4A6E 0%, #083A57 48%, #0A5578 100%)',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Soft Light Blue wash — brand mesh feel (Satori-safe, no filters) */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -80,
            width: 480,
            height: 480,
            borderRadius: 999,
            background: 'rgba(140, 207, 255, 0.2)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -140,
            right: -60,
            width: 420,
            height: 420,
            borderRadius: 999,
            background: 'rgba(234, 246, 255, 0.1)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={280}
            height={101}
            style={{ objectFit: 'contain' }}
            alt=""
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              width: 72,
              height: 6,
              background: '#8CCFFF',
              borderRadius: 4,
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: 960,
            }}
          >
            Buy from China the easy way
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#EAF6FF',
              maxWidth: 900,
              lineHeight: 1.35,
              opacity: 0.92,
            }}
          >
            Gadgets, electronics &amp; everyday goods · Clear prices · Real updates
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            position: 'relative',
          }}
        >
          <span style={{ color: '#8CCFFF', fontWeight: 600 }}>gizmozimports.com</span>
          <span style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>China to Ghana</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
