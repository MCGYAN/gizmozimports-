import type { Metadata } from 'next';
import Link from 'next/link';
import ProcessSteps from '@/components/ProcessSteps';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'How It Works | Shop, Pay, Track | Gizmoz Trades',
  description:
    'Buy from China in four easy steps: shop, get your bill, pay, and track it to Ghana.',
  keywords: ['buy from China Ghana', 'import goods from China to Ghana', 'China to Ghana shop'],
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-brand-black md:text-5xl">How it works</h1>
          <p className="mt-4 text-gray-600">
            Buying from China should feel simple. You shop here. You get a bill. You pay. Then you
            watch the order come to Ghana.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          <ProcessSteps />
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          <article className="border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-brand-black">How long does it take?</h2>
            <p className="mt-2 text-sm text-gray-600">
              It depends on what you buy and how it ships. We tell you a clear time for your order.
            </p>
          </article>
          <article className="border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-brand-black">How do I pay?</h2>
            <p className="mt-2 text-sm text-gray-600">
              You get a bill with bank or MoMo details. Pay it, then tap “I’ve paid” so we can
              confirm and keep going.
            </p>
          </article>
        </div>
        <div className="mx-auto mt-10 max-w-5xl border border-slate-200 bg-[#0C4A6E] p-8 text-white">
          <h2 className="text-2xl font-bold">Start in the shop</h2>
          <p className="mt-2 text-blue-100">
            Look at the products first. If you cannot find what you need, message us.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="btn-interactive inline-flex rounded-xl bg-brand-accent px-6 py-3 font-semibold text-brand-primary"
            >
              Start shopping
            </Link>
            <a
              href={leadConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-interactive inline-flex rounded-xl border border-white/40 bg-transparent px-6 py-3 font-semibold text-white"
            >
              Need help? Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
