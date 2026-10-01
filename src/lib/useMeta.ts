import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Canonical origin. The CSV places the brand under /ellura on the parent
 * site; set VITE_SITE_URL at build time if the production domain differs.
 */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://pharmatoka.in';

const BRAND = 'ellura®';
const DEFAULT_IMAGE = '/images/og-ellura.jpg';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export interface MetaOptions {
  title: string;
  description: string;
  image?: string;
  /** Transactional pages (cart, checkout, account) should not be indexed. */
  noindex?: boolean;
  type?: 'website' | 'article' | 'product';
  /** JSON-LD objects rendered into a single script tag for this page. */
  jsonLd?: object | object[];
}

/** Per-page title, description, canonical URL, Open Graph and JSON-LD. */
export function useMeta({ title, description, image, noindex, type = 'website', jsonLd }: MetaOptions) {
  const { pathname } = useLocation();
  const ld = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const full = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
    const url = SITE_URL + pathname.replace(/\/$/, '');
    const img = (image || DEFAULT_IMAGE).startsWith('http') ? image! : SITE_URL + (image || DEFAULT_IMAGE);
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', description);
    setLink('canonical', url);

    const id = 'page-jsonld';
    document.getElementById(id)?.remove();
    if (ld) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = id;
      s.textContent = ld;
      document.head.appendChild(s);
    }
  }, [title, description, image, noindex, type, pathname, ld]);
}
