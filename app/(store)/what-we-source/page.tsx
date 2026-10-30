import type { Metadata } from 'next';
import Link from 'next/link';
import SourceCategoryCard from '@/components/SourceCategoryCard';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'What We Source | Shop China to Ghana | Gizmoz Trades',
  description:
    'See the product types Gizmoz Trades helps Ghana buyers get from China: gadgets, electronics, construction equipment, auto parts, stationery, lab equipment, and home appliances.',
  keywords: ['buy from China Ghana', 'import goods from China to Ghana', 'China sourcing Ghana'],
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
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">What You Can Buy</h1>
          <p className="mt-4 text-gray-600">
            Start with products listed in the shop. Order online, get your invoice, pay, and track
            your goods from China to Ghana.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOURCE_CATEGORIES.map((category) => (
            <SourceCategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              href="/shop"
            />
          ))}
        </div>
        <div className="mt-10 bg-[#111827] p-8 text-white">
          <h2 className="text-2xl font-bold">Cannot find it in the shop?</h2>
          <p className="mt-2 text-blue-100">
            Message us with a photo or short description. We will tell you if we can help.
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
