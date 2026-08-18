import Header from '@/components/Header/Header';
import CinematicJourney from '@/components/CinematicJourney/CinematicJourney';

export const metadata = {
  title: 'OKNO Modhomes',
  description: 'Fabricating the future of sustainable luxury living.',
};

export default function Home() {
  return (
    <>
      <Header />
      <CinematicJourney />
    </>
  );
}
