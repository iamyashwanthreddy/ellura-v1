import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion } from './gsap';

/**
 * Lenis smooth scrolling driven by the GSAP ticker so ScrollTrigger stays in
 * sync. Disabled for reduced motion; touch devices keep native scrolling.
 */
let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
  if (reducedMotion() || lenis) return () => {};
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToEl(el: HTMLElement, offset = -110) {
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.2 });
  else
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY + offset,
      behavior: reducedMotion() ? 'auto' : 'smooth',
    });
}

/** Locks page scroll while drawers and overlays are open. Ref-counted. */
let locks = 0;
export function lockScroll(lock: boolean) {
  locks = Math.max(0, locks + (lock ? 1 : -1));
  const on = locks > 0;
  if (lenis) {
    if (on) lenis.stop();
    else lenis.start();
  }
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = on ? 'hidden' : '';
  document.documentElement.style.paddingRight = on && sbw > 0 ? `${sbw}px` : '';
}
