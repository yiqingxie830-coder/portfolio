"use client";

import "./portfolio.css";
import { BackButton } from "./BackButton";
import type { Project, WorkFlow } from "./content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PhoneShowcase } from "./PhoneShowcase";
import { useContent } from "./language";
import { Reveal } from "./Reveal";
import { ToneoMascot } from "./ToneoMascot";
import { highlight } from "./highlight";

const LABEL =
  "text-[12px] font-medium leading-[14.4px] tracking-[0.96px] text-[#77787d]";


/** 流程图：每个阶段一列，阶段之间用箭头连接；highlight 的阶段用项目的主色描边 */
function FlowDiagram({ flow }: { flow: WorkFlow }) {
  return (
    <figure className="wl-glass rounded-[28px] px-[18px] py-[22px] min-[1015px]:px-[30px] min-[1015px]:py-[28px]">
      <figcaption>
        <h2 className="text-[20px] font-medium leading-[26px] text-[#111] min-[1015px]:text-[24px] min-[1015px]:leading-[30px]">
          {flow.title}
        </h2>
        {flow.caption ? (
          <p className="mt-[8px] max-w-[640px] text-[16px] leading-[23px] text-[#55565a]">
            {highlight(flow.caption)}
          </p>
        ) : null}
      </figcaption>

      {flow.image ? (
        <div className="mt-[18px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={flow.image.src}
            alt={flow.image.alt}
            className="mx-auto block h-auto w-full mix-blend-multiply min-[1015px]:w-[70%]"
          />
        </div>
      ) : null}

      <ol
        className={`mt-[26px] flex flex-col gap-[8px] min-[1015px]:flex-row min-[1015px]:items-stretch ${flow.image || !flow.stages ? "hidden" : ""}`}
      >
        {(flow.image ? [] : (flow.stages ?? [])).map((stage, index) => (
          <li
            key={`${stage.title}-${index}`}
            className="flex flex-1 flex-col gap-[8px] min-[1015px]:flex-row min-[1015px]:items-center"
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="self-center text-[18px] leading-none text-[#9a9a9a] max-[1014px]:rotate-90"
              >
                →
              </span>
            ) : null}
            <div
              className={`flex h-full flex-1 flex-col rounded-[18px] bg-white/70 p-[12px] ${stage.highlight ? "wl-flow-highlight" : ""}`}
            >
              <p className="text-[11px] font-medium uppercase leading-[14px] tracking-[0.8px] text-[#77787d]">
                {stage.title}
              </p>
              <ul className="mt-[10px] flex flex-1 flex-col justify-center gap-[6px]">
                {stage.items.map((item, itemIndex) => (
                  <li
                    key={`${item}-${itemIndex}`}
                    className="rounded-[10px] bg-white px-[10px] py-[8px] text-[14px] font-medium leading-[18px] text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                  >
                    {highlight(item)}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {flow.footnote ? (
        <p className="mt-[18px] text-[14px] leading-[20px] text-[#6b6d73]">
          {highlight(flow.footnote)}
        </p>
      ) : null}
    </figure>
  );
}

/** 文件夹点进去之后的详情页 */
export function WorkDetail({ project: initial }: { project: Project }) {
  // 页面传进来的是英文版；这里按当前语言换成对应的那一份
  const { allProjects } = useContent();
  const project = allProjects.find((item) => item.slug === initial.slug) ?? initial;
  return (
    <div
      className="wl-root"
      style={
        project.accent
          ? ({ "--wl-accent": project.accent } as React.CSSProperties)
          : undefined
      }
    >
      <Header />
      <main className="pt-[92px] min-[1015px]:pt-[130px]">
        <div className="mx-auto w-[min(860px,calc(100%-32px))]">
          <BackButton href="/#experience" />

          {project.mascot === "toneo" ? (
            <Reveal className="mt-[28px]">
              <div className="flex items-center gap-[6px]" style={project.logoShift ? { marginLeft: project.logoShift } : undefined}>
                <ToneoMascot size={104} label={project.title} />
                <span className="text-[44px] font-bold leading-none tracking-[-1.5px] text-[#1a1a1c]" aria-hidden="true">
                  {project.title}
                </span>
              </div>
            </Reveal>
          ) : project.logo ? (
            <Reveal className="mt-[36px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="block h-[84px] w-auto max-w-[280px] object-contain object-left"
                style={
                  project.logoShift
                    ? { marginLeft: project.logoShift }
                    : undefined
                }
              />
            </Reveal>
          ) : null}

          {project.concept ? (
            <Reveal className="mt-[32px]" delay={80}>
              <figure className="max-w-[680px]">
                <blockquote className="text-[22px] italic leading-[32px] text-[#1a1a1c] min-[1015px]:text-[26px] min-[1015px]:leading-[38px]">
                  {project.concept.quote}
                </blockquote>
                <figcaption className="mt-[8px] text-[13px] tracking-[0.3px] text-[#77787d]">— {project.concept.source}</figcaption>
                <p className="mt-[18px] text-[16px] leading-[27px] text-[#3d3e42]">{highlight(project.concept.text)}</p>
              </figure>
            </Reveal>
          ) : null}

          <Reveal className="mt-[36px]" delay={140}>
            <p className="text-[18px] font-medium leading-[24px] text-[#55565a]">
              {project.tag}
            </p>
            {project.hideTitle ? (
              <h1 className="sr-only">{project.title}</h1>
            ) : (
              <h1 className="mt-[10px] text-[40px] font-medium leading-[48px] text-[#111] min-[1015px]:text-[50px] min-[1015px]:leading-[60px]">
                {project.title}
              </h1>
            )}
            {project.meta ? (
              <p className={`${LABEL} mt-[8px]`}>📍 {project.meta}</p>
            ) : null}
            {project.intro ? (
              <p className="mt-[14px] max-w-[640px] text-[12px] italic leading-[18px] tracking-[0.3px] text-[#77787d]">
                {highlight(project.intro)}
              </p>
            ) : null}
          </Reveal>

          {project.links?.length ? (
            <div className="mt-[24px] flex flex-wrap gap-[10px]">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="wl-glass rounded-full px-[18px] py-[9px] text-[15px] font-medium text-[#111] transition-colors hover:text-black"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          ) : null}

          {project.feature ? (
            <Reveal className="mb-[44px] mt-[44px] flex justify-center min-[1015px]:mb-[80px] min-[1015px]:mt-[80px]" delay={280}>
              <a href={project.feature.href} target="_blank" rel="noopener" className="wl-nudge block w-full overflow-hidden rounded-[22px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.feature.src} alt={project.feature.alt} className="block h-auto w-full" />
              </a>
            </Reveal>
          ) : null}

          {project.screens?.length ? (
            <Reveal className="mt-[48px]" delay={200}>
              <PhoneShowcase screens={project.screens} title={project.title} heading={project.screensTitle} />
            </Reveal>
          ) : null}

          {project.moreShowcases?.map((group) => (
            <Reveal key={group.title} className="mt-[16px]" delay={200}>
              <PhoneShowcase screens={group.screens} title={group.title} heading={group.title} />
            </Reveal>
          ))}

          {project.stats?.length ? (
            <dl className="mt-[48px] grid grid-cols-2 gap-[10px] min-[1015px]:grid-cols-4">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="wl-glass flex flex-col-reverse justify-end rounded-[28px] px-[22px] py-[22px]"
                >
                  <dt className="mt-[10px] text-[14px] leading-[19px] text-[#6b6d73]">
                    {highlight(stat.label)}
                  </dt>
                  <dd className="text-[40px] font-medium leading-[44px] text-[#2f6bff]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {project.flows?.length ? (
            <div className="mt-[38px] flex flex-col gap-[10px]">
              {project.flows.map((flow, index) => (
                <Reveal key={index} delay={280 + Math.min(index, 2) * 140}>
                  <FlowDiagram flow={flow} />
                </Reveal>
              ))}
            </div>
          ) : null}

          {project.detailsTitle ? (
            <p className={`${LABEL} mt-[48px]`}>{project.detailsTitle}</p>
          ) : null}
          <div
            className={`${project.detailsTitle ? "mt-[14px]" : "mt-[48px]"} ${
              project.detailsInRow ? "grid grid-cols-1 gap-[10px] min-[560px]:grid-cols-2 min-[1015px]:grid-cols-4" : "flex flex-col gap-[10px]"
            }`}
          >
            {project.details.map((detail, index) => (
              <Reveal
                key={index}
                delay={(project.flows?.length ? 0 : 280) + Math.min(index, 3) * 140}
              >
                <section
                  className={
                    project.detailsInRow
                      ? "wl-glass h-full rounded-[24px] px-[18px] py-[20px]"
                      : detail.plain
                        ? "py-[28px]"
                        : `wl-glass rounded-[28px] px-[20px] py-[22px] min-[1015px]:px-[30px] min-[1015px]:py-[26px] ${detail.images?.length ? "wl-glow" : ""}`
                  }
                >
                  <h2
                    className={
                      project.detailsInRow
                        ? "whitespace-nowrap text-[11px] font-medium uppercase leading-[14px] tracking-[0.5px] text-[#77787d]"
                        : `${LABEL} uppercase`
                    }
                  >
                    {detail.heading}
                  </h2>
                  <p
                    className={
                      project.detailsInRow
                        ? "mt-[10px] text-[16px] leading-[22px] text-[#55565a]"
                        : "mt-[10px] text-[17px] leading-[25px] text-[#55565a] min-[1015px]:text-[18px] min-[1015px]:leading-[26px]"
                    }
                  >
                    {highlight(detail.text)}
                  </p>
                  {detail.images?.length ? (
                    <div className="mt-[22px] flex flex-wrap items-start justify-center gap-[12px]">
                      {detail.images.map((image) =>
                        image.href ? (
                          <a key={image.src} href={image.href} target="_blank" rel="noopener" className="wl-nudge block max-w-full overflow-hidden rounded-[18px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image.src} alt={image.alt} className="block h-auto max-h-[300px] w-auto max-w-full min-[1015px]:h-[300px] object-contain" />
                          </a>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={image.src} src={image.src} alt={image.alt} className="wl-nudge h-auto max-h-[300px] w-auto max-w-full min-[1015px]:h-[300px] rounded-[18px] object-contain" />
                        ),
                      )}
                    </div>
                  ) : null}
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-[100px] min-[1015px]:mt-[140px]">
          <Reveal>
            <Footer />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
