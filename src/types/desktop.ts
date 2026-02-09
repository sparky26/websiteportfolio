export type WindowId = 'about' | 'experience' | 'links' | 'skills' | 'projects' | 'contact';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { w: number; h: number };
}

export interface DesktopState {
  windows: Record<WindowId, WindowState>;
  nextZIndex: number;
  startMenuOpen: boolean;
  showShutDown: boolean;
  isBooting: boolean;
}

export type DesktopAction =
  | { type: 'OPEN_WINDOW'; id: WindowId }
  | { type: 'CLOSE_WINDOW'; id: WindowId }
  | { type: 'FOCUS_WINDOW'; id: WindowId }
  | { type: 'MINIMIZE_WINDOW'; id: WindowId }
  | { type: 'MAXIMIZE_WINDOW'; id: WindowId }
  | { type: 'RESTORE_WINDOW'; id: WindowId }
  | { type: 'MOVE_WINDOW'; id: WindowId; position: { x: number; y: number } }
  | { type: 'TOGGLE_START_MENU' }
  | { type: 'CLOSE_START_MENU' }
  | { type: 'SHOW_SHUTDOWN' }
  | { type: 'HIDE_SHUTDOWN' }
  | { type: 'BOOT_COMPLETE' };
