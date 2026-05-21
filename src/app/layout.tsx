import type { Metadata } from 'next';
import './globals.css';
import { RevealObserver } from '@/components/RevealObserver';

const OG_IMAGE = 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_001-1024x682.jpg';

export const metadata: Metadata = {
  title: {
    default: 'The Makers Mill — Live Music, Bar & Food, Local Makers · Somerset, KY',
    template: '%s | The Makers Mill'
  },
  description:
    "Downtown Somerset's multi-experience gathering place — The Stage for live music, a full bar & food, and a floor of local makers, plus arcade, pool, trivia, and events at 402 E. Mt. Vernon St.",
  keywords: [
    'Makers Mill', 'Somerset KY', 'Somerset Kentucky', 'live music Somerset',
    'bar food Somerset KY', 'local makers Kentucky', 'things to do Somerset KY',
    'downtown Somerset Kentucky', 'handmade goods Somerset', 'artisan market Kentucky'
  ],
  openGraph: {
    title: 'The Makers Mill — Somerset, KY',
    description:
      "Live music · bar & food · local makers · arcade · pool · events. Downtown Somerset's creative gathering place at 402 E. Mt. Vernon St.",
    type: 'website',
    locale: 'en_US',
    siteName: 'The Makers Mill',
    images: [{ url: OG_IMAGE, width: 1024, height: 682, alt: 'The Makers Mill — Somerset, Kentucky' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Makers Mill — Somerset, KY',
    description: "Live music · bar & food · local makers · events. Downtown Somerset's gathering place.",
    images: [OG_IMAGE]
  }
};

// LocalBusiness JSON-LD schema — improves Google Business ranking and rich results
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'BarOrPub', 'MusicVenue'],
  name: 'The Makers Mill',
  description:
    'Live music, bar & food, local makers, arcade, pool, and events in downtown Somerset, KY.',
  url: 'https://makersmillsomerset.com',
  email: 'makersmillsomerset@gmail.com',
  image: OG_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '402 E. Mt. Vernon St.',
    addressLocality: 'Somerset',
    addressRegion: 'KY',
    postalCode: '42501',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.0924,
    longitude: -84.6041
  },
  priceRange: '$$',
  servesCuisine: 'American'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@400;600;700;800&family=Special+Elite&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
