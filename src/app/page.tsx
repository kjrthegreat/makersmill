import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ExploreMill } from '@/components/ExploreMill';
import { Experiences } from '@/components/Experiences';
import { StageTeaser } from '@/components/StageTeaser';
import { Events } from '@/components/Events';
import { Gallery } from '@/components/Gallery';
import { Businesses } from '@/components/Businesses';
import { Community } from '@/components/Community';
import { RegionFeature } from '@/components/RegionFeature';
import { Inquiry } from '@/components/Inquiry';
import { Visit } from '@/components/Visit';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <ExploreMill />
      <Experiences />
      <StageTeaser />
      <Events />
      <Gallery />
      <Businesses />
      <Community />
      <RegionFeature />
      <Inquiry />
      <Visit />
      <Contact />
      <Footer />
    </>
  );
}
