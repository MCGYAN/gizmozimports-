'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MiniCart from './MiniCart';
import StoreLogo from './StoreLogo';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import {
  clearAuthCookies,
  getAuthCookies,
  getRememberMePreference,
  syncAuthCookies,
} from '@/lib/auth-remember';
import AnnouncementBar from './AnnouncementBar';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const { cartCount, isCartOpen, setIsCartOpen } = useCart();

  useEffect(() => {
    const checkUser = async () => {
      let {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        const cookies = getAuthCookies();
        if (cookies) {
          const restored = await supabase.auth.setSession(cookies);
          session = restored.data.session;
        }
      }
      setUser(session?.user ?? null);
      if (session) {
        syncAuthCookies(session, getRememberMePreference());
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session) {
        syncAuthCookies(session, getRememberMePreference());
      } else if (event === 'SIGNED_OUT') {
        // Do not clear on a brief null INITIAL_SESSION (common on Safari).
        clearAuthCookies();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Categories', href: '/categories' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
  const serviceLinks = [
    { label: 'Buy RMB', shortLabel: 'RMB', href: '/exchange', primary: false },
    {
      label: 'China Warehouse',
      shortLabel: 'Warehouse',
      href: user
        ? '/account?tab=warehouse'
        : '/auth/login?next=%2Faccount%3Ftab%3Dwarehouse',
      primary: true,
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/shop?search=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  const openMobileSearch = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(true);
  };

  return (
    <>
      <AnnouncementBar />

      <header className="glass-nav sticky top-0 z-50 w-full flex flex-col font-sans pt-[env(safe-area-inset-top,0px)]">
        <div className="text-slate-900">
          <div className="store-container">
            <div className="flex min-h-[4.25rem] items-center justify-between gap-2 py-2 sm:min-h-[5rem] sm:gap-3 sm:py-0 lg:gap-4">

              <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  className="md:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center text-slate-900 active:opacity-70"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsMobileMenuOpen(true);
                  }}
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" strokeWidth={1.75} />
                </button>
                <StoreLogo priority className="group" />
              </div>

              <div className="mx-1 hidden min-w-0 flex-1 items-center justify-center gap-2 md:flex lg:mx-2 lg:gap-3 xl:mx-4 xl:gap-4">
                <div className="flex min-w-0 items-center gap-3 rounded-full border border-slate-200/70 bg-white/60 px-4 py-1.5 lg:gap-4 xl:gap-6 xl:px-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`shrink-0 whitespace-nowrap py-1 text-xs font-medium text-gray-700 transition-colors hover:text-brand lg:text-[13px] xl:text-sm ${
                        link.href === '/how-it-works' || link.href === '/about' ? 'hidden xl:inline' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="flex shrink-0 items-center gap-1.5 lg:gap-2">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`btn-premium inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-lg px-3 text-[11px] font-semibold transition lg:h-9 lg:px-4 lg:text-xs ${
                        link.primary
                          ? 'bg-brand-accent text-white hover:bg-orange-600'
                          : 'border border-brand/20 bg-white text-brand hover:bg-blue-50'
                      }`}
                    >
                      <span className="xl:hidden">{link.shortLabel}</span>
                      <span className="hidden xl:inline">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-4">
                <div className="relative hidden w-28 shrink-0 md:block lg:w-40 xl:w-52 2xl:w-64">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full rounded-full border border-slate-200 bg-white/80 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15 transition-colors lg:pl-10 lg:pr-4 lg:text-sm"
                    />
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none lg:left-3.5" strokeWidth={2} />
                  </form>
                </div>

                <button
                  type="button"
                  onClick={() => (isSearchOpen ? setIsSearchOpen(false) : openMobileSearch())}
                  className="flex h-10 w-10 shrink-0 items-center justify-center text-slate-900 active:opacity-70 md:hidden"
                  aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                  aria-expanded={isSearchOpen}
                >
                  {isSearchOpen ? (
                    <X className="w-5 h-5" strokeWidth={1.75} />
                  ) : (
                    <Search className="w-5 h-5" strokeWidth={1.75} />
                  )}
                </button>

                <Link
                  href={user ? "/account" : "/auth/login"}
                  className="hidden sm:flex shrink-0 items-center gap-2 text-slate-800 hover:text-brand transition-colors group"
                  aria-label="Account"
                >
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
                  <span className="font-medium text-sm hidden xl:inline">Account</span>
                </Link>

                <div className="relative shrink-0">
                  <button
                    type="button"
                    className="group relative flex h-10 w-10 shrink-0 items-center justify-center text-slate-800 hover:text-brand active:opacity-70 sm:w-auto sm:gap-2 sm:px-2"
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    aria-label="Cart"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
                    {cartCount > 0 && (
                      <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white shadow-sm sm:-right-1 sm:-top-1">
                        {cartCount}
                      </span>
                    )}
                    <span className="hidden font-medium text-sm xl:inline">Basket</span>
                  </button>
                  <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                </div>
              </div>
            </div>

            {isSearchOpen && (
              <div className="border-t border-slate-200/70 px-4 pb-3 pt-3 md:hidden">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="search"
                    enterKeyHint="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15"
                    autoFocus
                  />
                  <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
                </form>
              </div>
            )}
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 top-0 flex w-[88%] max-w-sm flex-col bg-white/95 shadow-xl backdrop-blur-md animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
              <StoreLogo size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center text-gray-600 active:opacity-70"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" strokeWidth={1.75} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-editorial-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mobile-editorial-nav-link ${
                    link.primary ? 'font-bold text-brand-accent' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                className="mobile-editorial-nav-link flex items-center gap-2 border-b-0 pt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 text-brand-accent" strokeWidth={1.75} />
                My account
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
