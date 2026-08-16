"use client";
import styles from './Journal.module.css';
import { Article, articles } from './journalData';

interface Props {
  onOpenArticle: (a: Article) => void;
}

export default function JournalArchive({ onOpenArticle }: Props) {
  return (
    <>
      <section className={`${styles.archive} ${styles.reveal}`}>
        <div className={styles.archiveHead}>
          <h2>All notes.</h2>
          <span>Journal / 2026</span>
        </div>
        <div>
          {articles.map((a) => (
            <button key={a.id} className={styles.archiveRow} onClick={() => onOpenArticle(a)}>
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
    </>
  );
}
