import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { LOADER_DURATION } from '../../lib/intro';
import { lockScroll } from '../../lib/smooth';
import { Clover } from '../ui/primitives';

/**
 * First-visit loader (once per session, skipped for reduced motion):
 * the four hearts of the ellura mark bloom, the wordmark rises, and the
 * plum panel lifts away in an arch — the carton's curve.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      lockScroll(true);
      const tl = gsap.timeline({
        onComplete: () => {
          lockScroll(false);
          setGone(true);
          onDone();
        },
      });
      tl.fromTo('.loader__clover path', { scale: 0, transformOrigin: '50% 50%', opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.09, ease: 'back.out(1.8)' })
        .to('.loader__clover', { rotate: 90, duration: 1.1, ease: 'power3.inOut' }, 0.2)
        .fromTo('.loader__word', { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.out' }, 0.45)
        .fromTo('.loader__line', { scaleX: 0 }, { scaleX: 1, duration: LOADER_DURATION - 0.9, ease: 'power2.inOut' }, 0.2)
        .to('.loader__inner', { y: -40, opacity: 0, duration: 0.45, ease: 'power2.in' }, LOADER_DURATION - 0.75)
        .to(
          ref.current,
          { clipPath: 'inset(0% 0% 100% 0% round 0 0 50% 50%)', duration: 0.85, ease: 'power4.inOut' },
          LOADER_DURATION - 0.55,
        );
    },
    { scope: ref },
  );

  if (gone) return null;
  return (
    <div ref={ref} className="loader on-dark" aria-hidden="true" style={{ clipPath: 'inset(0% 0% 0% 0% round 0 0 0% 0%)' }}>
      <div className="loader__inner">
        <Clover className="loader__clover" />
        <div className="loader__mask">
          <p className="loader__word">ellura</p>
        </div>
        <span className="loader__line" />
        <p className="t-mono loader__sub">36 mg soluble A-type PACs · now in India</p>
      </div>
    </div>
  );
}
