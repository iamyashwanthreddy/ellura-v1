import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import CartDrawer from '../commerce/CartDrawer';
import { gsap, ScrollTrigger, reducedMotion, isTouch } from '../../lib/gsap';
import { initSmoothScroll, scrollToTop, scrollToEl } from '../../lib/smooth';
import { setLoaderActive } from '../../lib/intro';

const SESSION_KEY = 'ellura-intro-seen';

export default function Layout() {
  const location = useLocation();
  const routeRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Decide during the first render (before child effects) whether the loader plays.
  const [showLoader, setShowLoader] = useState(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* storage unavailable */
    }
    const rm = reducedMotion();
    const onHome = /^\/(ellura\/?)?$/.test(window.location.pathname);
    const show = !seen && !rm && onHome;
    setLoaderActive(show);
    if (!rm) document.documentElement.classList.add('motion');
    return show;
  });

  useEffect(() => initSmoothScroll(), []);

  // Route change: reset scroll, fade the new page in, refresh triggers, honour #hash.
  useLayoutEffect(() => {
    const hash = location.hash;
    // Pack switches on the product page keep position (navigate with state.keepScroll).
    const keep = (location.state as { keepScroll?: boolean } | null)?.keepScroll;
    if (keep) return;
    if (!hash) scrollToTop(true);
    if (!firstRender.current && routeRef.current && !reducedMotion()) {
      // Opacity only: a transform here would break position:sticky/fixed children.
      gsap.fromTo(routeRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out', clearProps: 'opacity' });
    }
    firstRender.current = false;
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (hash) {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) scrollToEl(el);
      }
    }, hash ? 450 : 200);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  // Refresh ScrollTrigger once fonts and images settle.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Magnetic buttons (hover devices only).
  useEffect(() => {
    if (reducedMotion() || isTouch()) return;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-magnetic]');
      if (!el) return;
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.2, y: (e.clientY - (r.top + r.height / 2)) * 0.3, duration: 0.5, ease: 'power3.out', overwrite: true });
    };
    const onOut = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-magnetic]');
      if (!el || el.contains(e.relatedTarget as Node)) return;
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)', overwrite: true });
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerout', onOut);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {showLoader && (
        <Loader
          onDone={() => {
            try {
              sessionStorage.setItem(SESSION_KEY, '1');
            } catch {
              /* ignore */
            }
            setShowLoader(false);
            setLoaderActive(false);
          }}
        />
      )}
      <Header />
      <main id="main" tabIndex={-1}>
        <div ref={routeRef} key={location.pathname.startsWith('/ellura/products/') ? 'product' : location.pathname} className="route">
          <Outlet />
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <MobileMenu />
    </>
  );
}
