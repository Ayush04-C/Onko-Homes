"use client";

import { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header/Header';
import styles from './Journal.module.css';

interface Article {
  id: string;
  type: string;
  date: string;
  title: string;
  lead: string;
  body: string;
  image: string;
  source: string;
}

const articles: Article[] = [
  {
    id: "J-01", type: "Project story", date: "Jul 2026",
    title: "How the Mirror House was carried up a Coorg hillside in pieces.",
    lead: "No road for a concrete truck, a monsoon closing in, and trees that could not be touched — the full account of a sixty-two-day build.",
    body: "A project story about logistics, panelisation and the decisions that turn a difficult site into a finished home. From the first site walk to the last panel, the useful details are the story.",
    image: "/timeline1.png", source: "Project archive"
  },
  {
    id: "J-02", type: "Building knowledge", date: "Jun 2026",
    title: "Prefab vs RCC in India: a cost comparison with receipts.",
    lead: "Numbers from delivered projects — where the money actually goes, and where the eighteen months hide.",
    body: "A practical comparison of factory-made systems and conventional construction: time, labour, waste, site conditions and the hidden cost of waiting.",
    image: "/timeline1.png", source: "Building knowledge"
  },
  {
    id: "J-03", type: "Land & legal", date: "May 2026",
    title: "Will a bank finance a panelised home? Yes — here's the paperwork.",
    lead: "The documentation lenders ask for, the approvals your plot needs, and the order to do it in.",
    body: "A field guide to the paperwork around land, approvals and financing, written to make the first conversation with an architect, lender or local authority much easier.",
    image: "/timeline1.png", source: "Land & legal"
  },
  {
    id: "J-04", type: "Hospitality", date: "Apr 2026",
    title: "A small resort, designed around the rhythm of the site.",
    lead: "Why repeating a precise module can make a hospitality project feel less repetitive, not more.",
    body: "Hospitality is a different operating problem: guest experience, maintenance, construction speed and revenue all have to meet in one design.",
    image: "/timeline1.png", source: "Hospitality"
  },
  {
    id: "J-05", type: "Project story", date: "Mar 2026",
    title: "The first home delivered: what changed after the drawings met the site.",
    lead: "A field note on the details that only become visible once a home is being assembled.",
    body: "The gap between a drawing and a real site is where the best lessons live. This story collects those lessons without hiding the awkward bits.",
    image: "/timeline1.png", source: "Project archive"
  },
  {
    id: "J-06", type: "Building knowledge", date: "Feb 2026",
    title: "What a 90-day move-in promise really requires.",
    lead: "Factory planning, procurement and site preparation have to move together.",
    body: "A faster build is not one trick. It is a chain of decisions that starts before fabrication and ends only when the home is ready to live in.",
    image: "/timeline1.png", source: "Building knowledge"
  },
  {
    id: "J-07", type: "Materials", date: "Jan 2026",
    title: "The envelope: why windows, roof and insulation decide comfort.",
    lead: "The quiet systems are doing most of the work long after the handover.",
    body: "A closer look at the building envelope and the components that shape daylight, thermal comfort, weather resistance and long-term maintenance.",
    image: "/timeline1.png", source: "Materials"
  },
  {
    id: "J-08", type: "Land & legal", date: "Dec 2025",
    title: "Still looking for land? Start with the constraints, not the view.",
    lead: "Access, slope, services and approvals can decide a project before aesthetics enter the room.",
    body: "A checklist for evaluating land before falling in love with it: access, terrain, utilities, planning rules and the practical route from road to foundation.",
    image: "/timeline1.png", source: "Land & legal"
  },
  {
    id: "J-09", type: "Journal", date: "Nov 2025",
    title: "What we learned from building, breaking and building again.",
    lead: "The practice improves when the difficult lessons are documented.",
    body: "A collection of decisions that changed the way the team thinks about design, fabrication and delivery.",
    image: "/timeline1.png", source: "Journal"
  },
  {
    id: "J-10", type: "Building knowledge", date: "Oct 2025",
    title: "Panelised does not mean generic.",
    lead: "Precision is what creates freedom: repeat the parts, not the experience.",
    body: "How a controlled manufacturing system can still leave room for site-specific design, finishes, layouts and architectural intent.",
    image: "/timeline1.png", source: "Building knowledge"
  }
];

export default function JournalPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const setA = articles.slice(0, 6);
  const setB = articles.slice(4, 10);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Reveal animation and scroll parallax
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.visible);
        }
      });
    }, { threshold: 0.12 });
    
    document.querySelectorAll(`.${styles.reveal}`).forEach(el => observer.observe(el));
    
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 700);
        if (videoRef.current) {
          videoRef.current.style.transform = `scale(${1.04 + y / 5000}) translateY(${y * 0.025}px)`;
        }
        ticking = false;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);
  
  const closeArticle = () => {
    setSelectedArticle(null);
    document.body.style.overflow = '';
  };
  
  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden';
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeArticle();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderCard = (a: Article, index: number) => (
    <button key={`${a.id}-${index}`} className={styles.blogCard} onClick={() => openArticle(a)}>
      <div className={styles.cardImage} style={{ backgroundImage: `url('${a.image}')` }}></div>
      <div className={styles.cardCopy}>
        <div className={styles.cardType}>{a.type}</div>
        <div className={styles.cardTitle}>{a.title}</div>
        <div className={styles.cardMeta}>
          <span>{a.date}</span>
          <span className={styles.cardArrow}>↗</span>
        </div>
      </div>
    </button>
  );

  return (
    <main className={styles.journalContainer}>
      <div className={styles.noise}></div>
      <div className={`${styles.side} ${styles.left}`}>17.3850° N — 78.4867° E · HYDERABAD</div>
      <div className={`${styles.side} ${styles.right}`}>OKNO · DRAWN, THEN BUILT</div>
      
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.kicker}>Journal / The practice</div>
          <h1>Notes from<br/>the practice.</h1>
          <p>Design, building knowledge, land and law — written for the person six months from building. Nothing here dead-ends: every piece exits into a home.</p>
          <div className={styles.heroMeta}>
            <span>Projects</span><span>Building knowledge</span><span>Land & legal</span>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <video 
            ref={videoRef}
            className={styles.heroVideo} 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="metadata"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroLabel}>A home, from above · OKNO</div>
        </div>
      </section>

      <section className={`${styles.sectionIntro} ${styles.reveal}`}>
        <h2>Ideas that<br/>become homes.</h2>
        <p>The Journal is where OKNO explains the work behind the work: project stories, numbers, approvals, materials, hospitality and the decisions that make a house worth building.</p>
      </section>
      
      <div className={styles.sectionRule}></div>

      <section className={styles.marqueeWrap}>
        <div className={styles.marqueeCaption}>
          <b>Project stories</b><span>Scroll / select a story</span>
        </div>
        <div className={`${styles.marquee} ${styles.rowA}`}>
          {[...setA, ...setA].map((a, i) => renderCard(a, i))}
        </div>
      </section>

      <section className={styles.marqueeWrap}>
        <div className={styles.marqueeCaption}>
          <b>Building knowledge</b><span>Research / field notes / guides</span>
        </div>
        <div className={`${styles.marquee} ${styles.rowB}`}>
          {[...setB, ...setB].map((a, i) => renderCard(a, i))}
        </div>
      </section>

      <section className={`${styles.archive} ${styles.reveal}`}>
        <div className={styles.archiveHead}>
          <h2>All notes.</h2>
          <span>Journal / 2026</span>
        </div>
        <div>
          {articles.map((a) => (
            <button key={a.id} className={styles.archiveRow} onClick={() => openArticle(a)}>
              <span className={styles.archiveNum}>{a.id}</span>
              <span>
                <span className={styles.archiveType}>{a.type}</span>
                <div className={styles.archiveTitle}>{a.title}</div>
              </span>
              <span className={styles.archiveDesc}>{a.lead}</span>
              <span className={styles.archiveDate}>{a.date} →</span>
            </button>
          ))}
        </div>
      </section>

      <section className={`${styles.philosophy} ${styles.reveal}`}>
        <h3>Nothing here<br/>dead-ends.</h3>
        <p>Every article should help someone make a better decision: choose a model, understand a cost, prepare land, navigate approvals, compare building systems, or see what a delivered home actually looks like. Each story can also point outward to its original project, source material or Instagram film.</p>
      </section>

      <footer className={styles.footer}>
        <div><strong>OKNO</strong><br/><small>MODHOMES · DRAWN, THEN BUILT</small></div>
        <a href="/">Back to OKNO →</a>
      </footer>

      {/* Modal for Article Details */}
      <div className={`${styles.modal} ${selectedArticle ? styles.open : ''}`} aria-hidden={!selectedArticle}>
        <div className={styles.modalBackdrop} onClick={closeArticle}></div>
        {selectedArticle && (
          <article className={styles.modalPanel}>
            <button className={styles.modalClose} onClick={closeArticle} aria-label="Close">×</button>
            <div className={styles.articleHero}>
              <img src={selectedArticle.image} alt={selectedArticle.title} />
              <div className={styles.articleHeroCopy}>
                <div className={styles.cardType}>{selectedArticle.type}</div>
                <h2>{selectedArticle.title}</h2>
              </div>
            </div>
            <div className={styles.articleBody}>
              <div>
                <p>{selectedArticle.lead}</p>
                <p>{selectedArticle.body}</p>
              </div>
              <aside className={styles.articleSide}>
                <div>{selectedArticle.date}</div>
                <div>{selectedArticle.source}</div>
                <div>Original / Instagram / Project archive</div>
              </aside>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
