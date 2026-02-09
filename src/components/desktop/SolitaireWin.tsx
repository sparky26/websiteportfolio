"use client";

import { useRef, useEffect } from 'react';

interface Card {
  x: number;
  y: number;
  vx: number;
  vy: number;
  suit: string;
  value: string;
  color: string;
}

const SUITS = ['\u2660', '\u2665', '\u2666', '\u2663'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUIT_COLORS: Record<string, string> = {
  '\u2660': '#000', '\u2663': '#000',
  '\u2665': '#FF0000', '\u2666': '#FF0000',
};

export function SolitaireWin({ onDismiss }: { onDismiss: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cards: Card[] = [];
    let cardIndex = 0;
    const spawnPositions = [
      canvas.width * 0.2,
      canvas.width * 0.4,
      canvas.width * 0.6,
      canvas.width * 0.8,
    ];

    // Fill background with green felt
    ctx.fillStyle = '#006400';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let spawnTimer: ReturnType<typeof setTimeout>;
    function spawnCard() {
      if (cardIndex >= 52) return;
      const suit = SUITS[cardIndex % 4];
      const value = VALUES[Math.floor(cardIndex / 4) % 13];
      const spawnX = spawnPositions[cardIndex % 4];
      cards.push({
        x: spawnX,
        y: -80,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 3 + 1,
        suit,
        value,
        color: SUIT_COLORS[suit],
      });
      cardIndex++;
      spawnTimer = setTimeout(spawnCard, 80);
    }
    spawnCard();

    let animId: number;
    function draw() {
      // Don't clear canvas - cards leave trails (classic solitaire effect!)
      for (const card of cards) {
        card.vy += 0.4; // gravity
        card.x += card.vx;
        card.y += card.vy;

        // Bounce off side walls
        if (card.x < 0) { card.x = 0; card.vx *= -0.8; }
        if (card.x > canvas!.width - 55) { card.x = canvas!.width - 55; card.vx *= -0.8; }

        // Bounce off bottom
        if (card.y > canvas!.height - 75) {
          card.y = canvas!.height - 75;
          card.vy *= -0.75;
          if (Math.abs(card.vy) < 2) card.vy = 0;
        }

        // Draw card
        ctx!.fillStyle = '#FFF';
        ctx!.fillRect(card.x, card.y, 50, 70);
        ctx!.strokeStyle = '#333';
        ctx!.lineWidth = 1;
        ctx!.strokeRect(card.x, card.y, 50, 70);

        // Card value
        ctx!.fillStyle = card.color;
        ctx!.font = 'bold 14px serif';
        ctx!.fillText(card.value, card.x + 4, card.y + 16);

        // Suit
        ctx!.font = '22px serif';
        ctx!.fillText(card.suit, card.x + 14, card.y + 48);
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(spawnTimer);
    };
  }, []);

  return (
    <div className="solitaire-win" onClick={onDismiss}>
      <canvas ref={canvasRef} />
      <div className="solitaire-win-text">
        {'\uD83C\uDFC6'} You Win! Click anywhere to dismiss
      </div>
    </div>
  );
}
