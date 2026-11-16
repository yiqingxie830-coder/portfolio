"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

/** 手机上超过这个时间还没加载完，就退回静态截图。 */
const MOBILE_TIMEOUT_MS = 10000;
const MOBILE_QUERY = "(max-width: 1014px)";

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
};

/**
 * 懒加载的 Spline 场景：先显示截图，页面其余内容加载完后才开始加载场景，
 * 场景就绪后淡入。场景上方不放任何会拦截点击的层。
 */
export function SplineScene({ url, poster, title, background, hiddenObjects }: Props) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // 等页面加载完再开始加载场景，不阻塞首屏。
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
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

  const isSplineCode = url.split("?")[0].endsWith(".splinecode");

  return (
    <div className="absolute inset-0">
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      ) : null}

      {mounted && !failed ? (
        <div className="wl-scene absolute inset-0" data-ready={ready}>
          {isSplineCode ? (
            <Spline scene={url} onLoad={(app) => {
                app.setBackgroundColor(background);
                for (const name of hiddenObjects) {
                  const object = app.findObjectByName(name);
                  if (object) object.visible = false;
                }
                setReady(true);
              }}
              style={{ width: "100%", height: "100%" }} />
          ) : (
            <iframe src={url} title={title} onLoad={() => setReady(true)} className="h-full w-full border-0" />
          )}
        </div>
      ) : null}
    </div>
  );
}
