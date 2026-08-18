import Header from '@/components/Header/Header';
import Globe from '@/components/Globe/Globe';
import Link from 'next/link';

export const metadata = {
  title: 'OKNO — Projects',
  description: 'Our portfolio of sustainable luxury living projects.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main style={{ padding: "120px 5vw 50px", minHeight: "100vh", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: ".22em", textTransform: "uppercase", color: "#A0845C", fontWeight: 400 }}>The Record</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.2vw, 42px)", marginTop: "14px", fontWeight: 400, lineHeight: 1.12 }}>
          Sixty-five homes. One resort.<br/>One crossing of an ocean.
        </h1>
        <p style={{ fontSize: "clamp(15px, 1.25vw, 17px)", color: "var(--muted)", maxWidth: "720px", lineHeight: 1.85, marginTop: "18px" }}>
          Every entry here carries a name, a place, and a date — because an image without provenance is a render until proven otherwise.
        </p>
        
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "26px 0 40px" }}>
          <button style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", padding: "10px 18px", border: "1px solid var(--gold)", color: "var(--gold)", background: "none", cursor: "pointer", transition: "all .35s" }}>All</button>
          <button style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", padding: "10px 18px", border: "1px solid var(--line)", color: "var(--muted)", background: "none", cursor: "pointer", transition: "all .35s" }}>Residence</button>
          <button style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", padding: "10px 18px", border: "1px solid var(--line)", color: "var(--muted)", background: "none", cursor: "pointer", transition: "all .35s" }}>Hospitality</button>
          <button style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", padding: "10px 18px", border: "1px solid var(--line)", color: "var(--muted)", background: "none", cursor: "pointer", transition: "all .35s" }}>Export</button>
        </div>
        
        <Globe />
        
        <div style={{ marginTop: "50px" }}>
          {[
            { id: 1, type: "Hospitality", title: "Mehul Valley — 17 Units", loc: "Lonavala, MH", spec: "376–502 sq ft", year: "2024", img: "/assets/projects/project-highlands.webp" },
            { id: 2, type: "Bespoke Residence", title: "Villa Aranya", loc: "Hyderabad, TS", spec: "", year: "2026", img: "/assets/projects/project-highlands.webp" },
            { id: 3, type: "Retreat Suite", title: "The Mirror House", loc: "Coorg, KA", spec: "480 sq ft", year: "2025", img: "/assets/projects/project-highlands.webp" },
            { id: 4, type: "Export", title: "Export 01 — United States", loc: "Shipped from Hyderabad", spec: "", year: "2025", img: "/assets/projects/project-highlands.webp" }
          ].map(p => (
            <Link key={p.id} href="#" style={{ display: "grid", gridTemplateColumns: "110px 1.1fr 1fr auto", gap: "clamp(18px, 3vw, 48px)", alignItems: "center", padding: "26px 0", borderTop: "1px solid var(--line)", textDecoration: "none", color: "inherit", cursor: "pointer" }}>
              <div style={{ width: "110px", aspectRatio: "4/3", overflow: "hidden", background: "var(--ink)" }}>
                <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 1.8vw, 23px)" }}>{p.title}</div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", display: "flex", gap: "18px", flexWrap: "wrap" }}>
                <span>{p.loc}</span>
                <span>{p.type}</span>
                {p.spec && <span>{p.spec}</span>}
                <span>{p.year}</span>
              </div>
              <div style={{ color: "var(--gold)", fontSize: "16px" }}>→</div>
            </Link>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
        
        <p style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--muted)", marginTop: "26px", textTransform: "uppercase", letterSpacing: ".1em" }}>
          FULL ARCHIVE — 65 ENTRIES ON THE PRODUCTION SITE. FOUR SHOWN IN THIS DEMONSTRATION.
        </p>
      </main>
    </>
  );
}
