import type { Metadata } from 'next';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'Pricing Guide | Import Goods from China to Ghana',
  description:
    'Understand the complete pricing guide for importing from China to Ghana: product cost, local logistics, freight, customs, and sourcing service fee.',
  keywords: ['import goods from China to Ghana', 'buy from China Ghana', 'China sourcing agent Ghana'],
};

const rows = [
  { item: 'Product cost', details: 'Supplier invoice after negotiation and verification.' },
  { item: 'China local logistics', details: 'Factory to warehouse or consolidation point in China.' },
  { item: 'Shipping', details: 'Shipping cost based on volume, weight, and destination.' },
  { item: 'Customs & clearance', details: 'Import duties and handling for Ghana entry.' },
  { item: 'Service fee', details: 'Sourcing, communication, quality checks, and update management.' },
];

export default function PricingGuidePage() {
  return (
    <main className="min-h-screen bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">Pricing Guide</h1>
          <p className="mt-4 text-gray-600">
            We do not hide fees. Every quote from Gizmoz Trades includes the full landed-cost structure before you commit.
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

        <div className="mt-8 liquid-glass-card p-6 max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold text-brand-black">Need an exact quote?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Share product image/specifications and quantity. We will provide a detailed estimate for import to Ghana.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={leadConfig.whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-interactive inline-flex rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
