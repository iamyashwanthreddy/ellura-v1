import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { commerce } from '../commerce/adapter';
import Icon from '../components/ui/Icon';
import PageHero from '../components/ui/PageHero';
import { Note } from '../components/ui/primitives';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

const STAGES = ['Order placed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered'];

export default function TrackOrder() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'busy' | 'result'>('idle');
  const [message, setMessage] = useState('');
  useReveals(ref);
  useMeta({ title: 'Track your order', description: 'Check the status of your ellura® order.', noindex: false });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const d = new FormData(form);
    setState('busy');
    const r = await commerce.trackOrder(String(d.get('order')), String(d.get('contact')));
    setMessage(r.ok ? r.data.status : r.message);
    setState('result');
  };

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ label: 'Track your order' }]}
        eyebrow="Order status"
        title={
          <>
            Where’s my <em>ellura?</em>
          </>
        }
        lead="Enter your order number and the email or mobile number you used at checkout."
      />
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <div className="card stack" data-fade>
            <form className="form-grid" onSubmit={onSubmit}>
              <div className="field">
                <label className="field__label" htmlFor="t-order">
                  Order number
                </label>
                <input id="t-order" name="order" className="input" required placeholder="e.g. ELL-100234" />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="t-contact">
                  Email or mobile number
                </label>
                <input id="t-contact" name="contact" className="input" required autoComplete="email" />
              </div>
              <button className="btn btn--lg span-2" disabled={state === 'busy'}>
                <Icon name="search" /> {state === 'busy' ? 'Looking up…' : 'Track order'}
              </button>
            </form>
            {state === 'result' && <Note tone="preview">{message} Until then, use the tracking link in your shipping email.</Note>}
          </div>

          <ol className="track-stages" role="list" aria-label="Delivery stages" data-stagger>
            {STAGES.map((s, i) => (
              <li key={s}>
                <span className="track-stages__dot">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <p className="t-sm muted" style={{ marginTop: 28, textAlign: 'center' }}>
            Need help? <Link to="/ellura/support" className="link">Contact customer care</Link> · <Link to="/ellura/policies/shipping" className="link">Shipping Policy</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
