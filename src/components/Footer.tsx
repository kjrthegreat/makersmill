import Image from 'next/image';
import Link from 'next/link';

// TODO: replace '#' with the real ticketing URL when available
const TICKETS_HREF = '#';

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#events', label: 'Events' },
  { href: '/stage', label: 'The Stage' },
  { href: '/bar-food', label: 'Bar & Food' },
  { href: '/vendors', label: 'Vendors' },
  { href: '/#visit', label: 'Visit' },
  { href: 'mailto:makersmillsomerset@gmail.com', label: 'Contact' }
];

export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Image
              className="footer-acorn"
              src="/acorn.png"
              alt="The Makers Mill"
              width={40}
              height={40}
            />
            <div className="footer-brand-text">
              <div className="footer-name">The Makers Mill</div>
              <div className="footer-tagline">
                Music · Art · Makers · Drinks · Games · Community
              </div>
            </div>
          </div>
          <ul className="footer-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href={TICKETS_HREF} className="footer-tickets">
                Tickets
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2025 The Makers Mill · 402 E. Mt. Vernon St. · Somerset, KY 42501
          </div>
          <div className="footer-concept">
            Concept website by Oakline Digital · Final content, photos, events, and details
            customized with the business.
          </div>
        </div>
      </div>
    </footer>
  );
}
