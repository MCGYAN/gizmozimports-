'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface ImportCtaProps {
  whatsAppHref?: string;
}

export default function ImportCta({ whatsAppHref }: ImportCtaProps) {
  return (
    <section className="border-t border-slate-200 bg-white py-10 md:py-16">
      <div className="store-container">
        <div className="grid items-center gap-6 border border-slate-200 bg-[#f8fafc] p-6 sm:p-8 md:grid-cols-12 md:gap-8 md:p-10">
          <div className="md:col-span-8">
            <p className="text-xs font-semibold text-brand-accent">Custom sourcing desk</p>
            <h3 className="mt-1 font-heading text-xl font-bold leading-snug text-brand-primary sm:text-2xl">
              Have a product photo, Alibaba link, or spec list?
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Send it to our WhatsApp desk. We verify the supplier in China and reply with a full Cedi breakdown—product, freight, and clearing included.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row md:col-span-4 md:justify-end">
            {whatsAppHref ? (
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                Message on WhatsApp
              </a>
            ) : (
              <Link
                href="/contact"
                className="btn-premium inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#172554]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                Contact our desk
              </Link>
            )}
            <Link
              href="/pricing-guide"
              className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-brand-primary transition-colors hover:border-brand-primary"
            >
              Pricing guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
