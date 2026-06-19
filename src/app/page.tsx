import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'The Makers Mill — Live Music, Bar & Food, Local Makers · Somerset, KY',
  description:
    "Downtown Somerset's gathering place — live music on The Stage, craft brews and food at the bar, handmade goods from local makers, plus arcade, pool, trivia, and events at 402 E. Mt. Vernon St.",
  openGraph: {
    title: 'The Makers Mill — Somerset, KY',
    description:
      "Live music · bar & food · local makers · arcade · pool · events. Downtown Somerset's creative gathering place.",
    images: [{ url: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_001-1024x682.jpg', width: 1024, height: 682 }]
  }
};
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ExploreMill } from '@/components/ExploreMill';
import { Events } from '@/components/Events';
import { Experiences } from '@/components/Experiences';
import { Gallery } from '@/components/Gallery';
import { Businesses } from '@/components/Businesses';
import { RegionFeature } from '@/components/RegionFeature';
import { Visit } from '@/components/Visit';
import { Footer } from '@/components/Footer';
import { getEvents } from '@/lib/db';

// Reads editable events from D1 at request time — must render dynamically.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const events = await getEvents();
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Events events={events} />
      <ExploreMill />
      <Experiences />
      <Businesses />
      <Gallery />
      <RegionFeature />
      <Visit />
      <Footer />
    </>
  );
}
