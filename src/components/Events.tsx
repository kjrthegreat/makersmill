// TODO: replace '#' with real per-event ticket / details URLs when available
const TICKETS_HREF = '#';
const ALL_EVENTS_HREF = '#';

type EventCard = {
  month: string;
  day: string;
  dateBg: string;
  monthColor: string;
  dayColor: string;
  dateExtra?: React.CSSProperties;
  type: string;
  name: string;
  detail: string;
  time: string;
  tag: string;
  cta: { label: string; href: string };
  delay?: string;
};

const EVENTS: EventCard[] = [
  {
    month: 'Every',
    day: 'Thu',
    dateBg: 'var(--orange)',
    monthColor: 'var(--ink)',
    dayColor: 'var(--ink)',
    type: 'Weekly · Free',
    name: 'Trivia Night',
    detail: 'Hosted by Kyle Kadel. Categories change weekly. Prizes for top teams.',
    time: '7:00 PM – 9:00 PM',
    tag: 'Free Entry',
    // TODO: replace with real event-details URL
    cta: { label: 'Event Details', href: '#' }
  },
  {
    month: 'Every',
    day: 'Sat',
    dateBg: 'var(--rust)',
    monthColor: 'var(--cream-dk)',
    dayColor: 'var(--cream)',
    type: 'Live Music',
    name: 'Saturday Live Set',
    detail: 'Area musicians perform every Saturday. Grab a spot early — it fills up.',
    time: '7:00 PM',
    tag: 'All Ages',
    // TODO: replace with real ticket URL
    cta: { label: 'Tickets', href: '#' },
    delay: '.08s'
  },
  {
    month: 'Jun',
    day: '27',
    dateBg: 'var(--gold)',
    monthColor: 'var(--ink)',
    dayColor: 'var(--ink)',
    type: 'Open Stage',
    name: 'Open Mic Night',
    detail: 'Singers, poets, comedians. 5-minute sets. Sign up at the door.',
    time: 'Sign-ups 6PM · Start 7PM',
    tag: 'Open to All',
    // TODO: replace with real event-details URL
    cta: { label: 'Event Details', href: '#' },
    delay: '.04s'
  },
  {
    month: 'Jul',
    day: '12',
    dateBg: 'var(--warm)',
    monthColor: 'var(--orange)',
    dayColor: 'var(--cream)',
    dateExtra: { border: '1px solid var(--ob)' },
    type: 'Makers Market',
    name: 'Local Maker Pop-Up',
    detail: "Handmade goods, art, crafts, and vintage finds from Somerset's creative community.",
    time: '11AM – 5PM',
    tag: 'Free Admission',
    // TODO: replace with real event-details URL
    cta: { label: 'Event Details', href: '#' },
    delay: '.12s'
  }
];

export function Events() {
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
            <a href={TICKETS_HREF} className="btn btn-fill">
              Get Tickets
            </a>
            <a href={ALL_EVENTS_HREF} className="btn btn-outline">
              View All Events
            </a>
          </div>
        </div>
        <div className="events-grid">
          {EVENTS.map((e) => (
            <div key={e.name} className="ev-card rev" style={e.delay ? { transitionDelay: e.delay } : undefined}>
              <div className="ev-top">
                <div className="ev-date" style={{ background: e.dateBg, ...e.dateExtra }}>
                  <div className="ev-month" style={{ color: e.monthColor }}>
                    {e.month}
                  </div>
                  <div className="ev-day" style={{ color: e.dayColor }}>
                    {e.day}
                  </div>
                </div>
                <div>
                  <div className="ev-type">{e.type}</div>
                  <div className="ev-name">{e.name}</div>
                  <div className="ev-detail">{e.detail}</div>
                </div>
              </div>
              <div className="ev-bot">
                <div className="ev-time">{e.time}</div>
                <div className="ev-actions">
                  <span className="ev-tag">{e.tag}</span>
                  <a href={e.cta.href} className="ev-cta">
                    {e.cta.label} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="events-note-foot rev">
          Sample events shown — real schedule confirmed with the business.
        </div>
      </div>
    </section>
  );
}
