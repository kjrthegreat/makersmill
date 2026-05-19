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
    desc: "An independent print studio working out of The Makers Mill. Stop in to see what they're making.",
    href: '/businesses/print-ghost'
  },
  {
    label: 'Movement',
    name: 'Pilates',
    desc: 'A pilates studio inside the Mill — classes and sessions in a beautifully restored space.',
    href: '/businesses/pilates'
  },
  {
    label: 'In the Mill',
    name: 'Soul House',
    desc: 'Soul House operates inside the Mill — a distinct space sharing the building with the makers and the music.',
    href: '/businesses/soul-house'
  }
];

import Link from 'next/link';

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
          {BUSINESSES.map((b, i) => (
            <div key={b.name} className="biz-card rev" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="biz-label">{b.label}</div>
              <h3 className="biz-name">{b.name}</h3>
              <p className="biz-desc">{b.desc}</p>
              <Link href={b.href} className="biz-cta">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
