'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  COOKIE_CONSENT_KEY,
  type CookieConsentValue,
  writeCookieConsent,
} from '@/lib/cookie-consent';

/**
 * Soft bottom strip — does not block taps on the page.
 * Sits above the mobile bottom nav. Choice remembered in localStorage.
 */
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored !== 'accepted' && stored !== 'essential') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: CookieConsentValue) => {
    writeCookieConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="pointer-events-none fixed inset-x-0 bottom-[max(4.75rem,calc(3.75rem+env(safe-area-inset-bottom)))] z-[45] px-3 md:bottom-5 md:px-6"
    >
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-[0_8px_30px_-12px_rgba(12,74,110,0.28)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:p-4">
        <p className="min-w-0 flex-1 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
          We use essential cookies to run the shop. Optional analytics help us improve the site.{' '}
          <Link
            href="/privacy#cookies"
            className="font-semibold text-brand-primary underline-offset-2 hover:underline"
          >
            Privacy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="btn-interactive inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-brand-primary sm:flex-none sm:px-4 sm:text-sm"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="btn-interactive inline-flex min-h-10 flex-1 items-center justify-center rounded-xl bg-brand-accent px-3.5 text-xs font-semibold text-brand-primary sm:flex-none sm:px-4 sm:text-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
