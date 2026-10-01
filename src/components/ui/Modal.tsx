import { useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { gsap, useGSAP, reducedMotion } from '../../lib/gsap';
import { useDialog } from '../../lib/useDialog';
import Icon from './Icon';

export default function Modal({ open, onClose, label, children, variant }: { open: boolean; onClose: () => void; label: string; children: ReactNode; variant?: 'image' }) {
  const panel = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useDialog(open, panel, onClose);
  useGSAP(
    () => {
      if (!open || reducedMotion()) return;
      gsap.fromTo('.modal__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(panel.current, { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'expo.out' });
    },
    { dependencies: [open], scope: root },
  );
  if (!open) return null;
  return createPortal(
    <div ref={root} className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <div ref={panel} className={`modal__panel ${variant ? `modal__panel--${variant}` : ''}`} role="dialog" aria-modal="true" aria-label={label} data-lenis-prevent>
        <button className="icon-btn modal__close" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
