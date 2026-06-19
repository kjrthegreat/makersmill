'use client';

import { useMemo, useState } from 'react';
import { TICKETS_URL } from '@/lib/site';

// ─── Event data ────────────────────────────────────────────────────────────────
// Single source of truth for the calendar. Edit/add events here — no backend.
//   • One-off event  → set `date: 'YYYY-MM-DD'`
//   • Weekly regular → set `weekday: 0–6` (0 = Sunday … 6 = Saturday)
type Accent = 'orange' | 'rust' | 'gold';

type CalEvent = {
  title: string;
  type: string;
  time?: string;
  tag?: string;
  accent?: Accent;
  date?: string;     // one-off, 'YYYY-MM-DD'
  weekday?: number;  // weekly recurring, 0–6
  ctaLabel?: string;
  ctaUrl?: string;
};

const EVENTS: CalEvent[] = [
  { title: 'Saturday Live Sessions', type: 'Live Music', time: '8:00 PM', tag: 'Weekly', accent: 'orange', weekday: 6, ctaLabel: 'Get Tickets', ctaUrl: TICKETS_URL },
  { title: 'Trivia Night',           type: 'Game Night', time: '7:00 PM', tag: 'Free',   accent: 'gold',   weekday: 3 },
  { title: 'Open Mic',               type: 'Live Music', time: '7:30 PM', tag: 'Free',   accent: 'rust',   weekday: 2 },
  { title: 'The Ridgeline Band',     type: 'Live Music', time: '8:30 PM', tag: 'Ticketed', accent: 'orange', date: '2026-06-27', ctaLabel: 'Get Tickets', ctaUrl: TICKETS_URL },
  { title: 'Makers Market',          type: 'Market',     time: '11:00 AM', tag: 'All Ages', accent: 'gold', date: '2026-07-04' },
  { title: 'Summer Songwriter Night', type: 'Live Music', time: '8:00 PM', tag: 'Ticketed', accent: 'rust', date: '2026-07-11', ctaLabel: 'Get Tickets', ctaUrl: TICKETS_URL },
  { title: 'Vinyl & Vintage Pop-Up', type: 'Pop-Up',     time: '12:00 PM', tag: 'Free',   accent: 'orange', date: '2026-07-18' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ACCENT_VAR: Record<Accent, string> = {
  orange: 'var(--orange)',
  rust: 'var(--rust)',
  gold: 'var(--gold)',
};

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Does an event fall on this specific date?
function eventOnDate(e: CalEvent, d: Date): boolean {
  if (e.date) return e.date === dayKey(d);
  if (e.weekday !== undefined) return e.weekday === d.getDay();
  return false;
}

function eventsOnDate(d: Date): CalEvent[] {
  return EVENTS.filter((e) => eventOnDate(e, d));
}

// Flatten EVENTS into concrete dated occurrences within the next `days` days.
function upcomingOccurrences(days = 90) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const out: { date: Date; event: CalEvent }[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    for (const e of EVENTS) if (eventOnDate(e, d)) out.push({ date: d, event: e });
  }
  return out;
}

export function Events() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [view, setView] = useState(() => ({ year: today.getFullYear(), month: today.getMonth() }));
  const [selected, setSelected] = useState<string | null>(null);

  const isCurrentMonth = view.year === today.getFullYear() && view.month === today.getMonth();
  const todayLabel = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Build the calendar grid for the viewed month
  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const list: (Date | null)[] = [];
    for (let i = 0; i < startPad; i++) list.push(null);
    for (let d = 1; d <= daysInMonth; d++) list.push(new Date(view.year, view.month, d));
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [view]);

  const upcoming = useMemo(() => upcomingOccurrences(), []);

  // Right-hand panel: a selected day's events, or the next handful of upcoming ones
  const panel = useMemo(() => {
    if (selected) {
      const d = new Date(selected + 'T00:00:00');
      return eventsOnDate(d).map((event) => ({ date: d, event }));
    }
    return upcoming.slice(0, 6);
  }, [selected, upcoming]);

  function shiftMonth(delta: number) {
    setSelected(null);
    setView((v) => {
      const m = v.month + delta;
      return { year: v.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
    });
  }

  function goToToday() {
    setView({ year: today.getFullYear(), month: today.getMonth() });
    setSelected(eventsOnDate(today).length ? dayKey(today) : null);
  }

  return (
    <section id="events">
      <div className="events-inner">
        <div className="events-top">
          <div className="rev">
            <div className="label">What&apos;s Coming Up</div>
            <h2 className="events-h">
              Upcoming
              <br />
              Events.
            </h2>
          </div>
          <div className="events-actions rev">
            <div className="events-today">
              <span className="events-today-dot" />
              Today · {todayLabel}
            </div>
            <a href={TICKETS_URL} className="btn btn-fill">Get Tickets</a>
          </div>
        </div>

        <div className="events-layout">
          {/* ── Calendar ── */}
          <div className="cal rev">
            <div className="cal-head">
              <div className="cal-title">{MONTHS[view.month]} {view.year}</div>
              <div className="cal-head-controls">
                <button
                  type="button"
                  className={`cal-today-btn${isCurrentMonth ? ' is-current' : ''}`}
                  onClick={goToToday}
                >
                  Today
                </button>
                <button type="button" className="cal-nav" onClick={() => shiftMonth(-1)} aria-label="Previous month">‹</button>
                <button type="button" className="cal-nav" onClick={() => shiftMonth(1)} aria-label="Next month">›</button>
              </div>
            </div>
            <div className="cal-dow">
              {DOW.map((d) => <span key={d}>{d}</span>)}
            </div>
            <div className="cal-grid">
              {cells.map((d, i) => {
                if (!d) return <div key={`x${i}`} className="cal-cell cal-cell--empty" />;
                const key = dayKey(d);
                const dayEvents = eventsOnDate(d);
                const isToday = key === dayKey(today);
                const isSel = key === selected;
                return (
                  <button
                    type="button"
                    key={key}
                    className={`cal-cell${dayEvents.length ? ' cal-cell--has' : ''}${isToday ? ' cal-cell--today' : ''}${isSel ? ' cal-cell--selected' : ''}`}
                    onClick={() => setSelected(dayEvents.length ? (isSel ? null : key) : null)}
                    disabled={!dayEvents.length}
                  >
                    <span className="cal-num">
                      {d.getDate()}
                      {isToday && <span className="cal-today-tag">Today</span>}
                    </span>
                    <span className="cal-evs">
                      {dayEvents.slice(0, 2).map((e, j) => (
                        <span
                          key={j}
                          className="cal-ev"
                          style={{ ['--c' as string]: ACCENT_VAR[e.accent ?? 'orange'] }}
                        >
                          {e.title}
                        </span>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="cal-ev-more">+{dayEvents.length - 2} more</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="cal-legend">
              <span><i className="cal-chip" style={{ background: 'var(--orange)' }} /> Live Music</span>
              <span><i className="cal-chip" style={{ background: 'var(--gold)' }} /> Games &amp; Markets</span>
              <span><i className="cal-chip" style={{ background: 'var(--rust)' }} /> Pop-Ups</span>
            </div>
          </div>

          {/* ── Upcoming / selected-day list ── */}
          <div className="events-list">
            <div className="events-list-head">
              <span>
                {selected
                  ? <>{DOW[new Date(selected + 'T00:00:00').getDay()]}, {MONTHS_SHORT[new Date(selected + 'T00:00:00').getMonth()]} {new Date(selected + 'T00:00:00').getDate()}</>
                  : 'Upcoming Events'}
              </span>
              {selected && (
                <button type="button" className="events-list-clear" onClick={() => setSelected(null)}>
                  ← All upcoming
                </button>
              )}
            </div>

            {!selected && (
              <p className="events-list-hint">Tap any highlighted date to see what&apos;s on.</p>
            )}

            {panel.length === 0 ? (
              <div className="events-note-foot">No events on this day.</div>
            ) : (
              panel.map(({ date, event: e }, i) => {
                const isTodayCard = dayKey(date) === dayKey(today);
                return (
                  <div className={`ev-card rev${isTodayCard ? ' ev-card--today' : ''}`} key={i} style={i > 0 ? { transitionDelay: `${(i * 0.04).toFixed(2)}s` } : undefined}>
                    <div className="ev-top">
                      <div className="ev-date" style={{ background: ACCENT_VAR[e.accent ?? 'orange'] }}>
                        <div className="ev-month" style={{ color: 'var(--ink)' }}>{MONTHS_SHORT[date.getMonth()]}</div>
                        <div className="ev-day" style={{ color: 'var(--ink)' }}>{date.getDate()}</div>
                      </div>
                      <div>
                        <div className="ev-type">{e.type}</div>
                        <div className="ev-name">{e.title}</div>
                        <div className="ev-detail">
                          {isTodayCard ? 'Today' : DOW[date.getDay()]}{e.weekday !== undefined ? ' · Weekly' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="ev-bot">
                      {e.time && <div className="ev-time">{e.time}</div>}
                      <div className="ev-actions">
                        {e.tag && <span className="ev-tag">{e.tag}</span>}
                        <a href={e.ctaUrl || TICKETS_URL} className="ev-cta">
                          {e.ctaLabel || 'Details'} →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
