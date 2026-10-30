'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import ProductCard, { type ColorVariant, getColorHex } from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useCMS } from '@/context/CMSContext';
import { buildWhatsAppHref } from '@/lib/store-config';

const ImportJourneyTimeline = dynamic(() => import('@/components/store/ImportJourneyTimeline'), { loading: () => null });
const ImportCta = dynamic(() => import('@/components/store/ImportCta'), { loading: () => null });

export default function HomeClient({
  featuredProducts,
  categories,
}: {
  featuredProducts: any[];
  categories: any[];
}) {
  usePageTitle('China to Ghana Imports');
  const { getSetting } = useCMS();

  const waHero = buildWhatsAppHref(getSetting('contact_whatsapp'));
  const waHeroPrefilled = waHero
    ? `${waHero}${waHero.includes('?') ? '&' : '?'}text=${encodeURIComponent('Hi Gizmoz Trades, I need help with an order on the website.')}`
    : '';

  const displayCategories = categories.filter((c: any) => !c.parent_id).slice(0, 8);
  const hasCategories = displayCategories.length > 0;
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
        <div className="relative mx-auto max-w-7xl px-3 py-10 sm:px-6 md:py-24 lg:px-8">
          <div className="grid grid-cols-[1.3fr_1fr] items-stretch gap-3 sm:gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="z-10 py-1 sm:py-2 md:py-4">
              <p className="mb-2 text-[11px] font-medium text-blue-100/85 sm:mb-3 sm:text-sm">
                China to Ghana. Shop, pay, track.
              </p>
              <h1 className="font-heading text-[1.35rem] font-bold leading-tight sm:text-4xl md:text-5xl">
                Shop. Get your invoice. Track it to Ghana.
              </h1>
              <p className="mt-2 max-w-2xl text-[11px] leading-snug text-blue-100 sm:mt-4 sm:text-base sm:leading-normal">
                Pick from the products listed here. Pay with your invoice. Then follow your order
                from China to Ghana. No chasing for updates.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                <Link
                  href="/shop"
                  prefetch
                  className="btn-premium inline-flex items-center rounded-xl bg-brand-accent px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600 sm:px-6 sm:py-3 sm:text-base"
                >
                  Shop products
                </Link>
                <Link
                  href="/order-tracking"
                  prefetch
                  className="btn-premium inline-flex items-center rounded-xl border border-white/60 bg-transparent px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 sm:px-6 sm:py-3 sm:text-base"
                >
                  Track my order
                </Link>
              </div>
              <p className="mt-6 hidden text-sm leading-relaxed text-blue-100/80 sm:block">
                Clear invoice. Pay your way. Real status until it reaches Ghana.
              </p>
            </div>

            <div className="relative z-0 h-full lg:min-h-[400px]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:absolute lg:right-0 lg:top-1/2 lg:aspect-[4/3] lg:h-auto lg:w-[105%] lg:-translate-y-1/2">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
                  alt="Goods staged for China to Ghana shipping"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-dark/20" />
              </div>

              <div className="absolute -bottom-3 -left-3 rounded-lg border border-white/20 bg-[#172554]/95 px-2.5 py-2 sm:-bottom-5 sm:px-3 sm:py-2.5 lg:-bottom-6 lg:-left-6 lg:px-4 lg:py-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <i className="ri-ship-line text-base text-white/90 sm:text-lg lg:text-xl" aria-hidden />
                  <div>
                    <p className="text-[10px] font-medium text-blue-100/80 sm:text-xs">Status</p>
                    <p className="text-[10px] font-semibold leading-tight text-white sm:text-sm lg:text-base">
                      In Transit to Accra
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 right-1 rounded-lg border border-white/20 bg-[#172554]/95 px-2 py-1.5 sm:-top-5 sm:right-2 sm:px-3 sm:py-2 lg:-top-6 lg:right-6">
                <div className="flex items-center gap-2">
                  <i className="ri-shield-check-line text-sm text-white/90 sm:text-base" aria-hidden />
                  <p className="text-[10px] font-semibold text-white sm:text-xs lg:text-sm">
                    Verified Supplier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="store-section border-b border-slate-200/80 bg-white">
        <div className="store-container">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 md:mb-7 md:flex-row md:items-end">
            <div>
              <h2 className="font-heading text-[1.75rem] font-bold tracking-tight text-brand-primary md:text-[2.25rem]">
                Shop by Category
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                Pick a category. Order from what is listed.
              </p>
            </div>
            {hasCategories ? (
              <Link
                href="/categories"
                prefetch
                className="btn-interactive inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-brand-primary/15 bg-white px-5 py-2.5 text-sm font-bold text-brand-primary shadow-sm hover:border-brand-accent/40 hover:text-brand-accent md:w-auto"
              >
                View all categories
              </Link>
            ) : null}
          </div>
          {hasCategories ? (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4 xl:gap-5">
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
          ) : (
            <div className="border border-slate-200 bg-slate-50 px-6 py-10 text-center rounded-2xl">
              <p className="font-heading text-lg font-bold text-brand-primary">Categories coming soon</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                Browse the shop for listed products, or contact us if you need help finding something.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured */}
      <section className="store-section border-b border-slate-200/80 bg-[#f8fafc]">
        <div className="store-container">
          <div className="mb-5 flex flex-col justify-between gap-4 md:mb-7 md:flex-row md:items-end">
            <div>
              <h2 className="font-heading text-[1.75rem] font-bold tracking-tight text-brand-primary md:text-[2.25rem] lg:text-[2.5rem]">
                Featured products
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 md:mt-3 md:text-base">
                See the price. Order. Get your invoice and pay.
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
            <div className="border border-slate-200 bg-white px-6 py-10 text-center rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)]">
              <p className="font-heading text-lg font-bold text-brand-primary">New products coming soon</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                New products are being added. Check the shop, or contact us if you need help.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/shop"
                  prefetch
                  className="btn-interactive inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-bold text-white"
                >
                  Browse shop
                </Link>
                <Link
                  href="/contact"
                  prefetch
                  className="btn-interactive inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-brand-primary hover:border-brand-accent/40 hover:text-brand-accent"
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


