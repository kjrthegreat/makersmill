const TAGS = [
  'Live Music',
  'Local Art',
  'Makers Market',
  'Vintage Finds',
  'Pool Hall',
  'Arcade',
  'Bar & Grill',
  'Community'
];

export function About() {
  return (
    <section id="about">
      <div className="about-inner">
        <div className="about-photos rev-l">
          <div className="about-photo-main">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_004-1024x682.jpg"
              alt="Makers Mill artisan market"
            />
          </div>
          <div className="about-photo-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_007-1024x682.jpg"
              alt="Makers Mill interior detail"
            />
          </div>
          <div className="about-photo-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_010-1024x682.jpg"
              alt="Makers Mill goods"
            />
          </div>
        </div>
        <div className="about-text rev-r">
          <div className="label">About The Mill</div>
          <h2 className="about-h">
            More Than
            <br />
            a <em>Venue.</em>
          </h2>
          <p className="about-p">
            The Makers Mill is downtown Somerset&apos;s creative heartbeat — a beautifully curated
            artisan market wrapped around a full bar and grill, with live music, games, and good
            people at every turn.
          </p>
          <p className="about-p">
            Whether you&apos;re hunting for a one-of-a-kind handmade piece, catching a live set,
            shooting pool, or just settling into a good drink in good company — you belong here.
          </p>
          <div className="about-tags">
            {TAGS.map((t) => (
              <span key={t} className="about-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
