/**
 * Central SEO config for Gizmoz Trades.
 * Brand SEO always wins over CMS display settings.
 * Override URL/name only via NEXT_PUBLIC_APP_URL and NEXT_PUBLIC_SITE_NAME.
 */

import { STORE_SEO_KEYWORDS } from './store-config';
import { absoluteSiteLogoUrl, SITE_LOGO_LIGHT_BG_PATH } from './brand';

/** Valid absolute URL for metadataBase / sitemap. */
function resolveSiteUrl(raw: string | undefined): string {
  const fallback = 'https://www.gizmozimports.com';
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

const TAGLINE = 'China goods for Ghana — clear price, real tracking';
const TAGLINE_LONG =
  'Gizmoz Trades is the simple way to buy goods from China for Ghana. See the price, get a clear bill, pay by MoMo or bank, and track your order to Ghana. WhatsApp help when you need it, plus Buy RMB for China payments.';

const DEFAULT_DESCRIPTION =
  'Buy gadgets, phones, home items, and more from China for Ghana with Gizmoz Trades. Clear prices, easy pay, order tracking, and Buy RMB with Ghana Cedis.';

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
      'Gizmoz Trades is an online store that helps people in Ghana buy goods from China. You shop, get a clear bill, pay, and track the order to Ghana.',
    services: [
      'Shop China goods for Ghana (phones, gadgets, home items, tools, and more)',
      'Online checkout with a clear invoice and order tracking',
      'Buy RMB: pay Ghana Cedis and get RMB to pay China suppliers',
      'WhatsApp and phone help when you need it',
    ],
    whoFor:
      'People and shops in Ghana who want China goods with a clear price and real updates.',
    locations: 'Serves customers across Ghana. Goods move from China into Ghana for clearing, pickup, or delivery.',
    differentiators: [
      'Clear price before you pay',
      'Real status updates from China to Ghana',
      'Help on WhatsApp and phone',
      'Buy RMB with a clear invoice for China payments',
    ],
  },

  /** `/og/share.png` — Soft Ocean card; new filename so WhatsApp/Facebook re-fetch. */
  defaultOgImagePath: `${SITE_URL}/og/share.png`,
  ogImages: {
    default: '/og/share.png',
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
    phone: '0540237911',
    whatsapp: '0540237911',
    email: 'gizmozexports@gmail.com',
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
      title: 'China goods for Ghana',
      description: DEFAULT_DESCRIPTION,
    },
    shop: {
      title: 'Shop clear China prices',
      description:
        'Clear prices. Real China goods. Order online, pay a clear bill, and track it from China to Ghana with Gizmoz Trades.',
    },
    categories: {
      title: 'Shop by type',
      description:
        'Pick a product group — phones, home items, tools, and more — then shop from China with Gizmoz Trades.',
    },
    about: {
      title: 'About Gizmoz Trades',
      description:
        'Gizmoz Trades helps Ghana buy from China. Clear prices, easy pay, real tracking, and people you can talk to.',
    },
    contact: {
      title: 'Contact us',
      description:
        'Ask Gizmoz Trades about an order, a product, shipping, or Buy RMB. WhatsApp, phone, or the form. Real people in Ghana.',
    },
    exchange: {
      title: 'Buy RMB with Ghana Cedis',
      description:
        'Pay Ghana Cedis and get RMB for China suppliers with Gizmoz Trades. Lock today’s buy rate, get a bill, and pay safely.',
    },
    blog: {
      title: 'Tips and updates',
      description:
        'Simple tips for buying from China to Ghana. Shipping, payments, and updates from Gizmoz Trades.',
    },
    faqs: {
      title: 'Common questions',
      description:
        'Answers about orders, payments, shipping from China to Ghana, delivery, accounts, and Buy RMB at Gizmoz Trades.',
    },
    help: {
      title: 'Help center',
      description:
        'Get help with orders, tracking, payments, and buying from China to Ghana. Gizmoz Trades guides.',
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
        'How your order moves from China to Ghana. Clearing, pickup or delivery, and status you can follow.',
    },
    returns: {
      title: 'Returns and refunds',
      description: `How returns and refunds work for ${SITE_NAME} orders.`,
    },
    'order-tracking': {
      title: 'Track your order',
      description:
        'Track your Gizmoz Trades order from payment, through shipping, to Ghana.',
    },
    cart: {
      title: 'Your basket',
      description: 'Your Gizmoz Trades basket.',
    },
    wishlist: {
      title: 'Saved items',
      description: 'Products you saved on Gizmoz Trades.',
    },
    account: {
      title: 'My account',
      description: 'Your Gizmoz Trades account, orders, and profile.',
    },
  } as Record<string, { title: string; description: string }>,
};

export type SEOConfig = typeof SEO;
export type SEOPageKey = keyof typeof SEO.pages;
