'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { hasAnalyticsConsent, readCookieConsent } from '@/lib/cookie-consent';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Loads Google Analytics only after the visitor accepts optional cookies. */
export default function AnalyticsLoader() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(hasAnalyticsConsent());
    sync();
    window.addEventListener('gizmoz-cookie-consent', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('gizmoz-cookie-consent', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  if (!GA_MEASUREMENT_ID || !allowed) return null;

  // Re-read so Strict Mode remounts stay correct
  if (readCookieConsent() !== 'accepted') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}
