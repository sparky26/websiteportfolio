import { site } from '@/config/site';

const projects = [
  {
    title: 'AI Predictions (Dunning-Kruger Edition)',
    description: 'An interactive exploration of AI confidence vs. actual capability. Are we in the peak of inflated expectations?',
    url: site.links.aiPrediction,
    icon: '\uD83E\uDD16',
  },
  {
    title: 'AI Consulting Analysis',
    description: 'Data-driven breakdown of the AI consulting landscape. Who\'s actually delivering value?',
    url: site.links.consultAnalysis,
    icon: '\uD83D\uDCC8',
  },
  {
    title: 'Master\'s Research — Medical AI',
    description: 'Teaching machines to read doctor handwriting at Uppsala University. Published & peer-reviewed.',
    url: site.links.research,
    icon: '\uD83D\uDCDA',
  },
  {
    title: 'EonLex Technologies',
    description: 'Legal AI that doesn\'t hallucinate. Contract analysis, clause extraction, and more.',
    url: site.links.website,
    icon: '\u2696\uFE0F',
  },
];

export function ProjectsWindow() {
  return (
    <div>
      <p style={{ fontFamily: 'Comic Sans MS, cursive', fontSize: '13px', color: '#000080', margin: '0 0 8px 0' }}>
        {'\uD83D\uDE80'} Side quests & shipped projects
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {projects.map(({ title, description, url, icon }) => (
          <div
            key={title}
            style={{
              background: '#FFFFF0',
              border: '1px solid #CCC',
              padding: '8px 10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>
                  {icon} {title}
                </div>
                <p style={{ fontFamily: 'Times New Roman, serif', fontSize: '12px', color: '#444', margin: '4px 0 0 0' }}>
                  {description}
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="win95-button"
                style={{ fontSize: '10px', padding: '2px 10px', flexShrink: 0, marginTop: '2px' }}
              >
                Open
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
