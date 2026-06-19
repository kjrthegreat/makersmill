'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { EventRow } from '@/lib/db';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function EventForm({
  action,
  initial,
  submitLabel,
}: {
  action: (form: FormData) => void | Promise<void>;
  initial?: EventRow | null;
  submitLabel: string;
}) {
  const [kind, setKind] = useState<'date' | 'weekly'>(
    initial && initial.weekday != null ? 'weekly' : 'date'
  );

  return (
    <form action={action} className="admin-form">
      <div className="admin-field">
        <label htmlFor="title">Title *</label>
        <input id="title" name="title" defaultValue={initial?.title ?? ''} required />
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="type">Type *</label>
          <input id="type" name="type" list="event-types" defaultValue={initial?.type ?? ''} required placeholder="Live Music" />
          <datalist id="event-types">
            <option value="Live Music" />
            <option value="Game Night" />
            <option value="Market" />
            <option value="Pop-Up" />
          </datalist>
        </div>
        <div className="admin-field">
          <label htmlFor="time">Time</label>
          <input id="time" name="time" defaultValue={initial?.time ?? ''} placeholder="8:00 PM" />
        </div>
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="tag">Tag</label>
          <input id="tag" name="tag" defaultValue={initial?.tag ?? ''} placeholder="Free / Ticketed / Weekly" />
        </div>
        <div className="admin-field">
          <label htmlFor="accent">Accent (calendar color)</label>
          <select id="accent" name="accent" defaultValue={initial?.accent ?? 'orange'}>
            <option value="orange">Orange — Live Music</option>
            <option value="gold">Gold — Games &amp; Markets</option>
            <option value="rust">Rust — Pop-Ups</option>
          </select>
        </div>
      </div>

      <fieldset className="admin-fieldset">
        <legend>When</legend>
        <div className="admin-radio-row">
          <label className="admin-radio">
            <input
              type="radio"
              name="schedule_kind"
              value="date"
              checked={kind === 'date'}
              onChange={() => setKind('date')}
            />
            One-off date
          </label>
          <label className="admin-radio">
            <input
              type="radio"
              name="schedule_kind"
              value="weekly"
              checked={kind === 'weekly'}
              onChange={() => setKind('weekly')}
            />
            Weekly (recurring)
          </label>
        </div>
        {kind === 'date' ? (
          <div className="admin-field">
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" defaultValue={initial?.date ?? ''} />
          </div>
        ) : (
          <div className="admin-field">
            <label htmlFor="weekday">Weekday</label>
            <select id="weekday" name="weekday" defaultValue={initial?.weekday != null ? String(initial.weekday) : '6'}>
              {WEEKDAYS.map((d, i) => (
                <option key={i} value={i}>{d}</option>
              ))}
            </select>
          </div>
        )}
      </fieldset>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="cta_label">Button label</label>
          <input id="cta_label" name="cta_label" defaultValue={initial?.cta_label ?? ''} placeholder="Get Tickets" />
        </div>
        <div className="admin-field">
          <label htmlFor="cta_url">Button link</label>
          <input id="cta_url" name="cta_url" defaultValue={initial?.cta_url ?? ''} placeholder="TICKETS or a URL" />
          <p className="admin-help">
            Type <code>TICKETS</code> to use the site&apos;s ticket link. Leave both blank for a
            free event (shows &ldquo;Details&rdquo;).
          </p>
        </div>
      </div>

      <div className="admin-field admin-field--narrow">
        <label htmlFor="sort_order">Sort order</label>
        <input id="sort_order" name="sort_order" type="number" defaultValue={initial?.sort_order ?? 0} />
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn">{submitLabel}</button>
        <Link href="/admin/events" className="admin-btn-ghost">Cancel</Link>
      </div>
    </form>
  );
}
