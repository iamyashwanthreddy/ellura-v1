import { useRef } from 'react';
import { AntiAdhesionChart } from '../components/home/Difference';
import CtaBand from '../components/ui/CtaBand';
import PageHero from '../components/ui/PageHero';
import References from '../components/ui/References';
import { Img, Ref, SectionHead } from '../components/ui/primitives';
import { BRAND, DOCTOR } from '../content/brand';
import { gsap, useGSAP, MQ } from '../lib/gsap';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

/**
 * Study summaries describe what each published study examined. They are
 * about cranberry PAC research in general and are not claims about ellura.
 */
const STUDIES = [
  {
    ref: 17,
    year: '1998',
    journal: 'The New England Journal of Medicine',
    title: 'Cranberry PACs and bacterial adherence',
    body: 'A laboratory study showing that proanthocyanidin extracts from cranberries inhibited the adherence of P-fimbriated E. coli to uroepithelial cell surfaces — the foundation of the anti-adhesion research that followed.',
    tag: 'In vitro',
  },
  {
    ref: 3,
    year: '2010',
    journal: 'BMC Infectious Diseases',
    title: 'PAC dose and urinary anti-adhesion activity',
    body: 'A multicentre, randomised, double-blind study measuring anti-adhesion activity in urine after consumption of cranberry powder standardised for PAC content, at different doses. It reported a dose-dependent effect.',
    tag: 'Human study',
  },
  {
    ref: 6,
    year: '2022',
    journal: 'Journal of Dietary Supplements',
    title: 'Soluble vs insoluble PACs',
    body: 'A controlled human study comparing cranberry supplements. Those made from juice-derived, soluble PACs produced significantly higher urinary anti-adhesion activity than supplements made mainly from whole fruit or pomace with mostly insoluble PACs.',
    tag: 'Human study',
  },
  {
    ref: 7,
    year: '2016',
    journal: 'American Journal of Obstetrics & Gynecology',
    title: 'Not all supplements are the same',
    body: 'An analysis of commercial cranberry dietary supplements that found wide variability in their ability to prevent uropathogenic bacterial adhesion.',
    tag: 'Product analysis',
  },
  {
    ref: 1,
    year: '2024',
    journal: 'Frontiers in Nutrition',
    title: 'High-dose PAC cranberry products',
    body: 'A meta-analysis and systematic review pooling clinical studies of cranberry products with high doses of proanthocyanidins and urinary tract outcomes.',
    tag: 'Meta-analysis',
  },
  {
    ref: 2,
    year: '2023',
    journal: 'Cochrane Database of Systematic Reviews',
    title: 'The Cochrane review of cranberries',
    body: 'An independent systematic review of randomised trials of cranberry products and urinary tract infections across different groups of people.',
    tag: 'Systematic review',
  },
];

const GLOSSARY = [
  ['Proanthocyanidins (PACs)', 'Naturally occurring polyphenol compounds in cranberry fruit. A-type PACs are the form studied for urinary anti-adhesion activity.'],
  ['A-type PACs', 'PACs with a particular double linkage between units, characteristic of North American cranberries (Vaccinium macrocarpon).'],
  ['Soluble PACs', 'PACs found in the juice portion of the cranberry, free to be absorbed. ellura uses only concentrated cranberry fruit juice extract.'],
  ['Insoluble PACs / pomace', 'PACs that stay bound to the fibre in pomace (press cake) — the seeds, stems, skin and pulp left after juicing.'],
  ['Anti-adhesion activity (AAA)', 'A laboratory measure of how well urine samples reduce the ability of bacteria to stick to cells.'],
  ['DMAC/A2 method', 'A validated laboratory method (4-dimethylaminocinnamaldehyde with an A2 reference standard) used to measure soluble PAC content.'],
  ['Gikacran®', 'Pharmatoka’s proprietary concentrated cranberry fruit juice extract. Each ellura capsule contains 206 mg, delivering 36 mg PACs.'],
  ['Pili (fimbriae)', 'Tiny hair-like structures — Type 1 and P-type — that E. coli use to attach to the urinary tract lining.'],
];

