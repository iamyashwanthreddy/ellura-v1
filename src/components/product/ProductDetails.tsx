import { useRef, useState } from 'react';
import { LABEL, src, srcSet } from '../../commerce/catalog';
import type { Product } from '../../commerce/types';
import { HIGHLIGHTS } from '../../content/brand';
import { useReveals } from '../../lib/useReveals';
import Accordion, { AccordionItem } from '../ui/Accordion';
import Modal from '../ui/Modal';
import References from '../ui/References';
import { Ref } from '../ui/primitives';

/** Supplement Facts panel, transcribed from the official carton. */
export function SupplementFacts() {
  return (
    <div className="facts" role="table" aria-label="Supplement Facts">
      <h4 role="caption">Supplement Facts</h4>
      <div className="facts__row facts__row--thick" role="row">
        <span role="cell">Serving size</span>
        <span role="cell">{LABEL.servingSize}</span>
      </div>
      <div className="facts__row" role="row">
        <strong role="columnheader">Amount per capsule</strong>
        <span role="columnheader" />
      </div>
      <div className="facts__row facts__row--thick" role="row">
        <span role="cell">
          {LABEL.active.name} <small>{LABEL.active.source}</small>
        </span>
        <strong role="cell">{LABEL.active.amount}†</strong>
      </div>
      <small>† {LABEL.active.dv}</small>
      <small>
        <strong>Other ingredients:</strong> {LABEL.otherIngredients.join(', ')}.
      </small>
    </div>
  );
}

/** Doc, product page Section 2: accordion tabs — Overview, Ingredients, How it works, References. */
export default function ProductDetails({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  useReveals(ref, [product.sku]);
  const infographics = product.images.filter((i) => i.base.includes('/info-'));

  return (
    <section ref={ref} className="pdp-section tone-bone" aria-labelledby="details-title">
      <div className="wrap pdp-details">
        <aside className="pdp-details__aside">
          <p className="eyebrow" data-fade>
            Product details
          </p>
          <h2 id="details-title" className="t-d3 accent-em" data-split>
            Everything on <em>the label.</em>
          </h2>
          <SupplementFacts />
          <p className="t-xs muted">{LABEL.method}</p>
        </aside>

        <div>
          <Accordion>
            <AccordionItem title="Overview" defaultOpen id="overview">
              <p>
                ellura® is a clinically backed supplement that helps reduce the ability of certain bacteria to adhere to the urinary tract, promoting urinary tract
                health.* Each capsule delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract.
              </p>
              <ul>
                {HIGHLIGHTS.map((h) => (
                  <li key={h.title}>
                    <strong>{h.title}.</strong> {h.body}
                  </li>
                ))}
              </ul>
              <p>
                This pack: <strong>{product.packLabel}</strong> — {product.supply} at one capsule a day.
              </p>
            </AccordionItem>
            <AccordionItem title="Ingredients" id="ingredients">
              <p>
                <strong>Active:</strong> 36 mg proanthocyanidins (PACs) from 206 mg concentrated cranberry (<i>Vaccinium macrocarpon</i>) fruit juice extract powder
                (Gikacran®)
                <Ref n={[6, 3, 7]} />.
              </p>
              <p>
                <strong>Other ingredients:</strong> {LABEL.otherIngredients.join(', ')}. These keep the ingredients from sticking together during manufacturing, improve
                stability and help keep the active PACs bioavailable.
              </p>
              <p>
                <strong>Free from:</strong> {LABEL.freeFrom.join(', ')}. 100% plant-based capsule.
              </p>
            </AccordionItem>
            <AccordionItem title="How it works" id="how">
              <p>
                Bacteria migrate to the urinary tract and attach to the bladder wall
                <Ref n={[17, 6, 3, 4]} />. The 36 mg of soluble PACs in ellura may reduce certain bacteria from adhering to the bladder wall
                <Ref n={[17, 3, 4]} />. Without attachment, bacteria are naturally eliminated through urine.
              </p>
              <p>
                Many products claim to have PACs, but if sourced from insoluble cranberry pomace they remain trapped in fibre and cannot be absorbed
                <Ref n={[6, 7]} />.
              </p>
            </AccordionItem>
            <AccordionItem title="Directions to use" id="directions">
              <p>{LABEL.directions}</p>
              <p>
                Take one capsule daily with water at the same time each day. When additional support is desired (e.g. travel, stress), take two capsules as needed, then
                return to one. If swallowing is difficult, open the capsule into soft food or a sweet drink.
              </p>
              <p>ellura is not intended to treat or cure urinary tract infections. Always follow your healthcare professional’s recommendation.</p>
            </AccordionItem>
            <AccordionItem title="Safety & storage" id="safety">
              <p>
                <strong>Precaution:</strong> {LABEL.precaution}
              </p>
              <p>{LABEL.storage}</p>
              <p>If you are pregnant, nursing, have a red-fruit allergy, diabetes, kidney stones or another medical condition, consult your healthcare provider first.</p>
            </AccordionItem>
            <AccordionItem title="References" id="references">
              <References open ids={[1, 2, 3, 4, 6, 7, 9, 12, 17]} />
            </AccordionItem>
          </Accordion>

          {infographics.length > 0 && (
            <div className="infostrip" style={{ marginTop: 32 }} data-stagger>
              {infographics.map((im, i) => (
                <button key={im.base} onClick={() => setZoom(i)} aria-label={`Enlarge: ${im.alt}`}>
                  <img src={src(im)} alt="" width={700} height={700} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={zoom !== null} onClose={() => setZoom(null)} label="Product infographic" variant="image">
        {zoom !== null && (
          <img src={src(infographics[zoom], true)} srcSet={srcSet(infographics[zoom])} sizes="900px" alt={infographics[zoom].alt} width={1400} height={1400} />
        )}
      </Modal>
    </section>
  );
}
