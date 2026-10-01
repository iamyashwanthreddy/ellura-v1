import { useRef } from 'react';
import { Link } from 'react-router-dom';
import CtaBand from '../components/ui/CtaBand';
import Icon from '../components/ui/Icon';
import PageHero from '../components/ui/PageHero';
import { Note, Tbc } from '../components/ui/primitives';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

export default function WhereToBuy() {
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useMeta({ title: 'Where to buy ellura®', description: 'Buy genuine ellura® from the official store and authorised retailers in India.' });

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ label: 'Where to buy' }]}
        eyebrow="Where to buy"
        title={
          <>
            Genuine ellura, <em>wherever you shop.</em>
          </>
        }
        lead="Buy from the official ellura store or an authorised retailer so you know your capsules are genuine, correctly stored and covered by our policies."
      />

      <section className="section section--tight" aria-label="Retailers">
        <div className="wrap">
          <ul className="wtb" role="list" data-stagger>
            <li className="wtb__card wtb__card--primary">
              <span className="chip chip--solid">Recommended</span>
              <Icon name="store" size={32} />
              <h2 className="t-d3">Official ellura store</h2>
              <p>The full range, Subscribe &amp; Save (10% off, free shipping) and direct customer care.</p>
              <Link to="/ellura/shop" className="btn btn--lilac">
                Shop now <Icon name="arrow" />
              </Link>
            </li>
            <li className="wtb__card">
              <span className="chip">Marketplace</span>
              <Icon name="bag" size={32} />
              <h2 className="t-d3">Amazon.in</h2>
              <p>
                ellura’s official Amazon.in storefront. <Tbc>store link</Tbc>
              </p>
              <span className="btn btn--ghost" aria-disabled="true">
                Link coming soon
              </span>
            </li>
            <li className="wtb__card">
              <span className="chip">Coming soon</span>
              <Icon name="bolt" size={32} />
              <h2 className="t-d3">Quick commerce &amp; more</h2>
              <p>
                We’re working on bringing ellura to quick-commerce apps and other marketplaces. <Tbc>partners and launch dates</Tbc>
              </p>
              <Link to="/ellura/support" className="btn btn--ghost">
                Ask about availability
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--tight tone-bone" aria-labelledby="auth-h">
        <div className="wrap wrap--narrow stack">
          <h2 id="auth-h" className="t-d3" data-split>
            Product authenticity
          </h2>
          <p className="t-body" data-fade>
            Only buy ellura from the official store or the authorised sellers listed on this page. Genuine ellura comes in a sealed bottle and carton printed with
            “Pharmatoka” and “36 mg soluble, bioactive PACs (proanthocyanidins)”. If a listing looks unusual, the price seems too good to be true, or the seal is broken,
            please don’t use the product and tell us.
          </p>
          <Note>
            Spotted a suspicious seller? <Link to="/ellura/support" className="link">Report it to customer care</Link> with a link or photo — we’ll look into it.
          </Note>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