export default function Science() {
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useMeta({
    title: 'The Science behind ellura®',
    description: 'Cranberry PAC research, study summaries and a scientific guide to the soluble, bioactive A-type PACs in ellura®, measured with the DMAC/A2 method.',
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        // Study cards fan out of a stack as the section scrolls in.
        gsap.fromTo(
          '.study',
          { y: (i) => 60 + i * 10, rotate: (i) => (i % 2 ? 2 : -2), opacity: 0 },
          { y: 0, rotate: 0, opacity: 1, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.studies', start: 'top 80%', once: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <PageHero
        tone="dark"
        crumbs={[{ label: 'The Science' }]}
        eyebrow="The Science"
        title={
          <>
            Twenty years of research, <em>in one capsule.</em>
          </>
        }
        lead={`ellura is the result of more than ${BRAND.years} years of scientific research, backed by ${BRAND.studies} clinical and scientific studies and international herbal-medicine approvals in ${BRAND.approvals} countries.**`}
        photo="labPipette"
      />

      <section className="section section--tight" aria-label="Key figures">
        <div className="wrap">
          <dl className="usin__stats" style={{ marginTop: 0 }} data-stagger>
            <div>
              <dt className="t-mono">Soluble A-type PACs per capsule</dt>
              <dd>
                <span data-count="36">36</span>
                <small>mg</small>
              </dd>
            </div>
            <div>
              <dt className="t-mono">Concentrated cranberry juice extract</dt>
              <dd>
                <span data-count="206">206</span>
                <small>mg</small>
              </dd>
            </div>
            <div>
              <dt className="t-mono">Clinical &amp; scientific studies</dt>
              <dd>
                <span data-count={BRAND.studies}>{BRAND.studies}</span>
              </dd>
            </div>
            <div>
              <dt className="t-mono">Countries with herbal-medicine approvals**</dt>
              <dd>
                <span data-count={BRAND.approvals}>{BRAND.approvals}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section tone-bone" aria-labelledby="studies-h">
        <div className="wrap">
          <SectionHead
            eyebrow="Study summaries"
            title={<span id="studies-h">What the research <em>examined.</em></span>}
            lead="Short, plain-language summaries of key published studies on cranberry PACs. They describe the research itself — they are not claims about ellura."
          />
          <ul className="studies" role="list">
            {STUDIES.map((s) => (
              <li key={s.ref} className="study">
                <div className="study__top">
                  <span className="chip chip--lilac">{s.tag}</span>
                  <span className="t-mono muted">{s.year}</span>
                </div>
                <h3 className="t-h4">{s.title}</h3>
                <p className="muted">{s.body}</p>
                <p className="study__src t-xs">
                  <i>{s.journal}</i> <Ref n={[s.ref]} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="method-h">
        <div className="wrap two-col" style={{ alignItems: 'center' }}>
          <div className="stack">
            <SectionHead eyebrow="Measured, not estimated" title={<span id="method-h">Why the DMAC/A2 <em>method matters.</em></span>} size="d2" />
            <p className="t-body" data-fade>
              PAC numbers on cranberry labels can’t always be compared, because different laboratory methods give different results. ellura’s 36 mg is quantified using
              the scientifically validated DMAC/A2 method
              <Ref n={[9]} />, and the Gikacran® extract complies with USP standards for cranberry fruit juice dry extract
              <Ref n={[8, 14]} />.
            </p>
            <p className="t-body" data-fade>
              Manufactured under Good Manufacturing Practices (GMP), each batch is tested for purity and potency.
            </p>
          </div>
          <div data-fade>
            <AntiAdhesionChart />
          </div>
        </div>
      </section>

      <section className="section on-dark grain" data-header-tone="dark" aria-labelledby="sci-doctor">
        <div className="wrap doctor" style={{ marginTop: 0 }}>
          <figure className="doctor__portrait" data-arch>
            <Img photo="doctor" sizes="(max-width: 900px) 90vw, 36vw" width={1200} height={977} />
          </figure>
          <div className="doctor__body">
            <p className="eyebrow">Recommended by urologists</p>
            <blockquote className="doctor__quote" style={{ color: 'inherit' }}>
              <p id="sci-doctor" style={{ color: 'var(--lilac-100)' }}>
                “{DOCTOR.quote.join(' ')}”
              </p>
            </blockquote>
            <div>
              <p className="doctor__name">{DOCTOR.name}</p>
              <p className="muted t-sm">
                {DOCTOR.role} · {DOCTOR.org}
              </p>
              <p className="doctor__disclosure t-mono" style={{ color: 'var(--lilac)' }}>
                {DOCTOR.disclosure}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="guide-h">
        <div className="wrap">
          <SectionHead eyebrow="Scientific guide" title={<span id="guide-h">A glossary of <em>cranberry science.</em></span>} />
          <dl className="glossary glossary--grid" data-stagger>
            {GLOSSARY.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section tone-bone" aria-labelledby="refs-h" id="references">
        <div className="wrap wrap--narrow">
          <h2 id="refs-h" className="t-d3" data-split style={{ marginBottom: 28 }}>
            References
          </h2>
          <References open />
          <p className="t-xs muted" style={{ marginTop: 24 }}>
            Numbering matches the references on ellurautihealth.com. ** International approvals under non-U.S. regulations. Not FDA-approved.
          </p>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
