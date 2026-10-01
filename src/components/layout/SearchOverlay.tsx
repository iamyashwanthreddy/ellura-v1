import { useDeferredValue, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { search, type SearchItem } from '../../content/search';
import { PRODUCTS, productUrl, src } from '../../commerce/catalog';
import { gsap, useGSAP, reducedMotion } from '../../lib/gsap';
import { useDialog } from '../../lib/useDialog';
import { inert } from '../../lib/a11y';
import Icon from '../ui/Icon';
import { useUI } from './uiState';

const SUGGESTIONS = ['PACs', 'Subscribe', 'antibiotic', 'pregnancy', 'shipping', 'D-mannose'];

export default function SearchOverlay() {
  const { searchOpen: open, setSearchOpen } = useUI();
  const [q, setQ] = useState('');
  const deferred = useDeferredValue(q);
  const results = useMemo(() => search(deferred), [deferred]);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const tl = useRef<gsap.core.Timeline>();
  const close = () => setSearchOpen(false);

  useDialog(open, panel, close, input);

  useGSAP(
    () => {
      const d = reducedMotion() ? 0 : 1;
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: 'visible' })
        .fromTo('.search__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.35 * d })
        .fromTo(panel.current, { yPercent: -100 }, { yPercent: 0, duration: 0.7 * d, ease: 'expo.out' }, 0)
        .fromTo('.search__inner > *', { opacity: 0, y: -16 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 * d }, 0.2 * d);
    },
    { scope: root },
  );
  useGSAP(() => {
    if (open) tl.current?.timeScale(1).play();
    else tl.current?.timeScale(2).reverse();
  }, [open]);

  const groups = results.reduce<Record<string, SearchItem[]>>((acc, r) => {
    (acc[r.type] ||= []).push(r);
    return acc;
  }, {});

  return (
    <div ref={root} className="search" style={{ visibility: 'hidden' }} {...inert(!open)} aria-hidden={!open}>
      <div className="search__backdrop" onClick={close} />
      <div ref={panel} className="search__panel" role="dialog" aria-modal="true" aria-label="Search ellura">
        <div className="search__inner wrap">
          <div className="search__bar">
            <Icon name="search" />
            <label htmlFor="site-search" className="sr-only">
              Search products, articles and FAQs
            </label>
            <input
              ref={input}
              id="site-search"
              type="search"
              className="search__input"
              placeholder="Search products, science, FAQs…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
            />
            <button className="icon-btn" onClick={close} aria-label="Close search">
              <Icon name="close" />
            </button>
          </div>

          <div className="search__results" data-lenis-prevent aria-live="polite">
            {!deferred.trim() ? (
              <div className="search__idle">
                <div>
                  <p className="t-mono muted">Popular searches</p>
                  <div className="search__chips">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} className="chip" onClick={() => setQ(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="t-mono muted">Shop</p>
                  <div className="search__products">
                    {PRODUCTS.map((p) => (
                      <Link key={p.sku} to={productUrl(p)} className="search__product" onClick={close}>
                        <img src={src(p.images[0])} alt="" width={72} height={72} />
                        <span>
                          <strong>{p.shortName}</strong>
                          <span className="muted t-sm">{p.supply}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="search__empty">
                No results for “{deferred}”. Try “PACs”, “subscription” or{' '}
                <Link to="/ellura/support" className="link" onClick={close}>
                  ask our team
                </Link>
                .
              </p>
            ) : (
              Object.entries(groups).map(([type, items]) => (
                <section key={type} className="search__group">
                  <h3 className="t-mono muted">{type === 'FAQ' ? 'FAQs' : `${type}s`}</h3>
                  <ul role="list">
                    {items.map((r) => (
                      <li key={r.url + r.title}>
                        <Link to={r.url} className="search__hit" onClick={close}>
                          <span>{r.title}</span>
                          <Icon name="arrow" size={18} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
