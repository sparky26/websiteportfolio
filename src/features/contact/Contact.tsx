import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/config/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28">
      <SectionHeading eyebrow="Contact" title="You've got mail... almost!">
        Drop me a line! Fastest response via LinkedIn. For EonLex inquiries, hit up the website.
      </SectionHeading>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm retro-card-subtle uppercase tracking-widest">LinkedIn</p>
          <p className="mt-2 retro-card-text">Slide into my DMs!</p>
          <div className="mt-4">
            <LinkButton href={site.links.linkedin}>Open LinkedIn</LinkButton>
          </div>
        </Card>

        <Card>
          <p className="text-sm retro-card-subtle uppercase tracking-widest">AI Predictions</p>
          <p className="mt-2 retro-card-text">Crystal ball for AI trends</p>
          <div className="mt-4">
            <LinkButton href={site.links.aiPrediction} variant="secondary">View Predictions</LinkButton>
          </div>
        </Card>

        <Card>
          <p className="text-sm retro-card-subtle uppercase tracking-widest">Consult Analysis</p>
          <p className="mt-2 retro-card-text">AI meets consulting</p>
          <div className="mt-4">
            <LinkButton href={site.links.consultAnalysis} variant="secondary">View Analysis</LinkButton>
          </div>
        </Card>

        <Card>
          <p className="text-sm retro-card-subtle uppercase tracking-widest">Research</p>
          <p className="mt-2 retro-card-text">My Uppsala thesis</p>
          <div className="mt-4">
            <LinkButton href={site.links.research} variant="secondary">Read Paper</LinkButton>
          </div>
        </Card>

        <Card>
          <p className="text-sm retro-card-subtle uppercase tracking-widest">GitHub</p>
          <p className="mt-2 retro-card-text">@{site.github.username}</p>
          <div className="mt-4">
            <LinkButton href={site.links.github} variant="secondary">Open GitHub</LinkButton>
          </div>
        </Card>

        <Card>
          <p className="text-sm retro-card-subtle uppercase tracking-widest">EonLex</p>
          <p className="mt-2 retro-card-text">Legal AI, redefined</p>
          <div className="mt-4">
            <LinkButton href={site.links.website} variant="secondary">Visit Site</LinkButton>
          </div>
        </Card>

        <Card>
          <p className="text-sm retro-card-subtle uppercase tracking-widest">Email</p>
          <p className="mt-2 retro-card-text">Old school, always works</p>
          <div className="mt-4">
            <LinkButton href={site.links.email} variant="secondary">Send Email</LinkButton>
          </div>
        </Card>
      </div>
    </section>
  );
}
