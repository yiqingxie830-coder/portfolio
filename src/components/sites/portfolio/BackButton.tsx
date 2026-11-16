"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      onClick={(event) => {
        // 新标签页打开等情况交给浏览器处理
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (turning) return;
        setTurning(true);
        window.setTimeout(() => router.push(href), TURN_MS);
      }}
    />
  );
}
