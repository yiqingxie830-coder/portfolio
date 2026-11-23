import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/components/sites/portfolio/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * 中文字体：思源黑体（Noto Sans SC），免费、可嵌入，所有访客看到的都一样。
 * 用 <link> 直接从 Google Fonts 加载，不走 next/font：
 * Next 16 默认的 Turbopack 处理不了中文字体的大量分片（会报 Module not found）。
 * 浏览器只会下载页面上实际用到的字所在的分片。
 */
const notoSansSCHref = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&display=swap";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ ["--wl-font-zh" as string]: '"Noto Sans SC"' }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={notoSansSCHref} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
