import { Container } from "@/components/layout/Container";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="retro-panel mt-8">
      <div className="retro-panel-title">Site Info</div>
      <div className="retro-panel-content">
        <Container>
          <div className="flex flex-col gap-6">
            {/* Classic badges */}
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <div className="retro-web-badge text-center">
                <div className="text-lime-400 text-xs">Made with</div>
                <div className="text-white font-bold">Next.js</div>
              </div>
              <div className="retro-web-badge text-center">
                <div className="text-cyan-400 text-xs">Hosted on</div>
                <div className="text-white font-bold">GitHub Pages</div>
              </div>
              <div className="retro-pill">
                Webmaster Approved!
              </div>
            </div>

            {/* Links */}
            <div className="text-center">
              <p className="font-bold text-sm mb-2">LINKS:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={site.links.linkedin} className="text-blue-600 hover:text-red-600">LinkedIn</a>
                <span>|</span>
                <a href={site.links.github} className="text-blue-600 hover:text-red-600">GitHub</a>
                <span>|</span>
                <a href={site.links.aiPrediction} className="text-blue-600 hover:text-red-600">AI Predictions</a>
                <span>|</span>
                <a href={site.links.consultAnalysis} className="text-blue-600 hover:text-red-600">Consult Analysis</a>
                <span>|</span>
                <a href={site.links.research} className="text-blue-600 hover:text-red-600">Research</a>
                <span>|</span>
                <a href={site.links.website} className="text-blue-600 hover:text-red-600">EonLex</a>
                <span>|</span>
                <a href={site.links.email} className="text-blue-600 hover:text-red-600">Email Me!</a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm border-t border-gray-400 pt-4">
              <p>
                &copy; {new Date().getFullYear()} {site.title} - All Rights Reserved
              </p>
              <p className="text-xs mt-1 text-gray-600">
                Best viewed with Netscape Navigator 4.0+ at 800x600
              </p>
            </div>

            {/* Decorative divider */}
            <div className="retro-hr-stars">
              * * * THANKS FOR VISITING! * * *
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
