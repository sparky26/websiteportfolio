import { site } from '@/config/site';

const linkItems = [
  { label: 'LinkedIn', url: site.links.linkedin, icon: '\uD83D\uDC64' },
  { label: 'GitHub', url: site.links.github, icon: '\uD83D\uDCBB' },
  { label: 'AI Predictions', url: site.links.aiPrediction, icon: '\uD83E\uDD16' },
  { label: 'Consult Analysis', url: site.links.consultAnalysis, icon: '\uD83D\uDCC8' },
  { label: 'Research Paper', url: site.links.research, icon: '\uD83D\uDCDA' },
  { label: 'EonLex', url: site.links.website, icon: '\uD83C\uDF10' },
  { label: 'Email', url: site.links.email, icon: '\uD83D\uDCE7' },
];

export function LinksWindow() {
  return (
    <div>
      <p style={{ fontFamily: 'Comic Sans MS, cursive', fontSize: '13px', color: '#000080', margin: '0 0 8px 0' }}>
        {'\u2B50'} My Bookmarks — Surfing the information superhighway!
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {linkItems.map(({ label, url, icon }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="win95-link-row"
          >
            <span style={{ fontSize: '16px', width: '24px', textAlign: 'center' }}>{icon}</span>
            <span style={{ flex: 1, fontFamily: 'Tahoma, sans-serif', fontSize: '12px', color: '#000' }}>
              {label}
            </span>
            <span className="win95-button" style={{ fontSize: '10px', padding: '2px 8px' }}>
              Go {'\u2192'}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
