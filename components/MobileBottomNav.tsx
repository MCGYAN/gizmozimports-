'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { leadConfig } from '@/lib/leadConfig';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isStandalone, setIsStandalone] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  useEffect(() => {
    // Detect standalone PWA mode
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any).standalone === true;
    setIsStandalone(standalone);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide on scroll down, show on scroll up (only when scrolled far enough)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    {
      href: '/',
      label: 'Home',
      iconActive: 'ri-home-5-fill',
      iconInactive: 'ri-home-5-line',
    },
    {
      href: '/what-we-source',
      label: 'Categories',
      iconActive: 'ri-layout-grid-fill',
      iconInactive: 'ri-layout-grid-line',
    },
    {
      href: leadConfig.whatsappUrl(),
      label: 'WhatsApp',
      iconActive: 'ri-whatsapp-fill',
      iconInactive: 'ri-whatsapp-line',
      highlighted: true,
      external: true,
    },
    {
      href: leadConfig.telUrl(leadConfig.ghanaPhone),
      label: 'Call',
      iconActive: 'ri-phone-fill',
      iconInactive: 'ri-phone-line',
      external: true,
    },
    {
      href: '/account',
      label: 'Account',
      iconActive: 'ri-user-3-fill',
      iconInactive: 'ri-user-3-line',
    },
  ];

  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Mobile navigation"
    >
      {/* Frosted glass background */}
      <div className="relative">
        {/* Top shadow gradient */}
        <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
        
        <div className="bg-white/90 backdrop-blur-xl border-t border-gray-200/60 shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
          <div className={`grid grid-cols-5 ${isStandalone ? 'pb-6' : 'pb-1'} pt-1`}>
            {navItems.map((item) => {
              const active = item.external ? false : isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={`flex flex-col items-center justify-center py-2 transition-all duration-200 relative group active:scale-90 ${
                    item.highlighted
                      ? 'text-white'
                      : active
                        ? 'text-blue-700'
                        : 'text-gray-400'
                  }`}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  {/* Active indicator pill */}
                  {active && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full transition-all duration-300" />
                  )}
                  
                  <div
                    className={`relative w-8 h-8 flex items-center justify-center rounded-full ${
                      item.highlighted ? 'bg-brand-accent shadow-md' : ''
                    }`}
                  >
                    <i
                      className={`${active ? item.iconActive : item.iconInactive} text-[22px] transition-all duration-200 ${
                        active ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                  </div>
                  
                  <span className={`text-[10px] font-semibold mt-0.5 transition-all duration-200 ${
                    item.highlighted ? 'opacity-100 text-brand-accent' : active ? 'opacity-100' : 'opacity-70'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
