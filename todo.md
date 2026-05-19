# TODO — This Week

Short active list. Pull from `tasks.md` as items finish.

## Now
- [ ] `npm install` then `npm run dev` to verify the Next.js build runs locally
- [ ] Walk Todd through the homepage + three sub-pages and collect feedback

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

## Next (post-launch)
- [ ] Claim / update Google Business Profile
- [ ] Submit sitemap + robots.txt to Search Console
- [ ] Add LocalBusiness + Event JSON-LD schema

## Done
- [x] Capture meeting notes into `roadmap.md` / `tasks.md` / `CLAUDE.md`
- [x] Migrate static `index.html` to Next.js 15 + React 19 + TypeScript (App Router)
- [x] Split homepage into per-section components
- [x] Extract acorn logo PNG to `public/acorn.png`
- [x] Homepage edits: new Nav with Tickets CTA, Hero CTA rebalance, Explore-the-Mill, reordered 8 Reasons (Trivia de-emphasized), Stage Teaser, Events with ticket CTAs, Businesses at the Mill, Green River Valley Farm feature, Inquiry section, updated Footer
- [x] Build `/stage`, `/bar-food`, `/store` sub-pages matching homepage design language
- [x] QA pass: hero h1 fixes (Bar-Food, Store), section scroll-margin under fixed nav, hamburger refactored to real `<button>` with `aria-expanded`/`aria-controls`, mobile menu `aria-hidden`, Stage and Bar-Food got the same "Also at the Mill" cross-link block as Store
