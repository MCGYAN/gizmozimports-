import { ImageResponse } from 'next/og';
import { SEO } from '@/lib/seo';
import { SITE_LOGO_DARK_BG_PATH } from '@/lib/brand';

/** Edge avoids a Node `@vercel/og` + `fileURLToPath` bug when the project path contains spaces. */
export const runtime = 'edge';

export const alt = `${SEO.brandName}. ${SEO.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Flyer-style share card — logo on top, brand copy below. Not the site hero. */
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
          background: 'linear-gradient(135deg, #0E5A86 0%, #0C4A6E 45%, #083A57 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '48px 56px 32px',
            position: 'relative',
          }}
        >
          {/* Inset frame */}
          <div
            style={{
              position: 'absolute',
              top: 28,
              left: 28,
              right: 28,
              bottom: 28,
              border: '2px solid rgba(140, 207, 255, 0.35)',
              borderRadius: 8,
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={400}
            height={144}
            style={{ objectFit: 'contain', marginTop: 12 }}
            alt=""
          />

          <div
            style={{
              display: 'flex',
              width: 80,
              height: 4,
              background: '#8CCFFF',
              borderRadius: 2,
              marginTop: 28,
              marginBottom: 28,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Shop from China.
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              We deliver in Ghana.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 22,
              fontSize: 22,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
            }}
          >
            Phones, gadgets &amp; everyday items · Clear price · Easy pay
          </div>
        </div>

        {/* Light Blue footer band */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 78,
            background: '#8CCFFF',
            color: '#0C4A6E',
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          gizmozimports.com
        </div>
      </div>
    ),
    { ...size },
  );
}
