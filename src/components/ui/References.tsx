import { REFERENCES } from '../../content/references';
import Accordion, { AccordionItem } from './Accordion';

function RefList({ ids }: { ids?: number[] }) {
  const refs = ids ? REFERENCES.filter((r) => ids.includes(r.n)) : REFERENCES;
  return (
    <ol className="refs" role="list">
      {refs.map((r) => (
        <li key={r.n} id={ids ? undefined : `ref-${r.n}`} className="refs__item">
          <span className="refs__n t-mono">{r.n}</span>
          <p>
            {r.authors} ({r.year}). {r.title} <i>{r.source}</i>
            {r.detail ? `, ${r.detail}` : '.'}{' '}
            {r.url && (
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="link">
                Source<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Collapsible reference list. `open` renders it expanded with anchors (Science page). */
export default function References({ open = false, ids }: { open?: boolean; ids?: number[] }) {
  if (open) return <RefList ids={ids} />;
  return (
    <Accordion className="refs-acc">
      <AccordionItem title={<span className="t-mono">References ({ids ? ids.length : REFERENCES.length})</span>}>
        <RefList ids={ids} />
      </AccordionItem>
    </Accordion>
  );
}
