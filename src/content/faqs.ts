/**
 * FAQs adapted from ellurautihealth.com/pages/ellura-faq-uti-supplement
 * (checked 30 Sep 2026). Product answers keep the official meaning.
 * India operations (shipping, payments, returns, contact numbers) are not
 * published yet, so those answers carry [[tbc:…]] markers.
 *
 * Inline markup (rendered by <Rich/>):
 *   ^(1,2)          reference superscript linking to /ellura/science#ref-n
 *   [[tbc:text]]    visible "to be confirmed" marker
 *   {/path|label}   internal link
 *   **text**        emphasis
 */
export interface Faq {
  id: string;
  q: string;
  a: string[];
}
export interface FaqGroup {
  id: string;
  title: string;
  items: Faq[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'about',
    title: 'About ellura',
    items: [
      {
        id: 'what-is-ellura',
        q: 'What is ellura?',
        a: [
          'ellura is a clinically backed supplement that supports urinary tract health* and may help reduce the ability of certain bacteria to adhere to the urinary tract, allowing them to be flushed out naturally^(17,6,12).',
        ],
      },
      {
        id: 'ingredients',
        q: 'What are the ingredients in ellura?',
        a: [
          'Each capsule delivers 36 mg of proanthocyanidins (PACs) from 206 mg of concentrated cranberry fruit juice extract (Gikacran®), the key ingredient clinically backed to support urinary tract health*^(6,3,7).',
          'Inactive ingredients: mannitol, magnesium stearate, silicon dioxide and the vegetable shell (hydroxypropylmethylcellulose). They keep the ingredients from sticking together during manufacturing, improve stability and help keep the active PACs bioavailable.',
        ],
      },
      {
        id: 'new-design',
        q: 'Why does ellura have a new design?',
        a: [
          'ellura is the same high-quality supplement — only the packaging has changed. It is now delivered directly from Pharmatoka, its original creators.',
        ],
      },
      {
        id: 'open-capsule',
        q: 'Can I open the ellura capsules if I have trouble swallowing them?',
        a: [
          'Yes. We recommend mixing the powder into soft food (such as yoghurt or a fruit purée) or a sweet drink such as juice rather than taking it directly, as it has a naturally bitter, astringent taste.',
        ],
      },
    ],
  },
  {
    id: 'how-it-works',
    title: 'How ellura works',
    items: [
      {
        id: 'how-does-it-work',
        q: 'How does ellura work?',
        a: [
          'ellura harnesses 36 mg of PACs from 100% pure concentrated cranberry fruit juice extract^(3,4). These soluble, bioactive PACs interact with certain bacteria in a way that may help reduce their ability to adhere to the bladder wall^(17,6,12). Without the ability to adhere, bacteria are naturally washed out, helping to keep your urinary tract clean*.',
        ],
      },
      {
        id: 'what-are-pacs',
        q: 'What are proanthocyanidins (PACs)?',
        a: [
          'PACs are naturally occurring compounds found in cranberry fruit. Research has identified that the A-type PACs in cranberries play a key role in helping support urinary tract health*^(1,2).',
          'ellura is made with a standardised cranberry juice extract produced through an extraction process that preserves these soluble, bioactive PACs, so each capsule delivers 36 mg — the research-based amount to support urinary tract health*.',
        ],
      },
      {
        id: 'why-different',
        q: 'Why is ellura different from other cranberry supplements?',
        a: [
          'Not all cranberry supplements are created equal. Many lack the clinically studied 36 mg of soluble, bioactive PACs.',
          'ellura is made from 100% pure concentrated cranberry fruit juice extract — a high-purity source of soluble A-type PACs shown in research to help reduce the ability of certain bacteria to adhere to the bladder^(17,6,12). It is standardised using the validated DMAC/A2 method^(9) and backed by 20+ years of research and 22 international herbal-medicine approvals**.',
        ],
      },
    ],
  },
  {
    id: 'how-to-take',
    title: 'How to take ellura',
    items: [
      {
        id: 'who-benefits',
        q: 'Who can benefit from taking ellura?',
        a: [
          'ellura provides clinically backed urinary tract support, which may help reduce bacterial adhesion within hours*. Daily use helps maintain urinary tract balance*. Urinary tract health is especially important for women, but men can also benefit. If you have an underlying medical condition, consult your healthcare provider before use.',
        ],
      },
      {
        id: 'how-often',
        q: 'How often should I take ellura?',
        a: [
          'Take one capsule daily with water, at the same time each day. When you want additional support (for example during travel or stress), take two capsules as needed, then return to one capsule daily.',
          'ellura is not intended to treat or cure urinary tract infections; it is clinically backed to support urinary tract health*. Always follow your healthcare professional’s recommendation.',
        ],
      },
      {
        id: 'prescription',
        q: 'Do I need a prescription?',
        a: [
          'No prescription is needed to buy ellura. It has been researched for its role in supporting urinary tract health*^(3,2) and is recommended by many healthcare professionals. In the US it is marketed as a dietary supplement. [[tbc:India regulatory category and licence number]]',
        ],
      },
      {
        id: 'with-antibiotic',
        q: 'Can I take ellura with a prescribed antibiotic?',
        a: [
          'Yes, you can take ellura alongside a prescribed antibiotic to help maintain urinary tract health*^(17,6,3,12). ellura is not a substitute for antibiotics, which are necessary to treat an active urinary tract infection.',
          'Once an infection clears, you can continue taking ellura daily to support urinary tract health. Because long-term antibiotic use for prevention may lead to resistance and unwanted side effects^(13,5), work with your healthcare provider on the best ongoing strategy for you.',
        ],
      },
      {
        id: 'replace-antibiotic',
        q: 'Can ellura replace an antibiotic?',
        a: [
          'No. If you have a confirmed UTI you will likely need an antibiotic to treat it. See a doctor promptly if you have fever, chills, back or side pain, or blood in your urine.',
        ],
      },
    ],
  },
  {
    id: 'quality',
    title: 'Quality',
    items: [
      { id: 'vegan', q: 'Is ellura suitable for vegans?', a: ['Yes — ellura is encapsulated in a 100% plant-based capsule.'] },
      {
        id: 'tested',
        q: 'How is ellura tested for quality?',
        a: [
          'ellura is tested at every stage. It is manufactured under Good Manufacturing Practices (GMP) so each batch meets strict standards for purity and potency. The Gikacran® extract complies with USP standards and is free from harmful contaminants^(14,8).',
        ],
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety information',
    items: [
      {
        id: 'acidic',
        q: 'Is ellura acidic?',
        a: [
          'ellura has a pH of about 4.44 — mildly acidic, similar to coffee (about 5), soda or tomatoes (4–5). Water is neutral at pH 7; cranberry juice is much more acidic at pH 2.7. ellura contains no caffeine.',
        ],
      },
      {
        id: 'allergy',
        q: 'Can I be allergic to ellura?',
        a: [
          'ellura is well tolerated, but if you have a red-fruit allergy check with your healthcare provider first — the active PACs come from cranberry, a red fruit.',
        ],
      },
      {
        id: 'allergens',
        q: 'Does ellura contain GMOs, artificial ingredients or common allergens?',
        a: [
          'No. ellura contains no GMOs, dyes, artificial preservatives, sweeteners, gluten, lactose, corn, dairy, soy, wheat, yeast or added sugars.',
        ],
      },
      {
        id: 'children',
        q: 'Is ellura suitable for children?',
        a: [
          'ellura has been used in children for years with no reported side effects. Children under 50 lb (about 23 kg) can take half a capsule daily; 50 lb or more, one capsule daily. The capsule can be opened and mixed into a sweet drink or soft food^(7).',
          'Please consult your child’s paediatrician before starting ellura.',
        ],
      },
      {
        id: 'pregnancy',
        q: 'Is ellura safe during pregnancy or breastfeeding?',
        a: [
          'There are no studies on ellura in pregnant or nursing women. Cranberry is generally considered safe, but please consult your healthcare provider before use.',
        ],
      },
      { id: 'diabetes', q: 'Can I take ellura if I have diabetes?', a: ['Please consult your healthcare provider before starting ellura.'] },
      {
        id: 'blood-thinners',
        q: 'Can I take ellura if I’m on blood thinners?',
        a: ['A potential interaction cannot be ruled out. If you take anticoagulant medication, consult your healthcare provider before using ellura.'],
      },
      {
        id: 'side-effects',
        q: 'Are there any side effects?',
        a: ['ellura is generally very well tolerated and not expected to cause side effects. If you experience any, stop and consult your healthcare provider, and let us know via {/ellura/support|Help & Support}.'],
      },
      {
        id: 'kidney-stones',
        q: 'Can ellura cause kidney stones or worsen existing ones?',
        a: [
          'ellura contains low levels of oxalates — only 0.108 mg per capsule, much lower than cranberry juice or whole fruit — which makes it unlikely to cause or worsen kidney stones. If you have a history of kidney stones or severe kidney disease, consult your healthcare provider first.',
        ],
      },
      {
        id: 'ic',
        q: 'Does ellura help with interstitial cystitis (IC)?',
        a: [
          'ellura is not a treatment for interstitial cystitis. If UTIs tend to trigger your IC flares, ellura may help support urinary tract health*. If acidity is a concern, ellura has a pH of about 4.4 and can be taken with an acid reducer. Always consult your healthcare provider for IC management.',
        ],
      },
    ],
  },
  {
    id: 'orders',
    title: 'Orders & payments',
    items: [
      {
        id: 'place-order',
        q: 'How do I place an order?',
        a: ['Choose a pack on the {/ellura/shop|Shop} page, add it to your cart and go to checkout. You can also buy from our {/ellura/where-to-buy|authorised retailers}.'],
      },
      {
        id: 'payment-methods',
        q: 'What payment methods do you accept?',
        a: ['Accepted payment methods will be shown at checkout. [[tbc:payment gateway and methods for India]]'],
      },
      {
        id: 'promo-code',
        q: 'Where do I enter a promo code?',
        a: ['In your cart or at checkout, before you pay. Offer terms are on the {/ellura/policies/offer-terms|Offers & Promotions Terms} page.'],
      },
      {
        id: 'modify-order',
        q: 'Can I change or cancel my order?',
        a: ['Please see our {/ellura/policies/returns|Returns, Refunds & Cancellation} policy. [[tbc:India cancellation window]]'],
      },
    ],
  },
  {
    id: 'shipping',
    title: 'Shipping & delivery',
    items: [
      { id: 'where-deliver', q: 'Where do you deliver?', a: ['Delivery areas are listed in our {/ellura/policies/shipping|Shipping Policy}. [[tbc:serviceable PIN codes]]'] },
      { id: 'how-long', q: 'How long does delivery take?', a: ['[[tbc:India dispatch and delivery timelines]] You will receive tracking details by email once your order ships.'] },
      {
        id: 'shipping-cost',
        q: 'How much does shipping cost?',
        a: ['Subscribe & Save orders ship free. For one-time orders, shipping is calculated at checkout. [[tbc:one-time shipping rates]]'],
      },
      { id: 'track', q: 'How do I track my order?', a: ['Use the tracking link in your shipping email, or enter your order number on {/ellura/track-order|Track Your Order}.'] },
    ],
  },
  {
    id: 'subscribe',
    title: 'Subscribe & Save',
    items: [
      {
        id: 'what-is-subscribe',
        q: 'What is Subscribe & Save?',
        a: ['Subscribe & Save delivers ellura automatically on a schedule that matches your pack, so you never run out. You save 10% on every delivery and shipping is free. {/ellura/subscribe|See how it works}.'],
      },
      {
        id: 'manage-subscription',
        q: 'How do I manage or cancel my subscription?',
        a: ['Sign in to {/ellura/account|My Account} and open Subscriptions to change the schedule, skip a delivery, pause or cancel at any time — or contact {/ellura/support|customer care}.'],
      },
      { id: 'skip', q: 'Can I pause or skip a delivery?', a: ['Yes. You can skip or pause from your account before your next billing date.'] },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & refunds',
    items: [
      {
        id: 'return-policy',
        q: 'What is your return policy?',
        a: ['Unopened, sealed bottles can be returned under our {/ellura/policies/returns|Returns, Refunds & Cancellation} policy. Opened or expired products cannot be returned. [[tbc:India return window]]'],
      },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      {
        id: 'contact',
        q: 'How can I contact customer care?',
        a: ['Email hello@ellurautihealth.com or use the form on {/ellura/support|Help & Support}. [[tbc:India phone, WhatsApp and hours]]'],
      },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items.map((f) => ({ ...f, group: g.title, groupId: g.id })));
