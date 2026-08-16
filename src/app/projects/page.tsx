import Header from '@/components/Header/Header';

export const metadata = {
  title: 'OKNO — Projects',
  description: 'Our portfolio of sustainable luxury living projects.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main style={{ padding: "150px 5vw", minHeight: "100vh" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem" }}>
          Projects
        </h1>
        <p>This page is currently under construction.</p>
      </main>
    </>
  );
}
