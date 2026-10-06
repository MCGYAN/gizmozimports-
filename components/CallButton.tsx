'use client';

import { leadConfig } from '@/lib/leadConfig';

export default function CallButton() {
  return (
    <a
      href={leadConfig.telUrl(leadConfig.ghanaPhone)}
      aria-label="Call Gizmoz Trades"
      className="fixed left-4 bottom-24 z-40 lg:bottom-6 inline-flex items-center gap-2 rounded-full bg-brand text-white px-4 py-3 text-sm font-semibold shadow-lg transition hover:scale-[1.02] hover:bg-brand-dark"
    >
      <i className="ri-phone-line text-lg" />
      <span className="hidden sm:inline">Call Now</span>
    </a>
  );
}
