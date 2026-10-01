import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { PRODUCTS, productUrl, src, srcSet } from '../../commerce/catalog';
import { canSubscribe, isPurchasable } from '../../commerce/pricing';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { useReveals } from '../../lib/useReveals';
import { Price } from '../commerce/Price';
import Icon from '../ui/Icon';

/**
 * Added section: the three packs as stacked cards. Each card is CSS-sticky;
 * GSAP scrubs the cards beneath back in depth as the next one arrives.
 */
export default function PackStack() {
  const ref = useRef<HTMLElement>(null);
  const { add } = useCart();
  useReveals(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.pack-card');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9 + i * 0.02,
            filter: 'brightness(0.72)',
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 22%', scrub: true },
          });
        });
        gsap.utils.toArray<HTMLElement>('.pack-card__img img').forEach((img) => {
          gsap.fromTo(img, { yPercent: 8, rotate: -3 }, { yPercent: -6, rotate: 0, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="packs section on-dark grain" data-header-tone="dark" aria-labelledby="packs-title">
      <div className="wrap packs__grid">
        <header className="packs__head">
          <div className="packs__sticky">
            <p className="eyebrow" data-fade>
              Shop ellura
            </p>
            <h2 id="packs-title" className="t-d2 accent-em" data-split>
              Choose your <em>supply.</em>
            </h2>
            <p className="t-lead" data-fade>
              One capsule a day. Pick the bottle that fits your routine — and subscribe to save 10% on every delivery, with free shipping.
            </p>
            <ul className="packs__perks" role="list" data-stagger>
              <li>
                <Icon name="repeat" size={18} /> Subscribe &amp; Save 10%
              </li>
              <li>
                <Icon name="truck" size={18} /> Free shipping on subscriptions
              </li>
              <li>
                <Icon name="pause" size={18} /> Pause or cancel anytime
              </li>
            </ul>
            <Link to="/ellura/shop" className="text-link" data-fade>
              Compare all packs <Icon name="arrow" />
            </Link>
          </div>
        </header>

        <ol className="packs__stack" role="list">
          {PRODUCTS.map((p, i) => (
            <li key={p.sku} className="pack-card" style={{ top: `calc(var(--header-h) + 32px + ${i * 22}px)` }}>
              <Link to={productUrl(p)} className="pack-card__img" tabIndex={-1} aria-hidden="true">
                <img src={src(p.images[0], true)} srcSet={srcSet(p.images[0])} sizes="(max-width: 900px) 90vw, 30vw" alt="" width={700} height={700} loading="lazy" />
              </Link>
              <div className="pack-card__body">
                <p className="t-mono pack-card__idx">
                  0{i + 1} / 0{PRODUCTS.length} · {p.supply}
                </p>
                <h3 className="t-d3">
                  <Link to={productUrl(p)}>{p.packLabel}</Link>
                </h3>
                <p className="muted">{p.summary}</p>
                <Price product={p} size="md" />
                <p className="pack-card__sub t-sm">
                  {canSubscribe(p) ? (
                    <>
                      <Icon name="repeat" size={16} /> Or subscribe &amp; save 10% · every {p.subscription.intervalMonths === 1 ? 'month' : `${p.subscription.intervalMonths} months`}
                    </>
                  ) : p.subscription.eligible ? (
                    <>
                      <Icon name="repeat" size={16} /> Subscribe &amp; Save available at launch
                    </>
                  ) : (
                    <>
                      <Icon name="box" size={16} /> {p.bottles} bottles · one-time purchase
                    </>
                  )}
                </p>
                <div className="pack-card__ctas">
                  {isPurchasable(p) ? (
                    <button className="btn" onClick={() => add(p.sku, 1, 'one-time')}>
                      <Icon name="bag" /> Add to cart
                    </button>
                  ) : (
                    <Link to={productUrl(p)} className="btn btn--ghost">
                      Notify me at launch
                    </Link>
                  )}
                  <Link to={productUrl(p)} className="text-link">
                    Details <Icon name="arrow" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
