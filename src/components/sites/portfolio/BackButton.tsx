"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** 三角形转动的时间；和 portfolio.css 里 .wl-back-dot[data-turning] 的时长保持一致。 */
const TURN_MS = 320;

/** 详情页左上角的返回三角形：点击时先向右转 90 度，再回到首页。 */
export function BackButton({ href }: { href: string }) {
  const router = useRouter();
  const [turning, setTurning] = useState(false);

  return (
    <Link
      href={href}
      aria-label="Back"
      title="Back"
      className="wl-back-dot"
      data-turning={turning}
      transitionTypes={["nav-back"]}
      onClick={(event) => {
        // 新标签页打开等情况交给浏览器处理
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (turning) return;
        setTurning(true);
        window.setTimeout(() => router.push(href, { transitionTypes: ["nav-back"] }), TURN_MS);
      }}
    />
  );
}
