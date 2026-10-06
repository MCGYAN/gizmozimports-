"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useCMS } from '@/context/CMSContext';

function FooterSection({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-blue-800/50 lg:border-none last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left lg:py-0 lg:cursor-default lg:mb-6"
      >
        <h4 className="font-bold text-lg text-white">{title}</h4>
        <i className={`ri-arrow-down-s-line text-blue-400 text-xl transition-transform duration-300 lg:hidden ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0 lg:max-h-full lg:overflow-visible'}`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const { getSetting } = useCMS();

  const siteName = getSetting('site_name') || 'Gizmoz Trades';
  const contactPhone = getSetting('contact_phone') || '+233209597443';

  return (
    <footer className="relative mt-12 z-0">

      {/* Footer Background Shape */}
      <div className="absolute inset-0 bg-blue-950 rounded-t-[3rem] -z-10 overflow-hidden">
        {/* Decorative elements inside footer bg */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-800 to-transparent opacity-30"></div>
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl" />
      </div>

      <div className="text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Brand Column */}
            <div className="lg:col-span-1 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3">
                <img src="/gizmoz-logo.png" alt={siteName} className="h-12 w-auto object-contain" />
              </Link>
              <p className="text-blue-200/60 leading-relaxed text-sm">
                A simple online store experience for everyday shopping.
              </p>

              <div className="pt-2 text-sm text-blue-200/70">
                <p>Contact: {contactPhone}</p>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-8 lg:gap-12 pl-0 lg:pl-12 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">

              <div className="space-y-6">
                <h4 className="font-serif text-xl font-bold text-white">Shop</h4>
                <ul className="space-y-3 text-blue-100/60 text-sm">
                  <li><Link href="/shop" className="hover:text-blue-300 transition-colors">All Products</Link></li>
                  <li><Link href="/categories" className="hover:text-blue-300 transition-colors">Collections</Link></li>
                  <li><Link href="/shop?sort=newest" className="hover:text-blue-300 transition-colors">New Arrivals</Link></li>
                  <li><Link href="/shop?sort=bestsellers" className="hover:text-blue-300 transition-colors">Best Sellers</Link></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="font-serif text-xl font-bold text-white">Support</h4>
                <ul className="space-y-3 text-blue-100/60 text-sm">
                  <li><Link href="/contact" className="hover:text-blue-300 transition-colors">Contact Us</Link></li>
                  <li><Link href="/shipping" className="hover:text-blue-300 transition-colors">Shipping & Delivery</Link></li>
                  <li><Link href="/terms" className="hover:text-blue-300 transition-colors">Terms of Service</Link></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="font-serif text-xl font-bold text-white">Company</h4>
                <ul className="space-y-3 text-blue-100/60 text-sm">
                  <li><Link href="/about" className="hover:text-blue-300 transition-colors">Our Story</Link></li>
                  <li><Link href="/privacy" className="hover:text-blue-300 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-blue-300 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/admin" className="hover:text-blue-300 transition-colors">Admin Access</Link></li>
                </ul>
              </div>

            </div>
          </div>

          <div className="border-t border-blue-900/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-500/40">
            <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
            <div className="flex gap-4 opacity-40">
              <i className="ri-visa-line text-2xl"></i>
              <i className="ri-mastercard-line text-2xl"></i>
              <i className="ri-paypal-line text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
