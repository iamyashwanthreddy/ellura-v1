import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../commerce/cart';
import { PRODUCTS, productUrl, src } from '../commerce/catalog';
import { canSubscribe, formatINR, unitPrice } from '../commerce/pricing';
import FaqTeaser from '../components/home/FaqTeaser';
import CtaBand from '../components/ui/CtaBand';
import Icon from '../components/ui/Icon';
import PageHero from '../components/ui/PageHero';
import { SectionHead } from '../components/ui/primitives';
import { gsap, useGSAP, MQ } from '../lib/gsap';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

const STEPS = [
  { icon: 'capsule' as const, title: 'Choose your pack', body: 'Pick 30 or 90 capsules and select Subscribe & Save on the product page.' },
  { icon: 'truck' as const, title: 'We deliver on schedule', body: 'Your next bottle arrives as the last one runs out — every month for 30 capsules, every three months for 90.' },
  { icon: 'repeat' as const, title: 'Save on every delivery', body: '10% off every shipment and free shipping, for as long as you stay subscribed.' },
  { icon: 'pause' as const, title: 'Stay in control', body: 'Skip a delivery, pause, change your schedule or cancel anytime from your account.' },
];

export default function Subscribe() {
  const ref = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  useReveals(ref);
  useMeta({
    title: 'Subscribe & Save 10% on ellura®',
    description: 'Subscribe to ellura® and save 10% on every delivery with free shipping. Pause, skip or cancel anytime.',
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.fromTo('.sub-steps__line i', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.sub-steps', start: 'top 75%', end: 'bottom 55%', scrub: true } });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <PageHero
        tone="dark"
        crumbs={[{ label: 'Subscribe & Save' }]}
        eyebrow="Subscribe & Save"
        title={
          <>
            Never run out. <em>Save 10% every time.</em>
          </>
        }
        lead="Urinary tract support works best as a daily habit. A subscription keeps ellura arriving on your schedule — with 10% off and free shipping on every delivery."
        photo="morning"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a href="#plans" className="btn btn--lilac btn--lg">
            See plans <Icon name="arrow" />
          </a>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="sub-how">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title={<span id="sub-how">Four steps. <em>Zero effort.</em></span>} />
          <div className="sub-steps" style={{ marginTop: 48 }}>
            <div className="sub-steps__line" aria-hidden="true">
              <i />
            </div>
            <ol role="list" className="sub-steps__list" data-stagger>
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="sub-steps__icon">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <span className="t-mono muted">0{i + 1}</span>
                  <h3 className="t-h4">{s.title}</h3>
                  <p className="muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="plans" className="section tone-bone" aria-labelledby="plans-h">
        <div className="wrap">
          <SectionHead eyebrow="Plans" title={<span id="plans-h">Pick your <em>delivery rhythm.</em></span>} />
          <ul className="plans" role="list" data-stagger>
            {PRODUCTS.filter((p) => p.subscription.eligible).map((p) => {
              const sub = unitPrice(p, 'subscription');
              const one = unitPrice(p, 'one-time');
              return (
                <li key={p.sku} className="plan">
                  <img src={src(p.images[0])} alt="" width={700} height={700} loading="lazy" />
                  <div className="plan__body">
                    <p className="t-mono muted">Every {p.subscription.intervalMonths === 1 ? 'month' : `${p.subscription.intervalMonths} months`}</p>
                    <h3 className="t-d3">{p.packLabel}</h3>
                    {sub !== null && one !== null ? (
                      <p className="price price--md">
                        <span className="price__now">{formatINR(sub)}</span>
                        <s className="price__was">{formatINR(one)}</s>
                        <span className="chip chip--save">Save {formatINR(one - sub)} per delivery</span>
                      </p>
                    ) : (
                      <p className="price price--md price--tba">
                        <span className="price__now">Price at launch</span>
                      </p>
                    )}
                    <ul role="list" className="plan__perks">
                      <li>
                        <Icon name="check" size={16} /> 10% off every delivery
                      </li>
                      <li>
                        <Icon name="check" size={16} /> Free shipping
                      </li>
                      <li>
                        <Icon name="check" size={16} /> Pause, skip or cancel anytime
                      </li>
                    </ul>
                    {canSubscribe(p) ? (
                      <button className="btn" onClick={() => add(p.sku, 1, 'subscription')}>
                        <Icon name="repeat" /> Subscribe
                      </button>
                    ) : (
                      <Link to={productUrl(p)} className="btn btn--ghost">
                        Notify me at launch
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="t-xs muted" style={{ marginTop: 18 }} data-fade>
            The 180-capsule bundle is a one-time purchase and is not available on subscription.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="manage-h">
        <div className="wrap two-col">
          <div className="stack">
            <SectionHead eyebrow="Manage or cancel" title={<span id="manage-h">You’re always <em>in control.</em></span>} size="d3" />
            <p className="t-body" data-fade>
              Sign in to <Link to="/ellura/account" className="link">My Account</Link> and open <strong>Subscriptions</strong> to change your delivery schedule, skip a
              shipment, pause or cancel. Prefer to talk to someone? <Link to="/ellura/support" className="link">Contact customer care</Link> and we’ll do it for you.
            </p>
          </div>
          <div className="card card--bone stack-sm" data-fade>
            <h3 className="t-h4">Subscription terms in brief</h3>
            <ul className="prose" style={{ paddingLeft: '1.1em' }}>
              <li>Your subscription renews automatically at the delivery frequency you choose, until you modify or cancel it before the next billing date.</li>
              <li>The discount applies to each automatic shipment of eligible 30- and 90-capsule packs.</li>
              <li>You can manage, skip or cancel anytime through your account or by contacting customer care.</li>
              <li>Subscription offers can’t be combined with other discounts or promotions unless stated.</li>
              <li>Pharmatoka reserves the right to modify or cancel this offer at any time.</li>
            </ul>
            <p className="t-xs muted">
              Full terms: <Link to="/ellura/policies/offer-terms" className="link">Offers &amp; Promotions Terms</Link>.
            </p>
          </div>
        </div>
      </section>

      <FaqTeaser groupId="subscribe" title="Subscription FAQs" showIntro={false} />
      <CtaBand />
    </div>
  );
}
