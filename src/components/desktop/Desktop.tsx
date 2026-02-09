"use client";

import { useReducer, useCallback, useEffect, useState, useRef } from 'react';
import { WindowId, WindowState, DesktopState, DesktopAction } from '@/types/desktop';
import { desktopIcons, defaultWindowSizes, getDefaultPosition } from '@/config/desktopIcons';
import { DesktopIconGrid } from './DesktopIconGrid';
import { Win95Window } from './Win95Window';
import { Taskbar } from './Taskbar';
import { ClippyAssistant } from './ClippyAssistant';
import { Screensaver } from './Screensaver';
import { WallpaperPicker, WALLPAPERS } from './WallpaperPicker';
import { MouseTrails } from './MouseTrails';
import { SolitaireWin } from './SolitaireWin';
import { AboutWindow } from '../windows/AboutWindow';
import { ExperienceWindow } from '../windows/ExperienceWindow';
import { LinksWindow } from '../windows/LinksWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { MinesweeperWindow } from '../windows/MinesweeperWindow';
import { NotepadWindow } from '../windows/NotepadWindow';
import { CommandPromptWindow } from '../windows/CommandPromptWindow';
import { PaintWindow } from '../windows/PaintWindow';
import { playStartupSound, playErrorSound } from '@/utils/sounds';

const windowContent: Record<WindowId, React.ReactNode> = {
  about: <AboutWindow />,
  experience: <ExperienceWindow />,
  links: <LinksWindow />,
  skills: <SkillsWindow />,
  projects: <ProjectsWindow />,
  contact: <ContactWindow />,
};

function createInitialState(): DesktopState {
  const windows: Record<string, WindowState> = {};
  desktopIcons.forEach((iconDef, index) => {
    windows[iconDef.id] = {
      id: iconDef.id,
      title: iconDef.windowTitle,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 0,
      position: getDefaultPosition(index),
      size: defaultWindowSizes[iconDef.id],
    };
  });
  return {
    windows: windows as Record<WindowId, WindowState>,
    nextZIndex: 10,
    startMenuOpen: false,
    showShutDown: false,
    isBooting: true,
  };
}

function desktopReducer(state: DesktopState, action: DesktopAction): DesktopState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const win = state.windows[action.id];
      if (win.isOpen && !win.isMinimized) {
        return desktopReducer(state, { type: 'FOCUS_WINDOW', id: action.id });
      }
      if (win.isOpen && win.isMinimized) {
        return desktopReducer(state, { type: 'RESTORE_WINDOW', id: action.id });
      }
      return {
        ...state,
        startMenuOpen: false,
        nextZIndex: state.nextZIndex + 1,
        windows: {
          ...state.windows,
          [action.id]: { ...win, isOpen: true, isMinimized: false, isMaximized: false, zIndex: state.nextZIndex },
        },
      };
    }
    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], isOpen: false, isMinimized: false, isMaximized: false },
        },
      };
    case 'FOCUS_WINDOW':
      return {
        ...state,
        startMenuOpen: false,
        nextZIndex: state.nextZIndex + 1,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], zIndex: state.nextZIndex },
        },
      };
    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], isMinimized: true },
        },
      };
    case 'MAXIMIZE_WINDOW': {
      const win = state.windows[action.id];
      return {
        ...state,
        nextZIndex: state.nextZIndex + 1,
        windows: {
          ...state.windows,
          [action.id]: { ...win, isMaximized: !win.isMaximized, zIndex: state.nextZIndex },
        },
      };
    }
    case 'RESTORE_WINDOW':
      return {
        ...state,
        nextZIndex: state.nextZIndex + 1,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], isMinimized: false, zIndex: state.nextZIndex },
        },
      };
    case 'MOVE_WINDOW':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], position: action.position },
        },
      };
    case 'TOGGLE_START_MENU':
      return { ...state, startMenuOpen: !state.startMenuOpen };
    case 'CLOSE_START_MENU':
      return { ...state, startMenuOpen: false };
    case 'SHOW_SHUTDOWN':
      return { ...state, showShutDown: true, startMenuOpen: false };
    case 'HIDE_SHUTDOWN':
      return { ...state, showShutDown: false };
    case 'BOOT_COMPLETE':
      return { ...state, isBooting: false };
    default:
      return state;
  }
}

