import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { commerce } from '../commerce/adapter';
import Icon from '../components/ui/Icon';
import PageHero from '../components/ui/PageHero';
import { Note, Tbc } from '../components/ui/primitives';
import { BRAND } from '../content/brand';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

const TOPICS = ['Order or delivery', 'Subscription', 'Returns or refund', 'Product question', 'Report a side effect', 'Authenticity concern', 'Something else'];

export default function Support() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  useReveals(ref);
  useMeta({ title: 'Help & Support', description: 'Contact ellura® customer care by email, phone or WhatsApp, or send us a message.' });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const d = new FormData(form);
    setState('busy');
    await commerce.submitSupport({
      name: String(d.get('name')),
      email: String(d.get('email')),
      topic: String(d.get('topic')),
      order: String(d.get('order') || ''),
      message: String(d.get('message')),
    });
    setState('done');
    form.reset();
  };

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ label: 'Help & Support' }]}
        eyebrow="Help & Support"
        title={
          <>
            Real people, <em>ready to help.</em>
          </>
        }
        lead="Questions about your order, your subscription or ellura itself? Reach us the way that suits you."
      />

      <section className="section section--tight" aria-label="Contact channels">
        <div className="wrap">
          <ul className="channels" role="list" data-stagger>
            <li>
              <Icon name="mail" size={28} />
              <h2 className="t-h4">Email</h2>
              <a href={`mailto:${BRAND.email}`} className="link">
                {BRAND.email}
              </a>
              <span className="t-xs muted">Response time: <Tbc>India response time</Tbc></span>
            </li>
            <li>
              <Icon name="phone" size={28} />
              <h2 className="t-h4">Phone</h2>
              <span>
                <Tbc>India customer care number</Tbc>
              </span>
              <span className="t-xs muted">
                Hours: <Tbc>India support hours</Tbc>
              </span>
            </li>
            <li>
              <Icon name="chat" size={28} />
              <h2 className="t-h4">WhatsApp</h2>
              <span>
                <Tbc>WhatsApp number</Tbc>
              </span>
              <span className="t-xs muted">Chat with us for order updates and quick questions.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section tone-bone">
        <div className="wrap two-col">
          <div className="stack">
            <h2 className="t-d3" data-split>
              Send us a message
            </h2>
            <p className="t-body" data-fade>
              Tell us what you need and we’ll get back to you by email. For a side effect, please also speak to your doctor.
            </p>
            <ul className="quicklinks" role="list" data-stagger>
              <li>
                <Link to="/ellura/track-order">
                  <Icon name="truck" /> Track your order <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link to="/ellura/policies/returns">
                  <Icon name="box" /> Returns &amp; refunds <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link to="/ellura/account">
                  <Icon name="repeat" /> Manage subscription <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link to="/ellura/faq">
                  <Icon name="info" /> Browse FAQs <Icon name="arrow" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="card">
            {state === 'done' ? (
              <div className="stack">
                <Note tone="preview">Thanks — message received. (Preview: the support inbox isn’t connected yet, so nothing was sent. Please email {BRAND.email}.)</Note>
                <button className="btn btn--ghost" onClick={() => setState('idle')}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="form-grid" onSubmit={onSubmit}>
                <div className="field">
                  <label className="field__label" htmlFor="s-name">
                    Name
                  </label>
                  <input id="s-name" name="name" className="input" required autoComplete="name" />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="s-email">
                    Email
                  </label>
                  <input id="s-email" name="email" type="email" className="input" required autoComplete="email" />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="s-topic">
                    Topic
                  </label>
                  <select id="s-topic" name="topic" className="select" required defaultValue="">
                    <option value="" disabled>
                      Choose…
                    </option>
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="s-order">
                    Order number (optional)
                  </label>
                  <input id="s-order" name="order" className="input" />
                </div>
                <div className="field span-2">
                  <label className="field__label" htmlFor="s-msg">
                    Message
                  </label>
                  <textarea id="s-msg" name="message" className="textarea" required minLength={10} />
                </div>
                <label className="check span-2">
                  <input type="checkbox" required /> I agree that ellura may use these details to respond to my request.
                </label>
                <button className="btn btn--lg span-2" disabled={state === 'busy'}>
                  {state === 'busy' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
