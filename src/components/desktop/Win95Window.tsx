"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { WindowId } from '@/types/desktop';

interface Win95WindowProps {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { w: number; h: number };
  isFocused: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export function Win95Window({
  title,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
  isFocused,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onMove,
  children,
}: Win95WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const prevOpenRef = useRef(false);

  // Opening animation
  useEffect(() => {
    if (isOpen && !isMinimized && !prevOpenRef.current) {
      setIsOpening(true);
      const timer = setTimeout(() => setIsOpening(false), 200);
      return () => clearTimeout(timer);
    }
    prevOpenRef.current = isOpen && !isMinimized;
  }, [isOpen, isMinimized]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 150);
  }, [onClose]);

  const handleTitlebarMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  }, [position.x, position.y, onFocus, isMaximized]);

  const handleTitlebarTouchStart = useCallback((e: React.TouchEvent) => {
    if (isMaximized) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
    onFocus();
  }, [position.x, position.y, onFocus, isMaximized]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 60;
      onMove({
        x: Math.max(0, Math.min(e.clientX - dragOffset.x, maxX)),
        y: Math.max(0, Math.min(e.clientY - dragOffset.y, maxY)),
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 60;
      onMove({
        x: Math.max(0, Math.min(touch.clientX - dragOffset.x, maxX)),
        y: Math.max(0, Math.min(touch.clientY - dragOffset.y, maxY)),
      });
    };

    const handleEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragOffset, onMove]);

  if (!isOpen) return null;

  const windowStyle: React.CSSProperties = isMaximized
    ? { left: 0, top: 0, width: '100%', height: '100%', zIndex }
    : { left: position.x, top: position.y, width: size.w, height: size.h, zIndex };

  const animClass = isClosing ? 'win95-window--closing' : isOpening ? 'win95-window--opening' : '';
  const minimizedClass = isMinimized ? 'win95-window--minimized' : '';

  return (
    <div
      className={`win95-window win95-window--desktop ${animClass} ${minimizedClass}`}
      style={windowStyle}
      onMouseDown={onFocus}
    >
      <div
        className={`win95-titlebar ${!isFocused ? 'win95-titlebar--inactive' : ''}`}
        onMouseDown={handleTitlebarMouseDown}
        onTouchStart={handleTitlebarTouchStart}
        onDoubleClick={(e) => { e.stopPropagation(); onMaximize(); }}
      >
        <span className="win95-titlebar-text">{title}</span>
        <div className="win95-titlebar-buttons">
          <button className="win95-btn" onClick={(e) => { e.stopPropagation(); onMinimize(); }} title="Minimize">_</button>
          <button className="win95-btn" onClick={(e) => { e.stopPropagation(); onMaximize(); }} title={isMaximized ? 'Restore' : 'Maximize'}>{isMaximized ? '\u29C9' : '\u25A1'}</button>
          <button className="win95-btn" onClick={(e) => { e.stopPropagation(); handleClose(); }} title="Close">&times;</button>
        </div>
      </div>
      <div className="win95-content win95-window-body">
        {children}
      </div>
    </div>
  );
}
