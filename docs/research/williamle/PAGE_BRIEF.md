# williamle.design — page brief

Source: https://williamle.design/#:Mp8fQXZB8 (Framer, generator c9d77eb). The hash is the "Work" nav link
target (`./#:Mp8fQXZB8`); there is no element with that id, so it renders the home page at the top.
Local route: `/` (src/app/page.tsx → src/components/sites/williamle/).

## Breakpoints
- `min-width: 1015px` desktop: full page, 6979px tall.
- `max-width: 1014.98px`: "mobile" — only title, subtitle, Spline scene, and "VIEW DESKTOP MODE FOR FULL VERSION"; no header, page = 100vh.

## Tokens
- Page bg `#101010`; card bg `rgb(30,29,28)` + 1px `#272727` border, radius 10.
- Font: Inter Display 400/500 (Framer-hosted woff2), Inter (Play nav item), SF Pro Text (Apple card tag).
- Muted text `#7f8188` (nav, links), `#979797` (card body/tag), headings `#f2f2f2`.

## Header (fixed, z 10) — appear: y -30 → 0, opacity 0 → 1, 0.7s ease [1,.02,.69,1]
- Bar 1075×63 centered, bg rgba(16,16,16,.9), backdrop blur(50px), bottom radius 23.
- Logo 45×29 at bar-left+30, top 14. Clock (local time, "1:49 PM") 16/16 500 #7f8188, right inset 31.
- Nav pill: bg #101010, border 1px #303236, radius 100, height 42, top 10, centered.
  Expanded 458px (Work / About / Play centers at 130/223/319); collapsed 165px when scrollY > ~85 and not hovered.
  Spring with ~10% overshoot over ~0.6s. Hover expands it again.
  Left: cursor-click SVG (28×29, left 13). Right: scroll progress ring (r 17.5, stroke 5, track #303236, fill #7f8188).

## Hero (appear 1s ease [.44,0,.56,1])
- "William Le" 50/60 400, gradient text 0deg #595959→#fff, top 120 centered.
- "Designing through a different lens." 25/30 400 #7f8188, top 180.
- Spline iframe `my.spline.design/portfoliohomepagecopycopy-…` top 98, left -192, width 100vw+385, height 798; appears from y+150.

## Sections
- "SELECTED UX WORK" (top 976) / "AUGMENTED REALITY" (top 4066): 25/30 400 ls 2px #979797; fade in on view (1s).
- Cards 1000 wide (AR cards ~992), 68px gaps. Tops: 1074, 1647, 2220, 2794, 3368 | 4164, 4737, 5321, 5906. Footer at 6612 (367 tall).
- Scroll transform per card: progress p = (vh − top)/height clamped 0..1 (from top at viewport bottom
  until the whole card is in view); perspective(1200px) scale(.5+.5p) rotateX(20°·(1−p)); opacity .5+.5p; spring smoothed.
- Hover: scale 1.03, box-shadow 0 0 40px rgb(36,36,36) (Lica rgb(105,105,105)), replaces content with brand media:
  Lica 2 videos on #f2f2f2; Apple image + video; Visavis/SoundCloud/Forbes full-cover video; CoVision/SpatialSense YouTube
  (oGvr9sjFfbo / ylayKRpGl9s); Snap yellow #fefc00 + phone + GIF; INST639P #e4ffd1 + phone video.

## Footer
- bg rgb(30,29,28), 1px #272727, radius 10, 1678 wide centered (wider than viewport).
- "👋 Thanks for stopping by! …" 25/30 500 white, top 55 centered.
- Columns at center −496 / −232 / +47 / +326: header 12px ls .96 #7a7a7a top 135; links 18/21.6 #7f8188 (hover #fff), 35px pitch from 160.

## Assets
See scripts/download-williamle-assets.sh (framerusercontent images/, assets/ → public/sites/williamle/{images,videos,fonts}).
