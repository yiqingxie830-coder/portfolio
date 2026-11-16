import Link from "next/link";
import type { Project } from "./content";

/**
 * 一个“文件夹”：logo 纸片从文件夹里探出来，正面是磨砂玻璃。
 * 所有文件夹大小相同（340×280），点击进入 /work/<slug> 详情页。
 */
export function FolderCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.externalHref ?? `/work/${project.slug}`}
      {...(project.externalHref ? { target: "_blank", rel: "noopener" } : {})}
      className="wl-folder"
      style={project.accent ? ({ "--wl-accent": project.accent } as React.CSSProperties) : undefined}
    >
      <div className="wl-folder-art">
        <svg className="wl-folder-back" viewBox="0 0 340 280" aria-hidden="true">
          <path d="M0 24Q0 0 24 0H100Q114 0 122 11L128 19Q135 28 148 28H316Q340 28 340 52V256Q340 280 316 280H24Q0 280 0 256Z" />
        </svg>

        <div className="wl-folder-paper">
          {project.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logo}
              alt={`${project.title} logo`}
              className={`h-[70px] object-contain ${project.extras?.length ? "w-[118px] object-left" : "mx-auto w-full"}`}
            />
          ) : (
            <p className="flex h-[70px] items-center justify-center text-center text-[22px] font-medium leading-[26px] text-[#111]">
              {project.title}
            </p>
          )}
        </div>

        {project.extras?.slice(0, 2).map((extra, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={extra.src} src={extra.src} alt="" className="wl-folder-extra" data-side={index === 0 ? "left" : "right"} />
        ))}

        <div className="wl-folder-front wl-glass">
          <p className="absolute inset-x-[20px] top-[18px] line-clamp-3 text-[15px] italic leading-[20px] text-[#55565a]">
            {project.description}
          </p>
          <span className="absolute bottom-[18px] left-[18px] max-w-[304px] truncate rounded-full bg-white/70 px-[14px] py-[7px] text-[12px] font-medium uppercase leading-[14px] tracking-[0.8px] text-[#55565a]">
            {project.tag}
          </span>
        </div>
      </div>

      <h3 className="mt-[22px] text-center text-[22px] font-medium leading-[28px] text-[#111]">{project.title}</h3>
    </Link>
  );
}
