import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { commerce } from '../../commerce/adapter';
import { useCart } from '../../commerce/cart';
import { getProduct, PRODUCTS, productUrl, src } from '../../commerce/catalog';
import { formatINR, unitPrice } from '../../commerce/pricing';
import { CartLineItem, CartSummary } from '../../components/commerce/CartParts';
import Icon from '../../components/ui/Icon';
import { Crumbs } from '../../components/ui/PageHero';
import { Note } from '../../components/ui/primitives';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';

export function PromoField() {
  const [msg, setMsg] = useState<{ tone: 'error' | 'preview'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get('code') || '');
    setBusy(true);
    const r = await commerce.validatePromo(code);
    setBusy(false);
    if (!r.ok) setMsg({ tone: r.reason === 'invalid' ? 'error' : 'preview', text: r.message });
  };
  return (
    <div className="stack-sm">
      <form className="promo" onSubmit={onSubmit}>
        <label htmlFor="promo" className="sr-only">
          Promo code
        </label>
        <input id="promo" name="code" className="input" placeholder="Promo code" autoComplete="off" />
        <button className="btn btn--ghost" disabled={busy}>
          {busy ? '…' : 'Apply'}
        </button>
      </form>
      {msg && <Note tone={msg.tone}>{msg.text}</Note>}
      <p className="t-xs muted">
        Offers are subject to the <Link to="/ellura/policies/offer-terms" className="link">Offers &amp; Promotions Terms</Link>.
      </p>
    </div>
  );
}

export default function Cart() {
  const { lines, totals } = useCart();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useMeta({ title: 'Your cart', description: 'Review the ellura® products in your cart.', noindex: true });

  return (
    <div ref={ref} className="page-top section" style={{ paddingTop: undefined }}>
      <div className="wrap">
        <Crumbs items={[{ label: 'ellura', to: '/ellura' }, { label: 'Cart' }]} />
        <h1 className="t-d1" data-split="load" style={{ margin: '18px 0 36px' }}>
          Your cart
        </h1>

        {lines.length === 0 ? (
          <div className="rv__empty" data-fade="load">
            <Icon name="bag" size={30} />
            <p className="t-h4">Your cart is empty.</p>
            <p className="muted">Start with a 30-capsule bottle — one capsule a day.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to={productUrl(PRODUCTS[0])} className="btn">
                Shop 30 capsules
              </Link>
              <Link to="/ellura/shop" className="btn btn--ghost">
                See all packs
              </Link>
            </div>
          </div>
        ) : (
          <div className="cartpage">
            <div>
              {totals.hasOneTime && (
                <Note className="" tone="info">
                  Switch any item to <strong>Subscribe &amp; Save</strong> to save 10% and get free shipping on every delivery.
                </Note>
              )}
              <ul role="list" className="cart-lines" style={{ marginTop: 12 }}>
                {lines.map((l) => {
                  const p = getProduct(l.sku);
                  return p ? (
                    <li key={l.id}>
                      <CartLineItem line={l} product={p} />
                    </li>
                  ) : null;
                })}
              </ul>
              <Link to="/ellura/shop" className="text-link" style={{ marginTop: 20 }}>
                <Icon name="arrowLeft" /> Continue shopping
              </Link>
            </div>
            <aside className="cartpage__aside card" aria-label="Order summary">
              <h2 className="t-h4">Order summary</h2>
              <CartSummary totals={totals} />
              <PromoField />
              <button className="btn btn--lg btn--block" onClick={() => navigate('/ellura/checkout')}>
                <Icon name="lock" /> Checkout · {formatINR(totals.subtotal)}
              </button>
              <ul role="list" className="stack-sm t-xs muted" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>
                  <Icon name="truck" size={14} /> Subscriptions ship free. One-time shipping is calculated at checkout.
                </li>
                <li>
                  <Icon name="repeat" size={14} /> Pause, skip or cancel a subscription anytime.
                </li>
                <li>
                  <Icon name="shield" size={14} /> See our <Link to="/ellura/policies/returns" className="link">returns policy</Link>.
                </li>
              </ul>
            </aside>
          </div>
        )}

        {lines.length > 0 && (
          <section style={{ marginTop: 72 }} aria-labelledby="also">
            <h2 id="also" className="t-h4" style={{ marginBottom: 16 }}>
              Other packs
            </h2>
            <div className="search__products" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', display: 'grid' }}>
              {PRODUCTS.filter((p) => !lines.some((l) => l.sku === p.sku)).map((p) => {
                const pr = unitPrice(p, 'one-time');
                return (
                  <Link key={p.sku} to={productUrl(p)} className="mini-product">
                    <img src={src(p.images[0])} alt="" width={72} height={72} />
                    <span>
                      <strong>{p.packLabel}</strong>
                      <span className="muted t-sm">
                        {p.supply} · {pr !== null ? formatINR(pr) : 'Price at launch'}
                      </span>
                    </span>
                    <Icon name="arrow" size={18} />
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
