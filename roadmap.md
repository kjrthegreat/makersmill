# Makers Mill — Roadmap

Direction set in the owner meeting (notes: `Untitled document.docx`). Phases are ordered by dependency, not fixed dates.

## Phase 1 — Restructure the homepage
- Open up the layout so it's obvious more pages exist.
- Promote the ticket CTA to the most visible element on the page.
- Communicate the multi-experience nature of Makers Mill above the fold.
- Keep "8 Reasons to Come Back" — expand if it earns the space. ✅ Converted to interactive accordion with expanded copy.
- Audit mobile event sections; they were specifically called out.

## Phase 2 — Build the three sub-pages + business pages
Pages live in the same site, reachable from main nav:
1. **The Stage** — strong photography of stage/venue/live music; ticketing front-and-center. ✅ Done.
2. **Bar / Food & Drink** ✅ Done.
3. **Vendors** (formerly The Store) ✅ Done.

Individual pages for each business inside the Mill — routes under `/businesses/`:
- `/businesses/print-ghost` — Print Ghost print studio ✅ Done.
- `/businesses/pilates` — Pilates studio ✅ Done.
- `/businesses/soul-house` — Soul House ✅ Done.

Each business page follows the same sub-page template (hero, overview, features, CTA, "Also at the Mill"). Copy is placeholder until the business owners provide real info — use general but evocative brand-consistent language for now.

Arcade and Pool get buttons (possibly linking to schedule/calendar) but stay on the homepage. Trivia does not need its own button.

## Phase 3 — Applications & inquiry flows + button functionality
- Add buttons that open external forms for rental space, business space, and vendor inquiries. ✅ Modal system built (ApplyButton, PerformerInquiryButton).
- Surface "businesses within Makers Mill" (Print Ghost, Pilates, Soul House) as their own brands with links — individual pages scaffolded (see Phase 2). ✅ Done.
- **Make all placeholder buttons functional** — currently `href="#"` throughout:
  - Ticket buttons in Hero, Stage page, Events cards → real ticketing URL (pending Phase 5 decision)
  - "Get Event Tickets" CTA in Hero → same ticketing URL
  - Green River Valley Farm "Order Produce" button → GRVF ordering URL
  - Individual event CTAs (Tickets, Event Details) → per-show URLs
  - Business card "Learn More" links on homepage → each business's subpage (Phase 2 pages)
- **Expand Businesses section on homepage** — Businesses.tsx cards should have richer descriptions, a visual identity mark (like a logo initial or color), and link to each business's own page once those are live.
- Each business page should eventually be owner-managed: they supply real photos, hours, and contact info to replace the placeholder copy.

## Phase 4 — Search & online presence
- Clean up / take down outdated pages across the web.
- Improve Google Business profile — target #1 result for relevant searches (currently ~5th).
- Basic SEO pass on the new pages (titles, descriptions, schema for events + local business).

## Phase 5 — Ticketing
- Decide build vs. buy on ticketing.
- Prototype Stripe-based ticket link with a $1 minimum fee model.
- Resolve legal/logistical questions on revenue cuts before going live.

## Phase 6 — Partner site work
- **Green River Valley Farm** — feature on the Makers Mill site, link out to their order/pickup flow.
- **I Love You a Brunch** — scope a separate build with menu display + online ordering.

## Phase 7 — Vendor platform ✅ Core complete (2026-05-22)
The `/vendors` page now pulls live data from Supabase and each vendor has a fully dynamic public page.

### Auth & portal — done
- `/vendor/login`, `/vendor/signup`, `/vendor/reset-password` — email+password auth via Supabase
- Middleware protecting `/vendor/dashboard/*` and `/admin/*`
- Vendor dashboard: profile editor, product manager, settings, preview link
- Admin portal: applications queue, vendor management, product moderation, site settings

### Vendor page customization — done (2026-05-22)
New DB columns added to `vendors` table: `facebook`, `location_in_mill`, `hero_headline`, `hero_subline`, `about_headline`, `accent_color`, `cta_text`, `cta_url`, `gallery_urls` (text[]), `categories` (text[]), `meta_description`.

Profile form expanded to 7 sections: Store Info, Categories (12 types), Contact & Links (incl. Facebook), Images (logo + banner + 6-slot gallery), Page Customization (hero headline, accent color picker, custom CTA), SEO (meta description), Hours.

### File upload — done (2026-05-22)
- Supabase Storage buckets created: `vendor-assets` and `product-images` (both public, 5 MB limit, images only)
- `ImageUpload` component: drag-and-drop or click-to-upload, uploads to Storage, returns permanent public URL, URL paste fallback
- Used in ProfileForm (logo, banner, 6 gallery slots), AdminVendorForm, and ProductForm (up to 5 product photos)

