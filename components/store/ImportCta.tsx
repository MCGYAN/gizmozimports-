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
            Ready to order?
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
            Shop the products. Get your invoice. Pay. Then track your order to Ghana.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/shop"
              className="btn-interactive flex min-h-[48px] w-full items-center justify-center rounded-xl bg-brand-accent text-[14px] font-semibold text-brand-primary"
            >
              Shop products
            </Link>
            {whatsAppHref ? (
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-[13px] font-semibold text-brand-primary"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                Need help? WhatsApp us
              </a>
            ) : (
              <Link
                href="/contact"
                className="btn-interactive flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-[13px] font-semibold text-brand-primary"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                Need help? Contact us
              </Link>
            )}
          </div>
        </div>

        <div className="mx-auto hidden max-w-2xl border border-slate-200 bg-slate-50 p-8 md:block md:p-10">
          <h3 className="font-heading text-2xl font-bold leading-snug text-brand-primary">
            Ready to order?
          </h3>
          <p className="mt-2 max-w-lg text-base leading-relaxed text-slate-600">
            Shop what is listed. Get your invoice. Pay. Then track your order from China to Ghana.
            WhatsApp is for questions, not for placing every order.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="btn-interactive inline-flex min-h-[50px] items-center justify-center rounded-xl bg-brand-accent px-6 py-3 text-[15px] font-semibold text-brand-primary"
            >
              Shop products
            </Link>
            {whatsAppHref ? (
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-[15px] font-semibold text-brand-primary"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                Need help? WhatsApp us
              </a>
            ) : (
              <Link
                href="/contact"
                className="btn-interactive inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-[15px] font-semibold text-brand-primary"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                Need help? Contact us
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
