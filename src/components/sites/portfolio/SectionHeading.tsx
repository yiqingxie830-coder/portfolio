"use client";

import { useEffect, useRef, useState } from "react";

/** 25/30 heading with 2px tracking that fades in once it enters the viewport. */
export function SectionHeading({
  children,
  id,
}: {
  children: string;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      id={id}
      data-visible={visible}
      className="wl-reveal mx-auto h-[30px] w-fit text-center text-[25px] font-normal leading-[30px] tracking-[2px] text-[#55565a]"
    >
      {children}
    </h2>
  );
}
