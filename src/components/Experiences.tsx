'use client';
import { useState } from 'react';

// Order intentionally puts Stage / Food / Store / Pool / Arcade / Open Mic / Vintage Finds
// ahead of Trivia — Trivia is kept but de-emphasized per client direction.
const EXPERIENCES = [
  {
    n: '01', icon: '✦', title: 'Live Music',
    desc: "Every Saturday at 7PM, local and regional acts take the stage. We've hosted bluegrass, indie folk, country rock, and everything in between. Tickets are $10 at the door — a steal for a full night of live sound in an intimate room.",
  },
  {
    n: '02', icon: '◆', title: 'Food & Drink',
    desc: "Rotating craft beers on tap, seasonal cocktails, and a kitchen that puts out gourmet sandwiches, charcuterie boards, and fresh-baked desserts. Happy hour runs Monday–Friday 4–6PM with $3 off all drafts.",
  },
  {
    n: '03', icon: '✶', title: 'Local Makers',
    desc: "Over 20 local artisans with booths inside the Mill — handmade ceramics, original paintings, silverwork, soy candles, and handcrafted furniture. New makers join monthly. Everything you buy goes directly to someone in Somerset.",
  },
  {
    n: '04', icon: '⬥', title: 'Pool',
    desc: "Three regulation Brunswick tables in the back hall, open any time the Mill is. League nights run Wednesdays and the competition gets serious. Table fees are $8/hour or $20 for an all-day pass.",
  },
  {
    n: '05', icon: '◈', title: 'Arcade',
    desc: "14 machines including pinball, skee-ball, air hockey, and vintage standup cabinets — all set to free play. High-score boards are tracked and reset every month. No tokens, no quarters. Just play.",
  },
  {
    n: '06', icon: '✷', title: 'Open Mic',
    desc: "First and third Fridays, the main stage is yours. Sign up at the door by 7PM for a 5-minute slot — no genre restrictions, no judgment. We've seen bluegrass, slam poetry, death metal, and stand-up comedy. The crowd loves a surprise.",
  },
  {
    n: '07', icon: '❖', title: 'Vintage Finds',
    desc: "Curated vintage from the 1940s through the 1990s: denim, leather jackets, barware, vinyl records, art deco furniture, and hand-painted signs. Stock rotates weekly. Serious pickers show up Tuesday mornings when new arrivals hit the floor.",
  },
  {
    n: '08', icon: '❂', title: 'Trivia Nights',
    desc: "Every Thursday 7–9PM, hosted by Kyle Kadel. Categories span pop culture, history, local Somerset trivia, and a wildcard round that changes every week. Free entry, teams of any size. First place wins a $50 bar tab.",
  },
];

export function Experiences() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(n: string) {
    setOpen(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  }

  return (
    <section id="experiences">
      <div className="exp-inner">
        <div className="exp-head rev">
          <div className="label">What&apos;s Inside</div>
          <h2 className="exp-h">
            Eight Reasons
            <br />
            to Come Back.
          </h2>
          <p className="exp-sub">You&apos;ll find something new every time you walk through the door.</p>
        </div>
        <div className="exp-accordion">
          {EXPERIENCES.map((e) => {
            const isOpen = open.has(e.n);
            return (
              <div key={e.n} className={`exp-acc-item${isOpen ? ' open' : ''}`}>
                <button
                  type="button"
                  className="exp-acc-head"
                  onClick={() => toggle(e.n)}
                  aria-expanded={isOpen}
                >
                  <span className="exp-acc-n">{e.n}</span>
                  <span className="exp-acc-icon">{e.icon}</span>
                  <span className="exp-acc-title">{e.title}</span>
                  <span className="exp-acc-chevron" aria-hidden="true">+</span>
                </button>
                <div className="exp-acc-body">
                  <p className="exp-acc-desc">{e.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
