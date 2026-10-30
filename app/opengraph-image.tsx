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
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0E5A86 0%, #0C4A6E 42%, #083A57 100%)',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          padding: '48px 64px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -40,
            width: 460,
            height: 460,
            borderRadius: 999,
            background: 'rgba(140, 207, 255, 0.18)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={420}
            height={151}
            style={{ objectFit: 'contain' }}
            alt=""
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 42,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                textAlign: 'center',
                maxWidth: 980,
              }}
            >
              Import from China to Ghana without the stress
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                maxWidth: 920,
                lineHeight: 1.35,
              }}
            >
              Gadgets, electronics &amp; everyday goods · Clear prices · Real updates
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
