# TODO — This Week

Short active list. Pull from `tasks.md` as items finish.

## Now
- [ ] Get vendors signed up and activate their accounts via `/admin/vendors`
- [ ] Set up custom SMTP (Resend) for vendor welcome/rejection emails
- [ ] Walk Todd through vendor portal and collect feedback

## Waiting on Todd (blockers)
- [ ] **Ticketing URL** — single placeholder URL or per-event links (wired into nav, hero, events, footer, stage page)
- [ ] **External form provider** — Tally / Typeform / Google Forms — and form URLs for:
  - Rental / business space application
  - Vendor / seller application
  - Stage / performer inquiry
- [ ] **Real photos** for the Stage hero, Bar & Food hero, and Store hero (currently using best-guess swaps from existing photo set)
- [ ] **Print Ghost / Pilates / Soul House** — confirm copy, supply real links/logos
- [ ] **Green River Valley Farm** — real ordering URL + optional logo
- [ ] **Real events feed** — replace sample events on homepage and /stage
- [ ] **Terms of service for vendors** — legal to draft before opening signups publicly

## Next
- [ ] Claim / update Google Business Profile
- [ ] Submit sitemap + robots.txt to Search Console
- [ ] Add LocalBusiness + Event JSON-LD schema
- [ ] Drag-and-drop vendor reorder in admin (currently sort_order number input)
- [ ] Product filter bar on public vendor page (filter by category)

## Done
- [x] Capture meeting notes into `roadmap.md` / `tasks.md` / `CLAUDE.md`
- [x] Migrate static `index.html` to Next.js 15 + React 19 + TypeScript (App Router)
- [x] Split homepage into per-section components
- [x] Extract acorn logo PNG to `public/acorn.png`
- [x] Homepage edits: new Nav with Tickets CTA, Hero CTA rebalance, Explore-the-Mill, reordered 8 Reasons (Trivia de-emphasized), Stage Teaser, Events with ticket CTAs, Businesses at the Mill, Green River Valley Farm feature, Inquiry section, updated Footer
- [x] Build `/stage`, `/bar-food`, `/store` sub-pages matching homepage design language
- [x] QA pass: hero h1 fixes, section scroll-margin, hamburger accessibility, "Also at the Mill" cross-links

### Vendor portal — done 2026-05-22
- [x] Stack: Supabase (auth + Postgres + Storage) + Next.js 15 App Router
- [x] DB schema: profiles, vendors, vendor_hours, products, product_images, vendor_applications — all with RLS
- [x] Auth: `/vendor/login`, `/vendor/signup`, `/vendor/reset-password`; middleware protecting all dashboard + admin routes
- [x] Vendor dashboard: profile editor, product manager, settings, preview link
- [x] Admin portal: applications queue, vendor list, product moderation, site settings
- [x] Admin vendor edit page (`/admin/vendors/[id]`): full control over every vendor field + products
- [x] Public `/vendors` directory: live from DB, featured first, category tags on cards
- [x] Public `/vendors/[slug]`: fully dynamic — hero, shop (first), about, gallery, slim footer nav
- [x] Vendor page customization: accent color, custom hero headline, about headline, location in mill, Facebook, CTA button, gallery (6 photos), categories, meta description
- [x] Supabase Storage: `vendor-assets` + `product-images` buckets, RLS policies, public URLs
- [x] `ImageUpload` component: drag-and-drop or click upload → Supabase Storage → permanent public URL; used in profile, admin, and product forms
- [x] Simplified vendor page: removed generic boilerplate sections, reordered Shop above About
