"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** 延迟多少毫秒再出现（同一排的元素可以错开） */
  delay?: number;
};

type Phase = "hidden" | "shown" | "instant";

/**
 * 滚动到视口里才出现：淡入 + 从下方上移。只播放一次。
 * 如果元素一开始就在视口上方（例如从详情页返回到页面中段），直接显示，不再补播动画。
 */
export function Reveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        } else if (entry.boundingClientRect.bottom < 0) {
          setPhase("instant");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={phase !== "hidden"}
      data-instant={phase === "instant"}
      className={`wl-reveal-up ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
