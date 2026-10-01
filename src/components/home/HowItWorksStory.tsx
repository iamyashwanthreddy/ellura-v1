import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../lib/gsap';
import { Ref } from '../ui/primitives';

/**
 * “How ellura works” — a scroll-driven diagram. The illustration column is
 * CSS-sticky (no GSAP pin, so nothing can break on mobile); one scrubbed
 * timeline moves between three labelled states as the steps scroll past.
 * Step copy is verbatim from ellurautihealth.com.
 */

// Wall positions where bacteria attach (on the inner lining).
const SITES = [
  { x: 128, y: 250, r: -70 },
  { x: 142, y: 318, r: -45 },
  { x: 190, y: 372, r: -12 },
  { x: 262, y: 362, r: 20 },
  { x: 308, y: 300, r: 50 },
  { x: 318, y: 226, r: 78 },
  { x: 158, y: 188, r: -100 },
];

const STEPS = [
  {
    n: '01',
    title: (
      <>
        Bacteria enter, attach, and multiply
        <Ref n={[17, 6, 3, 4]} />
      </>
    ),
    body: 'Bacteria migrate to the urinary tract, leading to disruption of urinary tract balance.',
  },
  {
    n: '02',
    title: <>ellura may help reduce bacterial adhesion</>,
    body: (
      <>
        36 mg PACs in ellura may reduce certain bacteria from adhering to the bladder wall
        <Ref n={[17, 3, 4]} />.
      </>
    ),
  },
  {
    n: '03',
    title: <>Bacteria are flushed out</>,
    body: 'Without attachment, bacteria are naturally eliminated through urine.',
  },
];

function Bacterium({ i }: { i: number }) {
  return (
    <g className="bac" data-i={i}>
      <g className="bac__pili">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={a} x1="0" y1="0" x2="15" y2="0" transform={`rotate(${a})`} />
        ))}
      </g>
      <ellipse className="bac__body" rx="10" ry="6.5" />
      <g className="bac__pacs">
        {[0, 120, 240].map((a) => (
          <circle key={a} className="pac" r="3.4" cx={Math.cos((a * Math.PI) / 180) * 14} cy={Math.sin((a * Math.PI) / 180) * 11} />
        ))}
      </g>
    </g>
  );
}

