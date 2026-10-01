import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { useReveals } from '../../lib/useReveals';
import Icon from '../ui/Icon';
import { Img } from '../ui/primitives';

/** Homepage doc, Section 7: “Earn Rewards & Share the Benefits”. Copy from the US site. */
export default function Rewards() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo('.rewards__product', { yPercent: 12, rotate: 4 }, { yPercent: -8, rotate: -2, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.fromTo('.rewards__orb', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } });
      });
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className="rewards section tone-label" aria-labelledby="rewards-title">
      <div className="wrap rewards__grid">
        <div className="rewards__copy">
          <p className="eyebrow" data-fade>
            My ellura Rewards
          </p>
          <h2 id="rewards-title" className="t-d2 accent-em" data-split>
            Earn rewards &amp; <em>share the benefits.</em>
          </h2>
          <p className="t-lead" data-fade>
            We love rewarding our loyal customers! With the My ellura Rewards &amp; Referral Program, you can earn points on every purchase, redeem discounts, and share
            the benefits of ellura with your friends and family.
          </p>
          <ul className="rewards__list" role="list" data-stagger>
            <li>
              <Icon name="gift" size={20} /> Earn points on every purchase
            </li>
            <li>
              <Icon name="star" size={20} /> Redeem them for discounts
            </li>
            <li>
              <Icon name="user" size={20} /> Share ellura with friends and family
            </li>
          </ul>
          <p className="rewards__member" data-fade>
            <strong>Already a member?</strong> Sign in to check your points and redeem rewards.
          </p>
          <div className="rewards__ctas" data-fade>
            <Link to="/ellura/account?view=register" className="btn btn--ghost">
              Create account
            </Link>
            <Link to="/ellura/account" className="btn">
              Sign in
            </Link>
          </div>
        </div>
        <div className="rewards__visual">
          <div className="rewards__orb" aria-hidden="true" />
          <div className="rewards__arch" data-arch>
            <Img photo="leafShadow2" sizes="(max-width: 900px) 90vw, 40vw" width={800} height={1000} alt="" />
          </div>
          <Img photo="bottleBox" className="rewards__product" sizes="(max-width: 900px) 80vw, 36vw" width={900} height={900} />
        </div>
      </div>
    </section>
  );
}
