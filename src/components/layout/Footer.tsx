import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { commerce } from '../../commerce/adapter';
import { DISCLAIMER_FDA, DISCLAIMER_INTL, TRADEMARKS, BRAND } from '../../content/brand';
import { FOOTER_NAV } from '../../content/nav';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import Icon from '../ui/Icon';
import { Clover, Logo, Tbc } from '../ui/primitives';

export function NewsletterForm({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [error, setError] = useState('');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string).trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setState('busy');
    await commerce.subscribeNewsletter(email);
    setState('done');
    form.reset();
  };
  return (
    <form className={`newsletter newsletter--${tone}`} onSubmit={onSubmit} noValidate>
      <label htmlFor={`nl-${tone}`} className="sr-only">
        Email address
      </label>
      <div className="newsletter__row">
        <input id={`nl-${tone}`} name="email" type="email" autoComplete="email" placeholder="Your email address" className="newsletter__input" aria-invalid={!!error} aria-describedby={`nl-${tone}-msg`} />
        <button className="newsletter__btn" disabled={state === 'busy'} aria-label="Subscribe">
          {state === 'busy' ? '…' : <Icon name="arrow" />}
        </button>
      </div>
      <p id={`nl-${tone}-msg`} className="newsletter__msg" role="status">
        {error ? (
          <span className="field__error">{error}</span>
        ) : state === 'done' ? (
          'Thank you. (Preview: the email platform isn’t connected yet, so nothing was sent.)'
        ) : (
          'Urinary-health notes and launch offers. Unsubscribe anytime.'
        )}
      </p>
    </form>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.footer__word img',
          { yPercent: 60, opacity: 0.2 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.footer__word', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
          },
        );
        gsap.to('.footer__clover', {
          rotate: 90,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: 1 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="footer on-dark grain" data-header-tone="dark">
      <Clover className="footer__clover" filled={false} />
      <div className="wrap footer__top">
        <div className="footer__intro">
          <p className="eyebrow">Stay in the loop</p>
          <h2 className="t-d3">
            Support your urinary tract health<span className="claim">*</span> — <em className="serif-em">and hear about offers first.</em>
          </h2>
          <NewsletterForm />
        </div>
        <nav className="footer__cols" aria-label="Footer">
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h3 className="t-mono footer__col-title">{col.title}</h3>
              <ul role="list">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="wrap footer__contact">
        <a href={`mailto:${BRAND.email}`} className="footer__contact-item">
          <Icon name="mail" size={18} /> {BRAND.email}
        </a>
        <span className="footer__contact-item">
          <Icon name="phone" size={18} /> India care line <Tbc>phone &amp; WhatsApp</Tbc>
        </span>
        <span className="footer__contact-item">
          <Icon name="shield" size={18} /> Buy only from ellura and authorised sellers — <Link to="/ellura/where-to-buy" className="link">see list</Link>
        </span>
      </div>

      <div className="wrap footer__legal">
        <p>{DISCLAIMER_FDA}</p>
        <p>{DISCLAIMER_INTL}</p>
        <p>
          Always read the label. ellura is labelled as a dietary supplement; it is not a substitute for medical treatment. If you have symptoms of a urinary tract
          infection, see a doctor. <Tbc>India regulatory disclaimer and licence number</Tbc>
        </p>
        <p>
          {TRADEMARKS} India importer/marketer: <Tbc>legal entity and address</Tbc>
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} Pharmatoka. All rights reserved.</p>
      </div>

      <div className="footer__word" aria-hidden="true">
        <Logo tone="white" height={400} />
      </div>
    </footer>
  );
}
