/**
 * Verified brand facts. Sources are listed in /content-sources.md.
 * Anything not verified is rendered with the <Tbc> marker in the UI.
 */
export const BRAND = {
  name: 'ellura',
  owner: 'Pharmatoka',
  tagline: 'Your powerful urinary tract health supplement.',
  pacs: '36 mg',
  extract: '206 mg',
  years: '20+',
  studies: 17,
  approvals: 22,
  email: 'hello@ellurautihealth.com',
  usPhone: '(888) 481-6590',
  usHours: 'Monday–Friday, 9:00 a.m.–5:00 p.m. EST',
  usSite: 'https://ellurautihealth.com/',
};

/** Verbatim from ellurautihealth.com and the product carton. */
export const DISCLAIMER_FDA =
  '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.';
export const DISCLAIMER_INTL = '**International approvals under non-U.S. regulations. Not FDA-approved.';
export const TRADEMARKS = 'ellura® and Gikacran® are registered trademarks of Pharmatoka SAS. Pharmatoka Inc., Atlanta, GA 30309.';

export const DOCTOR = {
  name: 'Bilal Chughtai, MD',
  role: 'Urogynecology & Reconstructive Pelvic Surgery',
  org: 'Chief of Urology, Plainview Hospital, NY',
  disclosure: 'Compensated Medical Advisor for ellura®',
  quote: [
    'As a physician, I value products grounded in solid scientific evidence.',
    'ellura is built on more than 20 years of cranberry research and uses a standardized extract rich in soluble proanthocyanidins (PACs).',
    'ellura is unique in that it uses only pure cranberry juice extract, to deliver soluble PACs, the compounds studied for their role in supporting urinary tract health.',
    'Having a formulation developed with a high level of scientific rigor provides confidence in its quality and consistency.',
  ],
};

/** Free-from attributes (official site + carton). */
export const ATTRIBUTES = [
  { key: 'vegan', label: 'Vegan', note: '100% plant-based capsule' },
  { key: 'gluten', label: 'Gluten-free', note: 'No gluten, wheat or lactose' },
  { key: 'gmo', label: 'Non-GMO', note: 'No GMOs, dyes or artificial preservatives' },
  { key: 'sugar', label: 'Sugar-free', note: 'No added sugars or sweeteners' },
] as const;

/** Official product-page highlights (ellurautihealth.com product page). */
export const HIGHLIGHTS = [
  {
    title: 'Once-daily',
    body: 'Just one capsule a day. ellura may help reduce bacterial adhesion within hours.*',
  },
  {
    title: 'Free from artificial ingredients',
    body: '100% vegan, gluten-free, non-GMO, and made without added sugars, sweeteners, or dyes.',
  },
  {
    title: 'From field to capsule',
    body: 'Pharmatoka controls every step of production — from selecting cranberry fruit naturally rich in PACs to crafting its proprietary Gikacran® cranberry extract — so every capsule delivers 36 mg of soluble, bioactive A-type PACs.',
  },
  {
    title: 'Quality you can trust',
    body: 'Created by Pharmatoka, pioneers in 36 mg PACs research with 20+ years of scientific expertise. Recommended by healthcare professionals and trusted by thousands of women.',
  },
];

/** Daily habits — from ellurautihealth.com/pages/uti-learn-more. */
export const HABITS = [
  { title: 'Take ellura daily', body: 'One capsule helps reduce the ability of certain bacteria to adhere to the urinary tract.*' },
  { title: 'Stay hydrated', body: 'Drinking water helps wash bacteria out.' },
  { title: 'Urinate after sex', body: 'Helps wash out bacteria.' },
  { title: 'Wipe front to back', body: 'Prevents bacterial transfer.' },
  { title: 'Don’t hold urine', body: 'Empty your bladder regularly.' },
  { title: 'Wear cotton underwear', body: 'Keeps skin dry and yeast away.' },
  { title: 'Avoid irritants', body: 'Skip scented soaps, douches and lubricants.' },
  { title: 'Check birth control', body: 'Some methods increase UTI risk.' },
  { title: 'Support immunity', body: 'Eat well, rest and manage stress.' },
];

/** Verified timeline (see content-sources.md). */
export const TIMELINE = [
  {
    year: '2004',
    title: 'The extract begins',
    body: 'Pharmatoka, a French company focused on botanical urogenital health, begins developing a concentrated cranberry fruit-juice extract.',
    image: 'cranberry-bog',
  },
  {
    year: '2006',
    title: 'ellura is born',
    body: 'Two years later the extract becomes ellura — built around a measured dose of soluble, bioactive A-type PACs. In Europe it is known as urell®.',
    image: 'berries-frost',
  },
  {
    year: '2018',
    title: 'Recognised for research',
    body: 'Pharmatoka receives the American Botanical Council’s Varro E. Tyler Commercial Investment in Phytomedicinal Research Award (2017 award, presented March 2018).',
    image: 'lab-pipette',
  },
  {
    year: 'US',
    title: 'Two decades of trust',
    body: 'Sold in the United States by Pharmatoka Inc. (Atlanta, GA), ellura is recommended by healthcare professionals and trusted by thousands of women.',
    image: 'atlanta',
  },
  {
    year: '2026',
    title: 'Now in India',
    body: 'ellura arrives in India, bringing more than 20 years of cranberry research to women here.',
    image: 'india',
  },
];

export const ANNOUNCEMENTS = [
  'Now in India — backed by 20+ years of cranberry research',
  'Subscribe & Save 10% · free shipping on subscriptions',
  '36 mg soluble A-type PACs in one daily capsule',
];
