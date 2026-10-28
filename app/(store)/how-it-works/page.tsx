import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ProcessSteps from '@/components/ProcessSteps';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'How It Works | Buy from China Ghana',
  description:
    'Learn how Gizmoz Trades helps you buy from China to Ghana with sourcing, verification, full cost breakdown, shipping, and delivery support.',
  keywords: ['buy from China Ghana', 'import goods from China to Ghana', 'China sourcing agent Ghana'],
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        size="large"
        kicker="Import Workflow · 4 Stages"
        title="How It Works"
        subtitle="Built for first-time and repeat importers in Ghana. You see supplier specs, full landed cost, and shipment checkpoints before and after payment."
      />

      <section className="store-section border-b border-slate-200 bg-white">
        <div className="store-container">
          <ProcessSteps />

          <div className="mt-12 grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-2">
            <article className="bg-[#f8fafc] p-6 sm:p-8">
              <p className="font-mono text-xs font-semibold text-brand-accent">FREIGHT SELECTION</p>
              <h2 className="mt-1 font-heading text-lg font-bold text-brand-primary">
                Air express vs. sea freight
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Air freight arrives faster for compact electronics, samples, and urgent stock. Sea freight lowers your landed cost on heavy construction gear, appliances, and bulk cartons.
              </p>
            </article>
            <article className="bg-[#f8fafc] p-6 sm:p-8">
              <p className="font-mono text-xs font-semibold text-brand-accent">SETTLEMENT &amp; INVOICES</p>
              <h2 className="mt-1 font-heading text-lg font-bold text-brand-primary">
                Verified quote before payment
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We confirm product specs and issue a clear Cedi breakdown first. Smaller shop orders can be paid at checkout; orders from GH¢ 2,000+ receive an official invoice for MTN MoMo or GCB Bank transfer.
              </p>
            </article>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-slate-200 bg-[#172554] p-6 text-white sm:p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-heading text-xl font-bold sm:text-2xl">
                Ready to price an import?
              </h2>
              <p className="mt-1.5 text-sm text-blue-100/85 sm:text-base">
                Send your product details on WhatsApp or review our landed-cost breakdown first.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={leadConfig.whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
              >
                <i className="ri-whatsapp-line text-base" aria-hidden />
                Chat on WhatsApp
              </a>
              <Link
                href="/pricing-guide"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Pricing guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
