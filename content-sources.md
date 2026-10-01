# Content sources, open items and credits

Everything on the site is either taken from an official source below, or visibly marked **“To be confirmed”** (the dashed yellow `<Tbc>` marker) so it can’t be mistaken for fact. All sources were checked on 30 September 2026.

## Official sources consulted

| Source | Used for |
| --- | --- |
| https://ellurautihealth.com/ (homepage) | Hero copy (the homepage doc asks for the current US hero), “How ellura works” steps, “How is ellura different?”, “Take control”, Rewards copy, Dr. Chughtai quote and disclosure, the 17-item reference list and its numbering, FDA disclaimer, trademark line, offer-disclaimer wording (Subscribe & Save terms) |
| https://ellurautihealth.com/products.json and the product page | Pack sizes (30-Caps, 90-Caps, 180-Caps Bundle), product description, highlights (once-daily, free from artificial ingredients, field to capsule, quality you can trust), review totals (78 reviews; 72/5/1/0/0), three verbatim reviews, official product photography |
| https://ellurautihealth.com/pages/ellura-faq-uti-supplement | FAQ answers (ingredients, usage, safety, pH 4.44, oxalates 0.108 mg, children’s dosing, quality and GMP, rewards mechanics) |
| https://ellurautihealth.com/pages/uti-learn-more | Daily habits list, “how to take”, 17 studies and 22 international herbal-medicine approvals |
| https://ellurautihealth.com/blogs/resources/* (5 articles) | Learn hub articles, condensed with their own reference lists and authors/dates |
| Official carton (Supplement Facts panel on product photos) | 36 mg PACs from 206 mg concentrated cranberry (*Vaccinium macrocarpon*) fruit juice extract powder (Gikacran®); other ingredients; directions; precaution (anticoagulants); storage 15–30 °C |
| Supplied homepage doc (PDF) | Homepage section order, product-page structure (gallery and buy box, accordion tabs, reviews, FAQs), the ₹2,199 / MRP ₹2,499 price for 30 capsules and Subscribe & Save 10% (free shipping; pause or cancel anytime) |
| Supplied CSV | Every page and URL path under `/ellura`, plus header/footer placement |
| Supplied logo | Brand colour `#5A2E58` (sampled), logo and mark files |
| Pharmatoka v2 `CONTENT-SOURCES.md` (GlobeNewswire 1 Mar 2018; CPHI profiles) | Timeline: extract development from 2004, ellura launched 2006, sold as urell® in Europe, ABC Varro E. Tyler award (2017 award, presented March 2018), Pharmatoka SAS (France), Pharmatoka Inc. (Atlanta, GA) |

## How the content is kept accurate

- **No disease claims.** Copy says ellura *supports* urinary tract health and *may help reduce* bacterial adhesion. Pages state that it is not a treatment and cannot replace antibiotics, and tell readers to see a doctor about symptoms.
- **Study summaries** (Science page) describe what each study examined. They are labelled as being about cranberry PAC research, not claims about ellura.
- **Anti-adhesion chart** reproduces the official graphic’s qualitative axis (100%, <50%, Inferior, Inactive 0%), with no invented numbers. Source: Howell et al., *J Diet Suppl* 2022.
- **Reviews.** There are no Indian reviews yet and none are invented. The US store totals and three verbatim US reviews are always labelled “US store”.
- **Doctor quote** is shown with the disclosure “Compensated Medical Advisor for ellura®”, exactly as on the US site.

## Open items (shown on the site as “To be confirmed”)

**Commercial**
- India prices for the **90-capsule** pack and the **180-capsule bundle**. These products show “Price at launch” with a notify-me form. Set the prices in `src/commerce/catalog.ts`.
- The ₹2,199 / ₹2,499 price for 30 capsules comes from the design reference only. Confirm it, then set `PRICING_VERIFIED = true` so the Product JSON-LD includes `offers`.
- Shipping rates for one-time orders, delivery timelines, serviceable PIN codes.
- Return window (the US store allows 45 days), refund timeline, cancellation window, return-shipping responsibility.
- Launch offers and coupon codes. No India codes were supplied, so the promo field reports that codes apply once the store is live.
- My ellura Rewards for India: points rates, redemption values, referral credits.
- Amazon.in store link, plus quick-commerce partners and dates.

**Legal and regulatory**
- India seller/importer legal entity, address, GSTIN and Grievance Officer (Consumer Protection (E-Commerce) Rules, 2020).
- India regulatory category, licence number and the matching disclaimer. The FDA disclaimer is kept because the product label is a US dietary supplement label.
- Policy pages are **drafts** that need legal review.

**Support**
- India customer-care phone, WhatsApp, hours and response time. The verified brand email `hello@ellurautihealth.com` is used meanwhile.
- Review moderation policy (Reviews page).

**Content**
- Medical reviewer name and credentials for each Learn article (the CSV requires a reviewer credit).

## Missing assets

- **UGC videos** for the homepage loop (doc Section 2). Each reel in `src/components/home/Reels.tsx` accepts `video: '/videos/<file>.mp4'` (9:16, muted, looped). Until videos arrive, the reels use editorial stills with captions that describe routines; they are not testimonials.
- A vector (SVG) logo. The supplied raster logo is used (`public/brand/`), trimmed, with white and mark variants derived from it.
- India-specific lifestyle photography. The stock images below are placeholders.

## Photography

**Official (Pharmatoka, ellurautihealth.com CDN):** pack shots (30, 90, 180), carton side panels, the four infographics, the transparent bottle compositions, the Dr. Chughtai portrait (cropped to remove the baked-in caption), and the badges (20+ years, cGMP, 2026 Mindful Awards).

**Unsplash (free licence; editorial stock that does not depict ellura customers):**

| File | Photographer | Unsplash ID |
| --- | --- | --- |
| life-calm | Ola Dybul | JGAjwBa-APo |
| life-elder | Ashwin Vaswani | 1CoyeOsvqG4 |
| life-glass | engin akyurt | PCpoG06fcUI |
| life-glass-2 | Giorgio Trovato | jQByTGUtTuo |
| life-sunlight | Dmitriy K. | PG3XeL1uWdU |
| life-sari-golden | Mehedi Hasan | UnWadQg_Whc |
| life-editorial | Edward Howell | WaNG0PxGofc |
| life-ritual | Kalos Skincare | jyKa0Ynxvow |
| life-water-sprig | Ismanjeet Singh | qtr-eF_L1Oo |
| life-morning | bruce mars | wBuPCQiweuA |
| life-smile | Shashank Thapa | MkPINODL-Tw |
| life-friends | Ninthgrid | rjnIYeC6rmA |
| life-street | Kunal Goswami | 5DYuCuFgJBs |
| life-sari-red | Gautham Krishna | tPNeIz2edEU |

The cranberry, lab, leaf-shadow and city images are reused from the Pharmatoka v2 library; their credits are in that project’s `CONTENT-SOURCES.md`. Photo URL: `https://unsplash.com/photos/<id>`.
