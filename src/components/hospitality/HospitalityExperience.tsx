'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import styles from './HospitalityExperience.module.css';

type Story = {
  tag: string;
  title: string;
  desc: string;
  quote: string;
  location: string;
  body: string;
  meta: string;
  cardTitle: string;
  image: string;
};

const stories: Story[] = [
  {
    tag: 'Hospitality / Coorg',
    title: 'Mirror House',
    desc: 'A compact retreat shaped around landscape, light and the experience of arriving somewhere completely different.',
    quote: '“It felt less like moving into a house and more like discovering a place.”',
    location: 'Coorg · Karnataka · India',
    body: 'Built around the landscape rather than against it, this project brings together compact modular construction, carefully framed views and a slower hospitality experience.',
    meta: 'Mountain Retreat',
    cardTitle: 'Coorg',
    image: '/assets/about/IMG_20260813_132709.jpg',
  },
  {
    tag: 'Private Residence / Valley',
    title: 'The Valley House',
    desc: 'A quiet modular home where the architecture stays deliberately close to the terrain.',
    quote: '“The house became part of the landscape instead of competing with it.”',
    location: 'Western Ghats · India',
    body: 'The project focuses on a restrained footprint, generous openings and a warm interior material palette.',
    meta: 'Private Residence',
    cardTitle: 'The Valley House',
    image: '/assets/about/IMG_20260813_132728.jpg',
  },
  {
    tag: 'Hospitality / Forest',
    title: 'Forest Cabin',
    desc: 'A compact escape designed around the feeling of disappearing into the trees.',
    quote: '“Every window feels like a different piece of the forest.”',
    location: 'Munnar · Kerala · India',
    body: 'A hospitality-focused cabin designed for short stays, fast delivery and a strong connection to its surroundings.',
    meta: 'Hospitality',
    cardTitle: 'Forest Cabin',
    image: '/assets/about/IMG_20260813_132830.jpg',
  },
  {
    tag: 'Retreat / Lake',
    title: 'Lake House',
    desc: 'A weekend retreat where arrival, view and indoor-outdoor living become one experience.',
    quote: '“The first morning here was exactly what we imagined.”',
    location: 'Karnataka · India',
    body: 'The house uses a compact modular arrangement to maximise views while maintaining a calm, intimate interior.',
    meta: 'Retreat',
    cardTitle: 'Lake House',
    image: '/assets/about/IMG_20260813_133034.jpg',
  },
  {
    tag: 'Signature / Coorg',
    title: 'Mirror House',
    desc: 'A flagship retreat built around reflection, landscape and the feeling of stepping away.',
    quote: '“The experience starts before you even open the door.”',
    location: 'Coorg · Karnataka · India',
    body: 'A cinematic hospitality residence demonstrating how modular construction can support highly individual architectural experiences.',
    meta: 'Signature',
    cardTitle: 'Mirror House',
    image: '/assets/about/Screenshot_2026-08-13-13-20-32-62_c37d74246d9c81aa0bb824b57eaf7062.jpg',
  },
  {
    tag: 'Hospitality / Hills',
    title: 'Hilltop Stay',
    desc: 'A small collection of rooms positioned to make the most of the horizon.',
    quote: '“The view became the architecture.”',
    location: 'Nilgiris · India',
    body: 'The project combines repeatable modular systems with site-specific orientation and hospitality requirements.',
    meta: 'Hospitality',
    cardTitle: 'Hilltop Stay',
    image: '/assets/projects/project-highlands.webp',
  },
  {
    tag: 'Cabins / Pine Forest',
    title: 'Pine Retreat',
    desc: 'A warm, quiet cabin experience surrounded by mature forest.',
    quote: '“It is simple, but every detail feels intentional.”',
    location: 'Himachal Pradesh · India',
    body: 'A compact cabin designed around warmth, material tactility and minimal disturbance to the surrounding landscape.',
    meta: 'Cabins',
    cardTitle: 'Pine Retreat',
    image: '/assets/projects/project-nordic.webp',
  },
  {
    tag: 'Resort / Valley',
    title: 'Valley Collection',
    desc: 'Multiple modular spaces brought together as a single hospitality destination.',
    quote: '“We could scale the experience without losing its character.”',
    location: 'Western India',
    body: 'A modular hospitality system designed to grow over time while keeping a consistent architectural language.',
    meta: 'Resort',
    cardTitle: 'Valley Collection',
    image: '/assets/projects/project-coast.webp',
  },
  {
    tag: 'Private Escape / River',
    title: 'River House',
    desc: 'A secluded residence framed by water, trees and long views.',
    quote: '“The house makes you slow down.”',
    location: 'South India',
    body: 'A low-impact modular residence with carefully positioned openings and a strong relationship with the surrounding terrain.',
    meta: 'Private Escape',
    cardTitle: 'River House',
    image: '/assets/projects/project-desert.webp',
  },
];

