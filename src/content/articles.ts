import type { PhotoKey } from './images';

/**
 * Learn hub articles — condensed adaptations of the official articles at
 * ellurautihealth.com/blogs/resources (checked 30 Sep 2026). Meaning,
 * hedging and references are kept; wording is tightened for readability.
 * The CSV asks for a medical-reviewer credit on every article; reviewers
 * for the India site have not been named, so that credit is marked TBC.
 */
export interface ArticleSection {
  h: string;
  p: string[];
  list?: string[];
  callout?: string;
}

export interface Article {
  slug: string;
  title: string;
  dek: string;
  topic: 'Science' | 'Everyday health' | 'Life stages' | 'Bladder health';
  date: string;
  author: string;
  authorNote?: string;
  sourceUrl: string;
  readMins: number;
  image: PhotoKey;
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
  references: string[];
}

const RES = 'https://ellurautihealth.com/blogs/resources/';
const CHUGHTAI = 'Bilal Chughtai, MD';
const CHUGHTAI_NOTE =
  'Board-certified urologist; Urogynecology & Reconstructive Pelvic Surgery, Chief of Urology, Plainview Hospital, NY. Compensated Medical Advisor for ellura®.';

export const ARTICLES: Article[] = [
  {
    slug: 'cranberry-pacs-vs-d-mannose',
    title: 'Cranberry PACs vs. D-mannose: which better supports urinary tract health?',
    dek: 'They are often mentioned in the same breath, but they interact with bacteria in fundamentally different ways. Here is what the evidence shows.',
    topic: 'Science',
    date: '2026-02-11',
    author: 'ellura editorial team',
    sourceUrl: RES + 'cranberry-pacs-vs-d-mannose-which-better-supports-urinary-tract-health',
    readMins: 6,
    image: 'cranberryCut',
    sections: [
      {
        h: 'How bacteria attach to the urinary tract',
        p: [
          'Most urinary tract issues begin when E. coli bacteria attach to the lining of the urinary tract. They do this with tiny hair-like structures called pili, which let them cling on and persist.',
        ],
        list: [
          'Type 1 pili — more common and easier to interfere with.',
          'P-type pili — bind more strongly and are associated with more persistent infections.',
        ],
        callout: 'To provide meaningful support, an ingredient needs to interfere with both attachment pathways.',
      },
      {
        h: 'Cranberry PACs: well studied, non-antibiotic support',
        p: [
          'Cranberries naturally contain proanthocyanidins (PACs). The A-type PACs found in North American cranberries (Vaccinium macrocarpon) have been shown to interfere with bacterial adhesion in the urinary tract.',
          'Rather than killing bacteria, A-type PACs interfere with both Type 1 and P-type pili and reduce adhesion — support that does not rely on antibiotics.',
        ],
      },
      {
        h: 'Why formulation and PAC measurement matter',
        p: [
          'Research shows that cranberry activity depends heavily on formulation: soluble, juice-derived A-type PACs rather than pomace-based or fibre-trapped extracts; a clinically studied daily amount of 36 mg; and PAC content quantified with the DMAC/A2 method.',
          'A controlled human study in the Journal of Dietary Supplements found that supplements made from juice-derived, soluble PACs produced significantly higher urinary anti-adhesion activity than supplements made mainly from whole fruit or pomace containing mostly insoluble PACs.',
        ],
      },
      {
        h: 'What the research says about D-mannose',
        p: [
          'D-mannose is a simple sugar related to glucose. When evaluated in human studies, results have been inconsistent: a 2023 Cochrane review found no clear evidence for preventing or treating UTIs; a 2024 randomised trial in JAMA Internal Medicine found daily D-mannose did not significantly reduce recurrence compared with placebo; and a 2025 meta-analysis found no statistically significant reduction.',
          'Its mechanism is narrow — it interacts with Type 1 pili only. And because it is a sugar, high daily doses add to sugar intake, which may matter for people with blood-sugar concerns. Standardised cranberry PAC extracts are non-sugar polyphenols.',
        ],
      },
      {
        h: 'Choosing evidence-based support',
        p: [
          'When it comes to cranberry, formulation matters. Differences in PAC type, dose, solubility and measurement method can lead to meaningful differences in biological activity.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do cranberry PACs work better than D-mannose?',
        a: 'Cranberry A-type PACs interfere with multiple bacterial attachment mechanisms, while D-mannose mainly targets Type 1 pili. D-mannose trials have produced mixed results; standardised extracts providing 36 mg of soluble A-type PACs have shown reproducible urinary anti-adhesion activity in a controlled human crossover study.',
      },
      {
        q: 'Why does PAC measurement matter?',
        a: 'Research associates 36 mg of soluble, juice-derived A-type PACs, quantified with validated methods such as DMAC/A2, with consistent urinary anti-adhesion activity.',
      },
    ],
    references: [
      'American Herbal Pharmacopoeia (2016). Cranberry fruit (Vaccinium macrocarpon): standards of analysis, quality control, and therapeutics.',
      'Jepson RG, Williams G, Craig JC (2023). Cranberries for preventing urinary tract infections. Cochrane Database Syst Rev (4), CD001321.',
      'Howell AB, Foxman B, Milner R (2010). Dosage effects of cranberry proanthocyanidins on urinary bacterial anti-adhesion activity. J Nat Prod 73(10), 1645–1648.',
      'Hayward G, et al. (2024). D-mannose for prevention of recurrent urinary tract infection among women: a randomized clinical trial. JAMA Intern Med 184(6), 619–628.',
      'Silva JP, et al. (2025). Efficacy of D-mannose as prophylaxis for recurrent urinary tract infections: a systematic review and meta-analysis. Braz J Nephrol 47(1), e20240035.',
      'Cooper TE, et al. (2022). D-mannose for preventing and treating urinary tract infections. Cochrane Database Syst Rev.',
      'Howell AB, Dreyfus JF, Chughtai B (2022). Differences in urinary bacterial anti-adhesion activity after intake of cranberry dietary supplements with soluble versus insoluble proanthocyanidins. J Diet Suppl 19(5), 621–639.',
    ],
  },
  {
    slug: 'utis-antibiotic-resistance-and-prevention',
    title: 'UTIs, antibiotic resistance and prevention strategies',
    dek: 'Antibiotics can be lifesaving. Using them well — and supporting the urinary tract between courses — matters for you and for everyone.',
    topic: 'Everyday health',
    date: '2026-04-07',
    author: CHUGHTAI,
    authorNote: CHUGHTAI_NOTE,
    sourceUrl: RES + 'urinary-tract-infections-utis-antibiotic-resistance-and-prevention-strategies',
    readMins: 7,
    image: 'glass',
    sections: [
      {
        h: 'The link between UTIs and antibiotic overuse',
        p: [
          'UTIs are one of the most common reasons people — especially women — seek medical care and receive antibiotics. Antibiotics are necessary in many situations, but growing evidence shows that overuse for UTIs has contributed to rising antibiotic resistance, which can make future infections harder to treat.',
        ],
      },
      {
        h: 'What is a UTI, and when should you see a doctor?',
        p: [
          'A UTI occurs when bacteria, most commonly E. coli, enter the urinary tract and multiply. Symptoms can include burning when you urinate, urgency or frequency, pelvic discomfort or cloudy urine.',
        ],
        callout: 'Fever, chills or back pain may indicate a kidney infection and need prompt medical attention.',
      },
      {
        h: 'Not every urinary symptom is an infection',
        p: [
          'Dehydration, pelvic-floor dysfunction, overactive bladder, hormonal changes or inflammation can mimic UTI symptoms but do not respond to antibiotics. Many people — particularly older adults — have bacteria in the urine without symptoms (asymptomatic bacteriuria), which usually does not need treatment.',
        ],
      },
      {
        h: 'How overuse leads to resistance',
        p: [
          'Antibiotics do not distinguish between harmful and beneficial bacteria. Unnecessary courses can disrupt healthy gut and vaginal bacteria, increase the risk of yeast infections and gastrointestinal side effects, and encourage harder-to-treat organisms. Over time this means fewer effective oral options, more complicated infections and a higher risk of hospitalisation.',
        ],
      },
      {
        h: 'Everyday, non-antibiotic habits',
        p: ['A wellness-oriented approach focuses on prevention and long-term urinary health, particularly for people with recurrent infections:'],
        list: [
          'Stay well hydrated and empty your bladder fully and regularly.',
          'Limit bladder irritants such as excess caffeine and alcohol.',
          'Avoid harsh soaps, vaginal detergents and douching.',
          'Ask your clinician about evidence-based options — for example vaginal oestrogen after menopause.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I stop taking antibiotics early if I feel better?',
        a: 'No. Stopping early, saving leftover tablets or taking antibiotics prescribed for someone else all contribute to resistance. Follow your prescriber’s instructions.',
      },
    ],
    references: [
      'Medina M, Castillo-Pino E (2019). An introduction to the epidemiology and burden of urinary tract infections. Ther Adv Urol 11:1756287219832172.',
      'Foxman B (2010). The epidemiology of urinary tract infection. Nat Rev Urol 7(12), 653–660.',
      'Llor C, Bjerrum L (2014). Antimicrobial resistance: risk associated with antibiotic overuse and initiatives to reduce the problem. Ther Adv Drug Saf 5(6), 229–241.',
      'Flores-Mireles AL, Walker JN, Caparon M, Hultgren SJ (2015). Urinary tract infections: epidemiology, mechanisms of infection and treatment options. Nat Rev Microbiol 13(5), 269–284.',
      'Car J (2006). Urinary tract infections in women: diagnosis and management in primary care. BMJ 332(7533), 94–97.',
      'Nicolle LE, Gupta K, Bradley SF, et al. (2019). Clinical practice guideline for the management of asymptomatic bacteriuria: 2019 update by the IDSA. Clin Infect Dis 68(10), e83–e110.',
      'Langdon A, Crook N, Dantas G (2016). The effects of antibiotics on the microbiome throughout development and alternative approaches for therapeutic modulation. Genome Med 8(1), 39.',
      'Brubaker L, Wolfe AJ (2017). The female urinary microbiota, urinary health and common urinary disorders. Ann Transl Med 5(2), 34.',
      'Scholes D, Hooton TM, Roberts PL, et al. (2000). Risk factors for recurrent urinary tract infection in young women. J Infect Dis 182(4), 1177–1182.',
      'Simoni A, Schwartz L, Junquera GY, Ching CB, Spencer JD (2024). Current and emerging strategies to curb antibiotic-resistant urinary tract infections. Nat Rev Urol 21(12), 707–722.',
      'Gupta K, Hooton TM, Naber KG, et al. (2011). International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women. Clin Infect Dis 52(5), e103–e120.',
      'Anger J, Lee U, Ackerman AL, et al. (2019). Recurrent uncomplicated urinary tract infections in women: AUA/CUA/SUFU guideline. J Urol 202(2), 282–289.',
      'Kranz J, Bartoletti R, Bruyère F, et al. (2024). European Association of Urology guidelines on urological infections: summary of the 2024 guidelines. Eur Urol 86(1), 27–41.',
      'Vik I, Bollestad M, Grude N, et al. (2018). Ibuprofen versus pivmecillinam for uncomplicated urinary tract infection in women: a double-blind, randomized non-inferiority trial. PLoS Med 15(5), e1002569.',
    ],
  },
  {
    slug: 'why-utis-keep-coming-back-biofilms',
    title: 'Why do some UTIs keep coming back? Biofilms and bacterial persistence',
    dek: 'The symptoms go, the antibiotics work — and then it returns. Researchers are learning how some bacteria stay put.',
    topic: 'Science',
    date: '2026-07-21',
    author: 'ellura editorial team',
    sourceUrl: RES + 'why-do-some-utis-keep-coming-back-understanding-biofilms-and-bacterial-persistence',
    readMins: 6,
    image: 'labWells',
    sections: [
      {
        h: 'What is a biofilm?',
        p: [
          'A biofilm is a community of bacteria that attaches to a surface and surrounds itself with a protective layer. Once bacteria attach to the bladder wall, they can produce a sticky matrix that helps them stay in place, reduces their exposure to the body’s defences and makes them harder to eliminate.',
        ],
      },
      {
        h: 'Why biofilms matter in recurrent UTIs',
        p: [
          'Biofilms generally develop in stages: bacteria attach, multiply, build a protective matrix and eventually release bacteria that spread elsewhere. That may help explain why symptoms can disappear and later return.',
          'Some uropathogenic E. coli can also shelter inside bladder cells, forming intracellular communities with biofilm-like features. Recurrent UTIs have many contributing factors — anatomy, hormones, immune response and individual susceptibility among them — and biofilms are one important mechanism.',
        ],
      },
      {
        h: 'It all starts with adhesion',
        p: [
          'Before a biofilm can form, bacteria must first attach, using pili (fimbriae) to bind to urinary tract cells. Without attachment, bacteria are less able to colonise and are more easily removed by normal urine flow.',
        ],
        callout: 'Fewer opportunities to attach means fewer opportunities to settle in and persist.',
      },
      {
        h: 'What cranberry research has revealed',
        p: [
          'Cranberry A-type PACs do not kill bacteria. Research suggests they influence adhesion, reducing the ability of bacteria to attach to urinary tract tissue.',
          'A multicentre, randomised, double-blind study showed measurable urinary anti-adhesion activity after consumption of cranberry powder standardised for PAC content. A later study found that a juice-derived extract rich in soluble A-type PACs produced substantially greater urinary anti-adhesion activity than a product containing mainly insoluble PACs — the kind that stay bound to pomace (press cake).',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do all cranberry supplements work the same way?',
        a: 'No. Source, PAC composition and solubility can affect biological activity. Juice-derived extracts rich in soluble A-type PACs have produced greater urinary anti-adhesion activity than products based on whole fruit or press cake.',
      },
    ],
    references: [
      'Flores-Mireles AL, Walker JN, Caparon M, Hultgren SJ (2015). Urinary tract infections: epidemiology, mechanisms of infection and treatment options. Nat Rev Microbiol 13(5), 269–284.',
      'Howell AB, et al. (2005). A-type cranberry proanthocyanidins and uropathogenic bacterial anti-adhesion activity. Phytochemistry 66(18), 2281–2291.',
      'Howell AB, et al. (2010). Dosage effect on uropathogenic E. coli anti-adhesion activity in urine… BMC Infect Dis 10, 94.',
      'Howell AB, Dreyfus JF, Chughtai B (2021). Differences in urinary bacterial anti-adhesion activity… J Diet Suppl.',
      'Mulvey MA, Schilling JD, Hultgren SJ (2001). Establishment of a persistent Escherichia coli reservoir during the acute phase of a bladder infection. Infect Immun 69(7), 4572–4579.',
      'Di Martino P, et al. (2005). Effects of cranberry juice on uropathogenic Escherichia coli in vitro biofilm formation. J Chemother 17(5), 563–565.',
    ],
  },
  {
    slug: 'overactive-bladder-and-utis',
    title: 'Overactive bladder (OAB) and UTIs: is there a connection?',
    dek: 'Urgency and frequency can have more than one cause. Understanding the overlap helps you ask the right questions.',
    topic: 'Bladder health',
    date: '2026-09-17',
    author: 'Adrien Texier',
    sourceUrl: RES + 'overactive-bladder-oab-and-utis-is-there-a-connection',
    readMins: 6,
    image: 'waterSprig',
    sections: [
      {
        h: 'What is overactive bladder?',
        p: [
          'The main symptom of OAB is urgency — a sudden need to urinate that is hard to postpone — usually with frequent urination during the day, waking at night to urinate, or leakage before reaching the bathroom. A large systematic review estimated that around 1 in 5 adults worldwide experiences OAB.',
          'Guidelines define OAB as these symptoms occurring without a urinary tract infection or another obvious cause, which is why a urine test is part of the first evaluation.',
        ],
      },
      {
        h: 'Why OAB and UTIs can feel so similar',
        p: [
          'Both can cause urgency and frequency, for different reasons. With OAB, communication between the bladder and nervous system is altered. During a UTI, bacteria and inflammation irritate the bladder. If your usual OAB symptoms suddenly change, infection is one possibility to rule out.',
        ],
      },
      {
        h: 'Is there a connection?',
        p: [
          'Researchers have found potentially harmful bacteria and signs of inflammation in some people with OAB. That does not mean bacteria cause most OAB, but it has prompted closer study. Incomplete bladder emptying can also make it easier for bacteria to remain in the urinary tract.',
          'Scientists now know the bladder is not necessarily sterile. The urinary microbiome (urobiome) is an active research area, and it is not yet clear whether its differences cause OAB, result from it or simply accompany it.',
        ],
      },
      {
        h: 'Where does cranberry fit?',
        p: [
          'Cranberry is not a treatment for overactive bladder, and guidelines do not recommend supplements for treating OAB. Where cranberry has been studied far more is urinary tract health: A-type PACs have been shown to interfere with the ability of certain bacteria to adhere to the urinary tract — and formulation matters.',
        ],
        callout: 'For someone living with OAB, cranberry is not a way to control urgency. Its role is different: supporting urinary tract health through a mechanism related to bacterial adhesion.',
      },
    ],
    faqs: [
      {
        q: 'Can OAB be managed?',
        a: 'Yes. Guidelines recommend approaches such as bladder training, and your clinician can discuss other options. Speak to a healthcare professional about any change in your urinary symptoms.',
      },
    ],
    references: [
      'Cameron AP, Chung DE, Dielubanza EJ, et al. (2024). The AUA/SUFU guideline on the diagnosis and treatment of idiopathic overactive bladder. J Urol 212, 11–20.',
      'Zhang L, Cai N, Mo L, et al. (2025). Global prevalence of overactive bladder: a systematic review and meta-analysis. Int Urogynecol J 36, 1547–1566.',
      'Mansfield KJ, Chen Z, Moore KH, et al. (2022). Urinary tract infection in overactive bladder: an update on pathophysiological mechanisms. Front Physiol 13, 886782.',
      'Kuo HC (2021). Recurrent urinary tract infection in women and overactive bladder — is there a relationship? Tzu Chi Med J 33, 13–21.',
      'Hsiao SM, Lin HH, Kuo HC (2020). High incidence of lower urinary tract dysfunction in women with recurrent urinary tract infections. Low Urin Tract Symptoms.',
      'Shaker P, Roshani Z, Timajchi E, et al. (2025). The role of urinary microbiome analysis in the diagnostic approach and management of urinary incontinence: a systematic review. Life 15(2), 309.',
      'Spazzapan M, Raison N, Steves C, Sahai A (2026). The urinary microbiome, overactive bladder and bladder pain syndrome/interstitial cystitis. Nat Rev Urol.',
      'Howell AB, Botto H, Combescure C, et al. (2010). Dosage effect on uropathogenic E. coli anti-adhesion activity in urine… BMC Infect Dis 10, 94.',
      'Howell AB, Dreyfus JF, Chughtai B (2021). Differences in urinary bacterial anti-adhesion activity after intake of cranberry dietary supplements with soluble versus insoluble proanthocyanidins. J Diet Suppl.',
    ],
  },
  {
    slug: 'urinary-tract-health-with-catheters',
    title: 'Urinary tract health for people who use catheters',
    dek: 'With good daily routines, many catheter users maintain stable urinary health for years. A practical, wellness-first guide.',
    topic: 'Life stages',
    date: '2026-05-12',
    author: CHUGHTAI,
    authorNote: CHUGHTAI_NOTE,
    sourceUrl: RES + 'urinary-tract-health-in-individuals-using-catheters',
    readMins: 7,
    image: 'leafShadow',
    sections: [
      {
        h: 'The urinary tract’s natural defences',
        p: [
          'Urine flow, the bladder lining and the immune system all help prevent infection. A catheter can partially bypass these defences, which makes it easier for bacteria to enter. Bacteria in the urine of catheter users is common and does not always mean infection or need treatment — understanding that helps avoid unnecessary antibiotics.',
        ],
      },
      {
        h: 'When to contact a healthcare provider',
        p: ['Contact your clinician promptly if you notice:'],
        list: [
          'Fever, chills or unexplained fatigue.',
          'New bladder, pelvic or flank discomfort.',
          'Persistent blockage or reduced urine flow.',
          'Blood in the urine that does not settle quickly, or sudden leakage around the catheter.',
          'New confusion or unusual weakness, especially in older adults.',
        ],
      },
      {
        h: 'Daily supportive strategies',
        p: [
          'Wash your hands before and after handling the catheter or drainage system and follow the clean technique you were taught. For indwelling catheters, keep the system closed, avoid kinks and keep the bag below bladder level.',
          'Unless advised otherwise, drink enough fluid to dilute urine and reduce sediment. Follow your replacement schedule, cleanse the skin gently and keep it dry, and note patterns in urine output or colour to share with your care team.',
        ],
      },
      {
        h: 'Where cranberry fits',
        p: [
          'Emerging evidence supports cranberry products with standardised PACs as part of a wellness-focused strategy for appropriate individuals, including some catheter users. Talk to your healthcare provider about whether it is right for you.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does bacteria in my urine always need antibiotics?',
        a: 'No. Asymptomatic bacteriuria is common in catheter users and usually does not need treatment. Your clinician will decide based on symptoms.',
      },
    ],
    references: [
      'Wyndaele JJ, Brauner A, Geerlings SE, et al. (2012). Clean intermittent catheterization and urinary tract infection: review and guide for future research. BJU Int 110(11 Pt C), E910–E917.',
      'Ginsberg DA, Boone TB, Cameron AP, et al. (2021). The AUA/SUFU guideline on adult neurogenic lower urinary tract dysfunction: treatment and follow-up. J Urol 206(5), 1106–1113.',
      'Gould CV, Umscheid CA, Agarwal RK, Kuntz G, Pegues DA (2010). Guideline for prevention of catheter-associated urinary tract infections 2009. Infect Control Hosp Epidemiol 31(4), 319–326.',
      'Hooton TM, Bradley SF, Cardenas DD, et al. (2010). Diagnosis, prevention, and treatment of catheter-associated urinary tract infection in adults: 2009 IDSA guidelines. Clin Infect Dis 50(5), 625–663.',
      'Donlan RM (2001). Biofilms and device-associated infections. Emerg Infect Dis 7(2), 277–281.',
      'Nicolle LE, Gupta K, Bradley SF, et al. (2019). Clinical practice guideline for the management of asymptomatic bacteriuria: 2019 update by the IDSA. Clin Infect Dis 68(10), e83–e110.',
      'Neumeier V, Stangl FP, Borer J, et al. (2023). Indwelling catheter vs intermittent catheterization: is there a difference in UTI susceptibility? BMC Infect Dis 23(1), 507.',
      'Patel PK, Advani SD, Kofman AD, et al. (2023). Strategies to prevent catheter-associated urinary tract infections in acute-care hospitals: 2022 update. Infect Control Hosp Epidemiol 44(8), 1209–1231.',
      'Saint S, Greene MT, Krein SL, et al. (2016). A program to prevent catheter-associated urinary tract infection in acute care. N Engl J Med 374(22), 2111–2119.',
      'Werneburg GT (2022). Catheter-associated urinary tract infections: current challenges and future prospects. Res Rep Urol 14, 109–133.',
      'EAU Guidelines on Urological Infections, 2024 update. EAU Guidelines Office, Arnhem.',
      'Jepson RG, Williams G, Craig JC (2012). Cranberries for preventing urinary tract infections. Cochrane Database Syst Rev (10), CD001321.',
      'Fu Z, Liska D, Talan D, Chung M (2017). Cranberry reduces the risk of urinary tract infection recurrence in otherwise healthy women: a systematic review and meta-analysis. J Nutr 147(12), 2282–2288.',
      'Prieto J, Murphy CL, Moore KN, Fader M (2014). Intermittent catheterisation for long-term bladder management. Cochrane Database Syst Rev (9), CD006008.',
      'Thomas D, Rutman M, Cooper K, Abrams A, Finkelstein J, Chughtai B (2017). Does cranberry have a role in catheter-associated urinary tract infections? Can Urol Assoc J 11(11), E421–E424.',
    ],
  },
];

export const getArticle = (slug?: string) => ARTICLES.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
