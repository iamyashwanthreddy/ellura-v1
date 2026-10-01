import { useRef } from 'react';
import { AntiAdhesionChart } from '../components/home/Difference';
import HowItWorksStory from '../components/home/HowItWorksStory';
import CtaBand from '../components/ui/CtaBand';
import Icon from '../components/ui/Icon';
import PageHero from '../components/ui/PageHero';
import References from '../components/ui/References';
import { Img, Ref, SectionHead } from '../components/ui/primitives';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useMeta({
    title: 'How ellura® works',
    description: 'A plain-language guide to how 36 mg of soluble, bioactive A-type cranberry PACs may help reduce the ability of certain bacteria to adhere to the urinary tract.',
  });

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ label: 'How it works' }]}
        eyebrow="How ellura works"
        title={
          <>
            It’s not about killing bacteria. <em>It’s about letting them go.</em>
          </>
        }
        lead="Most urinary tract trouble starts when bacteria grip the bladder wall. ellura’s 36 mg of soluble, bioactive A-type PACs may help reduce their ability to hold on — so they’re naturally flushed out.*"
        photo="cranberryCut"
      />

      <section className="section" aria-labelledby="pacs-h">
        <div className="wrap two-col" style={{ alignItems: 'center' }}>
          <div className="stack">
            <SectionHead eyebrow="The key compound" title={<span id="pacs-h">What are <em>PACs?</em></span>} size="d2" />
            <p className="t-body" data-fade>
              Proanthocyanidins (PACs) are naturally occurring compounds found in cranberry fruit. Research has identified that the unique <strong>A-type</strong> PACs in
              cranberries play a key role in helping support urinary tract health*
              <Ref n={[1, 2]} />.
            </p>
            <p className="t-body" data-fade>
              ellura is made with a standardised cranberry juice extract (Gikacran®) produced through an extraction process that preserves these soluble, bioactive PACs,
              so each capsule delivers 36 mg — the research-based amount — measured with the validated DMAC/A2 method
              <Ref n={[9]} />.
            </p>
            <dl className="glossary" data-stagger>
              <div>
                <dt>A-type</dt>
                <dd>The PAC structure found in North American cranberries, studied for anti-adhesion activity.</dd>
              </div>
              <div>
                <dt>Soluble</dt>
                <dd>PACs from the juice, free to be absorbed — unlike insoluble PACs bound in fibre.</dd>
              </div>
              <div>
                <dt>Bioactive</dt>
                <dd>Able to act in the body after you take them.</dd>
              </div>
            </dl>
          </div>
          <div className="arch-frame" data-arch>
            <Img photo="berriesFrost" sizes="(max-width: 900px) 100vw, 45vw" width={1200} height={1500} />
          </div>
        </div>
      </section>

      <HowItWorksStory headingId="hiw-page" />

      <section className="section tone-bone" aria-labelledby="sol-h">
        <div className="wrap two-col" style={{ alignItems: 'center' }}>
          <div className="stack">
            <SectionHead eyebrow="Soluble vs insoluble" title={<span id="sol-h">Not all cranberry <em>is equal.</em></span>} size="d2" />
            <p className="t-body" data-fade>
              Many products claim to have PACs, but if sourced from insoluble cranberry pomace (seeds, stems, skin, pulp), they remain trapped in fibre and cannot be
              absorbed by the body
              <Ref n={[6, 7]} />.
            </p>
            <p className="t-body" data-fade>
              A controlled human study found that supplements made from juice-derived, soluble PACs produced significantly higher urinary anti-adhesion activity than
              supplements made mainly from whole fruit or pomace
              <Ref n={[6]} />.
            </p>
          </div>
          <div data-fade>
            <AntiAdhesionChart />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="take-h">
        <div className="wrap">
          <SectionHead eyebrow="Daily use" title={<span id="take-h">How to take <em>ellura</em></span>} />
          <ol className="howto" role="list" data-stagger>
            <li>
              <Icon name="capsule" size={28} />
              <h3 className="t-h4">One capsule, daily</h3>
              <p className="muted">Take one capsule with water at the same time each day.</p>
            </li>
            <li>
              <Icon name="bolt" size={28} />
              <h3 className="t-h4">Extra support when needed</h3>
              <p className="muted">During travel or stress, take two capsules as needed, then return to one daily.</p>
            </li>
            <li>
              <Icon name="drop" size={28} />
              <h3 className="t-h4">Trouble swallowing?</h3>
              <p className="muted">Open the capsule into yoghurt, a fruit purée or a sweet drink — the powder is naturally bitter.</p>
            </li>
            <li>
              <Icon name="repeat" size={28} />
              <h3 className="t-h4">Make it a habit</h3>
              <p className="muted">Daily use helps maintain urinary tract balance.* Subscribe so you never miss a day.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="doctor-h">
        <div className="wrap wrap--narrow">
          <div className="callout" data-fade>
            <Icon name="info" size={28} />
            <div className="stack-sm">
              <h2 id="doctor-h" className="t-h4">
                ellura supports urinary tract health. It is not a treatment.
              </h2>
              <p className="muted">
                ellura is not intended to diagnose, treat, cure or prevent any disease, and it cannot replace antibiotics for an active infection. See a doctor promptly if
                you have burning when you urinate, fever, chills, back or side pain, or blood in your urine. You can take ellura alongside a prescribed antibiotic — ask
                your healthcare provider.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 40 }}>
            <References ids={[1, 2, 3, 4, 6, 7, 9, 17]} />
          </div>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
