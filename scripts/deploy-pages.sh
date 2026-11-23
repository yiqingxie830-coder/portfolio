#!/bin/bash
# 把网站发布到 GitHub Pages（https://yiqingxie830-coder.github.io/portfolio/）。
# 用法：在项目根目录运行  bash scripts/deploy-pages.sh
#
# 做的事：构建静态网站 → 删掉不想公开的文件 → 把构建结果推到仓库的 gh-pages 分支。
# 只更新线上网站，不会提交或推送源代码。
set -euo pipefail

cd "$(dirname "$0")/.."
REPO_URL="https://github.com/yiqingxie830-coder/portfolio.git"

echo "→ 构建网站…"
npm run build:pages

# 不公开的文件：头像原图、带手机号的简历。即使放在 public/ 里也不会被发布。
echo "→ 移除不公开的文件…"
find out \( -name "about-portrait*" -o -name "resume-*.pdf" \) -print -delete

# 在临时目录里建一个只含构建结果的仓库，推到 gh-pages
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
cp -R out/. "$STAGE"/
cd "$STAGE"
git init -q -b gh-pages
git add -A

LEFT="$(git ls-files | grep -ciE 'portrait|resume' || true)"
if [ "$LEFT" != "0" ]; then
  echo "✗ 构建结果里还有不公开的文件，已中止，没有发布。"
  exit 1
fi

NAME="$(git -C "$OLDPWD" log -1 --format=%an)"
EMAIL="$(git -C "$OLDPWD" log -1 --format=%ae)"
git -c user.name="$NAME" -c user.email="$EMAIL" commit -q -m "Deploy updated portfolio site"

echo "→ 推送到 gh-pages…"
git push -f "$REPO_URL" gh-pages

echo "✓ 已推送。GitHub 大约一分钟后更新线上网站："
echo "  https://yiqingxie830-coder.github.io/portfolio/"
