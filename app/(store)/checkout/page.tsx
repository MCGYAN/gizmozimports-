'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { useRouter } from 'next/navigation';
import OrderSummary from '@/components/OrderSummary';
import InvoiceDocument from '@/components/InvoiceDocument';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { usePageTitle } from '@/hooks/usePageTitle';
import { executeRecaptcha } from '@/lib/recaptcha';
import { downloadElementAsPdf } from '@/lib/download-pdf';
import { ShoppingCart, ArrowLeft, UserCircle } from 'lucide-react';
import { resolveCheckoutPaymentChannel } from '@/lib/payment-routing';
import { resolveCheckoutShippingLabel } from '@/lib/product-commerce';

/** Contact details remembered locally so repeat buyers skip retyping. */
const CONTACT_STORAGE_KEY = 'gizmoz-checkout-contact';

/** Phones/tablets: skip auto PDF (Safari often hangs html2canvas). */
function shouldSkipAutoInvoicePdf(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return true;
  // iPadOS desktop-mode UA still has touch
  if (navigator.maxTouchPoints > 1 && /Mac/i.test(ua)) return true;
  return false;
}

/** Save invoice PDF in the same click flow as "Get invoice", before navigate. */
async function downloadInvoiceFromOrder(order: any, orderNumber: string): Promise<void> {
  const host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText = 'position:fixed;left:-10000px;top:0;width:794px;pointer-events:none;';
  document.body.appendChild(host);

  const root = createRoot(host);
  try {
    flushSync(() => {
      root.render(<InvoiceDocument order={order} />);
    });
    // Allow logo/layout to settle before capture
    await new Promise((r) => window.setTimeout(r, 400));
    const official = host.querySelector<HTMLElement>('.invoice-official');
    if (!official) {
      throw new Error('Invoice layout not ready');
    }
    await downloadElementAsPdf(official, `${orderNumber}.pdf`);
  } finally {
    root.unmount();
    host.remove();
  }
}

