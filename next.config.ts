import type { NextConfig } from "next";

/**
 * 普通构建（npm run build / dev）：和原来一样。
 * GitHub Pages 构建（npm run build:pages）：导出成纯静态文件，并挂在 /<仓库名> 路径下。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = basePath
  ? { output: "export", basePath, images: { unoptimized: true } }
  : { output: "standalone" };

export default nextConfig;
