# TODO — This Week

Short active list. Pull from `tasks.md` as items finish.

> **2026-06-19 — backend stripped; site is frontend-only.** Old backend tasks are archived in `concerns.md` / `tasks.md`. Current focus is the static marketing site.

## Done — 2026-06-19 rebuild
- [x] Strip the Supabase backend (auth, DB, Storage, vendor portal, admin, reservations, server actions, middleware)
- [x] Rewire public pages off Supabase; static `Nav`; ticketing via `TICKETS_URL` in `src/lib/site.ts` (no more `getTicketingUrl()`)
- [x] Rebuild Events as a static **calendar** — month grid with event titles, "today" indicator + jump button, upcoming side list
- [x] `/vendors` → "under construction" page; removed dynamic per-vendor pages; trimmed sitemap
- [x] Reorder homepage sections to match nav order (Hero → About → Events → Explore → …)
- [x] Fix Explore card hover ghosting + photo/body seam
- [x] Remove `@supabase/*` deps; production build green

## Now
- [ ] Replace HDR placeholder photos (`rcmediaservices.net`) with cleaner real venue photos — they carry baked-in grain
- [ ] Replace the sample events in `src/components/Events.tsx` (`EVENTS` array) with the real schedule
- [ ] When that work resumes, plan the vendor-platform rebuild (directory is "under construction")

## Waiting on Todd (blockers)
- [ ] **Ticketing URL** — real Stripe Payment Link (set `TICKETS_URL` in `src/lib/site.ts`)
- [ ] **External form provider** — Tally / Typeform / Google Forms — and form URLs for:
  - Rental / business space application
  - Vendor / seller application
  - Stage / performer inquiry
- [ ] **Real photos** for the Stage hero, Bar & Food hero, and the Explore cards
- [ ] **Print Ghost / Pilates / Soul House** — confirm copy, supply real links/logos
- [ ] **Green River Valley Farm** — real ordering URL + optional logo
- [ ] **Real events** — replace the sample `EVENTS` array in `Events.tsx` and the shows on `/stage`

## Next
- [ ] Claim / update Google Business Profile
- [ ] Submit sitemap + robots.txt to Search Console
- [ ] Add LocalBusiness + Event JSON-LD schema
- [ ] Drag-and-drop vendor reorder in admin (currently sort_order number input)
- [ ] Product filter bar on public vendor page (filter by category)
- [ ] Resend SMTP integration for vendor welcome / rejection emails

## Done
- [x] Capture meeting notes into `roadmap.md` / `tasks.md` / `CLAUDE.md`
- [x] Migrate static `index.html` to Next.js 15 + React 19 + TypeScript (App Router)
- [x] Split homepage into per-section components
- [x] Extract acorn logo PNG to `public/acorn.png`
- [x] Homepage edits: new Nav with Tickets CTA, Hero CTA rebalance, Explore-the-Mill, reordered 8 Reasons, Stage Teaser, Events with ticket CTAs, Businesses at the Mill, Green River Valley Farm feature, Inquiry section, updated Footer
- [x] Build `/stage`, `/bar-food`, `/store` sub-pages
- [x] QA pass: hero h1 fixes, section scroll-margin, hamburger accessibility, cross-links

### Vendor portal — done 2026-05-22
- [x] Supabase auth + DB + Storage; middleware protecting dashboard + admin routes
- [x] Vendor dashboard: profile editor (8 sections), product manager, settings, preview link
- [x] Admin portal: applications queue, vendor list, all products, events, reservations, accounts, site settings
- [x] Public `/vendors` directory + `/vendors/[slug]` dynamic pages
- [x] Reservation system: Reserve for Pickup modal (portal fix), vendor + admin dashboards, status flow
- [x] Ticketing URL: stored in site_settings, fetched via getTicketingUrl(), wired into Nav, Hero, Events, Stage page
- [x] Portal login: single login page for vendors + admins; role-aware redirect after auth
- [x] Account management: admin can list all users, change roles, reset passwords, delete accounts

### Vendor page customization — done 2026-05-28
- [x] Page Design section in Profile editor rebuilt with pill-toggle UI (no radio inputs, no alignment issues)
- [x] Page theme: Dark / Light — full CSS override system for light mode across all sections
- [x] Light mode audit: fixed reserve button contrast, category badge, social links, section glow, footer links
- [x] Hero style: Full / Banner / Minimal (solid accent color bg, no photo)
- [x] Hero overlay: Dark / Medium / Light / Color tint
- [x] Shop columns: 3 / 2
- [x] Product card style: Grid / List (horizontal image-left layout)
- [x] About photo side: Right / Left (CSS order flip)
- [x] Promo banner: text + On/Off toggle, shown below hero in accent color
- [x] Shop headline: custom override
- [x] Show/hide Gallery section toggle
- [x] Show/hide Hours section toggle
- [x] SQL migration run: 8 columns (page_theme, hero_overlay, shop_columns, shop_headline, promo_text, promo_active, show_gallery, show_hours)
- [x] SQL migration run: 3 layout columns (hero_style, about_photo_side, card_style) — **confirm run**

### Vendor directory cards — done 2026-05-28
- [x] Full redesign: cover image (210px) with gradient overlay, logo badge in cover footer, category tags on overlay
- [x] Featured gold badge in top-right corner of cover
- [x] Gradient fallback (accent color → ink) for vendors without a banner photo
- [x] Description 2-line clamp, premium hover lift animation
- [x] Query updated to fetch banner_url + accent_color; vendor's own accent_color used instead of rotating fallbacks

### ImageUpload improvements — done 2026-05-28
- [x] Added hint prop to ImageUpload component
- [x] Logo: explains directory card badge + vendor page placement, size guidance
- [x] Banner Photo: explains header background + directory card cover, size guidance
- [x] Gallery: section-level hint explaining where photos appear
