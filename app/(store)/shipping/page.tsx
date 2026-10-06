import Link from 'next/link';

export default function ShippingPage() {
  const deliveryOptions = [
    { id: 'pickup', type: 'Pickup', time: 'Within 72hrs (excl. Sunday)', cost: 'As quoted', description: 'After confirmation. Pickup location shown at confirmation stage.', icon: 'ri-store-2-line' },
    { id: 'free-delivery', type: 'Free Delivery', time: 'Tue/Fri only', cost: 'FREE (min 5% discount)', description: 'Minimum 5% discount on total as Free Delivery Discount. Orders confirmed before noon of preceding delivery day; after noon delivered next available day.', icon: 'ri-truck-line' },
    { id: 'sole-express', type: 'Sole Express', time: 'Daily', cost: 'As quoted', description: 'Fresh produce/bakery/meat/frozen/seafood/fish/poultry MUST use Express. Delivery within 2hr, 6hr, 12hr, 24hr or 48hr after confirmation.', icon: 'ri-time-line' },
    { id: 'joint-express', type: 'Joint Express', time: 'Daily', cost: 'Shared fee', description: 'Share delivery fee with neighbor/colleague; items remain private. Same perishable rule. 2hr, 6hr, 12hr, 24hr or 48hr after confirmation.', icon: 'ri-group-line' },
  ];

  const zones = [
    {
      zone: 'Zone 1 - Accra Metro',
      areas: 'East Legon, Osu, Labone, Airport, Dzorwulu, Cantonments, Adabraka, Tema',
      standard: '1-2 days',
      express: 'Next day'
    },
    {
      zone: 'Zone 2 - Greater Accra',
      areas: 'Madina, Legon, Haatso, Achimota, Dansoman, Spintex, Teshie, Kasoa',
      standard: '2-3 days',
      express: 'Next day'
    },
    {
      zone: 'Zone 3 - Major Cities',
      areas: 'Kumasi, Takoradi, Cape Coast, Tamale, Sunyani, Ho, Koforidua',
      standard: '3-4 days',
      express: '1-2 days'
    },
    {
      zone: 'Zone 4 - Other Areas',
      areas: 'All other locations within Ghana',
      standard: '4-5 days',
      express: 'Not available'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-purple-light/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-6">Shipping & Delivery</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Pickup, free delivery (Tue/Fri), Sole Express, and Joint Express across Ghana.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Delivery Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryOptions.map((option) => (
              <div key={option.id} id={option.id} className="scroll-mt-24 bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-brand-purple hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-brand-purple-light/20 rounded-full flex items-center justify-center mb-6">
                  <i className={`${option.icon} text-2xl text-brand-purple`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.type}</h3>
                <div className="text-brand-purple font-bold mb-2">{option.cost}</div>
                <div className="text-gray-600 font-medium mb-4">{option.time}</div>
                <p className="text-gray-600 leading-relaxed text-sm">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-purple-light/20 border-2 border-brand-purple-light rounded-2xl p-8 mb-16 text-center">
          <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-gift-line text-3xl text-white"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Free Standard Shipping</h3>
          <p className="text-lg text-gray-600">
            Spend GHS 300 or more and get <span className="font-bold text-brand-purple">FREE standard delivery</span> anywhere in Ghana
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Delivery Zones & Timeframes</h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Zone</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Areas Covered</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Standard</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Express</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {zones.map((zone, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{zone.zone}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{zone.areas}</td>
                      <td className="px-6 py-4 text-gray-900">{zone.standard}</td>
                      <td className="px-6 py-4 text-gray-900">{zone.express}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Shipping Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-purple-light/30 rounded-full flex items-center justify-center">
                  <span className="font-bold text-brand-purple">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Order Processing</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Orders placed before 2pm are processed same day. We carefully pack your items and prepare them for dispatch.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-purple-light/30 rounded-full flex items-center justify-center">
                  <span className="font-bold text-brand-purple">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Dispatch</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your order is handed to our trusted delivery partner. You'll receive a tracking number via email and SMS.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-purple-light/30 rounded-full flex items-center justify-center">
                  <span className="font-bold text-brand-purple">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Track Your Order</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Use your tracking number to monitor your delivery in real-time. You'll get updates at each stage.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-purple-light/30 rounded-full flex items-center justify-center">
                  <span className="font-bold text-brand-purple">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Delivery</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our delivery partner will contact you before arrival. Sign for your package and enjoy your purchase!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Information</h2>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-time-line text-brand-purple"></i>
                  Cut-off Times
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Orders placed before 2pm are dispatched same day. Orders after 2pm are dispatched next business day.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-calendar-line text-brand-purple"></i>
                  Business Days
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Delivery timeframes exclude weekends and public holidays. We process orders Monday to Friday.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-phone-line text-brand-purple"></i>
                  Delivery Contact
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Our delivery partner will call you before arrival. Please ensure your phone number is correct and reachable.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-home-line text-brand-purple"></i>
                  Failed Deliveries
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  If you're unavailable, we'll attempt delivery twice. After that, the package is held at a collection point for 5 days.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-secure-payment-line text-brand-purple"></i>
                  Package Security
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  All packages are insured during transit. Report any damage or missing items within 48 hours of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Tracking</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Track your order anytime using your order number and email address. You'll see real-time updates including:
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-purple-light/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-checkbox-circle-line text-2xl text-brand-purple"></i>
              </div>
              <p className="font-medium text-gray-900">Order Confirmed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-purple-light/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-package-line text-2xl text-brand-purple"></i>
              </div>
              <p className="font-medium text-gray-900">Processing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-truck-line text-2xl text-purple-700"></i>
              </div>
              <p className="font-medium text-gray-900">Out for Delivery</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-purple-light/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-gift-line text-2xl text-brand-purple"></i>
              </div>
              <p className="font-medium text-gray-900">Delivered</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/order-tracking"
              className="inline-flex items-center gap-2 bg-brand-purple text-white px-8 py-4 rounded-full font-medium hover:bg-brand-purple-dark transition-colors whitespace-nowrap"
            >
              <i className="ri-map-pin-line"></i>
              Track Your Order
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help with Your Delivery?</h2>
          <p className="text-white/90 mb-6 leading-relaxed">
            Questions about shipping costs, delivery times, or tracking? Our customer service team is here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-brand-purple px-6 py-3 rounded-full font-medium hover:bg-brand-purple-light/20 transition-colors whitespace-nowrap"
            >
              Contact Support
            </Link>
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-full font-medium hover:bg-brand-purple-dark transition-colors whitespace-nowrap"
            >
              View FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
