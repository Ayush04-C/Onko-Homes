import Header from '@/components/Header/Header';
import AboutHero from '@/components/about/AboutHero/AboutHero';
import AboutIntro from '@/components/about/AboutIntro/AboutIntro';
import AboutTimeline from '@/components/about/AboutTimeline/AboutTimeline';
import AboutEndSection from '@/components/about/AboutEndSection/AboutEndSection';

export const metadata = {
  title: 'OKNO — About Us',
  description: 'Fabricating the future of sustainable luxury living.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutIntro />
        <AboutTimeline />
        <AboutEndSection />
      </main>
    </>
  );
}
