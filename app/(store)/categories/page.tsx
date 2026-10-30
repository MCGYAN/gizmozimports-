import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import PageHero from '@/components/PageHero';
import CategoryCard from '@/components/CategoryCard';
import { Search, HeadphonesIcon, Inbox } from 'lucide-react';
import { pageMetadata } from '@/lib/page-metadata';

export const revalidate = 300;

export const metadata: Metadata = pageMetadata('categories', { path: '/categories' });

export default async function CategoriesPage() {
  const { data: categoriesData } = await supabase
    .from('categories')
    .select(`
      id,
      name,
      slug,
      description,
      image_url,
      position
    `)
    .eq('status', 'active')
    .order('position', { ascending: true });

  const categories = categoriesData || [];

  return (
    <div className="min-h-screen bg-brand-surface">
      <PageHero
        title="Shop by Category"
        subtitle="Gadgets, appliances, furniture, and more. Pick a category and we help you import it."
      />

      <div className="store-container py-8 sm:py-12 md:py-16">
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                slug={category.slug}
                name={category.name}
                image={category.image_url}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <Inbox className="mx-auto mb-4 h-12 w-12 text-slate-300" />
            <p className="text-base font-medium text-brand-foreground/70">
              No categories yet. Check back soon or browse the shop.
            </p>
          </div>
        )}
      </div>

      <div className="bg-[#172554] py-10 md:py-20">
        <div className="store-container max-w-3xl text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:mt-4 md:text-lg">
            Tell us what you want to bring in. We walk you through cost and timing.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              href="/shop"
              className="btn-interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 text-sm font-bold text-white md:px-8 md:py-4 md:text-base"
            >
              <Search className="h-5 w-5" />
              Browse products
            </Link>
            <Link
              href="/contact"
              className="btn-interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-transparent px-6 text-sm font-bold text-white md:px-8 md:py-4 md:text-base"
            >
              <HeadphonesIcon className="h-5 w-5" />
              Talk to Gizmoz Trades
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
