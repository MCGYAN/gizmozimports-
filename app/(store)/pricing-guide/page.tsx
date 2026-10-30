import type { Metadata } from 'next';
import Link from 'next/link';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'Pricing Guide | Buy from China to Ghana',
  description:
    'See what makes up your bill at Gizmoz Trades: product cost, China local moves, shipping, customs, and service fee.',
  keywords: ['import goods from China to Ghana', 'buy from China Ghana', 'China goods Ghana price'],
};

const rows = [
  { item: 'Product cost', details: 'The price of the goods on your bill.' },
  { item: 'China local moves', details: 'Moving goods inside China to our warehouse when needed.' },
  { item: 'Shipping', details: 'Shipping cost based on size, weight, and where it goes.' },
  { item: 'Customs & clearing', details: 'Import duties and handling for Ghana when they apply.' },
  { item: 'Service fee', details: 'Handling, updates, and help through the order.' },
];

export default function PricingGuidePage() {
  return (
    <main className="min-h-screen bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">How pricing works</h1>
          <p className="mt-4 text-gray-600">
            When you order on the site, your bill shows what to pay. Extra shipping or clearing
            costs are explained when they apply. We do not hide fees.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-card border border-gray-200 shadow-sm max-w-5xl mx-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-surface">
              <tr>
                <th className="px-4 py-3 font-semibold text-brand-black">Cost item</th>
                <th className="px-4 py-3 font-semibold text-brand-black">What it covers</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.item} className="border-t border-gray-200">
                  <td className="px-4 py-3 font-medium text-brand-black">{row.item}</td>
                  <td className="px-4 py-3 text-gray-600">{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 border border-slate-200 bg-slate-50 p-6 max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold text-brand-black">Want the exact amount?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Shop a listed product to get your bill. If the item is not listed, message us with a
            photo and how many you need.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="btn-interactive inline-flex rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-semibold text-brand-primary"
            >
              Open the shop
            </Link>
            <a
              href={leadConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-interactive inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-primary"
            >
              Ask us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
