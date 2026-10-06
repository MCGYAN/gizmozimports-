'use client';

import { leadConfig } from '@/lib/leadConfig';

export default function WhatsAppButton() {
  return (
    <a
      href={leadConfig.whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-24 z-40 lg:bottom-6 inline-flex items-center gap-2 rounded-full bg-brand-accent px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-orange-600"
    >
      <i className="ri-whatsapp-line text-lg" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
