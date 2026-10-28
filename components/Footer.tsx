'use client';

import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import StoreLogo from '@/components/StoreLogo';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { resolveContactEmail, resolveContactWhatsApp } from '@/lib/store-config';
import { STORE_INVOICE_ISSUER } from '@/lib/bank-details';

const linkClass =
  'text-blue-100/70 transition-colors active:text-white max-lg:text-[13px] lg:hover:text-white';

const mobileHeadingClass =
  'mb-2.5 text-xs font-semibold text-blue-200/90 lg:mb-4 lg:text-sm lg:font-semibold lg:text-white';

export default function Footer() {
  const { getSetting } = useCMS();

  const siteName = getSetting('site_name') || 'Gizmoz Trades';
  const siteTagline =
    getSetting('site_tagline') ||
    'Your China sourcing partner in Ghana. We source, pay, and deliver quality products so you do not have to.';
  const contactAddress =
    getSetting('contact_address') || STORE_INVOICE_ISSUER.addressLines.slice(0, 2).join(', ');
  const contactWhatsapp = resolveContactWhatsApp(getSetting('contact_whatsapp'));
  const contactEmail = resolveContactEmail(getSetting('contact_email'));
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
    <footer className="relative z-0 border-t border-slate-900 bg-[#0f1f4b] text-white">
      <div className="store-container pb-[calc(4.75rem+env(safe-area-inset-bottom))] pt-10 lg:pb-12 lg:pt-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Brand & corridor desk */}
          <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 lg:col-span-5 lg:border-0 lg:pb-0">
            <div className="space-y-4">
              <StoreLogo size="sm" tone="dark" />
              <p className="max-w-sm text-xs leading-relaxed text-blue-100/70 lg:text-sm">
                {siteTagline}
              </p>
              <dl className="grid grid-cols-1 gap-2 border-t border-white/10 pt-4 text-xs text-blue-100/75 sm:grid-cols-2 lg:text-[13px]">
                <div>
                  <dt className="text-[11px] text-blue-200/50">WhatsApp Desk</dt>
                  <dd className="mt-0.5 font-medium text-white">{contactWhatsapp}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-blue-200/50">Email</dt>
                  <dd className="mt-0.5 truncate font-medium text-white">{contactEmail}</dd>
                </div>
                {contactAddress ? (
                  <div className="sm:col-span-2">
                    <dt className="text-[11px] text-blue-200/50">Operations</dt>
                    <dd className="mt-0.5 text-blue-100/80">{contactAddress}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            {socials.length > 0 ? (
              <div className="flex shrink-0 gap-2 pt-1">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-white/80 transition-colors hover:border-brand-accent hover:bg-brand-accent hover:text-white lg:h-9 lg:w-9"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Links */}
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 sm:gap-x-8 lg:col-span-7 lg:mt-0 lg:border-l lg:border-white/10 lg:pl-12">
            <div>
              <h4 className={mobileHeadingClass}>Shop &amp; Source</h4>
              <ul className="space-y-2 text-sm lg:space-y-2.5">
                <li><Link href="/shop" className={linkClass}>All products</Link></li>
                <li><Link href="/categories" className={linkClass}>Categories</Link></li>
                <li><Link href="/what-we-source" className={linkClass}>What we source</Link></li>
                <li><Link href="/pricing-guide" className={linkClass}>Pricing guide</Link></li>
                <li><Link href="/exchange" className={linkClass}>Buy RMB</Link></li>
              </ul>
            </div>

            <div>
              <h4 className={mobileHeadingClass}>Operations &amp; Support</h4>
              <ul className="space-y-2 text-sm lg:space-y-2.5">
                <li><Link href="/order-tracking" className={linkClass}>Track my order</Link></li>
                <li><Link href="/exchange/lookup" className={linkClass}>Find RMB invoice</Link></li>
                <li><Link href="/shipping" className={linkClass}>Shipping &amp; delivery</Link></li>
                <li><Link href="/contact" className={linkClass}>Contact us</Link></li>
                <li><Link href="/returns" className={linkClass}>Returns</Link></li>
                <li><Link href="/faqs" className={linkClass}>FAQs</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className={mobileHeadingClass}>Company</h4>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm sm:block sm:space-y-2.5">
                <li><Link href="/about" className={linkClass}>Our story</Link></li>
                <li><Link href="/how-it-works" className={linkClass}>How it works</Link></li>
                <li><Link href="/blog" className={linkClass}>Blog</Link></li>
                <li><Link href="/privacy" className={linkClass}>Privacy policy</Link></li>
                <li><Link href="/terms" className={linkClass}>Terms of service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1.5 border-t border-white/10 pt-5 text-[11px] text-blue-200/55 lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:pt-6 lg:text-xs">
          <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p className="text-blue-100/70">Made by Clarity Labs</p>
          <p className="text-blue-200/55">China → Tema / Accra · MoMo &amp; GCB Bank</p>
        </div>
      </div>
    </footer>
  );
}
