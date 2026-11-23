import type { ReactNode } from "react";

const BLUE = "font-medium text-[#2f6bff]";

/**
 * 数字自动标蓝：200+、55%、2 万+、47.4%、5 万美元里的“5 万”等。
 * 紧跟在字母或连字符后面的数字（GPT-5、H5）不算，避免把型号拆开。
 */
const NUMBER = /(?<![A-Za-z0-9\-_/.])\d+(?:[.,]\d+)*(?:\s?(?:%|万\+?|千\+?|亿|倍|\+|[kK]\+?|x\b))?/g;

function numbers(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(NUMBER)) {
    const start = match.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    out.push(
      <span key={`${keyPrefix}-${start}`} className={BLUE}>
        {match[0]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** 把 **这样** 包住的文字和所有数字显示成蓝色，其余原样输出 */
export function highlight(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).flatMap((part, index) =>
    index % 2 === 1
      ? [
          <span key={`b-${index}`} className={BLUE}>
            {part}
          </span>,
        ]
      : numbers(part, `n-${index}`),
  );
}
