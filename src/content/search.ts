import { PRODUCTS, productUrl } from '../commerce/catalog';
import { ARTICLES } from './articles';
import { ALL_FAQS } from './faqs';
import { PAGES } from './nav';

export interface SearchItem {
  type: 'Product' | 'Page' | 'Article' | 'FAQ';
  title: string;
  text: string;
  url: string;
}

const strip = (s: string) => s.replace(/\^\([\d,\s]+\)|\[\[tbc:[^\]]+\]\]|\{\/[^|}]+\|([^}]+)\}|\*\*/g, (_m, label) => label ?? '');

export const SEARCH_INDEX: SearchItem[] = [
  ...PRODUCTS.map((p) => ({
    type: 'Product' as const,
    title: p.shortName,
    text: `${p.packLabel} ${p.supply} ${p.summary} cranberry capsules PACs buy`,
    url: productUrl(p),
  })),
  ...PAGES.map((p) => ({ type: 'Page' as const, title: p.label, text: p.keywords, url: p.to })),
  ...ARTICLES.map((a) => ({
    type: 'Article' as const,
    title: a.title,
    text: `${a.dek} ${a.topic} ${a.sections.map((s) => s.h).join(' ')}`,
    url: `/ellura/learn/${a.slug}`,
  })),
  ...ALL_FAQS.map((f) => ({ type: 'FAQ' as const, title: f.q, text: strip(f.a.join(' ')), url: `/ellura/faq#${f.id}` })),
];

/** Simple ranked search: every term must match; title matches rank higher. */
export function search(query: string, limit = 12): SearchItem[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of SEARCH_INDEX) {
    const title = item.title.toLowerCase();
    const body = item.text.toLowerCase();
    let score = 0;
    let all = true;
    for (const t of terms) {
      if (title.includes(t)) score += title.startsWith(t) ? 6 : 4;
      else if (body.includes(t)) score += 1;
      else {
        all = false;
        break;
      }
    }
    if (all) scored.push({ item, score: score + (item.type === 'Product' ? 2 : 0) });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}
