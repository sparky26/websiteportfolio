"use client";

export const WALLPAPERS: { id: string; name: string; style: React.CSSProperties }[] = [
  { id: 'teal', name: '(None)', style: { background: '#008080' } },
  { id: 'clouds', name: 'Clouds', style: {
    background: 'linear-gradient(180deg, #4A7EC2 0%, #87CEEB 40%, #B8D8E8 70%, #E0E0E0 100%)',
  }},
  { id: 'tiles', name: 'Tiles', style: {
    background: `repeating-conic-gradient(#008080 0% 25%, #006868 0% 50%) 0 0 / 40px 40px`,
  }},
  { id: 'matrix', name: 'Matrix', style: {
    background: '#001200',
  }},
  { id: 'sunset', name: 'Sunset', style: {
    background: 'linear-gradient(180deg, #1a0533 0%, #4a1942 25%, #c94b4b 55%, #f09819 85%, #f09819 100%)',
  }},
  { id: 'vaporwave', name: 'Vaporwave', style: {
    background: 'linear-gradient(180deg, #ff71ce 0%, #01cdfe 30%, #05ffa1 60%, #b967ff 100%)',
  }},
];

interface WallpaperPickerProps {
  currentWallpaper: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function WallpaperPicker({ currentWallpaper, onSelect, onClose }: WallpaperPickerProps) {
  return (
    <div className="shutdown-overlay" onClick={onClose}>
      <div className="win95-window wallpaper-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="win95-titlebar">
          <span className="win95-titlebar-text">Display Properties</span>
          <div className="win95-titlebar-buttons">
            <button className="win95-btn" onClick={onClose}>&times;</button>
          </div>
        </div>
        <div className="win95-content" style={{ padding: '12px' }}>
          <div style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px', color: '#000', marginBottom: '2px' }}>
            <strong>Background</strong>
          </div>
          <div style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px', color: '#666', marginBottom: '8px' }}>
            Select a wallpaper for your desktop:
          </div>
          <div className="wallpaper-grid">
            {WALLPAPERS.map((wp) => (
              <button
                key={wp.id}
                className={`wallpaper-option ${currentWallpaper === wp.id ? 'wallpaper-option--active' : ''}`}
                onClick={() => onSelect(wp.id)}
              >
                <div className="wallpaper-preview" style={wp.style} />
                <span className="wallpaper-name">{wp.name}</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '12px' }}>
            <button className="win95-button" onClick={onClose} style={{ fontSize: '11px', padding: '3px 16px' }}>OK</button>
            <button className="win95-button" onClick={onClose} style={{ fontSize: '11px', padding: '3px 16px' }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
