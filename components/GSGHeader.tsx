'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MiniCart from './MiniCart';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';

const MAIN_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Pick-Up', href: '/shipping#pickup' },
  { label: 'Free Delivery', href: '/shipping#free-delivery' },
  { label: 'Sole Express', href: '/shipping#sole-express' },
  { label: 'Joint Express', href: '/shipping#joint-express' },
];

const CHIP_NAV = [
  { label: 'Convenience Goods', href: '/shop', active: true },
  { label: 'My Personal Shopper', href: 'https://shopper.gsgbrands.com.gh', external: true },
  { label: 'Food Items', href: '/shop?category=food-items' },
  { label: 'Nonfood Items', href: '/shop?category=nonfood' },
  { label: 'Personal & Household Care', href: '/shop?category=personal-household-care' },
  { label: 'Occasions & Holidays', href: '/shop?category=occasions-holidays' },
  { label: 'Gift Card', href: '/gift-card' },
  { label: 'More', href: '/categories' },
];

export default function GSGHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileChipsOpen, setMobileChipsOpen] = useState(false);
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top header – purple, larger */}
      <header className="bg-gsg-purple text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="py-3 md:py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center justify-between">
                <a
                  href="https://gsgbrands.com.gh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/95 hover:text-white font-medium text-sm md:text-base"
                >
                  GSG Brands MainHome
                </a>
                <button
                  type="button"
                  className="lg:hidden p-2 -mr-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <i className="ri-menu-line text-2xl" />
                </button>
              </div>

              <nav
                className={`${mobileMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8`}
                aria-label="Main navigation"
              >
                {MAIN_NAV.map((item) => (
                  item.href.startsWith('http') ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/95 hover:text-white font-medium text-sm"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-white/95 hover:text-white font-medium text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </nav>

              <div className="flex items-center gap-3 lg:gap-4 order-first lg:order-none lg:w-[420px] lg:shrink-0">
                <form onSubmit={handleSearch} className="flex-1 min-w-0">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find anything you need here…"
                    className="w-full px-4 py-2.5 rounded-full bg-white text-gsg-black placeholder:text-gsg-purple-light/80 text-sm border-0 focus:ring-2 focus:ring-gsg-accent"
                  />
                </form>
                <Link
                  href={user ? '/account' : '/auth/login'}
                  className="text-white/95 hover:text-white font-medium text-sm whitespace-nowrap"
                >
                  Your Account
                </Link>
                <Link
                  href="/referral-rewards"
                  className="text-white/95 hover:text-white font-medium text-sm whitespace-nowrap hidden sm:inline"
                >
                  Referral Rewards
                </Link>
                <button
                  type="button"
                  className="relative p-2 text-white hover:opacity-90"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  aria-label="My Basket"
                >
                  <i className="ri-shopping-basket-line text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-5 min-w-[1.25rem] px-1 flex items-center justify-center rounded-full bg-white text-gsg-purple text-xs font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary bar – light purple, chips */}
        <div className="bg-gsg-purple-light/30 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              <button
                type="button"
                className="lg:hidden shrink-0 px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm font-bold"
                onClick={() => setMobileChipsOpen(!mobileChipsOpen)}
                aria-label="Toggle categories"
              >
                {mobileChipsOpen ? 'Hide' : 'Goods'}
              </button>
              <div className={`flex gap-2 overflow-x-auto scrollbar-hide ${mobileChipsOpen ? 'flex' : 'hidden'} lg:flex lg:flex-wrap`}>
                {CHIP_NAV.map((item) => {
                  const isActive = item.active;
                  const isExternal = item.external;
                  const chip = (
                    <span
                      className={`
                        shrink-0 px-4 py-2 rounded-card bg-white text-gsg-black font-bold text-sm
                        ${isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-gsg-purple' : 'text-black/70'}
                      `}
                    >
                      {item.label}
                    </span>
                  );
                  return isExternal ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity"
                    >
                      {chip}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="hover:opacity-90 transition-opacity"
                      onClick={() => setMobileChipsOpen(false)}
                    >
                      {chip}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
