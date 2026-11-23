"use client";

import type { Application } from "@splinetool/runtime";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

/** 手机上超过这个时间还没加载完，就退回静态截图。 */
const MOBILE_TIMEOUT_MS = 10000;
const MOBILE_QUERY = "(max-width: 1014px)";
/**
 * 场景每一帧最多画这么多像素（约等于一块 1920×1250 的屏幕）。
 * Spline 默认按屏幕的完整分辨率画，在高分屏或大显示器上一帧要画上千万像素，页面就会卡。
 */
const PIXEL_BUDGET = 2_400_000;
/** 再怎么降，也不低于每个 CSS 像素 0.8 个实际像素，免得发糊 */
const MIN_RATIO = 0.8;

type Props = {
  /** Spline 的 .splinecode 地址，或 my.spline.design 的公开查看链接 */
  url: string;
  /** 加载前（以及加载失败时）显示的静态截图，可为空 */
  poster: string;
  title: string;
  /** 场景加载后把它的背景改成这个颜色 */
  background: string;
  /** 加载后要隐藏的物体名 */
  hiddenObjects: string[];
  /** 放大倍数，1 = 原始大小 */
  zoom?: number;
  /** 整个场景往下挪多少，例如 "8%"（相对容器高度） */
  offsetY?: string;
  /** 整个场景往右挪多少，例如 "4%"（相对容器宽度），负数往左 */
  offsetX?: string;
};

/**
 * 懒加载的 Spline 场景：先显示截图，页面其余内容加载完后才开始加载场景，
 * 场景就绪后淡入。场景上方不放任何会拦截点击的层。
 */
export function SplineScene({
  url,
  poster,
  title,
  background,
  hiddenObjects,
  zoom,
  offsetY,
  offsetX,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const appRef = useRef<Application | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  /** 场景当前是否在屏幕里（或快要进来） */
  const onScreenRef = useRef(true);
  /** 画布缩小的倍数：画布按 1/shrink 的尺寸渲染，再用 CSS 放大回原来的大小。1 = 不缩 */
  const [shrink, setShrink] = useState(1);

  // 按容器大小和屏幕像素密度，算出需要把画布缩小多少才不超过像素预算。
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => {
      const dpr = window.devicePixelRatio || 1;
      const area = box.clientWidth * box.clientHeight;
      if (!area) return;
      const ratio = Math.min(
        dpr,
        Math.max(MIN_RATIO, Math.sqrt(PIXEL_BUDGET / area)),
      );
      // 取两位小数，避免窗口微调时反复重设画布
      setShrink(Math.round((dpr / ratio) * 100) / 100);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  // 离开页面时，先让场景停止渲染，再让画布从页面上摘掉。
  // 否则 Spline 会在已经没有尺寸（0×0）的画布上多画几帧，WebGPU 就会连环报错。
  // 用 useLayoutEffect 是因为它的清理发生在画布被移除之前。
  useLayoutEffect(() => {
    return () => {
      appRef.current?.stop();
      appRef.current = null;
    };
  }, []);

  // 场景滑出屏幕后暂停渲染，快滑回来时提前恢复。否则它在看不见的时候也一直占着显卡，页面滚动会卡。
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreenRef.current = entry.isIntersecting;
        const app = appRef.current;
        if (!app) return;
        if (entry.isIntersecting) app.play();
        else app.stop();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  // 等页面加载完再开始加载场景，不阻塞首屏。
  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) return; // 省流量模式：只显示截图

    let idle = 0;
    const start = () => {
      idle = window.setTimeout(() => setMounted(true), 200);
    };
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }
    return () => {
      window.clearTimeout(idle);
      window.removeEventListener("load", start);
    };
  }, []);

  // 手机上加载太慢就放弃，保留截图。
  useEffect(() => {
    if (!mounted || ready) return;
    if (!window.matchMedia(MOBILE_QUERY).matches) return;
    const timer = window.setTimeout(() => setFailed(true), MOBILE_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [mounted, ready]);

  const scale = zoom ?? 1;
  const isSplineCode = url.split("?")[0].endsWith(".splinecode");

  return (
    <div
      ref={boxRef}
      className="absolute"
      style={{
        // 把画布做得比容器大（超出部分被容器裁掉），场景就跟着等比放大；top 再整体往下挪。
        width: `${scale * 100}%`,
        height: `${scale * 100}%`,
        left: `calc(${((1 - scale) / 2) * 100}% + ${offsetX ?? "0px"})`,
        top: `calc(${((1 - scale) / 2) * 100}% + ${offsetY ?? "0px"})`,
      }}
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {mounted && !failed ? (
        <div className="wl-scene absolute inset-0" data-ready={ready}>
          {isSplineCode ? (
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{
                width: `${100 / shrink}%`,
                height: `${100 / shrink}%`,
                transform: shrink === 1 ? undefined : `scale(${shrink})`,
              }}
            >
              <Spline
                scene={url}
                onLoad={(app) => {
                  appRef.current = app;
                  app.setBackgroundColor(background);
                  for (const name of hiddenObjects) {
                    const object = app.findObjectByName(name);
                    if (object) object.visible = false;
                  }
                  if (!onScreenRef.current) app.stop();
                  setReady(true);
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <iframe
              src={url}
              title={title}
              onLoad={() => setReady(true)}
              className="h-full w-full border-0"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
