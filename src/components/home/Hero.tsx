import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, MQ, isTouch } from '../../lib/gsap';
import { introDelay } from '../../lib/intro';
import { PHOTOS, photoSrc, photoSrcSet } from '../../content/images';
import Icon from '../ui/Icon';
import { Clover, Ref } from '../ui/primitives';

/**
 * Homepage hero. Copy is the current US hero (per the homepage doc:
 * "Hero Section: Same as the present US website"), re-art-directed:
 * plum night, the carton's arch behind the bottles, floating label facts.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const mm = gsap.matchMedia();
      const base = introDelay();

      mm.add(MQ.motion, () => {
        const intro = gsap.timeline({ delay: base, defaults: { ease: 'expo.out' } });
        intro
          .fromTo('.hero__arch', { clipPath: 'inset(100% 0 0 0 round 50% 50% 0 0)' }, { clipPath: 'inset(0% 0 0 0 round 50% 50% 0 0)', duration: 1.6 })
          .fromTo('.hero__bottles', { yPercent: 18, scale: 0.9, opacity: 0 }, { yPercent: 0, scale: 1, opacity: 1, duration: 1.7 }, 0.15)
          .fromTo('.hero__title .hero__line > span', { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.1)
          .fromTo('.hero__fade', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, ease: 'power3.out' }, 0.55)
          .fromTo('.hero__chip', { opacity: 0, scale: 0.7, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.12, ease: 'back.out(1.6)' }, 0.9)
          .fromTo('.hero__badges img', { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, 1.0);

        // Exit: as the hero scrolls away, layers separate in depth.
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.6 } })
          .to('.hero__bottles', { yPercent: -14, rotate: -4, ease: 'none' }, 0)
          .to('.hero__arch', { scale: 1.08, yPercent: 6, ease: 'none' }, 0)
          .to('.hero__copy', { y: -80, opacity: 0.2, ease: 'none' }, 0)
          .to('.hero__chip--a', { y: -120, ease: 'none' }, 0)
          .to('.hero__chip--b', { y: -60, ease: 'none' }, 0)
          .to('.hero__chip--c', { y: -180, ease: 'none' }, 0);

        gsap.to('.hero__clover', { rotate: 360, duration: 90, repeat: -1, ease: 'none' });
      });

      // Pointer parallax on hover devices.
      mm.add(MQ.desktop, () => {
        if (isTouch()) return;
        const layers = gsap.utils.toArray<HTMLElement>('[data-depth]');
        const setters = layers.map((el) => ({
          x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
          d: parseFloat(el.dataset.depth || '0'),
        }));
        const onMove = contextSafe!((e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach((s) => {
            s.x(nx * s.d);
            s.y(ny * s.d);
          });
        });
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="hero on-dark grain" data-header-tone="dark" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <Clover className="hero__clover" filled={false} />

      <div className="hero__grid wrap">
        <div className="hero__copy">
          <p className="eyebrow hero__fade">Urinary tract health · Now in India</p>
          <h1 id="hero-title" className="t-hero hero__title">
            <span className="hero__line">
              <span>The UTI struggle</span>
            </span>
            <span className="hero__line">
              <span>is real —</span>
            </span>
            <span className="hero__line">
              <span>
                <em>we hear you.</em>
              </span>
            </span>
          </h1>
          <p className="hero__lead hero__fade">If you’ve ever had a UTI, you know how frustrating, painful, and disruptive it can be.</p>
          <p className="hero__body hero__fade">
            <strong>ellura®</strong> is a scientifically and clinically backed supplement that helps reduce the ability of certain bacteria to adhere to the urinary
            tract, supporting urinary tract health*
            <Ref n={[1, 2]} />. Each capsule delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract
            <Ref n={[3, 4]} />.
          </p>
          <div className="hero__ctas hero__fade">
            <Link to="/ellura/shop" className="btn btn--lilac btn--lg" data-magnetic>
              Shop ellura <Icon name="arrow" />
            </Link>
            <Link to="/ellura/how-it-works" className="text-link">
              How it works <Icon name="arrow" />
            </Link>
          </div>
          <div className="hero__badges" aria-label="Recognition">
            <img src="/images/badge-20.webp" alt="20+ years" width={120} height={112} />
            <span aria-hidden="true" />
            <img src="/images/badge-cgmp.webp" alt="Manufactured in a cGMP compliant facility — cGMP certified" width={112} height={112} />
            <span aria-hidden="true" />
            <img src="/images/badge-award.webp" alt="2026 Mindful Awards" width={112} height={112} />
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__arch" data-depth="10" />
          <div className="hero__bottles-wrap" data-depth="26">
            <img
              className="hero__bottles"
              src={photoSrc(PHOTOS.bottlesDuo)}
              srcSet={photoSrcSet(PHOTOS.bottlesDuo)}
              sizes="(max-width: 900px) 80vw, 42vw"
              alt=""
              width={900}
              height={976}
              // @ts-expect-error — valid HTML attribute, not in React 18 types
              fetchpriority="high"
            />
          </div>
          <div className="hero__chip hero__chip--a" data-depth="44">
            <strong>36 mg</strong>
            <span>soluble A-type PACs per capsule</span>
          </div>
          <div className="hero__chip hero__chip--b" data-depth="-30">
            <strong>1×</strong>
            <span>capsule a day, with water</span>
          </div>
          <div className="hero__chip hero__chip--c" data-depth="60">
            <strong>100%</strong>
            <span>concentrated cranberry fruit juice extract</span>
          </div>
        </div>
      </div>

      <a href="#reels" className="hero__scroll t-mono" aria-label="Scroll to next section">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
