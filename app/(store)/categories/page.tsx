import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import PageHero from '@/components/PageHero';
import { Search, HeadphonesIcon, ArrowRight, Inbox } from 'lucide-react';
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

      <div className="store-container py-12 md:py-16">
        {categories.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group overflow-hidden border border-slate-200 bg-white transition-colors hover:border-brand-primary/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#172554]" aria-hidden />
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" aria-hidden />
                  <h3 className="absolute bottom-4 left-4 right-4 font-heading text-lg font-bold leading-tight text-white">
                    {category.name}
                  </h3>
                </div>

                <div className="p-5">
                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {category.description ||
                      'We help you source it, ship it, and get it home. No surprises.'}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-accent">
                    <span>View category</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-slate-200 bg-white py-20 text-center">
            <Inbox className="mx-auto mb-4 h-12 w-12 text-slate-300" />
            <p className="text-lg font-medium text-brand-foreground/70">
              No categories yet. Check back soon or browse featured products in the shop.
            </p>
          </div>
        )}
      </div>

      <div className="bg-[#172554] py-16 md:py-20">
        <div className="store-container max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Tell us what you want to bring in. We walk you through cost and timing so you buy with confidence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="btn-interactive inline-flex items-center gap-2 rounded-xl bg-brand-accent px-8 py-4 font-bold text-white hover:bg-brand-accent/90"
            >
              <Search className="h-5 w-5" />
              Browse featured products
            </Link>
            <Link
              href="/contact"
              className="btn-interactive inline-flex items-center gap-2 rounded-xl border border-white/30 bg-transparent px-8 py-4 font-bold text-white hover:bg-white/10"
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
