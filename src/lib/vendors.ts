// ─── Vendor Data ──────────────────────────────────────────────────────────────
// This is the single source of truth for every vendor in The Makers Mill.
// The directory page and each individual vendor page are generated automatically
// from this array — add a new vendor here and it appears everywhere.
//
// HOW TO ADD A VENDOR:
//   1. Copy one of the objects below.
//   2. Give it a unique `slug` (URL-safe, lowercase, hyphens — e.g. "ridge-root").
//   3. Fill in the real name, description, images, social links, etc.
//   4. Save. The directory and the /vendors/<slug> page update automatically.

export type VendorFeature = {
  icon: string;
  title: string;
  desc: string;
};

export type Vendor = {
  slug: string;
  name: string;
  tagline: string;
  category: string;      // primary label shown on the hero stamp
  categories: string[];  // all tags displayed on the directory card
  description: string;   // short blurb for the directory card (~25 words)
  about: string[];       // 2–3 paragraphs for the individual page About section
  accent: string;        // CSS color — use one of: ORANGE | GOLD | RUST
  initial: string;       // one letter shown in the logo placeholder until a real logo is added
  heroImage: string;     // hero/banner image URL — swap for a real vendor photo
  galleryImages: string[]; // 4 product/space photos for the gallery — first is the wide banner
  features: VendorFeature[]; // 3 offering/feature cards for the individual page
  email: string;         // contact email — shown on the individual page
  social: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  hours: string;         // free-form hours string (e.g. "Tue–Sat 11am–7pm")
  visitNote: string;     // short note about where to find them inside the Mill
};

// ─── Accent options (match the site CSS palette) ──────────────────────────────
const ORANGE = '#c4571a';
const GOLD   = '#b8962a';
const RUST   = '#8b3318';

// ─── Base image URL ───────────────────────────────────────────────────────────
// TODO: swap rcmediaservices images for real vendor product/studio photos
const IMG = 'https://rcmediaservices.net/wp-content/uploads/2024/08';

