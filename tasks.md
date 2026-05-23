# Makers Mill — Task Backlog

Grouped by area. Status: `[ ]` open, `[~]` in progress, `[x]` done.

## Homepage
- [ ] Restructure layout so multi-page nature is obvious at first glance
- [ ] Make ticket CTA the highest-contrast element above the fold
- [ ] Add a "what's inside Makers Mill" overview (Stage, Bar, Store, Arcade, Pool)
- [ ] Keep / expand "8 Reasons to Come Back" section
- [ ] Add Arcade button (link to schedule if available)
- [ ] Add Pool button (link to schedule if available)
- [ ] Remove or de-emphasize Trivia as a primary nav item
- [ ] Audit and polish event sections on mobile

## Navigation
- [ ] Add nav links for `/stage`, `/bar`, `/store`
- [ ] Confirm hamburger menu order and labels match new IA
- [ ] Add visible "Tickets" CTA in nav (already present — verify prominence)

## Sub-page: The Stage
- [ ] New page `stage.html` matching site design language
- [ ] Hero photo of the stage / live performance
- [ ] Upcoming shows list with ticket buttons
- [ ] Photo gallery (venue + atmosphere)
- [ ] Booking inquiry button → external form

## Sub-page: Bar / Food & Drink
- [ ] New page `bar.html`
- [ ] Menu (or link to PDF/online menu)
- [ ] Hours
- [ ] Photos of space + food/drink

## Sub-page: The Store
- [ ] New page `store.html`
- [ ] Vendor / business directory (Print Ghost, Pilates, Soul House as anchor brands)
- [ ] Hours + how to find each business inside the building
- [ ] Vendor inquiry button → external form

## Applications & inquiries
- [ ] Rental space application button → external form
- [ ] Business space application button → external form
- [ ] Vendor inquiry button → external form
- [ ] Decide form provider (Tally / Typeform / Google Forms / Stripe-linked)

## Businesses inside Makers Mill
- [ ] Print Ghost section/page with link out
- [ ] Pilates section/page with link out
- [ ] Soul House section/page with link out
- [ ] Decide placement: dedicated section on Store page vs. own sub-pages

## SEO / online presence
- [ ] Inventory all existing Makers Mill web properties
- [ ] Take down or redirect outdated pages
- [ ] Claim / polish Google Business Profile (photos, hours, categories, posts)
- [ ] Add LocalBusiness + Event JSON-LD schema to relevant pages
- [ ] Set page titles, meta descriptions, OG tags on every page
- [ ] Submit sitemap to Google Search Console

## Ticketing
- [ ] Document current ticketing flow + total fee breakdown ($10 → ~$14.50)
- [ ] Prototype Stripe Checkout link for a single event
- [ ] Decide on $1 minimum fee model vs. percentage
- [ ] Get legal sign-off on revenue-share structure

## Partner sites
- [ ] Add Green River Valley Farm feature block + outbound link
- [ ] Scope I Love You a Brunch site (menu + online ordering)

## Advertising model
- [ ] Decide tracking method for "10% of sales via placement"
- [ ] Draft a one-pager for vendors explaining the deal

---

## Vendor Portal — Status as of 2026-05-22
> Core platform is live. Remaining items below are future enhancements.

### Stack — decided & done ✅
- **Auth + DB:** Supabase (auth, Postgres, Storage)
- **File storage:** Supabase Storage — `vendor-assets` + `product-images` buckets (public, 5 MB limit)
- **Deployment:** Vercel-compatible (Next.js 15 App Router SSR)

### Database schema — done ✅
- `profiles` — id (FK auth.users), role (`vendor`|`admin`)
- `vendors` — id, user_id, slug, name, tagline, description, logo_url, banner_url, contact_email, phone, website, instagram, facebook, location_in_mill, hero_headline, hero_subline, about_headline, accent_color, cta_text, cta_url, gallery_urls (text[]), categories (text[]), meta_description, status, featured, sort_order, created_at, updated_at
- `vendor_hours` — vendor_id, day_of_week (0–6), open_time, close_time, closed
- `products` — id, vendor_id, name, description, price (cents), category, stock_qty, status, sort_order, created_at
- `product_images` — id, product_id, url, sort_order
- `vendor_applications` — id, applicant_email, business_name, description, submitted_at, reviewed_at, reviewed_by, decision, rejection_reason
- RLS enabled on all tables; `get_my_role()` SECURITY DEFINER function prevents recursive RLS

