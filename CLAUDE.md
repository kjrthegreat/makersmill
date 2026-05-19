# Makers Mill — Project Context

Somerset, KY venue/marketplace site. Original build was a single `index.html`; migrated to a Next.js app on 2026-05-17 to make multi-page expansion (Stage, Bar, Store sub-pages) straightforward.

## Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- Plain global CSS — no Tailwind. All styles live in `src/app/globals.css` and preserve the original hand-crafted design system.
- No backend yet. Site is static — `next build` output deploys cleanly to Cloudflare Pages, Vercel, or any static host.
- Repo: `zak1269/makersmill`.

## Setup
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## File layout
```
src/
├── app/
│   ├── layout.tsx        — root layout, font preconnect, RevealObserver mount
│   ├── globals.css       — full design system + section styles
│   ├── page.tsx          — homepage composition
│   ├── stage/page.tsx    — placeholder (per roadmap)
│   ├── bar/page.tsx      — placeholder (per roadmap)
│   └── store/page.tsx    — placeholder (per roadmap)
└── components/
    ├── Nav.tsx           — client; scroll state, mobile menu, active-section highlight
    ├── RevealObserver.tsx — client; IntersectionObserver for `.rev/.rev-l/.rev-r` reveal classes
    ├── Hero.tsx, About.tsx, Experiences.tsx, Events.tsx,
    ├── Gallery.tsx, Community.tsx, Visit.tsx, Contact.tsx, Footer.tsx
public/
└── acorn.png             — extracted from the original inline base64 logo
```

## Design language (locked in)
- Fonts: Playfair Display (display), Barlow (body), Barlow Condensed (UI), Special Elite (stamps) — loaded via Google Fonts in `layout.tsx`.
- Palette in `:root` of `globals.css` — ink/wood warm-dark, orange `#c4571a` accent, cream `#f0e8d6` foreground.
- Grain overlay (SVG noise on `body::after`), warm radial glows, and reveal-on-scroll animations are part of the brand feel.
- Reference site Todd likes: The Burl (Lexington) — use for layout/structure cues on new pages.

## Conventions
- New top-level pages live under `src/app/<route>/page.tsx`. Reuse `<Nav />` and `<Footer />`.
- Section-level content stays in `src/components/`. Keep data arrays at the top of each component until they're needed in two places.
- Remote photos load from `rcmediaservices.net` (whitelisted in `next.config.mjs`). Inline `<img>` is fine for now — `next/image` is only used for the local acorn.
- Anchor links (`/#about`) work across pages because the homepage owns those ids.
- External applications/inquiries should open in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Mobile-first for event sections.

## Active goals (from owner meeting)
1. Clarify that Makers Mill is **multiple experiences**, not one venue — surface this on the homepage.
2. Make ticket purchase the most visible CTA.
3. Add application/inquiry buttons that open external forms (rental space, business space, vendor inquiries).
4. Improve Google Business ranking — currently ~5th, goal is #1.
5. Build out the three sub-pages: **Bar / Food & Drink**, **The Store**, **The Stage** (routes scaffolded as placeholders).

## Distinct businesses inside Makers Mill
Treat as standalone brands, not vendors: **Print Ghost**, **Pilates**, **Soul House**. Possible 10% revenue-share advertising model for promoted placements.

## Adjacent Todd projects (may get their own builds later)
- **Green River Valley Farm** — online produce ordering + pickup; link from Makers Mill site.
- **I Love You a Brunch** — potential separate build with menu + online ordering.

## Deal structure (for internal reference)
- 20% on deals ≥ $800
- 10% on deals < $800

## Ticketing
Current: $10 ticket → ~$14.50 checkout after tax/fees. Exploring custom link via Stripe with a $1 minimum fee model. Legal/logistics still open.

## Companion docs
- `roadmap.md` — phased plan
- `tasks.md` — grouped backlog
- `todo.md` — active short-list
