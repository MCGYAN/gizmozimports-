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
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  PackageSearch,
} from 'lucide-react';

const ImportJourneyTimeline = dynamic(() => import('@/components/store/ImportJourneyTimeline'), { loading: () => null });
const ImportCta = dynamic(() => import('@/components/store/ImportCta'), { loading: () => null });

const SOURCING_DESK_LINES = [
  { code: '01', name: 'Gadgets & Electronic Products', note: 'Phones, laptops, accessories & smart devices' },
  { code: '02', name: 'Construction Equipment', note: 'Site machinery, power tools & building gear' },
  { code: '03', name: 'Auto & Auto Parts', note: 'Replacement parts, diagnostics & accessories' },
  { code: '04', name: 'Stationery', note: 'Office, school & commercial paper supplies' },
  { code: '05', name: 'Laboratory Experiment Equipment', note: 'Lab instruments, glassware & school kits' },
  { code: '06', name: 'Home Appliances', note: 'Kitchen, laundry & cooling appliances' },
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
    <main className="min-h-screen bg-white">
      {/* Hero — asymmetric freight & sourcing desk */}
      <section className="hero-mesh relative overflow-hidden border-b border-slate-900/20 text-white">
        <div className="store-container relative py-9 sm:py-14 md:py-20">
          {/* Corridor manifest bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3.5 text-xs text-blue-100/80 sm:mb-10">
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-2 w-2 rounded-full bg-brand-accent" aria-hidden />
              <span className="font-medium text-white">Guangzhou / Yiwu → Tema &amp; Accra</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
              <span>Pay in GH¢ (MoMo &amp; GCB)</span>
              <span className="text-white/25" aria-hidden>|</span>
              <Link href="/order-tracking" className="inline-flex items-center gap-1 font-medium text-white underline-offset-4 hover:underline">
                <PackageSearch className="h-3.5 w-3.5 text-brand-accent" />
                Track an order
              </Link>
            </div>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h1 className="font-heading text-[1.85rem] font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.35rem]">
                Direct China sourcing &amp; freight built for buyers in Ghana.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100/90 sm:mt-5 sm:text-base md:text-lg">
                Order ready-to-ship imports online or send our desk a product photo for custom factory sourcing. You see the full landed cost in Cedis before money moves.
              </p>

              {/* Clear primary action + understated secondary action */}
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                <Link
                  href="/shop"
                  prefetch
                  className="btn-premium inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 sm:min-h-[50px] sm:px-7 sm:text-base"
                >
                  Browse the shop
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {waHeroPrefilled ? (
                  <a
                    href={waHeroPrefilled}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-medium text-white/95 transition-colors hover:border-white/50 hover:bg-white/5 sm:min-h-[50px] sm:px-5"
                  >
                    <i className="ri-whatsapp-line text-base text-[#25D366]" aria-hidden />
                    Request custom sourcing
                  </a>
                ) : (
                  <Link
                    href="/what-we-source"
                    prefetch
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-medium text-white/95 transition-colors hover:border-white/50 hover:bg-white/5 sm:min-h-[50px] sm:px-5"
                  >
                    See what we source
                  </Link>
                )}
              </div>

              {/* Grounded operational ledger instead of floating badges */}
              <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-5 sm:mt-10 sm:gap-6 sm:pt-6">
                <div>
                  <dt className="text-[11px] text-blue-200/65 sm:text-xs">Supplier check</dt>
                  <dd className="mt-0.5 font-heading text-xs font-semibold text-white sm:text-sm">
                    Specs &amp; quote verified first
                  </dd>
                </div>
                <div className="border-l border-white/15 pl-3 sm:pl-6">
                  <dt className="text-[11px] text-blue-200/65 sm:text-xs">Freight options</dt>
                  <dd className="mt-0.5 font-heading text-xs font-semibold text-white sm:text-sm">
                    Air express &amp; sea container
                  </dd>
                </div>
                <div className="border-l border-white/15 pl-3 sm:pl-6">
                  <dt className="text-[11px] text-blue-200/65 sm:text-xs">Settlement</dt>
                  <dd className="mt-0.5 font-heading text-xs font-semibold text-white sm:text-sm">
                    MTN MoMo &amp; GCB Bank
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-5">
              <figure className="overflow-hidden rounded-lg border border-white/15 bg-[#0f1f4b]">
                <div className="aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
                    alt="Container cargo staged for China to Ghana freight"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 text-xs text-blue-100/80">
                  <span>Consolidated air &amp; sea cargo</span>
                  <Link href="/pricing-guide" className="font-medium text-white hover:text-brand-accent">
                    See landed-cost guide →
                  </Link>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="store-section border-b border-slate-200 bg-white">
        <div className="store-container">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-5 md:mb-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold text-brand-accent">Store catalogue</p>
              <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-brand-primary md:text-3xl">
                Shop by Category
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 md:text-base">
                Browse active categories in the store or send us a sourcing request for custom goods.
              </p>
            </div>
            {hasCategories ? (
              <div className="flex w-full flex-wrap items-center gap-2.5 md:w-auto md:justify-end">
                <div className="hidden gap-2 md:flex lg:hidden">
                  <button
                    type="button"
                    onClick={() => scrollCategorySlider('left')}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-brand-primary hover:border-brand-primary/40"
                    aria-label="Scroll categories left"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCategorySlider('right')}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-brand-primary hover:border-brand-primary/40"
                    aria-label="Scroll categories right"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <Link
                  href="/categories"
                  prefetch
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-primary transition-colors hover:border-brand-primary"
                >
                  All categories
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <Link
                href="/what-we-source"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-accent"
              >
                Full sourcing list
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {hasCategories ? (
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
          ) : (
            <div className="border border-slate-200 bg-[#f8fafc]">
              <div className="flex flex-col justify-between gap-2 border-b border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                <div>
                  <p className="font-heading text-base font-bold text-brand-primary">
                    Catalogue categories are being stocked
                  </p>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    While store shelves load, our China sourcing desk actively quotes these six lines every day:
                  </p>
                </div>
                {waHeroPrefilled ? (
                  <a
                    href={waHeroPrefilled}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand-accent hover:underline sm:text-sm"
                  >
                    Ask for a quote on WhatsApp →
                  </a>
                ) : null}
              </div>
              <div className="grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
                {SOURCING_DESK_LINES.map((item, idx) => (
                  <div
                    key={item.code}
                    className={`flex items-start gap-3.5 p-5 ${
                      idx % 2 === 1 ? 'sm:border-l sm:border-slate-200' : ''
                    } ${idx >= 2 ? 'sm:border-t sm:border-slate-200' : ''} ${
                      idx % 3 !== 0 ? 'lg:border-l lg:border-slate-200' : 'lg:border-l-0'
                    } ${idx >= 3 ? 'lg:border-t lg:border-slate-200' : 'lg:border-t-0'}`}
                  >
                    <span className="mt-0.5 font-mono text-xs font-semibold text-brand-accent">
                      {item.code}
                    </span>
                    <div>
                      <p className="font-heading text-sm font-bold text-brand-primary">{item.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured products */}
      <section className="store-section border-b border-slate-200 bg-[#f8fafc]">
        <div className="store-container">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:mb-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold text-brand-accent">Ready to order</p>
              <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-brand-primary md:text-3xl">
                Featured products
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                Clear Cedi pricing up front. Pay online under GH¢ 2,000 or request an invoice for larger orders.
              </p>
            </div>
            <Link
              href="/shop"
              prefetch
              className="inline-flex min-h-[40px] w-fit items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-brand-primary transition-colors hover:border-brand-primary"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {hasFeaturedProducts ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {featuredProducts.map(renderProductCard)}
            </div>
          ) : (
            <div className="flex flex-col items-start justify-between gap-6 border border-slate-200 bg-white p-6 sm:p-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <p className="font-heading text-lg font-bold text-brand-primary">
                  New shipment listings are being added
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  You do not have to wait for a listing to import. Send us a link, photo, or specification sheet and we will prepare a supplier quote for you.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/shop"
                  prefetch
                  className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#172554]"
                >
                  Open shop
                </Link>
                <Link
                  href="/contact"
                  prefetch
                  className="inline-flex min-h-[42px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-primary hover:border-brand-primary"
                >
                  Request a quote
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
