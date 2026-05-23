# Makers Mill — Project Context

Somerset, KY venue/marketplace site. Original build was a single `index.html`; migrated to a Next.js app on 2026-05-17 to make multi-page expansion (Stage, Bar, Store sub-pages) straightforward.

## Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- Plain global CSS — no Tailwind. All styles live in `src/app/globals.css` and preserve the original hand-crafted design system.
- **Supabase** — auth (email+password), Postgres DB, Storage (vendor-assets + product-images buckets). Added 2026-05-17.
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
│   ├── layout.tsx                        — root layout, font preconnect, RevealObserver mount
│   ├── globals.css                       — full design system + all section + dashboard styles
│   ├── page.tsx                          — homepage composition
│   ├── stage/page.tsx                    — The Stage sub-page
│   ├── bar-food/page.tsx                 — Bar & Food sub-page
│   ├── vendors/
│   │   ├── page.tsx                      — public vendor directory (live from Supabase)
│   │   └── [slug]/page.tsx               — individual vendor page (dynamic SSR)
│   │                                       order: Hero → Shop → About → Gallery → slim footer nav
│   ├── businesses/
│   │   ├── print-ghost/page.tsx
│   │   ├── pilates/page.tsx
│   │   └── soul-house/page.tsx
│   ├── vendor/
│   │   ├── login/page.tsx                — vendor auth
│   │   ├── signup/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── dashboard/
│   │       ├── layout.tsx                — sidebar layout (div.dash-nav, not nav — avoids global nav CSS)
│   │       ├── page.tsx                  — dashboard home (stat cards)
│   │       ├── profile/page.tsx          — profile editor (7 sections)
│   │       ├── products/
│   │       │   ├── page.tsx              — product list
│   │       │   ├── new/page.tsx          — add product
│   │       │   └── [id]/page.tsx         — edit product
│   │       └── settings/page.tsx
│   ├── admin/
│   │   ├── layout.tsx                    — admin sidebar (div.dash-nav, checks admin role)
│   │   ├── page.tsx                      — admin dashboard
│   │   ├── applications/page.tsx         — vendor application queue
│   │   ├── vendors/
│   │   │   ├── page.tsx                  — all vendors list
│   │   │   └── [id]/page.tsx             — edit any vendor (full profile + products inline)
│   │   ├── products/page.tsx             — all products across all vendors
│   │   └── settings/page.tsx
│   ├── api/auth/callback/route.ts        — Supabase auth code exchange → redirect to dashboard
│   ├── robots.ts                         — robots.txt generation
│   └── sitemap.ts                        — sitemap generation
├── components/
│   ├── Nav.tsx                           — client; scroll state, mobile menu
│   ├── RevealObserver.tsx                — client; IntersectionObserver for .rev/.rev-l/.rev-r
│   ├── Footer.tsx
│   ├── Hero.tsx, About.tsx, Experiences.tsx, Events.tsx,
│   ├── Gallery.tsx, Community.tsx, Visit.tsx, Contact.tsx
│   ├── ProfileForm.tsx                   — client; 7-section vendor profile editor with ImageUpload
│   ├── AdminVendorForm.tsx               — client; admin edit of any vendor (all fields + admin controls)
│   ├── ProductForm.tsx                   — client; add/edit product with ImageUpload
│   ├── ImageUpload.tsx                   — client; drag-and-drop or click → Supabase Storage; URL fallback
│   ├── ProductActions.tsx                — client; publish/unpublish/delete product
│   ├── AdminProductActions.tsx           — client; admin product moderation
│   ├── VendorAdminActions.tsx            — client; activate/suspend/feature/delete + Edit link
│   ├── ApplicationActions.tsx            — client; approve/reject vendor applications
│   ├── DashLogout.tsx                    — client; sign out + redirect to /vendor/login
│   └── ApplyButton.tsx                   — client; opens vendor application modal
├── lib/supabase/
│   ├── client.ts                         — browser Supabase client (createBrowserClient)
│   └── server.ts                         — server Supabase client (cookie-based, App Router)
├── types/
│   └── vendor.ts                         — TypeScript interfaces for all DB entities + PRODUCT_CATEGORIES
└── middleware.ts                         — protects /vendor/dashboard/* and /admin/*
public/
└── acorn.png                             — extracted from the original inline base64 logo
supabase/
└── schema.sql                            — full DB schema (run in Supabase SQL editor to bootstrap)
```

## Design language (locked in)
- Fonts: Playfair Display (display), Barlow (body), Barlow Condensed (UI), Special Elite (stamps) — loaded via Google Fonts in `layout.tsx`.
- Palette in `:root` of `globals.css` — ink/wood warm-dark, orange `#c4571a` accent, cream `#f0e8d6` foreground.
- Grain overlay (SVG noise on `body::after`), warm radial glows, and reveal-on-scroll animations are part of the brand feel.
- Reference site Todd likes: The Burl (Lexington) — use for layout/structure cues on new pages.

## Conventions
- New top-level pages live under `src/app/<route>/page.tsx`. Reuse `<Nav />` and `<Footer />`.
- Section-level content stays in `src/components/`. Keep data arrays at the top of each component until they're needed in two places.
- Remote photos load from `rcmediaservices.net` (whitelisted in `next.config.mjs`). Inline `<img>` is fine for now — `next/image` is only used for the local acorn. Vendor/product images now come from Supabase Storage public URLs.
- Anchor links (`/#about`) work across pages because the homepage owns those ids.
- External applications/inquiries should open in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Mobile-first for event sections.
- Dashboard sidebar uses `<div className="dash-nav">` — NOT `<nav>` — because the global CSS applies `position:fixed` to all `nav` elements, which would break the sidebar layout.
- Image URL fields use `||` not `??` for fallbacks — empty string `""` saved from a cleared field should still fall through to the default image.
- Supabase Storage paths are `{userId}/{timestamp}-{random}.{ext}` so RLS delete policy can match on `(storage.foldername(name))[1] = auth.uid()::text`.

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
