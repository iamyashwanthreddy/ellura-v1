import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { PRODUCTS, productUrl, src } from '../../commerce/catalog';
import { formatINR, unitPrice } from '../../commerce/pricing';
import { ANNOUNCEMENTS } from '../../content/brand';
import { HEADER_NAV, SHOP_LINKS } from '../../content/nav';
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from '../../lib/gsap';
import { inert } from '../../lib/a11y';
import Icon from '../ui/Icon';
import { Logo } from '../ui/primitives';
import { useUI } from './uiState';

function Announcement() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (reducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>('.announce__item');
      gsap.set(items, { yPercent: 100, opacity: 0 });
      gsap.set(items[0], { yPercent: 0, opacity: 1 });
      const tl = gsap.timeline({ repeat: -1 });
      items.forEach((el, i) => {
        const next = items[(i + 1) % items.length];
        tl.to(el, { yPercent: -100, opacity: 0, duration: 0.6, ease: 'power3.inOut' }, '+=3.6').fromTo(
          next,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.inOut' },
          '<',
        );
      });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="announce" role="region" aria-label="Announcements">
      <div className="announce__track">
        {ANNOUNCEMENTS.map((a, i) => (
          <p key={a} className="announce__item" aria-hidden={i > 0 ? 'true' : undefined}>
            {a}
          </p>
        ))}
      </div>
    </div>
  );
}

function ShopPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div id="shop-panel" className={`mega ${open ? 'is-open' : ''}`} {...inert(!open)} aria-hidden={!open}>
      <div className="mega__inner wrap">
        <div className="mega__links">
          <p className="t-mono muted">Shop ellura</p>
          <ul role="list">
            {SHOP_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={onClose} className="mega__link">
                  {l.label}
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ul role="list" className="mega__products">
          {PRODUCTS.map((p) => {
            const price = unitPrice(p, 'one-time');
            return (
              <li key={p.sku}>
                <Link to={productUrl(p)} className="mega__product" onClick={onClose}>
                  <span className="mega__img">
                    <img src={src(p.images[0])} alt="" width={260} height={260} loading="lazy" />
                  </span>
                  <strong>{p.packLabel}</strong>
                  <span className="muted t-sm">
                    {p.supply} · {price !== null ? formatINR(price) : 'Price at launch'}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link to="/ellura/subscribe" className="mega__promo" onClick={onClose}>
          <span className="t-mono">Subscribe &amp; Save</span>
          <span className="t-d3">
            10% off, <em>every</em> delivery.
          </span>
          <span className="muted t-sm">Free shipping · pause or cancel anytime</span>
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const { totals, setOpen: setCartOpen } = useCart();
  const { setSearchOpen, menuOpen, setMenuOpen } = useUI();
  const location = useLocation();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimer = useRef<number>();
  const countRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(totals.itemCount);

  // Close panels on navigation.
  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
    setHidden(false);
  }, [location.pathname, setMenuOpen]);

  // Tone: sections marked data-header-tone="dark" turn the header light-on-dark.
  useEffect(() => {
    let triggers: ScrollTrigger[] = [];
    const active = new Set<Element>();
    // Lazy pages mount after the route changes, so (re)build whenever #main changes.
    const build = () => {
      triggers.forEach((tr) => tr.kill());
      triggers = [];
      active.clear();
      document.querySelectorAll('[data-header-tone="dark"]').forEach((el) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top top+=40',
            end: 'bottom top+=40',
            onToggle: (self) => {
              if (self.isActive) active.add(el);
              else active.delete(el);
              setDark(active.size > 0);
            },
          }),
        );
      });
      triggers.push(
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const y = self.scroll();
            setScrolled(y > 24);
            if (y < 240) setHidden(false);
            else if (Math.abs(self.getVelocity()) > 40) setHidden(self.direction === 1);
          },
        }),
      );
      // Initial state
      setDark(
        Array.from(document.querySelectorAll('[data-header-tone="dark"]')).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= 41 && r.bottom > 40;
        }),
      );
    };
    let t = window.setTimeout(build, 60);
    const main = document.getElementById('main');
    const mo = new MutationObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(build, 180);
    });
    if (main) mo.observe(main, { childList: true, subtree: false });
    const route = main?.firstElementChild;
    if (route) mo.observe(route, { childList: true });
    return () => {
      window.clearTimeout(t);
      mo.disconnect();
      triggers.forEach((tr) => tr.kill());
    };
  }, [location.pathname]);

  // Cart count bump.
  useEffect(() => {
    if (totals.itemCount > prevCount.current && countRef.current && !reducedMotion()) {
      gsap.fromTo(countRef.current, { scale: 0.4 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
    }
    prevCount.current = totals.itemCount;
  }, [totals.itemCount]);

  const openMega = () => {
    window.clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    window.clearTimeout(megaTimer.current);
    megaTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const onDark = dark && !megaOpen;

  return (
    <>
      <Announcement />
      <header
        className={`header ${onDark ? 'header--dark' : ''} ${scrolled || megaOpen ? 'is-solid' : ''} ${hidden && !megaOpen && !menuOpen ? 'is-hidden' : ''}`}
        onMouseLeave={closeMegaSoon}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setMegaOpen(false);
        }}
      >
        <div className="header__bar wrap">
          <button className="icon-btn header__burger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <Icon name="menu" />
          </button>

          <Link to="/ellura" className="header__logo" aria-label="ellura home">
            <Logo tone={onDark ? 'white' : 'plum'} height={28} />
          </Link>

          <nav className="header__nav" aria-label="Main">
            <ul role="list">
              {HEADER_NAV.map((item) =>
                item.mega ? (
                  <li key={item.to} onMouseEnter={openMega}>
                    <button
                      className={`header__link ${location.pathname.startsWith('/ellura/shop') || location.pathname.startsWith('/ellura/products') ? 'is-active' : ''}`}
                      aria-expanded={megaOpen}
                      aria-controls="shop-panel"
                      onClick={() => setMegaOpen((o) => !o)}
                    >
                      {item.label}
                      <Icon name="chevron" size={14} />
                    </button>
                  </li>
                ) : (
                  <li key={item.to} onMouseEnter={closeMegaSoon}>
                    <NavLink to={item.to} className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}>
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="header__actions">
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Icon name="search" />
            </button>
            <Link to="/ellura/account" className="icon-btn header__account" aria-label="My account">
              <Icon name="user" />
            </Link>
            <button className="icon-btn header__cart" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${totals.itemCount} item${totals.itemCount === 1 ? '' : 's'}`}>
              <Icon name="bag" />
              {totals.itemCount > 0 && (
                <span ref={countRef} className="header__count" aria-hidden="true">
                  {totals.itemCount}
                </span>
              )}
            </button>
            <Link to="/ellura/shop" className={`btn btn--sm header__cta ${onDark ? 'btn--lilac' : ''}`}>
              Shop now
            </Link>
          </div>
        </div>
        <ShopPanel open={megaOpen} onClose={() => setMegaOpen(false)} />
      </header>
      <div className={`mega-scrim ${megaOpen ? 'is-open' : ''}`} onClick={() => setMegaOpen(false)} aria-hidden="true" />
    </>
  );
}
