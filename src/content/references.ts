/**
 * Reference list, numbered exactly as on ellurautihealth.com (checked
 * 30 Sep 2026) so that in-text citations such as (17, 6, 3, 4) match.
 */
export interface Reference {
  n: number;
  authors: string;
  year: string;
  title: string;
  source: string;
  detail?: string;
  url?: string;
}

export const REFERENCES: Reference[] = [
  {
    n: 1,
    authors: 'Xiong Z, Gao Y, Yuan C, Jian Z, Wei X.',
    year: '2024',
    title: 'Preventive effect of cranberries with high dose of proanthocyanidins on urinary tract infections: a meta-analysis and systematic review.',
    source: 'Frontiers in Nutrition',
    detail: '2024 Nov 28;11:1422121.',
    url: 'https://doi.org/10.3389/fnut.2024.1422121',
  },
  {
    n: 2,
    authors: 'Williams G, Hahn D, Stephens JH, Craig JC, Hodson EM.',
    year: '2023',
    title: 'Cranberries for preventing urinary tract infections.',
    source: 'Cochrane Database of Systematic Reviews',
    detail: '2023, Issue 4. Art. No.: CD001321.',
    url: 'https://doi.org/10.1002/14651858.CD001321.pub6',
  },
  {
    n: 3,
    authors: 'Howell AB, Botto H, Combescure C, Blanc-Potard AB, Gausa L, Matsumoto T, Tenke P, Sotto A, Lavigne JP.',
    year: '2010',
    title:
      'Dosage effect on uropathogenic Escherichia coli anti-adhesion activity in urine following consumption of cranberry powder standardized for proanthocyanidin content: a multicentric randomized double blind study.',
    source: 'BMC Infectious Diseases',
    detail: '10, 94.',
    url: 'https://doi.org/10.1186/1471-2334-10-94',
  },
  {
    n: 4,
    authors: 'Lavigne JP, Bourg G, Combescure C, et al.',
    year: '2008',
    title:
      'In vitro and in vivo evidence of dose-dependent decrease of uropathogenic Escherichia coli virulence after consumption of commercial Vaccinium macrocarpon (cranberry) capsules.',
    source: 'Clinical Microbiology and Infection',
    detail: '14(4), 350–355.',
  },
  {
    n: 5,
    authors: 'World Health Organization.',
    year: '2023',
    title: 'Antimicrobial resistance — fact sheet (21 November 2023).',
    source: 'who.int',
    url: 'https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance',
  },
  {
    n: 6,
    authors: 'Howell AB, Dreyfus JF, Chughtai B.',
    year: '2022',
    title:
      'Differences in urinary bacterial anti-adhesion activity after intake of cranberry dietary supplements with soluble versus insoluble proanthocyanidins.',
    source: 'Journal of Dietary Supplements',
    detail: '19(5), 621–639.',
    url: 'https://doi.org/10.1080/19390211.2021.1908480',
  },
  {
    n: 7,
    authors: 'Chughtai B, Thomas D, Howell A.',
    year: '2016',
    title: 'Variability of commercial cranberry dietary supplements for the prevention of uropathogenic bacterial adhesion.',
    source: 'American Journal of Obstetrics & Gynecology',
    detail: '215(1), 122–123.',
  },
  {
    n: 8,
    authors: 'United States Pharmacopeia.',
    year: '2023',
    title: 'Cranberry Fruit Juice Dry Extract.',
    source: 'United States Pharmacopeia–National Formulary (USP–NF)',
  },
  {
    n: 9,
    authors: 'Sintara M, Li L, Cunningham DG, Prior RL, Wu X, Chang T.',
    year: '2018',
    title: 'Single-laboratory validation for determination of total soluble proanthocyanidins in cranberry using 4-dimethylaminocinnamaldehyde.',
    source: 'Journal of AOAC International',
    detail: '101(3), 805–809.',
  },
  {
    n: 10,
    authors: 'Uberos J, et al.',
    year: '2012',
    title: 'Cranberry syrup vs trimethoprim in the prophylaxis of recurrent urinary tract infections among children: a controlled trial.',
    source: 'Open Access Journal of Clinical Trials',
    detail: '4, 31–38.',
  },
  {
    n: 11,
    authors: 'Botto H, Neuzillet Y.',
    year: '2010',
    title:
      'Effectiveness of a cranberry (Vaccinium macrocarpon) preparation in reducing asymptomatic bacteriuria in patients with an ileal enterocystoplasty.',
    source: 'Scandinavian Journal of Urology and Nephrology',
    detail: '44(3), 165–168.',
  },
  {
    n: 12,
    authors: 'Bosley S, Krueger CG, Birmingham A, Howell AB, Reed JD.',
    year: '2024',
    title:
      'Improved in vitro hemagglutination assays utilizing P-type and type 1 uropathogenic Escherichia coli to evaluate bacterial anti-adhesion activity of cranberry products.',
    source: 'Journal of Dietary Supplements',
    detail: '21(3), 327–343.',
  },
  {
    n: 13,
    authors: 'Anger JT, Bixler BR, Holmes RS, Lee UJ, Santiago-Lastra Y, Selph SS.',
    year: '2022',
    title: 'Updates to recurrent uncomplicated urinary tract infections in women: AUA/CUA/SUFU guideline.',
    source: 'The Journal of Urology',
  },
  {
    n: 14,
    authors: 'Upton R, Brendler T.',
    year: '2016',
    title: 'Cranberry fruit Vaccinium macrocarpon Aiton — standards of analysis, quality control, and therapeutics.',
    source: 'American Herbal Pharmacopoeia and Therapeutic Compendium',
  },
  {
    n: 15,
    authors: 'Storme O, Tirán Saucedo J, Garcia-Mora A, Dehesa-Dávila M, Naber KG.',
    year: '2019',
    title: 'Risk factors and predisposing conditions for urinary tract infection.',
    source: 'Therapeutic Advances in Urology',
    detail: '11, 1756287218814382.',
  },
  {
    n: 16,
    authors: 'Thomas D, et al.',
    year: '2017',
    title: 'Does cranberry have a role in catheter-associated urinary tract infections?',
    source: 'Canadian Urological Association Journal',
    detail: '11(11), E421–E424.',
  },
  {
    n: 17,
    authors: 'Howell AB, Vorsa N, Der Marderosian A, Foo LY.',
    year: '1998',
    title: 'Inhibition of the adherence of P-fimbriated Escherichia coli to uroepithelial-cell surfaces by proanthocyanidin extracts from cranberries.',
    source: 'The New England Journal of Medicine',
    detail: '339(15), 1085–1086.',
  },
];
