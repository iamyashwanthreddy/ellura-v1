import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { photoSrc, photoSrcSet, PHOTOS, type Photo, type PhotoKey } from '../../content/images';
import Icon from './Icon';

/* ---------------------------------------------------------------- Logo */
export function Logo({ tone = 'plum', className = '', height = 30 }: { tone?: 'plum' | 'white'; className?: string; height?: number }) {
  return (
    <img
      src={`/brand/ellura-logo-${tone}.png`}
      alt="ellura®"
      width={Math.round(height * 5.14)}
      height={height}
      className={`logo ${className}`}
      style={{ height, width: 'auto' }}
      decoding="async"
    />
  );
}

/**
 * The four-heart clover from the ellura mark, redrawn as a vector motif for
 * decorative use (loader, separators, backgrounds). The real logo file is
 * always used wherever the brand is identified.
 */
export function Clover({ className = '', style, filled = true }: { className?: string; style?: CSSProperties; filled?: boolean }) {
  const heart =
    'M50 49.5C45.5 43 32 36.5 31.2 24.5 30.6 15.6 36.6 9 43.2 9c3.6 0 5.8 2 6.8 4.2C51 11 53.2 9 56.8 9c6.6 0 12.6 6.6 12 15.5C68 36.5 54.5 43 50 49.5Z';
  return (
    <svg viewBox="0 0 100 100" className={`clover ${className}`} style={style} aria-hidden="true" focusable="false">
      {[0, 90, 180, 270].map((r) => (
        <path
          key={r}
          d={heart}
          transform={`rotate(${r} 50 50)`}
          fill={filled ? 'currentColor' : 'none'}
          stroke={filled ? 'none' : 'currentColor'}
          strokeWidth={filled ? 0 : 1.2}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------- Images */
interface ImgProps {
  photo: Photo | PhotoKey;
  sizes?: string;
  className?: string;
  priority?: boolean;
  alt?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
}

/** Responsive WebP image with explicit dimensions to prevent layout shift. */
export function Img({ photo, sizes = '100vw', className = '', priority, alt, style, width = 1600, height = 1067 }: ImgProps) {
  const ph = typeof photo === 'string' ? PHOTOS[photo] : photo;
  return (
    <img
      src={photoSrc(ph, true)}
      srcSet={photoSrcSet(ph)}
      sizes={sizes}
      alt={alt ?? ph.alt}
      className={className}
      style={style}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // @ts-expect-error — fetchpriority is valid HTML but not yet in React 18 types
      fetchpriority={priority ? 'high' : undefined}
    />
  );
}

/* ------------------------------------------------- Integrity markers */
/** Visible “to be confirmed” marker for anything not yet verified. */
export function Tbc({ children }: { children: ReactNode }) {
  return (
    <span className="tbc" title="Not yet verified — to be confirmed before launch">
      To be confirmed: {children}
    </span>
  );
}

/** Reference superscript linking to the numbered list on The Science page. */
export function Ref({ n }: { n: number[] }) {
  return (
    <sup className="ref">
      (
      {n.map((x, i) => (
        <Fragment key={x}>
          {i > 0 && ','}
          <Link to={`/ellura/science#ref-${x}`} aria-label={`Reference ${x}`}>
            {x}
          </Link>
        </Fragment>
      ))}
      )
    </sup>
  );
}

/**
 * Renders the small inline markup used in content files:
 *   ^(1,2)  [[tbc:text]]  {/path|label}  **strong**
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\^\([\d,\s]+\)|\[\[tbc:[^\]]+\]\]|\{\/[^|}]+\|[^}]+\}|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith('^(')) {
          const ns = part
            .slice(2, -1)
            .split(',')
            .map((s) => parseInt(s.trim(), 10))
            .filter(Boolean);
          return <Ref key={i} n={ns} />;
        }
        if (part.startsWith('[[tbc:')) return <Tbc key={i}>{part.slice(6, -2)}</Tbc>;
        if (part.startsWith('{/')) {
          const [to, label] = part.slice(1, -1).split('|');
          return (
            <Link key={i} to={to} className="link">
              {label}
            </Link>
          );
        }
        if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/* --------------------------------------------------------- Headings */
export function SectionHead({
  eyebrow,
  title,
  lead,
  align = 'left',
  className = '',
  as: H = 'h2',
  size = 'd2',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'd1' | 'd2' | 'd3';
}) {
  return (
    <header className={`section-head section-head--${align} ${className}`}>
      {eyebrow && (
        <p className="eyebrow" data-fade>
          {eyebrow}
        </p>
      )}
      <H className={`t-${size} accent-em`} data-split>
        {title}
      </H>
      {lead && (
        <p className="t-lead" data-fade data-delay="0.1">
          {lead}
        </p>
      )}
    </header>
  );
}

/* ------------------------------------------------------------ Stars */
export function Stars({ value, size = 16, label }: { value: number; size?: number; label?: string }) {
  return (
    <span className="stars" role="img" aria-label={label ?? `${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className="stars__star" style={{ width: size, height: size }}>
            <Icon name="star" size={size} className="stars__bg" />
            <span className="stars__fill" style={{ width: `${fill * 100}%` }}>
              <Icon name="star" size={size} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/* ----------------------------------------------------- Status note */
export function Note({ children, tone = 'info', className = '' }: { children: ReactNode; tone?: 'info' | 'preview' | 'success' | 'error'; className?: string }) {
  const icon = tone === 'success' ? 'check' : tone === 'error' ? 'info' : tone === 'preview' ? 'lock' : 'info';
  return (
    <div className={`note note--${tone} ${className}`} role={tone === 'error' ? 'alert' : 'status'}>
      <Icon name={icon} size={18} />
      <div>{children}</div>
    </div>
  );
}

/** Arrow link used across sections. */
export function ArrowLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`text-link ${className}`}>
      {children}
      <Icon name="arrow" />
    </Link>
  );
}
