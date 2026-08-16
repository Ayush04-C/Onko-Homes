import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Intro from '@/components/Intro/Intro';
import Timeline from '@/components/Timeline/Timeline';
import EndSection from '@/components/EndSection/EndSection';

export const metadata = {
  title: 'OKNO — Our Journey',
  description: 'Fabricating the future of sustainable luxury living.',
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Timeline />
        <EndSection />
      </main>
    </>
  );
}
