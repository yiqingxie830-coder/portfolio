"use client";

import { Fragment } from "react";
import { useContent } from "./language";
import { SplineScene } from "./SplineScene";

type HeroScene = {
  /** Spline 的 .splinecode 地址 */
  url: string;
  /** 加载前显示的静态截图（可留空） */
  poster: string;
  /** 容器底色，同时也是场景加载后的背景色 */
  background: string;
  hiddenObjects?: string[];
  /** 放大倍数，1 = 原始大小 */
  zoom?: number;
  /** 场景往下挪多少，例如 "8%" */
  offsetY?: string;
  /** 场景往右挪多少，例如 "4%"，负数往左 */
  offsetX?: string;
};

type Props = {
  /** 不传就用首页的场景（content.ts 里的 site.spline*） */
  scene?: HeroScene;
  /** "full"：撑满整个窗口宽、桌面 75vh；"content"：和下面的卡片一样宽、带圆角、桌面 65vh */
  layout?: "full" | "content";
};

const LAYOUTS = {
  // 手机上首页只有这一屏。场景按高度取景，所以盒子做成接近正方形，左右才不会被裁掉
  full: "h-[min(84vw,56svh)] w-full min-[1015px]:h-[75vh]",
  content:
    "mx-auto h-[45vh] w-[min(1309px,calc(100%-32px))] rounded-[36px] min-[1015px]:h-[65vh]",
};

/**
 * 标题入场：字母一个接一个从下方浮上来，由模糊变清晰（样式在 portfolio.css 的 .wl-char）。
 * 按单词分组，换行只会发生在单词之间。
 */
function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  const starts = words.map((_, index) => words.slice(0, index).join("").length);
  return (
    <span aria-hidden="true">
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          {wordIndex > 0 ? " " : null}
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charIndex) => (
              <span
                key={charIndex}
                className="wl-char wl-gradient-text"
                style={
                  {
                    "--wl-i": starts[wordIndex] + charIndex,
                  } as React.CSSProperties
                }
              >
                {char}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

/**
 * 首屏：导航栏下方的 3D 场景，名字和一句话介绍叠在场景上方。
 * 文字层设了 pointer-events: none，鼠标点击会直接传给场景。
 */
export function Hero({ scene, layout = "full" }: Props) {
  const { site } = useContent();
  const active: HeroScene = scene ?? {
    url: site.splineUrl,
    poster: site.splinePoster,
    background: site.splineBackground,
    hiddenObjects: site.splineHiddenObjects,
  };

  return (
    <section
      className={`relative min-[1015px]:pb-[80px] min-[1015px]:pt-[63px] ${layout === "full" ? "flex min-h-[100svh] flex-col justify-center min-[1015px]:block min-[1015px]:min-h-0" : "pt-[56px]"}`}
    >
      <div
        className={`relative overflow-hidden ${LAYOUTS[layout]}`}
        style={{ backgroundColor: active.background }}
      >
        {active.url ? (
          <SplineScene
            url={active.url}
            poster={active.poster}
            background={active.background}
            hiddenObjects={active.hiddenObjects ?? []}
            zoom={active.zoom}
            offsetY={active.offsetY}
            offsetX={active.offsetX}
            title={`${site.name} 3D scene`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-center text-[14px] tracking-[1px] text-[#9a9a9a]">
            YOUR 3D SCENE
            <br />
            (paste your Spline link into content.ts)
          </div>
        )}

        <div
          className={`pointer-events-none absolute inset-x-0 px-[16px] text-center min-[1015px]:top-[44px] ${layout === "full" ? "top-0" : "top-[22px]"}`}
        >
          <h1 className="text-balance text-[35px] font-normal leading-[42px] min-[1015px]:whitespace-nowrap min-[1015px]:text-[50px] min-[1015px]:leading-[60px]">
            <span className="sr-only">{site.heroTitle}</span>
            <AnimatedTitle text={site.heroTitle} />
          </h1>
          {site.tagline ? (
            <p className="wl-tagline-in mx-auto mt-[4px] max-w-[320px] text-balance text-[18px] leading-[23px] text-[#6b6d73] min-[1015px]:mt-0 min-[1015px]:max-w-none min-[1015px]:whitespace-nowrap min-[1015px]:text-[25px] min-[1015px]:leading-[30px]">
              {site.tagline}
            </p>
          ) : null}
        </div>
      </div>

      {layout === "full" ? (
        <p className="wl-note-in relative -mt-[3vw] px-[16px] text-center text-[12px] leading-[14.4px] tracking-[0.96px] text-[#55565a] min-[1015px]:hidden">
          {site.mobileNote}
        </p>
      ) : null}
    </section>
  );
}
