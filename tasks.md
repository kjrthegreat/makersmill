# Makers Mill — Task Backlog

Grouped by area. Status: `[ ]` open, `[~]` in progress, `[x]` done.

> **⚠ 2026-06-19 — Frontend-only rebuild.** The Supabase backend was removed. The **"Vendor Portal" section below is archived** — none of that code exists in the current tree (it lives in git history). The `/vendors` directory items are superseded by an "under construction" placeholder. Active work is now the static marketing site only.

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
- [x] Page built matching site design language
- [x] Ticketing URL wired to "Get Tickets" buttons
- [ ] Hero photo of the stage / live performance (real photo needed from Todd)
- [ ] Upcoming shows from real events feed

## Sub-page: Bar / Food & Drink
- [x] Page built
- [ ] Real menu or link to PDF/online menu (from Todd)

## Sub-page: The Store / Vendors
- [x] `/vendors` directory — live from Supabase
- [x] `/vendors/[slug]` — fully dynamic per-vendor pages

## Applications & inquiries
- [ ] Rental space application button → external form URL (from Todd)
- [ ] Business space application button → external form URL (from Todd)
- [ ] Vendor inquiry button → external form URL (from Todd)
- [x] `ApplyButton` modal component built

## Businesses inside Makers Mill
- [x] `/businesses/print-ghost`, `/businesses/pilates`, `/businesses/soul-house` — scaffolded
- [ ] Real copy + photos from each business owner

## SEO / online presence
- [ ] Claim / polish Google Business Profile (photos, hours, categories, posts)
- [ ] Submit sitemap to Google Search Console
- [x] LocalBusiness + Event JSON-LD schema — in layout.tsx
- [x] Page titles, meta descriptions, OG tags on all pages
- [x] robots.ts + sitemap.ts built

## Ticketing
- [x] Stripe Payment Link approach decided (no custom checkout build)
- [x] `getTicketingUrl()` utility built — reads from site_settings, used in Nav/Hero/Events/Stage
- [ ] Todd to paste real Stripe Payment Link into Admin → Site Settings → Ticketing URL
- [ ] Legal sign-off on revenue-share structure

## Partner sites
- [x] Green River Valley Farm feature block on homepage
- [ ] Real ordering URL from Green River Valley Farm
- [ ] Scope I Love You a Brunch site (menu + online ordering)

## Advertising model
- [ ] Decide tracking method for "10% of sales via placement"
- [ ] Draft a one-pager for vendors explaining the deal

---

## Vendor Portal — Status as of 2026-05-28

### Stack ✅
- **Auth + DB:** Supabase (auth, Postgres, Storage)
- **File storage:** `vendor-assets` + `product-images` buckets (public, 5 MB limit)
- **Deployment:** Vercel-compatible (Next.js 15 App Router SSR)

### Database schema ✅
```
vendors: id, user_id, slug, name, tagline, description, logo_url, banner_url,
         contact_email, phone, website, instagram, facebook, location_in_mill,
         hero_headline, hero_subline, about_headline, accent_color, cta_text, cta_url,
         gallery_urls[], categories[], meta_description,
         page_theme, hero_style, hero_overlay, about_photo_side,
         shop_columns, card_style, shop_headline,
         promo_text, promo_active, show_gallery, show_hours,
         buy_url, status, featured, sort_order

vendor_hours: vendor_id, day_of_week (0–6), open_time, close_time, closed
products: id, vendor_id, name, description, price (cents), category, stock_qty,
          buy_url, status, sort_order
product_images: id, product_id, url, sort_order
vendor_applications: id, applicant_email, business_name, description, submitted_at,
                     reviewed_at, reviewed_by, decision, rejection_reason
reservations: id, product_id, vendor_id, product_name, vendor_name,
              customer_name, customer_email, customer_phone, message, status, created_at
events: id, name, type, detail, recurring, recurring_day, event_date, time_label,
        tag, cta_label, cta_url, accent_color, status, sort_order
site_settings: key, value (JSONB)
profiles: id (FK auth.users), role (vendor|admin)
```

### Auth system ✅
- [x] `/vendor/login` (shared vendor + admin, role-aware redirect), `/vendor/signup`, `/vendor/reset-password`
- [x] Middleware protecting `/vendor/dashboard/*` and `/admin/*`
- [x] Auto-creates `profiles` row on signup via DB trigger

### Vendor dashboard ✅
- [x] Profile editor — 8 sections: Store Info, Categories, Contact & Links, Images, Page Customization, SEO, Page Design, Hours
- [x] Product manager: list, add, edit (buy_url + images), publish/unpublish, delete
- [x] Reservations dashboard: view incoming holds, confirm/cancel/complete
- [x] Account settings: change email, change password, delete account
- [x] Preview link → public vendor page (active vendors only)

### Vendor page customization ✅ (2026-05-28)
**Profile fields:**
- [x] Accent color (color picker)
- [x] Hero headline + sub-headline
- [x] About section headline
- [x] Custom CTA button (text + URL)
- [x] Location in mill
- [x] Categories (12 types, multi-select)
- [x] Meta description

**Page Design section — pill-toggle UI:**
- [x] Theme: Dark / Light
- [x] Hero Style: Full / Banner / Minimal
- [x] Hero Overlay: Dark / Medium / Light / Color tint
- [x] About Photo: Right / Left
- [x] Shop Columns: 3 / 2
- [x] Product Cards: Grid / List
- [x] Gallery Section: Show / Hide
- [x] Hours Section: Show / Hide
- [x] Shop Headline (custom text)
- [x] Promo Banner (text + On/Off)

### ImageUpload ✅
- [x] Drag-and-drop or click-to-upload, URL paste fallback, live preview
- [x] `hint` prop — each slot explains exactly where the image appears and recommended dimensions
- [x] Used in: Profile (logo, banner, 6 gallery slots), Admin vendor edit, Product form (5 photos)

### Vendor directory ✅ (2026-05-28)
- [x] Card redesign: 210px cover image + gradient overlay + logo badge + category tags
- [x] Featured gold badge (top-right of cover)
- [x] Gradient fallback using vendor's own accent color (no banner = still distinctive)
- [x] Vendor's own accent_color used on card; ACCENT_COLORS array is fallback only
- [x] Description 2-line clamp, cubic-bezier hover lift, image zoom on hover

### Commerce system ✅
- [x] Tier 1: `buy_url` per product — links to vendor's Squarespace/Etsy/Square store
- [x] Tier 2: Reserve for Pickup — modal (portal-rendered to avoid transform bug), DB storage
- [x] Vendor + admin reservation dashboards with status flow (pending → confirmed → completed/cancelled)

### Admin portal ✅
- [x] Dashboard with live stat cards (vendors, products, events, users)
- [x] Applications queue (approve/reject)
- [x] Vendor list + full edit page
- [x] All products (publish/unpublish/delete)
- [x] Events CRUD
- [x] Reservations (all vendors)
- [x] Accounts (list all users, change role, reset password, delete)
- [x] Site Settings (announcement banner, ticketing URL, platform fee %)

### Remaining / future
- [ ] **Run layout columns SQL migration** (hero_style, about_photo_side, card_style)
- [ ] Announcement banner display on public pages (saves to DB, not shown yet)
- [ ] Drag-and-drop vendor reorder in admin
- [ ] "View as vendor" impersonation for admin support
- [ ] Vendor notification emails (Resend SMTP)
- [ ] Admin email on new vendor application
- [ ] Product filter bar on public vendor page
- [ ] Stripe Connect (Phase 8)
- [ ] Terms of service for vendors
