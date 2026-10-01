import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../lib/gsap';
import { Clover } from './primitives';

/**
 * Infinite marquee. Speed follows scroll velocity and direction flips with
 * the scroll direction. Static (wrapping) under reduced motion.
 */
export default function Marquee({ items, className = '', speed = 60, separator }: { items: ReactNode[]; className?: string; speed?: number; separator?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const track = ref.current!.querySelector<HTMLElement>('.marquee__track')!;
        const half = track.scrollWidth / 2;
        const tween = gsap.fromTo(track, { x: 0 }, { x: -half, duration: half / speed, ease: 'none', repeat: -1 });
        let dir = 1;
        const st = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            if (self.direction !== dir) dir = self.direction;
            const v = Math.min(4, 1 + Math.abs(self.getVelocity()) / 900);
            gsap.to(tween, { timeScale: v * dir, duration: 0.3, overwrite: true });
            gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.3, overwrite: false });
          },
        });
        return () => st.kill();
      });
    },
    { scope: ref },
  );

  const sep = separator ?? <Clover className="marquee__sep" />;
  const row = (hidden: boolean) =>
    items.map((it, i) => (
      <span key={`${hidden}-${i}`} className="marquee__item" aria-hidden={hidden || undefined}>
        {it}
        {sep}
      </span>
    ));

  return (
    <div ref={ref} className={`marquee ${className}`}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
