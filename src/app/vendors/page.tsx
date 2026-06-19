import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Vendors — Coming Soon · The Makers Mill, Somerset, KY',
  description:
    "The Makers Mill vendor directory is being rebuilt. Soon you'll be able to browse every local maker, shop, and artist under one roof in downtown Somerset, KY.",
  robots: { index: false }
};

export default function VendorsPage() {
  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="page-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_004-1024x682.jpg"
            alt="Vendors at The Makers Mill — Somerset, Kentucky"
          />
        </div>
        <div className="page-hero-glow" />
        <Link href="/" className="back-home" aria-label="Back to Makers Mill home">
          Back to Makers Mill
        </Link>
        <div className="page-hero-inner">
          <div className="page-hero-stamp rev">✦ Under Construction ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            LOCAL
            <br />
            <em>MAKERS.</em>
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Coming Soon
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            We&apos;re rebuilding the vendor directory. Soon you&apos;ll be able to browse every
            local maker, shop, and artist inside The Makers Mill — all in one place.
          </p>
          <div className="page-hero-ctas rev" style={{ transitionDelay: '.36s' }}>
            <Link href="/" className="btn btn-fill">Back to Makers Mill</Link>
            <a href="mailto:makersmillsomerset@gmail.com" className="btn btn-outline">
              Interested in Selling Here?
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
