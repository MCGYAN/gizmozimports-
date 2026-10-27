'use client';

import { useCMS } from '@/context/CMSContext';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppHref, resolveContactWhatsApp } from '@/lib/store-config';
import { cn } from '@/lib/cn';

export default function StickyConversionDock() {
  const { getSetting } = useCMS();
  const waHref = buildWhatsAppHref(resolveContactWhatsApp(getSetting('contact_whatsapp')));

  if (!waHref) return null;

  return (
    <div
      className={cn(
        'fixed right-3 z-[45] hidden flex-col gap-3 sm:right-5 md:flex',
        'bottom-[max(1.25rem,env(safe-area-inset-bottom,0px)+0.5rem)] md:bottom-8',
      )}
      aria-label="Quick contact"
    >
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 transition-transform hover:scale-105 active:scale-95"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" strokeWidth={2} />
      </a>
    </div>
  );
}
