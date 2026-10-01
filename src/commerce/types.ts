/* Commerce domain types. UI components depend on these, never on a vendor SDK. */

export type PurchaseType = 'one-time' | 'subscription';

export interface ProductImage {
  /** Base path without the width suffix, e.g. /images/pack-30 → pack-30-700.webp / -1400.webp */
  base: string;
  alt: string;
  /** Available widths generated in public/images. */
  widths: [number, number];
}

export interface SubscriptionTerms {
  eligible: boolean;
  /** Delivery interval in months (matches the pack's supply). */
  intervalMonths?: number;
}

export interface Product {
  sku: string;
  /** URL segment: /ellura/products/:handle */
  handle: string;
  name: string;
  shortName: string;
  packLabel: string;
  capsules: number;
  supply: string;
  bottles: number;
  /** Selling price in INR. `null` = not yet announced (cannot be added to cart). */
  price: number | null;
  /** MRP in INR (inclusive of all taxes). */
  mrp: number | null;
  subscription: SubscriptionTerms;
  images: ProductImage[];
  summary: string;
  badge?: string;
}

export interface CartLine {
  id: string; // sku + purchase type
  sku: string;
  qty: number;
  purchase: PurchaseType;
}

export interface CartTotals {
  itemCount: number;
  /** Sum of MRP for the lines that have one. */
  mrpTotal: number;
  /** What the customer pays for products before shipping. */
  subtotal: number;
  /** MRP savings + subscription savings. */
  savings: number;
  subscriptionSavings: number;
  /** null = calculated at checkout (rates not yet confirmed). */
  shipping: number | null;
  hasSubscription: boolean;
  hasOneTime: boolean;
}

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutDetails {
  email: string;
  marketingOptIn: boolean;
  address: Address;
  paymentMethod: string;
}

export interface OrderSummary {
  reference: string;
  /** true while no commerce backend is connected — nothing was charged. */
  preview: boolean;
  placedAt: string;
  lines: { name: string; packLabel: string; qty: number; purchase: PurchaseType; lineTotal: number }[];
  totals: CartTotals;
  email: string;
  city?: string;
}

export type AdapterResult<T = undefined> =
  | { ok: true; data: T; preview?: boolean }
  | { ok: false; reason: 'not-connected' | 'invalid' | 'error'; message: string };
