/**
 * Storefront & admin logos — served from `public/images/`.
 * `SITE_LOGO_PATH` — dark Gizmoz Trades mark on transparent (light header, light surfaces).
 * `SITE_LOGO_DARK_BG_PATH` — white mark on transparent (navy footer, splash, dark surfaces).
 * `SITE_LOGO_LIGHT_BG_PATH` — dark mark (light admin sidebar, login).
 * `SITE_INVOICE_LOGO_PATH` — transparent official mark for invoices.
 * `SITE_INVOICE_WATERMARK_PATH` — icon-only mark for PDF watermark layers.
 */
export const SITE_LOGO_PATH = '/images/gizmoz-trades-logo.png' as const;
export const SITE_LOGO_DARK_BG_PATH = '/images/gizmoz-trades-logo-white.png' as const;
export const SITE_LOGO_LIGHT_BG_PATH = '/images/gizmoz-trades-logo.png' as const;
export const SITE_INVOICE_LOGO_PATH = '/images/gizmoz-trades-invoice-logo.png' as const;
export const SITE_INVOICE_WATERMARK_PATH = '/images/gizmoz-trades-watermark.png' as const;
export const ADMIN_LOGO_ICON_PATH = '/images/gizmoz-trades-icon.png' as const;
export const SITE_LOGO_SIZE = { width: 798, height: 253 } as const;

/**
 * Gizmoz Trades palette — White / Light Blue / Deep Navy.
 * Light Blue is the signature accent; Navy carries type and dark surfaces.
 * Accent is light — pair with navy text on filled accent buttons (not white).
 */
export const BRAND_WHITE = '#FFFFFF';
export const BRAND_PRIMARY = '#111827'; // Deep Navy
export const BRAND_ACCENT = '#8CCFFF'; // Light Blue (signature)
export const BRAND_ICE = '#EAF6FF'; // Ice Blue sections
export const BRAND_SLATE = '#64748B'; // Supporting text / borders

export type AdminStatTone = 'primary' | 'accent';

export const ADMIN_STAT_ICON: Record<AdminStatTone, string> = {
  primary: 'bg-brand-primary/10 text-brand-primary',
  accent: 'bg-brand-accent/20 text-brand-primary',
};

export function absoluteSiteLogoUrl(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '');
  return `${base}${SITE_LOGO_LIGHT_BG_PATH}`;
}