export default function CheckoutPage() {
  usePageTitle('Checkout');
  const router = useRouter();
  const { cart, subtotal: cartSubtotal, clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'moolre' | 'invoice'>('invoice');
  const [errors, setErrors] = useState<any>({});
  const [shippingLabel, setShippingLabel] = useState('After packing');

  // Restore remembered contact details, then let a signed-in session override email
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONTACT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setShippingData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore bad saved data
    }

    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setShippingData(prev => ({ ...prev, email: session.user.email || '' }));
      }
    }
    checkUser();
  }, []);

  // Shipping copy follows each product's import type (CIF/DDP = included)
  useEffect(() => {
    let cancelled = false;

    async function resolveShippingCopy() {
      if (!cart.length) {
        setShippingLabel('After packing');
        return;
      }

      const fromCart = cart.map((item) => item.importType || '');
      if (fromCart.every(Boolean)) {
        setShippingLabel(resolveCheckoutShippingLabel(fromCart));
        return;
      }

      const ids = [...new Set(cart.map((item) => item.id))];
      const { data, error } = await supabase
        .from('products')
        .select('id, metadata')
        .in('id', ids);

      if (cancelled) return;
      if (error || !data) {
        setShippingLabel(resolveCheckoutShippingLabel(fromCart));
        return;
      }

      const byId = new Map(
        data.map((row: any) => [row.id, String(row.metadata?.import_type || '')]),
      );
      const types = cart.map(
        (item) => item.importType || byId.get(item.id) || '',
      );
      setShippingLabel(resolveCheckoutShippingLabel(types));
    }

    void resolveShippingCopy();
    return () => {
      cancelled = true;
    };
  }, [cart]);

  const subtotal = cartSubtotal;
  const shippingCost = 0;
  const tax = 0;
  const total = subtotal + shippingCost + tax;

  useEffect(() => {
    if (isLoading) return;
    setPaymentMethod(resolveCheckoutPaymentChannel(total));
  }, [total, isLoading]);

  const validate = () => {
    const newErrors: any = {};
    if (!shippingData.firstName) newErrors.firstName = 'First name is required';
    if (!shippingData.lastName) newErrors.lastName = 'Last name is required';
    if (!shippingData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(shippingData.email)) newErrors.email = 'Invalid email';
    if (!shippingData.phone) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const rememberContact = () => {
    try {
      localStorage.setItem(
        CONTACT_STORAGE_KEY,
        JSON.stringify({
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          email: shippingData.email,
          phone: shippingData.phone,
          address: shippingData.address,
          city: shippingData.city,
          region: shippingData.region,
        }),
      );
    } catch {
      // Storage full or blocked; not critical
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    if (!validate()) {
      // Jump to the first error so it is never off-screen
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsLoading(true);
    const channel = resolveCheckoutPaymentChannel(total);

    let recaptchaToken = '';
    const hasRecaptcha = typeof process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY === 'string' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY.length > 0;
    if (hasRecaptcha) {
      const token = await executeRecaptcha('checkout');
      recaptchaToken = token || '';
    }

    try {
      const placeRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recaptchaToken: recaptchaToken || '',
          shippingData,
          paymentMethod: channel,
          cart: cart.map((item: { id: string; name: string; variant?: string; variantId?: string; quantity: number; price: number; image?: string; slug?: string }) => ({
            id: item.id,
            name: item.name,
            variant: item.variant,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            slug: item.slug
          })),
          userId: user?.id ?? null
        })
      });

      const placeData = await placeRes.json();
      if (!placeRes.ok) {
        throw new Error(placeData.error || 'Failed to place order');
      }
      if (!placeData.success || !placeData.order || !placeData.orderNumber) {
        throw new Error('Invalid response from server');
      }

      rememberContact();

      const orderNumber = placeData.orderNumber as string;
      const paymentChannel = (placeData.paymentChannel || channel) as 'moolre' | 'invoice';

      if (paymentChannel === 'invoice') {
        // Desktop only: save PDF in this same click. Mobile/Safari often hangs
        // on html2canvas, which left the button stuck on Processing…
        const skipPdf = shouldSkipAutoInvoicePdf();
        let pdfSaved = false;
        if (!skipPdf) {
          try {
            await downloadInvoiceFromOrder(placeData.order, orderNumber);
            pdfSaved = true;
          } catch (pdfErr) {
            console.error('[checkout invoice pdf]', pdfErr);
            try {
              sessionStorage.setItem('gizmoz-auto-download-invoice', orderNumber);
            } catch {
              /* private mode etc. */
            }
          }
        }

        // Clear after PDF attempt so the banner cannot flip to MoMo mid-wait
        clearCart();

        const q = new URLSearchParams({ email: shippingData.email });
        if (!pdfSaved && !skipPdf) q.set('download', '1');
        router.push(`/order/${encodeURIComponent(orderNumber)}?${q.toString()}`);
        return;
      }

      try {
        const paymentRes = await fetch('/api/payment/moolre', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderNumber,
            amount: total,
            customerEmail: shippingData.email
          })
        });

        const paymentResult = await paymentRes.json();

        if (!paymentResult.success) {
          throw new Error(paymentResult.message || 'Payment initialization failed');
        }

        clearCart();
        window.location.href = paymentResult.url;
        return;
      } catch (paymentErr: any) {
        console.error('Payment Error:', paymentErr);
        alert('Failed to initialize payment: ' + paymentErr.message);
        setIsLoading(false);
        return;
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert('Failed to place order: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0 && !isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingCart className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some items to start the checkout process.</p>
          <Link href="/shop" className="inline-block bg-brand-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#111827] transition-colors">
            Return to Shop
          </Link>
        </div>
      </main>
    );
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-3.5 py-2.5 text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/25 ${hasError ? 'border-red-500' : 'border-slate-200'}`;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:py-8">
        <Link
          href="/cart"
          className="mb-4 inline-flex items-center text-sm font-medium text-slate-600 hover:text-brand-primary"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to cart
        </Link>

        <h1 className="font-heading text-xl font-bold text-brand-primary sm:text-3xl">Checkout</h1>
        <p className="mt-1 text-sm text-slate-500">Your details → invoice → pay.</p>

        {user && (
          <p className="mt-3 inline-flex max-w-full items-center gap-2 truncate rounded-lg bg-brand-light px-3 py-1.5 text-xs font-medium text-brand-primary sm:text-sm">
            <UserCircle className="h-4 w-4 shrink-0" />
            <span className="truncate">{user.email}</span>
          </p>
        )}

        <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-8 lg:grid-cols-3 lg:gap-8">
          <div className="order-1 lg:order-2 lg:col-span-1">
            <OrderSummary
              items={cart}
              subtotal={subtotal}
              shipping={shippingCost}
              tax={tax}
              total={total}
              shippingLabel={shippingLabel}
            />
          </div>

          <div className="order-2 space-y-4 lg:order-1 lg:col-span-2 lg:space-y-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-3 text-base font-bold text-brand-primary sm:mb-5 sm:text-xl">Your details</h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div data-error={Boolean(errors.firstName)}>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                      First name *
                    </label>
                    <input
                      type="text"
                      autoComplete="given-name"
                      value={shippingData.firstName}
                      onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                      className={inputClass(Boolean(errors.firstName))}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                  </div>
                  <div data-error={Boolean(errors.lastName)}>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Last name *
                    </label>
                    <input
                      type="text"
                      autoComplete="family-name"
                      value={shippingData.lastName}
                      onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                      className={inputClass(Boolean(errors.lastName))}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div data-error={Boolean(errors.email)}>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Email *
                    </label>
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={shippingData.email}
                      readOnly={!!user}
                      onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      className={`${inputClass(Boolean(errors.email))} ${user ? 'cursor-not-allowed bg-slate-50' : ''}`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                  <div data-error={Boolean(errors.phone)}>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      className={inputClass(Boolean(errors.phone))}
                      placeholder="024 123 4567"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-brand-accent/20 bg-brand-accent/5 px-3.5 py-3 text-xs leading-relaxed text-brand-primary sm:mt-5 sm:text-sm">
                You get an invoice with bank and MoMo details. Pay by transfer, then tap “I’ve paid”
                on your order page.
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="mt-3 flex w-full items-center justify-center rounded-xl bg-brand-primary py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#111827] disabled:opacity-70 sm:mt-4 sm:py-4 sm:text-base"
              >
                {isLoading ? (
                  <>
                    <svg className="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing…
                  </>
                ) : (
                  `Get invoice and pay · GH¢${total.toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
