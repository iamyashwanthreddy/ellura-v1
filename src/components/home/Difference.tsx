import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { useReveals } from '../../lib/useReveals';
import Icon from '../ui/Icon';
import { Img, Ref } from '../ui/primitives';

/**
 * Rebuild of the official “PACs Anti-Adhesion” graphic. The axis is
 * qualitative on the original (100%, <50%, Inferior, Inactive 0%), so it is
 * reproduced as-is with no invented values. Source: Howell et al., J Diet
 * Suppl 2022 (ref 6).
 */
export function AntiAdhesionChart() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } });
        tl.fromTo('.chart__gridline', { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.08, ease: 'power3.inOut', transformOrigin: 'left' })
          .fromTo('.chart__bar--ellura', { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: 'expo.out', transformOrigin: 'bottom' }, 0.3)
          .fromTo('.chart__bar--other', { scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: 'expo.out', transformOrigin: 'bottom' }, 0.55)
          .fromTo('.chart__bar--pomace', { scaleY: 0 }, { scaleY: 1, duration: 1, ease: 'expo.out', transformOrigin: 'bottom' }, 0.7)
          .fromTo('.chart__txt', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 0.9)
          .fromTo('.chart__capsule', { opacity: 0, rotate: -40, y: -30 }, { opacity: 1, rotate: -28, y: 0, duration: 1, ease: 'back.out(1.6)' }, 1);
      });
    },
    { scope: ref },
  );
  return (
    <figure className="chart" ref={ref}>
      <figcaption className="sr-only">
        Chart of urinary anti-adhesion activity. ellura, with 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract powder
        (Gikacran®), reaches the top of the scale (100%). Other cranberry products with less than 36 mg PACs sit below 50%. Insoluble PACs from pomace sit at the
        inferior level, just above inactive (0%).
      </figcaption>
      <div className="chart__plot" aria-hidden="true">
        <p className="chart__axis-title t-mono">Anti-adhesion activity %</p>
        <div className="chart__levels">
          {[
            ['100%', 100],
            ['<50%', 55],
            ['Inferior', 26],
            ['Inactive (0%)', 6],
          ].map(([label, y]) => (
            <div key={label} className="chart__level" style={{ bottom: `${y}%` }}>
              <span className="t-mono">{label}</span>
              <i className="chart__gridline" />
            </div>
          ))}
        </div>
        <div className="chart__cols">
          <div className="chart__col">
            <div className="chart__bar chart__bar--ellura" style={{ height: '94%' }}>
              <span className="chart__brand">ellura</span>
              <span className="chart__txt">Soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract powder (Gikacran®)</span>
              <svg className="chart__capsule" viewBox="0 0 40 90">
                <rect x="4" y="4" width="32" height="82" rx="16" />
                <path d="M4 45h32" />
              </svg>
            </div>
            <p className="chart__x">36 mg PACs</p>
          </div>
          <div className="chart__col">
            <div className="chart__bar chart__bar--other" style={{ height: '49%' }}>
              <span className="chart__txt">Other cranberry products</span>
            </div>
            <div className="chart__bar chart__bar--pomace" style={{ height: '20%' }}>
              <span className="chart__txt">Insoluble PACs from pomace*</span>
            </div>
            <p className="chart__x">&lt;36 mg PACs</p>
          </div>
        </div>
      </div>
      <p className="chart__note t-xs muted">
        *Pomace is the pulp, seeds and skin of the berry. Source: Howell AB, et al. <i>J Diet Suppl</i>. 2022
        <Ref n={[6]} />.
      </p>
    </figure>
  );
}

export default function Difference() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  return (
    <section ref={ref} className="diff section tone-bone" aria-labelledby="diff-title">
      <div className="wrap diff__grid">
        <div className="diff__copy">
          <p className="eyebrow" data-fade>
            Why it’s different
          </p>
          <h2 id="diff-title" className="t-d2 accent-em" data-split>
            How is <span className="brand-word">ellura</span> <em>different?</em>
          </h2>
          <ul className="diff__points" role="list" data-stagger>
            <li>
              <span className="diff__n t-mono">01</span>
              <p>
                <strong>ellura’s</strong> difference lies in its 36 mg of soluble, bioactive A-type PACs
                <Ref n={[6, 3]} /> — a clinically backed formula with superior absorption and the highest concentration of active PACs
                <Ref n={[7]} />, the key component to help reduce the ability of certain bacteria from adhering to the urinary tract.
              </p>
            </li>
            <li>
              <span className="diff__n t-mono">02</span>
              <p>
                Many products claim to have PACs, but if sourced from insoluble cranberry pomace (seeds, stems, skin, pulp), they remain trapped in fibre and cannot be
                absorbed by the body
                <Ref n={[6, 7]} />.
              </p>
            </li>
            <li>
              <span className="diff__n t-mono">03</span>
              <p>
                Clinical research shows that only supplements with the highest levels of soluble PACs, like ellura, deliver powerful urinary tract defence
                <Ref n={[6]} />.
              </p>
            </li>
          </ul>
          <div className="diff__sources" data-fade>
            <figure className="diff__source">
              <div className="diff__source-img" data-img>
                <Img photo="cranberryCut" sizes="(max-width: 900px) 45vw, 18vw" width={800} height={533} />
              </div>
              <figcaption>
                <strong>Juice</strong>
                <span>Soluble PACs — free to be absorbed</span>
              </figcaption>
            </figure>
            <figure className="diff__source diff__source--pomace">
              <div className="diff__source-img" data-img>
                <Img photo="berriesDark" sizes="(max-width: 900px) 45vw, 18vw" width={800} height={533} />
              </div>
              <figcaption>
                <strong>Pomace</strong>
                <span>Insoluble PACs — trapped in fibre</span>
              </figcaption>
            </figure>
          </div>
          <Link to="/ellura/shop" className="btn" data-magnetic>
            Buy ellura <Icon name="arrow" />
          </Link>
        </div>
        <div className="diff__chart" data-fade>
          <AntiAdhesionChart />
        </div>
      </div>
    </section>
  );
}
