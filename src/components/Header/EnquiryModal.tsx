import { useEffect, useState, useRef } from 'react';
import styles from './EnquiryModal.module.css';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [activeDoor, setActiveDoor] = useState(0);
  const screenRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (screenRef.current) {
        screenRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const renderFormFields = () => {
    if (activeDoor === 0) {
      return (
        <>
          <div className={styles.field}>
            <label>Name</label>
            <input placeholder="Your name" />
          </div>
          <div className={styles.field}>
            <label>Phone or email</label>
            <input placeholder="How we reach you" />
          </div>
          <div className={styles.field}>
            <label>Where is the land?</label>
            <input placeholder="District, state — or 'still looking'" />
          </div>
          <div className={styles.field}>
            <label>Land status</label>
            <select>
              <option>I own it</option>
              <option>I&apos;m buying it</option>
              <option>I&apos;m still looking</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Home type</label>
            <select>
              <option>Cabins / villas</option>
              <option>Family home</option>
              <option>Hospitality</option>
              <option>Developer project</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Timeline</label>
            <select>
              <option>This year</option>
              <option>Next year</option>
              <option>Exploring</option>
            </select>
          </div>
          <button className={styles.submit} type="submit">Send enquiry →</button>
        </>
      );
    } else if (activeDoor === 1) {
      return (
        <>
          <div className={styles.field}>
            <label>Name &amp; Company</label>
            <input placeholder="You, and the developing entity" />
          </div>
          <div className={styles.field}>
            <label>Phone or email</label>
            <input placeholder="How we reach you" />
          </div>
          <div className={styles.field}>
            <label>Site location</label>
            <input placeholder="District, state" />
          </div>
          <div className={styles.field}>
            <label>Programme</label>
            <select>
              <option>Cabins / villas</option>
              <option>Resort / Hotel</option>
              <option>Other</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Keys planned</label>
            <select>
              <option>Up to 10</option>
              <option>10 - 25</option>
              <option>25+</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Timeline to revenue</label>
            <select>
              <option>This year</option>
              <option>Next year</option>
              <option>Exploring</option>
            </select>
          </div>
          <button className={styles.submit} type="submit">Request the deck →</button>
        </>
      );
    } else if (activeDoor === 2) {
      return (
        <>
          <div className={styles.field}>
            <label>Name</label>
            <input placeholder="Your name" />
          </div>
          <div className={styles.field}>
            <label>Publication or purpose</label>
            <input placeholder="Who you write for, or what this is about" />
          </div>
          <div className={styles.field}>
            <label>Phone or email</label>
            <input placeholder="How we reach you" />
          </div>
          <div className={styles.field}>
            <label>Nature</label>
            <select>
              <option>Press feature</option>
              <option>Partnership</option>
              <option>Career</option>
              <option>Other</option>
            </select>
          </div>
          <button className={styles.submit} type="submit">Send →</button>
        </>
      );
    }
  };

  return (
    <section 
      className={`${styles.enquiryScreen} ${isOpen ? styles.open : ''}`} 
      id="screen"
      ref={screenRef}
    >
      <div className={styles.enquiryCamera}>
        <div className={`${styles.side} ${styles.left}`}>17.3850° N — 78.4867° E · HYDERABAD</div>
        <div className={`${styles.side} ${styles.right}`}>OKNO · DRAWN, THEN BUILT</div>
        
        <div className={styles.enquiryTop}>
          <div className={styles.checkpoint}></div>
          
          <div className={styles.enquiryHeader}>
            <div className={styles.eyebrow}>BEGIN</div>
            <h2>Tell us what you&apos;re building.</h2>
            <p>Three doors, so the right person answers you — with a response inside one working day.</p>
          </div>
          
          <div className={styles.doors}>
            <article 
              className={`${styles.door} ${activeDoor === 0 ? styles.active : ''}`}
              onClick={() => setActiveDoor(0)}
            >
              <span className={styles.doorNum}>01</span>
              <h3>A home of my own</h3>
              <p>Signature or Bespoke, on land you have or land you&apos;re finding.</p>
            </article>
            <article 
              className={`${styles.door} ${activeDoor === 1 ? styles.active : ''}`}
              onClick={() => setActiveDoor(1)}
            >
              <span className={styles.doorNum}>02</span>
              <h3>A property that earns</h3>
              <p>Resorts, retreats, additions — the developer conversation.</p>
            </article>
            <article 
              className={`${styles.door} ${activeDoor === 2 ? styles.active : ''}`}
              onClick={() => setActiveDoor(2)}
            >
              <span className={styles.doorNum}>03</span>
              <h3>Press &amp; other</h3>
              <p>Features, partnerships, careers, everything else.</p>
            </article>
          </div>
          
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {renderFormFields()}
          </form>
          
          <div className={styles.response}>Response within <span>one working day</span></div>
        </div>
      </div>
    </section>
  );
}
