/**
 * Navigation mirrors the CSV "Menu Placement" column:
 *   Brand header — Shop All, Subscribe & Save, How ellura Works, The Science,
 *                  Reviews, Learn, Where to Buy, FAQs (+ Cart, Account icons)
 *   Brand footer — Our Story, Help & Support, Track Your Order, policies
 */
export const HEADER_NAV = [
  { label: 'Shop', to: '/ellura/shop', mega: true },
  { label: 'How it works', to: '/ellura/how-it-works' },
  { label: 'The Science', to: '/ellura/science' },
  { label: 'Learn', to: '/ellura/learn' },
  { label: 'Reviews', to: '/ellura/reviews' },
  { label: 'FAQs', to: '/ellura/faq' },
];

/** Secondary header links (shown in the Shop mega panel and mobile menu). */
export const SHOP_LINKS = [
  { label: 'Shop all', to: '/ellura/shop' },
  { label: 'Subscribe & Save', to: '/ellura/subscribe' },
  { label: 'Where to buy', to: '/ellura/where-to-buy' },
];

export const FOOTER_NAV = [
  {
    title: 'Shop',
    links: [
      { label: 'Shop all', to: '/ellura/shop' },
      { label: '30 capsules', to: '/ellura/products/ellura-30-capsules' },
      { label: '90 capsules', to: '/ellura/products/ellura-90-capsules' },
      { label: '180-capsule bundle', to: '/ellura/products/ellura-180-capsules-bundle' },
      { label: 'Subscribe & Save', to: '/ellura/subscribe' },
      { label: 'Where to buy', to: '/ellura/where-to-buy' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'How ellura works', to: '/ellura/how-it-works' },
      { label: 'The Science', to: '/ellura/science' },
      { label: 'Learn: Urinary Health Hub', to: '/ellura/learn' },
      { label: 'Reviews', to: '/ellura/reviews' },
      { label: 'Our Story', to: '/ellura/our-story' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Help & Support', to: '/ellura/support' },
      { label: 'Track your order', to: '/ellura/track-order' },
      { label: 'FAQs', to: '/ellura/faq' },
      { label: 'My account', to: '/ellura/account' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Shipping Policy', to: '/ellura/policies/shipping' },
      { label: 'Returns, Refunds & Cancellation', to: '/ellura/policies/returns' },
      { label: 'Terms of Sale', to: '/ellura/policies/terms-of-sale' },
      { label: 'Offers & Promotions Terms', to: '/ellura/policies/offer-terms' },
    ],
  },
];

/** Page index used by site search. */
export const PAGES = [
  { label: 'Shop all ellura', to: '/ellura/shop', keywords: 'shop buy packs bundle price capsules' },
  { label: 'Subscribe & Save', to: '/ellura/subscribe', keywords: 'subscription save 10% cancel pause skip delivery' },
  { label: 'How ellura works', to: '/ellura/how-it-works', keywords: 'how it works PACs bacteria adhesion bladder' },
  { label: 'The Science', to: '/ellura/science', keywords: 'science research studies references clinical DMAC PACs soluble' },
  { label: 'Our Story', to: '/ellura/our-story', keywords: 'story heritage history Pharmatoka India US 20 years' },
  { label: 'Reviews & testimonials', to: '/ellura/reviews', keywords: 'reviews ratings testimonials customers' },
  { label: 'Learn: Urinary Health Hub', to: '/ellura/learn', keywords: 'learn articles education urinary health UTI' },
  { label: 'Where to buy', to: '/ellura/where-to-buy', keywords: 'amazon retailers marketplace quick commerce stores' },
  { label: 'FAQs', to: '/ellura/faq', keywords: 'questions answers help' },
  { label: 'Help & Support', to: '/ellura/support', keywords: 'contact support customer care email whatsapp' },
  { label: 'Track your order', to: '/ellura/track-order', keywords: 'track order status delivery shipment' },
  { label: 'My account', to: '/ellura/account', keywords: 'account login sign in register orders subscriptions addresses' },
  { label: 'Shipping Policy', to: '/ellura/policies/shipping', keywords: 'shipping delivery charges timelines areas' },
  { label: 'Returns, Refunds & Cancellation', to: '/ellura/policies/returns', keywords: 'returns refunds cancellation' },
  { label: 'Terms of Sale', to: '/ellura/policies/terms-of-sale', keywords: 'terms of sale conditions purchase' },
  { label: 'Offers & Promotions Terms', to: '/ellura/policies/offer-terms', keywords: 'offers coupons discount promotion terms' },
];
