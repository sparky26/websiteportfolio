"use client";

import { useState } from 'react';

const README_TEXT = `=== README.TXT ===

Welcome to Sparsh's Portfolio OS!

SYSTEM REQUIREMENTS:
- A sense of humor
- Appreciation for retro aesthetics
- Desire to hire talented developers

HIDDEN FEATURES:
- Konami Code (\u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA) = BSOD
- Right-click desktop = Context menu
- Start > Games > Minesweeper
- Start > Games > Solitaire
- Start > Accessories > Command Prompt
  (try typing 'hire' or 'skills')
- Start > Accessories > Paint
- Wait 30 seconds = Screensaver
- Desktop Properties = Wallpaper picker
- System tray \uD83D\uDCCE = Toggle Clippy

CREDITS:
Built with Next.js, React, and pure CSS
No frameworks were harmed in the making
of this portfolio (except my sleep schedule)

\u00A9 2026 Sparsh Industries
All rights reserved.
Best viewed with Netscape Navigator 4.0+
`;

export function NotepadWindow() {
  const [text, setText] = useState(README_TEXT);

  return (
    <div className="notepad-window">
      <div className="notepad-menubar">
        <span className="notepad-menu-item">File</span>
        <span className="notepad-menu-item">Edit</span>
        <span className="notepad-menu-item">Format</span>
        <span className="notepad-menu-item">Help</span>
      </div>
      <textarea
        className="notepad-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
