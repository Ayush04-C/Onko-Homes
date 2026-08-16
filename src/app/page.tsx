import Header from '@/components/Header/Header';

export const metadata = {
  title: 'OKNO Modhomes',
  description: 'Fabricating the future of sustainable luxury living.',
};

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ padding: "150px 5vw", minHeight: "100vh" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem" }}>
          OKNO Modhomes
        </h1>
        <p>Homepage is currently under construction. Please use the navigation above.</p>
      </main>
    </>
  );
}
