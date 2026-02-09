"use client";

import { useRef, useEffect, useState } from 'react';

interface ScreensaverProps {
  onDismiss: () => void;
}

export function Screensaver({ onDismiss }: ScreensaverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  // Delay dismiss handler so initial render doesn't trigger it
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; z: number }[] = [];
    const NUM_STARS = 200;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width,
        y: (Math.random() - 0.5) * canvas.height,
        z: Math.random() * canvas.width,
      });
    }

    let animId: number;
    function draw() {
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      for (const star of stars) {
        star.z -= 5;
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas!.width;
          star.y = (Math.random() - 0.5) * canvas!.height;
          star.z = canvas!.width;
        }

        const sx = (star.x / star.z) * canvas!.width + cx;
        const sy = (star.y / star.z) * canvas!.height + cy;
        const size = Math.max(0, (1 - star.z / canvas!.width) * 3);
        const brightness = Math.max(0, 255 - (star.z / canvas!.width) * 255);

        ctx!.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        ctx!.beginPath();
        ctx!.arc(sx, sy, size, 0, Math.PI * 2);
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDismiss = () => {
    if (ready) onDismiss();
  };

  return (
    <div
      className="screensaver"
      onClick={handleDismiss}
      onMouseMove={handleDismiss}
      onKeyDown={handleDismiss}
      onTouchStart={handleDismiss}
      tabIndex={0}
    >
      <canvas ref={canvasRef} />
      <div className="screensaver-text">
        Starfield Screensaver - Move mouse or click to return
      </div>
    </div>
  );
}
