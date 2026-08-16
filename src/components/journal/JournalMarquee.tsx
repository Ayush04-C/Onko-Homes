"use client";
import styles from './Journal.module.css';
import { Article } from './journalData';

interface Props {
  caption: string;
  subcaption: string;
  articles: Article[];
  rowClass: string;
  onOpenArticle: (a: Article) => void;
}

export default function JournalMarquee({ caption, subcaption, articles, rowClass, onOpenArticle }: Props) {
  return (
    <section className={styles.marqueeWrap}>
      <div className={styles.marqueeCaption}>
        <b>{caption}</b><span>{subcaption}</span>
      </div>
      <div className={`${styles.marquee} ${rowClass}`}>
        {articles.map((a, i) => (
          <button key={`${a.id}-${i}`} className={styles.blogCard} onClick={() => onOpenArticle(a)}>
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
        ))}
      </div>
    </section>
  );
}
