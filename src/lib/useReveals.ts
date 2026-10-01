import type { RefObject } from 'react';
import { gsap, SplitText, useGSAP, reducedMotion } from './gsap';
import { introDelay } from './intro';

/**
 * Declarative motion for a page or section. Mark up elements and this hook
 * animates them inside a scoped useGSAP context (reverted on unmount):
 *
 *   data-split[="load"]   masked line rise for headings
 *   data-fade[="load"]    fade + rise
 *   data-stagger          direct children fade + rise in sequence
 *   data-img[="load"]     clip-path wipe with the image settling inside
 *   data-arch             same wipe, but the mask opens as an arch
 *   data-parallax="n"     scrubbed vertical drift, n = yPercent
 *   data-count="n"        count-up (data-decimals optional)
 *   data-draw             SVG stroke draw (scrubbed)
 *   data-delay="s"        extra delay
 *
 * "load" plays the element as part of the page intro rather than on scroll.
 * Under prefers-reduced-motion nothing is hidden and nothing moves.
 */
export function useReveals(scope: RefObject<HTMLElement>, deps: unknown[] = []) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const base = introDelay();
      if (reducedMotion()) return;
      const delayOf = (el: HTMLElement) => parseFloat(el.dataset.delay || '0');
      const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & Element>(sel)) as T[];

      q('[data-split]').forEach((el) => {
        const onLoad = el.dataset.split === 'load';
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          linesClass: 'split-line',
          onSplit(self) {
            el.classList.add('is-split');
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: onLoad ? 1.3 : 1.15,
              ease: 'expo.out',
              stagger: 0.09,
              delay: (onLoad ? base : 0) + delayOf(el),
              scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
            });
          },
        });
      });

      q('[data-fade]').forEach((el) => {
        const onLoad = el.dataset.fade === 'load';
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: 'power3.out',
            delay: (onLoad ? base + 0.3 : 0) + delayOf(el),
            scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 90%', once: true },
          },
        );
      });

      q('[data-stagger]').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
            delay: (group.dataset.stagger === 'load' ? base + 0.35 : 0) + delayOf(group),
            scrollTrigger: group.dataset.stagger === 'load' ? undefined : { trigger: group, start: 'top 88%', once: true },
          },
        );
      });

      q('[data-img], [data-arch]').forEach((el) => {
        const img = el.querySelector('img, video');
        const arch = el.hasAttribute('data-arch');
        const onLoad = el.dataset.img === 'load' || el.dataset.arch === 'load';
        const tl = gsap.timeline({
          delay: (onLoad ? base + 0.1 : 0) + delayOf(el),
          scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 86%', once: true },
        });
        if (arch) {
          tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 50% 50% 0 0)' }, { clipPath: 'inset(0% 0% 0% 0% round 50% 50% 0 0)', duration: 1.5, ease: 'expo.out' });
        } else {
          tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: 'expo.out' });
        }
        if (img) tl.fromTo(img, { scale: 1.22 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0);
        tl.set(el, { clearProps: 'clipPath' });
      });

      q('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || '10');
        gsap.fromTo(
          el,
          { yPercent: -amt },
          {
            yPercent: amt,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      q('[data-count]').forEach((el) => {
        const to = parseFloat(el.dataset.count || '0');
        const dec = parseInt(el.dataset.decimals || '0', 10);
        const obj = { v: 0 };
        el.textContent = (0).toFixed(dec);
        gsap.to(obj, {
          v: to,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(dec);
          },
        });
      });

      q<SVGPathElement>('[data-draw]').forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: path.closest('[data-draw-trigger]') || path, start: 'top 80%', end: 'bottom 40%', scrub: 0.6 },
          },
        );
      });
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );
}
