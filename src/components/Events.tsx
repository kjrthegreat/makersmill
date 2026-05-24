import { createClient } from '@/lib/supabase/server';
import type { Event, EventAccentColor } from '@/types/vendor';

const COLOR_MAP: Record<EventAccentColor, {
  bg: string;
  monthColor: string;
  dayColor: string;
  extra?: Record<string, string>;
}> = {
  orange: { bg: 'var(--orange)', monthColor: 'var(--ink)',      dayColor: 'var(--ink)' },
  rust:   { bg: 'var(--rust)',   monthColor: 'var(--cream-dk)', dayColor: 'var(--cream)' },
  gold:   { bg: 'var(--gold)',   monthColor: 'var(--ink)',      dayColor: 'var(--ink)' },
  warm:   { bg: 'var(--warm)',   monthColor: 'var(--orange)',   dayColor: 'var(--cream)', extra: { border: '1px solid var(--ob)' } },
  wood:   { bg: 'var(--wood)',   monthColor: 'var(--cream)',    dayColor: 'var(--cream)' },
  dark:   { bg: 'var(--ink)',    monthColor: 'var(--cream)',    dayColor: 'var(--cream)' },
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getDateDisplay(event: Event) {
  if (event.recurring && event.recurring_day) {
    return { month: 'Every', day: event.recurring_day };
  }
  if (event.event_date) {
    // append T00:00:00 to avoid UTC offset shifting the day
    const d = new Date(event.event_date + 'T00:00:00');
    return { month: MONTHS[d.getMonth()], day: String(d.getDate()) };
  }
  return { month: '—', day: '—' };
}

export async function Events() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('sort_order')
    .order('created_at');

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
            <a href="#" className="btn btn-fill">
              Get Tickets
            </a>
            <a href="#" className="btn btn-outline">
              View All Events
            </a>
          </div>
        </div>

        {(!events || events.length === 0) ? (
          <div className="events-note-foot">
            No upcoming events scheduled — check back soon.
          </div>
        ) : (
          <div className="events-grid">
            {events.map((e: Event, i: number) => {
              const color = COLOR_MAP[e.accent_color] ?? COLOR_MAP.orange;
              const { month, day } = getDateDisplay(e);
              return (
                <div
                  key={e.id}
                  className="ev-card rev"
                  style={i > 0 ? { transitionDelay: `${(i * 0.04).toFixed(2)}s` } : undefined}
                >
                  <div className="ev-top">
                    <div className="ev-date" style={{ background: color.bg, ...color.extra }}>
                      <div className="ev-month" style={{ color: color.monthColor }}>{month}</div>
                      <div className="ev-day" style={{ color: color.dayColor }}>{day}</div>
                    </div>
                    <div>
                      {e.type && <div className="ev-type">{e.type}</div>}
                      <div className="ev-name">{e.name}</div>
                      {e.detail && <div className="ev-detail">{e.detail}</div>}
                    </div>
                  </div>
                  <div className="ev-bot">
                    {e.time_label && <div className="ev-time">{e.time_label}</div>}
                    <div className="ev-actions">
                      {e.tag && <span className="ev-tag">{e.tag}</span>}
                      <a href={e.cta_url || '#'} className="ev-cta">
                        {e.cta_label || 'Event Details'} →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
