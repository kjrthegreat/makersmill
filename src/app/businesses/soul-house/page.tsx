import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Soul House — Inside The Makers Mill, Somerset, KY',
  description:
    'Soul House operates inside The Makers Mill in downtown Somerset, KY — a distinct space sharing the building with the makers and the music at 402 E. Mt. Vernon St.'
};

// TODO: replace with real Soul House contact or social URL
const CONTACT_HREF = 'mailto:makersmillsomerset@gmail.com';

type Feature = {
  n: string;
  icon: string;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    n: '01',
    icon: '🏠',
    title: 'Their Own Space',
    desc: "Soul House has its own distinct identity inside the Mill — a room with its own vibe and purpose."
  },
  {
    n: '02',
    icon: '🤝',
    title: 'Part of the Mill',
    desc: 'Sharing walls with the stage, the bar, and the vendors — connected to everything Makers Mill is building.'
  },
  {
    n: '03',
    icon: '📬',
    title: 'Get in Touch',
    desc: 'Reach out directly to Soul House or stop by the Mill to see what they have going on.'
  }
];

export default function SoulHousePage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          {/* TODO: swap for a real Soul House photo once available */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_019-1024x682.jpg"
            alt="Soul House inside The Makers Mill in Somerset, Kentucky"
          />
        </div>
        <div className="page-hero-glow"></div>
        <div className="page-hero-inner">
          <Link href="/" className="back-home rev" aria-label="Back to Makers Mill home">
            Back to Makers Mill
          </Link>
          <div className="page-hero-stamp rev">✦ Soul House · Inside the Mill ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            ITS OWN
            <br />
            <em>THING.</em>
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Inside The Makers Mill · Somerset, KY
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            Soul House operates inside The Makers Mill — a distinct space sharing the building
            with the makers, the music, and everything else that makes the Mill a destination.
          </p>
          <div className="page-hero-ctas rev" style={{ transitionDelay: '.36s' }}>
            <a href={CONTACT_HREF} className="btn btn-fill">
              Get in Touch
            </a>
            <Link href="/#visit" className="btn btn-outline">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="pintro">
        <div className="pintro-inner">
          <div className="rev-l">
            <div className="label">About Soul House</div>
            <h2 className="pintro-h">
              Distinct Space.
              <br />
              <em>Shared Building.</em>
            </h2>
            <p className="pintro-p">
              Soul House is its own brand inside Makers Mill — it has its own identity, its own
              space, and its own thing going on. It shares the building with the stage, the bar,
              the vendors, and the other businesses that make the Mill what it is.
            </p>
            <p className="pintro-p">
              Stop in and see what&apos;s happening, or get in touch directly to find out more
              about what Soul House has going on.
            </p>
          </div>
          <div className="pintro-photos rev-r">
            <div className="pintro-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_021-1024x682.jpg"
                alt="Inside The Makers Mill — Soul House space"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_023-1024x682.jpg"
                alt="Soul House at The Makers Mill"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_024-1024x682.jpg"
                alt="The Makers Mill interior detail"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="soulhouse-features" className="feat">
        <div className="feat-inner">
          <div className="feat-head rev">
            <div className="label" style={{ justifyContent: 'center' }}>
              What They&apos;re About
            </div>
            <h2 className="feat-h">
              Their Space.
              <br />
              <em>Their Terms.</em>
            </h2>
            <p className="feat-sub">
              Soul House does its own thing inside the Mill — here&apos;s how they fit into the bigger picture.
            </p>
          </div>
          <div className="feat-grid">
            {FEATURES.map((f, i) => (
              <div key={f.n} className="feat-card rev" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="feat-n">{f.n}</div>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            Find Soul House
          </div>
          <h2 className="cta-band-h rev" style={{ transitionDelay: '.08s' }}>
            Come See
            <br />
            <em>What&apos;s Here.</em>
          </h2>
          <p className="cta-band-p rev" style={{ transitionDelay: '.16s' }}>
            Stop by the Mill to see Soul House in person, or get in touch ahead of time.
          </p>
          <div className="cta-band-ctas rev" style={{ transitionDelay: '.24s' }}>
            <a href={CONTACT_HREF} className="btn btn-fill">
              Get in Touch
            </a>
            <Link href="/#visit" className="btn btn-outline">
              Visit the Mill
            </Link>
          </div>
        </div>
      </section>

      {/* ── ALSO AT THE MILL ── */}
      <section className="also">
        <div className="also-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            Also Inside the Mill
          </div>
          <h2 className="also-h rev" style={{ transitionDelay: '.08s' }}>
            More Under
            <br />
            <em>One Roof.</em>
          </h2>
          <p className="also-sub rev" style={{ transitionDelay: '.16s' }}>
            Soul House is one of several businesses inside Makers Mill.
          </p>
          <div className="also-grid">
            <Link href="/businesses/print-ghost" className="also-card rev" style={{ transitionDelay: '.2s' }}>
              <div className="also-label">Print Studio</div>
              <div className="also-name">Print Ghost</div>
              <p className="also-desc">
                An independent print studio — screen printing and original graphic work.
              </p>
              <span className="also-arrow">Learn More →</span>
            </Link>
            <Link href="/businesses/pilates" className="also-card rev" style={{ transitionDelay: '.28s' }}>
              <div className="also-label">Movement</div>
              <div className="also-name">Pilates</div>
              <p className="also-desc">
                A pilates studio inside the Mill — classes and sessions in a restored space.
              </p>
              <span className="also-arrow">Learn More →</span>
            </Link>
          </div>
          <Link href="/" className="also-home rev" style={{ transitionDelay: '.36s' }}>
            Back to Makers Mill Home
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
