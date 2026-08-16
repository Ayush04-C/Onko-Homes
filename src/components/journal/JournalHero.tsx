"use client";
import { useEffect, useRef } from 'react';
import styles from './Journal.module.css';

export default function JournalHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
    </>
  );
}
