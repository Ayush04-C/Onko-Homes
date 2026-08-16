import styles from './AboutTimeline.module.css';

interface TimelineCheckpointProps {
  id: string;
  progress: number;
  year: string;
  title: string;
  description: string;
  url: string;
  source: string;
  className: string;
}

export default function AboutTimelineCheckpoint({
  id,
  progress,
  year,
  title,
  description,
  url,
  source,
  className
}: TimelineCheckpointProps) {
  return (
    <article 
      className={`${styles.story} ${styles[className]} story`} 
      data-progress={progress}
    >
      <div className={styles.storyInner}>
        <div className={styles.storyCopy}>
          <div className={styles.storyYear}>{year}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className={`${styles.storyMedia} ${styles.siteVisual}`}>
          <iframe 
            src={url} 
            loading="lazy" 
            title="OKNO Modhomes visual"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
          <div className={styles.siteSource}>{source}</div>
        </div>
      </div>
    </article>
  );
}