### Admin full vendor edit — done (2026-05-22)
- `/admin/vendors/[id]` — admin can edit every field of any vendor's profile (status, slug, sort order, featured toggle, all content + images + hours) plus see and moderate their products inline

### Public vendor page — done (2026-05-22)
- Renders all new customization fields: accent color, custom hero, categories, gallery, Facebook, CTA, location, SEO meta
- **Section order: Hero → Shop → About → Gallery → slim footer nav** (shop first per Todd)
- Removed boilerplate "Come Find" and "More to Discover" sections that were identical on every page

### Vendor directory — done (2026-05-22)
- Shows up to 2 category tags on each vendor card from DB
- Categories fetched from `vendors.categories` array column

### Later
- Enable product checkout via Stripe (Phase 5 dependency).
- Per-vendor storefronts once payment infrastructure settled.
- Drag-and-drop vendor reorder in admin directory controls.
- "View as vendor" impersonation for admin support.

## Phase 8 — Online vendor checkout (Stripe Connect)
Vendors sell products directly through the site. Makers Mill takes a platform fee on each transaction automatically — no manual payouts.

**Why Stripe Connect (not a single Stripe account):** Each vendor connects their own Stripe account. Money goes directly to them; Makers Mill's platform fee is split at the moment of payment. This avoids the mill holding vendor funds, eliminates complex manual payout tracking, and keeps vendor tax reporting their own responsibility.

### What needs to be built

**Vendor onboarding (Stripe side)**
- Add `stripe_account_id` column to `vendors` table
- "Connect Stripe" button in vendor dashboard → Stripe Connect OAuth flow → save `stripe_account_id` on return
- Show connection status in dashboard (connected / not connected); products can't go to checkout until connected

**Cart + checkout**
- "Add to Cart" button on product cards (replaces "Inquire →" for vendors with Stripe connected)
- Cart stored in localStorage or a lightweight server session
- Checkout via a Next.js API route that creates a Stripe Payment Intent with `transfer_data` pointing to the vendor's connected account and `application_fee_amount` set to Makers Mill's cut
- Stripe-hosted checkout page or embedded Stripe Elements form
- Confirmation page + email receipt (Stripe handles receipt by default)

**Order management**
- New `orders` table: id, vendor_id, customer_email, stripe_payment_intent_id, total_cents, fee_cents, status, created_at
- New `order_items` table: order_id, product_id, quantity, price_cents
- Stripe webhook listener (`/api/webhooks/stripe`): handle `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`, `charge.dispute.created`
- Orders view in vendor dashboard: list of orders, status, customer contact
- Orders view in admin portal: all orders across all vendors, revenue totals

**Platform fee**
- Fee percentage configurable in admin site settings (start at 10% per the advertising model discussion)
- Fee is set at checkout creation time — no manual intervention needed

### Dependencies / blockers before building
- Stripe account for Makers Mill (needs Todd to create/connect)
- Decision on platform fee percentage (10% discussed)
- Refund and dispute policy — who eats chargebacks? Document before launch
- Legal clarity: vendors selling through the platform have tax implications; consult before opening to all vendors
- Terms of service for vendors must be in place

### Current stopgap
Vendors with their own Shopify/Etsy/Square can use the `cta_url` field in their profile to link to their external store. This is already live — no build needed.

### Rough scope
3–4 weeks of focused build. The existing `products` table (prices in cents, vendor_id FK) is already structured correctly for Stripe — no schema changes needed beyond adding `stripe_account_id` to vendors and creating the orders tables.

## Advertising model (parallel track)
Pitch participating vendors/businesses on 10% of sales generated through placements on the Makers Mill site. Needs a tracking mechanism before it can be sold. Phase 8's platform fee mechanism handles the collection side once checkout is live.

---

## Done (this session)
- Section divider bars: symmetric orange glow on both sides of every section break.
- "Eight Reasons to Come Back" converted from card grid to interactive accordion — multiple items can be open simultaneously, copy expanded with made-up detail for all 8 entries.
- Back to Makers Mill button: redesigned as a solid orange button, repositioned to top-left of each sub-page hero (out of the centered hero content). Applied consistently across Stage, Bar & Food, Vendors, Print Ghost, Pilates, and Soul House pages.
- Fixed reveal animation bug on accordion — React re-renders were wiping the IntersectionObserver's `on` class, causing rows to go invisible on click.
