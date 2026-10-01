import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

gsap.defaults({ ease: 'power3.out', duration: 1 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const reducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Shared motion vocabulary so every section feels like one system. */
export const EASE = {
  out: 'expo.out',
  soft: 'power3.out',
  inOut: 'power4.inOut',
  settle: 'elastic.out(1, 0.6)',
} as const;

/** Media queries used with gsap.matchMedia() across sections. */
export const MQ = {
  desktop: '(min-width: 901px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 900px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
