import { useRef } from 'react';
import ReviewsWidget from '../components/product/ReviewsWidget';
import CtaBand from '../components/ui/CtaBand';
import Icon from '../components/ui/Icon';
import PageHero from '../components/ui/PageHero';
import { SectionHead, Tbc } from '../components/ui/primitives';
import { DOCTOR } from '../content/brand';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useMeta({ title: 'Reviews & testimonials', description: 'Verified customer reviews of ellura® and what healthcare professionals say about it.' });

  return (
    <div ref={ref}>
      <PageHero
        tone="lilac"
        crumbs={[{ label: 'Reviews' }]}
        eyebrow="Reviews & testimonials"
        title={
          <>
            Real words <em>from real customers.</em>
          </>
        }
        lead="We only publish reviews from verified buyers. ellura has just arrived in India, so the ratings below come from our US store and are labelled that way. Reviews from Indian customers will appear as they come in."
      />

      <section className="section" aria-label="Customer reviews">
        <div className="wrap">
          <ReviewsWidget />
        </div>
      </section>

      <section className="section tone-bone" aria-labelledby="pro-h">
        <div className="wrap wrap--narrow stack-lg">
          <SectionHead eyebrow="From healthcare professionals" title={<span id="pro-h">Recommended <em>by urologists.</em></span>} size="d2" />
          <figure className="pro-quote" data-fade>
            <blockquote>
              <p>“{DOCTOR.quote.join(' ')}”</p>
            </blockquote>
            <figcaption>
              <strong>{DOCTOR.name}</strong> — {DOCTOR.role}, {DOCTOR.org}. <span className="t-mono">{DOCTOR.disclosure}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="policy-h">
        <div className="wrap">
          <h2 id="policy-h" className="t-h4" style={{ marginBottom: 20 }}>
            How we handle reviews <Tbc>review moderation policy</Tbc>
          </h2>
          <ul className="howto howto--compact" role="list" data-stagger>
            <li>
              <Icon name="shield" size={24} />
              <strong>Verified buyers only</strong>
              <p className="muted t-sm">Reviews are linked to a real order before they’re published.</p>
            </li>
            <li>
              <Icon name="check" size={24} />
              <strong>Unfiltered ratings</strong>
              <p className="muted t-sm">We don’t remove reviews for being negative — only for abuse, personal data or medical claims.</p>
            </li>
            <li>
              <Icon name="info" size={24} />
              <strong>Experiences vary</strong>
              <p className="muted t-sm">Reviews are personal experiences, not medical advice. Talk to your doctor about your health.</p>
            </li>
          </ul>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
