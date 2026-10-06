import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizmoz Trades Store',
  description: 'Clean online store for Gizmoz Trades: browse categories and featured products.',
};

export default function Home() {
  const categories = [
    { id: '1', name: 'Electronics', slug: 'electronics' },
    { id: '2', name: 'Home Appliances', slug: 'home-appliances' },
    { id: '3', name: 'Fashion', slug: 'fashion' },
    { id: '4', name: 'Beauty', slug: 'beauty' },
    { id: '5', name: 'Home & Living', slug: 'home-living' },
    { id: '6', name: 'Accessories', slug: 'accessories' },
    { id: '7', name: 'Kids', slug: 'kids' },
    { id: '8', name: 'Groceries', slug: 'groceries' },
  ];

  const featuredProducts = [
    { id: '1', name: 'Wireless Earbuds', price: 'GH₵199', href: '/shop' },
    { id: '2', name: 'Blender Pro 2L', price: 'GH₵349', href: '/shop' },
    { id: '3', name: 'Smart Watch', price: 'GH₵420', href: '/shop' },
    { id: '4', name: 'Travel Backpack', price: 'GH₵280', href: '/shop' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50/50">
      <section className="hero-mesh text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hero-glow rounded-card-lg border border-white/20 bg-white/10 backdrop-blur-md p-8 md:p-10 z-10">
              <p className="text-xs uppercase tracking-[0.22em] text-blue-100/90 mb-3">Affordable Online Store</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Import From China Without the Stress</h1>
              <p className="mt-4 text-blue-100 max-w-2xl">
                We source, pay, and deliver quality products to Ghana - safely and on time.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/shop" className="btn-premium inline-flex items-center rounded-pill bg-brand-accent px-6 py-3 font-semibold text-white hover:bg-orange-600">
                  Shop Now
                </Link>
                <Link href="/categories" className="btn-premium inline-flex items-center rounded-pill border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20">
                  Browse Categories
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block h-full min-h-[400px] z-0">
              {/* Main Image */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[105%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop" alt="Global Logistics" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay"></div>
              </div>
              
              {/* Floating Element 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.25)] animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/30">
                    <i className="ri-ship-line text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 uppercase tracking-wider font-semibold">Status</p>
                    <p className="font-bold text-white">In Transit to Accra</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute -top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.25)] animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <i className="ri-shield-check-fill text-green-400 text-xl"></i>
                  </div>
                  <p className="font-bold text-white text-sm">Verified Supplier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black">Browse Categories</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="card-premium rounded-card p-5"
              >
                <div className="h-10 w-10 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-4">
                  <i className="ri-shopping-bag-3-line text-lg" />
                </div>
                <p className="font-semibold text-brand-black">{category.name}</p>
                <p className="text-sm text-gray-500 mt-1">Shop this category</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-black">Featured Products</h2>
            <Link href="/shop" className="text-sm font-medium text-brand hover:underline">View all</Link>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={product.href} className="card-premium rounded-card bg-white p-5">
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200/80 mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.85),transparent_55%)]" />
                </div>
                <p className="font-semibold text-brand-black">{product.name}</p>
                <p className="text-sm text-gray-500 mt-1">{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-card-lg border border-slate-200 bg-white/80 backdrop-blur-sm p-8 text-center shadow-[0_25px_55px_-35px_rgba(15,23,42,0.35)]">
            <h3 className="text-2xl font-bold text-brand-black">Ready to shop?</h3>
            <p className="mt-2 text-gray-600">Browse all products and discover new arrivals.</p>
            <Link href="/shop" className="btn-premium mt-5 inline-flex items-center rounded-pill bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark">
              Go to Store
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
