import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { formatINR } from '../../commerce/pricing';
import { CartSummary } from '../../components/commerce/CartParts';
import Icon from '../../components/ui/Icon';
import { Note } from '../../components/ui/primitives';
import { gsap, useGSAP, reducedMotion } from '../../lib/gsap';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';

export default function OrderConfirmed() {
  const { lastOrder } = useCart();
  const order = lastOrder();
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useMeta({ title: 'Order confirmed', description: 'Thank you for your ellura® order.', noindex: true });

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo('.confirm__check', { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 1, ease: 'elastic.out(1, 0.55)', delay: 0.3 });
      gsap.fromTo('.confirm__check path', { strokeDasharray: 30, strokeDashoffset: 30 }, { strokeDashoffset: 0, duration: 0.6, delay: 0.75, ease: 'power2.out' });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="page-top section">
      <div className="wrap wrap--narrow confirm">
        <span className="confirm__check">
          <Icon name="check" />
        </span>
        {order ? (
          <>
            <p className="eyebrow" data-fade="load">
              Order {order.reference}
            </p>
            <h1 className="t-d1 accent-em" data-split="load">
              Thank you. <em>Your ritual starts here.</em>
            </h1>
            {order.preview && (
              <Note tone="preview">
                <strong>Preview confirmation.</strong> The store isn’t connected to a payment gateway yet, so no payment was taken and no order was created. This is how
                the confirmation page will look at launch.
              </Note>
            )}
            <p className="t-lead" data-fade="load">
              We’ll email a confirmation to <strong>{order.email}</strong> and send tracking details as soon as your order ships.
            </p>
            <div className="card" style={{ width: '100%', textAlign: 'left' }} data-fade="load">
              <h2 className="t-h4" style={{ marginBottom: 14 }}>
                Order summary
              </h2>
              <ul className="mini-lines" role="list" style={{ marginBottom: 16 }}>
                {order.lines.map((l, i) => (
                  <li key={i} style={{ gridTemplateColumns: '1fr auto' }}>
                    <span>
                      <strong>
                        {l.qty} × {l.name} · {l.packLabel}
                      </strong>
                      <br />
                      <span className="t-xs muted">{l.purchase === 'subscription' ? 'Subscribe & Save' : 'One-time purchase'}</span>
                    </span>
                    <strong>{formatINR(l.lineTotal)}</strong>
                  </li>
                ))}
              </ul>
              <CartSummary totals={order.totals} />
            </div>
          </>
        ) : (
          <>
            <h1 className="t-d2" data-split="load">
              No recent order found
            </h1>
            <p className="t-lead">If you’ve just placed an order, check your email for the confirmation, or track it below.</p>
          </>
        )}

        <ol className="timeline" role="list" data-stagger>
          <li>
            <span className="t-mono">01 · Now</span>
            <strong>Confirmation email</strong>
            <span className="t-sm muted">Your order details and reference number.</span>
          </li>
          <li>
            <span className="t-mono">02 · Dispatch</span>
            <strong>Tracking link</strong>
            <span className="t-sm muted">Sent by email when your parcel ships.</span>
          </li>
          <li>
            <span className="t-mono">03 · Delivery</span>
            <strong>One capsule a day</strong>
            <span className="t-sm muted">Take it with water at the same time each day.</span>
          </li>
          <li>
            <span className="t-mono">04 · Anytime</span>
            <strong>Manage subscriptions</strong>
            <span className="t-sm muted">Skip, pause or cancel from your account.</span>
          </li>
        </ol>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/ellura/track-order" className="btn">
            Track your order
          </Link>
          <Link to="/ellura/learn" className="btn btn--ghost">
            Read the Urinary Health Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
