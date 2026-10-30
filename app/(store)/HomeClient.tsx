'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import ProductCard, { type ColorVariant, getColorHex } from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useCMS } from '@/context/CMSContext';
import { buildWhatsAppHref } from '@/lib/store-config';

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

  // Always even count on the home grid so the last row is never half-empty (e.g. 5 → 4)
  const rawCategories = categories.filter((c: any) => !c.parent_id);
  const capped = rawCategories.slice(0, 8);
  const displayCategories =
    capped.length > 1 && capped.length % 2 === 1 ? capped.slice(0, -1) : capped;
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
      {/* Hero — side-by-side, glass accents */}
      <section className="hero-mesh relative text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-3 py-10 sm:px-6 md:py-24 lg:px-8">
          <div className="grid grid-cols-[1.3fr_1fr] items-stretch gap-3 sm:gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="relative z-10 py-1 sm:py-2 md:py-4">
              <p className="mb-2 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-brand-accent backdrop-blur-md sm:mb-3 sm:px-3 sm:text-xs">
                China to Ghana · Shop, pay, track
              </p>
              <h1 className="font-heading text-[1.4rem] font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
                Shop. Get your invoice. Track it to Ghana.
              </h1>
              <p className="mt-2.5 max-w-xl text-[12px] leading-relaxed text-white/80 sm:mt-4 sm:text-base sm:leading-relaxed">
                Pick from the products listed here. Pay with your invoice. Then follow your order
                from China to Ghana. No chasing for updates.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
                <Link
                  href="/shop"
                  prefetch
                  className="btn-premium inline-flex items-center rounded-xl bg-brand-accent px-4 py-2.5 text-xs font-semibold text-brand-primary shadow-[0_10px_28px_-10px_rgba(140,207,255,0.75)] hover:brightness-105 sm:px-6 sm:py-3 sm:text-base"
                >
                  Shop products
                </Link>
                <Link
                  href="/order-tracking"
                  prefetch
                  className="btn-premium inline-flex items-center rounded-xl border border-white/35 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md hover:border-white/55 hover:bg-white/16 sm:px-6 sm:py-3 sm:text-base"
                >
                  Track my order
                </Link>
              </div>
              <p className="mt-6 hidden text-sm leading-relaxed text-white/65 sm:block">
                Clear invoice. Pay your way. Real status until it reaches Ghana.
              </p>
            </div>

            <div className="relative z-0 h-full lg:min-h-[400px]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/25 shadow-[0_24px_60px_-20px_rgba(8,58,87,0.55)] ring-1 ring-brand-accent/25 lg:absolute lg:right-0 lg:top-1/2 lg:aspect-[4/3] lg:h-auto lg:w-[105%] lg:-translate-y-1/2">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
                  alt="Goods staged for China to Ghana shipping"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/35 via-transparent to-white/5" />
              </div>

              <div className="hero-glass-chip absolute -bottom-3 -left-3 rounded-xl px-2.5 py-2 sm:-bottom-5 sm:px-3.5 sm:py-2.5 lg:-bottom-6 lg:-left-6 lg:px-4 lg:py-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-accent/25 text-brand-accent sm:h-8 sm:w-8">
                    <i className="ri-ship-line text-base sm:text-lg" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[10px] font-medium text-brand-accent sm:text-xs">Status</p>
                    <p className="text-[10px] font-semibold leading-tight text-white sm:text-sm lg:text-base">
                      In Transit to Accra
                    </p>
                  </div>
                </div>
              </div>

              <div className="hero-glass-chip absolute -top-3 right-1 rounded-xl px-2 py-1.5 sm:-top-5 sm:right-2 sm:px-3 sm:py-2 lg:-top-6 lg:right-6">
                <div className="flex items-center gap-2">
                  <i className="ri-shield-check-line text-sm text-brand-accent sm:text-base" aria-hidden />
                  <p className="text-[10px] font-semibold text-white sm:text-xs lg:text-sm">
                    Verified Supplier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories — 2-col on phone; count kept even so no orphan cell */}
      <section className="border-b border-slate-200/80 bg-white py-7 sm:py-12 md:py-16 lg:py-20">
        <div className="store-container">
          <div className="mb-4 flex items-end justify-between gap-3 md:mb-7">
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
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-accent px-5 text-sm font-bold text-brand-primary"
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

      <ImportCta whatsAppHref={waHeroPrefilled || undefined} />
    </main>
  );
}
