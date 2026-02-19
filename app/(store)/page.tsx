'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import ProductCard, { type ColorVariant, getColorHex } from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton';
import AnimatedSection, { AnimatedGrid } from '@/components/AnimatedSection';
import { usePageTitle } from '@/hooks/usePageTitle';

const MAIN_GOODS_SLUGS = [
  'grocery', 'mobile', 'stationery', 'lighting-battery', 'food-items', 'nonfood-items',
  'personal-household-care', 'occasions-holidays', 'medicine',
];
const ESSENTIALS_SECTIONS = [
  { label: 'Pantry & Dry Goods', slug: 'pantry-dry-goods' },
  { label: 'Snacks & Confectionery', slug: 'snacks-confectionery' },
  { label: 'Beverages', slug: 'beverages' },
  { label: 'Personal Care', slug: 'personal-care' },
  { label: 'Household Essentials', slug: 'household-essentials' },
];

const DELIVERY_OPTIONS = [
  { id: 'pickup', title: 'Pickup', desc: 'Within 72hrs (excluding Sunday) after confirmation.', href: '/shipping#pickup', icon: 'ri-store-2-line' },
  { id: 'free', title: 'Free Delivery', desc: 'Tue/Fri only. Min 5% discount as Free Delivery Discount.', href: '/shipping#free-delivery', icon: 'ri-truck-line' },
  { id: 'sole', title: 'Sole Express', desc: 'Daily. Fresh/perishable must use Express. 2hr–48hr slots.', href: '/shipping#sole-express', icon: 'ri-time-line' },
  { id: 'joint', title: 'Joint Express', desc: 'Share fee with neighbor. Same perishable rule. 2hr–48hr.', href: '/shipping#joint-express', icon: 'ri-group-line' },
];

