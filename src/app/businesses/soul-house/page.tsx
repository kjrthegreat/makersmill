import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Soul House — Inside The Makers Mill, Somerset, KY',
  description:
    'Soul House is a creative community space inside The Makers Mill in downtown Somerset, KY — events, gatherings, and a room with its own energy at 402 E. Mt. Vernon St.',
  openGraph: {
    title: 'Soul House — Inside The Makers Mill, Somerset, KY',
    description: 'A creative community space with its own energy — Soul House operates inside The Makers Mill in downtown Somerset, KY.',
    images: [{ url: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_019-1024x682.jpg', width: 1024, height: 682 }]
  },
  twitter: { card: 'summary_large_image' }
};

// TODO: replace with real Soul House contact, booking, or social URL
const CONTACT_HREF = 'mailto:makersmillsomerset@gmail.com';

type Feature = {
  n: string;
  icon: string;
  title: string;
  desc: string;
};

// TODO: update these with real Soul House programming and offerings once confirmed
const FEATURES: Feature[] = [
  {
    n: '01',
    icon: '✦',
    title: 'Events & Gatherings',
    desc: 'Soul House hosts its own events inside the Mill — community nights, pop-ups, and gatherings with a distinct energy.'
  },
  {
    n: '02',
    icon: '✶',
    title: 'Creative Space',
    desc: 'A room dedicated to creative community — workshops, showcases, and experiences that don\'t fit the usual mold.'
  },
  {
    n: '03',
    icon: '❖',
    title: 'Part of Something Bigger',
    desc: 'Sharing the building with the Stage, the bar, and the makers — connected to everything that makes the Mill a destination.'
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
        <div className="page-hero-glow" />
        <Link href="/" className="back-home" aria-label="Back to Makers Mill home">Back to Makers Mill</Link>
        <div className="page-hero-inner">
          <div className="page-hero-stamp rev">✦ Soul House · Community Space ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            SOUL
            <br />
            <em>HOUSE.</em>
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Inside The Makers Mill · Somerset, KY
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            {/* TODO: update with real Soul House tagline once the brand is defined */}
            A creative community space operating inside The Makers Mill — events, gatherings, and
            a room with its own distinct energy.
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
              {/* TODO: update headline with real Soul House brand voice */}
              Community.
              <br />
              <em>Culture. Space.</em>
            </h2>
            {/* TODO: replace with real Soul House description and programming details */}
            <p className="pintro-p">
              Soul House is its own brand with its own identity inside Makers Mill. They run events,
              host gatherings, and use the space in ways that feel distinct from anything else in the
              building — it&apos;s a room that knows what it&apos;s for.
            </p>
            <p className="pintro-p">
              Part of what makes the Mill interesting is that spaces like Soul House exist within it
              — independent operations sharing a building but doing their own thing. Stop in, see
              what&apos;s on, or get in touch to find out more about what they have going.
            </p>
          </div>
          <div className="pintro-photos rev-r">
            {/* TODO: swap for real Soul House photos once available */}
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
                alt="The Makers Mill interior — gathering space"
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
              {/* TODO: update label with real Soul House programming category */}
              What They Do
            </div>
            <h2 className="feat-h">
              {/* TODO: replace with real Soul House offerings headline */}
              Their Space.
              <br />
              <em>Their Way.</em>
            </h2>
            <p className="feat-sub">
              {/* TODO: replace with real description of Soul House programming */}
              Soul House brings its own energy to the Mill — here&apos;s how they use the space.
            </p>
          </div>
          <div className="feat-grid">
            {/* TODO: update feature cards with real Soul House programming details in the array above */}
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
            Stop by the Mill to see Soul House in person, or reach out ahead of your visit.
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
            Soul House is one of several businesses operating inside Makers Mill.
          </p>
          <div className="also-grid">
            <Link href="/businesses/print-ghost" className="also-card rev" style={{ transitionDelay: '.2s' }}>
              <div className="also-label">Print Studio</div>
              <div className="also-name">Print Ghost</div>
              <p className="also-desc">
                An independent print studio — screen printing and original graphic work made right here.
              </p>
              <span className="also-arrow">Learn More →</span>
            </Link>
            <Link href="/businesses/pilates" className="also-card rev" style={{ transitionDelay: '.28s' }}>
              <div className="also-label">Movement</div>
              <div className="also-name">Pilates</div>
              <p className="also-desc">
                A pilates studio inside the Mill — classes and sessions in a beautifully restored space.
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
