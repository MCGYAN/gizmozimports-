import { ShieldCheck } from 'lucide-react';
import { formatStoreMoney } from '@/lib/currency';
import { cleanVariantDisplayLabel } from '@/lib/product-variants';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({ items, subtotal, shipping, tax, total }: OrderSummaryProps) {
  return (
    <div className="store-card sticky top-4 p-4 sm:p-6">
      <h2 className="mb-3 text-base font-bold text-gray-900 sm:mb-5 sm:text-xl">Your order</h2>

      <div className="mb-4 space-y-3 sm:mb-6 sm:space-y-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.variant || 'novar'}`} className="flex gap-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white sm:h-20 sm:w-20">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain object-center p-1"
              />
              <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500/80 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm sm:h-6 sm:w-6 sm:text-xs">
                {item.quantity}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-semibold text-brand-primary">{item.name}</h3>
              {item.variant && (
                <p className="mt-0.5 text-xs text-gray-500">{cleanVariantDisplayLabel(item.variant)}</p>
              )}
              <p className="mt-1 text-sm font-bold text-brand-accent">{formatStoreMoney(item.price)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-gray-200 pt-3 text-sm sm:space-y-3 sm:pt-4">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-semibold">{formatStoreMoney(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span className="font-semibold">
            {shipping === 0 ? 'After packing' : formatStoreMoney(shipping)}
          </span>
        </div>
      </div>

      <div className="mt-3 border-t border-gray-200 pt-3 sm:mt-4 sm:pt-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900 sm:text-lg">Total</span>
          <span className="text-xl font-bold text-brand-accent sm:text-2xl">{formatStoreMoney(total)}</span>
        </div>
      </div>

      <div className="mt-4 hidden items-center gap-2 rounded-lg border border-brand-primary/20 bg-brand-light p-3 text-brand-primary sm:mt-6 sm:flex sm:p-4">
        <ShieldCheck className="h-5 w-5 shrink-0" />
        <p className="text-sm font-semibold">Secure checkout</p>
      </div>
    </div>
  );
}
