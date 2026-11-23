"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { scrollToHash } from "./hashLink";
import { setLang, useContent, useLang } from "./language";

const RING_CIRCUMFERENCE = 2 * Math.PI * 11;
/** 滚动超过这个距离后，导航胶囊收缩。 */
const COLLAPSE_AFTER = 85;
const PILL_OPEN = 458;
const PILL_CLOSED = 56;
/** 胶囊右侧留给进度环的宽度 */
const RING_SPACE = 50;
/** 鼠标离开后等一小会儿再收起，避免在边缘来回抖动 */
const COLLAPSE_DELAY = 160;

/** 下落入场只在第一次打开网站时播放；站内切换页面时导航保持不动。 */
let hasDropped = false;

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function subscribeClock(callback: () => void) {
  const id = window.setInterval(callback, 1000);
  return () => window.clearInterval(id);
}

function LangToggle({ className }: { className: string }) {
  const lang = useLang();
  return (
    // 中英文切换：深色的是当前语言
    <button
      type="button"
      onClick={() => setLang(lang === "zh" ? "en" : "zh")}
      aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
      className={`wl-lang flex cursor-pointer items-center ${className}`}
    >
      <span data-active={lang === "en"}>EN</span>
      <span aria-hidden="true">/</span>
      <span data-active={lang === "zh"}>中</span>
    </button>
  );
}

function Clock() {
  const time = useSyncExternalStore(
    subscribeClock,
    () => formatTime(new Date()),
    () => "",
  );
  return <span suppressHydrationWarning>{time}</span>;
}

export function Header({
  mobileNav = true,
}: {
  /** false = 手机上不显示顶部导航（首页用） */ mobileNav?: boolean;
}) {
  const { site } = useContent();
  const pathname = usePathname();
  const lang = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  // 进度环直接改 DOM，不走 React 状态：否则每滚动一帧整个导航都要重新渲染一遍
  const ringRef = useRef<SVGCircleElement>(null);
  const [dropIn] = useState(() => !hasDropped);
  const leaveTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    hasDropped = true;
    return () => window.clearTimeout(leaveTimer.current);
  }, []);

  useEffect(() => {
    // 每一帧最多更新一次，滚动时不卡
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > COLLAPSE_AFTER);
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ringRef.current?.setAttribute("stroke-dashoffset", String(RING_CIRCUMFERENCE * (1 - progress)));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const open = () => {
    window.clearTimeout(leaveTimer.current);
    setHovered(true);
  };
  const close = () => {
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(
      () => setHovered(false),
      COLLAPSE_DELAY,
    );
  };

  const expanded = !scrolled || hovered;
  const step = (PILL_OPEN - RING_SPACE) / site.nav.length;

  return (
    <>
      {/* 手机和平板：一条固定在顶部的简化导航 */}
      {mobileNav ? (
        <header
          className="fixed inset-x-0 top-0 z-10 min-[1015px]:hidden"
          style={{ viewTransitionName: "wl-header" }}
        >
          <div
            className="flex h-[56px] items-center gap-[12px] px-[14px] backdrop-blur-[16px]"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          >
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              transitionTypes={["nav-fade"]}
              className="flex h-[36px] shrink-0 items-center text-[18px] font-medium text-[#111]"
            >
              {site.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={site.logo} alt="" className="h-[36px] w-auto" />
              ) : (
                site.logoText
              )}
            </Link>
            <nav
              aria-label="Primary"
              className="ml-auto flex items-center gap-[14px] text-[14px] font-medium"
            >
              {site.nav.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(event) => scrollToHash(event, link.href, pathname)}
                  transitionTypes={["nav-fade"]}
                  className="wl-link flex h-[44px] items-center whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <LangToggle className="h-[44px] shrink-0 gap-[4px] text-[14px] font-medium text-[#6b6d73]" />
          </div>
        </header>
      ) : null}

      <header
        className={`${dropIn ? "wl-drop-in " : ""}fixed inset-x-0 top-0 z-10 hidden min-[1015px]:block`}
        style={{ viewTransitionName: "wl-header" }}
      >
        <div
          className="relative mx-auto h-[63px] w-[1075px] rounded-b-[23px] backdrop-blur-[16px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            transitionTypes={["nav-fade"]}
            className="absolute left-[30px] top-[8px] flex h-[46px] items-center text-[20px] font-medium text-[#111]"
          >
            {site.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.logo} alt="" className="h-[46px] w-auto" />
            ) : (
              site.logoText
            )}
          </Link>

          <div className="absolute right-[31px] top-[12px] flex h-[36px] items-center gap-[18px] text-[16px] font-medium leading-4 text-[#6b6d73]">
            <LangToggle className="gap-[6px]" />
            <Clock />
          </div>
        </div>

        <nav
          aria-label="Primary"
          onMouseEnter={open}
          onMouseLeave={close}
          onFocus={open}
          onBlur={close}
          data-expanded={expanded}
          className="wl-pill absolute left-1/2 top-[10px] h-[42px] -translate-x-1/2 overflow-hidden rounded-[100px] border border-[#e4e4e4] bg-white"
          style={{ width: expanded ? PILL_OPEN : PILL_CLOSED }}
        >
          <div
            className="wl-pill-links absolute left-1/2 top-0 h-full -translate-x-1/2"
            style={{ width: PILL_OPEN }}
          >
            {site.nav.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(event) => scrollToHash(event, link.href, pathname)}
                transitionTypes={["nav-fade"]}
                className="wl-link wl-pill-link absolute top-0 flex h-full -translate-x-1/2 items-center px-3 text-[16px] font-medium"
                style={
                  {
                    left: 10 + step * (index + 0.5),
                    "--wl-i": index,
                  } as React.CSSProperties
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Scroll progress ring */}
          <svg
            aria-hidden="true"
            className="absolute right-[8px] top-[1.5px] h-[37px] w-[39px]"
            viewBox="0 0 39 37"
          >
            <circle
              cx="19.5"
              cy="18.5"
              r="11"
              fill="none"
              stroke="#e4e4e4"
              strokeWidth="5"
            />
            <circle
              ref={ringRef}
            className="wl-ring-progress"
              cx="19.5"
              cy="18.5"
              r="11"
              fill="none"
              stroke="#6b6d73"
              strokeWidth="5"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE}
            />
          </svg>
        </nav>
      </header>
    </>
  );
}
