/**
 * Policy drafts for the India store. Clauses marked [[tbc:…]] need the
 * commercial/legal team's figures before launch. Clauses carried over from
 * the US store's published terms (ellurautihealth.com) keep their meaning.
 * These are drafts for review — not legal advice.
 * Inline markup: see <Rich/> (faqs.ts).
 */
export interface PolicySection {
  h: string;
  p: string[];
  list?: string[];
}
export interface Policy {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: PolicySection[];
}

export const POLICIES: Policy[] = [
  {
    slug: 'shipping',
    title: 'Shipping Policy',
    summary: 'Where we deliver, how long it takes and what it costs.',
    updated: '[[tbc:effective date]]',
    sections: [
      {
        h: 'Delivery areas',
        p: ['We deliver to addresses in India. [[tbc:serviceable PIN codes and any excluded areas]] You can check delivery to your PIN code at checkout.'],
      },
      {
        h: 'Processing time',
        p: ['Orders are processed on business days once payment is confirmed. [[tbc:order cut-off time and processing window]]'],
      },
      {
        h: 'Delivery timelines',
        p: ['Estimated delivery times depend on your location. [[tbc:metro and non-metro delivery estimates]] Delivery estimates are not guarantees; delays can occur during public holidays, sale periods or for reasons outside our control.'],
      },
      {
        h: 'Shipping charges',
        p: [
          'Subscribe & Save orders ship free.',
          'For one-time orders, shipping is calculated at checkout before you pay. [[tbc:one-time shipping rates and any free-shipping threshold]]',
        ],
      },
      {
        h: 'Tracking',
        p: ['When your order ships we email you a tracking link. You can also check status on {/ellura/track-order|Track Your Order} or in {/ellura/account|My Account}.'],
      },
      {
        h: 'Failed or refused deliveries',
        p: ['If a delivery fails because the address is incomplete or no one is available after the courier’s attempts, the parcel may be returned to us. [[tbc:re-delivery and refund handling]]'],
      },
      {
        h: 'Damaged or missing parcels',
        p: ['If your parcel arrives damaged, tampered with, or doesn’t arrive, please {/ellura/support|contact customer care} with your order number and photos. [[tbc:reporting window]]'],
      },
    ],
  },
  {
    slug: 'returns',
    title: 'Returns, Refunds & Cancellation',
    summary: 'Return eligibility, refund timelines and how to cancel.',
    updated: '[[tbc:effective date]]',
    sections: [
      {
        h: 'Return eligibility',
        p: ['For safety and hygiene, we can only accept returns of products that are unopened and in their original sealed condition. [[tbc:India return window — the US store allows 45 days]]'],
        list: ['Opened or used bottles are not eligible for return.', 'Expired products cannot be returned or refunded.', 'Products must be returned in their original, sealed condition.'],
      },
      {
        h: 'Damaged, defective or wrong items',
        p: ['If you receive a damaged, defective or incorrect item, contact us and we will arrange a replacement or refund at no cost to you. [[tbc:reporting window]]'],
      },
      {
        h: 'How to request a return',
        p: ['Contact {/ellura/support|customer care} with your order number. We will confirm eligibility and explain how to send the product back. [[tbc:who pays return shipping in India]]'],
      },
      {
        h: 'Refunds',
        p: ['Approved refunds are issued to the original payment method. [[tbc:refund timeline and any deductions]]'],
      },
      {
        h: 'Cancelling an order',
        p: ['Orders begin processing quickly so they can ship on time, so we can’t always guarantee changes or cancellations once placed. [[tbc:cancellation window before dispatch]]'],
      },
      {
        h: 'Cancelling a subscription',
        p: ['You can cancel a Subscribe & Save subscription at any time from {/ellura/account|My Account} or by contacting customer care, before your next billing date. Cancelling stops future deliveries; it does not cancel an order that has already been billed.'],
      },
    ],
  },
  {
    slug: 'terms-of-sale',
    title: 'Terms of Sale',
    summary: 'The commercial terms that apply when you buy from this site.',
    updated: '[[tbc:effective date]]',
    sections: [
      {
        h: 'Who you are buying from',
        p: ['Products on this site are sold by [[tbc:India seller legal entity, address, GSTIN and grievance officer]]. ellura® and Gikacran® are registered trademarks of Pharmatoka SAS.'],
      },
      {
        h: 'Products and information',
        p: [
          'We take care to describe ellura accurately. Product images are for illustration; always read the label before use.',
          'ellura is a supplement intended to support urinary tract health. It is not intended to diagnose, treat, cure or prevent any disease, and is not a substitute for medical advice or treatment.',
        ],
      },
      {
        h: 'Prices and payment',
        p: [
          'Prices are shown in Indian Rupees (INR) and MRP is inclusive of all taxes. Shipping charges, where applicable, are shown at checkout before you pay.',
          'Your payment is taken when you place an order. [[tbc:payment gateway and accepted methods]]',
        ],
      },
      {
        h: 'Order acceptance',
        p: ['Your order is an offer to buy. A contract is formed when we confirm dispatch. We may decline or cancel an order (for example, if a product is unavailable or a pricing error occurs), in which case any payment is refunded in full.'],
      },
      {
        h: 'Subscriptions',
        p: [
          'Subscribe & Save orders renew automatically at the delivery frequency you select, unless modified or cancelled before the next billing date. By enrolling you authorise recurring charges in line with the subscription terms shown at checkout.',
          'You can manage, skip or cancel at any time through your account or by contacting customer care.',
        ],
      },
      {
        h: 'Quantity limits',
        p: ['We may limit the quantity per order to keep stock available for everyone and to prevent resale. The current limit is 10 units per item.'],
      },
      {
        h: 'Governing law and grievances',
        p: ['These terms are governed by the laws of India. [[tbc:jurisdiction and Grievance Officer contact under the Consumer Protection (E-Commerce) Rules, 2020]]'],
      },
    ],
  },
  {
    slug: 'offer-terms',
    title: 'Offers & Promotions Terms',
    summary: 'Terms for discounts, coupons, launch offers and bundles.',
    updated: '[[tbc:effective date]]',
    sections: [
      {
        h: 'Current offers',
        p: [
          '**Subscribe & Save:** 10% off every automatic shipment of eligible 30- and 90-capsule packs, with free shipping. The 180-capsule bundle is not eligible.',
          '**Launch offers and coupons:** [[tbc:India launch offers from the promotional calendar]]',
        ],
      },
      {
        h: 'General terms for all offers',
        p: ['Unless an offer says otherwise:'],
        list: [
          'Offers cannot be combined with other discounts, promotions or subscriptions.',
          'One promo code can be used per order, and it must be entered before payment.',
          'Codes have no cash value and cannot be exchanged or transferred.',
          'Offers apply only while stocks last and within the stated dates.',
          'Pharmatoka reserves the right to modify or cancel any offer at any time.',
        ],
      },
      {
        h: 'Bundles',
        p: ['Bundle pricing applies to the bundle as sold. Bundles may be excluded from other offers, as stated on the offer.'],
      },
      {
        h: 'Rewards and referrals',
        p: ['My ellura Rewards lets members earn points on purchases and redeem them for discounts. Rewards points cannot be combined with promo codes or special discount offers. [[tbc:India points rates, redemption values and referral credits]]'],
      },
      {
        h: 'Misuse',
        p: ['We may cancel orders or withdraw offers where we reasonably suspect misuse, such as multiple accounts or resale.'],
      },
    ],
  },
];

export const getPolicy = (slug?: string) => POLICIES.find((p) => p.slug === slug);
