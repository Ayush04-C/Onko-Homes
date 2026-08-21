"use client";
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './Journal.module.css';
import { Article } from './journalData';

interface Props {
  article: Article | null;
  onClose: () => void;
}

export default function JournalModal({ article, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={`${styles.modal} ${article ? styles.open : ''}`} aria-hidden={!article}>
      <div className={styles.modalBackdrop} onClick={onClose}></div>
      {article && (
        <article className={styles.modalPanel}>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">×</button>
          <div className={styles.articleHero}>
            <Image src={article.image} alt={article.title} fill sizes="min(1180px, 94vw)" />
            <div className={styles.articleHeroCopy}>
              <div className={styles.cardType}>{article.type}</div>
              <h2>{article.title}</h2>
            </div>
          </div>
          <div className={styles.articleBody}>
            <div>
              <p>{article.lead}</p>
              <p>{article.body}</p>
            </div>
            <aside className={styles.articleSide}>
              <div>{article.date}</div>
              <div>{article.source}</div>
              <div>Original / Instagram / Project archive</div>
            </aside>
          </div>
        </article>
      )}
    </div>
  );
}
