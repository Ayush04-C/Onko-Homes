"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Process.module.css";

type SceneId = "intro" | "land" | "drawing" | "locked" | "factory";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));
const journeySnapPoints = [0, 0.31, 0.58, 0.77, 0.94];

const scenes: Record<
  SceneId,
  { overline: string; title: string; copy: string }
> = {
  intro: {
    overline: "The journey",
    title: "From bare land to a lit window.",
    copy: "Ninety days. Six stops. Scroll through the route from the first survey line to precision manufacturing.",
  },
  land: {
    overline: "Stop 01 — Day 0",
    title: "The Land",
    copy: "It begins with a walk on your plot. We read the slope, the sun and the access—then mark the one line every drawing will answer to.",
  },
  drawing: {
    overline: "Stop 02 — Days 1–14",
    title: "The Drawing",
    copy: "In the studio, the home takes its exact shape: footprint, elevations and openings resolved against the land. What is drawn here is what gets built.",
  },
  locked: {
    overline: "Stop 02 — Design locked",
    title: "A House, Precisely Defined",
    copy: "The plan becomes one complete architectural model. Its envelope, glazing and material language are resolved before production begins.",
  },
  factory: {
    overline: "Stop 03 — Days 14–48",
    title: "The Factory",
    copy: "At Kothur, the approved home moves into controlled manufacturing—formed, fitted and checked indoors before it travels to the site.",
  },
};

const stops = [
  { number: "01", label: "The Land", timing: "Day 0", progress: 0.31 },
  { number: "02", label: "The Drawing", timing: "Days 1–14", progress: 0.58 },
  { number: "03", label: "The Factory", timing: "Days 14–48", progress: 0.94 },
];

function setVideoProgress(video: HTMLVideoElement | null, progress: number) {
  if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
  const target = Math.min(video.duration - 0.03, Math.max(0, video.duration * clamp(progress)));
  if (video.seeking) return;
  if (Math.abs(video.currentTime - target) > 0.045) video.currentTime = target;
}

