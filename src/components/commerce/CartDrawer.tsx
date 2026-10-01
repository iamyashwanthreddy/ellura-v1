import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { getProduct, productUrl, PRODUCTS, src } from '../../commerce/catalog';
import { formatINR, unitPrice } from '../../commerce/pricing';
import { gsap, useGSAP, reducedMotion } from '../../lib/gsap';
import { useDialog } from '../../lib/useDialog';
import { inert } from '../../lib/a11y';
import Icon from '../ui/Icon';
import { CartLineItem, CartSummary } from './CartParts';

export default function CartDrawer() {
  const { open, setOpen, lines, totals } = useCart();
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline>();
  const navigate = useNavigate();

  useDialog(open, panel, () => setOpen(false), closeBtn);

  useGSAP(
    () => {
      const rm = reducedMotion();
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .set(root.current, { visibility: 'visible' })
        .fromTo('.drawer__backdrop', { opacity: 0 }, { opacity: 1, duration: rm ? 0 : 0.4, ease: 'power2.out' }, 0)
        .fromTo(panel.current, { xPercent: 104 }, { xPercent: 0, duration: rm ? 0 : 0.75 }, 0);
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!tl.current) return;
      if (open) {
        tl.current.timeScale(1).play();
        if (!reducedMotion())
          gsap.fromTo('.drawer__stagger', { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.05, delay: 0.16, ease: 'expo.out' });
      } else tl.current.timeScale(1.8).reverse();
    },
    { dependencies: [open], scope: root },
  );

  const recommend = PRODUCTS.find((p) => p.price !== null);

  return (
    <div ref={root} className="drawer" style={{ visibility: 'hidden' }} {...inert(!open)} aria-hidden={!open}>
      <div className="drawer__backdrop" onClick={() => setOpen(false)} />
      <aside ref={panel} className="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="drawer__head drawer__stagger">
          <h2 id="cart-title" className="t-h4">
            Your cart <span className="drawer__count">{totals.itemCount}</span>
          </h2>
          <button ref={closeBtn} className="icon-btn" onClick={() => setOpen(false)} aria-label="Close cart">
            <Icon name="close" />
          </button>
        </header>

        {totals.hasSubscription ? (
          <p className="drawer__banner drawer__stagger">
            <Icon name="truck" size={18} /> Your Subscribe &amp; Save items ship free.
          </p>
        ) : lines.length > 0 ? (
          <p className="drawer__banner drawer__stagger">
            <Icon name="repeat" size={18} /> Switch to Subscribe &amp; Save for 10% off and free shipping.
          </p>
        ) : null}

        <div className="drawer__body" data-lenis-prevent>
          {lines.length === 0 ? (
            <div className="drawer__empty drawer__stagger">
              <p className="t-h4">Your cart is empty.</p>
              <p className="muted">One capsule a day, 36 mg of soluble PACs. Start with a 30-capsule bottle.</p>
              {recommend && (
                <Link to={productUrl(recommend)} className="mini-product" onClick={() => setOpen(false)}>
                  <img src={src(recommend.images[0])} alt="" width={96} height={96} />
                  <span>
                    <strong>{recommend.shortName}</strong>
                    <span className="muted t-sm">
                      {recommend.supply} · {formatINR(unitPrice(recommend, 'one-time')!)}
                    </span>
                  </span>
                  <Icon name="arrow" size={18} />
                </Link>
              )}
              <Link to="/ellura/shop" className="btn btn--block" onClick={() => setOpen(false)}>
                Shop all packs
              </Link>
            </div>
          ) : (
            <ul role="list" className="cart-lines">
              {lines.map((l) => {
                const p = getProduct(l.sku);
                return p ? (
                  <li key={l.id} className="drawer__stagger">
                    <CartLineItem line={l} product={p} compact onNavigate={() => setOpen(false)} />
                  </li>
                ) : null;
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="drawer__foot drawer__stagger">
            <CartSummary totals={totals} compact />
            <button
              className="btn btn--block btn--lg"
              onClick={() => {
                setOpen(false);
                navigate('/ellura/checkout');
              }}
            >
              <Icon name="lock" /> Checkout · {formatINR(totals.subtotal)}
            </button>
            <Link to="/ellura/cart" className="drawer__viewcart" onClick={() => setOpen(false)}>
              View full cart
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
