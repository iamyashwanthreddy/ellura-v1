import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion, { AccordionItem } from '../components/ui/Accordion';
import Icon from '../components/ui/Icon';
import PageHero from '../components/ui/PageHero';
import { Rich } from '../components/ui/primitives';
import { FAQ_GROUPS } from '../content/faqs';
import { scrollToEl } from '../lib/smooth';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

const plain = (s: string) => s.replace(/\^\([\d,\s]+\)|\[\[tbc:[^\]]+\]\]|\{\/[^|}]+\|([^}]+)\}|\*\*/g, (_m, l) => l ?? '');

export default function Faq() {
  const ref = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState('');
  useReveals(ref);

  // FAQPage structured data uses only answers without TBC markers.
  useMeta({
    title: 'ellura® FAQs',
    description: 'Answers about ellura®: how it works, ingredients, how to take it, safety, ordering, shipping, Subscribe & Save and returns.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_GROUPS.flatMap((g) => g.items)
        .filter((f) => !f.a.join(' ').includes('[[tbc'))
        .map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a.join(' ')) } })),
    },
  });

  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return FAQ_GROUPS;
    return FAQ_GROUPS.map((g) => ({ ...g, items: g.items.filter((f) => (f.q + ' ' + plain(f.a.join(' '))).toLowerCase().includes(t)) })).filter((g) => g.items.length);
  }, [q]);
  const count = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div ref={ref}>
      <PageHero
        tone="bone"
        crumbs={[{ label: 'FAQs' }]}
        eyebrow="Help centre"
        title={
          <>
            Frequently asked <em>questions</em>
          </>
        }
        lead="We’re here to help! Below you’ll find answers to our most frequently asked questions. If you need further assistance, reach out — our team will be in touch shortly."
      >
        <div className="faq-search">
          <Icon name="search" />
          <label htmlFor="faq-q" className="sr-only">
            Search FAQs
          </label>
          <input id="faq-q" type="search" className="input" placeholder="Search questions…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </PageHero>

      <section className="section section--tight">
        <div className="wrap faq-layout">
          <nav className="faq-nav" aria-label="FAQ categories">
            <p className="t-mono muted">Categories</p>
            <ul role="list">
              {FAQ_GROUPS.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#faq-${g.id}`}
                    onClick={(e) => {
                      const el = document.getElementById(`faq-${g.id}`);
                      if (el) {
                        e.preventDefault();
                        scrollToEl(el);
                      }
                    }}
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/ellura/support" className="btn btn--sm" style={{ marginTop: 20 }}>
              Contact us
            </Link>
          </nav>
          <div aria-live="polite">
            {q && (
              <p className="muted" style={{ marginBottom: 20 }}>
                {count} result{count === 1 ? '' : 's'} for “{q}”
              </p>
            )}
            {groups.length === 0 && (
              <p className="t-lead">
                No answers match that search. <Link to="/ellura/support" className="link">Ask our team</Link>.
              </p>
            )}
            {groups.map((g) => (
              <section key={g.id} id={`faq-${g.id}`} className="faq-group" aria-labelledby={`faq-h-${g.id}`}>
                <h2 id={`faq-h-${g.id}`} className="t-h4">
                  {g.title}
                </h2>
                <Accordion>
                  {g.items.map((f) => (
                    <AccordionItem key={f.id + q} id={f.id} title={f.q} defaultOpen={!!q || (typeof window !== 'undefined' && window.location.hash === `#${f.id}`)}>
                      {f.a.map((p, i) => (
                        <p key={i}>
                          <Rich text={p} />
                        </p>
                      ))}
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
            <p className="t-xs muted" style={{ marginTop: 32 }}>
              *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.
              **International approvals under non-U.S. regulations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
