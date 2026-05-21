import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { VENDORS, getVendorBySlug } from '@/lib/vendors';

// Tell Next.js which slugs to pre-render at build time
export function generateStaticParams() {
  return VENDORS.map((v) => ({ slug: v.slug }));
}

// Per-vendor metadata
// TODO: update title/description template once real vendor names are set
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) return {};
  return {
    title: `${vendor.name} — Vendor at The Makers Mill, Somerset, KY`,
    description: `${vendor.tagline} Find ${vendor.name} on the vendor floor inside The Makers Mill at 402 E. Mt. Vernon St., Somerset, KY.`,
  };
}

export default async function VendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  // Split vendor name for the hero headline: first word plain, rest in italic em
  // e.g. "Ridge Root Studio" → "RIDGE" / "ROOT STUDIO."
  // TODO: for real vendor names, you can also set a custom heroHeadline field in vendors.ts
  const nameParts = vendor.name.split(' ');
  const heroLine1 = nameParts[0].toUpperCase();
  const heroLine2 = nameParts.slice(1).join(' ').toUpperCase();

  return (
    <>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          {/* TODO: swap for a real vendor hero/banner photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={vendor.heroImage}
            alt={`${vendor.name} — vendor at The Makers Mill in Somerset, Kentucky`}
          />
        </div>
        <div className="page-hero-glow" />

        {/* Back button goes to the vendor directory, not the homepage */}
        <Link href="/vendors" className="back-home" aria-label="Back to vendor directory">
          Back to Vendors
        </Link>

        <div className="page-hero-inner">
          {/* TODO: update stamp with real vendor category once confirmed */}
          <div className="page-hero-stamp rev">✦ {vendor.category} · The Makers Mill ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            {/* TODO: update hero headline for real vendor name — edit vendors.ts */}
            {heroLine1}
            {heroLine2 && (
              <>
                <br />
                <em>{heroLine2}.</em>
              </>
            )}
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Inside The Makers Mill · Somerset, KY
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            {/* TODO: update with real vendor tagline in vendors.ts */}
            {vendor.tagline}
          </p>
          <div className="page-hero-ctas rev" style={{ transitionDelay: '.36s' }}>
            {/* TODO: update CTA href — could be a shop link, booking page, or social */}
            <a href={`mailto:${vendor.email}`} className="btn btn-fill">
              Get in Touch
            </a>
            <Link href="/#visit" className="btn btn-outline">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section className="pintro">
        <div className="pintro-inner">
          <div className="rev-l">
            {/* TODO: update label with real vendor category */}
            <div className="label">About {vendor.name}</div>
            <h2 className="pintro-h">
              {/* TODO: replace with real vendor about-section headline */}
              Made by Hand.
              <br />
              <em>Found Here.</em>
            </h2>

            {/* TODO: replace these paragraphs with the real vendor bio in vendors.ts */}
            {vendor.about.map((para, i) => (
              <p key={i} className="pintro-p">{para}</p>
            ))}

            {/* Social / website links */}
            {(vendor.social.instagram || vendor.social.facebook || vendor.social.website) && (
              <div className="vsocial">
                {/* TODO: replace '#' hrefs with real social media and website URLs in vendors.ts */}
                {vendor.social.instagram && (
                  <a
                    href={vendor.social.instagram}
                    className="vsocial-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram <span className="vsocial-arrow">↗</span>
                  </a>
                )}
                {vendor.social.facebook && (
                  <a
                    href={vendor.social.facebook}
                    className="vsocial-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook <span className="vsocial-arrow">↗</span>
                  </a>
                )}
                {vendor.social.website && (
                  <a
                    href={vendor.social.website}
                    className="vsocial-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website <span className="vsocial-arrow">↗</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Photo grid — first three gallery images */}
          <div className="pintro-photos rev-r">
            {/* TODO: swap for real vendor product or studio photos in vendors.ts */}
            <div className="pintro-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={vendor.galleryImages[1]} alt={`${vendor.name} — featured work`} />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={vendor.galleryImages[2]} alt={`${vendor.name} products`} />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={vendor.galleryImages[3]} alt={`${vendor.name} at The Makers Mill`} />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT THEY OFFER ───────────────────────────────────────────────── */}
      <section className="feat">
        <div className="feat-inner">
          <div className="feat-head rev">
            <div className="label" style={{ justifyContent: 'center' }}>
              {/* TODO: update label with real category */}
              What They Offer
            </div>
            <h2 className="feat-h">
              {/* TODO: replace with real vendor offerings headline */}
              Made With Care.
              <br />
              <em>Worth the Stop.</em>
            </h2>
            <p className="feat-sub">
              {/* TODO: update with a real description of what the vendor sells/makes */}
              A sample of what you&apos;ll find when you stop by their space inside the Mill.
            </p>
          </div>
          <div className="feat-grid">
            {/* TODO: update feature cards in vendors.ts with real product/service descriptions */}
            {vendor.features.map((f, i) => (
              <div
                key={f.title}
                className="feat-card rev"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="feat-n">{String(i + 1).padStart(2, '0')}</div>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────────────── */}
      <section className="vgallery-sec">
        <div className="vgallery-inner">
          <div className="vgallery-head rev">
            <div className="label" style={{ justifyContent: 'center' }}>
              {/* TODO: update label */}
              Featured Work
            </div>
            <h2 className="feat-h" style={{ textAlign: 'center', marginBottom: 36 }}>
              {/* TODO: replace with vendor-specific gallery headline */}
              Take a Look.
              <br />
              <em>Browse the Shop.</em>
            </h2>
          </div>

          {/* Gallery grid — 1 wide banner + 3 smaller tiles */}
          {/* TODO: replace vendor.galleryImages in vendors.ts with real product photos */}
          <div className="vgallery">
            {vendor.galleryImages.map((src, i) => (
              <div
                key={i}
                className={`vgallery-item rev${i === 0 ? ' vgallery-item--wide' : ''}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${vendor.name} — product photo ${i + 1}`}
                />
              </div>
            ))}
          </div>
          <p className="events-note-foot rev" style={{ marginTop: 18 }}>
            Placeholder photos shown — real product images coming soon.
          </p>
        </div>
      </section>

      {/* ── VISIT AT THE MILL ─────────────────────────────────────────────── */}
      <section className="inquiry">
        <div className="inquiry-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            Visit at The Makers Mill
          </div>
          <h2 className="inquiry-h rev" style={{ transitionDelay: '.08s' }}>
            Come Find
            <br />
            {/* TODO: update with real vendor name */}
            <em>{vendor.name}.</em>
          </h2>
          <p className="inquiry-p rev" style={{ transitionDelay: '.16s' }}>
            {/* TODO: update visitNote in vendors.ts with real location info inside the Mill */}
            {vendor.visitNote}
          </p>
          <div
            className="inquiry-tags rev"
            style={{ transitionDelay: '.24s', marginBottom: 28 }}
          >
            {/* TODO: confirm actual hours with the vendor and update vendors.ts */}
            <span>{vendor.hours}</span>
          </div>
          <div className="inquiry-ctas rev" style={{ transitionDelay: '.32s' }}>
            <Link href="/#visit" className="btn btn-fill">
              Plan Your Visit
            </Link>
            {/* TODO: update mailto with real vendor email, or swap for a contact page link */}
            <a href={`mailto:${vendor.email}`} className="btn btn-outline">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ── MORE TO DISCOVER ──────────────────────────────────────────────── */}
      <section className="also">
        <div className="also-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            Explore More
          </div>
          <h2 className="also-h rev" style={{ transitionDelay: '.08s' }}>
            More to
            <br />
            <em>Discover.</em>
          </h2>
          <p className="also-sub rev" style={{ transitionDelay: '.16s' }}>
            Browse every vendor in the directory, or explore other parts of The Makers Mill.
          </p>
          <div className="also-grid">
            <Link href="/vendors" className="also-card rev" style={{ transitionDelay: '.2s' }}>
              <div className="also-label">Shop Local</div>
              <div className="also-name">All Vendors</div>
              <p className="also-desc">
                Browse every maker, artist, and shop inside The Makers Mill — handmade goods,
                vintage, art, and more.
              </p>
              <span className="also-arrow">View Vendor Directory →</span>
            </Link>
            <Link href="/stage" className="also-card rev" style={{ transitionDelay: '.28s' }}>
              <div className="also-label">Live Music</div>
              <div className="also-name">The Stage</div>
              <p className="also-desc">
                Live music, ticketed shows, and the loudest nights in downtown Somerset.
              </p>
              <span className="also-arrow">Explore The Stage →</span>
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
