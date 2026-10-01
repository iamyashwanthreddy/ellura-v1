import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ATTRIBUTES } from '../../content/brand';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { useReveals } from '../../lib/useReveals';
import Icon, { type IconName } from '../ui/Icon';
import { Ref } from '../ui/primitives';

const ICONS: Record<string, IconName> = { vegan: 'leaf', gluten: 'wheat', gmo: 'dna', sugar: 'cube' };
const RING = 'soluble · bioactive · A-type · proanthocyanidins · from 100% concentrated cranberry fruit juice · ';

/** Homepage doc, Section 6: “Take Control of Your Urinary Tract Health with ellura”. */
export default function TakeControl() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.to('.tc__ring', { rotate: 360, duration: 60, repeat: -1, ease: 'none' });
        gsap.fromTo(
          '.tc__big',
          { yPercent: 18, scale: 0.92 },
          { yPercent: -12, scale: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
        gsap.fromTo(
          '.tc__attr',
          { y: 40, opacity: 0, rotate: (i) => (i % 2 ? 6 : -6) },
          { y: 0, opacity: 1, rotate: 0, stagger: 0.1, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.tc__attrs', start: 'top 85%', once: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="tc section" aria-labelledby="tc-title">
      <div className="tc__big" aria-hidden="true">
        36
      </div>
      <svg className="tc__ring" viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <path id="tcRingPath" d="M200 200 m -170 0 a 170 170 0 1 1 340 0 a 170 170 0 1 1 -340 0" />
        </defs>
        <text>
          <textPath href="#tcRingPath">{RING.repeat(2)}</textPath>
        </text>
      </svg>
      <div className="wrap wrap--narrow tc__inner">
        <p className="eyebrow" data-fade>
          36 mg · soluble · bioactive
        </p>
        <h2 id="tc-title" className="t-d2 accent-em" data-split>
          Take control of your urinary tract health <em>with ellura</em>
        </h2>
        <p className="t-lead tc__lead" data-fade>
          ellura contains 36 mg of soluble, bioactive A-type proanthocyanidins (PACs) from 100% pure concentrated cranberry fruit juice (<i>Vaccinium macrocarpon</i>) —
          a key compound shown in research to help reduce the ability of certain bacteria from adhering to the urinary tract and bladder, supporting urinary tract
          health
          <Ref n={[1, 2]} />.
        </p>
        <ul className="tc__attrs" role="list">
          {ATTRIBUTES.map((a) => (
            <li key={a.key} className="tc__attr">
              <span className="tc__icon">
                <Icon name={ICONS[a.key]} size={30} />
              </span>
              <strong>{a.label}</strong>
              <span className="muted t-xs">{a.note}</span>
            </li>
          ))}
        </ul>
        <Link to="/ellura/shop" className="btn btn--lg" data-magnetic data-fade>
          Buy now <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}
