"use client";

import { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [delayedPosition, setDelayedPosition] = useState({ x: -100, y: -100 });
  
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';
    
    // Also override cursor for all interactive elements
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      setDelayedPosition((prev) => {
        // Smooth easing for the outer circle
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.25,
          y: prev.y + dy * 0.25,
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = '';
      document.head.removeChild(style);
    };
  }, [position]);

  return (
    <>
      <div 
        className={styles.cursorDot} 
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} 
      />
      <div 
        className={styles.cursorCircle} 
        style={{ transform: `translate3d(${delayedPosition.x}px, ${delayedPosition.y}px, 0)` }} 
      />
    </>
  );
}
