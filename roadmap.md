# Makers Mill — Roadmap

Direction set in the owner meeting. Phases are ordered by dependency, not fixed dates.

> **⚠ 2026-06-19 — Frontend-only rebuild.** The Supabase backend was stripped out to restart that work cleanly. **Phases 5 (ticketing infra), 7 (vendor platform), and 8 (Stripe Connect checkout) are shelved** — their code was removed (still in git history: `1c4e978`, `85d09c4`). The public marketing site (Phases 1–4, 6) stands. New since the strip: Events is now a **static calendar**, `/vendors` is an **"under construction"** page, homepage sections reordered to match the nav, and the Explore cards' hover/seam glitches were fixed. The vendor platform will be rebuilt fresh when that work resumes.

## Phase 1 — Restructure the homepage ✅
- Multi-experience nature communicated above the fold.
- Ticket CTA promoted.
- "8 Reasons to Come Back" converted to interactive accordion.
- Mobile event section audit done.

## Phase 2 — Sub-pages + business pages ✅
- `/stage`, `/bar-food`, `/vendors` — built.
- `/businesses/print-ghost`, `/businesses/pilates`, `/businesses/soul-house` — scaffolded.
- Real copy + photos pending from business owners.

## Phase 3 — Applications & inquiry flows ✅
- `ApplyButton` modal built.
- Performer inquiry button built.
- External form URLs pending from Todd (rental space, business space, vendor inquiry).

## Phase 4 — Search & online presence 🔄
- [x] JSON-LD schema (LocalBusiness + Events) in layout.tsx
- [x] robots.ts + sitemap.ts built
- [ ] Submit sitemap to Google Search Console
- [ ] Claim / update Google Business Profile

## Phase 5 — Ticketing ✅ (infrastructure)
- [x] Stripe Payment Link approach decided
- [x] `getTicketingUrl()` reads from site_settings, wired into Nav, Hero, Events, Stage page
- [x] Admin can update the ticketing URL in Site Settings without a code deploy
- [ ] Todd to paste real Stripe Payment Link in Site Settings

## Phase 6 — Partner site work
- [x] Green River Valley Farm feature block on homepage
- [ ] Real ordering URL from GRVF
- [ ] Scope I Love You a Brunch (menu + online ordering)

## Phase 7 — Vendor platform ✅ Core complete (2026-05-28)

### Auth & portal ✅
- Single login page for vendors + admins; role-aware redirect after auth
- Vendor dashboard: 8-section profile editor, product manager, reservations, settings
- Admin portal: applications, vendors, products, events, reservations, accounts, site settings

### Vendor page customization ✅ (2026-05-28)
Full page design system. Vendors control:
- **Theme** — Dark (default) or Light/Bright — full CSS override system
- **Hero Style** — Full (tall photo), Banner (shorter), Minimal (solid accent color, no photo)
- **Hero Overlay** — Dark / Medium / Light / Color tint
- **Shop Layout** — 3 columns or 2 columns; Grid cards or List rows
- **About Photo** — Right or Left (photo side flip)
- **Promo Banner** — custom text strip shown below hero in accent color
- **Custom shop headline, show/hide gallery, show/hide hours**

All controlled via pill-toggle buttons in the Profile editor — no radio inputs, no alignment issues.

DB columns added (two SQL migrations):
```
page_theme, hero_overlay, shop_columns, shop_headline,
promo_text, promo_active, show_gallery, show_hours,
hero_style, about_photo_side, card_style
```

### Vendor directory cards ✅ (2026-05-28)
Full redesign to professional marketplace standard:
- 210px full-width cover image with gradient overlay
- Logo badge floating in cover footer, 52×52
- Category tags on the overlay
- Featured gold frosted-glass badge (top-right)
- Gradient fallback (accent color → dark) for vendors without a banner
- 2-line description clamp, cubic-bezier hover lift, image zoom

### Commerce system ✅
- **Tier 1 (link-out):** `buy_url` per product → vendor's Squarespace/Etsy/Square
- **Tier 2 (Reserve for Pickup):** modal rendered via React portal (avoids CSS transform bug), stored in DB, vendor + admin dashboards with full status flow

### ImageUpload ✅
- `hint` prop: each upload slot explains exactly where the image appears + recommended dimensions
- Logo, Banner Photo, Gallery Photos each have specific guidance

### Remaining before soft launch
- [ ] Run layout columns SQL migration (hero_style, about_photo_side, card_style)
- [ ] Wire Todd's real Stripe Payment Link into Site Settings
- [ ] Set up Resend for vendor email notifications
- [ ] Announcement banner display on public pages
- [ ] Walk Todd through vendor portal
- [ ] Get first vendors signed up + activated

## Phase 8 — Online vendor checkout (Stripe Connect)
Vendors connect their own Stripe account. Money goes directly to them; Makers Mill's platform fee is split at payment time.

### What needs to be built
**Vendor onboarding:**
- `stripe_account_id` column on vendors table
- "Connect Stripe" button → Stripe Connect OAuth → save account ID
- Dashboard shows connection status; products can't go to checkout until connected

**Cart + checkout:**
- "Add to Cart" on product cards (for Stripe-connected vendors)
- Cart in localStorage or lightweight server session
- Next.js API route: creates Stripe Payment Intent with `transfer_data` + `application_fee_amount`
- Stripe-hosted checkout or embedded Stripe Elements

**Order management:**
- `orders` table (id, vendor_id, customer_email, stripe_payment_intent_id, total_cents, fee_cents, status)
- `order_items` table (order_id, product_id, quantity, price_cents)
- Stripe webhook listener at `/api/webhooks/stripe`
- Orders view in vendor dashboard + admin portal

**Platform fee:**
- Configurable in admin site settings (10% discussed)
- Set at checkout creation time — no manual intervention

### Blockers
- Stripe account for Makers Mill (Todd to create)
- Decision on fee % (10% discussed)
- Refund / dispute policy — document before launch
- Vendor terms of service (legal to draft)
- Tax implications for vendors — consult before opening to all

### Current stopgap
Vendors with Shopify/Etsy/Square use `buy_url` per product to link out. Already live.

### Rough scope
3–4 weeks focused build. The `products` table (prices in cents, vendor_id FK) is already correctly structured — no schema changes beyond `stripe_account_id` on vendors and creating orders tables.

## Advertising model (parallel track)
10% of sales generated via placements. Phase 8's fee mechanism handles collection. Tracking mechanism and vendor one-pager still needed.
