"use client";

interface DesktopIconProps {
  icon: string;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export function DesktopIcon({ icon, label, isSelected, onSelect, onOpen }: DesktopIconProps) {
  return (
    <div
      className={`desktop-icon ${isSelected ? 'desktop-icon--selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onTouchEnd={(e) => {
        // Single tap opens on touch devices
        e.preventDefault();
        onOpen();
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      aria-label={`Open ${label}`}
    >
      <span className="desktop-icon__image">{icon}</span>
      <span className="desktop-icon__label">{label}</span>
    </div>
  );
}
