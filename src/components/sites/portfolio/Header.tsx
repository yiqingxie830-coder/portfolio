"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "./content";

const RING_CIRCUMFERENCE = 2 * Math.PI * 11;
/** 滚动超过这个距离后，导航胶囊收缩。 */
const COLLAPSE_AFTER = 85;
const PILL_OPEN = 458;
const PILL_CLOSED = 56;
/** 胶囊右侧留给进度环的宽度 */
const RING_SPACE = 50;

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function subscribeClock(callback: () => void) {
  const id = window.setInterval(callback, 1000);
  return () => window.clearInterval(id);
}

function Clock() {
  const time = useSyncExternalStore(
    subscribeClock,
    () => formatTime(new Date()),
    () => "",
  );
  return <span suppressHydrationWarning>{time}</span>;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > COLLAPSE_AFTER);
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const expanded = !scrolled || hovered;
  const step = (PILL_OPEN - RING_SPACE) / site.nav.length;

  return (
    <header className="wl-drop-in fixed inset-x-0 top-0 z-10 hidden min-[1015px]:block">
      <div
        className="relative mx-auto h-[63px] w-[1075px] rounded-b-[23px] backdrop-blur-[50px]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="absolute left-[30px] top-[8px] flex h-[46px] items-center text-[20px] font-medium text-[#111]"
        >
          {site.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.logo} alt="" className="h-[46px] w-auto" />
          ) : (
            site.logoText
          )}
        </Link>

        <div className="absolute right-[31px] top-[12px] flex h-[36px] items-center text-[16px] font-medium leading-4 text-[#6b6d73]">
          <Clock />
        </div>
      </div>

      <nav
        aria-label="Primary"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="wl-pill absolute left-1/2 top-[10px] h-[42px] -translate-x-1/2 overflow-hidden rounded-[100px] border border-[#e4e4e4] bg-white"
        style={{ width: expanded ? PILL_OPEN : PILL_CLOSED }}
      >
        <div
          className="wl-pill-links absolute left-1/2 top-0 h-full -translate-x-1/2"
          style={{ width: PILL_OPEN, opacity: expanded ? 1 : 0, pointerEvents: expanded ? "auto" : "none" }}
        >
          {site.nav.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              tabIndex={expanded ? 0 : -1}
              className="wl-link absolute top-0 flex h-full -translate-x-1/2 items-center px-3 text-[16px] font-medium"
              style={{ left: 10 + step * (index + 0.5) }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Scroll progress ring */}
        <svg aria-hidden="true" className="absolute right-[8px] top-[1.5px] h-[37px] w-[39px]" viewBox="0 0 39 37">
          <circle cx="19.5" cy="18.5" r="11" fill="none" stroke="#e4e4e4" strokeWidth="5" />
          <circle
            cx="19.5"
            cy="18.5"
            r="11"
            fill="none"
            stroke="#6b6d73"
            strokeWidth="5"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
          />
        </svg>
      </nav>
    </header>
  );
}
