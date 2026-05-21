import Link from 'next/link';

type Business = {
  label: string;
  name: string;
  desc: string;
  href: string;
};

const BUSINESSES: Business[] = [
  {
    label: 'Print Studio',
    name: 'Print Ghost',
    desc: "An independent print studio working out of The Makers Mill — screen printing, original graphics, and custom work made right here.",
    href: '/businesses/print-ghost'
  },
  {
    label: 'Movement',
    name: 'Pilates',
    desc: 'A pilates studio inside the Mill — mat classes, equipment sessions, and small-group options in a beautifully restored space.',
    href: '/businesses/pilates'
  },
  {
    label: 'Community Space',
    name: 'Soul House',
    desc: 'Soul House operates inside the Mill — a creative community space with its own events, gatherings, and distinct energy.',
    href: '/businesses/soul-house'
  }
];

export function Businesses() {
  return (
    <section id="businesses" className="biz">
      <div className="biz-inner">
        <div className="biz-head rev">
          <div className="label" style={{ justifyContent: 'center' }}>
            Inside The Mill
          </div>
          <h2 className="biz-h">
            Businesses
            <br />
            <em>at the Mill.</em>
          </h2>
          <p className="biz-sub">
            Independent businesses and studios sharing the building — each with its own thing
            going on, all part of what makes the Mill a destination.
          </p>
        </div>
        <div className="biz-grid">
          {/* Each card is a full <Link> so the entire card is clickable, not just the label */}
          {BUSINESSES.map((b, i) => (
            <Link
              key={b.name}
              href={b.href}
              className="biz-card rev"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="biz-label">{b.label}</div>
              <h3 className="biz-name">{b.name}</h3>
              <p className="biz-desc">{b.desc}</p>
              <span className="biz-cta">Learn More →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
