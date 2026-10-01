import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { getProduct, productUrl, src } from '../../commerce/catalog';
import { formatINR, isPurchasable, unitPrice } from '../../commerce/pricing';
import { PHOTOS, photoSrc, type PhotoKey } from '../../content/images';
import { gsap, useGSAP, MQ, reducedMotion } from '../../lib/gsap';
import { inert } from '../../lib/a11y';
import { useReveals } from '../../lib/useReveals';
import Icon from '../ui/Icon';
import { SectionHead } from '../ui/primitives';

/**
 * Homepage doc, Section 2: "UGC videos playing in a loop".
 * Each reel accepts a `video` (MP4, 9:16, muted, looped). No customer
 * videos have been supplied yet, so reels use editorial stills with a slow
 * push-in. Captions describe routines — they are not testimonials.
 * INTEGRATION: add `video: '/videos/<file>.mp4'` to a reel to switch it on.
 */
interface Reel {
  photo: PhotoKey;
  caption: string;
  tag: string;
  sku: string;
  video?: string;
}

const REELS: Reel[] = [
  { photo: 'calm', tag: '07:30', caption: 'One capsule, first thing', sku: 'ELL-30' },
  { photo: 'glass', tag: 'Hydrate', caption: 'Always with a glass of water', sku: 'ELL-30' },
  { photo: 'sariGolden', tag: 'Daily', caption: 'Part of the day, not a project', sku: 'ELL-90' },
  { photo: 'editorial', tag: '36 mg', caption: 'Soluble A-type PACs, every capsule', sku: 'ELL-30' },
  { photo: 'morning', tag: 'Routine', caption: 'Same time, every day', sku: 'ELL-180' },
  { photo: 'ritual', tag: 'Self-care', caption: 'Small habits add up', sku: 'ELL-30' },
  { photo: 'street', tag: 'On the go', caption: 'One bottle, one month', sku: 'ELL-30' },
  { photo: 'sunlight', tag: 'Travel', caption: 'Two capsules on busy days, then back to one', sku: 'ELL-90' },
];

function ReelCard({ reel }: { reel: Reel }) {
  const { add } = useCart();
  const p = getProduct(reel.sku)!;
  const price = unitPrice(p, 'one-time');
  const ph = PHOTOS[reel.photo];
  return (
    <article className="reel">
      <div className="reel__media">
        {reel.video ? (
          <video src={reel.video} poster={photoSrc(ph)} muted loop playsInline autoPlay preload="metadata" aria-label={ph.alt} />
        ) : (
          <img src={photoSrc(ph)} alt={ph.alt} width={800} height={1200} loading="lazy" decoding="async" />
        )}
        <span className="reel__tag t-mono">{reel.tag}</span>
        <p className="reel__caption">{reel.caption}</p>
      </div>
      <div className="reel__product">
        <img src={src(p.images[0])} alt="" width={56} height={56} loading="lazy" />
        <div className="reel__meta">
          <Link to={productUrl(p)} className="reel__name">
            ellura® · {p.packLabel}
          </Link>
          <span className="reel__price">
            {price !== null ? (
              <>
                {formatINR(price)} {p.mrp && <s>{formatINR(p.mrp)}</s>}
              </>
            ) : (
              'Price at launch'
            )}
          </span>
        </div>
        {isPurchasable(p) ? (
          <button className="reel__buy" onClick={() => add(p.sku, 1, 'one-time')} aria-label={`Add ${p.shortName} to cart`}>
            <Icon name="plus" size={16} /> Add
          </button>
        ) : (
          <Link to={productUrl(p)} className="reel__buy reel__buy--ghost" aria-label={`View ${p.shortName}`}>
            View
          </Link>
        )}
      </div>
    </article>
  );
}

export default function Reels() {
  const ref = useRef<HTMLElement>(null);
  const loop = useRef<gsap.core.Tween>();
  const [paused, setPaused] = useState(false);
  useReveals(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const track = ref.current!.querySelector<HTMLElement>('.reels__track')!;
        const half = track.scrollWidth / 2;
        loop.current = gsap.fromTo(track, { x: 0 }, { x: -half, duration: half / 38, ease: 'none', repeat: -1 });
        // Slow push-in on stills so the loop feels alive.
        gsap.utils.toArray<HTMLElement>('.reel__media img').forEach((img, i) => {
          gsap.fromTo(img, { scale: 1.02 }, { scale: 1.14, duration: 9 + (i % 3), ease: 'sine.inOut', yoyo: true, repeat: -1 });
        });
        // Only run while visible.
        gsap.to({}, {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => (self.isActive ? loop.current?.play() : loop.current?.pause()),
          },
        });
      });
    },
    { scope: ref },
  );

  const hoverPause = (p: boolean) => {
    if (paused || !loop.current) return;
    gsap.to(loop.current, { timeScale: p ? 0 : 1, duration: 0.6, ease: 'power2.out' });
  };

  const togglePause = () => {
    const next = !paused;
    setPaused(next);
    if (loop.current) gsap.to(loop.current, { timeScale: next ? 0 : 1, duration: 0.4 });
  };

  return (
    <section ref={ref} id="reels" className="reels section" aria-labelledby="reels-title">
      <div className="wrap reels__head">
        <SectionHead
          eyebrow="ellura in everyday life"
          title={
            <span id="reels-title">
              One small ritual. <em>Every single day.</em>
            </span>
          }
          lead="A capsule with your morning water — that’s the whole routine. Tap any bottle to shop."
        />
        {!reducedMotion() && (
          <button className="reels__pause chip" onClick={togglePause} aria-pressed={paused}>
            <Icon name={paused ? 'play' : 'pause'} size={14} /> {paused ? 'Play' : 'Pause'} reel
          </button>
        )}
      </div>
      <div className="reels__viewport" onPointerEnter={() => hoverPause(true)} onPointerLeave={() => hoverPause(false)} onFocus={() => hoverPause(true)} onBlur={() => hoverPause(false)}>
        <div className="reels__track">
          {[...REELS, ...REELS].map((r, i) => (
            <div key={i} className="reels__cell" aria-hidden={i >= REELS.length || undefined} {...inert(i >= REELS.length)}>
              <ReelCard reel={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
