import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section className="retro-hero">
      <Container>
        <div className="py-8">
          {/* Classic 90s welcome banner */}
          <div className="text-center mb-6">
            <div className="retro-construction inline-block mb-4">
              UNDER CONSTRUCTION - PARDON OUR PIXEL DUST!
            </div>
          </div>

          <div className="retro-hero-layout">
            {/* Main content window */}
            <div className="win95-window max-w-2xl flex-1">
              <div className="win95-titlebar">
                <span>welcome.exe - Sparsh&apos;s Homepage</span>
                <div className="win95-titlebar-buttons">
                  <button className="win95-btn">_</button>
                  <button className="win95-btn">□</button>
                  <button className="win95-btn">×</button>
                </div>
              </div>
              <div className="win95-content">
                <div className="text-center mb-4">
                  <span className="retro-pill">Cross-domain · Product · Applied AI</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold retro-title text-center mb-4">
                  Welcome to my <span className="rainbow-text">Cyber Home</span>!
                </h1>

                <p className="text-center text-sm mb-2 text-gray-700">
                  {site.headline}
                </p>

                <div className="retro-hr my-4"></div>

                <p className="text-sm leading-relaxed text-gray-800 mb-4">
                  {site.description}
                </p>

                {/* Marquee */}
                <div className="retro-marquee mb-4">
                  <span>
                    ★★★ WELCOME NETIZEN! ★★★ Surfing the information superhighway since dial-up days ·
                    <span className="retro-blink"> HOT! </span> · AI predictions & research papers inside ·
                    <span className="retro-blink"> NEW! </span> · Grab some virtual cookies and stay awhile ★★★
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <LinkButton href="#experience">The Quest Log</LinkButton>
                  <LinkButton href={site.links.aiPrediction} variant="secondary">AI Predictions</LinkButton>
                  <LinkButton href={site.links.linkedin} variant="secondary">LinkedIn</LinkButton>
                </div>

                {/* Skills as badges */}
                <div className="retro-hr-stars">✦ ✦ ✦ MY SKILLZ ✦ ✦ ✦</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {site.skills.highlight.map(s => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Portrait with 90s frame */}
            <div className="flex flex-col items-center gap-4">
              <div className="win95-window">
                <div className="win95-titlebar">
                  <span>photo.bmp</span>
                  <div className="win95-titlebar-buttons">
                    <button className="win95-btn">×</button>
                  </div>
                </div>
                <div className="win95-content p-2">
                  <figure className="retro-hero-portrait">
                    <img
                      className="retro-hero-portrait-img"
                      src="/images/cartoon-dp.png"
                      alt="Sparsh Gupta"
                    />
                  </figure>
                </div>
              </div>

              {/* Classic web badges */}
              <div className="flex flex-col gap-2 items-center">
                <div className="retro-web-badge">
                  <span className="text-xs text-lime-400 font-mono">Best viewed in</span>
                  <div className="text-yellow-400 font-bold text-sm">Netscape 4.0+</div>
                </div>
                <div className="retro-web-badge">
                  <span className="text-xs text-cyan-400 font-mono">Resolution:</span>
                  <div className="text-white font-bold text-sm">800×600</div>
                </div>
                <div className="retro-web-badge">
                  <span className="text-xs text-pink-400 font-mono">Powered by:</span>
                  <div className="text-yellow-400 font-bold text-sm">Chai & Code</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="text-center mt-6">
            <div className="retro-banner">
              ★ You are visitor #{Math.floor(Math.random() * 9000 + 1000).toString().padStart(6, '0')} ★
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
