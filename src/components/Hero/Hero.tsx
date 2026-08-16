import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* TODO: Original hero video was not available. Replace this source with the original video. */}
      <video className={styles.heroVideo} autoPlay muted loop playsInline preload="metadata">
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className={styles.heroContent}>
        <div className={styles.eyebrow}>OKNO MODHOMES · OUR JOURNEY</div>
        <h1>Precision-built homes.<br />Made to live.</h1>
        <p>From a studio in Hyderabad to a growing portfolio of sustainable, precision-manufactured homes.</p>
      </div>
    </section>
  );
}
