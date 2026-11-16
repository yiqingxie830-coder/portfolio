import Link from "next/link";
import { sections, site } from "./content";

type FooterLink = { label: string; href: string };

const isExternal = (href: string) => href.startsWith("http");

export function Footer() {
  const columns: { title: string; links: FooterLink[] }[] = [
    { title: "PAGES", links: site.footerPages },
    ...sections.map((section) => ({
      title: section.title,
      links: section.projects.map((project) => ({ label: project.title, href: project.externalHref ?? `/work/${project.slug}` })),
    })),
    { title: "LET’S CONNECT", links: site.social },
  ];

  return (
    <footer className="relative pb-[40px]">
      <div className="absolute inset-y-0 left-1/2 w-[1678px] -translate-x-1/2 wl-glass rounded-[36px]" />

      <p className="relative pt-[55px] text-center text-[25px] font-medium leading-[30px] text-[#111]">{site.footerMessage}</p>

      <div className="relative mx-auto mt-[50px] flex w-[992px] justify-between">
        {columns.map((column) => (
          <div key={column.title}>
            <p className="whitespace-nowrap text-[12px] leading-[14.4px] tracking-[0.96px] text-[#77787d]">{column.title}</p>
            <ul className="mt-[11px]">
              {column.links.map((link, index) => (
                <li key={`${link.label}-${index}`} className="h-[35px]">
                  <Link
                    href={link.href}
                    className="wl-link block text-[18px] leading-[30px]"
                    {...(isExternal(link.href) ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
