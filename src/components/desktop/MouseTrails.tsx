"use client";

import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 8;
const THROTTLE_MS = 40;

export function MouseTrails() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTime = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime.current < THROTTLE_MS) return;
      lastTime.current = now;

      const dot = document.createElement('div');
      dot.className = 'mouse-trail-dot';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      container.appendChild(dot);

      // Remove dot after animation
      setTimeout(() => {
        dot.remove();
      }, TRAIL_LENGTH * THROTTLE_MS + 200);
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      // Clean up any remaining dots
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} className="mouse-trails" />;
}
