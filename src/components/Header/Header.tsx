"use client";

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <>
      <nav className={styles.oknoGlassNav} aria-label="Primary navigation">
        <Link href="/" className={styles.oknoBrand}>
          OKNO<span>.</span>
        </Link>
        <div className={styles.oknoNavLinks}>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="https://www.oknomodhomes.com/models" target="_blank" rel="noopener">Models</Link>
          <Link href="/hospitality">Hospitality</Link>
          <Link href="/process">Process</Link>
          <Link href="/journal">Journal</Link>
        </div>
        <Link href="/enquiry" className={styles.oknoNavCta}>
          Enquire Now <span>→</span>
        </Link>
      </nav>
    </>
  );
}
