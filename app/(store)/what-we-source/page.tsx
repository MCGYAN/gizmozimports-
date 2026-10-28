import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SourceCategoryCard from '@/components/SourceCategoryCard';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'What We Source | China Sourcing Agent Ghana',
  description:
    'See the products Gizmoz Trades can help you import from China to Ghana: gadgets, electronics, construction equipment, auto parts, stationery, lab equipment, and home appliances.',
  keywords: ['China sourcing agent Ghana', 'import goods from China to Ghana', 'buy from China Ghana'],
};

const SOURCE_CATEGORIES = [
  {
    code: '01',
    title: 'Gadgets & Electronic Products',
    description: 'Phones, laptops, accessories, computers, and smart devices sourced from Shenzhen and Guangzhou.',
    icon: 'ri-smartphone-line',
  },
  {
    code: '02',
    title: 'Construction Equipment',
    description: 'Site machinery, power tools, scaffolding, and heavy building equipment for contractors.',
    icon: 'ri-building-2-line',
  },
  {
    code: '03',
    title: 'Auto & Auto Parts',
    description: 'Replacement vehicle parts, diagnostic tools, tyres, and workshop supplies.',
    icon: 'ri-car-line',
  },
  {
    code: '04',
    title: 'Stationery',
    description: 'Office, school, and commercial paper and printing supplies in retail or wholesale quantities.',
    icon: 'ri-pencil-ruler-2-line',
  },
  {
    code: '05',
    title: 'Laboratory Experiment Equipment',
    description: 'Lab instruments, microscopes, glassware, and school or clinic experiment supplies.',
    icon: 'ri-flask-line',
  },
  {
    code: '06',
    title: 'Home Appliances',
    description: 'Kitchen, laundry, refrigeration, and utility appliances checked before export.',
    icon: 'ri-home-gear-line',
  },
] as const;

export default function WhatWeSourcePage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        size="large"
        kicker="Sourcing Desk · 6 Core Lines"
        title="What We Source"
        subtitle="We source directly from vetted Chinese manufacturers and wholesale hubs, then handle inspection, payment, and freight to Ghana."
      />

      <section className="store-section border-b border-slate-200 bg-white">
        <div className="store-container">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold text-brand-accent">Active sourcing categories</p>
              <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-brand-primary md:text-3xl">
                Six product lines we quote daily
              </h2>
            </div>
            <Link
              href="/pricing-guide"
              className="text-sm font-semibold text-brand-primary hover:text-brand-accent"
            >
              See how landed pricing works →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOURCE_CATEGORIES.map((category) => (
              <SourceCategoryCard
                key={category.title}
                code={category.code}
                title={category.title}
                description={category.description}
                icon={category.icon}
              />
            ))}
          </div>

          <div className="mt-10 grid items-center gap-6 border border-slate-200 bg-[#172554] p-6 text-white sm:p-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-xs font-semibold text-brand-accent">Custom factory requests</p>
              <h2 className="mt-1 font-heading text-xl font-bold sm:text-2xl">
                Need a specification or item not listed above?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100/85 sm:text-base">
                Send your product photo, 1688/Alibaba link, or quantity target on WhatsApp and we will confirm availability and landed cost.
              </p>
            </div>
            <div className="md:col-span-4 md:flex md:justify-end">
              <a
                href={leadConfig.whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 sm:w-auto"
              >
                <i className="ri-whatsapp-line text-base" aria-hidden />
                Request Custom Sourcing
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
