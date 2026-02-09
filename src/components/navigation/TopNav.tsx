import { Container } from "@/components/layout/Container";
import { site } from "@/config/site";
import Link from "next/link";

const links = [
  { href: "#experience", label: "Work.log" },
  { href: "#contact", label: "Links.htm" }
];

export function TopNav() {
  return (
    <header className="retro-header sticky top-0 z-40">
      <Container>
        <div className="retro-header-inner">
          {/* Logo with 90s styling */}
          <Link href="#" className="retro-logo">
            ~/{site.title.toLowerCase().replace(' ', '_')}/
          </Link>

          {/* Navigation buttons like Win95 */}
          <nav className="retro-nav hidden md:flex">
            {links.map(l => (
              <a key={l.href} href={l.href} className="retro-nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          {/* GitHub button */}
          <div className="flex items-center gap-2">
            <a
              href={site.links.linkedin}
              className="win95-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="retro-nav flex md:hidden justify-center pb-2 flex-wrap">
          {links.map(l => (
            <a key={l.href} href={l.href} className="retro-nav-link">
              {l.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}
