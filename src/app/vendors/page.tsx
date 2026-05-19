import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ApplyButton } from '@/components/ApplyButton';

export const metadata: Metadata = {
  title: 'Vendors — Local Makers & Vintage Finds in Somerset, KY | The Makers Mill',
  description:
    "Vendors at The Makers Mill — handmade goods from Somerset's local makers, curated vintage finds, and one-of-a-kind pieces. New stuff every visit at 402 E. Mt. Vernon St."
};

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
    icon: '🎨',
    title: 'Local Makers',
    desc: "Pottery, jewelry, paintings, sculptures — work from Somerset's creative community."
  },
  {
    n: '02',
    icon: '✋',
    title: 'Handmade Goods',
    desc: "One-of-a-kind pieces made by hand. You won't find these on a shelf anywhere else."
  },
  {
    n: '03',
    icon: '🪺',
    title: 'Vintage Finds',
    desc: 'Curated vintage clothing, furniture, windows, and rotating one-of-a-kind pieces.'
  }
];

export default function VendorsPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          {/* TODO: swap for a real store / makers-market hero photo once available */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_004-1024x682.jpg"
            alt="Vendors at The Makers Mill — local makers and vintage finds in Somerset, Kentucky"
          />
        </div>
        <div className="page-hero-glow"></div>
        <div className="page-hero-inner">
          <Link href="/" className="back-home rev" aria-label="Back to Makers Mill home">
            Back to Makers Mill
          </Link>
          <div className="page-hero-stamp rev">✦ Vendors · Local Makers ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            FROM LOCAL
            <br />
            <em>MAKERS</em>
            TO YOU.
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Downtown Somerset, KY
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            Handmade goods, art, and curated vintage from Somerset&apos;s makers — new stuff every
            visit from the Vendors inside Makers Mill.
          </p>
          <div className="page-hero-ctas rev" style={{ transitionDelay: '.36s' }}>
            <Link href="/#visit" className="btn btn-fill">
              Plan Your Visit
            </Link>
            <ApplyButton className="btn btn-outline">
              Interested in Selling Here?
            </ApplyButton>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="pintro">
        <div className="pintro-inner">
          <div className="rev-l">
            <div className="label">About the Vendors</div>
            <h2 className="pintro-h">
              Browse Unique.
              <br />
              <em>Support Local.</em>
            </h2>
            <p className="pintro-p">
              Our vendors are the artisan side of Makers Mill — a curated retail floor of work by
              Somerset&apos;s creative community, alongside hand-picked vintage. Pieces rotate
              regularly, so the shop you walk through this weekend won&apos;t be the same one as
              last month.
            </p>
            <p className="pintro-p">
              Every purchase here lands in the pocket of a local maker or keeps a vintage piece
              moving on to its next life. A nicer way to take something home from your visit.
            </p>
          </div>
          <div className="pintro-photos rev-r">
            <div className="pintro-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_005-1024x682.jpg"
                alt="Handmade goods from the Vendors at The Makers Mill"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_007-1024x682.jpg"
                alt="Artisan goods inside The Makers Mill"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_010-1024x682.jpg"
                alt="Local maker display from a Vendor at The Makers Mill"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="vendors-features" className="feat">
        <div className="feat-inner">
          <div className="feat-head rev">
            <div className="label" style={{ justifyContent: 'center' }}>
              What You&apos;ll Find
            </div>
            <h2 className="feat-h">
              Made Here.
              <br />
              <em>Found Here.</em>
            </h2>
            <p className="feat-sub">
              The Vendors rotate regularly. These are the three things you can count on every
              visit.
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

      {/* ── APPLY FOR SPACE (modal trigger) ── */}
      <section id="apply" className="inquiry">
        <div className="inquiry-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            For Makers &amp; Sellers
          </div>
          <h2 className="inquiry-h rev" style={{ transitionDelay: '.08s' }}>
            Got Something
            <br />
            <em>to Sell?</em>
          </h2>
          <p className="inquiry-p rev" style={{ transitionDelay: '.16s' }}>
            Makers, vintage curators, small businesses — if your work would feel at home on the
            Vendor floor, we want to hear from you. Hit the button and we&apos;ll be in touch.
          </p>
          <div className="inquiry-tags rev" style={{ transitionDelay: '.24s', marginBottom: 28 }}>
            <span>Local Makers</span>
            <span>Vintage Curators</span>
            <span>Small Businesses</span>
          </div>
          <div className="inquiry-ctas rev" style={{ transitionDelay: '.32s' }}>
            <ApplyButton className="btn btn-fill">Apply for a Space</ApplyButton>
          </div>
          <p className="inquiry-p rev" style={{ transitionDelay: '.4s', marginTop: 28, fontSize: 13 }}>
            Prefer email? Reach out at{' '}
            <a href={CONTACT_HREF} style={{ color: 'var(--orange)' }}>
              makersmillsomerset@gmail.com
            </a>
            .
          </p>
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
            The Vendors are one of three. Take a look at the rest of Makers Mill.
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
            <Link href="/bar-food" className="also-card rev" style={{ transitionDelay: '.28s' }}>
              <div className="also-label">Eat &amp; Drink</div>
              <div className="also-name">Bar &amp; Food</div>
              <p className="also-desc">
                Craft brews, cocktails, and a room built for hanging out.
              </p>
              <span className="also-arrow">View Bar &amp; Food →</span>
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
