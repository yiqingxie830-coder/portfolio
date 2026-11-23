"use client";

import "./portfolio.css";
import { useContent } from "./language";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Reveal } from "./Reveal";
import { FolderCard } from "./FolderCard";
import { SectionHeading } from "./SectionHeading";

export function PortfolioHome() {
  const { sections } = useContent();
  return (
    <div className="wl-root">
      <Header mobileNav={false} />
      <main>
        <Hero />

        {/* 窄于 1015px 时首页只显示首屏 */}
        <div className="hidden min-[1015px]:block">
          {sections.map((section, index) => (
            <section
              key={section.id}
              aria-label={section.title}
              id={section.id}
              className={`scroll-mt-[90px] ${index === 0 ? "mt-[8px] min-[1015px]:-mt-[40px]" : "mt-[110px] min-[1015px]:mt-[191px]"}`}
            >
              <SectionHeading>{section.title}</SectionHeading>
              <div className={`mx-auto mt-[44px] flex w-full max-w-[1180px] flex-wrap justify-center gap-x-[40px] gap-y-[52px] px-[16px] min-[1015px]:mt-[68px] min-[1015px]:gap-y-[64px] min-[1244px]:px-0 ${section.projects.length === 4 ? "wl-folders-row4 min-[1015px]:gap-x-[24px]" : "min-[1015px]:gap-x-[70px]"}`}>
                {section.projects.map((project, projectIndex) => (
                  <Reveal key={project.slug} delay={(projectIndex % (section.projects.length === 4 ? 4 : 3)) * 110}>
                    <FolderCard project={project} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}

          <div id="contact" className="mt-[110px] min-[1015px]:mt-[191px]">
            <Reveal>
              <Footer />
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}
