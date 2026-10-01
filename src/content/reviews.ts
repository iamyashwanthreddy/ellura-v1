/**
 * Reviews. ellura has no Indian customer reviews yet, and none are invented.
 * The figures below are the published totals on the official US store
 * (ellurautihealth.com product page, checked 30 Sep 2026: 78 reviews;
 * 5★ 72, 4★ 5, 3★ 1, 2★ 0, 1★ 0) and are always labelled as US reviews.
 * The quoted reviews are reproduced verbatim from that page.
 *
 * INTEGRATION: connect a review platform for India and load reviews here.
 */
export const US_REVIEW_STATS = {
  total: 78,
  breakdown: [
    { stars: 5, count: 72 },
    { stars: 4, count: 5 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  source: 'ellurautihealth.com (US store)',
  checked: '30 September 2026',
};

export const usAverage = () => {
  const { breakdown, total } = US_REVIEW_STATS;
  return Math.round((breakdown.reduce((s, b) => s + b.stars * b.count, 0) / total) * 10) / 10;
};

export interface Review {
  name: string;
  location?: string;
  rating: number;
  title?: string;
  body: string;
  source: 'US store';
}

/** Verbatim from the US product page. Star ratings per review are not shown there, so none are displayed. */
export const US_REVIEWS: Review[] = [
  { name: 'Janet S.', location: 'United States', rating: 0, title: 'Great product', body: 'Great product. I have used it for many years.', source: 'US store' },
  {
    name: 'Savannah',
    rating: 0,
    body: 'I’ve been really happy with Ellura! It’s easy to take, and I’ve noticed a positive difference since starting it. Definitely something I’ll continue using!',
    source: 'US store',
  },
  { name: 'Anonymous', location: 'United States', rating: 0, title: 'Good product', body: 'Good product', source: 'US store' },
];
