import type { Metadata } from 'next';
import Link from 'next/link';
import ProcessSteps from '@/components/ProcessSteps';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'How It Works | Shop, Invoice, Pay, Track | Gizmoz Trades',
  description:
    'See how to buy with Gizmoz Trades: shop listed products, get your invoice, pay, and track your order from China to Ghana.',
  keywords: ['buy from China Ghana', 'import goods from China to Ghana', 'China sourcing Ghana'],
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">How It Works</h1>
          <p className="mt-4 text-gray-600">
            You shop on the site. You get an invoice. You pay. Then you track your order from China
            to Ghana. WhatsApp is for questions, not for every order.
          </p>
        </div>
        <div className="mt-12 max-w-5xl mx-auto">
          <ProcessSteps />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-5xl mx-auto">
          <article className="border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-brand-black">Shipping timelines</h2>
            <p className="mt-2 text-sm text-gray-600">
              Timing depends on what you buy and how it ships. We share a clear estimate for your
              order.
            </p>
          </article>
          <article className="border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-brand-black">How you pay</h2>
            <p className="mt-2 text-sm text-gray-600">
              Every order gets an invoice with bank or MoMo details. You pay, then tap I’ve paid so
              we can confirm and process the order.
            </p>
          </article>
        </div>
        <div className="mt-10 max-w-5xl mx-auto border border-slate-200 bg-[#111827] p-8 text-white">
          <h2 className="text-2xl font-bold">Start with the shop</h2>
          <p className="mt-2 text-blue-100">
            See listed products first. If you cannot find what you need, message us.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="btn-interactive inline-flex rounded-xl bg-brand-accent px-6 py-3 font-semibold text-brand-primary"
            >
              Shop products
            </Link>
            <a
              href={leadConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-interactive inline-flex rounded-xl border border-white/40 bg-transparent px-6 py-3 font-semibold text-white"
            >
              Need help? WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
