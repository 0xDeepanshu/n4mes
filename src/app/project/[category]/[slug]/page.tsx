import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/projects/ProjectDetailPage";
import {
  getAllNestedProjectParams,
  getCategoryView,
  getNestedProjectDetailView,
} from "@/lib/sanity/data";

/**
 * Alternate URL for the existing project detail page:
 * /project/[category]/[slug] renders the exact same detail component
 * as /projects/[slug] (which stays the canonical route).
 * Content comes from the local /public folder when one exists.
 */
export async function generateStaticParams() {
  return getAllNestedProjectParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/project/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const project = await getNestedProjectDetailView(category, slug);

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

export default async function NestedProjectRoute({
  params,
}: PageProps<"/project/[category]/[slug]">) {
  const { category, slug } = await params;
  const [categoryView, project] = await Promise.all([
    getCategoryView(category),
    getNestedProjectDetailView(category, slug),
  ]);

  if (!categoryView || !project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