export default function ProcessJourney() {
  const trackRef = useRef<HTMLElement>(null);
  const landVideoRef = useRef<HTMLVideoElement>(null);
  const drawingVideoRef = useRef<HTMLVideoElement>(null);
  const lockVideoRef = useRef<HTMLVideoElement>(null);
  const smoothScrollToRef = useRef<((top: number) => void) | null>(null);
  const [scene, setScene] = useState<SceneId>("intro");
  const [day, setDay] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reducedMotion.matches || !finePointer.matches) return;

    let frame = 0;
    let current = window.scrollY;
    let target = current;
    let animationFrom = current;
    let animationStartedAt = performance.now();
    const animationDuration = 2000;
    let wheelGestureActive = false;
    let wheelGestureDirection = 0;
    let wheelGestureTimer = 0;

    const maximumScroll = () =>
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

    const startAnimation = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(animate);
    };

    const animate = (time: number) => {
      const progress = clamp((time - animationStartedAt) / animationDuration);
      const easedProgress = (1 - Math.cos(Math.PI * progress)) / 2;
      current = animationFrom + (target - animationFrom) * easedProgress;
      window.scrollTo(0, current);

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      } else {
        current = target;
        window.scrollTo(0, target);
        frame = 0;
      }
    };

    const scrollTo = (top: number) => {
      animationFrom = window.scrollY;
      current = animationFrom;
      target = Math.min(maximumScroll(), Math.max(0, top));
      animationStartedAt = performance.now();
      startAnimation();
    };

    const journeyMetrics = () => {
      const track = trackRef.current;
      if (!track) return null;
      const top = window.scrollY + track.getBoundingClientRect().top;
      return {
        top,
        distance: Math.max(track.offsetHeight - window.innerHeight, 1),
      };
    };

    const moveToAdjacentStage = (direction: number) => {
      const metrics = journeyMetrics();
      if (!metrics) return;

      const progress = clamp((target - metrics.top) / metrics.distance);
      const nextProgress =
        direction > 0
          ? journeySnapPoints.find((point) => point > progress + 0.012)
          : [...journeySnapPoints].reverse().find((point) => point < progress - 0.012);

      if (nextProgress === undefined) return;
      scrollTo(metrics.top + metrics.distance * nextProgress);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return;

      const multiplier =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 18
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;
      const delta = event.deltaY * multiplier;
      if (!delta) return;

      event.preventDefault();
      const direction = Math.sign(delta);
      if (!wheelGestureActive || direction !== wheelGestureDirection) {
        if (!frame) target = window.scrollY;
        moveToAdjacentStage(direction);
        wheelGestureActive = true;
        wheelGestureDirection = direction;
      }

      window.clearTimeout(wheelGestureTimer);
      wheelGestureTimer = window.setTimeout(() => {
        wheelGestureActive = false;
        wheelGestureDirection = 0;
      }, 140);
    };

    const syncNativeScroll = () => {
      if (frame) return;
      current = window.scrollY;
      target = current;
    };

    smoothScrollToRef.current = scrollTo;
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", syncNativeScroll, { passive: true });
    window.addEventListener("resize", syncNativeScroll);

    return () => {
      smoothScrollToRef.current = null;
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", syncNativeScroll);
      window.removeEventListener("resize", syncNativeScroll);
      window.clearTimeout(wheelGestureTimer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let targetProgress = 0;
    let renderedProgress = 0;
    let previousTime = performance.now();
    let currentScene: SceneId = "intro";
    let currentDay = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const readProgress = () => {
      const rect = track.getBoundingClientRect();
      const scrollable = Math.max(track.offsetHeight - window.innerHeight, 1);
      return clamp(-rect.top / scrollable);
    };

    const render = (progress: number) => {
      const nextScene: SceneId =
        progress < 0.08
          ? "intro"
          : progress < 0.34
            ? "land"
            : progress < 0.63
              ? "drawing"
              : progress < 0.8
                ? "locked"
                : "factory";
      const nextDay =
        nextScene === "intro" || nextScene === "land"
          ? 0
          : nextScene === "drawing"
            ? Math.round(1 + range(progress, 0.34, 0.63) * 13)
            : 14;

      if (nextScene !== currentScene) {
        currentScene = nextScene;
        setScene(nextScene);
      }
      if (nextDay !== currentDay) {
        currentDay = nextDay;
        setDay(nextDay);
      }

      track.style.setProperty("--journey-progress", String(progress));
      track.style.setProperty("--land-opacity", String(1 - range(progress, 0.31, 0.39)));
      track.style.setProperty(
        "--drawing-opacity",
        String(Math.min(range(progress, 0.31, 0.39), 1 - range(progress, 0.58, 0.66))),
      );
      track.style.setProperty("--lock-opacity", String(range(progress, 0.58, 0.66)));
      track.style.setProperty("--factory-veil", String(range(progress, 0.78, 0.9)));

      if (progress <= 0.41) {
        setVideoProgress(landVideoRef.current, range(progress, 0, 0.31));
      }
      if (progress >= 0.28 && progress <= 0.69) {
        setVideoProgress(drawingVideoRef.current, range(progress, 0.34, 0.58));
      }
      if (progress >= 0.55) {
        setVideoProgress(lockVideoRef.current, range(progress, 0.61, 0.77));
      }
    };

    const animate = (time: number) => {
      const elapsed = Math.min((time - previousTime) / 1000, 0.1);
      previousTime = time;
      const ease = reducedMotion.matches ? 1 : 1 - Math.exp(-elapsed * 18);
      renderedProgress += (targetProgress - renderedProgress) * ease;

      if (Math.abs(targetProgress - renderedProgress) < 0.00008) {
        renderedProgress = targetProgress;
      }
      render(renderedProgress);

      if (renderedProgress !== targetProgress) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const requestUpdate = () => {
      targetProgress = readProgress();
      if (!frame) {
        previousTime = performance.now();
        frame = window.requestAnimationFrame(animate);
      }
    };
    const videos = [landVideoRef.current, drawingVideoRef.current, lockVideoRef.current].filter(
      (video): video is HTMLVideoElement => Boolean(video),
    );

    targetProgress = readProgress();
    renderedProgress = targetProgress;
    render(renderedProgress);
    videos.forEach((video) => {
      video.addEventListener("loadedmetadata", requestUpdate);
      video.addEventListener("seeked", requestUpdate);
    });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      videos.forEach((video) => {
        video.removeEventListener("loadedmetadata", requestUpdate);
        video.removeEventListener("seeked", requestUpdate);
      });
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goToProgress = (progress: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = window.scrollY + track.getBoundingClientRect().top;
    const scrollable = Math.max(track.offsetHeight - window.innerHeight, 1);
    const destination = top + scrollable * progress;
    if (smoothScrollToRef.current) {
      smoothScrollToRef.current(destination);
    } else {
      window.scrollTo({ top: destination, behavior: "smooth" });
    }
  };

  const content = scenes[scene];
  const activeStop = scene === "intro" || scene === "land" ? 0 : scene === "factory" ? 2 : 1;

  return (
    <main className={styles.processPage}>
      <section className={styles.scrollTrack} ref={trackRef} aria-label="OKNO process prototype">
        <div className={styles.stickyViewport}>
          <div className={styles.mediaStage} aria-hidden="true">
            <video className={`${styles.sceneVideo} ${styles.landVideo}`} ref={landVideoRef} muted playsInline preload="auto" poster="/process/land-poster.webp">
              <source media="(min-width: 1024px)" src="/process/land-scan.hq.mp4" type="video/mp4" />
              <source src="/process/land-scan.scrub.mp4" type="video/mp4" />
            </video>
            <video className={`${styles.sceneVideo} ${styles.drawingVideo}`} ref={drawingVideoRef} muted playsInline preload="auto" poster="/process/drawing-poster.webp">
              <source media="(min-width: 1024px)" src="/process/drawing-scan.hq.mp4" type="video/mp4" />
              <source src="/process/drawing-scan.scrub.mp4" type="video/mp4" />
            </video>
            <video className={`${styles.sceneVideo} ${styles.lockVideo}`} ref={lockVideoRef} muted playsInline preload="auto" poster="/process/design-lock-poster.webp">
              <source media="(min-width: 1024px)" src="/process/design-lock.hq.mp4" type="video/mp4" />
              <source src="/process/design-lock.scrub.mp4" type="video/mp4" />
            </video>
            <div className={styles.finalStill} />
            <div className={styles.factoryVeil} />
            <div className={styles.imageTreatment} />
          </div>

          <header className={styles.header}>
            <Link href="/" className={styles.wordmark} aria-label="OKNO Modhomes home"><span>OKNO</span><small>MODHOMES</small></Link>
            <nav className={styles.primaryNav} aria-label="Primary navigation">
              <Link href="/projects">Projects</Link>
              <a href="https://www.oknomodhomes.com/models">Models</a>
              <Link href="/hospitality">Hospitality</Link>
              <Link href="/process" aria-current="page">Process</Link>
              <Link href="/journal">Journal</Link>
            </nav>
          </header>

          <div className={styles.narrative} key={scene} data-scene={scene}>
            <div className={styles.titleGroup}>
              <p className={styles.overline}>{content.overline}</p>
              <h1>{content.title}</h1>
            </div>
            <p className={styles.description}>{content.copy}</p>
          </div>

          <div className={styles.bottomRail}>
            <div className={styles.dayCounter}><span>Day</span><strong>{String(day).padStart(2, "0")}</strong><small>/ 90</small></div>
            <div className={styles.progressBar} aria-label="Process checkpoint navigation">
              <div className={styles.progressTrack} aria-hidden="true"><span /></div>
              {stops.map((stop, index) => (
                <button
                  type="button"
                  className={`${styles.checkpoint} ${index === activeStop ? styles.activeCheckpoint : ""} ${index < activeStop ? styles.passedCheckpoint : ""}`}
                  style={{ left: `${stop.progress * 100}%` }}
                  onClick={() => goToProgress(stop.progress)}
                  aria-label={`Go to ${stop.label}, ${stop.timing}`}
                  key={stop.number}
                >
                  <span>{stop.number} · {stop.label}</span>
                  <i />
                </button>
              ))}
            </div>
            <div className={styles.railStopCount}><span>Stop</span><strong>{String(activeStop + 1).padStart(2, "0")}</strong><small>/ 03</small></div>
          </div>

        </div>
      </section>
    </main>
  );
}
