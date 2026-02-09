import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { site } from "@/config/site";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-28">
      <SectionHeading eyebrow="Experience" title="Quest Log">
        {site.sections.about}
      </SectionHeading>

      <div className="mt-6 space-y-4">
        {site.experience.map((item) => (
          <div key={`${item.company}-${item.title}`} className="retro-card">
            <div className="retro-card-header flex items-center justify-between">
              <span>{item.title} @ {item.company}</span>
              <span className="text-xs opacity-80">{item.period}</span>
            </div>
            <div className="retro-card-body">
              <p className="retro-card-text text-sm italic">&quot;{item.oneLiner}&quot;</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
