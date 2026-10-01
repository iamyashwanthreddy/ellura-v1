import { getProduct, SUBSCRIPTION_DISCOUNT } from './catalog';
import type { CartLine, CartTotals, Product, PurchaseType } from './types';

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export const formatINR = (n: number) => inr.format(n);

export const isPurchasable = (p: Product) => p.price !== null;

export const canSubscribe = (p: Product) => p.subscription.eligible && isPurchasable(p);

/** Unit price for a purchase type. Subscription price rounds to the rupee. */
export function unitPrice(p: Product, purchase: PurchaseType): number | null {
  if (p.price === null) return null;
  if (purchase === 'subscription' && p.subscription.eligible) return Math.round(p.price * (1 - SUBSCRIPTION_DISCOUNT));
  return p.price;
}

export function mrpSaving(p: Product): number | null {
  if (p.price === null || p.mrp === null) return null;
  return Math.max(0, p.mrp - p.price);
}

export function computeTotals(lines: CartLine[]): CartTotals {
  let itemCount = 0;
  let mrpTotal = 0;
  let subtotal = 0;
  let subscriptionSavings = 0;
  let hasSubscription = false;
  let hasOneTime = false;
  for (const line of lines) {
    const p = getProduct(line.sku);
    if (!p) continue;
    const unit = unitPrice(p, line.purchase);
    if (unit === null || p.price === null) continue;
    itemCount += line.qty;
    mrpTotal += (p.mrp ?? p.price) * line.qty;
    subtotal += unit * line.qty;
    if (line.purchase === 'subscription') {
      hasSubscription = true;
      subscriptionSavings += (p.price - unit) * line.qty;
    } else hasOneTime = true;
  }
  return {
    itemCount,
    mrpTotal,
    subtotal,
    savings: Math.max(0, mrpTotal - subtotal),
    subscriptionSavings,
    // Subscriptions ship free (supplied reference). One-time shipping rates for
    // India are not confirmed, so they are shown as "calculated at checkout".
    shipping: hasOneTime ? null : hasSubscription ? 0 : 0,
    hasSubscription,
    hasOneTime,
  };
}
