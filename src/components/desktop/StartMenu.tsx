"use client";

import { WindowId } from '@/types/desktop';
import { desktopIcons } from '@/config/desktopIcons';

interface StartMenuProps {
  isOpen: boolean;
  onOpenWindow: (id: WindowId) => void;
  onClose: () => void;
  onShutDown: () => void;
  onOpenApp: (app: string) => void;
}

export function StartMenu({ isOpen, onOpenWindow, onClose, onShutDown, onOpenApp }: StartMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="win95-start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="win95-start-menu-sidebar">
        <span>Sparsh95</span>
      </div>
      <div className="win95-start-menu-items">
        <div className="win95-start-menu-header">Programs</div>
        {desktopIcons.map((iconDef) => (
          <button
            key={iconDef.id}
            className="win95-start-menu-item"
            onClick={() => {
              onOpenWindow(iconDef.id);
              onClose();
            }}
          >
            <span className="win95-start-menu-icon">{iconDef.icon}</span>
            <span>{iconDef.label}</span>
          </button>
        ))}
        <div className="win95-start-menu-separator" />
        <div className="win95-start-menu-header">Accessories</div>
        <button
          className="win95-start-menu-item"
          onClick={() => { onOpenApp('notepad'); onClose(); }}
        >
          <span className="win95-start-menu-icon">{'\uD83D\uDCDD'}</span>
          <span>Notepad</span>
        </button>
        <button
          className="win95-start-menu-item"
          onClick={() => { onOpenApp('paint'); onClose(); }}
        >
          <span className="win95-start-menu-icon">{'\uD83C\uDFA8'}</span>
          <span>Paint</span>
        </button>
        <button
          className="win95-start-menu-item"
          onClick={() => { onOpenApp('cmd'); onClose(); }}
        >
          <span className="win95-start-menu-icon">{'\u2328\uFE0F'}</span>
          <span>Command Prompt</span>
        </button>
        <div className="win95-start-menu-separator" />
        <div className="win95-start-menu-header">Games</div>
        <button
          className="win95-start-menu-item"
          onClick={() => { onOpenApp('minesweeper'); onClose(); }}
        >
          <span className="win95-start-menu-icon">{'\uD83D\uDCA3'}</span>
          <span>Minesweeper</span>
        </button>
        <button
          className="win95-start-menu-item"
          onClick={() => { onOpenApp('solitaire'); onClose(); }}
        >
          <span className="win95-start-menu-icon">{'\uD83C\uDCA1'}</span>
          <span>Solitaire</span>
        </button>
        <div className="win95-start-menu-separator" />
        <button
          className="win95-start-menu-item"
          onClick={() => { onShutDown(); onClose(); }}
        >
          <span className="win95-start-menu-icon">{'\uD83D\uDEAB'}</span>
          <span>Shut Down...</span>
        </button>
      </div>
    </div>
  );
}
