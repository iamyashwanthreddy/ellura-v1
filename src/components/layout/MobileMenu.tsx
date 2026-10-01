import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, productUrl, src } from '../../commerce/catalog';
import { HEADER_NAV, SHOP_LINKS } from '../../content/nav';
import { gsap, useGSAP, reducedMotion } from '../../lib/gsap';
import { useDialog } from '../../lib/useDialog';
import { inert } from '../../lib/a11y';
import Icon from '../ui/Icon';
import { Logo } from '../ui/primitives';
import { useUI } from './uiState';

export default function MobileMenu() {
  const { menuOpen: open, setMenuOpen, setSearchOpen } = useUI();
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline>();
  const close = () => setMenuOpen(false);
  useDialog(open, panel, close, closeBtn);

  useGSAP(
    () => {
      const d = reducedMotion() ? 0 : 1;
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: 'visible' })
        .fromTo(panel.current, { clipPath: 'circle(0% at 28px 28px)' }, { clipPath: 'circle(150% at 28px 28px)', duration: 0.8 * d, ease: 'power3.inOut' })
        .fromTo('.mmenu__big a', { yPercent: 110 }, { yPercent: 0, stagger: 0.05, duration: 0.7 * d, ease: 'expo.out' }, 0.3 * d)
        .fromTo('.mmenu__rest', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 * d }, 0.45 * d);
    },
    { scope: root },
  );
  useGSAP(() => {
    if (open) tl.current?.timeScale(1).play();
    else tl.current?.timeScale(1.8).reverse();
  }, [open]);

  return (
    <div ref={root} className="mmenu" style={{ visibility: 'hidden' }} {...inert(!open)} aria-hidden={!open}>
      <div ref={panel} id="mobile-menu" className="mmenu__panel on-dark" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mmenu__top">
          <button ref={closeBtn} className="icon-btn" onClick={close} aria-label="Close menu">
            <Icon name="close" />
          </button>
          <Logo tone="white" height={24} />
          <button
            className="icon-btn"
            onClick={() => {
              close();
              setTimeout(() => setSearchOpen(true), 250);
            }}
            aria-label="Search"
          >
            <Icon name="search" />
          </button>
        </div>
        <div className="mmenu__scroll" data-lenis-prevent>
          <nav aria-label="Mobile">
            <ul role="list" className="mmenu__big">
              {[...HEADER_NAV.map((n) => ({ label: n.mega ? 'Shop all' : n.label, to: n.to })), ...SHOP_LINKS.slice(1)].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} onClick={close}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mmenu__rest mmenu__products">
            {PRODUCTS.map((p) => (
              <Link key={p.sku} to={productUrl(p)} onClick={close}>
                <img src={src(p.images[0])} alt="" width={120} height={120} loading="lazy" />
                <span>{p.packLabel}</span>
              </Link>
            ))}
          </div>
          <ul role="list" className="mmenu__rest mmenu__small">
            <li>
              <Link to="/ellura/account" onClick={close}>
                <Icon name="user" size={18} /> My account
              </Link>
            </li>
            <li>
              <Link to="/ellura/track-order" onClick={close}>
                <Icon name="truck" size={18} /> Track order
              </Link>
            </li>
            <li>
              <Link to="/ellura/support" onClick={close}>
                <Icon name="chat" size={18} /> Help &amp; Support
              </Link>
            </li>
            <li>
              <Link to="/ellura/our-story" onClick={close}>
                <Icon name="leaf" size={18} /> Our story
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
