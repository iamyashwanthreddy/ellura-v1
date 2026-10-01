import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { commerce } from '../../commerce/adapter';
import { useCart } from '../../commerce/cart';
import { getProduct, src } from '../../commerce/catalog';
import { formatINR, unitPrice } from '../../commerce/pricing';
import type { CheckoutDetails } from '../../commerce/types';
import { CartSummary } from '../../components/commerce/CartParts';
import Icon from '../../components/ui/Icon';
import { Crumbs } from '../../components/ui/PageHero';
import { Note, Tbc } from '../../components/ui/primitives';
import { useMeta } from '../../lib/useMeta';
import { PromoField } from './Cart';

const STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

type Errors = Partial<Record<string, string>>;

function validate(d: FormData): Errors {
  const e: Errors = {};
  const v = (k: string) => String(d.get(k) || '').trim();
  if (!/^\S+@\S+\.\S+$/.test(v('email'))) e.email = 'Enter a valid email address.';
  if (v('fullName').length < 2) e.fullName = 'Enter the recipient’s full name.';
  if (!/^[6-9]\d{9}$/.test(v('phone').replace(/[\s-]/g, '').replace(/^(\+91|0)/, ''))) e.phone = 'Enter a 10-digit Indian mobile number.';
  if (v('line1').length < 4) e.line1 = 'Enter your house number and street.';
  if (v('city').length < 2) e.city = 'Enter your city.';
  if (!v('state')) e.state = 'Choose your state.';
  if (!/^[1-9]\d{5}$/.test(v('pincode'))) e.pincode = 'Enter a valid 6-digit PIN code.';
  if (!d.get('terms')) e.terms = 'Please accept the Terms of Sale to continue.';
  return e;
}

