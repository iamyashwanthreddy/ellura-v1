import { useRef } from 'react';
import { HABITS } from '../../content/brand';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { useReveals } from '../../lib/useReveals';
import Icon, { type IconName } from '../ui/Icon';
import { ArrowLink, Img } from '../ui/primitives';

const ICONS: IconName[] = ['capsule', 'drop', 'drop', 'leaf', 'repeat', 'leaf', 'shield', 'info', 'bolt'];

/**
 * Added section: everyday habits (from the official Learn page) as a
 * horizontal track. Desktop pins and scrubs it; mobile uses native swipe.
 */
export default function Habits() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const track = ref.current!.querySelector<HTMLElement>('.habits__track')!;
        const distance = () => track.scrollWidth - window.innerWidth + 80;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current!.querySelector('.habits__pin'),
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.to('.habits__progress i', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current!.querySelector('.habits__pin'), start: 'top top', end: () => `+=${distance()}`, scrub: true },
        });
        // Cards tilt in as they cross the viewport (containerAnimation).
        gsap.utils.toArray<HTMLElement>('.habit').forEach((card) => {
          gsap.fromTo(
            card,
            { rotate: 4, y: 40 },
            { rotate: 0, y: 0, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'left 60%', scrub: true } },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="habits tone-lilac" aria-labelledby="habits-title">
      <div className="habits__pin">
        <div className="wrap habits__head">
          <div>
            <p className="eyebrow" data-fade>
              Everyday urinary health
            </p>
            <h2 id="habits-title" className="t-d2 accent-em" data-split>
              One capsule, <em>plus a few good habits.</em>
            </h2>
          </div>
          <div className="habits__progress" aria-hidden="true">
            <i />
          </div>
        </div>
        <div className="habits__viewport" data-lenis-prevent-touch>
          <ol className="habits__track" role="list">
            <li className="habit habit--intro">
              <div className="habit__img">
                <Img photo="glass2" sizes="(max-width: 900px) 80vw, 30vw" width={800} height={1000} />
              </div>
              <div className="habit__intro-body">
                <p className="t-mono">How to take ellura</p>
                <p>
                  Take one capsule daily with water, at the same time each day. When you want extra support — travel, stress — take two, then return to one.
                </p>
              </div>
            </li>
            {HABITS.map((h, i) => (
              <li key={h.title} className="habit">
                <span className="habit__n t-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="habit__icon">
                  <Icon name={ICONS[i]} size={28} />
                </span>
                <h3 className="t-h4">{h.title}</h3>
                <p className="muted">{h.body}</p>
              </li>
            ))}
            <li className="habit habit--end">
              <p className="t-h4">Want the full picture?</p>
              <ArrowLink to="/ellura/learn">Visit the Urinary Health Hub</ArrowLink>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
