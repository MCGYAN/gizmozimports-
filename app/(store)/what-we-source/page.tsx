import type { Metadata } from 'next';
import Link from 'next/link';
import SourceCategoryCard from '@/components/SourceCategoryCard';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'What You Can Buy | China to Ghana | Gizmoz Trades',
  description:
    'See what you can buy from China for Ghana with Gizmoz Trades: phones, gadgets, building tools, car parts, stationery, lab gear, and home appliances.',
  keywords: ['buy from China Ghana', 'import goods from China to Ghana', 'China goods Ghana'],
};

const SOURCE_CATEGORIES = [
  {
    title: 'Gadgets & phones',
    description: 'Phones, accessories, computers, and smart devices.',
    icon: 'ri-smartphone-line',
  },
  {
    title: 'Building tools',
    description: 'Tools and gear for building and site work.',
    icon: 'ri-building-2-line',
  },
  {
    title: 'Cars & parts',
    description: 'Car parts and car supplies.',
    icon: 'ri-car-line',
  },
  {
    title: 'Stationery',
    description: 'Office, school, and business supplies.',
    icon: 'ri-pencil-ruler-2-line',
  },
  {
    title: 'Lab gear',
    description: 'Lab tools and experiment supplies.',
    icon: 'ri-flask-line',
  },
  {
    title: 'Home appliances',
    description: 'Kitchen, laundry, and home machines.',
    icon: 'ri-home-gear-line',
  },
] as const;

export default function WhatWeSourcePage() {
  return (
    <main className="min-h-screen bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">What you can buy</h1>
          <p className="mt-4 text-gray-600">
            Start with products in the shop. Order online, get a clear bill, pay, and track your
            goods from China to Ghana.
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
        <div className="mt-10 bg-[#0C4A6E] p-8 text-white">
          <h2 className="text-2xl font-bold">Cannot find it in the shop?</h2>
          <p className="mt-2 text-blue-100">
            Send us a photo or a short note. We will tell you if we can help.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="btn-interactive inline-flex rounded-xl bg-brand-accent px-6 py-3 font-semibold text-brand-primary"
            >
              Open the shop
            </Link>
            <a
              href={leadConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-interactive inline-flex rounded-xl border border-white/40 bg-transparent px-6 py-3 font-semibold text-white"
            >
              Ask us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
