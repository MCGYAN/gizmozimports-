'use client';

import Link from 'next/link';

const SUPPORT_PHONES = ['+233 54 023 7911'];
const TELEGRAM = 'https://gizmoztrades.com';
const SOCIAL_HANDLE = '@example';

export default function StoreFooter() {
  return (
    <footer className="bg-brand-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <h3 className="font-bold text-lg mb-4">Gizmoz Trades</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Trusted convenience shopping with curated everyday essentials. Ghana-based, modern e-commerce.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="https://gizmoztrades.com" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">
                Main Site
              </a>
              <a href="https://gizmoztrades.com" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">
                Personal Shopper
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <p className="text-white/80 text-sm mb-2">Need help? WhatsApp & Telegram Active 24/7</p>
            <ul className="space-y-1 text-sm text-white/70">
              {SUPPORT_PHONES.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white">
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Telegram: {TELEGRAM}
                </a>
              </li>
              <li>Social: {SOCIAL_HANDLE}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/order-tracking" className="hover:text-white">Track Order</Link></li>
              <li><Link href="/account" className="hover:text-white">Your Account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">General Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Gizmoz Trades. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
