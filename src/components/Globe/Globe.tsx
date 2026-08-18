'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styles from './Globe.module.css';

interface Mark {
  lat: number;
  lng: number;
  city: string;
  project: string;
  img: string;
}

const marks: Mark[] = [
  {lat:17.385,lng:78.487,city:'Hyderabad, India',project:'Courtyard House 01',img:'/assets/projects/project-highlands.webp'},
  {lat:18.754,lng:73.407,city:'Lonavala, India',project:'Mehul Valley Retreats',img:'/assets/projects/project-highlands.webp'},
  {lat:12.424,lng:75.738,city:'Coorg, India',project:'The Mirror House',img:'/assets/projects/project-highlands.webp'},
  {lat:59.914,lng:10.752,city:'Oslo, Norway',project:'Pine House N02',img:'/assets/projects/project-nordic.webp'},
  {lat:38.722,lng:-9.139,city:'Lisbon, Portugal',project:'Atlantic Courtyard',img:'/assets/projects/project-coast.webp'},
  {lat:49.283,lng:-123.121,city:'Vancouver, Canada',project:'Cedar Annex 04',img:'/assets/projects/project-nordic.webp'},
  {lat:30.267,lng:-97.743,city:'Austin, USA',project:'Hill Country House',img:'/assets/projects/project-desert.webp'},
  {lat:9.928,lng:-84.091,city:'San José, Costa Rica',project:'Cloud Forest Cabin',img:'/assets/projects/project-highlands.webp'},
  {lat:-33.925,lng:18.424,city:'Cape Town, South Africa',project:'Fynbos Coastal Home',img:'/assets/projects/project-coast.webp'},
  {lat:-37.814,lng:144.963,city:'Melbourne, Australia',project:'Mallee Pavilion',img:'/assets/projects/project-desert.webp'}
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [previewStyles, setPreviewStyles] = useState({ left: '50%', top: '50%', tipX: '50%' });
  
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    
    let W = 0, H = 0, R = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf: number;
    let land: any = null;
    
    const projection = d3.geoOrthographic().precision(0.35).clipAngle(90);
    const path = d3.geoPath(projection, ctx);
    const sphere = { type: 'Sphere' as const };
    const graticule = d3.geoGraticule10();
    
    let rot = -78, tilt = -12, roll = -7.5;
    const vel = 0.084;
    let drag = false, moved = false;
    let lx = 0, ly = 0;
    let localHover = -1;
    let chosen = -1;
    let screen: any[] = [];
    
    fetch('/assets/geo/world.geojson')
      .then(r => r.json())
      .then(data => { land = data; })
      .catch(console.warn);
      
    function size() {
      if (!cv) return;
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = Math.max(1, W * dpr);
      cv.height = Math.max(1, H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(H * 0.39, W * 0.285);
      projection.translate([W / 2, H / 2]).scale(R);
    }
    
    function visible(m: Mark) {
      return d3.geoDistance([m.lng, m.lat], [-rot, -tilt]) < Math.PI / 2 - 0.015;
    }
    
    function placePreview(idx: number) {
      const q = screen[idx];
      if (!q || !containerRef.current) return;
      const w = 260; // Assuming max width for preview
      const x = Math.max(w / 2 + 8, Math.min(W - w / 2 - 8, q[0]));
      const tip = Math.max(14, Math.min(w - 14, w / 2 + (q[0] - x)));
      setPreviewStyles({ left: `${x}px`, top: `${q[1] - 31}px`, tipX: `${tip}px` });
    }
    
    function showMark(idx: number) {
      if (idx < 0) {
        chosen = -1;
        setHoverIndex(-1);
        return;
      }
      chosen = idx;
      setHoverIndex(idx);
    }
    
    function pick(x: number, y: number) {
      let best = -1, bd = 20;
      screen.forEach((q, i) => {
        if (!q || !q[2]) return;
        const d = Math.hypot(x - q[0], y - (q[1] - 13));
        if (d < bd) { bd = d; best = i; }
      });
      return best;
    }
    
    function local(e: PointerEvent | MouseEvent) {
      if (!cv) return [0, 0];
      const b = cv.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    }
    
    function down(e: PointerEvent) {
      drag = true; moved = false;
      lx = e.clientX; ly = e.clientY;
      if (cv && cv.setPointerCapture) cv.setPointerCapture(e.pointerId);
    }
    
    function move(e: PointerEvent) {
      if (drag) {
        const dx = e.clientX - lx, dy = e.clientY - ly;
        if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
        rot += dx * 0.22;
        tilt = Math.max(-65, Math.min(65, tilt - dy * 0.16));
        lx = e.clientX; ly = e.clientY;
        return;
      }
      const q = local(e), hit = pick(q[0], q[1]);
      if (hit !== localHover) {
        localHover = hit;
        if(cv) cv.style.cursor = hit > -1 ? 'pointer' : 'grab';
        showMark(hit);
      }
    }
    
    function up(e: PointerEvent) {
      if (!drag) return;
      drag = false;
      if (!moved) {
        const q = local(e), hit = pick(q[0], q[1]);
        if (hit > -1) { localHover = hit; showMark(hit); }
      }
    }
    
    function leave() {
      if (!drag) {
        localHover = -1;
        if(cv) cv.style.cursor = 'grab';
        if (chosen > -1) showMark(-1);
      }
    }
    
    function key(e: KeyboardEvent) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      const step = e.key === 'ArrowLeft' ? -1 : 1;
      localHover = (localHover + step + marks.length) % marks.length;
      const m = marks[localHover];
      rot = -m.lng;
      tilt = Math.max(-60, Math.min(60, -m.lat));
      showMark(localHover);
    }
    
    function drawPin(x: number, y: number, active: boolean) {
      const s = active ? 1.16 : 1, top = y - 13 * s, wide = 7.5 * s, head = 8.5 * s;
      ctx!.save();
      ctx!.shadowColor = 'rgba(110,25,20,.24)';
      ctx!.shadowBlur = active ? 9 : 5;
      ctx!.shadowOffsetY = 2;
      ctx!.fillStyle = '#C93832';
      ctx!.beginPath();
      ctx!.moveTo(x, y);
      ctx!.bezierCurveTo(x - 2 * s, y - 4 * s, x - wide, y - 10 * s, x - wide, y - 15 * s);
      ctx!.bezierCurveTo(x - wide, y - 15 * s - head, x + wide, y - 15 * s - head, x + wide, y - 15 * s);
      ctx!.bezierCurveTo(x + wide, y - 10 * s, x + 2 * s, y - 4 * s, x, y);
      ctx!.closePath();
      ctx!.fill();
      
      ctx!.shadowColor = 'transparent';
      ctx!.fillStyle = '#FFF9F3';
      ctx!.beginPath();
      ctx!.arc(x, top - 2.5 * s, 3.25 * s, 0, Math.PI * 2);
      ctx!.fill();
      
      ctx!.strokeStyle = 'rgba(255,255,255,.25)';
      ctx!.lineWidth = 1.1;
      ctx!.beginPath();
      ctx!.arc(x - 1.2 * s, top - 3 * s, 5.2 * s, 3.5, 5.25);
      ctx!.stroke();
      ctx!.restore();
    }
    
    function draw() {
      if (!drag && localHover < 0) rot += vel;
      projection.rotate([rot, tilt, roll]);
      ctx!.clearRect(0, 0, W, H);
      
      ctx!.beginPath(); path(sphere as any); ctx!.fillStyle = '#F1ECE3'; ctx!.fill();
      ctx!.strokeStyle = 'rgba(160,132,92,.55)'; ctx!.lineWidth = 1.15; ctx!.stroke();
      
      ctx!.beginPath(); path(graticule as any); ctx!.strokeStyle = 'rgba(160,132,92,.17)'; ctx!.lineWidth = 0.65; ctx!.stroke();
      
      if (land) {
        const gold = ctx!.createLinearGradient(W / 2 - R, H / 2 - R, W / 2 + R, H / 2 + R);
        gold.addColorStop(0, '#D7BA75');
        gold.addColorStop(0.5, '#B9934D');
        gold.addColorStop(1, '#8F6D35');
        ctx!.beginPath(); path(land); ctx!.fillStyle = gold; ctx!.fill();
        ctx!.strokeStyle = 'rgba(103,75,32,.52)'; ctx!.lineWidth = 0.55; ctx!.stroke();
      }
      
      screen = [];
      marks.forEach((m, i) => {
        const q = projection([m.lng, m.lat]);
        if(!q) return;
        const front = visible(m);
        screen[i] = [q[0], q[1], front];
        if (!front) return;
        drawPin(q[0], q[1], i === localHover);
      });
      
      if (chosen >= 0 && screen[chosen] && screen[chosen][2]) {
        placePreview(chosen);
      }
      
      raf = requestAnimationFrame(draw);
    }
    
    size();
    cv.addEventListener('pointerdown', down);
    cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('pointerleave', leave);
    cv.addEventListener('keydown', key);
    window.addEventListener('pointerup', up);
    window.addEventListener('resize', size);
    
    draw();
    
    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener('pointerdown', down);
      cv.removeEventListener('pointermove', move);
      cv.removeEventListener('pointerup', up);
      cv.removeEventListener('pointercancel', up);
      cv.removeEventListener('pointerleave', leave);
      cv.removeEventListener('keydown', key);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('resize', size);
    };
  }, []);
  
  const m = hoverIndex >= 0 ? marks[hoverIndex] : null;

  return (
    <div className={styles.globewrap} ref={containerRef}>
      <canvas 
        ref={canvasRef}
        id="globe" 
        className={styles.globe}
        tabIndex={0} 
        role="img" 
        aria-label="Rotating globe showing ten OKNO project locations. Drag to rotate, hover a red location marker to preview its project, or use the arrow keys while focused."
      />
      
      <aside 
        className={`${styles.glPreview} ${m ? styles.on : ''}`} 
        style={{
          left: previewStyles.left, 
          top: previewStyles.top,
          '--tip-x': previewStyles.tipX
        } as React.CSSProperties}
        aria-live="polite" 
        aria-hidden={!m}
      >
        {m && (
          <>
            <div className={styles.pic}>
              <img src={m.img} alt={`${m.project} in ${m.city}`} />
            </div>
            <div className={styles.copy}>
              <div className={styles.city}>{m.city}</div>
              <div className={styles.meta}>
                {Math.abs(m.lat).toFixed(3)}° {m.lat < 0 ? 'S' : 'N'} — {Math.abs(m.lng).toFixed(3)}° {m.lng < 0 ? 'W' : 'E'}
              </div>
              <div className={styles.project}>{m.project}</div>
            </div>
          </>
        )}
      </aside>
      
      <div className={styles.glCap}>
        <span><b className={styles.live}>●</b> Hover a red point to explore</span>
        <span>Drag to rotate — arrow keys to browse</span>
      </div>
    </div>
  );
}
