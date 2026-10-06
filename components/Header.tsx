'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/categories' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="glass-nav sticky top-0 z-50">
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 text-gray-900"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <i className="ri-menu-line text-2xl" />
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/gizmoz-logo.png" alt="Gizmoz Trades" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-8 rounded-full bg-white/60 border border-slate-200/70 px-5 py-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-700 hover:text-brand transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/shop" className="btn-premium hidden sm:inline-flex items-center rounded-pill bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark">
            Shop Now
          </Link>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} aria-hidden="true" />
          <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white/95 backdrop-blur-md shadow-xl flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <img src="/gizmoz-logo.png" alt="Gizmoz Trades" className="h-8 w-auto object-contain" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-600" aria-label="Close menu">
                <i className="ri-close-line text-2xl" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100">
              <Link href="/shop" className="inline-flex w-full items-center justify-center rounded-pill bg-brand px-4 py-3 text-sm font-semibold text-white">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}