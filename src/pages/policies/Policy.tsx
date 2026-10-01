import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Crumbs } from '../../components/ui/PageHero';
import { Note, Rich } from '../../components/ui/primitives';
import { getPolicy, POLICIES } from '../../content/policies';
import { scrollToEl } from '../../lib/smooth';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import NotFound from '../NotFound';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Policy() {
  const { policy: slug } = useParams();
  const policy = getPolicy(slug);
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref, [slug]);
  useMeta({ title: policy?.title ?? 'Policy not found', description: policy?.summary ?? '', noindex: !policy });
  if (!policy) return <NotFound />;

  return (
    <div ref={ref} className="policy page-top">
      <div className="wrap">
        <div data-fade="load">
          <Crumbs items={[{ label: 'ellura', to: '/ellura' }, { label: 'Policies' }, { label: policy.title }]} />
        </div>
        <h1 className="t-d1" data-split="load" style={{ margin: '16px 0 14px' }}>
          {policy.title}
        </h1>
        <p className="t-lead" data-fade="load">
          {policy.summary}
        </p>
        <p className="t-xs muted" style={{ marginTop: 10 }}>
          Last updated: <Rich text={policy.updated} />
        </p>
      </div>

      <div className="wrap policy__layout">
        <nav className="policy__nav" aria-label="Policies">
          <p className="t-mono muted">On this page</p>
          <ol role="list">
            {policy.sections.map((s) => (
              <li key={s.h}>
                <a
                  href={`#${slugify(s.h)}`}
                  onClick={(e) => {
                    const el = document.getElementById(slugify(s.h));
                    if (el) {
                      e.preventDefault();
                      scrollToEl(el);
                    }
                  }}
                >
                  {s.h}
                </a>
              </li>
            ))}
          </ol>
          <p className="t-mono muted" style={{ marginTop: 28 }}>
            Other policies
          </p>
          <ul role="list">
            {POLICIES.filter((p) => p.slug !== policy.slug).map((p) => (
              <li key={p.slug}>
                <Link to={`/ellura/policies/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="policy__body prose">
          <Note tone="preview">
            Draft for the India store. Items marked “To be confirmed” need final figures from the commercial and legal teams before launch.
          </Note>
          {policy.sections.map((s, i) => (
            <section key={s.h} id={slugify(s.h)} className="policy__section" data-fade>
              <h2 className="t-h4">
                <span className="t-mono muted">{String(i + 1).padStart(2, '0')}</span> {s.h}
              </h2>
              {s.p.map((p, j) => (
                <p key={j}>
                  <Rich text={p} />
                </p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((l) => (
                    <li key={l}>
                      <Rich text={l} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="t-sm muted">
            Questions about this policy? <Link to="/ellura/support">Contact customer care</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
