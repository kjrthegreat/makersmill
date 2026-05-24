'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { Event } from '@/types/vendor';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ACCENT_COLORS = [
  { value: 'orange', label: 'Orange', swatch: 'var(--orange)' },
  { value: 'rust',   label: 'Rust',   swatch: 'var(--rust)' },
  { value: 'gold',   label: 'Gold',   swatch: 'var(--gold)' },
  { value: 'warm',   label: 'Warm',   swatch: 'var(--warm)' },
  { value: 'wood',   label: 'Wood',   swatch: 'var(--wood)' },
  { value: 'dark',   label: 'Dark',   swatch: 'var(--ink)' },
] as const;

interface Props {
  event?: Event | null;
}

export function EventForm({ event }: Props) {
  const router = useRouter();
  const isEdit = Boolean(event?.id);

  const [name, setName]               = useState(event?.name ?? '');
  const [type, setType]               = useState(event?.type ?? '');
  const [detail, setDetail]           = useState(event?.detail ?? '');
  const [recurring, setRecurring]     = useState(event?.recurring ?? false);
  const [recurringDay, setRecurringDay] = useState(event?.recurring_day ?? 'Thu');
  const [eventDate, setEventDate]     = useState(event?.event_date ?? '');
  const [timeLabel, setTimeLabel]     = useState(event?.time_label ?? '');
  const [tag, setTag]                 = useState(event?.tag ?? '');
  const [ctaLabel, setCtaLabel]       = useState(event?.cta_label ?? 'Event Details');
  const [ctaUrl, setCtaUrl]           = useState(event?.cta_url ?? '#');
  const [accentColor, setAccentColor] = useState(event?.accent_color ?? 'orange');
  const [status, setStatus]           = useState(event?.status ?? 'published');
  const [sortOrder, setSortOrder]     = useState(event?.sort_order ?? 0);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError('Event name is required.'); return; }
    setSaving(true);
    setError('');

    const supabase = createClient();
    const payload = {
      name: name.trim(),
      type: type.trim() || null,
      detail: detail.trim() || null,
      recurring,
      recurring_day: recurring ? recurringDay : null,
      event_date: !recurring && eventDate ? eventDate : null,
      time_label: timeLabel.trim() || null,
      tag: tag.trim() || null,
      cta_label: ctaLabel.trim() || 'Event Details',
      cta_url: ctaUrl.trim() || '#',
      accent_color: accentColor,
      status,
      sort_order: sortOrder,
    };

    const { error: dbError } = isEdit
      ? await supabase.from('events').update(payload).eq('id', event!.id)
      : await supabase.from('events').insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    router.push('/admin/events');
    router.refresh();
  }

  return (
    <form className="apply-form dash-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Event Info</h2>

        <label>
          Event Name <em style={{ color: 'var(--rust)' }}>required</em>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Saturday Live Set"
          />
        </label>

        <label>
          Type / Category
          <em>e.g. Live Music, Weekly · Free, Open Stage</em>
          <input
            list="event-type-list"
            value={type}
            onChange={e => setType(e.target.value)}
            placeholder="e.g. Live Music"
          />
          <datalist id="event-type-list">
            <option value="Live Music" />
            <option value="Weekly · Free" />
            <option value="Open Stage" />
            <option value="Makers Market" />
            <option value="Comedy Night" />
            <option value="Trivia Night" />
            <option value="Special Event" />
          </datalist>
        </label>

        <label>
          Description
          <textarea
            rows={3}
            value={detail}
            onChange={e => setDetail(e.target.value)}
            placeholder="Short description shown on the event card"
          />
        </label>
      </div>

      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Date &amp; Time</h2>

        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <input
            type="checkbox"
            checked={recurring}
            onChange={e => setRecurring(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: 'var(--orange)', flexShrink: 0 }}
          />
          Recurring — repeats weekly on the same day
        </label>

        {recurring ? (
          <label>
            Day of Week
            <select value={recurringDay} onChange={e => setRecurringDay(e.target.value)}>
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
        ) : (
          <label>
            Event Date
            <input
              type="date"
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
            />
          </label>
        )}

        <label>
          Time
          <input
            value={timeLabel}
            onChange={e => setTimeLabel(e.target.value)}
            placeholder="e.g. 7:00 PM – 9:00 PM"
          />
        </label>
      </div>

      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Card Details</h2>

        <div className="form-row">
          <label>
            Tag / Badge
            <input
              value={tag}
              onChange={e => setTag(e.target.value)}
              placeholder="e.g. Free Entry, All Ages"
            />
          </label>
          <label>
            Button Label
            <input
              value={ctaLabel}
              onChange={e => setCtaLabel(e.target.value)}
              placeholder="e.g. Get Tickets"
            />
          </label>
        </div>

        <label>
          Button URL
          <em>Link for the card&apos;s action button — use # if no link yet</em>
          <input
            value={ctaUrl}
            onChange={e => setCtaUrl(e.target.value)}
            placeholder="https://... or #"
          />
        </label>
      </div>

      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Appearance</h2>
        <div style={{ fontFamily: 'var(--cond)', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--cream-dk)', marginBottom: 10 }}>
          Date Badge Color
        </div>
        <div className="event-color-grid">
          {ACCENT_COLORS.map(c => (
            <label key={c.value} className="event-color-option">
              <input
                type="radio"
                name="accent_color"
                value={c.value}
                checked={accentColor === c.value}
                onChange={() => setAccentColor(c.value)}
              />
              <span
                className="event-color-swatch"
                style={{
                  background: c.swatch,
                  outlineColor: accentColor === c.value ? 'var(--orange)' : 'transparent',
                  outlineStyle: 'solid',
                  outlineWidth: 2,
                  outlineOffset: 2,
                }}
              />
              <span className="event-color-label">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Publishing</h2>

        <div className="form-row">
          <label>
            Status
            <select
              value={status}
              onChange={e => setStatus(e.target.value as 'published' | 'draft')}
            >
              <option value="published">Published — visible on homepage</option>
              <option value="draft">Draft — hidden from site</option>
            </select>
          </label>
          <label>
            Sort Order
            <em>Lower numbers appear first in the events grid</em>
            <input
              type="number"
              value={sortOrder}
              onChange={e => setSortOrder(Number(e.target.value))}
              placeholder="0"
            />
          </label>
        </div>
      </div>

      <div className="dash-form-actions">
        <button type="submit" className="btn btn-fill" disabled={saving}>
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Event'}
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => router.push('/admin/events')}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
