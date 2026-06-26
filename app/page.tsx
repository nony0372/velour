import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Calculator from '@/components/sections/Calculator';
import Services from '@/components/sections/Services';
import Timeline from '@/components/sections/Timeline';
import Guarantees from '@/components/sections/Guarantees';
import VideoCase from '@/components/sections/VideoCase';
import CTABanner from '@/components/sections/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Calculator />
      <Services />
      <Timeline />
      <Guarantees />
      <VideoCase />
      <CTABanner />
    </>
  );
}
