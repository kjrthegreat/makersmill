# Makers Mill — Project Context

Somerset, KY venue/marketplace site. Original build was a single `index.html`; migrated to a Next.js app on 2026-05-17 to make multi-page expansion (Stage, Bar, Store sub-pages) straightforward.

## Current state — frontend-only rebuild (2026-06-19)
The Supabase backend (auth, DB, Storage, vendor portal, admin panel, reservations, live events) was **stripped out on 2026-06-19** to restart that work from a clean frontend baseline. The site is now a **static, no-backend marketing site**. The removed backend still lives in git history (commits `1c4e978`, `85d09c4`) if it needs referencing during the rebuild.

What this means today:
- No auth, database, server actions, middleware, or `/admin` / `/vendor` routes.
- **Events** is a self-contained **static calendar** (`src/components/Events.tsx`) — month grid showing event titles per date, a "today" indicator, and an upcoming-events side list. Event data is the `EVENTS` array at the top of the file.
- **Vendor directory** (`/vendors`) is an **"under construction"** page; the dynamic per-vendor pages were removed. Static vendor data is parked in `src/lib/vendors.ts` for the eventual rebuild.
- The ticketing link is a static constant — `TICKETS_URL` in `src/lib/site.ts` (placeholder `'#'`).
- Homepage section order matches the nav order: Hero → About → Events → ExploreMill → Experiences → Businesses → Gallery → Region → Visit.

## Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- Plain global CSS — no Tailwind. All styles live in `src/app/globals.css` and preserve the original hand-crafted design system.
- ~~Supabase~~ — **removed 2026-06-19** (see Current state). No backend services; nothing to configure to run the site.
- Repo: `kjrthegreat/makersmill`.

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
│   ├── layout.tsx              — root layout, font preconnect, JSON-LD, RevealObserver mount
│   ├── globals.css             — full design system + all section styles (incl. events calendar)
│   ├── page.tsx                — homepage composition (nav-ordered sections)
│   ├── stage/page.tsx          — The Stage sub-page
│   ├── bar-food/page.tsx       — Bar & Food sub-page
│   ├── vendors/page.tsx        — "under construction" placeholder (directory shelved)
│   ├── businesses/
│   │   ├── print-ghost/page.tsx
│   │   ├── pilates/page.tsx
│   │   └── soul-house/page.tsx
│   ├── robots.ts               — robots.txt generation
│   └── sitemap.ts              — sitemap (static routes only)
├── components/
│   ├── Nav.tsx                 — client; scroll state, mobile menu, tickets link
│   ├── Footer.tsx
│   ├── RevealObserver.tsx      — client; IntersectionObserver for .rev/.rev-l/.rev-r
│   ├── Hero.tsx, About.tsx, ExploreMill.tsx, Events.tsx (calendar, client),
│   │   Experiences.tsx, Businesses.tsx, Gallery.tsx, RegionFeature.tsx, Visit.tsx
│   ├── Modal.tsx               — client; shared modal shell (Esc / overlay-click close)
│   ├── ApplyButton.tsx / ApplyForm.tsx                 — client; "apply for a space" modal (no backend; placeholder submit)
│   └── PerformerInquiryButton.tsx / PerformerForm.tsx  — client; performer inquiry modal (no backend)
├── lib/
│   ├── site.ts                 — TICKETS_URL + site-wide constants
│   └── vendors.ts              — parked static vendor data (unused; for the future vendor rebuild)
public/
└── acorn.png                   — extracted from the original inline base64 logo
```

## Design language (locked in)
- Fonts: Playfair Display (display), Barlow (body), Barlow Condensed (UI), Special Elite (stamps) — loaded via Google Fonts in `layout.tsx`.
- Palette in `:root` of `globals.css` — ink/wood warm-dark, orange `#c4571a` accent, cream `#f0e8d6` foreground.
- Grain overlay (SVG noise on `body::after`), warm radial glows, and reveal-on-scroll animations are part of the brand feel.
- Reference site Todd likes: The Burl (Lexington) — use for layout/structure cues on new pages.

## Conventions
- New top-level pages live under `src/app/<route>/page.tsx`. Reuse `<Nav />` and `<Footer />`.
- Section-level content stays in `src/components/`. Keep data arrays at the top of each component until they're needed in two places.
- Remote photos load from `rcmediaservices.net` (whitelisted in `next.config.mjs`). Inline `<img>` is fine — `next/image` is only used for the local acorn. NOTE: these rcmediaservices photos are heavy HDR/tone-mapped placeholders with baked-in grain — swap for real venue photos when available.
- Anchor links (`/#about`) work across pages because the homepage owns those ids; keep the homepage section order matched to the nav order.
- External applications/inquiries should open in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Mobile-first for event sections.
- The single ticketing link lives in `src/lib/site.ts` (`TICKETS_URL`), consumed by Nav, Footer, Hero, Events, and the Stage page.
- Image URL fields use `||` not `??` for fallbacks — empty string `""` should still fall through to the default image.

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
The backend-driven `getTicketingUrl()` was removed in the 2026-06-19 rebuild — the link is now the static `TICKETS_URL` constant in `src/lib/site.ts` (`'#'` until the real Stripe link exists).

## Companion docs
- `roadmap.md` — phased plan
- `tasks.md` — grouped backlog
- `todo.md` — active short-list
- `concerns.md` — archived backend concerns (parked until the backend is rebuilt)
