import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PerformerInquiryButton } from '@/components/PerformerInquiryButton';

export const metadata: Metadata = {
  title: 'The Stage — Live Music in Somerset, KY',
  description:
    "The Stage at The Makers Mill — live music, ticketed shows, and Saturday sets in downtown Somerset, KY. Local songwriters to touring acts, all under one roof at 402 E. Mt. Vernon St.",
  openGraph: {
    title: 'The Stage — Live Music at The Makers Mill, Somerset, KY',
    description: 'Live music, ticketed shows, and Saturday sets. Local songwriters to touring acts — all under one roof downtown.',
    images: [{ url: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_020-1024x682.jpg', width: 1024, height: 682 }]
  },
  twitter: { card: 'summary_large_image' }
};

// TODO: replace '#' with the real ticketing URL when available
const TICKETS_HREF = '#';
const ALL_SHOWS_HREF = '#';

type Show = {
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

const SHOWS: Show[] = [
  {
    month: 'Every',
    day: 'Sat',
    dateBg: 'var(--orange)',
    monthColor: 'var(--ink)',
    dayColor: 'var(--ink)',
    type: 'Weekly · Live Set',
    name: 'Saturday Live Set',
    detail: 'Area musicians take the stage every Saturday. Doors get busy — come early.',
    time: '7:00 PM',
    tag: 'All Ages',
    // TODO: real ticket URL
    cta: { label: 'Tickets', href: '#' }
  },
  {
    month: 'Jun',
    day: '14',
    dateBg: 'var(--rust)',
    monthColor: 'var(--cream-dk)',
    dayColor: 'var(--cream)',
    type: 'Touring Act',
    name: 'Touring Artist Showcase',
    detail: 'A regional/touring performer on The Stage. Lineup confirmed closer to the date.',
    time: '8:00 PM',
    tag: 'Ticketed',
    // TODO: real ticket URL
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
    // TODO: real event-details URL
    cta: { label: 'Event Details', href: '#' },
    delay: '.04s'
  },
  {
    month: 'Jul',
    day: '19',
    dateBg: 'var(--warm)',
    monthColor: 'var(--orange)',
    dayColor: 'var(--cream)',
    dateExtra: { border: '1px solid var(--ob)' },
    type: 'Songwriter Round',
    name: "Singer-Songwriter Night",
    detail: 'A quieter night for original songs and storytelling. Listening-room vibe.',
    time: '7:30 PM',
    tag: 'Ticketed',
    // TODO: real ticket URL
    cta: { label: 'Tickets', href: '#' },
    delay: '.12s'
  }
];

const VENUE_LOCATION = {
  '@type': 'Place',
  name: 'The Makers Mill — The Stage',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '402 E. Mt. Vernon St.',
    addressLocality: 'Somerset',
    addressRegion: 'KY',
    postalCode: '42501',
    addressCountry: 'US',
  },
};

const ORGANIZER = {
  '@type': 'Organization',
  name: 'The Makers Mill',
  url: 'https://makersmillsomerset.com',
};

const eventJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: 'Saturday Live Set at The Makers Mill',
    description: 'Area musicians take the stage every Saturday. Doors get busy — come early.',
    location: VENUE_LOCATION,
    organizer: ORGANIZER,
    eventSchedule: {
      '@type': 'Schedule',
      byDay: 'https://schema.org/Saturday',
      startTime: '19:00',
      repeatFrequency: 'P1W',
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: false,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: 'Touring Artist Showcase',
    description: 'A regional/touring performer on The Stage. Lineup confirmed closer to the date.',
    startDate: '2026-06-14T20:00',
    location: VENUE_LOCATION,
    organizer: ORGANIZER,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: false,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Open Mic Night at The Makers Mill',
    description: 'Singers, poets, comedians. 5-minute sets. Sign up at the door.',
    startDate: '2026-06-27T19:00',
    location: VENUE_LOCATION,
    organizer: ORGANIZER,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: 'Singer-Songwriter Night',
    description: 'A quieter night for original songs and storytelling. Listening-room vibe.',
    startDate: '2026-07-19T19:30',
    location: VENUE_LOCATION,
    organizer: ORGANIZER,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: false,
  },
];

export default function StagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Nav />

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          {/* TODO: swap for a real stage / live-performance hero photo when available */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_020-1024x682.jpg"
            alt="The Stage at The Makers Mill — live music venue in Somerset, Kentucky"
          />
        </div>
        <div className="page-hero-glow"></div>
        <Link href="/" className="back-home" aria-label="Back to Makers Mill home">Back to Makers Mill</Link>
        <div className="page-hero-inner">
          <div className="page-hero-stamp rev">✦ The Stage · Live Music ✦</div>
          <h1 className="page-hero-h rev" style={{ transitionDelay: '.1s' }}>
            WHERE THE
            <br />
            <em>MUSIC</em>LIVES.
          </h1>
          <div className="page-hero-place rev" style={{ transitionDelay: '.2s' }}>
            Downtown Somerset, KY
          </div>
          <p className="page-hero-sub rev" style={{ transitionDelay: '.28s' }}>
            The room at Makers Mill built for live performance — from local songwriters to
            touring acts, ticketed shows to free Saturday sets.
          </p>
          <div className="page-hero-ctas rev" style={{ transitionDelay: '.36s' }}>
            <a href={TICKETS_HREF} className="btn btn-fill">
              Get Show Tickets
            </a>
            <PerformerInquiryButton className="btn btn-outline">
              Book or Inquire About the Stage
            </PerformerInquiryButton>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="pintro">
        <div className="pintro-inner">
          <div className="rev-l">
            <div className="label">About The Stage</div>
            <h2 className="pintro-h">
              Built for the
              <br />
              <em>Live Set.</em>
            </h2>
            <p className="pintro-p">
              The Stage is where Makers Mill&apos;s music, crowd, and energy come together. Most
              nights it&apos;s local — a Saturday set, a singer-songwriter round, an open mic with
              someone&apos;s first-ever 5 minutes. Other nights it&apos;s touring acts passing
              through downtown Somerset.
            </p>
            <p className="pintro-p">
              Sound is dialed in, the room holds a crowd without losing the intimacy, and the bar
              is twenty feet away. The kind of room you&apos;d want a band to play.
            </p>
          </div>
          <div className="pintro-photos rev-r">
            <div className="pintro-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_017-1024x682.jpg"
                alt="Live music atmosphere at The Stage"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_022-1024x682.jpg"
                alt="The Makers Mill interior — show night"
              />
            </div>
            <div className="pintro-photo-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_025-1024x683.jpg"
                alt="The Makers Mill venue space in Somerset, KY"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── UPCOMING SHOWS ── */}
      <section id="upcoming" className="upcoming-shows">
        <div className="events-inner">
          <div className="events-top">
            <div className="rev">
              <div className="label">What&apos;s Coming Up</div>
              <h2 className="events-h">
                Upcoming
                <br />
                Shows.
              </h2>
            </div>
            <div className="events-actions rev">
              <a href={TICKETS_HREF} className="btn btn-fill">
                Get Tickets
              </a>
              <a href={ALL_SHOWS_HREF} className="btn btn-outline">
                View All Shows
              </a>
            </div>
          </div>
          <div className="events-grid">
            {SHOWS.map((s) => (
              <div key={s.name} className="ev-card rev" style={s.delay ? { transitionDelay: s.delay } : undefined}>
                <div className="ev-top">
                  <div className="ev-date" style={{ background: s.dateBg, ...s.dateExtra }}>
                    <div className="ev-month" style={{ color: s.monthColor }}>{s.month}</div>
                    <div className="ev-day" style={{ color: s.dayColor }}>{s.day}</div>
                  </div>
                  <div>
                    <div className="ev-type">{s.type}</div>
                    <div className="ev-name">{s.name}</div>
                    <div className="ev-detail">{s.detail}</div>
                  </div>
                </div>
                <div className="ev-bot">
                  <div className="ev-time">{s.time}</div>
                  <div className="ev-actions">
                    <span className="ev-tag">{s.tag}</span>
                    <a href={s.cta.href} className="ev-cta">{s.cta.label} →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="events-note-foot rev">
            Sample shows shown — real schedule confirmed with the business.
          </div>
        </div>
      </section>

      {/* ── PERFORMER INQUIRY (modal trigger) ── */}
      <section id="performer-inquiry" className="inquiry">
        <div className="inquiry-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            For Performers
          </div>
          <h2 className="inquiry-h rev" style={{ transitionDelay: '.08s' }}>
            Want to Play
            <br />
            <em>The Stage?</em>
          </h2>
          <p className="inquiry-p rev" style={{ transitionDelay: '.16s' }}>
            Bands, songwriters, comedians, organizers — if you&apos;ve got a set in you or an
            event in mind, we want to hear from you. Hit the button and we&apos;ll be in touch.
          </p>
          <div className="inquiry-tags rev" style={{ transitionDelay: '.24s', marginBottom: 28 }}>
            <span>Bands &amp; Songwriters</span>
            <span>Touring Acts</span>
            <span>Event Organizers</span>
          </div>
          <div className="inquiry-ctas rev" style={{ transitionDelay: '.32s' }}>
            <PerformerInquiryButton className="btn btn-fill">
              Submit Performer Inquiry
            </PerformerInquiryButton>
          </div>
          <p className="inquiry-p rev" style={{ transitionDelay: '.4s', marginTop: 28, fontSize: 13 }}>
            Prefer email? Reach out at{' '}
            <a href="mailto:makersmillsomerset@gmail.com" style={{ color: 'var(--orange)' }}>
              makersmillsomerset@gmail.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── TICKET CTA BAND ── */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            See You at the Show
          </div>
          <h2 className="cta-band-h rev" style={{ transitionDelay: '.08s' }}>
            Get Show
            <br />
            <em>Tickets.</em>
          </h2>
          <p className="cta-band-p rev" style={{ transitionDelay: '.16s' }}>
            Grab a ticket to an upcoming show, or check the calendar and pick a Saturday.
          </p>
          <div className="cta-band-ctas rev" style={{ transitionDelay: '.24s' }}>
            <a href={TICKETS_HREF} className="btn btn-fill">
              Get Show Tickets
            </a>
            <a href={ALL_SHOWS_HREF} className="btn btn-outline">
              View All Shows
            </a>
          </div>
        </div>
      </section>

      {/* ── ALSO AT THE MILL ── */}
      <section className="also">
        <div className="also-inner">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            Also at the Mill
          </div>
          <h2 className="also-h rev" style={{ transitionDelay: '.08s' }}>
            More Under
            <br />
            <em>One Roof.</em>
          </h2>
          <p className="also-sub rev" style={{ transitionDelay: '.16s' }}>
            The Stage is one of three. Take a look at the rest of Makers Mill.
          </p>
          <div className="also-grid">
            <Link href="/bar-food" className="also-card rev" style={{ transitionDelay: '.2s' }}>
              <div className="also-label">Eat &amp; Drink</div>
              <div className="also-name">Bar &amp; Food</div>
              <p className="also-desc">
                Craft brews, cocktails, and a room built for hanging out.
              </p>
              <span className="also-arrow">View Bar &amp; Food →</span>
            </Link>
            <Link href="/vendors" className="also-card rev" style={{ transitionDelay: '.28s' }}>
              <div className="also-label">Shop Local</div>
              <div className="also-name">Vendors</div>
              <p className="also-desc">
                Local makers, artisan goods, and one-of-a-kind vintage finds.
              </p>
              <span className="also-arrow">View Vendors →</span>
            </Link>
          </div>
          <Link href="/" className="also-home rev" style={{ transitionDelay: '.36s' }}>
            Back to Makers Mill Home
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
