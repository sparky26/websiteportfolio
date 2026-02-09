import { site } from '@/config/site';

export function AboutWindow() {
  return (
    <div className="window-content-about">
      <div className="about-top">
        <div className="retro-portrait-mini">
          <img
            src="/images/cartoon-dp.png"
            alt="Sparsh Gupta"
            className="retro-portrait-img"
          />
        </div>
        <div className="about-intro">
          <h2 className="retro-title" style={{ fontSize: '18px', margin: '0 0 4px 0' }}>
            <span className="rainbow-text">Sparsh Gupta</span>
          </h2>
          <p style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px', color: '#666', margin: '0 0 4px 0' }}>
            {site.headline}
          </p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid white', margin: '8px 0' }} />
      <div style={{ fontFamily: 'Times New Roman, serif', fontSize: '13px', lineHeight: '1.5', color: '#000' }}>
        <p style={{ margin: '0 0 8px 0' }}>{site.sections.about}</p>
        <p style={{ margin: 0, fontSize: '11px', color: '#808080', fontFamily: 'Tahoma, sans-serif' }}>
          {'\uD83D\uDCCD'} {site.location}
        </p>
      </div>
    </div>
  );
}
