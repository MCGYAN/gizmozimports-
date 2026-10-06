/**
 * Central SEO config for Gizmoz Trades.
 * Brand SEO always wins over CMS display settings.
 * Override URL/name only via NEXT_PUBLIC_APP_URL and NEXT_PUBLIC_SITE_NAME.
 */

import { STORE_SEO_KEYWORDS } from './store-config';
import { absoluteSiteLogoUrl, SITE_LOGO_LIGHT_BG_PATH } from './brand';

/** Valid absolute URL for metadataBase / sitemap. */
function resolveSiteUrl(raw: string | undefined): string {
  const fallback = 'https://www.gizmoztrades.com';
  const trimmed = raw?.trim();
  if (!trimmed) return fallback;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withProtocol);
    if (/localhost|127\.0\.0\.1/i.test(u.hostname)) return fallback;
    return u.origin;
  } catch {
    return fallback;
  }
}

const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_APP_URL);
const SITE_NAME = (process.env.NEXT_PUBLIC_SITE_NAME || 'Gizmoz Trades').trim() || 'Gizmoz Trades';

const TAGLINE = 'Import from China to Ghana without the stress';
const TAGLINE_LONG =
  'Gizmoz Trades helps you source gadgets, electronics, appliances, and everyday goods from China to Ghana. Clear prices, real updates, WhatsApp support, and Buy RMB for China payments.';

const DEFAULT_DESCRIPTION =
  'Import gadgets, electronics, appliances, and everyday goods from China to Ghana with Gizmoz Trades. Clear pricing, order tracking, shipping support, and Buy RMB with Ghana Cedis.';

export const SEO = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  siteNameFull: SITE_NAME,
  /** Always use legal/brand name in schema even if env is short. */
  brandName: 'Gizmoz Trades',
  tagline: TAGLINE,
  taglineLong: TAGLINE_LONG,

  defaultTitle: `${SITE_NAME} | China to Ghana Imports`,
  defaultDescription: DEFAULT_DESCRIPTION,

  keywords: [
    ...STORE_SEO_KEYWORDS,
    SITE_NAME,
    'Gizmoz Trades',
    'Gizmoz Trades',
    'Buy RMB Ghana',
    'RMB exchange Ghana',
    'import from China to Ghana',
    'Ghana China importer',
    'China sourcing Ghana',
  ],

  /** Facts AI systems and crawlers should trust (also mirrored in /llms.txt). */
  aiSummary: {
    whatWeAre:
      'Gizmoz Trades is a China-to-Ghana import and ecommerce company that helps customers buy gadgets, electronics, appliances, furniture, and bulk goods from China with clear prices and shipment updates.',
    services: [
      'Product sourcing and importing from China to Ghana (gadgets, electronics, appliances, furniture, fashion, tools, bulk goods)',
      'Online storefront with checkout and order tracking',
      'Buy RMB: pay Ghana Cedis and receive RMB for paying Chinese suppliers',
      'WhatsApp and phone customer support for quotes and order help',
    ],
    whoFor:
      'People and businesses in Ghana who want to import from China without dealing with unreliable sellers alone.',
    locations: 'Serves customers across Ghana. Imports move from China into Ghana for clearing, pickup, or delivery.',
    differentiators: [
      'Clear pricing before you pay',
      'Real status updates on your import journey',
      'Human support on WhatsApp and phone',
      'Official-style Buy RMB desk with invoice for China payments',
    ],
  },

  defaultOgImagePath: `${SITE_URL}/og/default.png`,
  ogImages: {
    default: '/og/default.png',
    twitter: '/og/twitter.png',
    square: '/og/square.png',
    buyRmb: '/og/buy-rmb.png',
    dynamic: '/opengraph-image',
  },
  logoUrl: absoluteSiteLogoUrl(SITE_URL),
  logoLightBgPath: SITE_LOGO_LIGHT_BG_PATH,

  locale: 'en_GH',
  language: 'en',

  contact: {
    phone: '0209597443',
    whatsapp: '0209597443',
    email: 'support@gizmoztrades.com',
    country: 'GH',
    areaServed: 'Ghana',
  },

  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || '',
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || '',
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || '',
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || '',
    tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || '',
  },

  /** Per-page meta (override CMS; use with pageMetadata()). */
  pages: {
    home: {
      title: 'China to Ghana Imports',
      description: DEFAULT_DESCRIPTION,
    },
    shop: {
      title: 'Shop imports from China',
      description:
        'Browse gadgets, electronics, appliances, and everyday goods ready to import from China to Ghana. Filter by category and price with Gizmoz Trades.',
    },
    categories: {
      title: 'Shop by category',
      description:
        'Browse import categories for China to Ghana. Electronics, appliances, furniture, fashion, and more from Gizmoz Trades.',
    },
    about: {
      title: 'About Gizmoz Trades',
      description:
        'We sit between you and China. Gizmoz Trades helps Ghanaian buyers import with clear prices, real updates, and people you can talk to.',
    },
    contact: {
      title: 'Contact us',
      description:
        'Talk to Gizmoz Trades about quotes, orders, shipping, or Buy RMB. WhatsApp, phone, or the contact form. Real people in Ghana.',
    },
    exchange: {
      title: 'Buy RMB with Ghana Cedis',
      description:
        'Pay Ghana Cedis and get RMB for China suppliers with Gizmoz Trades. Lock today’s official buy rate, get an invoice, and pay securely.',
    },
    blog: {
      title: 'Import tips and updates',
      description:
        'Practical tips for importing from China to Ghana. Shipping, sourcing, payments, and updates from Gizmoz Trades.',
    },
    faqs: {
      title: 'Frequently asked questions',
      description:
        'Answers about orders, payments, shipping from China to Ghana, delivery, accounts, and Buy RMB at Gizmoz Trades.',
    },
    help: {
      title: 'Help center',
      description:
        'Get help with orders, tracking, payments, and imports from China to Ghana. Gizmoz Trades support guides.',
    },
    privacy: {
      title: 'Privacy policy',
      description: `How ${SITE_NAME} collects, uses, and protects your personal information.`,
    },
    terms: {
      title: 'Terms of service',
      description: `Terms and conditions for using ${SITE_NAME} and our import services.`,
    },
    shipping: {
      title: 'Shipping and delivery',
      description:
        'How your import moves from China to Ghana. Clearing, ready for pickup or delivery, and status updates you can follow.',
    },
    returns: {
      title: 'Returns and refunds',
      description: `Returns and refund policy for ${SITE_NAME} orders and imports.`,
    },
    'order-tracking': {
      title: 'Track your order',
      description:
        'Track your Gizmoz Trades order from payment through shipping to Ghana and delivery.',
    },
    cart: {
      title: 'Shopping cart',
      description: 'Your Gizmoz Trades shopping cart.',
    },
    wishlist: {
      title: 'Wishlist',
      description: 'Your saved products on Gizmoz Trades.',
    },
    account: {
      title: 'My account',
      description: 'Manage your Gizmoz Trades account, orders, and profile.',
    },
  } as Record<string, { title: string; description: string }>,
};

export type SEOConfig = typeof SEO;
export type SEOPageKey = keyof typeof SEO.pages;
