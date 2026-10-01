import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { gsap, reducedMotion, ScrollTrigger } from '../../lib/gsap';
import { inert } from '../../lib/a11y';
import Icon from './Icon';

interface ItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
  variant?: 'line' | 'pill';
  headingLevel?: 'h3' | 'h4';
}

/**
 * Accessible disclosure (button + region). Height animates with GSAP; the
 * panel stays in the DOM so in-page search and anchors keep working.
 */
export function AccordionItem({ title, children, defaultOpen = false, id, variant = 'line', headingLevel: H = 'h3' }: ItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const uid = useId();
  const btnId = `${id ?? uid}-btn`;
  const panelId = `${id ?? uid}-panel`;

  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      gsap.set(el, { height: open ? 'auto' : 0 });
      return;
    }
    const tween = gsap.to(el, {
      height: open ? 'auto' : 0,
      duration: reducedMotion() ? 0 : 0.55,
      ease: 'power3.inOut',
      onComplete: () => ScrollTrigger.refresh(),
    });
    return () => {
      tween.kill();
    };
  }, [open]);

  return (
    <div className={`acc acc--${variant} ${open ? 'is-open' : ''}`} id={id}>
      <H className="acc__heading">
        <button id={btnId} className="acc__btn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
          <span className="acc__title">{title}</span>
          <span className="acc__icon" aria-hidden="true">
            <Icon name={variant === 'pill' ? 'chevron' : 'plus'} size={18} />
          </span>
        </button>
      </H>
      <div ref={panel} id={panelId} role="region" aria-labelledby={btnId} className="acc__panel" {...inert(!open)}>
        <div className="acc__inner">{children}</div>
      </div>
    </div>
  );
}

export default function Accordion({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`accordion ${className}`}>{children}</div>;
}
