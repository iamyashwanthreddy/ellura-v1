import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CtaBand from '../../components/ui/CtaBand';
import Icon from '../../components/ui/Icon';
import PageHero from '../../components/ui/PageHero';
import { Img, SectionHead } from '../../components/ui/primitives';
import { ARTICLES, formatDate } from '../../content/articles';
import { HABITS } from '../../content/brand';
import { gsap, useGSAP, reducedMotion } from '../../lib/gsap';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';

const TOPICS = ['All', ...Array.from(new Set(ARTICLES.map((a) => a.topic)))];

export default function Learn() {
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const [topic, setTopic] = useState('All');
  useReveals(ref);
  useMeta({
    title: 'Learn: Urinary Health Hub',
    description: 'Evidence-based articles on urinary tract health for women: cranberry PACs, antibiotic resistance, recurrent UTIs, overactive bladder and more.',
  });

  const [featured, ...rest] = ARTICLES;
  const list = useMemo(() => (topic === 'All' ? rest : ARTICLES.filter((a) => a.topic === topic)), [topic, rest]);

  // Filter transition: cards rise in each time the topic changes.
  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo('.acard', { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out' });
    },
    { dependencies: [topic], scope: gridRef },
  );

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ label: 'Learn' }]}
        eyebrow="Learn: Urinary Health Hub"
        title={
          <>
            Know your body. <em>Know the science.</em>
          </>
        }
        lead="Clear, referenced articles on women’s urinary wellness — from how bacteria attach to what the research says about cranberry. Educational only; always talk to your doctor about symptoms."
      />

      <section className="section section--tight" aria-label="Featured article">
        <div className="wrap">
          <Link to={`/ellura/learn/${featured.slug}`} className="feature" data-fade>
            <div className="feature__img" data-img>
              <Img photo={featured.image} sizes="(max-width: 900px) 100vw, 55vw" width={1600} height={1067} />
            </div>
            <div className="feature__body">
              <p className="t-mono">
                Featured · {featured.topic} · {featured.readMins} min read
              </p>
              <h2 className="t-d3">{featured.title}</h2>
              <p className="muted">{featured.dek}</p>
              <span className="text-link">
                Read article <Icon name="arrow" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="all-h">
        <div className="wrap">
          <div className="learn-filter">
            <h2 id="all-h" className="t-d3">
              All articles
            </h2>
            <div className="tabs" role="group" aria-label="Filter by topic">
              {TOPICS.map((t) => (
                <button key={t} aria-pressed={topic === t} onClick={() => setTopic(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ul ref={gridRef} className="agrid" role="list" aria-live="polite">
            {list.map((a) => (
              <li key={a.slug} className="acard">
                <Link to={`/ellura/learn/${a.slug}`}>
                  <div className="acard__img">
                    <Img photo={a.image} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" width={800} height={600} />
                  </div>
                  <p className="t-mono muted">
                    {a.topic} · {formatDate(a.date)}
                  </p>
                  <h3 className="t-h4">{a.title}</h3>
                  <p className="muted t-sm">{a.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section tone-lilac" aria-labelledby="habits-h">
        <div className="wrap">
          <SectionHead eyebrow="Quick guide" title={<span id="habits-h">Everyday habits for a <em>healthy urinary tract</em></span>} />
          <ol className="habit-grid" role="list" data-stagger>
            {HABITS.map((h, i) => (
              <li key={h.title}>
                <span className="t-mono">{String(i + 1).padStart(2, '0')}</span>
                <strong>{h.title}</strong>
                <span className="muted t-sm">{h.body}</span>
              </li>
            ))}
          </ol>
          <p className="t-xs muted" style={{ marginTop: 20 }}>
            Source: ellurautihealth.com Learn page. If you have symptoms of a UTI — burning, urgency, fever or back pain — see a doctor.
          </p>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
