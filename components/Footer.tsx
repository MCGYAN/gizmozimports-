"use client";

import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import StoreLogo from '@/components/StoreLogo';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useBuyRmbStorefront } from '@/hooks/useBuyRmbStorefront';

const linkClass =
  'text-blue-100/65 transition-colors active:text-white max-lg:text-[13px] lg:hover:text-white';

const mobileHeadingClass =
  'mb-2 text-[11px] font-semibold text-brand-accent lg:mb-4 lg:text-base lg:font-bold lg:text-white';

export default function Footer() {
  const { getSetting } = useCMS();
  const { enabled: buyRmbEnabled } = useBuyRmbStorefront();

  const siteName = getSetting('site_name') || 'Gizmoz Trades';
  const siteTagline =
    getSetting('site_tagline') ||
    'Shop from China to Ghana: get your invoice, pay, and track your order. WhatsApp only when you need help.';
  const contactAddress = getSetting('contact_address') || '';
  const contactWhatsapp = getSetting('contact_whatsapp') || '';
  const socialFacebook = getSetting('social_facebook') || '';
  const socialInstagram = getSetting('social_instagram') || '';
  const socialTikTok = getSetting('social_tiktok') || '';
  const socialTwitter = getSetting('social_twitter') || '';
  const socialYoutube = getSetting('social_youtube') || '';

  const socials = [
    { link: socialInstagram, icon: <Instagram className="h-4 w-4" />, label: 'Instagram' },
    { link: socialTikTok, icon: <i className="ri-tiktok-fill text-[15px] leading-none" />, label: 'TikTok' },
    { link: socialYoutube, icon: <Youtube className="h-4 w-4" />, label: 'YouTube' },
    { link: socialTwitter, icon: <Twitter className="h-4 w-4" />, label: 'X' },
    { link: socialFacebook, icon: <Facebook className="h-4 w-4" />, label: 'Facebook' },
  ].filter((s) => s.link);

  return (
    <footer className="relative z-0 mt-8 text-white lg:mt-16">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-blue-950" aria-hidden />

      <div className="store-container pb-[calc(4.75rem+env(safe-area-inset-bottom))] pt-8 lg:pb-10 lg:pt-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Brand block */}
          <div className="flex items-start justify-between gap-4 border-b border-blue-800/50 pb-5 lg:col-span-1 lg:block lg:border-0 lg:pb-0">
            <div className="min-w-0 flex-1 space-y-3 lg:space-y-5">
              <StoreLogo size="sm" tone="dark" />
              <p className="max-w-sm text-xs leading-snug text-blue-200/60 lg:text-sm lg:leading-relaxed">
                {siteTagline}
              </p>
              {(contactWhatsapp || contactAddress) && (
                <div className="space-y-1 text-xs text-blue-200/70 lg:text-sm">
                  {contactWhatsapp ? <p>WhatsApp: {contactWhatsapp}</p> : null}
                  {contactAddress ? <p className="line-clamp-2">{contactAddress}</p> : null}
                </div>
              )}
            </div>

            {socials.length > 0 ? (
              <div className="flex shrink-0 gap-2 lg:mt-5">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/85 active:border-brand-accent active:text-brand-accent lg:h-9 lg:w-9 lg:hover:border-brand-accent lg:hover:bg-brand-accent lg:hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Links */}
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 sm:gap-x-8 lg:col-span-3 lg:mt-0 lg:gap-12 lg:border lg:border-white/10 lg:p-8">
            <div>
              <h4 className={mobileHeadingClass}>Shop</h4>
              <ul className="space-y-1.5 text-sm lg:space-y-3">
                <li><Link href="/shop" className={linkClass}>All products</Link></li>
                <li><Link href="/categories" className={linkClass}>Categories</Link></li>
                <li><Link href="/what-we-source" className={linkClass}>What we source</Link></li>
                <li><Link href="/pricing-guide" className={linkClass}>Pricing guide</Link></li>
                {buyRmbEnabled ? (
                  <li><Link href="/exchange" className={linkClass}>Buy RMB</Link></li>
                ) : null}
              </ul>
            </div>

            <div>
              <h4 className={mobileHeadingClass}>Support</h4>
              <ul className="space-y-1.5 text-sm lg:space-y-3">
                <li><Link href="/contact" className={linkClass}>Contact us</Link></li>
                <li><Link href="/order-tracking" className={linkClass}>Track my order</Link></li>
                {buyRmbEnabled ? (
                  <li><Link href="/exchange/lookup" className={linkClass}>Find RMB invoice</Link></li>
                ) : null}
                <li><Link href="/shipping" className={linkClass}>Shipping &amp; delivery</Link></li>
                <li><Link href="/returns" className={linkClass}>Returns</Link></li>
                <li><Link href="/faqs" className={linkClass}>FAQs</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className={mobileHeadingClass}>Company</h4>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-1.5 text-sm sm:block sm:space-y-3">
                <li><Link href="/about" className={linkClass}>Our story</Link></li>
                <li><Link href="/how-it-works" className={linkClass}>How it works</Link></li>
                <li><Link href="/blog" className={linkClass}>Blog</Link></li>
                <li><Link href="/privacy" className={linkClass}>Privacy policy</Link></li>
                <li><Link href="/terms" className={linkClass}>Terms of service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-1 border-t border-blue-900/50 pt-4 text-[11px] text-blue-300/50 lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-2 lg:pt-8 lg:text-xs">
          <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p className="inline-flex w-fit items-center gap-1.5 text-blue-200/60">
            Made by Clarity Labs
          </p>
          <p className="text-blue-200/50">Secure payment at checkout</p>
        </div>
      </div>
    </footer>
  );
}
