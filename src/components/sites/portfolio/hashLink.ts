import type { MouseEvent } from "react";

/**
 * 首页上的 "/#experience" 这类链接：已经在首页时自己滚过去。
 * （交给路由处理的话，线上地址带子路径时只会改网址、不会滚动。）
 * 用法：<Link href={href} onClick={(event) => scrollToHash(event, href, pathname)} />
 */
export function scrollToHash(event: MouseEvent<HTMLAnchorElement>, href: string, pathname: string) {
  if (!href.startsWith("/#") || pathname !== "/") return;
  // 新标签页打开等情况交给浏览器处理
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(href.slice(2));
  if (!target) return;
  event.preventDefault();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  window.history.replaceState(window.history.state, "", href.slice(1));
}
