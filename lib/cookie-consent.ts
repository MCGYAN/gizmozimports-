/** Soft cookie preference for analytics (Google Analytics). */

export const COOKIE_CONSENT_KEY = 'gizmoz-cookie-consent';

export type CookieConsentValue = 'accepted' | 'essential';

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === 'accepted' || value === 'essential') return value;
  } catch {
    /* private mode */
  }
  return null;
}

export function writeCookieConsent(value: CookieConsentValue) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* private mode */
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gizmoz-cookie-consent', { detail: value }));
  }
}

export function hasAnalyticsConsent(): boolean {
  return readCookieConsent() === 'accepted';
}
