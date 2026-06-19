# Concerns — Backend & Frontend  ·  ARCHIVED

> **⚠ ARCHIVED 2026-06-19.** The Supabase backend these concerns describe was **removed** in the frontend-only rebuild. None of the code below exists in the current tree — it's preserved here as a checklist for **if/when the backend is rebuilt**. Items 6–10 (frontend/UX) also referenced the removed vendor pages.

Logged 2026-05-28. These were not blocking and should be revisited before any future public launch or vendor onboarding push.

---

## Backend / Data

### 1. Layout SQL migration unconfirmed
`hero_style`, `about_photo_side`, and `card_style` were added to the codebase but the SQL migration has NOT been confirmed run. The vendor page will silently break or throw a runtime error for those fields until this is executed in Supabase:
```sql
alter table public.vendors
  add column if not exists hero_style text default 'full',
  add column if not exists about_photo_side text default 'right',
  add column if not exists card_style text default 'grid';
```

### 2. No image size or dimension enforcement
The `vendor-assets` bucket has a 5 MB file size limit, but there is no dimension or aspect ratio validation. A vendor can upload a 300×300px image as their banner and it will display poorly on the directory card cover (210px tall, full-width) and the hero. The upload hints help but nothing blocks a bad upload.
**Fix:** Add client-side dimension checks in `ImageUpload.tsx` before uploading, and/or show a warning if the image is too small.

### 3. No rate limiting on reservations
`createReservation` uses the service role client (bypasses RLS) because customers are not authenticated — correct behavior. But there is no rate limiting, so a bad actor can flood a vendor's reservation inbox with junk submissions from the public form.
**Fix:** Add a server-side check (IP + timestamp, or a simple honeypot field) or integrate Cloudflare Turnstile/reCAPTCHA on the Reserve for Pickup modal.

### 4. `site_settings` has no type safety
Values are stored as raw JSON strings and parsed at runtime inside a `try/catch`. If the ticketing URL is saved as malformed JSON, `getTicketingUrl()` silently returns `'#'` with no alert to the admin — every "Get Tickets" button on the site silently breaks.
**Fix:** Validate and sanitize the value before saving in `saveSettings()`, and show a visible error in the admin Settings form if the URL is invalid.

### 5. Vendor slug regenerates on every profile save
Slugs are auto-generated from the store name each time the profile is saved. If a vendor renames their store, their public URL changes — any external links, Google indexing, or QR codes pointing to the old URL get a 404.
**Fix:** Only generate the slug on first save (when no vendor record exists yet). After that, let the admin change it deliberately via the Admin → Vendor edit page.

---

## Frontend / UX

### 6. No loading or skeleton state on vendor directory
The `/vendors` page is server-rendered (good), but if Supabase is slow the user sees nothing until the full page loads. No skeleton cards or loading indicator.
**Fix:** Low priority for now, but consider adding a CSS skeleton shimmer to the `vgrid` for perceived performance.

### 7. Light theme doesn't affect the hero
`page_theme = 'light'` flips the Shop, About, Gallery, and Footer sections to cream, but the hero always stays dark. That's intentional for readability over a photo, but vendors picking "Light" may expect the whole page to feel bright.
**Fix:** Document this in the Page Design UI — add a small hint on the Theme pill: *"Hero section always stays dark for readability."*

### 8. Announcement banner is not displayed on public pages
The global announcement banner saves to `site_settings` via the Admin → Site Settings form, but nothing on the public site reads or renders it yet. The setting is wired to the DB but effectively dead.
**Fix:** Add a server component to `src/app/layout.tsx` (or a shared `AnnouncementBanner` component) that reads the `announcement_text` and `announcement_active` settings and renders a top bar when active.

### 9. Reserve button width in list card mode needs real-world testing
In product list mode, `.feat-card-list-body .feat-reserve-btn { width: auto }` overrides the default `width: 100%`. This hasn't been tested with a real vendor who has multiple products with buy_url + reserve + inquire all active at once. The action row could wrap badly on narrow screens.
**Fix:** Test with a real vendor's products. May need `flex-wrap: wrap` + `min-width` on the action buttons.

### 10. No empty-state nudge for vendors with zero published products
If a vendor is active but has no published products, the Shop section simply doesn't render on their public page — correct behavior, but there is no warning in the vendor dashboard telling them their page looks empty to the public.
**Fix:** Add a banner or warning card on the vendor dashboard home if `publishedProducts === 0` and `status === 'active'`.
