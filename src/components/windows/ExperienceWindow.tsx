import { site } from '@/config/site';
import { Badge } from '@/components/ui/Badge';

export function ExperienceWindow() {
  return (
    <div>
      <p className="retro-quest-title" style={{ marginBottom: '8px' }}>
        <span className="retro-highlight">QUEST LOG</span> — Adventures in the working world
      </p>
      <div className="retro-quest-list" style={{ gap: '6px' }}>
        {site.experience.map((item) => (
          <div key={`${item.company}-${item.title}`} className="retro-quest-entry" style={{ padding: '6px 10px' }}>
            <div className="retro-quest-header">
              <span className="retro-quest-role">{item.title}</span>
              <span className="retro-quest-at"> @ {item.company}</span>
              <span className="retro-quest-period" style={{ float: 'right' }}>{item.period}</span>
            </div>
            <p className="retro-quest-liner" style={{ margin: '4px 0' }}>&quot;{item.oneLiner}&quot;</p>
            <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', marginTop: '4px' }}>
              {item.tags.map(tag => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
