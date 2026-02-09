import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { site } from "@/config/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-28">
      <SectionHeading eyebrow="About" title="Player Stats & Bio">
        {site.sections.about}
      </SectionHeading>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <p className="retro-card-text leading-relaxed">
            {site.sections.about}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {site.skills.highlight.map(t => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-sm retro-card-subtle uppercase tracking-widest">Current Quest</p>
          <p className="mt-2 font-semibold">{site.experience[0].title}</p>
          <p className="retro-card-subtle">{site.experience[0].company}</p>

          <div className="mt-5 text-sm retro-card-subtle space-y-2">
            <p><span className="retro-card-subtle">GitHub:</span> {site.github.username}</p>
            <p><span className="retro-card-subtle">Base Camp:</span> {site.location}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
