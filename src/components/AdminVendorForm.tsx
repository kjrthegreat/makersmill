'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ImageUpload } from '@/components/ImageUpload';
import type { Vendor, VendorHour } from '@/types/vendor';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const VENDOR_CATEGORIES = [
  'Art & Prints',
  'Ceramics & Pottery',
  'Clothing & Apparel',
  'Food & Pantry',
  'Handmade Goods',
  'Home & Decor',
  'Jewelry & Accessories',
  'Plants & Botanicals',
  'Skincare & Bath',
  'Toys & Kids',
  'Vintage & Collectibles',
  'Other',
];

interface Props {
  vendor: Vendor;
  hours: VendorHour[];
}

export function AdminVendorForm({ vendor, hours: initialHours }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: vendor.name,
    slug: vendor.slug,
    tagline: vendor.tagline ?? '',
    description: vendor.description ?? '',
    contact_email: vendor.contact_email ?? '',
    phone: vendor.phone ?? '',
    website: vendor.website ?? '',
    instagram: vendor.instagram ?? '',
    facebook: vendor.facebook ?? '',
    logo_url: vendor.logo_url ?? '',
    banner_url: vendor.banner_url ?? '',
    location_in_mill: vendor.location_in_mill ?? '',
    hero_headline: vendor.hero_headline ?? '',
    hero_subline: vendor.hero_subline ?? '',
    about_headline: vendor.about_headline ?? '',
    accent_color: vendor.accent_color ?? '#c4571a',
    cta_text: vendor.cta_text ?? '',
    cta_url: vendor.cta_url ?? '',
    meta_description: vendor.meta_description ?? '',
    status: vendor.status,
    featured: vendor.featured,
    sort_order: vendor.sort_order,
  });

  const [gallery, setGallery] = useState<string[]>(() => {
    const g = vendor.gallery_urls ?? [];
    return [...g, ...Array(6).fill('')].slice(0, 6);
  });

  const [categories, setCategories] = useState<string[]>(vendor.categories ?? []);

  const [hours, setHours] = useState<{ day: number; open: string; close: string; closed: boolean }[]>(
    DAYS.map((_, i) => {
      const h = initialHours.find(x => x.day_of_week === i);
      return {
        day: i,
        open: h?.open_time ?? '10:00',
        close: h?.close_time ?? '18:00',
        closed: h?.closed ?? (i === 0),
      };
    })
  );

  function setField<K extends keyof typeof form>(field: K, value: typeof form[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function setHour(day: number, key: 'open' | 'close' | 'closed', value: string | boolean) {
    setHours(prev => prev.map(h => h.day === day ? { ...h, [key]: value } : h));
  }

  function toggleCategory(cat: string) {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }

  function setGalleryUrl(i: number, val: string) {
    setGallery(prev => { const n = [...prev]; n[i] = val; return n; });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    const supabase = createClient();

    const galleryClean = gallery.filter(u => u.trim() !== '');

    const { error: vErr } = await supabase
      .from('vendors')
      .update({
        ...form,
        gallery_urls: galleryClean,
        categories,
      })
      .eq('id', vendor.id);

    if (vErr) { setError(vErr.message); setSaving(false); return; }

    for (const h of hours) {
      await supabase.from('vendor_hours').upsert({
        vendor_id: vendor.id,
        day_of_week: h.day,
        open_time: h.open,
        close_time: h.close,
        closed: h.closed,
      }, { onConflict: 'vendor_id,day_of_week' });
    }

    setSaved(true);
    setSaving(false);
    router.refresh();
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form className="apply-form dash-form" onSubmit={handleSave}>
      {error && <div className="form-error">{error}</div>}
      {saved && <div className="form-success-inline">Vendor saved successfully.</div>}

      {/* ── ADMIN CONTROLS ── */}
      <div className="dash-form-section" style={{ borderColor: 'var(--rust)', background: 'rgba(196,87,26,.04)' }}>
        <h2 className="dash-form-section-h" style={{ color: 'var(--rust)' }}>Admin Controls</h2>
        <div className="form-row">
          <label>
            Status
            <select value={form.status} onChange={e => setField('status', e.target.value as 'pending' | 'active' | 'suspended')}>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </label>
          <label>
            URL Slug
            <input
              type="text"
              value={form.slug}
              onChange={e => setField('slug', e.target.value)}
              placeholder="vendor-slug"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Sort Order <em style={{ fontStyle: 'normal', color: 'var(--gray)', fontSize: 11 }}>lower = higher in directory</em>
            <input
              type="number"
              value={form.sort_order}
              onChange={e => setField('sort_order', Number(e.target.value))}
              min={0}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24 }}>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={e => setField('featured', e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            <span>Featured vendor (shown first in directory)</span>
          </label>
        </div>
      </div>

      {/* ── STORE INFO ── */}
      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Store Info</h2>
        <div className="form-row">
          <label>
            Store Name <em>required</em>
            <input
              type="text"
              value={form.name}
              onChange={e => setField('name', e.target.value)}
              placeholder="Your shop name"
              required
            />
          </label>
          <label>
            Tagline
            <input
              type="text"
              value={form.tagline}
              onChange={e => setField('tagline', e.target.value)}
              placeholder="One-line description shown on vendor cards"
              maxLength={80}
            />
          </label>
        </div>
        <label>
          Description
          <textarea
            value={form.description}
            onChange={e => setField('description', e.target.value)}
            placeholder="Tell customers about this vendor…"
            rows={5}
          />
        </label>
        <label>
          Location Inside the Mill
          <input
            type="text"
            value={form.location_in_mill}
            onChange={e => setField('location_in_mill', e.target.value)}
            placeholder="e.g. Booth 12, Back left corner, Near the stage…"
          />
        </label>
      </div>

      {/* ── CATEGORIES ── */}
      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Categories</h2>
        <div className="dash-cat-grid">
          {VENDOR_CATEGORIES.map(cat => (
            <label key={cat} className="dash-cat-item">
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* ── CONTACT & LINKS ── */}
      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Contact &amp; Links</h2>
        <div className="form-row">
          <label>
            Contact Email
            <input
              type="email"
              value={form.contact_email}
              onChange={e => setField('contact_email', e.target.value)}
              placeholder="shop@example.com"
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              value={form.phone}
              onChange={e => setField('phone', e.target.value)}
              placeholder="(606) 555-0100"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Website
            <input
              type="url"
              value={form.website}
              onChange={e => setField('website', e.target.value)}
              placeholder="https://yoursite.com"
            />
          </label>
          <label>
            Instagram
            <input
              type="text"
              value={form.instagram}
              onChange={e => setField('instagram', e.target.value)}
              placeholder="@yourhandle"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Facebook
            <input
              type="url"
              value={form.facebook}
              onChange={e => setField('facebook', e.target.value)}
              placeholder="https://facebook.com/yourpage"
            />
          </label>
          <div />
        </div>
      </div>

      {/* ── IMAGES ── */}
      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Images</h2>
        <div className="form-row">
          <ImageUpload
            bucket="vendor-assets"
            userId={vendor.user_id}
            value={form.logo_url}
            onChange={v => setField('logo_url', v)}
            label="Logo"
            previewHeight={80}
          />
          <ImageUpload
            bucket="vendor-assets"
            userId={vendor.user_id}
            value={form.banner_url}
            onChange={v => setField('banner_url', v)}
            label="Banner / Hero Image"
            previewHeight={80}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <div className="dash-form-section-h" style={{ fontSize: 12, marginBottom: 12 }}>Gallery Photos <span style={{ fontFamily: 'var(--stamp)', fontSize: 9, letterSpacing: '.1em', color: 'var(--gray)', textTransform: 'uppercase' }}>up to 6</span></div>
          <div className="dash-gallery-grid">
            {gallery.map((url, i) => (
              <ImageUpload
                key={i}
                bucket="vendor-assets"
                userId={vendor.user_id}
                value={url}
                onChange={v => setGalleryUrl(i, v)}
                label={`Photo ${i + 1}`}
                previewHeight={60}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── PAGE CUSTOMIZATION ── */}
      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Page Customization</h2>
        <div className="form-row">
          <label>
            Hero Headline
            <input
              type="text"
              value={form.hero_headline}
              onChange={e => setField('hero_headline', e.target.value)}
              placeholder="e.g. HAND · CRAFTED"
            />
          </label>
          <label>
            Hero Sub-headline
            <input
              type="text"
              value={form.hero_subline}
              onChange={e => setField('hero_subline', e.target.value)}
              placeholder="e.g. with love."
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            About Section Headline
            <input
              type="text"
              value={form.about_headline}
              onChange={e => setField('about_headline', e.target.value)}
              placeholder='e.g. "Made by Hand." (default)'
            />
          </label>
          <label style={{ maxWidth: 180 }}>
            Accent Color
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <input
                type="color"
                value={form.accent_color}
                onChange={e => setField('accent_color', e.target.value)}
                style={{ width: 44, height: 36, padding: 2, border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer', background: 'none' }}
              />
              <input
                type="text"
                value={form.accent_color}
                onChange={e => setField('accent_color', e.target.value)}
                placeholder="#c4571a"
                style={{ flex: 1 }}
              />
            </div>
          </label>
        </div>
        <div className="form-row">
          <label>
            Custom CTA Button Text
            <input
              type="text"
              value={form.cta_text}
              onChange={e => setField('cta_text', e.target.value)}
              placeholder='e.g. "Shop Online" or "Book a Session"'
              maxLength={40}
            />
          </label>
          <label>
            Custom CTA URL
            <input
              type="url"
              value={form.cta_url}
              onChange={e => setField('cta_url', e.target.value)}
              placeholder="https://…"
            />
          </label>
        </div>
      </div>

      {/* ── SEO ── */}
      <div className="dash-form-section">
        <h2 className="dash-form-section-h">SEO</h2>
        <label>
          Meta Description
          <textarea
            value={form.meta_description}
            onChange={e => setField('meta_description', e.target.value)}
            placeholder="Describe this vendor for search engines."
            rows={3}
            maxLength={160}
          />
        </label>
      </div>

      {/* ── HOURS ── */}
      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Hours</h2>
        <div className="dash-hours-grid">
          {hours.map(h => (
            <div key={h.day} className="dash-hours-row">
              <span className="dash-hours-day">{DAYS[h.day]}</span>
              <label className="dash-hours-closed">
                <input
                  type="checkbox"
                  checked={h.closed}
                  onChange={e => setHour(h.day, 'closed', e.target.checked)}
                />
                Closed
              </label>
              <input
                type="time"
                className="dash-hours-time"
                value={h.open}
                onChange={e => setHour(h.day, 'open', e.target.value)}
                disabled={h.closed}
              />
              <span className="dash-hours-sep">—</span>
              <input
                type="time"
                className="dash-hours-time"
                value={h.close}
                onChange={e => setHour(h.day, 'close', e.target.value)}
                disabled={h.closed}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="dash-form-actions">
        <button type="submit" className="btn btn-fill" disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
