import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import CtaBand from '../../components/ui/CtaBand';
import Accordion, { AccordionItem } from '../../components/ui/Accordion';
import Icon from '../../components/ui/Icon';
import { Crumbs } from '../../components/ui/PageHero';
import { Img, Tbc } from '../../components/ui/primitives';
import { ARTICLES, formatDate, getArticle } from '../../content/articles';
import { PHOTOS, photoSrc } from '../../content/images';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { SITE_URL, useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import NotFound from '../NotFound';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function LearnArticle() {
  const { slug } = useParams();
  const a = getArticle(slug);
  const ref = useRef<HTMLElement>(null);
  useReveals(ref, [slug]);

  useMeta({
    title: a ? a.title : 'Article not found',
    description: a ? a.dek : 'This article could not be found.',
    type: 'article',
    noindex: !a,
    image: a ? photoSrc(PHOTOS[a.image], true) : undefined,
    jsonLd: a
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: a.title,
          description: a.dek,
          datePublished: a.date,
          author: { '@type': a.author.includes('team') ? 'Organization' : 'Person', name: a.author },
          publisher: { '@type': 'Organization', name: 'ellura', logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/ellura-logo-plum.png` } },
          image: SITE_URL + photoSrc(PHOTOS[a.image], true),
          mainEntityOfPage: `${SITE_URL}/ellura/learn/${a.slug}`,
        }
      : undefined,
  });

  // Reading progress bar.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo('.reading-bar', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.article__body', start: 'top 30%', end: 'bottom 70%', scrub: true } });
      });
    },
    { scope: ref, dependencies: [slug], revertOnUpdate: true },
  );

  if (!a) return <NotFound />;
  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <>
      <article ref={ref} className="article">
        <div className="reading-bar" aria-hidden="true" />
        <header className="article__head page-top">
          <div className="wrap wrap--narrow stack">
            <div data-fade="load">
              <Crumbs items={[{ label: 'ellura', to: '/ellura' }, { label: 'Learn', to: '/ellura/learn' }, { label: a.topic }]} />
            </div>
            <h1 className="t-d1" data-split="load">
              {a.title}
            </h1>
            <p className="t-lead" data-fade="load">
              {a.dek}
            </p>
            <div className="byline" data-fade="load">
              <div>
                <span className="t-mono muted">Written by</span>
                <strong>{a.author}</strong>
                {a.authorNote && <span className="t-xs muted">{a.authorNote}</span>}
              </div>
              <div>
                <span className="t-mono muted">Medically reviewed by</span>
                <Tbc>medical reviewer name &amp; credentials</Tbc>
              </div>
              <div>
                <span className="t-mono muted">Published</span>
                <strong>{formatDate(a.date)}</strong>
                <span className="t-xs muted">{a.readMins} min read</span>
              </div>
            </div>
          </div>
          <div className="wrap article__hero" data-img="load">
            <Img photo={a.image} priority sizes="(max-width: 1440px) 100vw, 1400px" width={1600} height={900} />
          </div>
        </header>

        <div className="wrap article__layout">
          <nav className="article__toc" aria-label="In this article">
            <p className="t-mono muted">In this article</p>
            <ol role="list">
              {a.sections.map((s) => (
                <li key={s.h}>
                  <a href={`#${slugify(s.h)}`}>{s.h}</a>
                </li>
              ))}
              <li>
                <a href="#faqs">FAQs</a>
              </li>
              <li>
                <a href="#sources">References</a>
              </li>
            </ol>
          </nav>

          <div className="article__body prose">
            {a.sections.map((s) => (
              <section key={s.h} id={slugify(s.h)} className="article__section">
                <h2 className="t-d3" data-split>
                  {s.h}
                </h2>
                {s.p.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                )}
                {s.callout && (
                  <aside className="pull" data-fade>
                    <p>{s.callout}</p>
                  </aside>
                )}
              </section>
            ))}

            <section id="faqs" className="article__section">
              <h2 className="t-d3">FAQs</h2>
              <Accordion>
                {a.faqs.map((f) => (
                  <AccordionItem key={f.q} title={f.q}>
                    <p>{f.a}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section id="sources" className="article__section">
              <h2 className="t-h4">References</h2>
              <ol className="article__refs">
                {a.references.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
              <p className="t-xs muted">
                Adapted from the original article on{' '}
                <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer">
                  ellurautihealth.com
                </a>
                .
              </p>
            </section>

            <aside className="callout">
              <Icon name="info" size={24} />
              <p className="t-sm">
                This content is for educational purposes only and summarises current research. It is not intended to replace professional medical advice, diagnosis or
                treatment. Always consult your doctor with questions about a medical condition or before starting a new supplement.
              </p>
            </aside>
          </div>
        </div>
      </article>

      <section className="section tone-bone" aria-labelledby="related-h">
        <div className="wrap">
          <h2 id="related-h" className="t-d3" style={{ marginBottom: 28 }}>
            Keep reading
          </h2>
          <ul className="agrid agrid--2" role="list">
            {related.map((r) => (
              <li key={r.slug} className="acard">
                <Link to={`/ellura/learn/${r.slug}`}>
                  <div className="acard__img">
                    <Img photo={r.image} sizes="(max-width: 700px) 100vw, 50vw" width={800} height={600} />
                  </div>
                  <p className="t-mono muted">{r.topic}</p>
                  <h3 className="t-h4">{r.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
