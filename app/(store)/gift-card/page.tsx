import Link from 'next/link';

export default function GiftCardPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gsg-purple-light/20 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gsg-black mb-4">Gift Card</h1>
          <p className="text-gray-600">
            Give the gift of convenience. GSG Convenience Goods gift cards coming soon.
          </p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-card p-8 text-center">
          <p className="text-gray-600 mb-6">
            Purchase or redeem gift cards here once available.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-gsg-purple hover:bg-gsg-purple-dark text-white px-6 py-3 rounded-pill font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
