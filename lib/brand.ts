/**
 * Storefront & admin logos — served from `public/images/`.
 * `SITE_LOGO_PATH` — dark Gizmoz Trades mark on transparent (light header, light surfaces).
 * `SITE_LOGO_DARK_BG_PATH` — white mark on transparent (blue footer, splash, dark surfaces).
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

/** Chart & UI accents — keep admin visuals on-brand */
export const BRAND_PRIMARY = '#1E3A8A';
export const BRAND_ACCENT = '#F97316';

export type AdminStatTone = 'primary' | 'accent';

export const ADMIN_STAT_ICON: Record<AdminStatTone, string> = {
  primary: 'bg-brand-primary/10 text-brand-primary',
  accent: 'bg-brand-accent/10 text-brand-accent',
};

export function absoluteSiteLogoUrl(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '');
  return `${base}${SITE_LOGO_LIGHT_BG_PATH}`;
}
