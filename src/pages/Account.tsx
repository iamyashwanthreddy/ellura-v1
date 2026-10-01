import { useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { commerce } from '../commerce/adapter';
import Icon, { type IconName } from '../components/ui/Icon';
import { Crumbs } from '../components/ui/PageHero';
import { Clover, Note } from '../components/ui/primitives';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

const FEATURES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'box', title: 'Orders', body: 'See order history, invoices and tracking.' },
  { icon: 'repeat', title: 'Subscriptions', body: 'Change your schedule, skip, pause or cancel anytime.' },
  { icon: 'pin', title: 'Addresses', body: 'Save delivery addresses for a faster checkout.' },
  { icon: 'gift', title: 'My ellura Rewards', body: 'Earn points on purchases and redeem them for discounts.' },
];

export default function Account() {
  const [params, setParams] = useSearchParams();
  const view = params.get('view') === 'register' ? 'register' : 'signin';
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useMeta({ title: view === 'register' ? 'Create account' : 'Sign in', description: 'Sign in to manage your ellura® orders, subscriptions and addresses.', noindex: true });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const d = new FormData(form);
    setBusy(true);
    const r =
      view === 'register'
        ? await commerce.register(String(d.get('name')), String(d.get('email')), String(d.get('password')))
        : await commerce.signIn(String(d.get('email')), String(d.get('password')));
    setBusy(false);
    setMsg(r.ok ? 'Signed in.' : r.message);
  };

  const switchTo = (v: 'signin' | 'register') => {
    setMsg('');
    setParams(v === 'register' ? { view: 'register' } : {}, { replace: true, state: { keepScroll: true } });
  };

  return (
    <div ref={ref} className="account page-top">
      <div className="wrap account__grid">
        <div className="account__form">
          <Crumbs items={[{ label: 'ellura', to: '/ellura' }, { label: 'My account' }]} />
          <h1 className="t-d2" data-split="load" style={{ margin: '16px 0 24px' }}>
            {view === 'register' ? 'Create your account' : 'Welcome back'}
          </h1>
          <div className="tabs" role="tablist" aria-label="Account">
            <button role="tab" aria-selected={view === 'signin'} onClick={() => switchTo('signin')}>
              Sign in
            </button>
            <button role="tab" aria-selected={view === 'register'} onClick={() => switchTo('register')}>
              Create account
            </button>
          </div>
          <form className="stack" style={{ marginTop: 24 }} onSubmit={onSubmit} role="tabpanel">
            {view === 'register' && (
              <div className="field">
                <label className="field__label" htmlFor="a-name">
                  Full name
                </label>
                <input id="a-name" name="name" className="input" required autoComplete="name" />
              </div>
            )}
            <div className="field">
              <label className="field__label" htmlFor="a-email">
                Email
              </label>
              <input id="a-email" name="email" type="email" className="input" required autoComplete="email" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="a-pass">
                Password
              </label>
              <input
                id="a-pass"
                name="password"
                type="password"
                className="input"
                required
                minLength={8}
                autoComplete={view === 'register' ? 'new-password' : 'current-password'}
              />
              {view === 'register' && <span className="field__hint">At least 8 characters.</span>}
            </div>
            {view === 'register' && (
              <label className="check">
                <input type="checkbox" name="optin" /> Join My ellura Rewards and receive offers by email.
              </label>
            )}
            {msg && <Note tone="preview">{msg}</Note>}
            <button className="btn btn--lg btn--block" disabled={busy}>
              {busy ? 'Please wait…' : view === 'register' ? 'Create account' : 'Sign in'}
            </button>
            {view === 'signin' && (
              <p className="t-sm muted" style={{ textAlign: 'center' }}>
                New here?{' '}
                <button type="button" className="link" onClick={() => switchTo('register')}>
                  Create an account
                </button>
              </p>
            )}
          </form>
        </div>

        <aside className="account__aside on-dark grain" data-header-tone="dark">
          <Clover className="account__clover" filled={false} />
          <p className="eyebrow">Your account</p>
          <h2 className="t-d3">
            Everything in <em className="serif-em">one place.</em>
          </h2>
          <ul role="list" data-stagger>
            {FEATURES.map((f) => (
              <li key={f.title}>
                <Icon name={f.icon} size={22} />
                <span>
                  <strong>{f.title}</strong>
                  <span className="muted t-sm">{f.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
