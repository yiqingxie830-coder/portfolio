"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PhoneScreen } from "./content";
import { ToneoMascot } from "./ToneoMascot";
import { highlight } from "./highlight";

/** 每一页自动停留多久（毫秒） */
const DWELL = 3600;

/**
 * 手机样机 + 步骤列表。
 * 截图叠在一起：切换时上一页向下滑动并淡出，新的一页从上方落下淡入。
 * 自动播放；鼠标悬停或键盘聚焦时暂停；点右边的步骤（或按 ↑ ↓）切换。
 */
export function PhoneShowcase({
  screens,
  title,
  heading,
}: {
  screens: PhoneScreen[];
  title?: string;
  /** 样机上方的小标题（可选） */
  heading?: string;
}) {
  const [active, setActive] = useState(0);
  // 正在离开的页：向下滑动并淡出，动画（700ms）播完之前一直保持这个状态，快速连点也不会被拉回上方
  const [leaving, setLeaving] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = screens.length;

  const go = useCallback(
    (next: number) => {
      const target = ((next % count) + count) % count;
      setActive((current) => {
        if (current !== target) {
          setLeaving((list) => [...list.filter((i) => i !== current && i !== target), current]);
          window.setTimeout(() => setLeaving((list) => list.filter((i) => i !== current)), 760);
        }
        return target;
      });
    },
    [count],
  );

  // 尊重系统的“减少动态效果”设置：不自动播放、不位移
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // 只有滚到视口里才开始自动播放
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const playing = visible && !paused && !reduced && count > 1;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => go(active + 1), DWELL);
    return () => window.clearTimeout(timer);
  }, [active, playing, go]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      go(active - 1);
    }
  };

  return (
    <section
      ref={rootRef}
      className="wl-glass wl-phone-showcase rounded-[28px] px-[18px] py-[28px] min-[1015px]:px-[40px] min-[1015px]:py-[40px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
      aria-label={title ?? "App walkthrough"}
    >
      {heading ? (
        <h2 className="mb-[20px] text-[20px] font-medium leading-[26px] text-[#111] min-[1015px]:mb-[28px] min-[1015px]:text-[24px] min-[1015px]:leading-[30px]">
          {heading}
        </h2>
      ) : null}
      <div className="flex flex-col items-center gap-[28px] min-[1015px]:flex-row min-[1015px]:items-center min-[1015px]:gap-[48px]">
        {/* 手机 */}
        <div className="flex items-center">
          <div className="wl-phone-frame relative">
            <div className="wl-phone-screen">
              {screens.map((screen, index) => {
                // 当前页归位；刚离开的那页向下滑出淡掉；其余的在上方等着，下一次从上往下落入
                const state = index === active ? "is-active" : leaving.includes(index) ? "is-leaving" : "is-waiting";
                return (
                  <div key={screen.src} className={`wl-phone-slide ${state}`} aria-hidden={index !== active}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={screen.src}
                      alt={screen.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    {screen.mascot ? (
                      <div
                        className="wl-phone-mascot"
                        style={{
                          left: `${screen.mascot.x}%`,
                          top: `${screen.mascot.y}%`,
                          width: `${screen.mascot.size}%`,
                        }}
                      >
                        <ToneoMascot interactive={false} sway={0.8} phase={index * 1.7} label="" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>


        </div>

        {/* 步骤列表 */}
        <ol className="flex w-full flex-1 flex-col gap-[4px]">
          {screens.map((screen, index) => {
            const isActive = index === active;
            return (
              <li key={screen.src}>
                <button
                  type="button"
                  onClick={() => go(index)}
                  aria-current={isActive ? "step" : undefined}
                  className={`wl-phone-step ${isActive ? "is-active" : ""}`}
                >
                  <span className="wl-phone-step-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex flex-1 flex-col text-left">
                    <span className="text-[16px] font-medium leading-[22px] text-[#111]">{screen.title}</span>
                    {screen.caption ? (
                      <span className="wl-phone-step-caption text-[14px] leading-[20px] text-[#55565a]">
                        <span className="min-h-0">{highlight(screen.caption)}</span>
                      </span>
                    ) : null}
                    {isActive && playing ? (
                      <span
                        key={`progress-${active}`}
                        className="wl-phone-progress"
                        style={{ animationDuration: `${DWELL}ms` }}
                        aria-hidden="true"
                      />
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
