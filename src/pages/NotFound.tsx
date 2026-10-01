import { Link } from 'react-router-dom';
import { Clover } from '../components/ui/primitives';
import { useMeta } from '../lib/useMeta';

export default function NotFound() {
  useMeta({ title: 'Page not found', description: 'The page you were looking for could not be found.', noindex: true });
  return (
    <section className="notfound on-dark grain" data-header-tone="dark">
      <div className="wrap notfound__inner">
        <Clover className="notfound__clover" />
        <p className="t-mono">Error 404</p>
        <h1 className="t-d1">
          This page has been <em className="serif-em">flushed out.</em>
        </h1>
        <p className="t-lead">The link may be old or mistyped. Let’s get you back on track.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/ellura" className="btn btn--lilac">
            Go to homepage
          </Link>
          <Link to="/ellura/shop" className="btn btn--ghost">
            Shop ellura
          </Link>
        </div>
      </div>
    </section>
  );
}
