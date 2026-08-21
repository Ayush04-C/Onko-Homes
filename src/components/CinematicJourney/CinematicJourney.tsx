'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CinematicJourney.module.css';

const CONFIG = {
  videoSrc: "/journey-combined-trimmed.mp4",
  seekThreshold: 0.016,
  introFadeEnd: 0.145,
};

type HotspotKeyframe = {
  time: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type HotspotConfig = {
  id: string;
  href: string;
  label: string;
  external?: boolean;
  activeStart: number;
  activeEnd: number;
  keyframes: HotspotKeyframe[];
};

type TransitionCardConfig = {
  start: number;
  end: number;
  kicker: string;
  title: string;
};

const HOTSPOTS: HotspotConfig[] = [
  {
    id: 'project',
    href: '/projects',
    label: 'Go to Projects section',
    activeStart: 4.25,
    activeEnd: 6,
    keyframes: [
      { time: 3.6, x: 62, y: 41, width: 36, height: 20 },
      { time: 4.25, x: 66, y: 47, width: 40, height: 22 },
      { time: 6, x: 64, y: 55, width: 40, height: 22 },
      { time: 6.6, x: 63, y: 59, width: 38, height: 20 },
    ],
  },
  {
    id: 'models',
    href: 'https://www.oknomodhomes.com/models',
    label: 'Go to Models section',
    external: true,
    activeStart: 9,
    activeEnd: 10,
    keyframes: [
      { time: 8.2, x: 72, y: 28, width: 46, height: 20 },
      { time: 9, x: 72, y: 48, width: 48, height: 22 },
      { time: 10, x: 70, y: 58, width: 50, height: 22 },
    ],
  },
  {
    id: 'process',
    href: '/process',
    label: 'Go to Process section',
    activeStart: 9.8,
    activeEnd: 10.25,
    keyframes: [
      { time: 9.8, x: 67, y: 41, width: 46, height: 17 },
      { time: 10.05, x: 67, y: 43, width: 50, height: 17 },
      { time: 10.25, x: 58, y: 43, width: 46, height: 17 },
    ],
  },
  {
    id: 'sustainability',
    href: 'https://www.oknomodhomes.com/sustainability',
    label: 'Go to Sustainability section',
    external: true,
    activeStart: -1,
    activeEnd: -1,
    keyframes: [
      { time: 11.8, x: 44, y: 58, width: 42, height: 18 },
      { time: 12.5, x: 50, y: 52, width: 44, height: 18 },
      { time: 13.15, x: 55, y: 45, width: 44, height: 18 },
    ],
  },
  {
    id: 'hospitality',
    href: '/hospitality',
    label: 'Go to Hospitality section',
    activeStart: 10.85,
    activeEnd: 12.8,
    keyframes: [
      { time: 10.85, x: 68, y: 42, width: 52, height: 15 },
      { time: 11.7, x: 70, y: 48, width: 54, height: 15 },
      { time: 12.8, x: 69, y: 54, width: 54, height: 16 },
    ],
  },
  {
    id: 'about',
    href: '/about',
    label: 'Go to About section',
    activeStart: 12.95,
    activeEnd: Number.POSITIVE_INFINITY,
    keyframes: [
      { time: 12.95, x: 61, y: 20, width: 42, height: 15 },
      { time: 13.65, x: 58, y: 22, width: 44, height: 15 },
      { time: 14.85, x: 53, y: 24, width: 42, height: 15 },
    ],
  },
];

const TRANSITION_CARDS: TransitionCardConfig[] = [
  {
    start: 9.22,
    end: 9.72,
    kicker: 'Process',
    title: '90 Day Build',
  },
  {
    start: 10.38,
    end: 10.95,
    kicker: 'Hospitality',
    title: 'History & Reviews',
  },
];

export default function CinematicJourney() {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const [debugHotspots, setDebugHotspots] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const transitionCardRef = useRef<HTMLDivElement>(null);
  const transitionKickerRef = useRef<HTMLSpanElement>(null);
  const transitionTitleRef = useRef<HTMLSpanElement>(null);
  const hotspotRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const journey = journeyRef.current;
    const video = videoRef.current;
    const intro = introRef.current;
    const progressFill = progressFillRef.current;
    const transitionCard = transitionCardRef.current;
    const transitionKicker = transitionKickerRef.current;
    const transitionTitle = transitionTitleRef.current;

    if (!journey || !video || !intro || !progressFill || !transitionCard || !transitionKicker || !transitionTitle) return;

    setDebugHotspots(new URLSearchParams(window.location.search).get('debug') === '1');

    let targetProgress = 0;
    let duration = 0;
    let lastDesiredTime = -1;
    let rafId = 0;

    const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

    const getScrollProgress = () => {
      const rect = journey.getBoundingClientRect();
      const scrollY = window.scrollY;
      const componentTop = scrollY + rect.top;
      const maxScroll = Math.max(1, rect.height - window.innerHeight);

      if (scrollY < componentTop) return 0;
      if (scrollY > componentTop + maxScroll) return 1;

      return clamp((scrollY - componentTop) / maxScroll);
    };

    const interpolateKeyframe = (keyframes: HotspotKeyframe[], time: number) => {
      let previous = keyframes[0];
      let next = keyframes[keyframes.length - 1];

      for (let i = 1; i < keyframes.length; i += 1) {
        if (time <= keyframes[i].time) {
          next = keyframes[i];
          previous = keyframes[i - 1];
          break;
        }
      }

      if (time <= keyframes[0].time) {
        previous = keyframes[0];
        next = keyframes[0];
      }

      const span = Math.max(0.001, next.time - previous.time);
      const t = clamp((time - previous.time) / span);

      return {
        x: previous.x + (next.x - previous.x) * t,
        y: previous.y + (next.y - previous.y) * t,
        width: previous.width + (next.width - previous.width) * t,
        height: previous.height + (next.height - previous.height) * t,
      };
    };

    const updateHotspots = (videoTime: number) => {
      const videoWidth = video.videoWidth || 1280;
      const videoHeight = video.videoHeight || 720;
      const containerWidth = video.clientWidth;
      const containerHeight = video.clientHeight;

      if (!containerWidth || !containerHeight) return;

      const videoAspect = videoWidth / videoHeight;
      const containerAspect = containerWidth / containerHeight;
      const renderedWidth = containerAspect > videoAspect
        ? containerWidth
        : containerHeight * videoAspect;
      const renderedHeight = containerAspect > videoAspect
        ? containerWidth / videoAspect
        : containerHeight;
      const offsetX = (containerWidth - renderedWidth) / 2;
      const offsetY = (containerHeight - renderedHeight) / 2;

      HOTSPOTS.forEach((hotspot, index) => {
        const element = hotspotRefs.current[index];
        if (!element) return;

        const frame = interpolateKeyframe(hotspot.keyframes, videoTime);
        const active = videoTime >= hotspot.activeStart && videoTime <= hotspot.activeEnd;

        element.style.left = `${offsetX + renderedWidth * ((frame.x - frame.width / 2) / 100)}px`;
        element.style.top = `${offsetY + renderedHeight * ((frame.y - frame.height / 2) / 100)}px`;
        element.style.width = `${renderedWidth * (frame.width / 100)}px`;
        element.style.height = `${renderedHeight * (frame.height / 100)}px`;
        element.classList.toggle(styles.hotspotActive, active);
        element.setAttribute('aria-hidden', active ? 'false' : 'true');
        element.tabIndex = active ? 0 : -1;
      });
    };

    const updateTransitionCard = (videoTime: number) => {
      const card = TRANSITION_CARDS.find((transition) => (
        videoTime >= transition.start && videoTime <= transition.end
      ));

      if (!card) {
        transitionCard.classList.remove(styles.transitionCardActive);
        return;
      }

      const progress = clamp((videoTime - card.start) / Math.max(0.001, card.end - card.start));
      const opacity = Math.sin(progress * Math.PI);
      const scale = 0.72 + progress * 1.05;
      const blur = 14 - opacity * 8;

      transitionKicker.textContent = card.kicker;
      transitionTitle.textContent = card.title;
      transitionCard.style.setProperty('--transition-opacity', String(opacity));
      transitionCard.style.setProperty('--transition-scale', String(scale));
      transitionCard.style.setProperty('--transition-blur', `${blur}px`);
      transitionCard.classList.add(styles.transitionCardActive);
    };

    const tick = () => {
      targetProgress = getScrollProgress();

      const desired = duration ? targetProgress * duration : 0;

      if (
        duration &&
        Number.isFinite(desired) &&
        Math.abs(lastDesiredTime - desired) > CONFIG.seekThreshold
      ) {
        try {
          video.currentTime = desired;
          lastDesiredTime = desired;
        } catch { }
      }
      updateHotspots(desired);
      updateTransitionCard(desired);

      // Intro
      const introT = clamp(targetProgress / CONFIG.introFadeEnd);
      intro.style.opacity = String(1 - introT);
      intro.style.transform = `translateY(${-20 * introT}px)`;

      // Progress
      progressFill.style.transform = `scaleX(${targetProgress})`;

      rafId = requestAnimationFrame(tick);
    };

    const handleLoadedMetadata = () => {
      duration = video.duration || 0;
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", () => video.pause());
    video.addEventListener("play", () => video.pause());

    const unlockVideo = () => {
      video.muted = true;
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.then === "function") {
        playAttempt.then(() => video.pause()).catch(() => { });
      }
      window.removeEventListener("pointerdown", unlockVideo);
      window.removeEventListener("touchstart", unlockVideo);
      window.removeEventListener("wheel", unlockVideo);
    };

    window.addEventListener("pointerdown", unlockVideo, { passive: true });
    window.addEventListener("touchstart", unlockVideo, { passive: true });
    window.addEventListener("wheel", unlockVideo, { passive: true, once: true });

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    cancelAnimationFrame(rafId);
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("pointerdown", unlockVideo);
      window.removeEventListener("touchstart", unlockVideo);
      window.removeEventListener("wheel", unlockVideo);
    };
  }, []);

  const handleEnterPage = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (isLeaving) return;
    setIsLeaving(true);
    setTimeout(() => {
      router.push(path);
    }, 780);
  };

  return (
    <div ref={journeyRef} id="journey" className={`${styles.journey} ${isLeaving ? styles.leaving : ''}`}>
      <section className={styles.stage} aria-label="OKNO cinematic journey">
        <video
          ref={videoRef}
          className={styles.journeyVideo}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          src={CONFIG.videoSrc}
        />

        <div className={styles.videoFallback} aria-hidden="true" />
        <div className={styles.atmosphere} aria-hidden="true" />
        <div ref={transitionCardRef} className={styles.journeyTransitionCard} aria-hidden="true">
          <div className={styles.transitionDiamond}>
            <span ref={transitionKickerRef} className={styles.transitionKicker} />
            <span ref={transitionTitleRef} className={styles.transitionTitle} />
          </div>
        </div>

        <div ref={introRef} className={styles.intro}>
          <div className={styles.introMeta}>OKNO / Journey 01</div>
          <h1>Into the<br />Landscape.</h1>
          <small>Scroll slowly</small>
        </div>

        <div className={`${styles.hotspotLayer} ${debugHotspots ? styles.debugHotspots : ''}`}>
          {HOTSPOTS.map((hotspot, index) => (
            <a
              key={hotspot.id}
              ref={(element) => { hotspotRefs.current[index] = element; }}
              className={styles.hotspot}
              href={hotspot.href}
              aria-label={hotspot.label}
              target={hotspot.external ? '_blank' : undefined}
              rel={hotspot.external ? 'noopener' : undefined}
              onClick={(hotspot.id === 'project' || hotspot.id === 'hospitality') ? (e) => handleEnterPage(e, hotspot.href) : undefined}
            />
          ))}
        </div>

        <div className={styles.scrollUi} aria-hidden="true">
          <div className={styles.scrollLabel}>Scroll to travel</div>
          <div className={styles.progressTrack}>
            <div ref={progressFillRef} className={styles.progressFill} />
          </div>
        </div>
      </section>
      <div className={styles.transitionLayer} aria-hidden="true"></div>
    </div>
  );
}
