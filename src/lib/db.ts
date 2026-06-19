import { getCloudflareContext } from '@opennextjs/cloudflare';
import { TICKETS_URL } from './site';

// ─── Data layer: D1-backed reads for the public site ─────────────────────────
// Server-only. Call from server components / route handlers, never the client.
// Bindings come from wrangler.jsonc (env.DB). Pages that call these must be
// dynamic (export const dynamic = 'force-dynamic') so they render per request
// on the Worker, where the binding exists — not prerendered at build time.

export type Accent = 'orange' | 'rust' | 'gold';

// Shape consumed by the Events calendar client component.
export type CalEvent = {
  title: string;
  type: string;
  time?: string;
  tag?: string;
  accent?: Accent;
  date?: string; // one-off, 'YYYY-MM-DD'
  weekday?: number; // weekly recurring, 0-6
  ctaLabel?: string;
  ctaUrl?: string;
};

// Lean stage-show data; the /stage page maps `accent` to presentation.
export type StageShow = {
  month: string;
  day: string;
  accent: string; // orange | rust | gold | warm
  type: string;
  name: string;
  detail: string;
  time: string;
  tag: string;
  ctaLabel: string;
  ctaUrl: string;
};

function db() {
  return getCloudflareContext().env.DB;
}

// 'TICKETS' sentinel resolves to the single site-wide tickets link, so the URL
// lives in one place (src/lib/site.ts) even though events reference it.
function resolveCtaUrl(raw: string, fallback: string): string {
  if (raw === 'TICKETS') return TICKETS_URL;
  return raw || fallback;
}

export async function getEvents(): Promise<CalEvent[]> {
  const { results } = await db()
    .prepare(
      `SELECT title, type, time, tag, accent, date, weekday, cta_label, cta_url
       FROM events ORDER BY sort_order, id`
    )
    .all<{
      title: string;
      type: string;
      time: string | null;
      tag: string | null;
      accent: string;
      date: string | null;
      weekday: number | null;
      cta_label: string | null;
      cta_url: string | null;
    }>();

  return results.map((r) => ({
    title: r.title,
    type: r.type,
    time: r.time ?? undefined,
    tag: r.tag ?? undefined,
    accent: (r.accent as Accent) || 'orange',
    date: r.date ?? undefined,
    weekday: r.weekday ?? undefined,
    ctaLabel: r.cta_label ?? undefined,
    // Free events leave cta_url NULL → undefined, so the calendar falls back to
    // "Details → /#experiences". Ticketed events resolve to TICKETS_URL.
    ctaUrl: r.cta_url == null ? undefined : resolveCtaUrl(r.cta_url, ''),
  }));
}

export async function getStageShows(): Promise<StageShow[]> {
  const { results } = await db()
    .prepare(
      `SELECT month, day, accent, type, name, detail, time, tag, cta_label, cta_url
       FROM stage_shows ORDER BY sort_order, id`
    )
    .all<{
      month: string;
      day: string;
      accent: string;
      type: string;
      name: string;
      detail: string;
      time: string;
      tag: string;
      cta_label: string;
      cta_url: string | null;
    }>();

  return results.map((r) => ({
    month: r.month,
    day: r.day,
    accent: r.accent,
    type: r.type,
    name: r.name,
    detail: r.detail,
    time: r.time,
    tag: r.tag,
    ctaLabel: r.cta_label,
    ctaUrl: resolveCtaUrl(r.cta_url ?? '', '#'),
  }));
}

// ─── Admin CRUD ──────────────────────────────────────────────────────────────
// Raw rows (incl. id) for the admin editor. Server-only, used by server actions.

export type EventRow = {
  id: number;
  title: string;
  type: string;
  time: string | null;
  tag: string | null;
  accent: string;
  date: string | null;
  weekday: number | null;
  cta_label: string | null;
  cta_url: string | null;
  sort_order: number;
};
export type EventInput = Omit<EventRow, 'id'>;

const EVENT_COLS = 'id, title, type, time, tag, accent, date, weekday, cta_label, cta_url, sort_order';

export async function listEventRows(): Promise<EventRow[]> {
  const { results } = await db()
    .prepare(`SELECT ${EVENT_COLS} FROM events ORDER BY sort_order, id`)
    .all<EventRow>();
  return results;
}

export async function getEventRow(id: number): Promise<EventRow | null> {
  return db().prepare(`SELECT ${EVENT_COLS} FROM events WHERE id = ?`).bind(id).first<EventRow>();
}

export async function createEvent(e: EventInput): Promise<void> {
  await db()
    .prepare(
      `INSERT INTO events (title, type, time, tag, accent, date, weekday, cta_label, cta_url, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(e.title, e.type, e.time, e.tag, e.accent, e.date, e.weekday, e.cta_label, e.cta_url, e.sort_order)
    .run();
}

export async function updateEvent(id: number, e: EventInput): Promise<void> {
  await db()
    .prepare(
      `UPDATE events SET title=?, type=?, time=?, tag=?, accent=?, date=?, weekday=?, cta_label=?, cta_url=?, sort_order=?
       WHERE id=?`
    )
    .bind(e.title, e.type, e.time, e.tag, e.accent, e.date, e.weekday, e.cta_label, e.cta_url, e.sort_order, id)
    .run();
}

export async function deleteEvent(id: number): Promise<void> {
  await db().prepare('DELETE FROM events WHERE id = ?').bind(id).run();
}

export type StageRow = {
  id: number;
  month: string;
  day: string;
  accent: string;
  type: string;
  name: string;
  detail: string;
  time: string;
  tag: string;
  cta_label: string;
  cta_url: string | null;
  sort_order: number;
};
export type StageInput = Omit<StageRow, 'id'>;

const STAGE_COLS = 'id, month, day, accent, type, name, detail, time, tag, cta_label, cta_url, sort_order';

export async function listStageRows(): Promise<StageRow[]> {
  const { results } = await db()
    .prepare(`SELECT ${STAGE_COLS} FROM stage_shows ORDER BY sort_order, id`)
    .all<StageRow>();
  return results;
}

export async function getStageRow(id: number): Promise<StageRow | null> {
  return db().prepare(`SELECT ${STAGE_COLS} FROM stage_shows WHERE id = ?`).bind(id).first<StageRow>();
}

export async function createStageShow(s: StageInput): Promise<void> {
  await db()
    .prepare(
      `INSERT INTO stage_shows (month, day, accent, type, name, detail, time, tag, cta_label, cta_url, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(s.month, s.day, s.accent, s.type, s.name, s.detail, s.time, s.tag, s.cta_label, s.cta_url, s.sort_order)
    .run();
}

export async function updateStageShow(id: number, s: StageInput): Promise<void> {
  await db()
    .prepare(
      `UPDATE stage_shows SET month=?, day=?, accent=?, type=?, name=?, detail=?, time=?, tag=?, cta_label=?, cta_url=?, sort_order=?
       WHERE id=?`
    )
    .bind(s.month, s.day, s.accent, s.type, s.name, s.detail, s.time, s.tag, s.cta_label, s.cta_url, s.sort_order, id)
    .run();
}

export async function deleteStageShow(id: number): Promise<void> {
  await db().prepare('DELETE FROM stage_shows WHERE id = ?').bind(id).run();
}
