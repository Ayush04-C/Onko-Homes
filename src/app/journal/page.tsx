"use client";
import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import styles from '@/components/journal/Journal.module.css';
import { Article, articles } from '@/components/journal/journalData';
import JournalHero from '@/components/journal/JournalHero';
import JournalMarquee from '@/components/journal/JournalMarquee';
import JournalArchive from '@/components/journal/JournalArchive';
import JournalModal from '@/components/journal/JournalModal';

export default function JournalPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const setA = articles.slice(0, 6);
  const setB = articles.slice(4, 10);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.visible);
        }
      });
    }, { threshold: 0.12 });
    
    document.querySelectorAll(`.${styles.reveal}`).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  
  const closeArticle = () => {
    setSelectedArticle(null);
    document.body.style.overflow = '';
  };
  
  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden';
  };

  return (
    <main className={styles.journalContainer}>
      <div className={styles.noise}></div>
      <div className={`${styles.side} ${styles.left}`}>17.3850° N — 78.4867° E · HYDERABAD</div>
      <div className={`${styles.side} ${styles.right}`}>OKNO · DRAWN, THEN BUILT</div>
      
      <Header />

      <JournalHero />

      <JournalMarquee 
        caption="Project stories" 
        subcaption="Scroll / select a story" 
        articles={[...setA, ...setA]} 
        rowClass={styles.rowA} 
        onOpenArticle={openArticle} 
      />

      <JournalMarquee 
        caption="Building knowledge" 
        subcaption="Research / field notes / guides" 
        articles={[...setB, ...setB]} 
        rowClass={styles.rowB} 
        onOpenArticle={openArticle} 
      />

      <JournalArchive onOpenArticle={openArticle} />

      <footer className={styles.footer}>
        <div><strong>OKNO</strong><br/><small>MODHOMES · DRAWN, THEN BUILT</small></div>
        <a href="/">Back to OKNO →</a>
      </footer>

      <JournalModal article={selectedArticle} onClose={closeArticle} />
    </main>
  );
}
