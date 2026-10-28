import type { Metadata } from 'next';
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
    title: 'Gadgets & Electronic Products',
    description: 'Phones, accessories, computers, and smart devices.',
    icon: 'ri-smartphone-line',
  },
  {
    title: 'Construction Equipment',
    description: 'Tools, machinery, and site equipment for building projects.',
    icon: 'ri-building-2-line',
  },
  {
    title: 'Auto & Auto Parts',
    description: 'Vehicle parts, accessories, and automotive supplies.',
    icon: 'ri-car-line',
  },
  {
    title: 'Stationery',
    description: 'Office, school, and business stationery supplies.',
    icon: 'ri-pencil-ruler-2-line',
  },
  {
    title: 'Laboratory Experiment Equipment',
    description: 'Lab instruments, glassware, and experiment supplies.',
    icon: 'ri-flask-line',
  },
  {
    title: 'Home Appliances',
    description: 'Kitchen, laundry, and utility appliances.',
    icon: 'ri-home-gear-line',
  },
] as const;

export default function WhatWeSourcePage() {
  return (
    <main className="min-h-screen bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">What We Source</h1>
          <p className="mt-4 text-gray-600">
            We source directly from vetted Chinese suppliers and help clients in Ghana import
            confidently with transparent pricing and shipping updates.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOURCE_CATEGORIES.map((category) => (
            <SourceCategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
            />
          ))}
        </div>
        <div className="mt-10 liquid-glass-inset rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold">Need something not listed?</h2>
          <p className="mt-2 text-blue-100">
            Send your product image or description and we will source it for you.
          </p>
          <a
            href={leadConfig.whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-interactive mt-5 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-brand-primary"
          >
            Request Custom Sourcing
          </a>
        </div>
      </div>
    </main>
  );
}
