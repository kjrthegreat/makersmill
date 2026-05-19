import type { Metadata } from 'next';
import './globals.css';
import { RevealObserver } from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: 'The Makers Mill — Live Music, Bar & Food, Local Makers in Somerset, KY',
  description:
    "Downtown Somerset's multi-experience gathering place — The Stage for live music, a full bar & food, and a store of local makers, plus arcade, pool, trivia, and events at 402 E. Mt. Vernon St.",
  openGraph: {
    title: 'The Makers Mill — Somerset, KY',
    description:
      "Live music · bar & food · local makers · arcade · pool · events. Downtown Somerset's creative gathering place.",
    type: 'website',
    locale: 'en_US'
  }
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
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
