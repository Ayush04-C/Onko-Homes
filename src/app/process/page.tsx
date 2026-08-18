import Header from '@/components/Header/Header';

export const metadata = {
  title: 'OKNO — Process',
  description: 'A look at the OKNO design, manufacturing, and delivery process.',
};

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main style={{ padding: "140px 5vw 80px", minHeight: "100vh", maxWidth: "1040px", margin: "0 auto" }}>
        <div style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--gold)" }}>
          Process
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 5vw, 72px)", lineHeight: 1, fontWeight: 400, marginTop: "18px" }}>
          From site study to keys in hand.
        </h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "17px", marginTop: "24px", maxWidth: "680px" }}>
          OKNO compresses conventional build timelines through controlled design, factory fabrication, and coordinated site installation.
        </p>
      </main>
    </>
  );
}
