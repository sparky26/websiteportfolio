"use client";

import { useState, useEffect } from 'react';

const CLIPPY_TIPS = [
  "It looks like you're hiring a developer! Would you like help?",
  "Did you know? This portfolio runs on caffeine and nostalgia.",
  "Tip: Try the Konami code for a surprise! \u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA",
  "I see you're browsing. Everything here is hand-crafted with React!",
  "Pro tip: Right-click the desktop for more options.",
  "Fun fact: This entire site could fit on a floppy disk! \uD83D\uDCBE",
  "Need a developer? You've come to the right desktop.",
  "Try opening Minesweeper from the Start Menu! \uD83D\uDCA3",
  "You can drag windows around! Just like the real thing.",
  "Try typing 'hire' in the Command Prompt. Trust me.",
  "Check out Paint in the Start Menu. Bob Ross would be proud.",
  "Open Notepad for some hidden secrets... \uD83D\uDD0D",
];

interface ClippyProps {
  onDismiss: () => void;
}

export function ClippyAssistant({ onDismiss }: ClippyProps) {
  const [tip] = useState(() => CLIPPY_TIPS[Math.floor(Math.random() * CLIPPY_TIPS.length)]);
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setEntering(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto dismiss after 12 seconds
  useEffect(() => {
    const timer = setTimeout(onDismiss, 12000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`clippy-container ${entering ? 'clippy--entering' : ''}`}>
      <div className="clippy-bubble">
        <button className="clippy-close" onClick={onDismiss}>&times;</button>
        <p className="clippy-text">{tip}</p>
      </div>
      <div className="clippy-character" onClick={onDismiss} title="Dismiss Clippy">
        {'\uD83D\uDCCE'}
      </div>
    </div>
  );
}
