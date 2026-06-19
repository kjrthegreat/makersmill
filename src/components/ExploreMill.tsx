import Link from 'next/link';

type ExploreCard = {
  n: string;
  label: string;
  title: string;
  titleEm?: string;
  desc: string;
  ctaLabel: string;
  href: string;
  image: string;
  alt: string;
};

const CARDS: ExploreCard[] = [
  {
    n: '01',
    label: 'Live Music',
    title: 'The',
    titleEm: 'Stage',
    desc: 'Live music, ticketed shows, and the loudest, best nights downtown. Local songwriters to touring acts — the stage is always alive.',
    ctaLabel: 'Explore The Stage',
    href: '/stage',
    // TODO: swap for a real stage / live-performance photo once available
    image:
      'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_020-1024x682.jpg',
    alt: 'The Stage at The Makers Mill — live music venue in Somerset, KY'
  },
  {
    n: '02',
    label: 'Eat & Drink',
    title: 'Bar &',
    titleEm: 'Food',
    desc: 'Craft brews, cocktails, and fresh food made in the back. A room built for gathering — settle in for a set or just for the night.',
    ctaLabel: 'View Bar & Food',
    href: '/bar-food',
    // TODO: swap for a real bar / food photo once available
    image:
      'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_003-1024x683.jpg',
    alt: 'Bar and food at The Makers Mill in Somerset, KY'
  },
  {
    n: '03',
    label: 'Shop Local',
    title: '',
    titleEm: 'Vendors',
    desc: "Local makers, artisan goods, and one-of-a-kind vintage finds. New stuff every visit from Somerset's creative community.",
    ctaLabel: 'View Vendors',
    href: '/vendors',
    image:
      'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_004-1024x682.jpg',
    alt: 'Vendors at The Makers Mill — artisan goods and vintage finds in Somerset, KY'
  }
];

export function ExploreMill() {
  return (
    <section id="explore-mill" className="explore">
      <div className="explore-inner">
        <div className="explore-head rev">
          <div className="label" style={{ justifyContent: 'center' }}>
            What&apos;s Inside
          </div>
          <h2 className="explore-h">
            Three Places.
            <br />
            <em>One Mill.</em>
          </h2>
          <p className="explore-sub">
            Makers Mill is more than one room — it&apos;s a venue, a bar, and a store, all under
            one roof. Pick your door in.
          </p>
        </div>
        <div className="explore-grid">
          {CARDS.map((c, i) => (
            <Link
              key={c.n}
              href={c.href}
              className="explore-card rev"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="explore-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.alt} />
              </div>
              <div className="explore-body">
                <div className="explore-n">{c.n}</div>
                <div className="explore-label">{c.label}</div>
                <h3 className="explore-title">
                  {c.title}{' '}
                  {c.titleEm && <em>{c.titleEm}</em>}
                </h3>
                <p className="explore-desc">{c.desc}</p>
                <span className="explore-cta">{c.ctaLabel} →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="explore-extras rev" style={{ transitionDelay: '.28s' }}>
          <div className="explore-extras-label">Also inside the Mill</div>
          <div className="explore-extras-row">
            <Link href="/#experiences" className="explore-extra-pill">
              <span className="gly">⬥</span> Pool
            </Link>
            <Link href="/#experiences" className="explore-extra-pill">
              <span className="gly">◈</span> Arcade
            </Link>
            <Link href="/#experiences" className="explore-extra-pill">
              <span className="gly">✷</span> Open Mic
            </Link>
            <Link href="/#experiences" className="explore-extra-pill">
              <span className="gly">❂</span> Trivia Nights
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