function getFocusedWindowId(windows: Record<WindowId, WindowState>): WindowId | null {
  let maxZ = -1;
  let focusedId: WindowId | null = null;
  for (const win of Object.values(windows)) {
    if (win.isOpen && !win.isMinimized && win.zIndex > maxZ) {
      maxZ = win.zIndex;
      focusedId = win.id;
    }
  }
  return focusedId;
}

// Generic draggable app popup
function AppPopup({ title, isOpen, zIndex, width, onClose, onFocus, children }: {
  title: string; isOpen: boolean; zIndex: number; width: number;
  onClose: () => void; onFocus: () => void; children: React.ReactNode;
}) {
  const [pos, setPos] = useState({ x: 150 + Math.random() * 100, y: 60 + Math.random() * 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOff, setDragOff] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => {
      setPos({
        x: Math.max(0, Math.min(e.clientX - dragOff.x, window.innerWidth - 100)),
        y: Math.max(0, Math.min(e.clientY - dragOff.y, window.innerHeight - 60)),
      });
    };
    const up = () => setIsDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, [isDragging, dragOff]);

  if (!isOpen) return null;

  return (
    <div className="win95-window win95-window--desktop win95-window--opening" style={{ left: pos.x, top: pos.y, width, zIndex }} onMouseDown={onFocus}>
      <div className="win95-titlebar" onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); setDragOff({ x: e.clientX - pos.x, y: e.clientY - pos.y }); onFocus(); }}>
        <span className="win95-titlebar-text">{title}</span>
        <div className="win95-titlebar-buttons">
          <button className="win95-btn" onClick={(e) => { e.stopPropagation(); onClose(); }} title="Close">&times;</button>
        </div>
      </div>
      <div className="win95-content win95-window-body" style={{ padding: 0 }}>
        {children}
      </div>
    </div>
  );
}

// Shut Down dialog
function ShutDownDialog({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="shutdown-overlay" onClick={onCancel}>
      <div className="shutdown-dialog win95-window" onClick={(e) => e.stopPropagation()}>
        <div className="win95-titlebar">
          <span className="win95-titlebar-text">Shut Down Windows</span>
        </div>
        <div className="win95-content" style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '13px', color: '#000', margin: '0 0 6px 0' }}>
            It&apos;s now safe to turn off your computer.
          </p>
          <p style={{ fontFamily: 'Comic Sans MS, cursive', fontSize: '12px', color: '#808080', margin: '0 0 16px 0' }}>
            ...just kidding, keep surfing! {'\uD83C\uDFC4'}
          </p>
          <button className="win95-button" onClick={onCancel} style={{ padding: '4px 24px', fontSize: '12px' }}>
            Cancel (Stay Online)
          </button>
        </div>
      </div>
    </div>
  );
}

// BSOD screen
function BSOD({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="bsod" onClick={onDismiss} onKeyDown={onDismiss} tabIndex={0}>
      <div className="bsod-content">
        <h2 className="bsod-title">Windows</h2>
        <p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
        00010E36. The current application will be terminated.</p>
        <p>* Just kidding! This portfolio is crash-free (mostly).</p>
        <p>* Your skills in finding easter eggs are noted on your resume.</p>
        <br />
        <p>Press any key to continue _<span className="bsod-blink">|</span></p>
      </div>
    </div>
  );
}

// Boot sequence
function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 1800),
      setTimeout(() => onComplete(), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="boot-screen">
      <div className="boot-text">
        {stage >= 0 && <p>SPARSH BIOS v95.0</p>}
        {stage >= 1 && <p>Memory test: 640K OK</p>}
        {stage >= 1 && <p>Detecting chai reserves... OK</p>}
        {stage >= 2 && <p>Loading Sparsh95...</p>}
        {stage >= 2 && (
          <div className="boot-progress">
            <div className="boot-progress-bar" />
          </div>
        )}
        {stage >= 3 && <p className="boot-welcome">Welcome!</p>}
      </div>
    </div>
  );
}

