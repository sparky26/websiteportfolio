"use client";

import { useState, useEffect } from 'react';
import { WindowId, WindowState } from '@/types/desktop';
import { StartMenu } from './StartMenu';

interface TaskbarProps {
  windows: Record<WindowId, WindowState>;
  startMenuOpen: boolean;
  focusedWindowId: WindowId | null;
  onToggleStartMenu: () => void;
  onCloseStartMenu: () => void;
  onOpenWindow: (id: WindowId) => void;
  onFocusWindow: (id: WindowId) => void;
  onMinimizeWindow: (id: WindowId) => void;
  onRestoreWindow: (id: WindowId) => void;
  onShutDown: () => void;
  onOpenApp: (app: string) => void;
  onToggleClippy: () => void;
}

export function Taskbar({
  windows,
  startMenuOpen,
  focusedWindowId,
  onToggleStartMenu,
  onCloseStartMenu,
  onOpenWindow,
  onFocusWindow,
  onMinimizeWindow,
  onRestoreWindow,
  onShutDown,
  onOpenApp,
  onToggleClippy,
}: TaskbarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindows = Object.values(windows).filter(w => w.isOpen);

  const handleTaskbarItemClick = (win: WindowState) => {
    if (win.isMinimized) {
      onRestoreWindow(win.id);
    } else if (win.id === focusedWindowId) {
      onMinimizeWindow(win.id);
    } else {
      onFocusWindow(win.id);
    }
  };

  return (
    <>
      <StartMenu
        isOpen={startMenuOpen}
        onOpenWindow={onOpenWindow}
        onClose={onCloseStartMenu}
        onShutDown={onShutDown}
        onOpenApp={onOpenApp}
      />
      <div className="win95-taskbar" onClick={(e) => e.stopPropagation()}>
        <button
          className={`win95-start-btn ${startMenuOpen ? 'win95-start-btn--active' : ''}`}
          onClick={onToggleStartMenu}
        >
          <span className="win95-start-flag">{'\u25AA'}</span>
          <span>Start</span>
        </button>
        <div className="win95-taskbar-divider" />
        <div className="win95-taskbar-windows">
          {openWindows.map((win) => (
            <button
              key={win.id}
              className={`win95-taskbar-item ${win.id === focusedWindowId && !win.isMinimized ? 'win95-taskbar-item--active' : ''} ${win.isMinimized ? 'win95-taskbar-item--minimized' : ''}`}
              onClick={() => handleTaskbarItemClick(win)}
              title={win.title}
            >
              {win.title}
            </button>
          ))}
        </div>
        <div className="win95-taskbar-divider" />
        <div className="win95-tray">
          <button className="win95-tray-icon" onClick={onToggleClippy} title="Clippy Assistant">{'\uD83D\uDCCE'}</button>
          <span className="win95-tray-icon" title="Volume">{'\uD83D\uDD0A'}</span>
          <span className="win95-tray-icon" title="Connected">{'\uD83C\uDF10'}</span>
        </div>
        <div className="win95-clock">{time}</div>
      </div>
    </>
  );
}
