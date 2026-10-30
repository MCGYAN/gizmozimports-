'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import ProductCard, { type ColorVariant, getColorHex } from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useCMS } from '@/context/CMSContext';
import { buildWhatsAppHref } from '@/lib/store-config';

const ImportJourneyTimeline = dynamic(() => import('@/components/store/ImportJourneyTimeline'), {
  loading: () => null,
});
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

  // Cap at even counts when possible so 2-col grids stay balanced (6 or 8 look clean)
  const rawCategories = categories.filter((c: any) => !c.parent_id);
  const displayCategories =
    rawCategories.length > 8
      ? rawCategories.slice(0, 8)
      : rawCategories.length === 7
        ? rawCategories.slice(0, 6)
        : rawCategories.slice(0, 8);
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
      {/* Hero — stacked on mobile, split on desktop */}
      <section className="hero-mesh relative overflow-hidden text-white">
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="z-10 order-1">
              <p className="mb-2 text-xs font-medium text-blue-100/90 sm:text-sm">
                China to Ghana · Shop, pay, track
              </p>
              <h1 className="font-heading text-[1.85rem] font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
                Shop. Get your invoice. Track it to Ghana.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100/95 sm:mt-4 sm:text-base">
                Pick from listed products. Pay with your invoice. Follow the order from China to
                Ghana.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                <Link
                  href="/shop"
                  prefetch
                  className="btn-premium inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-accent px-5 text-sm font-semibold text-white hover:bg-orange-600 sm:px-6 sm:text-base"
                >
                  Shop products
                </Link>
                <Link
                  href="/order-tracking"
                  prefetch
                  className="btn-premium inline-flex min-h-12 items-center justify-center rounded-xl border border-white/50 bg-transparent px-5 text-sm font-semibold text-white hover:bg-white/10 sm:px-6 sm:text-base"
                >
                  Track my order
                </Link>
              </div>
            </div>

            <div className="relative order-2 lg:min-h-[380px]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
                  alt="Goods staged for China to Ghana shipping"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-dark/25" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl border border-white/15 bg-[#172554]/90 px-3 py-2.5 backdrop-blur-sm sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-xs">
                  <i className="ri-ship-line text-lg text-white/90" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-blue-100/80">Live status</p>
                    <p className="truncate text-xs font-semibold text-white sm:text-sm">
                      In transit to Accra
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories — always 2 columns on phone so rows stay even */}
      <section className="border-b border-slate-200/80 bg-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="store-container">
          <div className="mb-5 flex items-end justify-between gap-3 md:mb-7">
            <div className="min-w-0">
              <h2 className="font-heading text-xl font-bold tracking-tight text-brand-primary sm:text-2xl md:text-[2.25rem]">
                Shop by category
              </h2>
              <p className="mt-1 text-sm text-slate-500 sm:mt-2">
                Tap a category. Order what is listed.
              </p>
            </div>
            {hasCategories ? (
              <Link
                href="/categories"
                prefetch
                className="shrink-0 text-sm font-bold text-brand-primary underline-offset-2 hover:text-brand-accent hover:underline"
              >
                See all
              </Link>
            ) : null}
          </div>

          {hasCategories ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
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
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-10 text-center">
              <p className="font-heading text-lg font-bold text-brand-primary">
                Categories coming soon
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Browse the shop for listed products, or contact us if you need help finding
                something.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured — 2-col on mobile (balanced for any count) */}
      <section className="border-b border-slate-200/80 bg-[#f8fafc] py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="store-container">
          <div className="mb-5 flex items-end justify-between gap-3 md:mb-7">
            <div className="min-w-0">
              <h2 className="font-heading text-xl font-bold tracking-tight text-brand-primary sm:text-2xl md:text-[2.25rem]">
                Featured products
              </h2>
              <p className="mt-1 text-sm text-slate-500 sm:mt-2">
                See the price. Order. Get your invoice and pay.
              </p>
            </div>
            <Link
              href="/shop"
              prefetch
              className="shrink-0 text-sm font-bold text-brand-primary underline-offset-2 hover:text-brand-accent hover:underline"
            >
              See all
            </Link>
          </div>

          {hasFeaturedProducts ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {featuredProducts.map(renderProductCard)}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center">
              <p className="font-heading text-lg font-bold text-brand-primary">
                New products coming soon
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Check the shop, or contact us if you need help.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center sm:gap-3">
                <Link
                  href="/shop"
                  prefetch
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-accent px-5 text-sm font-bold text-white"
                >
                  Browse shop
                </Link>
                <Link
                  href="/contact"
                  prefetch
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-brand-primary"
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