// Right-click context menu
function ContextMenu({ x, y, onClose, onProperties, onToggleTrails, trailsOn }: {
  x: number; y: number; onClose: () => void; onProperties: () => void;
  onToggleTrails: () => void; trailsOn: boolean;
}) {
  return (
    <div className="win95-context-menu" style={{ left: x, top: y }} onClick={(e) => e.stopPropagation()}>
      <button className="win95-context-item" onClick={() => { window.location.reload(); }}>Refresh</button>
      <div className="win95-start-menu-separator" />
      <button className="win95-context-item" onClick={() => { onToggleTrails(); onClose(); }}>
        {trailsOn ? '\u2713 ' : ''}Mouse Trails
      </button>
      <div className="win95-start-menu-separator" />
      <button className="win95-context-item" onClick={() => { onProperties(); onClose(); }}>Properties</button>
    </div>
  );
}

export function Desktop() {
  const [state, dispatch] = useReducer(desktopReducer, null, createInitialState);
  const [showBSOD, setShowBSOD] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // App popup states
  const [gameOpen, setGameOpen] = useState(false);
  const [gameZ, setGameZ] = useState(500);
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [notepadZ, setNotepadZ] = useState(501);
  const [paintOpen, setPaintOpen] = useState(false);
  const [paintZ, setPaintZ] = useState(502);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdZ, setCmdZ] = useState(503);

  // Fun features
  const [clippyVisible, setClippyVisible] = useState(false);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [wallpaper, setWallpaper] = useState('teal');
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const [mouseTrailsOn, setMouseTrailsOn] = useState(false);
  const [showSolitaireWin, setShowSolitaireWin] = useState(false);

  // Idle timer for screensaver
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const focusedWindowId = getFocusedWindowId(state.windows);

  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Reset idle timer
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setScreensaverActive(true), 45000);
  }, []);

  // Idle detection for screensaver
  useEffect(() => {
    if (state.isBooting || screensaverActive) return;
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'] as const;
    const handler = () => resetIdleTimer();
    events.forEach(e => window.addEventListener(e, handler));
    resetIdleTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, handler));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [state.isBooting, screensaverActive, resetIdleTimer]);

  // Clippy auto-popup (first time after 8s, then periodically)
  useEffect(() => {
    if (state.isBooting) return;
    const timer = setTimeout(() => setClippyVisible(true), 8000);
    return () => clearTimeout(timer);
  }, [state.isBooting]);

  useEffect(() => {
    if (state.isBooting || clippyVisible) return;
    const interval = setInterval(() => {
      if (Math.random() < 0.25) setClippyVisible(true);
    }, 50000);
    return () => clearInterval(interval);
  }, [state.isBooting, clippyVisible]);

  // Keyboard handler (Escape + Konami code)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch({ type: 'CLOSE_START_MENU' });
        setContextMenu(null);
        if (state.showShutDown) dispatch({ type: 'HIDE_SHUTDOWN' });
        return;
      }
      if (e.key === KONAMI[konamiProgress]) {
        const next = konamiProgress + 1;
        if (next === KONAMI.length) {
          setShowBSOD(true);
          setKonamiProgress(0);
        } else {
          setKonamiProgress(next);
        }
      } else {
        setKonamiProgress(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [konamiProgress, state.showShutDown]);

  const handleOpenWindow = useCallback((id: WindowId) => {
    dispatch({ type: 'OPEN_WINDOW', id });
  }, []);

  const handleDesktopClick = useCallback(() => {
    dispatch({ type: 'CLOSE_START_MENU' });
    setContextMenu(null);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleBootComplete = useCallback(() => {
    dispatch({ type: 'BOOT_COMPLETE' });
    playStartupSound();
  }, []);

  const handleOpenApp = useCallback((app: string) => {
    switch (app) {
      case 'minesweeper': setGameOpen(true); break;
      case 'notepad': setNotepadOpen(true); break;
      case 'paint': setPaintOpen(true); break;
      case 'cmd': setCmdOpen(true); break;
      case 'solitaire': setShowSolitaireWin(true); break;
    }
  }, []);

  const handleRecycleBinClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    playErrorSound();
  }, []);

  if (state.isBooting) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  if (showBSOD) {
    return <BSOD onDismiss={() => setShowBSOD(false)} />;
  }

  if (screensaverActive) {
    return <Screensaver onDismiss={() => setScreensaverActive(false)} />;
  }

  if (showSolitaireWin) {
    return <SolitaireWin onDismiss={() => setShowSolitaireWin(false)} />;
  }

  const wallpaperStyle = WALLPAPERS.find(w => w.id === wallpaper)?.style || {};

  return (
    <div className="win95-desktop" style={wallpaperStyle} onClick={handleDesktopClick} onContextMenu={handleContextMenu}>
      <div className="crt-overlay" />

      {mouseTrailsOn && <MouseTrails />}

      <div className="win95-desktop-area">
        <DesktopIconGrid onOpenWindow={handleOpenWindow} />

        {/* Recycle Bin - bottom right */}
        <div className="desktop-recycle-bin">
          <div className="desktop-icon" onClick={handleRecycleBinClick} onDoubleClick={handleRecycleBinClick}>
            <span className="desktop-icon__image">{'\uD83D\uDDD1\uFE0F'}</span>
            <span className="desktop-icon__label">Recycle Bin</span>
          </div>
        </div>

        {Object.values(state.windows).map((win) => (
          <Win95Window
            key={win.id}
            id={win.id}
            title={win.title}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            zIndex={win.zIndex}
            position={win.position}
            size={win.size}
            isFocused={win.id === focusedWindowId}
            onClose={() => dispatch({ type: 'CLOSE_WINDOW', id: win.id })}
            onFocus={() => dispatch({ type: 'FOCUS_WINDOW', id: win.id })}
            onMinimize={() => dispatch({ type: 'MINIMIZE_WINDOW', id: win.id })}
            onMaximize={() => dispatch({ type: 'MAXIMIZE_WINDOW', id: win.id })}
            onMove={(position) => dispatch({ type: 'MOVE_WINDOW', id: win.id, position })}
          >
            {windowContent[win.id]}
          </Win95Window>
        ))}

        {/* App popups */}
        <AppPopup title="minesweeper.exe" isOpen={gameOpen} zIndex={gameZ} width={280}
          onClose={() => setGameOpen(false)} onFocus={() => setGameZ(state.nextZIndex + 100)}>
          <MinesweeperWindow />
        </AppPopup>

        <AppPopup title="notepad.exe - README.TXT" isOpen={notepadOpen} zIndex={notepadZ} width={400}
          onClose={() => setNotepadOpen(false)} onFocus={() => setNotepadZ(state.nextZIndex + 101)}>
          <NotepadWindow />
        </AppPopup>

        <AppPopup title="paint.exe" isOpen={paintOpen} zIndex={paintZ} width={360}
          onClose={() => setPaintOpen(false)} onFocus={() => setPaintZ(state.nextZIndex + 102)}>
          <PaintWindow />
        </AppPopup>

        <AppPopup title="C:\WINDOWS\system32\cmd.exe" isOpen={cmdOpen} zIndex={cmdZ} width={500}
          onClose={() => setCmdOpen(false)} onFocus={() => setCmdZ(state.nextZIndex + 103)}>
          <CommandPromptWindow />
        </AppPopup>

        {/* Clippy */}
        {clippyVisible && (
          <ClippyAssistant onDismiss={() => setClippyVisible(false)} />
        )}

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onProperties={() => setShowWallpaperPicker(true)}
            onToggleTrails={() => setMouseTrailsOn(v => !v)}
            trailsOn={mouseTrailsOn}
          />
        )}
      </div>

      {state.showShutDown && (
        <ShutDownDialog onCancel={() => dispatch({ type: 'HIDE_SHUTDOWN' })} />
      )}

      {showWallpaperPicker && (
        <WallpaperPicker
          currentWallpaper={wallpaper}
          onSelect={setWallpaper}
          onClose={() => setShowWallpaperPicker(false)}
        />
      )}

      <Taskbar
        windows={state.windows}
        startMenuOpen={state.startMenuOpen}
        focusedWindowId={focusedWindowId}
        onToggleStartMenu={() => dispatch({ type: 'TOGGLE_START_MENU' })}
        onCloseStartMenu={() => dispatch({ type: 'CLOSE_START_MENU' })}
        onOpenWindow={handleOpenWindow}
        onFocusWindow={(id) => dispatch({ type: 'FOCUS_WINDOW', id })}
        onMinimizeWindow={(id) => dispatch({ type: 'MINIMIZE_WINDOW', id })}
        onRestoreWindow={(id) => dispatch({ type: 'RESTORE_WINDOW', id })}
        onShutDown={() => dispatch({ type: 'SHOW_SHUTDOWN' })}
        onOpenApp={handleOpenApp}
        onToggleClippy={() => setClippyVisible(v => !v)}
      />
    </div>
  );
}
