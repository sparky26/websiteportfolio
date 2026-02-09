import { site } from '@/config/site';
import { Badge } from '@/components/ui/Badge';

const skillLevels: Record<string, number> = {
  'AI Product Management': 90,
  'LLM systems & evaluation': 85,
  'RAG + Knowledge Graphs': 80,
  'Discrete-event simulation': 75,
  'Data quality & leakage detection': 85,
  'Workflow automation': 88,
};

export function SkillsWindow() {
  return (
    <div>
      <p style={{ fontFamily: 'Comic Sans MS, cursive', fontSize: '13px', color: '#000080', margin: '0 0 10px 0' }}>
        {'\u2694\uFE0F'} EQUIPPED SKILLS — Current loadout
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {site.skills.highlight.map((skill) => (
          <div key={skill}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <Badge>{skill}</Badge>
            </div>
            <div className="skill-meter">
              <div
                className="skill-meter-fill"
                style={{ width: `${skillLevels[skill] || 80}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: '#808080', marginTop: '10px', textAlign: 'center' }}>
        * Skill levels may vary based on chai intake
      </p>
    </div>
  );
}
