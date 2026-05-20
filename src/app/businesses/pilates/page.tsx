import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pilates — Movement Studio at The Makers Mill, Somerset, KY',
  description:
    'A pilates studio inside The Makers Mill in downtown Somerset, KY — classes and sessions in a beautifully restored space at 402 E. Mt. Vernon St.'
};

// TODO: replace with real booking URL or contact for Pilates studio
const BOOK_HREF = 'mailto:makersmillsomerset@gmail.com';

type Feature = {
  n: string;
  icon: string;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    n: '01',
    icon: '🧘',
    title: 'Mat Classes',
    desc: 'Group mat pilates in a beautifully restored space — accessible for all levels.'
  },
  {
    n: '02',
    icon: '⚙️',
    title: 'Equipment Sessions',
    desc: 'Work with reformers and equipment in small groups or private sessions.'
  },
  {
    n: '03',
    icon: '📅',
    title: 'Flexible Schedule',
    desc: 'Morning and evening classes throughout the week — get in touch for current availability.'
  }
];

export default function PilatesPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          {/* TODO: swap for a real Pilates studio photo once available */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_013-1024x682.jpg"
            alt="Pilates studio inside The Makers Mill in Somerset, Kentucky"
          />
        </div>
        <div className="page-hero-glow"></div>
        <Link href="/" className="back-home" aria-label="Back to Makers Mill home">Back to Makers Mill</Link>
        <div className="page-hero-inner">
          <div className="page-hero-stamp rev">✦ Pilates · Movement Studio ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            MOVE WITH
            <br />
            <em>INTENTION.</em>
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Inside The Makers Mill · Somerset, KY
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            A pilates studio tucked inside The Makers Mill — classes and sessions in a
            beautifully restored space in the heart of downtown Somerset.
          </p>
          <div className="page-hero-ctas rev" style={{ transitionDelay: '.36s' }}>
            <a href={BOOK_HREF} className="btn btn-fill">
              Book a Session
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
            <div className="label">About the Studio</div>
            <h2 className="pintro-h">
              Built for the
              <br />
              <em>Body.</em>
            </h2>
            <p className="pintro-p">
              The pilates studio inside Makers Mill is its own world — a calm, focused space set
              within a building full of energy. Classes run throughout the week, from early
              morning to evening, in a restored room that makes showing up easy.
            </p>
            <p className="pintro-p">
              Whether you&apos;re new to pilates or have been at it for years, the studio offers
              mat classes, equipment sessions, and small-group options. Get in touch for the
              current schedule.
            </p>
          </div>
          <div className="pintro-photos rev-r">
            <div className="pintro-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_015-1024x682.jpg"
                alt="Inside The Makers Mill — Pilates studio space"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_016-1024x682.jpg"
                alt="Pilates studio at The Makers Mill"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_018-1024x682.jpg"
                alt="The Makers Mill interior — restored space"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="pilates-features" className="feat">
        <div className="feat-inner">
          <div className="feat-head rev">
            <div className="label" style={{ justifyContent: 'center' }}>
              What&apos;s Offered
            </div>
            <h2 className="feat-h">
              Classes. Sessions.
              <br />
              <em>Your Practice.</em>
            </h2>
            <p className="feat-sub">
              Three ways to work with the studio — get in touch to find the right fit for you.
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
            Start Moving
          </div>
          <h2 className="cta-band-h rev" style={{ transitionDelay: '.08s' }}>
            Book a
            <br />
            <em>Session.</em>
          </h2>
          <p className="cta-band-p rev" style={{ transitionDelay: '.16s' }}>
            Get in touch to reserve a spot in a class or set up a private session.
          </p>
          <div className="cta-band-ctas rev" style={{ transitionDelay: '.24s' }}>
            <a href={BOOK_HREF} className="btn btn-fill">
              Book a Session
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
            Pilates is one of several businesses inside Makers Mill.
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
            <Link href="/businesses/soul-house" className="also-card rev" style={{ transitionDelay: '.28s' }}>
              <div className="also-label">In the Mill</div>
              <div className="also-name">Soul House</div>
              <p className="also-desc">
                A distinct space inside Makers Mill with its own thing going on.
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
