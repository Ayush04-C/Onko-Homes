"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import EnquiryModal from './EnquiryModal';

export default function Header() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      <nav className={styles.oknoGlassNav} aria-label="Primary navigation">
        <Link href="/" className={styles.oknoBrand}>
          OKNO<span>.</span>
        </Link>
        <div className={styles.oknoNavLinks}>
          <Link href="https://www.oknomodhomes.com/projects" target="_blank" rel="noopener">Projects</Link>
          <Link href="https://www.oknomodhomes.com/models" target="_blank" rel="noopener">Models</Link>
          <Link href="https://www.oknomodhomes.com/hospitality" target="_blank" rel="noopener">Hospitality</Link>
          <Link href="https://www.oknomodhomes.com/process" target="_blank" rel="noopener">Process</Link>
          <Link href="https://www.oknomodhomes.com/blog" target="_blank" rel="noopener">Journal</Link>
        </div>
        <button 
          className={styles.oknoNavCta} 
          onClick={() => setIsEnquiryOpen(true)}
        >
          Enquire Now <span>→</span>
        </button>
      </nav>

      <EnquiryModal 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
      />
    </>
  );
}
