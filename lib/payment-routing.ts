import { STORE_CURRENCY, STORE_CURRENCY_SYMBOL, formatStoreMoney } from '@/lib/currency';

/**
 * Storefront checkout is invoice-only (bank / MoMo transfer on the invoice).
 * Live payment gateway is not used until business certification allows it.
 */

/** Kept for older env/docs references; routing no longer uses a threshold. */
export const INVOICE_PAYMENT_THRESHOLD = Number(
  process.env.NEXT_PUBLIC_INVOICE_PAYMENT_THRESHOLD || 2000,
);

export type CheckoutPaymentChannel = 'moolre' | 'invoice';

export function resolveCheckoutPaymentChannel(_cartTotal?: number): CheckoutPaymentChannel {
  return 'invoice';
}

export function formatMoney(amount: number, currency = STORE_CURRENCY): string {
  return formatStoreMoney(amount, currency);
}

export { STORE_CURRENCY, STORE_CURRENCY_SYMBOL };
