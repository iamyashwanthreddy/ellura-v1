import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FAQ_GROUPS } from '../../content/faqs';
import { useReveals } from '../../lib/useReveals';
import Accordion, { AccordionItem } from '../ui/Accordion';
import { Rich } from '../ui/primitives';

/** FAQ block in the style of the supplied reference: “About ellura”, two columns of pills. */
export default function FaqTeaser({ groupId = 'about', title = 'FAQs', showIntro = true }: { groupId?: string; title?: string; showIntro?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  const group = FAQ_GROUPS.find((g) => g.id === groupId)!;
  return (
    <section ref={ref} className="faq-t section tone-bone" aria-labelledby="faq-t-title">
      <div className="wrap wrap--narrow">
        <header className="faq-t__head">
          <h2 id="faq-t-title" className="t-d2" data-split>
            {title}
          </h2>
          {showIntro && (
            <p className="t-lead" data-fade>
              We’re here to help! Below you’ll find answers to some of our most frequently asked questions. If you need further assistance, feel free to reach out — our
              team will be in touch shortly.
            </p>
          )}
          <Link to="/ellura/support" className="btn btn--lilac" data-fade>
            Contact us
          </Link>
        </header>
        <h3 className="faq-t__group t-h4" data-fade>
          {group.title.replace('ellura', '')}
          {group.title.includes('ellura') && <span className="brand-word">ellura</span>}
        </h3>
        <Accordion className="faq-grid">
          {group.items.map((f) => (
            <AccordionItem key={f.id} title={f.q} variant="pill" headingLevel="h4">
              {f.a.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
        <p className="faq-t__more" data-fade>
          <Link to="/ellura/faq" className="text-link">
            See all FAQs
          </Link>
        </p>
      </div>
    </section>
  );
}
