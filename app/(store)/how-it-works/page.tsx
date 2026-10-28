import type { Metadata } from 'next';
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
    <main className="min-h-screen bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">How It Works</h1>
          <p className="mt-4 text-gray-600">
            Our process is built for first-time and experienced importers in Ghana. You always know cost, timeline, and shipment status.
          </p>
        </div>
        <div className="mt-12 max-w-5xl mx-auto">
          <ProcessSteps />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-5xl mx-auto">
          <article className="liquid-glass-card p-5">
            <h2 className="font-semibold text-brand-black">Typical timelines</h2>
            <p className="mt-2 text-sm text-gray-600">
              Air freight often arrives faster for urgent orders, while sea freight is better for large bulk orders with lower landed cost.
            </p>
          </article>
          <article className="liquid-glass-card p-5">
            <h2 className="font-semibold text-brand-black">Payment flow</h2>
            <p className="mt-2 text-sm text-gray-600">
              We provide verified quotation details first, then proceed with payment and supplier execution only after your approval.
            </p>
          </article>
        </div>
        <div className="mt-10 liquid-glass-inset rounded-2xl p-8 text-white max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold">Start your import in minutes</h2>
          <p className="mt-2 text-blue-100">Send your product details now and get a response quickly.</p>
          <a href={leadConfig.whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-interactive mt-5 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-brand-primary">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