export default function HowItWorksStory({ headingId = 'hiw-title', compact = false }: { headingId?: string; compact?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const bacs = gsap.utils.toArray<SVGGElement>('.bac', root);
      const steps = gsap.utils.toArray<HTMLElement>('.hiw__step', root);
      const setActive = (i: number) => steps.forEach((s, j) => s.classList.toggle('is-active', j === i));

      // Starting positions: queued below the urethra, out of view.
      bacs.forEach((b, i) => gsap.set(b, { x: 220 + ((i % 3) - 1) * 8, y: 560 + i * 26, rotation: SITES[i].r, opacity: 0 }));
      gsap.set('.bac__pacs .pac', { scale: 0, transformOrigin: 'center' });

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
      tl.addLabel('s0');
      bacs.forEach((b, i) => {
        tl.to(b, { opacity: 1, duration: 0.05 }, i * 0.05)
          .to(b, { keyframes: [{ x: 220, y: 450, duration: 0.35 }, { x: SITES[i].x, y: SITES[i].y, duration: 0.45 }] }, i * 0.05);
      });
      tl.fromTo('.bac__pili', { scale: 0.5, transformOrigin: 'center' }, { scale: 1, duration: 0.2 }, 0.75)
        .to('.hiw__wall-glow', { opacity: 1, duration: 0.25 }, 0.8)
        .addLabel('s1', 1.1)
        // Step 2: PACs arrive from above and coat each bacterium.
        .fromTo('.pac-cloud circle', { opacity: 0, y: -120 }, { opacity: 1, y: 0, stagger: 0.02, duration: 0.35 }, 's1')
        .to('.pac-cloud', { opacity: 0, duration: 0.2 }, 's1+=0.45')
        .to('.bac__pacs .pac', { scale: 1, stagger: 0.012, duration: 0.3, ease: 'back.out(2)' }, 's1+=0.35')
        .to('.bac__pili', { scale: 0.25, duration: 0.3 }, 's1+=0.5')
        .to('.hiw__wall-glow', { opacity: 0, duration: 0.3 }, 's1+=0.5');
      bacs.forEach((b, i) => {
        tl.to(b, { x: 220 + (SITES[i].x - 220) * 0.55, y: SITES[i].y + (290 - SITES[i].y) * 0.35, rotation: '+=40', duration: 0.4 }, `s1+=${0.55 + i * 0.02}`);
      });
      tl.addLabel('s2', '>+0.1')
        // Step 3: flushed out through the urethra.
        .fromTo('.hiw__flow', { strokeDashoffset: 120, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.8, ease: 'none' }, 's2');
      bacs.forEach((b, i) => {
        tl.to(b, { keyframes: [{ x: 220 + ((i % 3) - 1) * 6, y: 440, duration: 0.3 }, { y: 600, opacity: 0.2, duration: 0.35 }] }, `s2+=${i * 0.05}`);
      });
      tl.addLabel('s3');

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const st = ScrollTrigger.create({
          trigger: root.querySelector('.hiw__steps'),
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.8,
          animation: tl,
        });
        steps.forEach((s, i) =>
          ScrollTrigger.create({
            trigger: s,
            start: 'top 62%',
            end: 'bottom 62%',
            onToggle: (self) => self.isActive && setActive(i),
          }),
        );
        setActive(0);
        return () => st.kill();
      });
      // Reduced motion: no scrubbing — show the key state for the step in view.
      mm.add(MQ.reduce, () => {
        steps.forEach((s, i) =>
          ScrollTrigger.create({
            trigger: s,
            start: 'top 62%',
            end: 'bottom 62%',
            onToggle: (self) => {
              if (!self.isActive) return;
              setActive(i);
              tl.progress(tl.labels[`s${i + 1}`] / tl.duration());
            },
          }),
        );
        tl.progress(tl.labels.s1 / tl.duration());
        setActive(0);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={`hiw on-dark grain ${compact ? 'hiw--compact' : ''}`} data-header-tone="dark" aria-labelledby={headingId}>
      <div className="wrap hiw__grid">
        <div className="hiw__visual">
          <div className="hiw__sticky">
            <svg viewBox="0 0 440 520" className="hiw__svg" role="img" aria-label="Diagram of the bladder: bacteria attach to the wall, PACs coat them, and they are flushed out through the urethra">
              <defs>
                <radialGradient id="hiwGlow" cx="50%" cy="55%" r="55%">
                  <stop offset="0%" stopColor="#d0a6d8" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#d0a6d8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="220" cy="280" rx="210" ry="220" fill="url(#hiwGlow)" />
              {/* ureters */}
              <path className="hiw__ureter" d="M52 12 C 70 70, 96 118, 124 152" />
              <path className="hiw__ureter" d="M388 12 C 370 70, 344 118, 316 152" />
              {/* bladder */}
              <path
                className="hiw__bladder"
                d="M112 150 C 58 176, 58 306, 132 362 C 172 394, 200 404, 205 432 L 205 518 L 235 518 L 235 432 C 240 404, 268 394, 308 362 C 382 306, 382 176, 328 150 C 288 132, 152 132, 112 150 Z"
              />
              <path
                className="hiw__lining"
                d="M122 166 C 80 190, 80 298, 142 348 C 176 376, 204 386, 212 414 M 228 414 C 236 386, 264 376, 298 348 C 360 298, 360 190, 318 166 C 284 150, 156 150, 122 166"
              />
              <path className="hiw__wall-glow" d="M122 166 C 80 190, 80 298, 142 348 C 176 376, 204 386, 212 414 M 228 414 C 236 386, 264 376, 298 348 C 360 298, 360 190, 318 166" />
              <path className="hiw__flow" d="M220 400 L 220 520" />
              <path className="hiw__flow" d="M212 380 L 212 520" style={{ animationDelay: '0.2s' }} />
              <path className="hiw__flow" d="M228 380 L 228 520" />
              <g className="pac-cloud">
                {Array.from({ length: 16 }).map((_, i) => (
                  <circle key={i} r="3.4" cx={150 + (i % 8) * 20} cy={180 + Math.floor(i / 8) * 40 + (i % 2) * 12} />
                ))}
              </g>
              {SITES.map((_, i) => (
                <Bacterium key={i} i={i} />
              ))}
              <g className="hiw__labels">
                <text x="20" y="120">
                  Bladder
                </text>
                <path d="M72 126 L 104 150" />
                <text x="330" y="420">
                  Urinary
                </text>
                <text x="330" y="436">
                  tract wall
                </text>
                <path d="M340 404 L 322 330" />
              </g>
            </svg>
            <ul className="hiw__legend t-mono" role="list">
              <li>
                <i className="hiw__key hiw__key--bac" /> Bacteria
              </li>
              <li>
                <i className="hiw__key hiw__key--pac" /> Soluble A-type PACs
              </li>
            </ul>
          </div>
        </div>

        <div className="hiw__content">
          <header className="hiw__head">
            <p className="eyebrow">The mechanism</p>
            <h2 id={headingId} className="t-d2 accent-em">
              How <span className="brand-word">ellura</span> <em>works</em>
            </h2>
          </header>
          <ol className="hiw__steps" role="list">
            {STEPS.map((s) => (
              <li key={s.n} className="hiw__step">
                <span className="hiw__n t-mono">Step {s.n}</span>
                <h3 className="t-d3">{s.title}</h3>
                <p className="t-lead">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
