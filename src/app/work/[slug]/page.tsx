import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects, site } from "@/components/sites/portfolio/content";
import { PageTransition } from "@/components/sites/portfolio/PageTransition";
import { WorkDetail } from "@/components/sites/portfolio/WorkDetail";

type WorkPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((item) => item.slug === slug);
  return { title: project ? `${project.title} — ${site.title}` : site.title };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = allProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <PageTransition key={slug}>
      <WorkDetail project={project} />
    </PageTransition>
  );
}
