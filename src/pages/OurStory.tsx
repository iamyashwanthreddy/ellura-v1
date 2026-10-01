import { useRef } from 'react';
import CtaBand from '../components/ui/CtaBand';
import PageHero from '../components/ui/PageHero';
import { Img, SectionHead } from '../components/ui/primitives';
import { TIMELINE } from '../content/brand';
import type { PhotoKey } from '../content/images';
import { gsap, useGSAP, MQ } from '../lib/gsap';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

const IMG: Record<string, PhotoKey> = {
  'cranberry-bog': 'bog',
  'berries-frost': 'berriesFrost',
  'lab-pipette': 'labPipette',
  atlanta: 'atlanta',
  india: 'india',
};

export default function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useMeta({
    title: 'Our Story',
    description: 'From a French cranberry-extract programme begun in 2004 to more than 20 years of trust in the US — and now, ellura® in India.',
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const track = ref.current!.querySelector<HTMLElement>('.tl__track')!;
        const pin = ref.current!.querySelector<HTMLElement>('.tl__pin')!;
        const distance = () => track.scrollWidth - window.innerWidth + 60;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>('.tl__item').forEach((item) => {
          const img = item.querySelector('img');
          if (img)
            gsap.fromTo(img, { scale: 1.25, xPercent: 8 }, { scale: 1, xPercent: -4, ease: 'none', scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
          gsap.fromTo(
            item.querySelector('.tl__year'),
            { yPercent: 40, opacity: 0.2 },
            { yPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left 90%', end: 'left 45%', scrub: true } },
          );
        });
        gsap.to('.tl__bar i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: true } });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ label: 'Our Story' }]}
        eyebrow="Our story"
        title={
          <>
            Born from a berry. <em>Built on two decades of science.</em>
          </>
        }
        lead="ellura began with a simple conviction at Pharmatoka: if cranberry was going to help women, it had to be measured, consistent and backed by research. Twenty years on, that conviction arrives in India."
        photo="berriesFrost"
      />

      <section className="section section--tight" aria-labelledby="heritage-h">
        <div className="wrap two-col">
          <SectionHead eyebrow="Heritage" title={<span id="heritage-h">French roots. <em>American trust.</em></span>} size="d2" />
          <div className="stack t-body" data-fade>
            <p>
              Pharmatoka is a French company that researches, develops and produces botanical supplements for urogenital health. In 2004 it began developing a
              concentrated cranberry fruit-juice extract — the work that became ellura two years later.
            </p>
            <p>
              Since then ellura has been studied in clinical and scientific research, recognised with herbal-medicine approvals in 22 countries**, and recommended by
              healthcare professionals in the United States, where it has supported women’s urinary tract health for more than 20 years.
            </p>
          </div>
        </div>
      </section>

      <section className="tl tone-bone" aria-labelledby="tl-h">
        <div className="tl__pin">
          <div className="wrap tl__head">
            <h2 id="tl-h" className="t-d2 accent-em" data-split>
              The ellura <em>timeline</em>
            </h2>
            <div className="tl__bar" aria-hidden="true">
              <i />
            </div>
          </div>
          <ol className="tl__track" role="list">
            {TIMELINE.map((t) => (
              <li key={t.year} className="tl__item">
                <div className="tl__img">
                  <Img photo={IMG[t.image]} sizes="(max-width: 900px) 80vw, 34vw" width={800} height={1000} />
                </div>
                <div className="tl__text">
                  <span className="tl__year">{t.year}</span>
                  <h3 className="t-h4">{t.title}</h3>
                  <p className="muted">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="field-h">
        <div className="wrap two-col" style={{ alignItems: 'center' }}>
          <div className="arch-frame" data-arch>
            <Img photo="plant" sizes="(max-width: 900px) 100vw, 45vw" width={1200} height={1500} />
          </div>
          <div className="stack">
            <SectionHead eyebrow="From field to capsule" title={<span id="field-h">We control <em>every step.</em></span>} size="d2" />
            <p className="t-body" data-fade>
              At Pharmatoka, we control every step of production — from selecting the finest cranberry fruit, naturally rich in PACs, to crafting our proprietary
              Gikacran® cranberry extract. This rigorous process ensures that every capsule of ellura delivers the clinically backed 36 mg of soluble, bioactive A-type
              PACs that makes it unique in quality and composition.
            </p>
            <ul className="field-steps" role="list" data-stagger>
              <li>
                <span className="t-mono">01</span> Cranberry fruit rich in PACs
              </li>
              <li>
                <span className="t-mono">02</span> Juice concentrated — not pomace
              </li>
              <li>
                <span className="t-mono">03</span> Gikacran® extract, standardised by DMAC/A2
              </li>
              <li>
                <span className="t-mono">04</span> One 36 mg PAC capsule, made under GMP
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section on-dark grain" data-header-tone="dark" aria-labelledby="india-h">
        <div className="wrap two-col" style={{ alignItems: 'center' }}>
          <div className="stack">
            <SectionHead eyebrow="Now in India" title={<span id="india-h">The same science, <em>closer to home.</em></span>} size="d2" />
            <p className="t-body" data-fade>
              Urinary tract health is a conversation many women in India still have quietly. ellura arrives to make it easier — with honest information, a simple daily
              routine and a formula grounded in more than 20 years of cranberry research.
            </p>
          </div>
          <div className="phero__media phero__media--wide" data-img>
            <Img photo="sariGolden" sizes="(max-width: 900px) 100vw, 45vw" width={1200} height={960} />
          </div>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
