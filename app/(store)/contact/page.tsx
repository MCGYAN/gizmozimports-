import type { Metadata } from 'next';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'Contact Gizmoz Trades | China Sourcing Agent Ghana',
  description:
    'Contact Gizmoz Trades in Accra for sourcing and import support from China to Ghana via WhatsApp or phone.',
  keywords: ['China sourcing agent Ghana', 'buy from China Ghana', 'import goods from China to Ghana'],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">Contact Gizmoz Trades</h1>
          <p className="mt-4 text-gray-600">
            Ready to import from China to Ghana? Reach out now for sourcing support and a clear quote.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 max-w-5xl mx-auto">
          <article className="rounded-card border border-gray-200 p-5">
            <h2 className="font-semibold text-brand-black">Ghana number</h2>
            <a href={leadConfig.telUrl(leadConfig.ghanaPhone)} className="mt-2 inline-block text-brand hover:underline">
              {leadConfig.ghanaPhone}
            </a>
          </article>
          <article className="rounded-card border border-gray-200 p-5">
            <h2 className="font-semibold text-brand-black">China number</h2>
            <a href={leadConfig.telUrl(leadConfig.chinaPhone)} className="mt-2 inline-block text-brand hover:underline">
              {leadConfig.chinaPhone}
            </a>
          </article>
          <article className="rounded-card border border-gray-200 p-5">
            <h2 className="font-semibold text-brand-black">WhatsApp</h2>
            <a href={leadConfig.whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-brand hover:underline">
              Chat with us instantly
            </a>
          </article>
          <article className="rounded-card border border-gray-200 p-5">
            <h2 className="font-semibold text-brand-black">Location</h2>
            <p className="mt-2 text-gray-700">Accra, Ghana</p>
          </article>
        </div>

        <section className="mt-10 rounded-card-lg bg-brand-accent p-8 text-white max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold">Start your import request today</h2>
          <p className="mt-2 text-orange-100">
            Send product image, quantity, and preferred timeline. We will reply with sourcing options and cost breakdown.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={leadConfig.whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-pill bg-white px-6 py-3 font-semibold text-brand-accent">
              Chat on WhatsApp
            </a>
            <a href={leadConfig.telUrl(leadConfig.ghanaPhone)} className="inline-flex rounded-pill border border-white px-6 py-3 font-semibold text-white">
              Call Now
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
