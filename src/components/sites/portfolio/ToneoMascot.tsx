"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * 会动的 Toneo 吉祥物（从 Toneo 吉祥物 · 可旋转 的 HTML 原型移植）。
 * - 没人碰时轻轻左右摇头、抬头低头
 * - 鼠标 / 手指拖动可以转动它，松手后弹回基准角度
 * - 眼睛会眨（CSS 动画）
 * - 系统开了“减少动态效果”时：不自动摇头，只保留拖动
 */
const BASE = { yaw: 0, pitch: 5 };
const R = Math.PI / 180;
const CX = 100;
const CY = 100;
const RAD = 88;
const EYE_RX = 13;
const EYE_RY = 22;
const EYE_AZ = 27;
const EYE_EL = -16;

type Pose = { yaw: number; pitch: number };

function rotate(v: [number, number, number], { yaw, pitch }: Pose): [number, number, number] {
  const cy = Math.cos(yaw * R);
  const sy = Math.sin(yaw * R);
  const cp = Math.cos(pitch * R);
  const sp = Math.sin(pitch * R);
  const x1 = v[0] * cy + v[2] * sy;
  const z1 = -v[0] * sy + v[2] * cy;
  const y1 = v[1];
  return [x1, y1 * cp + z1 * sp, -y1 * sp + z1 * cp];
}

function headPath({ yaw, pitch }: Pose) {
  const sy = Math.sin(yaw * R);
  const sp = Math.sin(pitch * R);
  const mid = 100 + sy * 5;
  const L = 12 + Math.max(0, -sy) * 8;
  const Rt = 188 - Math.max(0, sy) * 8;
  const top = 10 - sp * 6;
  const jawY = 176 + sp * 10;
  const chinX = 100 + sy * 16;
  const cheekY = 128 + sp * 8;
  return (
    `M${mid} ${top} C ${mid + 58} ${top}, ${Rt} ${top + 44}, ${Rt} ${cheekY - 30} ` +
    `C ${Rt} ${cheekY + 10}, ${Rt - 10} ${jawY - 18}, ${chinX + 40} ${jawY - 4} ` +
    `C ${chinX + 18} ${jawY + 4}, ${chinX - 18} ${jawY + 4}, ${chinX - 40} ${jawY - 4} ` +
    `C ${L + 10} ${jawY - 18}, ${L} ${cheekY + 10}, ${L} ${cheekY - 30} ` +
    `C ${L} ${top + 44}, ${mid - 58} ${top}, ${mid} ${top} Z`
  );
}

function eyeTransform(azDeg: number, pose: Pose) {
  const a = azDeg * R;
  const e = EYE_EL * R;
  const P = rotate([Math.cos(e) * Math.sin(a), Math.sin(e), Math.cos(e) * Math.cos(a)], pose);
  const U = rotate([Math.cos(a), 0, -Math.sin(a)], pose);
  const V = rotate([-Math.sin(e) * Math.sin(a), Math.cos(e), -Math.sin(e) * Math.cos(a)], pose);
  const sx = CX + RAD * P[0];
  const sy = CY - RAD * P[1];
  const m = [U[0] * EYE_RX, -U[1] * EYE_RX, V[0] * EYE_RY, -V[1] * EYE_RY, sx, sy].map((n) => n.toFixed(2));
  const opacity = P[2] > 0.1 ? Math.min(1, (P[2] - 0.1) * 5) : 0;
  return { transform: `matrix(${m.join(" ")})`, opacity };
}

type MascotProps = {
  /** 像素大小；不填就撑满父元素（用在手机截图里） */
  size?: number;
  label?: string;
  /** false = 不能拖动（叠在截图上时用，避免和页面操作冲突） */
  interactive?: boolean;
  /** 自动摇头的幅度倍数 */
  sway?: number;
  /** 自动摇头的起始相位（秒），让多个吉祥物不同步 */
  phase?: number;
};

