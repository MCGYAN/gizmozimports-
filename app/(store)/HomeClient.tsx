'use client';

import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ProductCard, { type ColorVariant, getColorHex } from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useCMS } from '@/context/CMSContext';
import { buildWhatsAppHref } from '@/lib/store-config';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const ImportJourneyTimeline = dynamic(() => import('@/components/store/ImportJourneyTimeline'), { loading: () => null });
const ImportCta = dynamic(() => import('@/components/store/ImportCta'), { loading: () => null });

const FALLBACK_CATEGORIES = [
  { slug: 'electronics', name: 'Electronics & Gadgets' },
  { slug: 'home-appliances', name: 'Home Appliances' },
  { slug: 'furniture', name: 'Furniture' },
  { slug: 'fashion', name: 'Fashion & Accessories' },
  { slug: 'tools', name: 'Industrial & Tools' },
  { slug: 'wholesale', name: 'Bulk Wholesale Goods' },
];

export default function HomeClient({
  featuredProducts,
  categories,
}: {
  featuredProducts: any[];
  categories: any[];
}) {
  usePageTitle('China to Ghana Imports');
  const { getSetting } = useCMS();
  const categorySliderRef = useRef<HTMLDivElement>(null);

  const waHero = buildWhatsAppHref(getSetting('contact_whatsapp'));
  const waHeroPrefilled = waHero
    ? `${waHero}${waHero.includes('?') ? '&' : '?'}text=${encodeURIComponent('Hi Gizmoz Trades, I want to import from China.')}`
    : '';

  const scrollCategorySlider = (direction: 'left' | 'right') => {
    if (categorySliderRef.current) {
      categorySliderRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };


  const displayCategories =
    categories.length > 0
      ? categories.filter((c: any) => !c.parent_id).slice(0, 8)
      : FALLBACK_CATEGORIES;

  const hasFeaturedProducts = featuredProducts.length > 0;

  const renderProductCard = (product: any) => {
                const variants = product.product_variants || [];
                const hasVariants = variants.length > 0;
                const minVariantPrice = hasVariants
                  ? Math.min(...variants.map((v: any) => v.price || product.price))
                  : undefined;
                const totalVariantStock = hasVariants
                  ? variants.reduce((sum: number, v: any) => sum + (v.quantity || 0), 0)
                  : 0;
                const effectiveStock = hasVariants ? totalVariantStock : product.quantity;

                const colorVariants: ColorVariant[] = [];
                const seenColors = new Set<string>();
                for (const v of variants) {
                  const colorName = (v as any).option2;
                  if (colorName && !seenColors.has(colorName.toLowerCase().trim())) {
                    const hex = getColorHex(colorName);
                    if (hex) {
                      seenColors.add(colorName.toLowerCase().trim());
                      colorVariants.push({ name: colorName.trim(), hex });
                    }
                  }
                }

    const imageUrl =
      product.product_images?.find((img: any) => img.url)?.url ||
      product.product_images?.[0]?.url ||
      'https://via.placeholder.com/400x500';

                return (
      <div key={product.id} className="min-w-0 w-full">
                    <ProductCard
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.compare_at_price}
            image={imageUrl}
                      rating={product.rating_avg || 5}
                      reviewCount={product.review_count || 0}
                      badge={product.featured ? 'Featured' : undefined}
                      inStock={effectiveStock > 0}
                      maxStock={effectiveStock || 50}
                      moq={product.moq || 1}
                      hasVariants={hasVariants}
                      minVariantPrice={minVariantPrice}
                      colorVariants={colorVariants}
                      categoryName={product.categories?.name}
                      categorySlug={product.categories?.slug}
            compact
                    />
                  </div>
                );
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="hero-mesh relative overflow-hidden text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="hero-glow z-10 rounded-card-lg border border-white/20 bg-white/10 p-7 backdrop-blur-md md:p-10">
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-blue-100/90">China to Ghana Sourcing</p>
              <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">
                Import From China Without the Stress
              </h1>
              <p className="mt-4 max-w-2xl text-blue-100">
                We source, pay, and deliver quality gadgets, electronics, and everyday goods to Ghana. You stay in the loop from start to finish.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  prefetch
                  className="btn-premium inline-flex items-center rounded-pill bg-brand-accent px-6 py-3 font-semibold text-white hover:bg-orange-600"
                >
                  Shop Now
                </Link>
                {waHeroPrefilled ? (
                  <a
                    href={waHeroPrefilled}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium inline-flex items-center gap-2 rounded-pill border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
                  >
                    <i className="ri-whatsapp-line text-lg" aria-hidden />
                    Ask us on WhatsApp
                  </a>
                ) : (
                  <Link
                    href="/categories"
                    prefetch
                    className="btn-premium inline-flex items-center rounded-pill border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
                  >
                    Browse Categories
                  </Link>
                )}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-blue-100/80">
                Verified suppliers. Clear prices before you pay. Real updates until delivery.
              </p>
            </div>

            <div className="relative z-0 mx-2 mb-4 mt-2 sm:mx-6 lg:mx-0 lg:mb-0 lg:mt-0 lg:h-full lg:min-h-[400px]">
              <div className="relative aspect-[4/3] w-full -rotate-1 transform overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 hover:rotate-0 lg:absolute lg:right-0 lg:top-1/2 lg:w-[105%] lg:-translate-y-1/2 lg:-rotate-2">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
                  alt="Global logistics"
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay" />
              </div>

              <div className="animate-float absolute -bottom-5 -left-2 rounded-2xl border border-white/20 bg-white/10 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:-bottom-6 lg:-left-6 lg:p-5">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent shadow-lg shadow-brand-accent/30 lg:h-12 lg:w-12">
                    <i className="ri-ship-line text-lg text-white lg:text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-100 lg:text-xs">Status</p>
                    <p className="text-sm font-bold text-white lg:text-base">In Transit to Accra</p>
                  </div>
                </div>
              </div>

              <div
                className="animate-float absolute -top-5 right-2 rounded-2xl border border-white/20 bg-white/10 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:-top-6 lg:right-6 lg:p-4"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 lg:h-10 lg:w-10">
                    <i className="ri-shield-check-fill text-lg text-green-400 lg:text-xl" />
                  </div>
                  <p className="text-xs font-bold text-white lg:text-sm">Verified Supplier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="store-section relative overflow-hidden border-b border-white/30 bg-gradient-to-b from-white/45 via-[#eef2f8]/55 to-[#f8fafc]/35">
        <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand-accent/5 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-48 w-48 rounded-full bg-brand-primary/5 blur-3xl" aria-hidden />
        <div className="store-container relative">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 md:mb-7 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-accent">Browse</p>
              <h2 className="font-heading text-[1.75rem] font-bold tracking-tight text-brand-primary md:text-[2.25rem]">
                Shop by Category
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                Pick a category. We help you import it.
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center gap-3 md:w-auto md:justify-end">
              <div className="hidden gap-3 md:flex lg:hidden">
                <button
                  type="button"
                  onClick={() => scrollCategorySlider('left')}
                  className="btn-interactive flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-primary shadow-sm hover:border-brand-accent/30"
                  aria-label="Scroll categories left"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCategorySlider('right')}
                  className="btn-interactive flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-primary shadow-sm hover:border-brand-accent/30"
                  aria-label="Scroll categories right"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <Link
                href="/categories"
                prefetch
                className="btn-interactive inline-flex min-h-[44px] items-center justify-center rounded-xl border border-brand-primary/15 bg-white px-5 py-2.5 text-sm font-bold text-brand-primary shadow-sm hover:border-brand-accent/40 hover:text-brand-accent"
              >
                View all categories
              </Link>
            </div>
          </div>
          <div
            ref={categorySliderRef}
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 pt-1 scrollbar-hide sm:mx-0 sm:gap-4 sm:px-0 lg:grid lg:snap-none lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:pb-0 xl:gap-5"
          >
            {displayCategories.map((cat: any, idx: number) => (
              <CategoryCard
                key={cat.id || cat.slug}
                slug={cat.slug}
                name={cat.name}
                image={cat.image_url || cat.image}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="store-section relative overflow-hidden border-b border-white/30 bg-gradient-to-b from-[#f8fafc]/50 via-[#f1f5f9]/55 to-[#eef2f7]/40">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" aria-hidden />
        <div className="store-container relative">
          <div className="mb-5 flex flex-col justify-between gap-4 md:mb-7 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-accent">Discover</p>
              <h2 className="font-heading text-[1.75rem] font-bold tracking-tight text-brand-primary md:text-[2.25rem] lg:text-[2.5rem]">
                Featured products
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 md:mt-3 md:text-base">
                Hand picked for you. See the price up front. Or ask for a quote.
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center gap-3 md:w-auto md:justify-end">
              <Link
                href="/shop"
                prefetch
                className="btn-interactive inline-flex min-h-[44px] items-center justify-center rounded-xl border border-brand-primary/15 bg-white px-5 py-2.5 text-sm font-bold text-brand-primary shadow-sm hover:border-brand-accent/40 hover:text-brand-accent"
              >
                View all products
              </Link>
            </div>
          </div>

          {hasFeaturedProducts ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-5 xl:gap-6">
              {featuredProducts.map(renderProductCard)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-12 text-center">
              <p className="font-heading text-lg font-bold text-brand-primary">New products coming soon</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                We are adding imports to the shop. Browse categories above or contact us if you already know what you need.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/shop"
                  prefetch
                  className="btn-interactive inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90"
                >
                  Browse shop
                </Link>
                <Link
                  href="/contact"
                  prefetch
                  className="btn-interactive inline-flex min-h-[44px] items-center justify-center rounded-xl border border-brand-primary/15 bg-white px-5 py-2.5 text-sm font-bold text-brand-primary shadow-sm hover:border-brand-accent/40 hover:text-brand-accent"
                >
                  Contact us
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <ImportJourneyTimeline />

      <ImportCta whatsAppHref={waHeroPrefilled || undefined} />
    </main>
  );
}


