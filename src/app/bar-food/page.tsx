import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bar & Food — The Makers Mill, Somerset, KY',
  description:
    'Bar & Food at The Makers Mill — craft brews, cocktails, and fresh-made food in downtown Somerset, KY. The room where the night actually happens, at 402 E. Mt. Vernon St.'
};

type Feature = {
  n: string;
  icon: string;
  title: string;
  desc: string;
};

// Copy stays general — no invented menu items or pricing beyond what's already
// referenced on the homepage About section ("craft brews, cocktails, gourmet sandwiches").
const FEATURES: Feature[] = [
  {
    n: '01',
    icon: '🥃',
    title: 'Drinks',
    desc: 'Craft brews, cocktails, and easygoing pours — the bar runs the room.'
  },
  {
    n: '02',
    icon: '🥪',
    title: 'Bites',
    desc: 'Gourmet sandwiches made fresh in the back. Worth staying for.'
  },
  {
    n: '03',
    icon: '🎶',
    title: 'Event Night Energy',
    desc: 'On show nights the room fills up — a good seat, a good drink, a great set.'
  }
];

export default function BarFoodPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          {/* TODO: swap for a real bar / food hero photo once available */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_003-1024x683.jpg"
            alt="Bar and gathering space at The Makers Mill in Somerset, Kentucky"
          />
        </div>
        <div className="page-hero-glow"></div>
        <div className="page-hero-inner">
          <Link href="/" className="back-home rev">
            ← The Makers Mill
          </Link>
          <div className="page-hero-stamp rev">✦ Bar &amp; Food · Downtown Somerset ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            GOOD
            <br />
            <em>DRINKS.</em>
            GOOD ROOM.
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Downtown Somerset, KY
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            Craft brews, cocktails, and made-in-the-back food — the bar at Makers Mill is the room
            where the night actually happens.
          </p>
          <div className="page-hero-ctas rev" style={{ transitionDelay: '.36s' }}>
            <Link href="/#visit" className="btn btn-fill">
              Plan Your Visit
            </Link>
            <Link href="/#events" className="btn btn-outline">
              See Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="pintro">
        <div className="pintro-inner">
          <div className="rev-l">
            <div className="label">More Than a Bar</div>
            <h2 className="pintro-h">
              Part of the
              <br />
              <em>Bigger Night.</em>
            </h2>
            <p className="pintro-p">
              The bar at Makers Mill isn&apos;t a side-room — it&apos;s the gathering point. On
              show nights it&apos;s the warm-up and the post-set hang. On weekday evenings
              it&apos;s the low-key place to land for a good drink in good company.
            </p>
            <p className="pintro-p">
              Pull up a seat, order something fresh from the back, and stay awhile. The room is
              built to stay in.
            </p>
          </div>
          <div className="pintro-photos rev-r">
            <div className="pintro-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_011-1024x682.jpg"
                alt="Inside The Makers Mill — gathering space"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_014-1024x682.jpg"
                alt="The Makers Mill interior detail"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_008-1024x682.jpg"
                alt="The Makers Mill space — evening"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="bar-features" className="feat">
        <div className="feat-inner">
          <div className="feat-head rev">
            <div className="label" style={{ justifyContent: 'center' }}>
              What&apos;s Pouring
            </div>
            <h2 className="feat-h">
              Drinks. Bites.
              <br />
              <em>And the Room.</em>
            </h2>
            <p className="feat-sub">
              Three things you&apos;ll find on any given night — and the reason a quick stop turns
              into staying for the set.
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

      {/* ── ATMOSPHERE ── */}
      <section id="atmosphere" style={{ position: 'relative', padding: '88px clamp(20px,3.5%,72px)', background: 'var(--deep)', overflow: 'hidden', textAlign: 'center' }}>
        <div className="comm-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            The Atmosphere
          </div>
          <h2 className="comm-h rev" style={{ transitionDelay: '.08s' }}>
            Built for
            <br />
            <em>Hanging Out.</em>
          </h2>
          <div className="comm-rule rev" style={{ transitionDelay: '.16s' }}></div>
          <p className="comm-p rev" style={{ transitionDelay: '.2s' }}>
            Warm wood, low light, and a bar that runs the length of the room. The kind of place
            where you can hear yourself talk, lean on the rail, and stay through whatever&apos;s
            happening on stage.
          </p>
          <p className="comm-p rev" style={{ transitionDelay: '.24s' }}>
            Show up early, eat well, drink something good. Stay later than you meant to.
          </p>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            Come Find Us
          </div>
          <h2 className="cta-band-h rev" style={{ transitionDelay: '.08s' }}>
            Plan a
            <br />
            <em>Night Out.</em>
          </h2>
          <p className="cta-band-p rev" style={{ transitionDelay: '.16s' }}>
            Check the hours, grab directions, or look at what&apos;s on the calendar.
          </p>
          <div className="cta-band-ctas rev" style={{ transitionDelay: '.24s' }}>
            <Link href="/#visit" className="btn btn-fill">
              Plan Your Visit
            </Link>
            <Link href="/#events" className="btn btn-outline">
              See Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── ALSO AT THE MILL ── */}
      <section className="also">
        <div className="also-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            Also at the Mill
          </div>
          <h2 className="also-h rev" style={{ transitionDelay: '.08s' }}>
            More Under
            <br />
            <em>One Roof.</em>
          </h2>
          <p className="also-sub rev" style={{ transitionDelay: '.16s' }}>
            Bar &amp; Food is one of three. Take a look at the rest of Makers Mill.
          </p>
          <div className="also-grid">
            <Link href="/stage" className="also-card rev" style={{ transitionDelay: '.2s' }}>
              <div className="also-label">Live Music</div>
              <div className="also-name">The Stage</div>
              <p className="also-desc">
                Live music, ticketed shows, and the loudest nights downtown.
              </p>
              <span className="also-arrow">Explore The Stage →</span>
            </Link>
            <Link href="/store" className="also-card rev" style={{ transitionDelay: '.28s' }}>
              <div className="also-label">Shop Local</div>
              <div className="also-name">The Store</div>
              <p className="also-desc">
                Local makers, artisan goods, and one-of-a-kind vintage finds.
              </p>
              <span className="also-arrow">Visit The Store →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
