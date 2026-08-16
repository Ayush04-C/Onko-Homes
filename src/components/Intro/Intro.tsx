import styles from './Intro.module.css';

export default function Intro() {
  return (
    <section className={styles.intro}>
      <div className={styles.sectionLabel}>THE STORY OF OKNO</div>
      <h2>Fabricating the future of sustainable luxury living.</h2>
      <p>
        Okno Modhomes positions modular construction as a faster, more controlled and more sustainable alternative to conventional site-built housing — with bespoke design, precision manufacturing and a 90-day delivery promise.
      </p>
    </section>
  );
}