export function ToneoMascot({ size, label = "Toneo", interactive = true, sway = 1, phase = 0 }: MascotProps) {
  const uid = useId().replace(/:/g, "");
  const [pose, setPose] = useState<Pose>(BASE);
  const poseRef = useRef<Pose>(BASE);
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const spring = useRef<number | null>(null);
  const idle = useRef<number | null>(null);
  const resumeAt = useRef(0);
  const reduced = useRef(false);

  const apply = useCallback((next: Pose) => {
    poseRef.current = next;
    setPose(next);
  }, []);

  const stopSpring = () => {
    if (spring.current !== null) cancelAnimationFrame(spring.current);
    spring.current = null;
  };

  const springBack = useCallback(() => {
    stopSpring();
    let vy = 0;
    let vp = 0;
    const k = 0.09;
    const damp = 0.82;
    const step = () => {
      const cur = poseRef.current;
      vy = (vy + (BASE.yaw - cur.yaw) * k) * damp;
      vp = (vp + (BASE.pitch - cur.pitch) * k) * damp;
      const next = { yaw: cur.yaw + vy, pitch: cur.pitch + vp };
      apply(next);
      const rest =
        Math.abs(vy) + Math.abs(vp) + Math.abs(BASE.yaw - next.yaw) + Math.abs(BASE.pitch - next.pitch);
      if (rest > 0.05) spring.current = requestAnimationFrame(step);
      else {
        apply(BASE);
        spring.current = null;
      }
    };
    spring.current = requestAnimationFrame(step);
  }, [apply]);

  // 没人碰时轻轻摇头（拖动后停 1.5 秒再开始）
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = query.matches;
    const start = performance.now();
    const tick = (now: number) => {
      if (!reduced.current && !drag.current && spring.current === null && now > resumeAt.current) {
        const t = (now - start) / 1000 + phase;
        apply({ yaw: BASE.yaw + Math.sin(t * 0.7) * 28 * sway, pitch: BASE.pitch + Math.sin(t * 0.45) * 8 * sway });
      }
      idle.current = requestAnimationFrame(tick);
    };
    idle.current = requestAnimationFrame(tick);
    return () => {
      if (idle.current !== null) cancelAnimationFrame(idle.current);
      stopSpring();
    };
  }, [apply, phase, sway]);

  const onPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    stopSpring();
    drag.current = { x: event.clientX, y: event.clientY, ...poseRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d) return;
    apply({
      yaw: Math.max(-80, Math.min(80, d.yaw + (event.clientX - d.x) * 0.6)),
      pitch: Math.max(-60, Math.min(40, d.pitch - (event.clientY - d.y) * 0.5)),
    });
  };
  const onPointerEnd = () => {
    if (!drag.current) return;
    drag.current = null;
    resumeAt.current = performance.now() + 1500;
    springBack();
  };

  const d = headPath(pose);
  const left = eyeTransform(-EYE_AZ, pose);
  const right = eyeTransform(EYE_AZ, pose);

  return (
    <svg
      viewBox="-30 -30 260 260"
      width={size ?? "100%"}
      height={size ?? "100%"}
      role="img"
      aria-label={label}
      className={interactive ? "wl-toneo-mascot" : "wl-toneo-mascot is-static"}
      onPointerDown={interactive ? onPointerDown : undefined}
      onPointerMove={interactive ? onPointerMove : undefined}
      onPointerUp={interactive ? onPointerEnd : undefined}
      onPointerCancel={interactive ? onPointerEnd : undefined}
    >
      <defs>
        <filter id={`s${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`h${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id={`g${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="4" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 -.18" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <path d={d} fill="#2A2A2D" opacity={0.35} filter={`url(#h${uid})`} />
      <path d={d} fill="#2A2A2D" filter={`url(#s${uid})`} />
      <path d={d} fill="#2A2A2D" opacity={0.5} filter={`url(#g${uid})`} />
      <g className="wl-toneo-eye">
        <ellipse cx="0" cy="0" rx="1" ry="1" fill="#fff" transform={left.transform} opacity={left.opacity} />
      </g>
      <g className="wl-toneo-eye">
        <ellipse cx="0" cy="0" rx="1" ry="1" fill="#fff" transform={right.transform} opacity={right.opacity} />
      </g>
    </svg>
  );
}
