import type { Product, ProductImage } from './types';

/**
 * ellura SKUs for India.
 *
 * Pack sizes (30-Caps, 90-Caps, 180-Caps Bundle) match the official store
 * (ellurautihealth.com/products.json, checked 30 Sep 2026).
 *
 * PRICING — only the 30-capsule price appears in the supplied material
 * (design reference PDF: ₹2,199, MRP ₹2,499, Subscribe & Save 10% → ₹1,979).
 * India prices for 90 and 180 capsules have not been supplied, so they are
 * `null`: the site shows "Price at launch" and a notify-me form instead of
 * inventing a number. Set them here when the commercial team confirms.
 */
export const PRICING_VERIFIED = false;

/** Subscribe & Save discount, from the supplied product-page reference. */
export const SUBSCRIPTION_DISCOUNT = 0.1;

const img = (base: string, alt: string): ProductImage => ({ base: `/images/${base}`, alt, widths: [700, 1400] });

const detailImages: ProductImage[] = [
  img('box-facts', 'ellura carton side panel showing Supplement Facts: 36 mg proanthocyanidins from 206 mg concentrated cranberry fruit juice extract powder (Gikacran®)'),
  img('info-why', 'Why ellura: backed by science and time, focused expertise, uncompromising quality, clinically studied strength, pure juice extract not pomace'),
  img('info-difference', 'Chart: soluble, bioactive A-type PACs from ellura compared with other cranberry products and insoluble PACs from pomace'),
  img('info-use', 'Recommended use: take one ellura capsule daily with water at the same time each day'),
  img('info-quality', 'Quality you can trust: 100% vegan, lactose-free, gluten-free, no sugar added, non-GMO, no dyes'),
  img('box-use', 'ellura carton panel with precautions, recommended use and storage instructions'),
];

export const PRODUCTS: Product[] = [
  {
    sku: 'ELL-30',
    handle: 'ellura-30-capsules',
    name: 'ellura® Urinary Tract Health — 30 capsules',
    shortName: 'ellura® 30',
    packLabel: '30 capsules',
    capsules: 30,
    supply: '1-month supply',
    bottles: 1,
    price: 2199,
    mrp: 2499,
    subscription: { eligible: true, intervalMonths: 1 },
    images: [img('pack-30', 'ellura 30-capsule bottle with its carton on a cream background'), ...detailImages],
    summary: 'One bottle, one capsule a day. The easiest way to start.',
  },
  {
    sku: 'ELL-90',
    handle: 'ellura-90-capsules',
    name: 'ellura® Urinary Tract Health — 90 capsules',
    shortName: 'ellura® 90',
    packLabel: '90 capsules',
    capsules: 90,
    supply: '3-month supply',
    bottles: 1,
    price: null,
    mrp: null,
    subscription: { eligible: true, intervalMonths: 3 },
    images: [img('pack-90', 'ellura 90-capsule bottle with its carton on a cream background'), ...detailImages],
    summary: 'Three months of daily support in a single bottle.',
  },
  {
    sku: 'ELL-180',
    handle: 'ellura-180-capsules-bundle',
    name: 'ellura® Urinary Tract Health — 180-capsule bundle',
    shortName: 'ellura® 180 bundle',
    packLabel: '180 capsules (2 × 90)',
    capsules: 180,
    supply: '6-month supply',
    bottles: 2,
    price: null,
    mrp: null,
    // The official store excludes the 180-Caps Bundle from subscriptions.
    subscription: { eligible: false },
    images: [
      img('pack-180', 'Two ellura 90-capsule bottles side by side — the 180-capsule bundle'),
      img('pack-90', 'ellura 90-capsule bottle with its carton'),
      ...detailImages,
    ],
    summary: 'Two 90-capsule bottles for six months of routine.',
  },
];

export const getProduct = (key: string | undefined): Product | undefined =>
  PRODUCTS.find((p) => p.handle === key || p.sku === key);

export const productUrl = (p: Product) => `/ellura/products/${p.handle}`;

export const srcSet = (image: ProductImage) =>
  `${image.base}-${image.widths[0]}.webp ${image.widths[0]}w, ${image.base}-${image.widths[1]}.webp ${image.widths[1]}w`;

export const src = (image: ProductImage, large = false) => `${image.base}-${image.widths[large ? 1 : 0]}.webp`;

/** Label facts shared by every SKU — transcribed from the official carton. */
export const LABEL = {
  servingSize: '1 capsule',
  active: {
    name: 'Proanthocyanidins (PACs)',
    amount: '36 mg',
    source: 'from 206 mg concentrated Cranberry (Vaccinium macrocarpon) fruit juice extract powder (Gikacran®)',
    dv: 'Daily Value not established',
  },
  otherIngredients: ['Hypromellose (vegetable capsule)', 'Mannitol', 'Magnesium stearate', 'Silicon dioxide'],
  freeFrom: ['GMOs', 'dyes', 'artificial preservatives', 'added sugars', 'soy', 'wheat', 'gluten', 'lactose'],
  directions:
    'Take 1 capsule daily with water. Occasional or repeated use according to your needs or as recommended by your health care provider.',
  precaution: 'Consult your healthcare provider before use if you are taking any anticoagulant medicine.',
  storage: 'Keep bottle tightly closed at room temperature (15–30 °C), away from heat and moisture, and keep out of reach of children.',
  method: 'PACs measured by the scientifically validated DMAC/A2 method.',
};
