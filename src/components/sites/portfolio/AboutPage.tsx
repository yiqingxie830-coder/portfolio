import { Caveat } from "next/font/google";
import Link from "next/link";
import "./portfolio.css";
import { about } from "./content";
import type { AboutList, MusicTile } from "./content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Reveal } from "./Reveal";

const caveat = Caveat({ subsets: ["latin"], weight: "400" });

const CARD = "wl-glass rounded-[36px]";
const LABEL = "text-[12px] font-medium leading-[14.4px] tracking-[0.96px] text-[#77787d]";

/** 一格“歌单”：照片 + 半透明色 + 手写体小字 + 底部的 Spotify 播放条 */
function MusicCard({ tile }: { tile: MusicTile }) {
  const hasMedia = Boolean(tile.video || tile.photo);
  const dark = hasMedia || Boolean(tile.tint);
  return (
    <div
      className={`${tile.tint ? "wl-glass-tinted" : "wl-glass"} relative aspect-[322/337] overflow-hidden rounded-[36px] min-[1015px]:aspect-auto min-[1015px]:h-full`}
      style={tile.tint ? ({ "--wl-tint": tile.tint } as React.CSSProperties) : undefined}
    >
      {tile.video ? (
        <video src={tile.video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
      ) : tile.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tile.photo} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
      ) : (
        <div className={`absolute inset-0 flex items-center justify-center text-[14px] tracking-[1px] ${dark ? "text-white/50" : "text-[#9a9a9a]"}`}>
          YOUR PHOTO
        </div>
      )}
      {hasMedia && tile.glass ? <div className="wl-glass-sheen" /> : null}
      {/* 顶部加一点暗角，保证左上角的白色小字看得清 */}
      {hasMedia && !tile.photoOnly ? <div className="absolute inset-x-0 top-0 h-[90px] bg-gradient-to-b from-black/35 to-transparent" /> : null}

      {tile.photoOnly ? null : (
        <p
          className={`${caveat.className} absolute left-[20px] top-[18px] text-[20px] leading-[24px] ${dark ? "text-white" : "text-[#55565a]"}`}
        >
          {tile.label}
        </p>
      )}

      {tile.spotifyTrackId ? (
        <iframe
          src={`https://open.spotify.com/embed/track/${tile.spotifyTrackId}`}
          title={`Spotify — ${tile.label}`}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="absolute inset-x-[11px] bottom-[10px] h-[80px] w-[calc(100%-22px)] rounded-[12px] border-0"
        />
      ) : tile.photoOnly ? null : (
        <div
          className={`wl-placeholder absolute inset-x-[14px] bottom-[14px] h-[80px] rounded-[22px] text-[12px] ${dark ? "border-white/35 bg-black/20 text-white/65" : ""}`}
        >
          SPOTIFY TRACK
        </div>
      )}
    </div>
  );
}

function ListCard({ list }: { list: AboutList }) {
  return (
    <div className={`${CARD} h-full px-[27px] pb-[30px] pt-[26px]`}>
      <div className="flex items-center justify-between">
        <p className={LABEL}>{list.title}</p>
        {list.action ? (
          <Link href={list.action.href} className={`${LABEL} wl-link`}>
            {list.action.label}
          </Link>
        ) : null}
      </div>

      <ul className="mt-[20px] flex flex-col gap-[10px]">
        {list.items.map((item) => {
          const row = (
            <>
              {item.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.icon} alt="" className="h-[44px] w-[44px] shrink-0 rounded-[10px] bg-white object-cover" />
              ) : (
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] bg-[#e4e4e4] text-[18px] font-medium text-[#6b6d73]">
                  {item.label.charAt(0)}
                </span>
              )}
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              <span className="shrink-0 whitespace-nowrap">
                {item.value}
                {item.href ? " ↗" : ""}
              </span>
            </>
          );
          const rowClass = "flex items-center gap-[19px] text-[20px] leading-[24px] text-[#55565a]";
          return (
            <li key={item.label}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener" className={`${rowClass} transition-colors hover:text-black`}>
                  {row}
                </a>
              ) : (
                <div className={rowClass}>{row}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="wl-root">
      <Header />
      <main>
        <Hero />

        <div className="mx-auto grid w-[min(1309px,calc(100%-32px))] grid-cols-1 gap-x-[7px] gap-y-[6px] min-[1015px]:grid-cols-[minmax(0,1fr)_580px]">
          <Reveal className={`${CARD} flex flex-col justify-between gap-[20px] px-[27px] pb-[30px] pt-[27px] min-[1015px]:min-h-[540px]`}>
            {about.bio.map((block) => (
              <div key={block.heading}>
                <p className={LABEL}>{block.heading}</p>
                <p className="mt-[7px] text-[20px] leading-[24px] text-[#55565a]">{block.text}</p>
              </div>
            ))}
          </Reveal>

          <div className="grid grid-cols-2 gap-x-[7px] gap-y-[6px] min-[1015px]:grid-rows-2">
            {about.music.map((tile, index) => (
              <Reveal key={tile.label} delay={index * 90} className="min-[1015px]:h-full">
                <MusicCard tile={tile} />
              </Reveal>
            ))}
          </div>

          {about.lists.map((list, index) => (
            <Reveal key={list.title} delay={index * 110}>
              <ListCard list={list} />
            </Reveal>
          ))}
        </div>

        <div className="mt-[191px] hidden min-[1015px]:block">
          <Reveal>
            <Footer />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
