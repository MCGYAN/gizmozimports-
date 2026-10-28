import type { Metadata } from 'next';
import Link from 'next/link';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'Pricing Guide | Import Goods from China to Ghana',
  description:
    'Understand pricing when you buy with Gizmoz Trades: product cost, China logistics, shipping, customs, and service fee.',
  keywords: ['import goods from China to Ghana', 'buy from China Ghana', 'China sourcing Ghana'],
};

const rows = [
  { item: 'Product cost', details: 'The price of the goods on your invoice.' },
  { item: 'China local logistics', details: 'Moving goods inside China to our warehouse when needed.' },
  { item: 'Shipping', details: 'Shipping cost based on volume, weight, and destination.' },
  { item: 'Customs & clearance', details: 'Import duties and handling for Ghana entry when they apply.' },
  { item: 'Service fee', details: 'Handling, updates, and support through the order.' },
];

export default function PricingGuidePage() {
  return (
    <main className="min-h-screen bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">Pricing Guide</h1>
          <p className="mt-4 text-gray-600">
            When you order on the site, your invoice shows what to pay. Extra shipping or clearance
            costs are explained when they apply — we do not hide fees.
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
            Shop a listed product to get your invoice. If the item is not listed, message us with a
            photo and quantity and we will help.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="btn-interactive inline-flex rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white"
            >
              Shop products
            </Link>
            <a
              href={leadConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-interactive inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-primary"
            >
              Need help? WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
