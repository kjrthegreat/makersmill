import Image from 'next/image';
import { ApplyButton } from './ApplyButton';

// TODO: replace '#' with the real ticketing URL when available
const TICKETS_HREF = '#';

export function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_001-1024x682.jpg"
          alt="The Makers Mill interior — Somerset, Kentucky"
        />
      </div>
      <div className="hero-glow"></div>
      <div className="hero-inner">
        <div className="hero-stamp rev">✦ Downtown Somerset, Kentucky ✦</div>
        <div className="hero-logo-wrap rev" style={{ transitionDelay: '.08s' }}>
          <Image
            className="hero-acorn"
            src="/acorn.png"
            alt="The Makers Mill logo"
            width={80}
            height={80}
            priority
          />
        </div>
        <h1 className="hero-h1 rev" style={{ transitionDelay: '.15s' }}>
          WHERE THE
          <br />
          <em>MAKERS</em>GATHER.
        </h1>
        <div className="hero-place rev" style={{ transitionDelay: '.24s' }}>
          402 E. Mt. Vernon St.
        </div>
        <p className="hero-sub rev" style={{ transitionDelay: '.32s' }}>
          Live music · food &amp; drinks · artisan shopping · arcade · pool · events.
          <br />
          Somerset&apos;s multi-experience gathering place — all under one roof.
        </p>
        <div className="hero-ctas rev" style={{ transitionDelay: '.4s' }}>
          <a href={TICKETS_HREF} className="btn btn-fill">
            Get Event Tickets
          </a>
          <a href="#explore-mill" className="btn btn-outline">
            Explore Makers Mill
          </a>
        </div>
        <div className="hero-apply rev" style={{ transitionDelay: '.48s' }}>
          <ApplyButton className="hero-apply-link">
            <span className="hero-apply-stamp">✦ Now Accepting Applications</span>
            <span className="hero-apply-body">
              Interested in a retail space, studio, or stage spot at the Mill?
            </span>
            <span className="hero-apply-cta">Apply for a Space →</span>
          </ApplyButton>
        </div>
      </div>
    </section>
  );
}
