import type { Metadata } from "next";
import { AboutPage } from "@/components/sites/portfolio/AboutPage";
import { site } from "@/components/sites/portfolio/content";

export const metadata: Metadata = {
  title: `About — ${site.title}`,
};

export default function About() {
  return <AboutPage />;
}
