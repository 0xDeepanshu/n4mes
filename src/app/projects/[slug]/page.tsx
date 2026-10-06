import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/projects/ProjectDetailPage";
import { getAllProjectSlugs, getProjectDetailView } from "@/lib/sanity/data";

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectDetailView(slug);

  if (!project) {
    return { title: "Project not found — N4MES" };
  }

  const title = project.seoTitle ?? `${project.title} — N4MES`;
  const description = project.seoDescription ?? project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: project.seoOgImage ? [{ url: project.seoOgImage }] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProjectDetailView(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
