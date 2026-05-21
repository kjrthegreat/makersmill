import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ApplyButton } from '@/components/ApplyButton';
import { VENDORS } from '@/lib/vendors';

export const metadata: Metadata = {
  title: 'Vendors — Local Makers & Shops at The Makers Mill, Somerset, KY',
  description:
    "Browse local vendors inside The Makers Mill — handmade goods, original art, vintage finds, jewelry, candles, and more from Somerset's creative community at 402 E. Mt. Vernon St.",
  openGraph: {
    title: 'Vendors — Local Makers & Shops at The Makers Mill, Somerset, KY',
    description: "Handmade goods, original art, vintage, jewelry, candles, and more — every local maker inside The Makers Mill in downtown Somerset.",
    images: [{ url: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_004-1024x682.jpg', width: 1024, height: 682 }]
  },
  twitter: { card: 'summary_large_image' }
};

export default function VendorsPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          {/* TODO: swap for a real makers-market or vendor-floor hero photo once available */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_004-1024x682.jpg"
            alt="Vendors at The Makers Mill — local makers and handmade goods in Somerset, Kentucky"
          />
        </div>
        <div className="page-hero-glow" />
        <Link href="/" className="back-home" aria-label="Back to Makers Mill home">
          Back to Makers Mill
        </Link>
        <div className="page-hero-inner">
          <div className="page-hero-stamp rev">✦ Meet the Vendors · Local Makers ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            LOCAL
            <br />
            <em>MAKERS.</em>
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Downtown Somerset, KY
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            Handmade goods, original art, curated vintage, jewelry, candles, and more — every
            vendor inside The Makers Mill, all in one place.
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

      {/* ── VENDOR DIRECTORY ──────────────────────────────────────────────── */}
      <section className="vdir">
        <div className="vdir-inner">
          {/* Section header */}
          <div className="vdir-head rev">
            <div className="label" style={{ justifyContent: 'center' }}>
              Browse the Vendors
            </div>
            <h2 className="vdir-h">
              Local Makers.
              <br />
              <em>All in One Place.</em>
            </h2>
            <p className="vdir-sub">
              Every maker, shop, and artist inside The Makers Mill — handmade goods, curated
              vintage, original art, and more. Inventory rotates, so there&apos;s always something
              new to discover.
            </p>
          </div>

          {/* Vendor card grid */}
          {/* TODO: add new vendors by appending to the VENDORS array in src/lib/vendors.ts */}
          <div className="vgrid">
            {VENDORS.map((vendor, i) => (
              <Link
                key={vendor.slug}
                href={`/vendors/${vendor.slug}`}
                className="vcard rev"
                style={{
                  // Sets the accent color CSS variable for each card.
                  // Remove once real logos are added and the color-coded initial is no longer needed.
                  ['--vc-accent' as string]: vendor.accent,
                  transitionDelay: `${(i % 3) * 0.08}s`,
                }}
              >
                {/* Card top — logo placeholder + category tags */}
                <div className="vcard-top">
                  {/* Logo placeholder: shows the vendor's initial until a real logo is supplied */}
                  {/* TODO: replace .vcard-initial-wrap with a real <img> logo once available */}
                  <div className="vcard-initial-wrap">
                    <span className="vcard-initial">{vendor.initial}</span>
                  </div>
                  <div className="vcard-tag-row">
                    {/* TODO: update categories in vendors.ts with real vendor tags */}
                    {vendor.categories.map((cat) => (
                      <span key={cat} className="vcard-cat">{cat}</span>
                    ))}
                  </div>
                </div>

                {/* Card body — name, description, CTA */}
                <div className="vcard-body">
                  {/* TODO: replace with real vendor name in vendors.ts */}
                  <div className="vcard-name">{vendor.name}</div>
                  {/* TODO: replace with real vendor description in vendors.ts */}
                  <p className="vcard-desc">{vendor.description}</p>
                  <span className="vcard-cta">Explore Shop →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Placeholder notice — remove once real vendor info is loaded */}
          <p className="events-note-foot rev" style={{ marginTop: 28 }}>
            Placeholder vendors shown — real maker names, photos, and descriptions coming soon.
          </p>
        </div>
      </section>

      {/* ── APPLY FOR A SPACE ─────────────────────────────────────────────── */}
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
            vendor floor, we want to hear from you. Hit the button and we&apos;ll be in touch.
          </p>
          <div
            className="inquiry-tags rev"
            style={{ transitionDelay: '.24s', marginBottom: 28 }}
          >
            <span>Local Makers</span>
            <span>Vintage Curators</span>
            <span>Small Businesses</span>
          </div>
          <div className="inquiry-ctas rev" style={{ transitionDelay: '.32s' }}>
            <ApplyButton className="btn btn-fill">Apply for a Space</ApplyButton>
          </div>
          <p
            className="inquiry-p rev"
            style={{ transitionDelay: '.4s', marginTop: 28, fontSize: 13 }}
          >
            Prefer email? Reach out at{' '}
            <a href="mailto:makersmillsomerset@gmail.com" style={{ color: 'var(--orange)' }}>
              makersmillsomerset@gmail.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── ALSO AT THE MILL ──────────────────────────────────────────────── */}
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
            The vendors are one part of the picture. Take a look at the rest of Makers Mill.
          </p>
          <div className="also-grid">
            <Link href="/stage" className="also-card rev" style={{ transitionDelay: '.2s' }}>
              <div className="also-label">Live Music</div>
              <div className="also-name">The Stage</div>
              <p className="also-desc">
                Live music, ticketed shows, and the loudest nights in downtown Somerset.
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
