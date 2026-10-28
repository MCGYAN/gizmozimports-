import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'Pricing Guide | Import Goods from China to Ghana',
  description:
    'Understand the complete pricing guide for importing from China to Ghana: product cost, local logistics, freight, customs, and sourcing service fee.',
  keywords: ['import goods from China to Ghana', 'buy from China Ghana', 'China sourcing agent Ghana'],
};

const rows = [
  {
    code: '01',
    item: 'Product cost',
    stage: 'Supplier invoice',
    details: 'Ex-factory or wholesale price in RMB converted to GH¢ after specification and supplier verification.',
  },
  {
    code: '02',
    item: 'China inland logistics',
    stage: 'Factory → Warehouse',
    details: 'Domestic transport from the supplier floor to our consolidation warehouse in China.',
  },
  {
    code: '03',
    item: 'International freight',
    stage: 'China → Ghana',
    details: 'Air express (charged by weight) or sea container freight (charged by CBM volume).',
  },
  {
    code: '04',
    item: 'Customs & port clearing',
    stage: 'Tema / Kotoka',
    details: 'Import duties, port handling, and clearing charges required for entry into Ghana.',
  },
  {
    code: '05',
    item: 'Sourcing & handling fee',
    stage: 'Gizmoz desk',
    details: 'Supplier vetting, RMB settlement, pre-shipment checks, and status tracking until pickup.',
  },
];

export default function PricingGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        size="large"
        kicker="Landed Cost Schedule"
        title="Pricing Guide"
        subtitle="We do not hide fees inside vague shipping estimates. Every quote breaks out the five cost lines below before you pay."
      />

      <section className="store-section border-b border-slate-200 bg-white">
        <div className="store-container">
          <div className="overflow-x-auto border border-slate-200">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-[#f8fafc] text-xs font-semibold text-slate-600">
                  <th className="w-16 px-4 py-3.5 font-mono">#</th>
                  <th className="px-4 py-3.5">Cost line</th>
                  <th className="px-4 py-3.5">Stage</th>
                  <th className="px-4 py-3.5">What it covers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rows.map((row) => (
                  <tr key={row.code} className="bg-white">
                    <td className="px-4 py-4 font-mono text-xs font-semibold text-brand-accent">
                      {row.code}
                    </td>
                    <td className="px-4 py-4 font-heading font-bold text-brand-primary">
                      {row.item}
                    </td>
                    <td className="px-4 py-4 text-xs font-medium text-slate-500">
                      {row.stage}
                    </td>
                    <td className="px-4 py-4 leading-relaxed text-slate-600">
                      {row.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid items-center gap-6 border border-slate-200 bg-[#f8fafc] p-6 sm:p-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-xs font-semibold text-brand-accent">Estimate your shipment</p>
              <h2 className="mt-1 font-heading text-xl font-bold text-brand-primary">
                Want an exact landed quote in Cedis?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Send the product image, specification, and quantity on WhatsApp. We will prepare a complete cost sheet before you commit.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
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
                href="/exchange"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-brand-primary hover:border-brand-primary"
              >
                Check RMB rate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
