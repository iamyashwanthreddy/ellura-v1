import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { src, srcSet } from '../../commerce/catalog';
import type { ProductImage } from '../../commerce/types';
import { gsap, useGSAP, reducedMotion, isTouch } from '../../lib/gsap';
import Icon from '../ui/Icon';

/**
 * Product gallery: thumbnails (desktop), dots + swipe (mobile), arrow keys,
 * directional clip-path transitions and click-to-zoom that follows the pointer.
 */
export default function Gallery({ images, productKey }: { images: ProductImage[]; productKey: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const prev = useRef(0);
  const stage = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const total = images.length;

  // Reset when switching pack.
  useEffect(() => {
    setIndex(0);
    prev.current = 0;
    setZoom(false);
  }, [productKey]);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>('.gallery__slide', stage.current);
      if (index >= slides.length) return;
      const from = prev.current < slides.length ? prev.current : 0;
      const dir = index > from || (from === total - 1 && index === 0) ? 1 : -1;
      slides.forEach((s, i) => {
        gsap.set(s, { zIndex: i === index ? 2 : i === from ? 1 : 0, autoAlpha: i === index || i === from ? 1 : 0 });
      });
      if (from !== index && !reducedMotion()) {
        const cur = slides[index];
        gsap.fromTo(
          cur,
          { clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.out', onComplete: () => gsap.set(slides[from], { autoAlpha: 0 }) },
        );
        gsap.fromTo(cur.querySelector('img'), { scale: 1.12, xPercent: dir * 6 }, { scale: 1, xPercent: 0, duration: 1.1, ease: 'expo.out' });
        gsap.to(slides[from].querySelector('img'), { xPercent: -dir * 10, duration: 0.8, ease: 'expo.out', onComplete: () => gsap.set(slides[from].querySelector('img'), { xPercent: 0 }) });
      } else {
        slides.forEach((s, i) => gsap.set(s, { autoAlpha: i === index ? 1 : 0, clipPath: 'none' }));
      }
      prev.current = index;
    },
    { dependencies: [index, productKey], scope: stage },
  );

  const go = (i: number) => {
    setZoom(false);
    setIndex(((i % total) + total) % total);
  };

  const onPointerDown = (e: RPointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: RPointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(index + (dx < 0 ? 1 : -1));
      return;
    }
    if (!isTouch() && Math.abs(dx) < 5 && Math.abs(dy) < 5) setZoom((z) => !z);
  };
  const onPointerMove = (e: RPointerEvent) => {
    if (!zoom || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    stage.current.style.setProperty('--zx', `${((e.clientX - r.left) / r.width) * 100}%`);
    stage.current.style.setProperty('--zy', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="gallery" aria-roledescription="carousel" aria-label="Product images">
      <ul className="gallery__thumbs" role="list">
        {images.map((im, i) => (
          <li key={im.base + i}>
            <button className="gallery__thumb" aria-current={i === index} aria-label={`Show image ${i + 1} of ${total}: ${im.alt}`} onClick={() => go(i)}>
              <img src={src(im)} alt="" width={84} height={84} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      <div>
        <div
          ref={stage}
          className={`gallery__stage ${!isTouch() ? 'can-zoom' : ''} ${zoom ? 'is-zoom' : ''}`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setZoom(false)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(index + 1);
            if (e.key === 'ArrowLeft') go(index - 1);
          }}
          aria-label={`Image ${index + 1} of ${total}. Use arrow keys to browse.`}
        >
          {images.map((im, i) => (
            <div key={im.base + i} className={`gallery__slide ${i === index ? 'is-current' : ''}`} aria-hidden={i !== index} role="group" aria-roledescription="slide">
              <img
                src={src(im, true)}
                srcSet={srcSet(im)}
                sizes="(max-width: 900px) 100vw, 50vw"
                alt={im.alt}
                width={1400}
                height={1400}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
          <span className="gallery__count" aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="gallery__nav">
            <button onClick={() => go(index - 1)} aria-label="Previous image" onPointerUp={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
              <Icon name="chevronLeft" size={20} />
            </button>
            <button onClick={() => go(index + 1)} aria-label="Next image" onPointerUp={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
              <Icon name="chevronRight" size={20} />
            </button>
          </div>
        </div>
        <div className="gallery__dots" style={{ marginTop: 14 }}>
          {images.map((_, i) => (
            <button key={i} aria-label={`Image ${i + 1}`} aria-current={i === index} onClick={() => go(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
