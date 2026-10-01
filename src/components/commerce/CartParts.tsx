import { Link } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { productUrl, src } from '../../commerce/catalog';
import { canSubscribe, formatINR, unitPrice } from '../../commerce/pricing';
import type { CartLine, CartTotals, Product } from '../../commerce/types';
import Icon from '../ui/Icon';
import QtyStepper from './QtyStepper';

export function CartLineItem({ line, product, compact, onNavigate }: { line: CartLine; product: Product; compact?: boolean; onNavigate?: () => void }) {
  const { setQty, remove, switchPurchase, maxQty } = useCart();
  const unit = unitPrice(product, line.purchase) ?? 0;
  const subUnit = unitPrice(product, 'subscription') ?? 0;
  const isSub = line.purchase === 'subscription';
  const interval = product.subscription.intervalMonths;

  return (
    <article className={`cart-line ${compact ? 'cart-line--compact' : ''}`}>
      <Link to={productUrl(product)} className="cart-line__img" onClick={onNavigate} tabIndex={-1} aria-hidden="true">
        <img src={src(product.images[0])} alt="" width={120} height={120} loading="lazy" />
      </Link>
      <div className="cart-line__info">
        <div className="cart-line__top">
          <div>
            <Link to={productUrl(product)} className="cart-line__name" onClick={onNavigate}>
              {product.shortName}
            </Link>
            <p className="cart-line__meta">
              {product.packLabel} · {product.supply}
            </p>
            <p className={`cart-line__type ${isSub ? 'is-sub' : ''}`}>
              {isSub ? (
                <>
                  <Icon name="repeat" size={14} /> Subscribe &amp; Save · every {interval === 1 ? 'month' : `${interval} months`}
                </>
              ) : (
                'One-time purchase'
              )}
            </p>
          </div>
          <p className="cart-line__price">
            {formatINR(unit * line.qty)}
            {line.qty > 1 && <span className="muted t-xs">{formatINR(unit)} each</span>}
          </p>
        </div>
        <div className="cart-line__actions">
          <QtyStepper value={line.qty} max={maxQty} onChange={(n) => setQty(line.id, n)} size="sm" label={`Quantity of ${product.shortName}`} />
          {canSubscribe(product) && (
            <button className="cart-line__switch" onClick={() => switchPurchase(line.id, isSub ? 'one-time' : 'subscription')}>
              {isSub ? 'Switch to one-time' : `Subscribe & save ${formatINR((unit - subUnit) * line.qty)}`}
            </button>
          )}
          <button className="cart-line__remove" onClick={() => remove(line.id)} aria-label={`Remove ${product.shortName} from cart`}>
            <Icon name="trash" size={16} />
            {!compact && <span>Remove</span>}
          </button>
        </div>
      </div>
    </article>
  );
}

export function CartSummary({ totals, compact, discount, atCheckout }: { totals: CartTotals; compact?: boolean; discount?: { label: string; amount: number } | null; atCheckout?: boolean }) {
  const total = totals.subtotal - (discount?.amount ?? 0) + (totals.shipping ?? 0);
  return (
    <dl className={`summary ${compact ? 'summary--compact' : ''}`}>
      {!compact && (
        <div className="summary__row">
          <dt>MRP total</dt>
          <dd>{formatINR(totals.mrpTotal)}</dd>
        </div>
      )}
      {totals.savings > 0 && (
        <div className="summary__row summary__row--save">
          <dt>You save</dt>
          <dd>−{formatINR(totals.savings)}</dd>
        </div>
      )}
      {discount && (
        <div className="summary__row summary__row--save">
          <dt>{discount.label}</dt>
          <dd>−{formatINR(discount.amount)}</dd>
        </div>
      )}
      <div className="summary__row">
        <dt>Shipping</dt>
        <dd>{totals.shipping === null ? <span className="muted">{atCheckout ? 'Calculated after address' : 'Calculated at checkout'}</span> : totals.shipping === 0 ? 'Free' : formatINR(totals.shipping)}</dd>
      </div>
      <div className="summary__row summary__row--total">
        <dt>{totals.shipping === null ? 'Subtotal' : 'Total'}</dt>
        <dd>
          {formatINR(total)}
          <span className="summary__tax">Inclusive of all taxes</span>
        </dd>
      </div>
    </dl>
  );
}
