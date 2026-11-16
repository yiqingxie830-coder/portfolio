import "./portfolio.css";
import { sections } from "./content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Reveal } from "./Reveal";
import { FolderCard } from "./FolderCard";
import { SectionHeading } from "./SectionHeading";

export function PortfolioHome() {
  return (
    <div className="wl-root">
      <Header />
      <main>
        <Hero />

        {/* 窄于 1015px 时只显示首屏 */}
        <div className="hidden min-[1015px]:block">
          {sections.map((section, index) => (
            <section
              key={section.title}
              aria-label={section.title}
              id={section.id}
              className={index === 0 ? "-mt-[40px] scroll-mt-[90px]" : "mt-[191px] scroll-mt-[90px]"}
            >
              <SectionHeading>{section.title}</SectionHeading>
              <div className="mx-auto mt-[68px] flex w-[1180px] flex-wrap justify-center gap-x-[70px] gap-y-[64px]">
                {section.projects.map((project, projectIndex) => (
                  <Reveal key={project.slug} delay={projectIndex * 110}>
                    <FolderCard project={project} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}

          <div id="contact" className="mt-[191px]">
            <Reveal>
              <Footer />
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}
