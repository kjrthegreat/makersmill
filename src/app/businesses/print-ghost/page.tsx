import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Print Ghost — Print Studio at The Makers Mill, Somerset, KY',
  description:
    'Print Ghost is an independent print studio operating inside The Makers Mill in downtown Somerset, KY. Screen printing, original graphic work, and custom orders at 402 E. Mt. Vernon St.'
};

// TODO: replace '#' with Print Ghost's real contact or social URL
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
    icon: '🖨️',
    title: 'Screen Printing',
    desc: 'Original and custom screen-printed work, run out of their studio inside the Mill.'
  },
  {
    n: '02',
    icon: '🎨',
    title: 'Original Graphics',
    desc: "Prints, posters, and original designs — stop in to see what's coming off the press."
  },
  {
    n: '03',
    icon: '✉️',
    title: 'Custom Orders',
    desc: 'Need something printed? Get in touch. They work with local businesses and individuals.'
  }
];

export default function PrintGhostPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          {/* TODO: swap for a real Print Ghost studio photo once available */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_002-1024x682.jpg"
            alt="Print Ghost studio inside The Makers Mill in Somerset, Kentucky"
          />
        </div>
        <div className="page-hero-glow"></div>
        <Link href="/" className="back-home" aria-label="Back to Makers Mill home">Back to Makers Mill</Link>
        <div className="page-hero-inner">
          <div className="page-hero-stamp rev">✦ Print Ghost · Print Studio ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            PRINT.
            <br />
            <em>MAKE.</em>REPEAT.
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Inside The Makers Mill · Somerset, KY
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            An independent print studio working out of The Makers Mill — screen printing,
            original graphics, and custom work made right here in downtown Somerset.
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
            <div className="label">About Print Ghost</div>
            <h2 className="pintro-h">
              Made by Hand.
              <br />
              <em>Right Here.</em>
            </h2>
            <p className="pintro-p">
              Print Ghost is an independent print studio operating out of The Makers Mill. They
              work in the same building as the music, the market, and the bar — a working studio
              in the middle of everything the Mill is about.
            </p>
            <p className="pintro-p">
              Stop in to see what&apos;s in progress or get in touch about a custom order. The
              press runs out of the studio inside the Mill.
            </p>
          </div>
          <div className="pintro-photos rev-r">
            <div className="pintro-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_006-1024x682.jpg"
                alt="Inside The Makers Mill — Print Ghost studio space"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_009-1024x682.jpg"
                alt="Print Ghost workspace at The Makers Mill"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_012-1024x682.jpg"
                alt="The Makers Mill interior detail"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="printghost-features" className="feat">
        <div className="feat-inner">
          <div className="feat-head rev">
            <div className="label" style={{ justifyContent: 'center' }}>
              What They Do
            </div>
            <h2 className="feat-h">
              Off the Press.
              <br />
              <em>Into Your Hands.</em>
            </h2>
            <p className="feat-sub">
              A working studio with a few things on the menu — stop in or reach out to see what&apos;s possible.
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
            Work with Print Ghost
          </div>
          <h2 className="cta-band-h rev" style={{ transitionDelay: '.08s' }}>
            Want Something
            <br />
            <em>Printed?</em>
          </h2>
          <p className="cta-band-p rev" style={{ transitionDelay: '.16s' }}>
            Get in touch for custom orders or stop in to see what&apos;s on the press.
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
            Print Ghost is one of several businesses inside Makers Mill.
          </p>
          <div className="also-grid">
            <Link href="/businesses/pilates" className="also-card rev" style={{ transitionDelay: '.2s' }}>
              <div className="also-label">Movement</div>
              <div className="also-name">Pilates</div>
              <p className="also-desc">
                A pilates studio inside the Mill — classes and sessions in a restored space.
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
