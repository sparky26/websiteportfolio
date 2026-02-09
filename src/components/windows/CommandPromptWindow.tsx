"use client";

import { useState, useRef, useEffect, useCallback } from 'react';

const WELCOME = `Microsoft(R) Windows 95
(C) Copyright Microsoft Corp 1981-1995.

C:\\SPARSH>`;

const HELP_TEXT = `
Available commands:
  help     - Show this help
  dir      - List files
  cls      - Clear screen
  echo     - Echo text
  ver      - Show version
  date     - Show date
  time     - Show time
  color    - Change color (green/amber/white)
  hire     - ???
  about    - About this system
  skills   - List skills
  exit     - Close prompt
`;

const DIR_TEXT = `
 Volume in drive C is SPARSH95
 Directory of C:\\SPARSH

.              <DIR>        02-09-26  12:00a
..             <DIR>        02-09-26  12:00a
RESUME   PDF       42,069  02-09-26  12:00a
PROJECTS DIR        <DIR>  02-09-26  12:00a
SKILLS   TXT         1,337  02-09-26  12:00a
README   TXT         2,048  02-09-26  12:00a
SECRETS  ???           404  02-09-26  12:00a
         5 file(s)     45,858 bytes
         2 dir(s)  420,690,000 bytes free
`;

const HIRE_TEXT = `
\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551                                      \u2551
\u2551   \uD83C\uDF89 CONGRATULATIONS! \uD83C\uDF89             \u2551
\u2551                                      \u2551
\u2551   You found the secret command!      \u2551
\u2551   Sparsh is available for hire!      \u2551
\u2551                                      \u2551
\u2551   Email: Check the Contact window    \u2551
\u2551   Status: Ready to ship code!        \u2551
\u2551                                      \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D
`;

const SKILLS_TEXT = `
=== SKILL TREE (Lvl 99) ===
[\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] Python
[\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591] JavaScript/TypeScript
[\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591] React/Next.js
[\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591] Machine Learning
[\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591] Cloud (AWS/GCP)
[\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591] Problem Solving
[\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] Googling Stack Overflow
`;

const ABOUT_TEXT = `
Sparsh Portfolio OS v95.0
Built with Next.js + React + Pure CSS
Powered by: Caffeine, Curiosity, and Code
Status: Open to opportunities!
`;

export function CommandPromptWindow() {
  const [lines, setLines] = useState<string[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [promptColor, setPromptColor] = useState('#C0C0C0');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [lines]);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    let output = '';

    switch (command) {
      case '':
        break;
      case 'help':
        output = HELP_TEXT;
        break;
      case 'dir':
      case 'ls':
        output = DIR_TEXT;
        break;
      case 'cls':
      case 'clear':
        setLines(['C:\\SPARSH>']);
        return;
      case 'echo':
        output = '\n' + (args || '');
        break;
      case 'ver':
        output = '\nSparsh Portfolio OS [Version 95.0.2026]\nPowered by Next.js and nostalgia';
        break;
      case 'date':
        output = `\nThe current date is: ${new Date().toLocaleDateString()}`;
        break;
      case 'time':
        output = `\nThe current time is: ${new Date().toLocaleTimeString()}`;
        break;
      case 'color':
        if (args === 'green') { setPromptColor('#00FF00'); output = '\nColor changed to green.'; }
        else if (args === 'amber') { setPromptColor('#FFB000'); output = '\nColor changed to amber.'; }
        else if (args === 'white') { setPromptColor('#C0C0C0'); output = '\nColor changed to white.'; }
        else { output = '\nUsage: color [green|amber|white]'; }
        break;
      case 'hire':
        output = HIRE_TEXT;
        break;
      case 'about':
        output = ABOUT_TEXT;
        break;
      case 'skills':
        output = SKILLS_TEXT;
        break;
      case 'exit':
        output = "\nNice try! This window cannot be closed from here.\nUse the X button like a normal person. \uD83D\uDE04";
        break;
      case 'sudo':
        output = '\nThis incident will be reported. \uD83D\uDEA8\n(Just kidding, you\'re not on Linux)';
        break;
      case 'rm':
        output = '\nNice try! No files were harmed. \uD83D\uDEE1\uFE0F';
        break;
      case 'cd':
        output = '\nC:\\SPARSH>\nYou\'re already home.';
        break;
      case 'format':
        output = '\nERROR: Access denied. Nice try though. \uD83D\uDE08';
        break;
      default:
        output = `\n'${command}' is not recognized as an internal or external command,\noperable program or batch file.\nType 'help' for available commands.`;
    }

    setLines(prev => [...prev, cmd, output, '\nC:\\SPARSH>'].filter(Boolean));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setHistory(prev => [...prev, input]);
      setHistoryIdx(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx >= 0) {
        const newIdx = historyIdx + 1;
        if (newIdx >= history.length) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          setHistoryIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    }
  };

  return (
    <div
      className="cmd-window"
      style={{ color: promptColor }}
      onClick={() => inputRef.current?.focus()}
      ref={containerRef}
    >
      {lines.map((line, i) => (
        <pre key={i} className="cmd-line">{line}</pre>
      ))}
      <div className="cmd-input-line">
        <input
          ref={inputRef}
          className="cmd-input"
          style={{ color: promptColor }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}
