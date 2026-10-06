'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { SITE_LOGO_DARK_BG_PATH, SITE_LOGO_PATH, SITE_LOGO_SIZE } from '@/lib/brand';

/** Compact header asset (~400px WebP). Falls back to full PNG for CMS overrides. */
const HEADER_LOGO_PATH = '/images/gizmoz-trades-logo-header.webp';
const HEADER_LOGO_SIZE = { width: 400, height: 127 } as const;

interface StoreLogoProps {
  className?: string;
  priority?: boolean;
  /** Smaller logo for compact areas like the mobile footer */
  size?: 'default' | 'sm';
  /** `dark` renders the white mark for blue/dark surfaces */
  tone?: 'light' | 'dark';
}

export default function StoreLogo({ className = '', priority = false, size = 'default', tone = 'light' }: StoreLogoProps) {
  const { getSetting } = useCMS();
  const siteName = getSetting('site_name') || 'Gizmoz Trades';
  const cmsLogo = getSetting('site_logo');
  const usingDefault = !cmsLogo || cmsLogo === SITE_LOGO_PATH;
  const src =
    tone === 'dark' ? SITE_LOGO_DARK_BG_PATH : usingDefault ? HEADER_LOGO_PATH : cmsLogo;
  const dims = tone === 'light' && usingDefault ? HEADER_LOGO_SIZE : SITE_LOGO_SIZE;

  const imageSizeClass =
    size === 'sm'
      ? 'h-9 w-auto max-w-[10rem] object-contain object-left sm:h-10'
      : 'h-10 w-auto max-w-[min(52vw,12rem)] object-contain object-left sm:h-11 md:h-12';

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`} aria-label={siteName}>
      <Image
        src={src}
        alt={siteName}
        width={dims.width}
        height={dims.height}
        priority={priority}
        sizes={size === 'sm' ? '160px' : '(max-width: 640px) 160px, 200px'}
        quality={90}
        className={imageSizeClass}
      />
    </Link>
  );
}
