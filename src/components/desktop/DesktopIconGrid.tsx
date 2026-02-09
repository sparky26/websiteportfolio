"use client";

import { useState } from 'react';
import { WindowId } from '@/types/desktop';
import { desktopIcons } from '@/config/desktopIcons';
import { DesktopIcon } from './DesktopIcon';

interface DesktopIconGridProps {
  onOpenWindow: (id: WindowId) => void;
}

export function DesktopIconGrid({ onOpenWindow }: DesktopIconGridProps) {
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);

  return (
    <div
      className="desktop-icon-grid"
      onClick={() => setSelectedIcon(null)}
    >
      {desktopIcons.map((iconDef) => (
        <DesktopIcon
          key={iconDef.id}
          icon={iconDef.icon}
          label={iconDef.label}
          isSelected={selectedIcon === iconDef.id}
          onSelect={() => setSelectedIcon(iconDef.id)}
          onOpen={() => onOpenWindow(iconDef.id)}
        />
      ))}
    </div>
  );
}
