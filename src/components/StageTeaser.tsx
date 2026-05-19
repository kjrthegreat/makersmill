import Link from 'next/link';

// TODO: replace '#' with the real ticketing URL when available
const TICKETS_HREF = '#';

export function StageTeaser() {
  return (
    <section id="stage-teaser" className="stage-teaser">
      <div className="stage-inner">
        <div className="stage-photo rev-l">
          {/* TODO: swap for a real stage / live-performance photo once available */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_017-1024x682.jpg"
            alt="Live music on The Stage at The Makers Mill in Somerset, Kentucky"
          />
          <div className="stage-photo-stamp">On Stage Tonight</div>
        </div>
        <div className="stage-copy rev-r">
          <div className="label">On Stage</div>
          <h2 className="stage-h">
            Live Music
            <br />
            <em>Lives Here.</em>
          </h2>
          <p className="stage-p">
            The Stage at Makers Mill is built for live performance — from songwriters and singer-
            songwriter sets to full bands and touring acts. Ticketed shows, free Saturday sets, and
            the kind of nights you&apos;ll want to remember.
          </p>
          <ul className="stage-list">
            <li>Live music every Saturday at 7PM</li>
            <li>Ticketed shows from regional and touring artists</li>
            <li>Open Mic nights for the brave and the brilliant</li>
          </ul>
          <div className="stage-ctas">
            <Link href="/stage" className="btn btn-fill">
              Explore The Stage
            </Link>
            <a href={TICKETS_HREF} className="btn btn-outline">
              Get Show Tickets
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
