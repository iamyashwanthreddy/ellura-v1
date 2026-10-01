import { useRef } from 'react';
import { DOCTOR, BRAND } from '../../content/brand';
import { gsap, SplitText, useGSAP, MQ } from '../../lib/gsap';
import { useReveals } from '../../lib/useReveals';
import { ArrowLink, Img } from '../ui/primitives';

/**
 * Homepage doc, Section 3: say it is a US-based product now available for
 * India, then "Recommended by Urologists" with Dr. Chughtai’s quote (and his
 * compensated-advisor disclosure, exactly as on the US site).
 */
export default function UsToIndia() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Route line draws from the US to India as you scroll.
        const path = ref.current!.querySelector<SVGPathElement>('.usroute__path')!;
        const len = path.getTotalLength();
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '.usroute', start: 'top 80%', end: 'bottom 45%', scrub: 0.8 },
        });
        tl.fromTo(path, { strokeDashoffset: len, strokeDasharray: `${len} ${len}` }, { strokeDashoffset: 0, ease: 'none' })
          .fromTo('.usroute__dot--in', { scale: 0, transformOrigin: 'center' }, { scale: 1, ease: 'back.out(3)', duration: 0.15 }, 0.85)
          .fromTo('.usroute__label--in', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.15 }, 0.88);

        // Quote words brighten with scroll.
        const split = SplitText.create('.doctor__quote', { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          { opacity: 1, stagger: 0.04, ease: 'none', scrollTrigger: { trigger: '.doctor__quote', start: 'top 80%', end: 'bottom 55%', scrub: 0.5 } },
        );

        gsap.fromTo('.doctor__portrait img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.doctor', start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="usin section" aria-labelledby="usin-title">
      <div className="wrap usin__top">
        <div className="usin__statement">
          <p className="eyebrow" data-fade>
            From the US, for India
          </p>
          <h2 id="usin-title" className="t-d1 accent-em" data-split>
            Trusted in the US for 20+ years. <em>Now in India.</em>
          </h2>
          <p className="t-lead" data-fade>
            Developed by Pharmatoka and trusted in the United States for more than two decades, ellura® now arrives in India — the same research-led approach to
            urinary tract health, in one capsule a day.
          </p>
        </div>

        <div className="usroute" data-fade aria-hidden="true">
          <svg viewBox="0 0 520 240" className="usroute__svg">
            <path className="usroute__grid" d="M0 60H520M0 120H520M0 180H520" />
            <path className="usroute__path" d="M60 170 C 150 30, 360 20, 460 120" />
            <circle className="usroute__dot" cx="60" cy="170" r="7" />
            <circle className="usroute__dot usroute__dot--in" cx="460" cy="120" r="9" />
            <circle className="usroute__pulse" cx="460" cy="120" r="9" />
          </svg>
          <p className="usroute__label usroute__label--us t-mono">
            USA
            <br />
            <span>Pharmatoka Inc. · Atlanta, GA</span>
          </p>
          <p className="usroute__label usroute__label--in t-mono">
            India
            <br />
            <span>2026</span>
          </p>
        </div>
      </div>

      <div className="wrap">
        <dl className="usin__stats" data-stagger>
          <div>
            <dt className="t-mono">Years of cranberry research</dt>
            <dd>
              <span data-count="20">20</span>+
            </dd>
          </div>
          <div>
            <dt className="t-mono">Clinical &amp; scientific studies</dt>
            <dd>
              <span data-count={BRAND.studies}>{BRAND.studies}</span>
            </dd>
          </div>
          <div>
            <dt className="t-mono">International herbal-medicine approvals**</dt>
            <dd>
              <span data-count={BRAND.approvals}>{BRAND.approvals}</span>
            </dd>
          </div>
          <div>
            <dt className="t-mono">Soluble A-type PACs per capsule</dt>
            <dd>
              <span data-count="36">36</span>
              <small>mg</small>
            </dd>
          </div>
        </dl>
      </div>

      <div className="wrap doctor">
        <figure className="doctor__portrait" data-arch>
          <Img photo="doctor" sizes="(max-width: 900px) 90vw, 36vw" width={1200} height={977} />
        </figure>
        <div className="doctor__body">
          <p className="eyebrow" data-fade>
            Recommended by urologists
          </p>
          <blockquote className="doctor__quote">
            <p>“{DOCTOR.quote.join(' ')}”</p>
          </blockquote>
          <div className="doctor__cite" data-fade>
            <p className="doctor__name">{DOCTOR.name}</p>
            <p className="muted t-sm">
              {DOCTOR.role}
              <br />
              {DOCTOR.org}
            </p>
            <p className="doctor__disclosure t-mono">{DOCTOR.disclosure}</p>
          </div>
          <ArrowLink to="/ellura/science">Learn more about the science</ArrowLink>
        </div>
      </div>
    </section>
  );
}
