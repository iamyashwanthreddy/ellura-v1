import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { commerce } from '../../commerce/adapter';
import { useCart } from '../../commerce/cart';
import { PRODUCTS, productUrl, SUBSCRIPTION_DISCOUNT } from '../../commerce/catalog';
import { canSubscribe, formatINR, isPurchasable, unitPrice } from '../../commerce/pricing';
import type { Product, PurchaseType } from '../../commerce/types';
import { HIGHLIGHTS } from '../../content/brand';
import { US_REVIEW_STATS, usAverage } from '../../content/reviews';
import { Price } from '../commerce/Price';
import QtyStepper from '../commerce/QtyStepper';
import Icon from '../ui/Icon';
import { Note, Stars } from '../ui/primitives';

function NotifyForm({ product }: { product: Product }) {
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [err, setErr] = useState('');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') || '').trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr('Please enter a valid email address.');
    setErr('');
    setState('busy');
    await commerce.notifyWhenAvailable(product.sku, email);
    setState('done');
  };
  return (
    <div className="notify">
      <p>
        <strong>The {product.packLabel} pack is coming to India.</strong> Its price will be announced at launch — leave your email and we’ll tell you first.
      </p>
      {state === 'done' ? (
        <Note tone="preview">Thanks! (Preview: notifications aren’t connected yet, so nothing was sent.)</Note>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <label className="sr-only" htmlFor="notify-email">
            Email address
          </label>
          <input id="notify-email" name="email" type="email" className="input" placeholder="you@example.com" autoComplete="email" aria-invalid={!!err} />
          <button className="btn" disabled={state === 'busy'}>
            {state === 'busy' ? 'Sending…' : 'Notify me'}
          </button>
        </form>
      )}
      {err && <p className="field__error">{err}</p>}
    </div>
  );
}

export default function BuyBox({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { add, maxQty } = useCart();
  const [purchase, setPurchase] = useState<PurchaseType>(canSubscribe(product) ? 'subscription' : 'one-time');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<number>();
  const radios = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setPurchase(canSubscribe(product) ? 'subscription' : 'one-time');
    setQty(1);
  }, [product]);
  useEffect(() => () => window.clearTimeout(addedTimer.current), []);

  const selectPack = (p: Product) => {
    if (p.sku !== product.sku) navigate(productUrl(p), { replace: true, state: { keepScroll: true } });
  };
  const onPackKey = (e: KeyboardEvent, i: number) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const n = (i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + PRODUCTS.length) % PRODUCTS.length;
    radios.current[n]?.focus();
    selectPack(PRODUCTS[n]);
  };

  const oneTime = unitPrice(product, 'one-time');
  const sub = unitPrice(product, 'subscription');
  const purchasable = isPurchasable(product);
  const interval = product.subscription.intervalMonths;

  const onAdd = () => {
    add(product.sku, qty, purchase);
    setAdded(true);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="buy" id="buy">
      <div>
        <p className="t-mono muted" style={{ marginBottom: 10 }}>
          Urinary tract health · Dietary supplement
        </p>
        <h1 className="buy__title">
          <span className="brand-word">ellura®</span> cranberry extract, <em className="serif-em">36 mg PACs</em>
        </h1>
      </div>
      <div className="buy__rating">
        <Stars value={usAverage()} label={`Rated ${usAverage()} out of 5 on the US store`} />
        <a href="#reviews">
          {usAverage()} · {US_REVIEW_STATS.total} reviews on our US store
        </a>
      </div>
      <p className="buy__desc">
        A clinically backed supplement that helps reduce the ability of certain bacteria to adhere to the urinary tract, promoting urinary tract health.* Each capsule
        delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract.
      </p>

      <div className="buy__pricewrap">
        <Price product={product} purchase={purchasable ? purchase : 'one-time'} size="lg" />
        {purchasable && <p className="buy__tax">MRP inclusive of all taxes{purchase === 'subscription' ? ' · subscription price shown' : ''}</p>}
      </div>

      <div>
        <p className="buy__label" id="pack-label">
          Pack size <span>{product.supply}</span>
        </p>
        <div className="packs-select" role="radiogroup" aria-labelledby="pack-label">
          {PRODUCTS.map((p, i) => {
            const pr = unitPrice(p, 'one-time');
            const checked = p.sku === product.sku;
            return (
              <button
                key={p.sku}
                ref={(el) => (radios.current[i] = el)}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                className="pack-opt"
                onClick={() => selectPack(p)}
                onKeyDown={(e) => onPackKey(e, i)}
              >
                <strong>{p.capsules} capsules</strong>
                <span>{p.supply.replace(' supply', '')}</span>
                <em>{pr !== null ? formatINR(pr) : 'At launch'}</em>
              </button>
            );
          })}
        </div>
      </div>

      {purchasable ? (
        <>
          <fieldset className="purchase" style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="buy__label">Purchase option</legend>
            <label className={`popt ${purchase === 'one-time' ? 'is-checked' : ''}`}>
              <input type="radio" name="purchase" value="one-time" checked={purchase === 'one-time'} onChange={() => setPurchase('one-time')} />
              <span className="popt__dot" aria-hidden="true" />
              <span className="popt__title">One-time purchase</span>
              <span className="popt__price">{oneTime !== null && formatINR(oneTime)}</span>
            </label>
            <label className={`popt ${purchase === 'subscription' ? 'is-checked' : ''} ${!canSubscribe(product) ? 'popt--disabled' : ''}`}>
              <input
                type="radio"
                name="purchase"
                value="subscription"
                checked={purchase === 'subscription'}
                disabled={!canSubscribe(product)}
                onChange={() => setPurchase('subscription')}
              />
              <span className="popt__dot" aria-hidden="true" />
              <span className="popt__title">
                Subscribe &amp; Save <b>{Math.round(SUBSCRIPTION_DISCOUNT * 100)}%</b>
              </span>
              <span className="popt__price">
                {sub !== null && canSubscribe(product) ? formatINR(sub) : '—'}
                {sub !== null && oneTime !== null && canSubscribe(product) && <s>{formatINR(oneTime)}</s>}
              </span>
              <span className="popt__note">
                {canSubscribe(product) ? (
                  <>
                    <span>
                      <Icon name="truck" size={14} /> Free shipping
                    </span>
                    <span>
                      <Icon name="pause" size={14} /> Pause or cancel anytime
                    </span>
                    <span>
                      <Icon name="repeat" size={14} /> Delivered every {interval === 1 ? 'month' : `${interval} months`}
                    </span>
                  </>
                ) : (
                  <span>Not available for bundles</span>
                )}
              </span>
            </label>
          </fieldset>

          <div className="buy__actions">
            <QtyStepper value={qty} onChange={setQty} max={maxQty} />
            <button className="btn btn--lg" onClick={onAdd} aria-live="polite">
              {added ? (
                <>
                  <Icon name="check" /> Added to cart
                </>
              ) : (
                <>
                  <Icon name="bag" /> Add to cart · {formatINR((unitPrice(product, purchase) ?? 0) * qty)}
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        <NotifyForm product={product} />
      )}

      <ul className="buy__trust" role="list">
        <li>
          <Icon name="capsule" /> One capsule a day
        </li>
        <li>
          <Icon name="leaf" /> Vegan · gluten-free · non-GMO
        </li>
        <li>
          <Icon name="flask" /> PACs measured by DMAC/A2
        </li>
      </ul>

      <ul className="buy__highlights" role="list">
        {HIGHLIGHTS.map((h) => (
          <li key={h.title}>
            <Icon name="check" size={18} />
            <span>
              <strong>{h.title}</strong>
              {h.body}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
