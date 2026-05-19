import { Nav } from '@/components/Nav';
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

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <ExploreMill />
      <Events />
      <Experiences />
      <Businesses />
      <Gallery />
      <About />
      <RegionFeature />
      <Visit />
      <Footer />
    </>
  );
}
