'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type NavItem = { href: string; label: string; sectionId?: string };

const NAV_LINKS: NavItem[] = [
  { href: '/#about', label: 'About', sectionId: 'about' },
  { href: '/#events', label: 'Events', sectionId: 'events' },
  { href: '/stage', label: 'The Stage' },
  { href: '/bar-food', label: 'Bar & Food' },
  { href: '/vendors', label: 'Vendors' },
  { href: '/#visit', label: 'Visit', sectionId: 'visit' },
  { href: 'mailto:makersmillsomerset@gmail.com', label: 'Contact' }
];

// TODO: replace '#' with the real ticketing URL when available
const TICKETS_HREF = '#';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      let current = '';
      document.querySelectorAll<HTMLElement>('section[id]').forEach((s) => {
        if (window.scrollY >= s.offsetTop - 180) current = s.id;
      });
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [mobOpen]);

  const closeMob = () => setMobOpen(false);

  return (
    <>
      <div
        id="mob-menu"
        className={`mob-menu${mobOpen ? ' open' : ''}`}
        aria-hidden={!mobOpen}
      >
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={closeMob}>
            {l.label}
          </Link>
        ))}
        <Link href={TICKETS_HREF} onClick={closeMob} className="mob-cta">
          Tickets
        </Link>
      </div>

      <nav id="nav" className={scrolled ? 'scrolled' : undefined}>
        <Link href="/" className="nav-logo">
          <Image
            className="nav-acorn"
            src="/acorn.png"
            alt="Makers Mill acorn logo"
            width={38}
            height={38}
            priority
          />
          <div className="nav-brand-wrap">
            <div className="nav-name">The Makers Mill</div>
            <div className="nav-sub">Somerset, Kentucky</div>
          </div>
        </Link>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => {
            const isActive = !!l.sectionId && l.sectionId === activeSection;
            const style = isActive ? { color: 'var(--orange)' } : undefined;
            return (
              <li key={l.href}>
                <Link href={l.href} style={style}>
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href={TICKETS_HREF} className="nav-cta">
              Tickets
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="hamburger"
          onClick={() => setMobOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobOpen}
          aria-controls="mob-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </>
  );
}
