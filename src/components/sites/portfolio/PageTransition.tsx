import { ViewTransition } from "react";

/**
 * 页面切换动效。链接上的 transitionTypes 决定播哪一种：
 * nav-forward（点进文件夹）、nav-back（返回）、nav-fade（导航之间切换）。
 * 浏览器自带的前进/后退不带类型，不播动画。样式在 portfolio.css 的 page transitions 一节。
 */
const BY_TYPE = {
  "nav-forward": "wl-page-forward",
  "nav-back": "wl-page-back",
  "nav-fade": "wl-page-fade",
  default: "none",
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={BY_TYPE} exit={BY_TYPE} default="none">
      {children}
    </ViewTransition>
  );
}
