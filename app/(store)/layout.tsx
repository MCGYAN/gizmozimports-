'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';
import { CMSProvider } from '@/context/CMSContext';

// Below-fold / non-critical chrome — keep Header eager for first paint
const Footer = dynamic(() => import('@/components/Footer'));
const MobileBottomNav = dynamic(() => import('@/components/MobileBottomNav'), { ssr: false });
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });
const NavigationProgress = dynamic(() => import('@/components/NavigationProgress'), {
  ssr: false,
});
const PWAInstaller = dynamic(() => import('@/components/PWAInstaller'), { ssr: false });
const OfflineIndicator = dynamic(() => import('@/components/OfflineIndicator'), { ssr: false });
const StickyConversionDock = dynamic(() => import('@/components/store/StickyConversionDock'), {
  ssr: false,
});

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CMSProvider>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      <ScrollToTop />
      <div className="min-h-screen store-site-bg">
        <PWAInstaller />
        <Header />
        <ErrorBoundary>
          <main className="pwa-page-enter pb-[max(5.25rem,env(safe-area-inset-bottom,0px)+4.5rem)] md:pb-0">
            {children}
          </main>
        </ErrorBoundary>
        <Footer />
        <MobileBottomNav />
        <StickyConversionDock />
        <OfflineIndicator />
      </div>
    </CMSProvider>
  );
}
