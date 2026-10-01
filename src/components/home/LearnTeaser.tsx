import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES, formatDate } from '../../content/articles';
import { PHOTOS, photoSrc } from '../../content/images';
import { gsap, useGSAP, isTouch, MQ } from '../../lib/gsap';
import { useReveals } from '../../lib/useReveals';
import Icon from '../ui/Icon';
import { ArrowLink } from '../ui/primitives';

/**
 * Added section: editorial list of Learn articles. On hover devices a
 * floating image follows the pointer and cross-fades between articles.
 */
export default function LearnTeaser() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const list = ARTICLES.slice(0, 4);
  useReveals(ref);

  useGSAP(
    (_c, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        if (isTouch()) return;
        const float = ref.current!.querySelector<HTMLElement>('.learn-t__float')!;
        const xTo = gsap.quickTo(float, 'x', { duration: 0.6, ease: 'power3.out' });
        const yTo = gsap.quickTo(float, 'y', { duration: 0.6, ease: 'power3.out' });
        const listEl = ref.current!.querySelector<HTMLElement>('.learn-t__list')!;
        const move = contextSafe!((e: PointerEvent) => {
          const r = listEl.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        });
        const enter = contextSafe!(() => gsap.to(float, { opacity: 1, scale: 1, duration: 0.4 }));
        const leave = contextSafe!(() => gsap.to(float, { opacity: 0, scale: 0.85, duration: 0.3 }));
        listEl.addEventListener('pointermove', move);
        listEl.addEventListener('pointerenter', enter);
        listEl.addEventListener('pointerleave', leave);
        return () => {
          listEl.removeEventListener('pointermove', move);
          listEl.removeEventListener('pointerenter', enter);
          listEl.removeEventListener('pointerleave', leave);
        };
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="learn-t section" aria-labelledby="learn-t-title">
      <div className="wrap">
        <div className="learn-t__head">
          <div>
            <p className="eyebrow" data-fade>
              Learn: Urinary Health Hub
            </p>
            <h2 id="learn-t-title" className="t-d2 accent-em" data-split>
              Know your body. <em>Know the science.</em>
            </h2>
          </div>
          <ArrowLink to="/ellura/learn">All articles</ArrowLink>
        </div>
        <div className="learn-t__list">
          <div className="learn-t__float" aria-hidden="true">
            {list.map((a, i) => (
              <img key={a.slug} src={photoSrc(PHOTOS[a.image])} alt="" className={i === active ? 'is-active' : ''} width={800} height={600} loading="lazy" />
            ))}
          </div>
          <ul role="list" data-stagger>
            {list.map((a, i) => (
              <li key={a.slug}>
                <Link to={`/ellura/learn/${a.slug}`} className="learn-t__row" onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                  <span className="t-mono learn-t__topic">{a.topic}</span>
                  <span className="learn-t__title">{a.title}</span>
                  <span className="t-mono muted learn-t__date">{formatDate(a.date)}</span>
                  <Icon name="arrowUpRight" className="learn-t__icon" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
