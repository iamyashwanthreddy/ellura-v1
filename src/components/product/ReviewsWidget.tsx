import { useState, type FormEvent } from 'react';
import { commerce } from '../../commerce/adapter';
import { PRODUCTS } from '../../commerce/catalog';
import { US_REVIEWS, US_REVIEW_STATS, usAverage } from '../../content/reviews';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import { Note, Stars } from '../ui/primitives';

function WriteReview({ open, onClose, sku }: { open: boolean; onClose: () => void; sku?: string }) {
  const [rating, setRating] = useState(0);
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [err, setErr] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!rating) return setErr('Please choose a star rating.');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const d = new FormData(form);
    setErr('');
    setState('busy');
    await commerce.submitReview({
      sku: String(d.get('sku')),
      rating,
      title: String(d.get('title')),
      body: String(d.get('body')),
      name: String(d.get('name')),
      email: String(d.get('email')),
    });
    setState('done');
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      setState('idle');
      setRating(0);
    }, 300);
  };

  return (
    <Modal open={open} onClose={close} label="Write a review">
      <h2 className="t-d3" style={{ marginBottom: 18 }}>
        Write a review
      </h2>
      {state === 'done' ? (
        <div className="stack">
          <Note tone="preview">Thank you! (Preview: the review platform isn’t connected yet, so your review was not published or stored.)</Note>
          <button className="btn" onClick={close}>
            Close
          </button>
        </div>
      ) : (
        <form className="stack" onSubmit={onSubmit} noValidate>
          <div className="field">
            <span className="field__label" id="rating-label">
              Your rating
            </span>
            <div className="rating-input" role="radiogroup" aria-labelledby="rating-label">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} className={n <= rating ? 'is-on' : ''} onClick={() => setRating(n)}>
                  <Icon name="star" />
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="rv-sku">
              Product
            </label>
            <select id="rv-sku" name="sku" className="select" defaultValue={sku ?? PRODUCTS[0].sku}>
              {PRODUCTS.map((p) => (
                <option key={p.sku} value={p.sku}>
                  {p.shortName} — {p.packLabel}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="rv-title">
              Review title
            </label>
            <input id="rv-title" name="title" className="input" required maxLength={80} />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="rv-body">
              Your review
            </label>
            <textarea id="rv-body" name="body" className="textarea" required minLength={20} maxLength={2000} />
            <span className="field__hint">Please share your experience with the product. Reviews can’t include medical claims or personal health data.</span>
          </div>
          <div className="form-grid">
            <div className="field">
              <label className="field__label" htmlFor="rv-name">
                Name
              </label>
              <input id="rv-name" name="name" className="input" required autoComplete="given-name" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="rv-email">
                Email (not published)
              </label>
              <input id="rv-email" name="email" type="email" className="input" required autoComplete="email" />
            </div>
          </div>
          {err && <p className="field__error">{err}</p>}
          <button className="btn btn--lg" disabled={state === 'busy'}>
            {state === 'busy' ? 'Submitting…' : 'Submit review'}
          </button>
        </form>
      )}
    </Modal>
  );
}

/** Doc, product page Section 3: Reviews. Indian reviews start empty; US store totals are labelled as such. */
export default function ReviewsWidget({ sku, heading = 'Customer reviews' }: { sku?: string; heading?: string }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'india' | 'us'>('us');
  const avg = usAverage();
  const { total, breakdown } = US_REVIEW_STATS;

  return (
    <div className="rv" id="reviews">
      <div className="rv__top">
        <div className="rv__score">
          <p className="t-mono muted">{heading}</p>
          <strong>{avg.toFixed(1)}</strong>
          <Stars value={avg} size={18} />
          <span className="t-xs muted">
            {total} reviews · {US_REVIEW_STATS.source}
          </span>
        </div>
        <div className="rv__bars" aria-label="Rating breakdown on the US store">
          {breakdown.map((b) => (
            <div key={b.stars} className="rv__bar">
              <span>{b.stars} ★</span>
              <i>
                <b style={{ width: `${(b.count / total) * 100}%` }} />
              </i>
              <span>{b.count}</span>
            </div>
          ))}
        </div>
        <div className="rv__tools">
          <div className="tabs" role="group" aria-label="Show reviews from">
            <button aria-pressed={view === 'us'} onClick={() => setView('us')}>
              US store
            </button>
            <button aria-pressed={view === 'india'} onClick={() => setView('india')}>
              India
            </button>
          </div>
          <button className="btn btn--sm" onClick={() => setOpen(true)}>
            <Icon name="star" size={16} /> Write a review
          </button>
        </div>
      </div>

      {view === 'us' ? (
        <>
          <ul className="rv__list" role="list">
            {US_REVIEWS.map((r, i) => (
              <li key={i} className="rv__item">
                <div className="rv__who">
                  <span className="rv__avatar" aria-hidden="true">
                    {r.name[0]}
                  </span>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.location ?? 'Verified buyer'}</span>
                  </div>
                </div>
                <div className="rv__body">
                  {r.title && <h4>{r.title}</h4>}
                  <p>{r.body}</p>
                  <p className="rv__src">Reproduced verbatim from the US store. Individual experiences vary.</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="t-xs muted" style={{ marginTop: 16 }}>
            Totals as published on ellurautihealth.com, checked {US_REVIEW_STATS.checked}. India reviews will appear here once verified buyers share them.
          </p>
        </>
      ) : (
        <div className="rv__empty">
          <Icon name="chat" size={28} />
          <p className="t-h4">No reviews from India yet.</p>
          <p className="muted">ellura has just arrived in India. Be one of the first to share your experience.</p>
          <button className="btn" onClick={() => setOpen(true)}>
            Write the first review
          </button>
        </div>
      )}
      <WriteReview open={open} onClose={() => setOpen(false)} sku={sku} />
    </div>
  );
}