const formatIndex = (index: number) => String(index + 1).padStart(2, '0');

export default function HospitalityExperience() {
  const journeyRef = useRef<HTMLElement>(null);
  const cardsLayerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const progressLabelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const photoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hoverInfoRef = useRef<HTMLDivElement>(null);

  const [hoveredStory, setHoveredStory] = useState<Story | null>(null);
  const [hoverPlacement, setHoverPlacement] = useState<'above' | 'below'>('above');
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [detailBackground, setDetailBackground] = useState('');

  const selectedStory = selectedStoryIndex === null ? null : stories[selectedStoryIndex];

  const openDetail = useCallback((index: number) => {
    setDetailBackground(`url("${stories[index].image}")`);
    setSelectedStoryIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedStoryIndex(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const journey = journeyRef.current;
    const cardsLayer = cardsLayerRef.current;
    const progressBar = progressBarRef.current;
    const progressLabel = progressLabelRef.current;

    if (!journey || !cardsLayer || !progressBar || !progressLabel) return;

    let rafId = 0;
    let ticking = false;

    const placeCards = (progress: number) => {
      const count = stories.length;
      const targetX = 50;
      const targetY = 62;
      let closest = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const t = (index / count + progress * 1.38) % 1;
        const phase = t * Math.PI * 2;
        const x = -6 + t * 112;
        const y = 52 - 13 * Math.sin(phase);
        const dx = 112;
        const dy = -13 * Math.cos(phase) * Math.PI * 2;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        const edgeFade = Math.min(1, Math.min(t / 0.075, (1 - t) / 0.075));

        card.style.left = `${x}%`;
        card.style.top = `${y}%`;
        card.style.transform = `translate3d(-50%, -50%, 0) rotate(${angle}deg)`;
        card.style.opacity = String(Math.max(0, edgeFade));
        card.classList.toggle(styles.isVisible, edgeFade > 0.02);

        const distance = Math.hypot(x - targetX, y - targetY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      setActiveStoryIndex((current) => (current === closest ? current : closest));
    };

    const updateJourney = () => {
      ticking = false;
      const rect = journey.getBoundingClientRect();
      const total = Math.max(1, journey.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      const current = Math.min(9, Math.max(1, Math.floor(progress * 10) + 1));

      cardsLayer.style.transform = 'none';
      placeCards(progress);
      progressBar.style.width = `${Math.max(8, progress * 100)}%`;
      progressLabel.textContent = `${String(current).padStart(2, '0')} / 09`;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(updateJourney);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    updateJourney();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const activeStory = stories[activeStoryIndex];

  return (
    <main className={styles.hospitalityPage}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroOrbit} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>Hospitality / Client Stories</div>
          <h1>Spaces that<br />stay with you.</h1>
          <p>
            A moving collection of homes, retreats and hospitality spaces —
            experienced through the people who lived, stayed and built memories inside them.
          </p>
        </div>
        <div className={styles.scrollNote}>SCROLL TO EXPLORE ↓</div>
      </section>

      <section className={styles.journey} id="hospitality" ref={journeyRef}>
        <div className={styles.journeySticky}>
          <div className={styles.journeyHeader}>
            <div className={styles.eyebrow}>01 — 09 / Experiences</div>
            <h2>Hospitality,<br />in stories.</h2>
          </div>

          <div className={styles.track}>
            <svg viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
              <path d="M -80 468 C 250 344, 540 344, 800 468 S 1350 592, 1680 468" />
            </svg>
          </div>

          <div className={`${styles.activeStory} ${styles.visible}`} aria-live="polite">
            <div className={styles.activeIndex}>{formatIndex(activeStoryIndex)} / 09</div>
            <div className={styles.tag}>{activeStory.tag}</div>
            <h3>{activeStory.title}</h3>
            <p>{activeStory.quote}</p>
          </div>

          <div className={styles.cards} ref={cardsLayerRef}>
            {stories.map((story, index) => (
              <article
                key={`${story.title}-${index}`}
                ref={(element) => { cardRefs.current[index] = element; }}
                className={styles.storyCard}
                data-index={index + 1}
                onMouseEnter={(e) => {
                  setHoveredStory(story);
                  if (hoverInfoRef.current && hoverInfoRef.current.parentElement) {
                    const parentRect = hoverInfoRef.current.parentElement.getBoundingClientRect();
                    const cardRect = e.currentTarget.getBoundingClientRect();
                    const cardCenterX = cardRect.left + cardRect.width / 2;
                    const shouldPlaceBelow = cardCenterX < parentRect.left + parentRect.width * 0.5;
                    const x = cardCenterX - parentRect.left;
                    const y = (shouldPlaceBelow ? cardRect.bottom : cardRect.top) - parentRect.top;
                    setHoverPlacement(shouldPlaceBelow ? 'below' : 'above');
                    hoverInfoRef.current.style.setProperty('--mouse-x', `${x}px`);
                    hoverInfoRef.current.style.setProperty('--mouse-y', `${y}px`);
                  }
                }}
                onMouseLeave={() => setHoveredStory(null)}
                onClick={() => openDetail(index)}
              >
                <div
                  ref={(element) => { photoRefs.current[index] = element; }}
                  className={styles.photo}
                >
                  <Image
                    src={story.image}
                    alt={`${story.title} hospitality story`}
                    fill
                    sizes="(max-width: 768px) 46vw, 210px"
                    className={styles.cardImage}
                  />
                  <div className={styles.cardMeta}>
                    <small>{story.meta}</small>
                    <strong>{story.cardTitle}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div
            ref={hoverInfoRef}
            className={`${styles.hoverInfo} ${hoverPlacement === 'below' ? styles.below : ''} ${hoveredStory ? styles.visible : ''}`}
          >
            <div className={styles.tag}>{hoveredStory?.tag ?? stories[0].tag}</div>
            <h3>{hoveredStory?.title ?? stories[0].title}</h3>
            <p>{hoveredStory?.desc ?? stories[0].desc}</p>
            <div className={styles.quote}>{hoveredStory?.quote ?? stories[0].quote}</div>
          </div>

          <div className={styles.progress}>
            <div className={styles.progressLine}><span ref={progressBarRef} /></div>
            <div className={styles.progressLabel} ref={progressLabelRef}>01 / 09</div>
          </div>
        </div>
      </section>

      <section className={styles.end}>
        <div>
          <div className={styles.eyebrow}>The next story</div>
          <h2>Make space<br />for something memorable.</h2>
          <p>Explore the projects, models and process behind the spaces you have just experienced.</p>
          <Link href="/enquiry" className={styles.endCta}>START AN ENQUIRY →</Link>
        </div>
      </section>

      <div className={`${styles.detail} ${selectedStory ? styles.open : ''}`} aria-hidden={!selectedStory}>
        <div className={styles.detailImage} style={{ backgroundImage: detailBackground }} />
        <div className={styles.detailCopy}>
          <button className={styles.close} onClick={closeDetail} aria-label="Close">×</button>
          <div className={styles.eyebrow}>{selectedStory?.tag ?? stories[0].tag}</div>
          <h2>{selectedStory?.title ?? stories[0].title}</h2>
          <div className={styles.location}>{selectedStory?.location ?? stories[0].location}</div>
          <div className={styles.testimonial}>{selectedStory?.quote ?? stories[0].quote}</div>
          <div className={styles.body}>{selectedStory?.body ?? stories[0].body}</div>
          <div className={styles.detailActions}>
            <Link href="/projects">VIEW PROJECT →</Link>
            <Link href="/journal">READ STORY</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
