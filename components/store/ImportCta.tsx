'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

interface ImportCtaProps {
  whatsAppHref?: string;
}

export default function ImportCta({ whatsAppHref }: ImportCtaProps) {
  return (
    <section className="border-t border-slate-200 bg-white py-8 md:py-16 lg:py-20">
      <div className="store-container">
        <div className="md:hidden">
          <h3 className="font-heading text-[1.2rem] font-bold leading-snug text-brand-primary">
            Want to import something?
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
            Send a photo on WhatsApp. We tell you what happens next.
          </p>

          <div className="mt-4">
            {whatsAppHref ? (
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-[14px] font-semibold text-white"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                Message on WhatsApp
              </a>
            ) : (
              <Link
                href="/contact"
                className="btn-interactive flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-[14px] font-semibold text-white"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                Message on WhatsApp
              </Link>
            )}
          </div>
        </div>

        <div className="mx-auto hidden max-w-2xl border border-slate-200 bg-slate-50 p-8 md:block md:p-10">
          <h3 className="font-heading text-2xl font-bold leading-snug text-brand-primary">
            Got something you want to import?
          </h3>
          <p className="mt-2 max-w-lg text-base leading-relaxed text-slate-600">
            Send us a photo or short message on WhatsApp. We will tell you what happens next.
          </p>

          <div className="mt-6">
            {whatsAppHref ? (
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                Message on WhatsApp
              </a>
            ) : (
              <Link
                href="/contact"
                className="btn-interactive inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                Message on WhatsApp
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
