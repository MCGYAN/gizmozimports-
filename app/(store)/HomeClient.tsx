'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ProductCard, { type ColorVariant, getColorHex } from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useCMS } from '@/context/CMSContext';
import { buildWhatsAppHref } from '@/lib/store-config';

const ImportCta = dynamic(() => import('@/components/store/ImportCta'), { loading: () => null });

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=75&w=900&auto=format&fit=crop';

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

  const renderProductCard = (product: any, index = 0) => {
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
          priority={index < 2}
        />
      </div>
    );
  };

  return (
    <main className="min-h-screen">
      {/* Hero — brand first; two small status tags on the image only */}
      <section className="hero-mesh relative text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="relative z-10 max-w-xl">
              <p className="font-heading text-sm font-semibold tracking-tight text-brand-accent sm:text-base">
                Gizmoz Trades
              </p>
              <h1 className="font-heading mt-3 text-[1.75rem] font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]">
                Buy from China the easy way.
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-white/80 sm:text-base">
                Pick what you want. Get a clear bill. Pay. Then watch it travel all the way to
                Ghana.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
                <Link href="/shop" prefetch className="hero-cta-primary">
                  Start shopping
                </Link>
                <Link href="/order-tracking" prefetch={false} className="hero-cta-secondary">
                  Track my order
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-white/15 sm:aspect-[4/3] lg:aspect-[5/4]">
                <Image
                  src={HERO_IMAGE}
                  alt="Warehouse goods ready for China to Ghana shipping"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={70}
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-primary/25 via-transparent to-transparent" />

                {/* Upper right */}
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg border border-white/20 bg-brand-primary/92 px-2.5 py-1.5 text-white backdrop-blur-sm sm:right-4 sm:top-4 sm:px-3 sm:py-2">
                  <i className="ri-shield-check-line text-sm text-brand-accent sm:text-base" aria-hidden />
                  <span className="text-[11px] font-semibold sm:text-xs">Verified supplier</span>
                </div>

                {/* Lower left */}
                <div className="absolute bottom-3 left-3 flex max-w-[85%] items-center gap-2.5 rounded-lg border border-white/20 bg-brand-primary/92 px-3 py-2 text-white backdrop-blur-sm sm:bottom-4 sm:left-4">
                  <i className="ri-ship-line text-base text-brand-accent" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-brand-accent">Status</p>
                    <p className="truncate text-xs font-semibold sm:text-sm">In transit to Accra</p>
                  </div>
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
              {featuredProducts.map((product, index) => renderProductCard(product, index))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center">
              <p className="font-heading text-lg font-bold text-brand-primary">
                New items are coming soon
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
                  Browse the shop
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
