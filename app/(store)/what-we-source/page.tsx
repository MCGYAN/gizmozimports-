import type { Metadata } from 'next';
import SourceCategoryCard from '@/components/SourceCategoryCard';
import { leadConfig } from '@/lib/leadConfig';

export const metadata: Metadata = {
  title: 'What We Source | China Sourcing Agent Ghana',
  description:
    'See the products Gizmoz Trades can help you import from China to Ghana: electronics, appliances, furniture, industrial and custom requests.',
  keywords: ['China sourcing agent Ghana', 'import goods from China to Ghana', 'buy from China Ghana'],
};

export default function WhatWeSourcePage() {
  return (
    <main className="min-h-screen bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black">What We Source</h1>
          <p className="mt-4 text-gray-600">
            We source directly from vetted Chinese suppliers and help clients in Ghana import confidently with transparent pricing and shipping updates.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SourceCategoryCard title="Electronics & Gadgets" description="Phones, accessories, computers, and smart devices." icon="ri-smartphone-line" />
          <SourceCategoryCard title="Home Appliances" description="Kitchen, laundry, and utility appliances." icon="ri-home-gear-line" />
          <SourceCategoryCard title="Furniture" description="Office and home furniture with pre-shipment checks." icon="ri-sofa-line" />
          <SourceCategoryCard title="Fashion & Accessories" description="Shoes, bags, fabrics, and private label options." icon="ri-t-shirt-2-line" />
          <SourceCategoryCard title="Industrial & Tools" description="Machinery parts, hand tools, and workshop equipment." icon="ri-tools-line" />
          <SourceCategoryCard title="Bulk Wholesale Goods" description="Container and mixed goods for retail and distribution." icon="ri-box-3-line" />
        </div>
        <div className="mt-10 rounded-card-lg bg-brand p-8 text-white">
          <h2 className="text-2xl font-bold">Need something not listed?</h2>
          <p className="mt-2 text-blue-100">Send your product image or description and we will source it for you.</p>
          <a href={leadConfig.whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-pill bg-brand-accent px-6 py-3 font-semibold text-white">
            Request Custom Sourcing
          </a>
        </div>
      </div>
    </main>
  );
}