// ─── Vendors Array ────────────────────────────────────────────────────────────
export const VENDORS: Vendor[] = [

  // ── 1 ─────────────────────────────────────────────────────────────────────
  // TODO: replace all placeholder content with real vendor info
  {
    slug: 'vendor-one',
    name: 'Vendor One',
    tagline: 'Handcrafted ceramics made right here in Somerset.',
    category: 'Pottery & Ceramics',
    categories: ['Handmade Goods', 'Pottery', 'Home Decor'],
    description:
      'Hand-thrown pottery and sculptural ceramics made locally — mugs, bowls, vases, and one-of-a-kind pieces you won\'t find anywhere else.',
    about: [
      'Vendor One brings handcrafted ceramic work to the Makers Mill floor. Each piece is thrown, shaped, and fired in a local studio before landing on the shelf — no two are exactly alike, and that\'s the point.',
      'Their work covers the everyday and the exceptional: mugs you\'ll reach for every morning, bowls that earn a permanent spot in the kitchen, and sculptural pieces that just sit there looking exactly right. Stop in and pick one up.',
    ],
    accent: ORANGE,
    initial: 'V',
    heroImage: `${IMG}/MakersMill_005-1024x682.jpg`,
    galleryImages: [
      `${IMG}/MakersMill_004-1024x682.jpg`,
      `${IMG}/MakersMill_007-1024x682.jpg`,
      `${IMG}/MakersMill_009-1024x682.jpg`,
      `${IMG}/MakersMill_010-1024x682.jpg`,
    ],
    features: [
      { icon: '🏺', title: 'Wheel-Thrown Pottery', desc: 'Each piece individually thrown and shaped by hand in a local studio — built to last and built to use.' },
      { icon: '🎨', title: 'Original Glazes', desc: 'Unique glaze combinations developed in-house. You won\'t find these combinations in a big-box store.' },
      { icon: '🎁', title: 'Custom Orders', desc: 'Ask about custom pieces — a great option for gifts, weddings, house warmings, and events.' },
    ],
    email: 'makersmillsomerset@gmail.com', // TODO: replace with real vendor email
    social: {
      instagram: '#', // TODO: replace with real Instagram URL
      facebook: '#',  // TODO: replace with real Facebook URL
    },
    hours: 'Open during Makers Mill hours · Tue–Sat 11am–7pm',
    visitNote: 'Find us on the main vendor floor at 402 E. Mt. Vernon St., Somerset, KY.',
  },

  // ── 2 ─────────────────────────────────────────────────────────────────────
  // TODO: replace all placeholder content with real vendor info
  {
    slug: 'vendor-two',
    name: 'Vendor Two',
    tagline: 'Curated vintage and antique finds that are actually worth finding.',
    category: 'Vintage & Antiques',
    categories: ['Antiques', 'Vintage', 'Collectibles'],
    description:
      'Carefully curated vintage clothing, furniture, art, and collectibles — the kind of stuff you actually want to find when you go thrifting.',
    about: [
      'Vendor Two is the vintage anchor inside Makers Mill — a curated booth that rotates regularly as new pieces come in. They have an eye for things worth keeping: old furniture that still has life in it, clothing that actually fits the era, and oddities that belong on a shelf.',
      'If you\'ve been in before and didn\'t find what you were looking for, come back. The rotation keeps moving and the good pieces don\'t last long.',
    ],
    accent: GOLD,
    initial: 'V',
    heroImage: `${IMG}/MakersMill_010-1024x682.jpg`,
    galleryImages: [
      `${IMG}/MakersMill_006-1024x682.jpg`,
      `${IMG}/MakersMill_012-1024x682.jpg`,
      `${IMG}/MakersMill_005-1024x682.jpg`,
      `${IMG}/MakersMill_007-1024x682.jpg`,
    ],
    features: [
      { icon: '🪑', title: 'Furniture & Home', desc: 'Restored and refinished pieces with stories behind them — the kind that improve a room on arrival.' },
      { icon: '👗', title: 'Vintage Clothing', desc: 'Curated pieces from across the decades, worn-in and worth wearing again.' },
      { icon: '🔮', title: 'Oddities & Collectibles', desc: 'The weird, the wonderful, and the hard-to-find. You\'ll know it when you see it.' },
    ],
    email: 'makersmillsomerset@gmail.com', // TODO: replace with real vendor email
    social: {
      instagram: '#', // TODO: replace with real Instagram URL
    },
    hours: 'Open during Makers Mill hours · Tue–Sat 11am–7pm',
    visitNote: 'Find us on the main vendor floor at 402 E. Mt. Vernon St., Somerset, KY.',
  },

  // ── 3 ─────────────────────────────────────────────────────────────────────
  // TODO: replace all placeholder content with real vendor info
  {
    slug: 'vendor-three',
    name: 'Vendor Three',
    tagline: 'Original paintings, drawings, and limited-edition prints.',
    category: 'Art & Prints',
    categories: ['Original Art', 'Prints', 'Gifts'],
    description:
      'Original paintings, drawings, and limited-edition prints from a local artist — work that actually earns wall space.',
    about: [
      'Vendor Three shows original work inside the Mill — paintings, ink drawings, and limited-run prints. The subject matter shifts with the season and the mood, but the quality is consistent.',
      'Each piece is made locally. Prints are editioned and signed. Original works are one-of-a-kind. If something catches your eye, it won\'t be on the shelf on your next visit.',
    ],
    accent: RUST,
    initial: 'V',
    heroImage: `${IMG}/MakersMill_002-1024x682.jpg`,
    galleryImages: [
      `${IMG}/MakersMill_009-1024x682.jpg`,
      `${IMG}/MakersMill_005-1024x682.jpg`,
      `${IMG}/MakersMill_012-1024x682.jpg`,
      `${IMG}/MakersMill_010-1024x682.jpg`,
    ],
    features: [
      { icon: '🖼️', title: 'Original Paintings', desc: 'One-of-a-kind pieces in oils, acrylics, and mixed media — made to live on a wall, not in a warehouse.' },
      { icon: '🖨️', title: 'Limited Prints', desc: 'Signed and numbered editions — the next best thing to an original, at a fraction of the price.' },
      { icon: '📦', title: 'Ready to Gift', desc: 'Many pieces come framed or packaged and ready to give. Ask at the booth.' },
    ],
    email: 'makersmillsomerset@gmail.com', // TODO: replace with real vendor email
    social: {
      instagram: '#', // TODO: replace with real Instagram URL
      website: '#',   // TODO: replace with real website URL
    },
    hours: 'Open during Makers Mill hours · Tue–Sat 11am–7pm',
    visitNote: 'Find us on the main vendor floor at 402 E. Mt. Vernon St., Somerset, KY.',
  },

  // ── 4 ─────────────────────────────────────────────────────────────────────
  // TODO: replace all placeholder content with real vendor info
  {
    slug: 'vendor-four',
    name: 'Vendor Four',
    tagline: 'Handcrafted jewelry that doesn\'t look like everything else.',
    category: 'Jewelry',
    categories: ['Jewelry', 'Handmade Goods', 'Gifts'],
    description:
      'Handmade rings, necklaces, earrings, and bracelets — locally crafted jewelry that doesn\'t look like everything else out there.',
    about: [
      'Vendor Four brings handcrafted jewelry to Makers Mill. Every piece is made by hand, often using reclaimed metals and natural stones sourced with intention. You\'ll find simple, wearable pieces alongside more sculptural, expressive work.',
      'A good place to find something for yourself or a gift that actually means something. Stop in and try something on.',
    ],
    accent: ORANGE,
    initial: 'V',
    heroImage: `${IMG}/MakersMill_007-1024x682.jpg`,
    galleryImages: [
      `${IMG}/MakersMill_005-1024x682.jpg`,
      `${IMG}/MakersMill_010-1024x682.jpg`,
      `${IMG}/MakersMill_006-1024x682.jpg`,
      `${IMG}/MakersMill_009-1024x682.jpg`,
    ],
    features: [
      { icon: '💍', title: 'Rings & Bracelets', desc: 'Handformed metalwork in silver, brass, and copper. Made to wear every day and hold up doing it.' },
      { icon: '📿', title: 'Necklaces & Earrings', desc: 'From minimal everyday pieces to bold statement work — something for every style.' },
      { icon: '🪨', title: 'Natural Stone', desc: 'Many pieces incorporate locally sourced or natural stone elements. Each one slightly different from the last.' },
    ],
    email: 'makersmillsomerset@gmail.com', // TODO: replace with real vendor email
    social: {
      instagram: '#', // TODO: replace with real Instagram URL
      facebook: '#',  // TODO: replace with real Facebook URL
    },
    hours: 'Open during Makers Mill hours · Tue–Sat 11am–7pm',
    visitNote: 'Find us on the main vendor floor at 402 E. Mt. Vernon St., Somerset, KY.',
  },

  // ── 5 ─────────────────────────────────────────────────────────────────────
  // TODO: replace all placeholder content with real vendor info
  {
    slug: 'vendor-five',
    name: 'Vendor Five',
    tagline: 'Handmade home goods and seasonal decor.',
    category: 'Home Decor',
    categories: ['Home Decor', 'Seasonal', 'Handmade Goods'],
    description:
      'Handmade home goods, seasonal decor, and found-object art — pieces that make a house feel lived-in and loved.',
    about: [
      'Vendor Five specializes in home goods made by hand — the kind of stuff that improves every room it lands in. Seasonal rotations keep the inventory fresh, so there\'s always something new worth picking up.',
      'They work with natural materials and time-tested techniques. The result is decor that feels genuinely handmade, not factory-produced with a "rustic" label slapped on after the fact.',
    ],
    accent: GOLD,
    initial: 'V',
    heroImage: `${IMG}/MakersMill_006-1024x682.jpg`,
    galleryImages: [
      `${IMG}/MakersMill_007-1024x682.jpg`,
      `${IMG}/MakersMill_009-1024x682.jpg`,
      `${IMG}/MakersMill_012-1024x682.jpg`,
      `${IMG}/MakersMill_005-1024x682.jpg`,
    ],
    features: [
      { icon: '🕯️', title: 'Candles & Warmth', desc: 'Hand-poured candles and cozy goods that make a room feel like somewhere you actually want to be.' },
      { icon: '🌿', title: 'Natural Materials', desc: 'Wood, stone, linen — materials that hold up and tend to look better with age.' },
      { icon: '🍂', title: 'Seasonal Rotations', desc: 'Fresh inventory each season. Come back in December and the shelf looks completely different.' },
    ],
    email: 'makersmillsomerset@gmail.com', // TODO: replace with real vendor email
    social: {
      instagram: '#', // TODO: replace with real Instagram URL
    },
    hours: 'Open during Makers Mill hours · Tue–Sat 11am–7pm',
    visitNote: 'Find us on the main vendor floor at 402 E. Mt. Vernon St., Somerset, KY.',
  },

  // ── 6 ─────────────────────────────────────────────────────────────────────
  // TODO: replace all placeholder content with real vendor info
  {
    slug: 'vendor-six',
    name: 'Vendor Six',
    tagline: 'Small-batch candles and botanical goods made locally.',
    category: 'Candles & Wellness',
    categories: ['Candles', 'Botanical', 'Wellness'],
    description:
      'Small-batch soy candles, botanical blends, and natural wellness goods made locally — with Kentucky ingredients where possible.',
    about: [
      'Vendor Six makes small-batch candles and botanical goods out of a local studio. Every candle is hand-poured using soy wax and fragrance blends developed in-house. The result smells like it belongs here, not like a department store.',
      'They also carry herbal goods, salves, and seasonal botanical products. A good stop if you\'re looking for something that isn\'t mass-produced and actually works.',
    ],
    accent: RUST,
    initial: 'V',
    heroImage: `${IMG}/MakersMill_009-1024x682.jpg`,
    galleryImages: [
      `${IMG}/MakersMill_005-1024x682.jpg`,
      `${IMG}/MakersMill_007-1024x682.jpg`,
      `${IMG}/MakersMill_010-1024x682.jpg`,
      `${IMG}/MakersMill_012-1024x682.jpg`,
    ],
    features: [
      { icon: '🕯️', title: 'Hand-Poured Candles', desc: 'Small-batch soy candles in seasonal and year-round scents — nothing artificial, nothing generic.' },
      { icon: '🌿', title: 'Botanical Blends', desc: 'Herbal goods and botanical products made with care and real ingredients.' },
      { icon: '🛁', title: 'Wellness Goods', desc: 'Salves, balms, and natural body care made without shortcuts. Your skin will notice the difference.' },
    ],
    email: 'makersmillsomerset@gmail.com', // TODO: replace with real vendor email
    social: {
      instagram: '#', // TODO: replace with real Instagram URL
      website: '#',   // TODO: replace with real website URL
    },
    hours: 'Open during Makers Mill hours · Tue–Sat 11am–7pm',
    visitNote: 'Find us on the main vendor floor at 402 E. Mt. Vernon St., Somerset, KY.',
  },

  // ── 7 ─────────────────────────────────────────────────────────────────────
  // TODO: replace all placeholder content with real vendor info
  {
    slug: 'vendor-seven',
    name: 'Vendor Seven',
    tagline: 'Handmade clothing and wearable textile art.',
    category: 'Boutique',
    categories: ['Boutique', 'Handmade Clothing', 'Textiles'],
    description:
      'Handmade clothing, wearable textile art, and small-run apparel designed and stitched locally — nothing off a factory line.',
    about: [
      'Vendor Seven makes clothing by hand in small runs. The pieces tend toward the wearable-art end of the spectrum: garments that hold up, have interesting construction, and don\'t look like anything you\'d find at the mall.',
      'They carry a mix of everyday wearables and more expressive pieces. Sizes are limited by production — if something fits and you like it, it\'s worth picking up today.',
    ],
    accent: ORANGE,
    initial: 'V',
    heroImage: `${IMG}/MakersMill_012-1024x682.jpg`,
    galleryImages: [
      `${IMG}/MakersMill_006-1024x682.jpg`,
      `${IMG}/MakersMill_009-1024x682.jpg`,
      `${IMG}/MakersMill_007-1024x682.jpg`,
      `${IMG}/MakersMill_005-1024x682.jpg`,
    ],
    features: [
      { icon: '🧵', title: 'Handmade Garments', desc: 'Cut and sewn locally in limited quantities — made to wear, not to sit in a warehouse.' },
      { icon: '🎨', title: 'Textile Art', desc: 'Wearable pieces that blur the line between clothing and art. Some days the best outfit is also the boldest.' },
      { icon: '📏', title: 'Small Runs', desc: 'Limited production means limited sizing. Come in while they\'re still on the rack.' },
    ],
    email: 'makersmillsomerset@gmail.com', // TODO: replace with real vendor email
    social: {
      instagram: '#', // TODO: replace with real Instagram URL
      facebook: '#',  // TODO: replace with real Facebook URL
    },
    hours: 'Open during Makers Mill hours · Tue–Sat 11am–7pm',
    visitNote: 'Find us on the main vendor floor at 402 E. Mt. Vernon St., Somerset, KY.',
  },

  // ── 8 ─────────────────────────────────────────────────────────────────────
  // TODO: replace all placeholder content with real vendor info
  {
    slug: 'vendor-eight',
    name: 'Vendor Eight',
    tagline: 'Custom gifts and seasonal goods worth giving.',
    category: 'Gifts & Seasonal',
    categories: ['Gifts', 'Seasonal', 'Handmade Goods'],
    description:
      'Custom gift sets, seasonal bundles, and handmade goods curated for giving — perfect for birthdays, holidays, and any excuse to bring something nice.',
    about: [
      'Vendor Eight curates custom gift sets and seasonal goods inside the Mill. The inventory shifts with the calendar — what\'s on the shelf in December won\'t be there in April, and that\'s the whole point.',
      'They specialize in thoughtful gifts: locally made goods packaged for giving. A good first stop if you need something that doesn\'t look phoned-in.',
    ],
    accent: GOLD,
    initial: 'V',
    heroImage: `${IMG}/MakersMill_010-1024x682.jpg`,
    galleryImages: [
      `${IMG}/MakersMill_005-1024x682.jpg`,
      `${IMG}/MakersMill_007-1024x682.jpg`,
      `${IMG}/MakersMill_006-1024x682.jpg`,
      `${IMG}/MakersMill_009-1024x682.jpg`,
    ],
    features: [
      { icon: '🎁', title: 'Gift Sets', desc: 'Curated local goods bundled and ready to give. No assembly required on your end.' },
      { icon: '🍂', title: 'Seasonal Collections', desc: 'Inventory rotates with the seasons — always something timely, never stale.' },
      { icon: '✍️', title: 'Custom Orders', desc: 'Need something specific for an event or occasion? Ask about custom gift curation.' },
    ],
    email: 'makersmillsomerset@gmail.com', // TODO: replace with real vendor email
    social: {
      instagram: '#', // TODO: replace with real Instagram URL
      facebook: '#',  // TODO: replace with real Facebook URL
    },
    hours: 'Open during Makers Mill hours · Tue–Sat 11am–7pm',
    visitNote: 'Find us on the main vendor floor at 402 E. Mt. Vernon St., Somerset, KY.',
  },

];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Look up a single vendor by its URL slug. Returns undefined if not found. */
export function getVendorBySlug(slug: string): Vendor | undefined {
  return VENDORS.find((v) => v.slug === slug);
}