### Auth system — done ✅
- [x] `/vendor/login`, `/vendor/signup`, `/vendor/reset-password`
- [x] Supabase SSR cookie-based sessions (`@supabase/ssr`)
- [x] Middleware protecting `/vendor/dashboard/*` and `/admin/*`
- [x] Auto-creates `profiles` row on signup via DB trigger

### Vendor dashboard — done ✅
- [x] Sidebar layout (collapses to bottom tab bar on mobile)
- [x] Dashboard home: stat cards (products, published, pending status)
- [x] Profile editor (7 sections — see vendor customization below)
- [x] Product manager: list, add, edit, delete, publish/unpublish
- [x] Preview link → `/vendors/[slug]` in new tab (active vendors only)
- [x] Account settings: change email, change password, delete account

### Vendor page customization — done ✅ (2026-05-22)
- [x] Categories: 12 types, multi-select checkboxes, shown on directory cards
- [x] Location in mill: shown in hero tagline and visit section
- [x] Hero headline + sub-headline: custom override of the default name-split
- [x] About section headline: custom override of "Made by Hand. Found Here."
- [x] Accent color: color picker, applied to headings, prices, highlights throughout public page
- [x] Custom CTA: text + URL for a branded button in the hero
- [x] Facebook link alongside Instagram + website
- [x] Gallery: up to 6 images displayed as a photo grid section on vendor page
- [x] Meta description: custom text for Google search results

### File upload — done ✅ (2026-05-22)
- [x] `ImageUpload` component: drag-and-drop, click-to-upload, live preview, URL paste fallback
- [x] Used in ProfileForm (logo, banner, 6 gallery slots), AdminVendorForm, ProductForm (5 product photos)
- [x] Storage policies: public read, authenticated upload, owner delete

### Public vendor pages — done ✅
- [x] `/vendors/[slug]` — dynamic SSR from DB; notFound() for inactive/missing vendors
- [x] Section order: Hero → Shop → About → Gallery → slim footer nav
- [x] Hero: custom headline, accent color, category tags, location, custom CTA
- [x] Shop: product grid with photos, prices, per-product inquiry mailto
- [x] About: description, social links (Instagram, Facebook, website), hours with today highlighted
- [x] Gallery: renders up to 6 photos from `gallery_urls` column
- [x] Slim footer nav: "← Back to All Vendors" + "Makers Mill Home"

### Vendor directory — done ✅
- [x] `/vendors` — active vendors from DB (featured first, then sort_order, then name)
- [x] Category tags shown on each vendor card (up to 2)
- [x] Logo image or initial letter fallback

### Admin portal — done ✅
- [x] `/admin` — dashboard with stat cards
- [x] `/admin/applications` — approve/reject vendor applications
- [x] `/admin/vendors` — list all vendors, inline activate/suspend/feature/delete + Edit link
- [x] `/admin/vendors/[id]` — full edit of any vendor: all profile fields + admin controls (status, slug, sort order, featured) + products table
- [x] `/admin/products` — all products across all vendors, publish/unpublish/delete
- [x] `/admin/settings` — site settings panel

### Remaining / future
- [ ] Drag-and-drop vendor reorder in admin (currently uses sort_order number input)
- [ ] "View as vendor" impersonation for admin support
- [ ] Vendor notification emails (welcome, rejection) — needs custom SMTP (Resend recommended)
- [ ] Admin email notification on new application
- [ ] Product filter bar on public vendor page (filter by category)
- [ ] Stripe checkout for products (Phase 5 dependency)
- [ ] Terms of service for vendors (Todd/legal to draft)