export default function Home() {
  usePageTitle('');
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes, allCatRes] = await Promise.all([
          supabase.from('products').select('*, product_variants(*), product_images(*)').eq('status', 'active').eq('featured', true).order('created_at', { ascending: false }).limit(12),
          supabase.from('categories').select('id, name, slug, image_url, metadata').eq('status', 'active').order('position').order('name'),
          supabase.from('categories').select('id, name, slug, image_url').eq('status', 'active').order('position').order('name'),
        ]);
        if (!productsRes.error) setFeaturedProducts(productsRes.data || []);
        const featured = (categoriesRes.data || []).filter((c: any) => c.metadata?.featured === true);
        setCategories(featured.length > 0 ? featured : (categoriesRes.data || []).slice(0, 8));
        setAllCategories(allCatRes.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const mainGoods = allCategories.filter((c) => MAIN_GOODS_SLUGS.some((s) => (c.slug || '').toLowerCase().includes(s))).slice(0, 11);
  const showMainGoods = mainGoods.length > 0 ? mainGoods : allCategories.slice(0, 10);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gsg-purple text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gsg-purple-dark/80 to-gsg-purple/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              GSG Convenience Goods
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Premium, trustworthy convenience shopping. Ghana-based. Modern e-commerce for your everyday needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-white text-gsg-purple px-8 py-4 rounded-pill font-bold hover:bg-gsg-accent hover:text-gsg-black transition-colors"
              >
                Start Shopping
              </Link>
              <Link
                href="/shipping"
                className="inline-flex items-center justify-center bg-white/20 text-white border-2 border-white px-8 py-4 rounded-pill font-bold hover:bg-white/30 transition-colors"
              >
                Explore Delivery Options
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/90">
              <span className="flex items-center gap-2"><i className="ri-secure-payment-line text-xl" /> Secure Checkout</span>
              <span className="flex items-center gap-2"><i className="ri-truck-line text-xl" /> Fast Delivery</span>
              <span className="flex items-center gap-2"><i className="ri-customer-service-2-line text-xl" /> Support 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery options strip */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gsg-black mb-8 text-center">Delivery Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DELIVERY_OPTIONS.map((opt) => (
              <Link
                key={opt.id}
                href={opt.href}
                className="bg-white rounded-card-lg p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all group"
              >
                <div className="w-12 h-12 rounded-card bg-gsg-purple-light/20 text-gsg-purple flex items-center justify-center mb-4 group-hover:bg-gsg-purple group-hover:text-white transition-colors">
                  <i className={`${opt.icon} text-2xl`} />
                </div>
                <h3 className="font-bold text-gsg-black mb-2">{opt.title}</h3>
                <p className="text-sm text-gray-600">{opt.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category showcase – Main Goods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gsg-black mb-8">Main Goods</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
            <Link href="/shop" className="shrink-0 w-40 md:w-auto rounded-card-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <i className="ri-shopping-bag-line text-4xl text-gsg-purple-light" />
              </div>
              <p className="p-3 font-bold text-gsg-black text-center text-sm">Grocery</p>
            </Link>
            <a href="https://shopper.gsgbrands.com.gh" target="_blank" rel="noopener noreferrer" className="shrink-0 w-40 md:w-auto rounded-card-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <i className="ri-user-star-line text-4xl text-gsg-purple-light" />
              </div>
              <p className="p-3 font-bold text-gsg-black text-center text-sm">My Personal Shopper</p>
            </a>
            {showMainGoods.slice(0, 9).map((cat) => (
              <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="shrink-0 w-40 md:w-auto rounded-card-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  {cat.image_url ? (
                    <Image src={cat.image_url} alt={cat.name} fill className="object-cover" sizes="160px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-archive-line text-4xl text-gsg-purple-light" />
                    </div>
                  )}
                </div>
                <p className="p-3 font-bold text-gsg-black text-center text-sm">{cat.name}</p>
              </Link>
            ))}
            <Link href="/categories" className="shrink-0 w-40 md:w-auto rounded-card-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow flex flex-col items-center justify-center aspect-square bg-gray-100">
              <i className="ri-more-line text-4xl text-gsg-purple" />
              <p className="p-3 font-bold text-gsg-black text-sm">More</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gsg-black mb-8">Featured Products</h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
              {featuredProducts.slice(0, 8).map((product) => {
                const variants = product.product_variants || [];
                const hasVariants = variants.length > 0;
                const minVariantPrice = hasVariants ? Math.min(...variants.map((v: any) => v.price || product.price)) : undefined;
                const totalVariantStock = hasVariants ? variants.reduce((s: number, v: any) => s + (v.quantity || 0), 0) : 0;
                const effectiveStock = hasVariants ? totalVariantStock : product.quantity;
                const colorVariants: ColorVariant[] = [];
                const seen = new Set<string>();
                for (const v of variants) {
                  const name = (v as any).option2;
                  if (name && !seen.has(name.toLowerCase().trim())) {
                    const hex = getColorHex(name);
                    if (hex) {
                      seen.add(name.toLowerCase().trim());
                      colorVariants.push({ name: name.trim(), hex });
                    }
                  }
                }
                return (
                  <div key={product.id} className="shrink-0 w-[280px] md:w-auto">
                    <ProductCard
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.compare_at_price}
                      image={product.product_images?.[0]?.url || 'https://via.placeholder.com/400x500'}
                      rating={product.rating_avg || 5}
                      reviewCount={product.review_count || 0}
                      badge={product.featured ? 'Featured' : undefined}
                      inStock={effectiveStock > 0}
                      maxStock={effectiveStock || 50}
                      moq={product.moq || 1}
                      hasVariants={hasVariants}
                      minVariantPrice={minVariantPrice}
                      colorVariants={colorVariants}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-flex items-center justify-center bg-gsg-purple text-white px-8 py-4 rounded-pill font-bold hover:bg-gsg-purple-dark transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Essentials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gsg-black mb-8">Shop by Essentials</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ESSENTIALS_SECTIONS.map((s) => {
              const cat = allCategories.find((c) => (c.slug || '').toLowerCase().includes(s.slug) || (c.name || '').toLowerCase().includes(s.label.toLowerCase().split(' ')[0]));
              const href = cat ? `/shop?category=${cat.slug}` : `/shop?category=${s.slug}`;
              return (
                <Link key={s.slug} href={href} className="rounded-card-lg border border-gray-200 p-6 text-center hover:shadow-md hover:border-gsg-purple-light/50 transition-all">
                  <i className="ri-shopping-cart-2-line text-3xl text-gsg-purple-light mb-2 block" />
                  <span className="font-bold text-gsg-black text-sm">{s.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo + Track order */}
      <section className="py-12 bg-gsg-purple-light/20 border-y border-gsg-purple-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gsg-black font-bold text-lg">🎁 Free gift for every purchase</p>
          <Link href="/order-tracking" className="inline-flex items-center justify-center bg-gsg-purple text-white px-6 py-3 rounded-pill font-medium hover:bg-gsg-purple-dark transition-colors">
            Track your order easily
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gsg-black text-white text-center">
        <p className="text-lg font-medium mb-2">Need help? WhatsApp & Telegram Active 24/7</p>
        <p className="text-white/80 text-sm">+233 (0) 246 033 792 · +233 (0) 579 033 792 · <a href="https://t.me/gsgbrandsgh" target="_blank" rel="noopener noreferrer" className="text-gsg-accent hover:underline">t.me/gsgbrandsgh</a></p>
      </section>
    </main>
  );
}
