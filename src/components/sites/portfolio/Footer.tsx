"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToHash } from "./hashLink";
import { useContent } from "./language";

type FooterLink = { label: string; href: string; /** 填了就是下载链接，值是下载下来的文件名 */ download?: string };

const isExternal = (href: string) => href.startsWith("http");

export function Footer() {
  const { sections, site } = useContent();
  const pathname = usePathname();
  const columns: { id?: string; title: string; links: FooterLink[] }[] = [
    { title: site.footerPagesTitle, links: site.footerPages },
    ...sections.map((section) => ({
      id: section.id,
      title: section.title,
      links: section.projects.map((project) => ({ label: project.title, href: project.externalHref ?? `/work/${project.slug}` })),
    })),
    { title: site.footerSocialTitle, links: site.social },
  ];

  return (
    <footer className="relative pb-[40px]">
      <div className="absolute inset-y-0 left-1/2 w-[1678px] -translate-x-1/2 wl-glass rounded-[36px]" />

      <p className="relative px-[24px] pt-[44px] text-balance text-center text-[20px] font-medium leading-[26px] text-[#111] min-[1015px]:pt-[55px] min-[1015px]:text-[25px] min-[1015px]:leading-[30px]">{site.footerMessage}</p>

      <div className="relative mx-auto mt-[40px] grid grid-cols-2 gap-x-[24px] gap-y-[32px] px-[28px] min-[1015px]:mt-[50px] min-[1015px]:flex min-[1015px]:w-[992px] min-[1015px]:justify-between min-[1015px]:px-0">
        {columns.map((column) => (
          <div key={column.id ?? column.title}>
            <p className="whitespace-nowrap text-[12px] leading-[14.4px] tracking-[0.96px] text-[#77787d]">{column.title}</p>
            <ul className="mt-[11px]">
              {column.links.map((link, index) => (
                <li key={`${link.label}-${index}`} className="min-h-[35px]">
                  {link.download ? (
                    <a href={link.href} download={link.download} className="wl-link block whitespace-nowrap py-[5px] text-[16px] leading-[24px] min-[1015px]:py-0 min-[1015px]:text-[18px] min-[1015px]:leading-[30px]">
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={(event) => scrollToHash(event, link.href, pathname)}
                      className="wl-link block py-[5px] text-[16px] leading-[24px] min-[1015px]:py-0 min-[1015px]:text-[18px] min-[1015px]:leading-[30px]"
                      {...(isExternal(link.href)
                        ? { target: "_blank", rel: "noopener" }
                        : { transitionTypes: [link.href.startsWith("/work/") ? "nav-forward" : "nav-fade"] })}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
