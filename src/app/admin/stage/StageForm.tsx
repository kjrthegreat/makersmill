'use client';

import Link from 'next/link';
import type { StageRow } from '@/lib/db';

export function StageForm({
  action,
  initial,
  submitLabel,
}: {
  action: (form: FormData) => void | Promise<void>;
  initial?: StageRow | null;
  submitLabel: string;
}) {
  return (
    <form action={action} className="admin-form">
      <div className="admin-field-row">
        <div className="admin-field admin-field--narrow">
          <label htmlFor="month">Month / label *</label>
          <input id="month" name="month" defaultValue={initial?.month ?? ''} required placeholder="Jun / Every" />
        </div>
        <div className="admin-field admin-field--narrow">
          <label htmlFor="day">Day *</label>
          <input id="day" name="day" defaultValue={initial?.day ?? ''} required placeholder="14 / Sat" />
        </div>
        <div className="admin-field">
          <label htmlFor="accent">Date badge color</label>
          <select id="accent" name="accent" defaultValue={initial?.accent ?? 'orange'}>
            <option value="orange">Orange</option>
            <option value="rust">Rust</option>
            <option value="gold">Gold</option>
            <option value="warm">Warm (outlined)</option>
          </select>
        </div>
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="name">Show name *</label>
          <input id="name" name="name" defaultValue={initial?.name ?? ''} required />
        </div>
        <div className="admin-field">
          <label htmlFor="type">Type *</label>
          <input id="type" name="type" defaultValue={initial?.type ?? ''} required placeholder="Touring Act" />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="detail">Detail *</label>
        <textarea id="detail" name="detail" rows={2} defaultValue={initial?.detail ?? ''} required />
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="time">Time *</label>
          <input id="time" name="time" defaultValue={initial?.time ?? ''} required placeholder="8:00 PM" />
        </div>
        <div className="admin-field">
          <label htmlFor="tag">Tag *</label>
          <input id="tag" name="tag" defaultValue={initial?.tag ?? ''} required placeholder="Ticketed" />
        </div>
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="cta_label">Button label</label>
          <input id="cta_label" name="cta_label" defaultValue={initial?.cta_label ?? 'Tickets'} />
        </div>
        <div className="admin-field">
          <label htmlFor="cta_url">Button link</label>
          <input id="cta_url" name="cta_url" defaultValue={initial?.cta_url ?? ''} placeholder="TICKETS or a URL" />
          <p className="admin-help">
            Type <code>TICKETS</code> to use the site&apos;s ticket link. Leave blank for a plain
            <code>#</code> link.
          </p>
        </div>
      </div>

      <div className="admin-field admin-field--narrow">
        <label htmlFor="sort_order">Sort order</label>
        <input id="sort_order" name="sort_order" type="number" defaultValue={initial?.sort_order ?? 0} />
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn">{submitLabel}</button>
        <Link href="/admin/stage" className="admin-btn-ghost">Cancel</Link>
      </div>
    </form>
  );
}