function Field({ id, label, error, children, span2 }: { id: string; label: string; error?: string; children: React.ReactNode; span2?: boolean }) {
  return (
    <div className={`field ${span2 ? 'span-2' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <span className="field__error" id={`${id}-err`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default function Checkout() {
  const { lines, totals, clear, saveOrder } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useMeta({ title: 'Checkout', description: 'Secure checkout for ellura®.', noindex: true });

  const err = (k: string) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const found = validate(d);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }
    const details: CheckoutDetails = {
      email: String(d.get('email')),
      marketingOptIn: !!d.get('optin'),
      paymentMethod: 'gateway',
      address: {
        fullName: String(d.get('fullName')),
        phone: String(d.get('phone')),
        line1: String(d.get('line1')),
        line2: String(d.get('line2') || ''),
        city: String(d.get('city')),
        state: String(d.get('state')),
        pincode: String(d.get('pincode')),
      },
    };
    setBusy(true);
    const r = await commerce.placeOrder(lines, details);
    setBusy(false);
    if (r.ok) {
      saveOrder(r.data);
      clear();
      navigate('/ellura/order-confirmed');
    } else setErrors({ form: r.message });
  };

  if (lines.length === 0) {
    return (
      <div className="page-top section">
        <div className="wrap wrap--narrow rv__empty">
          <Icon name="bag" size={30} />
          <h1 className="t-d3">Your cart is empty</h1>
          <p className="muted">Add a pack to your cart to check out.</p>
          <Link to="/ellura/shop" className="btn">
            Shop ellura
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-top section">
      <div className="wrap">
        <Crumbs items={[{ label: 'ellura', to: '/ellura' }, { label: 'Cart', to: '/ellura/cart' }, { label: 'Checkout' }]} />
        <h1 className="t-d2" style={{ margin: '16px 0 18px' }}>
          Checkout
        </h1>
        {!commerce.connected && (
          <Note tone="preview" className="checkout__preview">
            <strong>Preview checkout.</strong> The e-commerce platform and payment gateway are still to be confirmed by the web vendor, so no payment will be taken and no
            real order will be created. Everything else on this page works as it will at launch.
          </Note>
        )}

        <div className="checkout" style={{ marginTop: 28 }}>
          <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Checkout">
            <fieldset className="checkout__step">
              <legend className="sr-only">Contact</legend>
              <h2 className="t-h4">
                <span>1</span> Contact
              </h2>
              <div className="form-grid">
                <Field id="email" label="Email" error={errors.email} span2>
                  <input id="email" name="email" type="email" className="input" autoComplete="email" {...err('email')} />
                </Field>
                <label className="check span-2">
                  <input type="checkbox" name="optin" /> Email me urinary-health notes and offers. Unsubscribe anytime.
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout__step">
              <legend className="sr-only">Delivery address</legend>
              <h2 className="t-h4">
                <span>2</span> Delivery address
              </h2>
              <div className="form-grid">
                <Field id="fullName" label="Full name" error={errors.fullName}>
                  <input id="fullName" name="fullName" className="input" autoComplete="name" {...err('fullName')} />
                </Field>
                <Field id="phone" label="Mobile number" error={errors.phone}>
                  <input id="phone" name="phone" type="tel" inputMode="tel" className="input" autoComplete="tel-national" placeholder="10-digit mobile" {...err('phone')} />
                </Field>
                <Field id="line1" label="Flat, house no., building, street" error={errors.line1} span2>
                  <input id="line1" name="line1" className="input" autoComplete="address-line1" {...err('line1')} />
                </Field>
                <Field id="line2" label="Area, landmark (optional)" span2>
                  <input id="line2" name="line2" className="input" autoComplete="address-line2" />
                </Field>
                <Field id="city" label="City / town" error={errors.city}>
                  <input id="city" name="city" className="input" autoComplete="address-level2" {...err('city')} />
                </Field>
                <Field id="pincode" label="PIN code" error={errors.pincode}>
                  <input id="pincode" name="pincode" className="input" inputMode="numeric" maxLength={6} autoComplete="postal-code" {...err('pincode')} />
                </Field>
                <Field id="state" label="State / UT" error={errors.state} span2>
                  <select id="state" name="state" className="select" defaultValue="" autoComplete="address-level1" {...err('state')}>
                    <option value="" disabled>
                      Choose…
                    </option>
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </fieldset>

            <fieldset className="checkout__step">
              <legend className="sr-only">Delivery</legend>
              <h2 className="t-h4">
                <span>3</span> Delivery
              </h2>
              <div className="pay-opts">
                <label className="pay-opt">
                  <input type="radio" name="ship" defaultChecked />
                  <span style={{ flex: 1 }}>
                    <strong>Standard delivery</strong>
                    <br />
                    <span className="t-xs muted">
                      Timeline: <Tbc>India delivery timelines</Tbc>
                    </span>
                  </span>
                  <strong>{totals.hasOneTime ? 'Calculated' : 'Free'}</strong>
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout__step">
              <legend className="sr-only">Payment</legend>
              <h2 className="t-h4">
                <span>4</span> Payment
              </h2>
              <div className="pay-opts">
                <label className="pay-opt">
                  <input type="radio" name="pay" defaultChecked />
                  <span style={{ flex: 1 }}>
                    <strong>Pay securely</strong>
                    <br />
                    <span className="t-xs muted">
                      You’ll be redirected to the payment gateway to complete payment. <Tbc>gateway and accepted methods</Tbc>
                    </span>
                  </span>
                  <Icon name="lock" />
                </label>
              </div>
              {totals.hasSubscription && (
                <p className="t-xs muted" style={{ marginTop: 14 }}>
                  Subscriptions renew automatically at the delivery interval shown until you pause or cancel. You can manage, skip or cancel anytime from your account
                  before the next billing date.
                </p>
              )}
              <label className="check" style={{ marginTop: 18 }}>
                <input type="checkbox" name="terms" {...err('terms')} />
                <span>
                  I agree to the <Link to="/ellura/policies/terms-of-sale" className="link">Terms of Sale</Link>,{' '}
                  <Link to="/ellura/policies/returns" className="link">Returns policy</Link>
                  {totals.hasSubscription ? ' and the subscription terms above' : ''}.
                </span>
              </label>
              {errors.terms && (
                <span className="field__error" id="terms-err">
                  {errors.terms}
                </span>
              )}
            </fieldset>

            {errors.form && <Note tone="error">{errors.form}</Note>}
            <button className="btn btn--lg btn--block" style={{ marginTop: 20 }} disabled={busy}>
              <Icon name="lock" />{' '}
              {busy ? 'Placing order…' : `${commerce.connected ? 'Pay' : 'Place preview order'} · ${formatINR(totals.subtotal)}${totals.shipping === null ? ' + shipping' : ''}`}
            </button>
          </form>

          <aside className="checkout__aside card" aria-label="Order summary">
            <h2 className="t-h4">Order summary</h2>
            <ul className="mini-lines" role="list">
              {lines.map((l) => {
                const p = getProduct(l.sku)!;
                const unit = unitPrice(p, l.purchase) ?? 0;
                return (
                  <li key={l.id}>
                    <span className="qtyb">
                      <img src={src(p.images[0])} alt="" width={56} height={56} />
                      <b>{l.qty}</b>
                    </span>
                    <span>
                      <strong>{p.packLabel}</strong>
                      <br />
                      <span className="t-xs muted">{l.purchase === 'subscription' ? `Subscribe & Save · every ${p.subscription.intervalMonths === 1 ? 'month' : `${p.subscription.intervalMonths} months`}` : 'One-time'}</span>
                    </span>
                    <strong>{formatINR(unit * l.qty)}</strong>
                  </li>
                );
              })}
            </ul>
            <PromoField />
            <CartSummary totals={totals} atCheckout />
          </aside>
        </div>
      </div>
    </div>
  );
}
