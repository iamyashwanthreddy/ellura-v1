import type { AdapterResult, CartLine, CheckoutDetails, OrderSummary } from './types';
import { computeTotals, unitPrice } from './pricing';
import { getProduct } from './catalog';

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  COMMERCE INTEGRATION POINT
 * ─────────────────────────────────────────────────────────────────────────
 * Every network-backed action on the site goes through this interface.
 * The e-commerce platform and payment gateway are still to be confirmed by
 * the web vendor (CSV: Checkout row), so the default `previewAdapter` below
 * never charges anyone and never creates a real order. It returns results
 * flagged `preview: true` and the UI labels them accordingly.
 *
 * To go live, implement CommerceAdapter against the chosen platform
 * (e.g. a headless storefront API + an Indian payment gateway) and export it
 * as `commerce` instead of `previewAdapter`.
 */
export interface CommerceAdapter {
  readonly connected: boolean;
  /** Creates the order / payment session. Real adapters redirect to the gateway. */
  placeOrder(lines: CartLine[], details: CheckoutDetails): Promise<AdapterResult<OrderSummary>>;
  validatePromo(code: string): Promise<AdapterResult<{ label: string; amount: number }>>;
  trackOrder(reference: string, contact: string): Promise<AdapterResult<{ status: string }>>;
  signIn(email: string, password: string): Promise<AdapterResult>;
  register(name: string, email: string, password: string): Promise<AdapterResult>;
  subscribeNewsletter(email: string): Promise<AdapterResult>;
  notifyWhenAvailable(sku: string, email: string): Promise<AdapterResult>;
  submitReview(input: { sku: string; rating: number; title: string; body: string; name: string; email: string }): Promise<AdapterResult>;
  submitSupport(input: { name: string; email: string; topic: string; order?: string; message: string }): Promise<AdapterResult>;
}

const wait = (ms = 650) => new Promise((r) => setTimeout(r, ms));

const notConnected = (what: string): AdapterResult<never> => ({
  ok: false,
  reason: 'not-connected',
  message: `${what} will be available once the store platform is connected.`,
});

function reference() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `PREVIEW-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export const previewAdapter: CommerceAdapter = {
  connected: false,

  async placeOrder(lines, details) {
    await wait(900);
    const totals = computeTotals(lines);
    const summary: OrderSummary = {
      reference: reference(),
      preview: true,
      placedAt: new Date().toISOString(),
      email: details.email,
      city: details.address.city,
      totals,
      lines: lines.flatMap((l) => {
        const p = getProduct(l.sku);
        const unit = p ? unitPrice(p, l.purchase) : null;
        return p && unit !== null ? [{ name: p.shortName, packLabel: p.packLabel, qty: l.qty, purchase: l.purchase, lineTotal: unit * l.qty }] : [];
      }),
    };
    return { ok: true, data: summary, preview: true };
  },

  async validatePromo(code) {
    await wait(400);
    if (!code.trim()) return { ok: false, reason: 'invalid', message: 'Enter a code.' };
    // No India promo codes have been supplied. Codes are validated by the
    // commerce platform once connected.
    return { ok: false, reason: 'not-connected', message: 'Promo codes are applied at checkout once the store is live.' };
  },

  async trackOrder() {
    await wait();
    return notConnected('Order tracking');
  },
  async signIn() {
    await wait();
    return notConnected('Customer accounts');
  },
  async register() {
    await wait();
    return notConnected('Customer accounts');
  },
  async subscribeNewsletter() {
    await wait();
    return { ok: true, data: undefined, preview: true };
  },
  async notifyWhenAvailable() {
    await wait();
    return { ok: true, data: undefined, preview: true };
  },
  async submitReview() {
    await wait();
    return { ok: true, data: undefined, preview: true };
  },
  async submitSupport() {
    await wait();
    return { ok: true, data: undefined, preview: true };
  },
};

export const commerce: CommerceAdapter = previewAdapter;
