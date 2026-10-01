import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { PRODUCTS, productUrl, src, srcSet } from '../../commerce/catalog';
import { canSubscribe, formatINR, isPurchasable, unitPrice } from '../../commerce/pricing';
import { Price } from '../../components/commerce/Price';
import Icon from '../../components/ui/Icon';
import PageHero from '../../components/ui/PageHero';
import CtaBand from '../../components/ui/CtaBand';
import FaqTeaser from '../../components/home/FaqTeaser';
import { SectionHead, Tbc } from '../../components/ui/primitives';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';

export default function Shop() {
  const ref = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  useReveals(ref);
  useMeta({
    title: 'Shop all ellura® packs',
    description: 'Shop ellura® urinary tract health capsules: 30 capsules, 90 capsules and the 180-capsule bundle. Subscribe & Save 10% with free shipping.',
  });

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ label: 'Shop' }]}
        eyebrow="Shop all"
        title={
          <>
            One formula. <em>Three ways to stock up.</em>
          </>
        }
        lead="Every ellura capsule delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract. Choose the supply that suits your routine."
        photo="pack180"
      />

      <section className="section section--tight" aria-labelledby="packs-h">
        <h2 id="packs-h" className="sr-only">
          ellura packs
        </h2>
        <div className="wrap">
          <ul className="shop-grid" role="list" data-stagger>
            {PRODUCTS.map((p) => {
              const sub = unitPrice(p, 'subscription');
              return (
                <li key={p.sku} className="pcard">
                  <Link to={productUrl(p)} className="pcard__media" tabIndex={-1} aria-hidden="true">
                    <img src={src(p.images[0], true)} srcSet={srcSet(p.images[0])} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" alt="" width={700} height={700} loading="lazy" />
                    <img src={src(p.images[1])} alt="" width={700} height={700} loading="lazy" />
                  </Link>
                  {!isPurchasable(p) && <span className="chip chip--lilac pcard__badge">Coming at launch</span>}
                  <div className="pcard__body">
                    <p className="t-mono muted">{p.supply}</p>
                    <h3 className="pcard__title">
                      <Link to={productUrl(p)}>{p.packLabel}</Link>
                    </h3>
                    <p className="pcard__meta">{p.summary}</p>
                    <Price product={p} size="md" />
                    {canSubscribe(p) && sub !== null && (
                      <p className="t-sm" style={{ color: 'var(--plum)', fontWeight: 600 }}>
                        <Icon name="repeat" size={14} /> {formatINR(sub)} with Subscribe &amp; Save
                      </p>
                    )}
                    <div className="pcard__foot">
                      {isPurchasable(p) ? (
                        <button className="btn btn--sm" onClick={() => add(p.sku, 1, 'one-time')}>
                          <Icon name="bag" /> Add to cart
                        </button>
                      ) : (
                        <Link to={productUrl(p)} className="btn btn--sm btn--ghost">
                          Notify me
                        </Link>
                      )}
                      <Link to={productUrl(p)} className="text-link t-sm" aria-label={`View details for ${p.packLabel}`}>
                        Details <Icon name="arrow" />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section--tight tone-bone" aria-labelledby="compare-h">
        <div className="wrap wrap--narrow stack-lg">
          <SectionHead
            eyebrow="Compare"
            title={
              <span id="compare-h">
                Which pack is <em>right for you?</em>
              </span>
            }
            size="d3"
          />
          <div className="table-scroll" data-fade>
            <table className="compare">
              <caption className="sr-only">Comparison of ellura packs</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {PRODUCTS.map((p) => (
                    <th key={p.sku} scope="col">
                      {p.packLabel}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Supply at 1 capsule a day</th>
                  {PRODUCTS.map((p) => (
                    <td key={p.sku}>{p.supply}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Bottles</th>
                  {PRODUCTS.map((p) => (
                    <td key={p.sku}>{p.bottles}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">PACs per capsule</th>
                  {PRODUCTS.map((p) => (
                    <td key={p.sku}>36 mg</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">One-time price</th>
                  {PRODUCTS.map((p) => {
                    const u = unitPrice(p, 'one-time');
                    return <td key={p.sku}>{u !== null ? formatINR(u) : <Tbc>India price</Tbc>}</td>;
                  })}
                </tr>
                <tr>
                  <th scope="row">Subscribe &amp; Save</th>
                  {PRODUCTS.map((p) => (
                    <td key={p.sku}>{p.subscription.eligible ? `10% off, every ${p.subscription.intervalMonths === 1 ? 'month' : `${p.subscription.intervalMonths} months`}` : 'Not available for bundles'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="t-xs muted" data-fade>
            Prices are MRP-inclusive of all taxes. India pricing for the 90-capsule bottle and 180-capsule bundle will be announced at launch.
          </p>
        </div>
      </section>

      <FaqTeaser groupId="how-to-take" title="Before you buy" showIntro={false} />
      <CtaBand
        title={
          <>
            Subscribe once. <em>Save 10% every time.</em>
          </>
        }
        body="Deliveries arrive on your schedule with free shipping. Skip, pause or cancel anytime from your account."
        primary={{ to: '/ellura/subscribe', label: 'How Subscribe & Save works' }}
        secondary={null}
      />
    </div>
  );
}
