import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatTime(t: string | null) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: vendor } = await supabase
    .from('vendors')
    .select('name, tagline, description, meta_description')
    .eq('slug', slug)
    .eq('status', 'active')
    .single();
  if (!vendor) return {};
  return {
    title: `${vendor.name} — Vendor at The Makers Mill, Somerset, KY`,
    description:
      vendor.meta_description ??
      vendor.tagline ??
      vendor.description ??
      `Find ${vendor.name} on the vendor floor inside The Makers Mill.`,
  };
}

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: vendor } = await supabase
    .from('vendors')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single();

  if (!vendor) notFound();

  const { data: products } = await supabase
    .from('products')
    .select('*, product_images(url, sort_order)')
    .eq('vendor_id', vendor.id)
    .eq('status', 'published')
    .order('sort_order')
    .order('created_at', { ascending: false });

  const { data: hours } = await supabase
    .from('vendor_hours')
    .select('*')
    .eq('vendor_id', vendor.id)
    .order('day_of_week');

  // Hero headline: custom override or split name
  let heroLine1: string;
  let heroLine2: string;
  if (vendor.hero_headline) {
    heroLine1 = vendor.hero_headline.toUpperCase();
    heroLine2 = vendor.hero_subline ? vendor.hero_subline.toUpperCase() : '';
  } else {
    const nameParts = vendor.name.split(' ');
    heroLine1 = nameParts[0].toUpperCase();
    heroLine2 = nameParts.slice(1).join(' ').toUpperCase();
  }

  const accent = vendor.accent_color || 'var(--orange)';
  const todayIdx = new Date().getDay();
  const galleryUrls: string[] = vendor.gallery_urls?.filter((u: string) => u) ?? [];
  const categories: string[] = vendor.categories ?? [];

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={vendor.banner_url || 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_004-1024x682.jpg'}
            alt={`${vendor.name} — vendor at The Makers Mill`}
          />
        </div>
        <div className="page-hero-glow" />
        <Link href="/vendors" className="back-home" aria-label="Back to vendor directory">
          Back to Vendors
        </Link>
        <div className="page-hero-inner">
          <div className="page-hero-stamp rev">✦ Local Maker · The Makers Mill ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s', color: accent !== 'var(--orange)' ? undefined : undefined }}>
            {heroLine1}
            {heroLine2 && (<><br /><em style={{ color: accent }}>{heroLine2}.</em></>)}
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Inside The Makers Mill · Somerset, KY
            {vendor.location_in_mill && ` · ${vendor.location_in_mill}`}
          </div>
          {vendor.tagline && (
            <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>{vendor.tagline}</p>
          )}
          {categories.length > 0 && (
            <div className="page-hero-tags rev" style={{ transitionDelay: '.32s' }}>
              {categories.map((cat: string) => (
                <span key={cat} className="vendor-tag">{cat}</span>
              ))}
            </div>
          )}
          <div className="page-hero-ctas rev" style={{ transitionDelay: '.36s' }}>
            {vendor.cta_text && vendor.cta_url && (
              <a href={vendor.cta_url} className="btn btn-fill" target="_blank" rel="noopener noreferrer"
                style={{ background: accent, borderColor: accent }}>
                {vendor.cta_text}
              </a>
            )}
            {vendor.contact_email && !vendor.cta_text && (
              <a href={`mailto:${vendor.contact_email}`} className="btn btn-fill">Get in Touch</a>
            )}
            <Link href="/#visit" className="btn btn-outline">Plan Your Visit</Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      {products && products.length > 0 && (
        <section className="feat">
          <div className="feat-inner">
            <div className="feat-head rev">
              <div className="label" style={{ justifyContent: 'center' }}>Shop</div>
              <h2 className="feat-h">
                What&apos;s Available.
                <br />
                <em style={{ color: accent }}>In the Shop.</em>
              </h2>
            </div>
            <div className="feat-grid">
              {products.map((product: { id: string; name: string; description: string | null; price: number; category: string | null; product_images?: { url: string; sort_order: number }[] }, i: number) => {
                const thumb = product.product_images
                  ?.sort((a, b) => a.sort_order - b.sort_order)[0]?.url;
                return (
                  <div key={product.id} className="feat-card rev" style={{ transitionDelay: `${i * 0.07}s` }}>
                    {thumb && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt={product.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 2, marginBottom: 14, border: '1px solid var(--border)' }} />
                    )}
                    {product.category && (
                      <div className="feat-n" style={{ position: 'static', fontSize: 9, marginBottom: 6 }}>{product.category}</div>
                    )}
                    <div className="feat-title">{product.name}</div>
                    {product.description && <div className="feat-desc">{product.description}</div>}
                    <div style={{ marginTop: 12, fontFamily: 'var(--cond)', fontSize: 16, fontWeight: 800, color: accent }}>
                      {formatPrice(product.price)}
                    </div>
                    {vendor.contact_email && (
                      <a href={`mailto:${vendor.contact_email}?subject=Inquiry: ${product.name}`}
                        style={{ display: 'inline-block', marginTop: 10, fontFamily: 'var(--cond)', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--cream)', borderBottom: '1px solid var(--ob)', paddingBottom: 2 }}>
                        Inquire →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT ── */}
      <section className="pintro">
        <div className="pintro-inner">
          <div className="rev-l">
            <div className="label">About {vendor.name}</div>
            <h2 className="pintro-h">
              {vendor.about_headline ? (
                <>
                  {vendor.about_headline.split('\n')[0]}
                  {vendor.about_headline.split('\n')[1] && (
                    <><br /><em style={{ color: accent }}>{vendor.about_headline.split('\n')[1]}</em></>
                  )}
                </>
              ) : (
                <>Made by Hand.<br /><em style={{ color: accent }}>Found Here.</em></>
              )}
            </h2>
            {vendor.description && vendor.description.split('\n\n').map((para: string, i: number) => (
              <p key={i} className="pintro-p">{para}</p>
            ))}

            {/* Social links */}
            {(vendor.instagram || vendor.website || vendor.facebook) && (
              <div className="vsocial">
                {vendor.instagram && (
                  <a href={vendor.instagram.startsWith('http') ? vendor.instagram : `https://instagram.com/${vendor.instagram.replace('@', '')}`}
                    className="vsocial-link" target="_blank" rel="noopener noreferrer">
                    Instagram <span className="vsocial-arrow">↗</span>
                  </a>
                )}
                {vendor.facebook && (
                  <a href={vendor.facebook} className="vsocial-link" target="_blank" rel="noopener noreferrer">
                    Facebook <span className="vsocial-arrow">↗</span>
                  </a>
                )}
                {vendor.website && (
                  <a href={vendor.website} className="vsocial-link" target="_blank" rel="noopener noreferrer">
                    Website <span className="vsocial-arrow">↗</span>
                  </a>
                )}
              </div>
            )}

            {/* Hours */}
            {hours && hours.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <div className="hours-title">Hours</div>
                {hours.map((h: { day_of_week: number; closed: boolean; open_time: string | null; close_time: string | null }) => (
                  <div key={h.day_of_week} className="hours-row" style={{ fontWeight: h.day_of_week === todayIdx ? 600 : undefined }}>
                    <span className="hours-day" style={{ color: h.day_of_week === todayIdx ? accent : undefined }}>
                      {DAYS[h.day_of_week]}
                    </span>
                    <span className="hours-time">
                      {h.closed ? 'Closed' : `${formatTime(h.open_time)} – ${formatTime(h.close_time)}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Photo */}
          <div className="pintro-photos rev-r">
            <div className="pintro-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vendor.banner_url || 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_004-1024x682.jpg'}
                alt={vendor.name}
              />
            </div>
            {vendor.logo_url && (
              <div className="pintro-photo-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={vendor.logo_url} alt={`${vendor.name} logo`} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      {galleryUrls.length > 0 && (
        <section className="vgallery">
          <div className="vgallery-inner">
            <div className="feat-head rev">
              <div className="label" style={{ justifyContent: 'center' }}>Gallery</div>
              <h2 className="feat-h">The Work.<br /><em style={{ color: accent }}>Up Close.</em></h2>
            </div>
            <div className="vgallery-grid">
              {galleryUrls.map((url: string, i: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={url}
                  alt={`${vendor.name} gallery photo ${i + 1}`}
                  className="vgallery-img rev"
                  style={{ transitionDelay: `${i * 0.07}s` }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER NAV ── */}
      <section className="vfoot">
        <div className="vfoot-inner">
          <Link href="/vendors" className="vfoot-back">← Back to All Vendors</Link>
          <Link href="/" className="vfoot-home">Makers Mill Home</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
