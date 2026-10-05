import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/projects/ProjectDetailPage";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project not found — N4MES" };
  }
  return {
    title: `${project.title} — N4MES`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailPage project={project} />;
}
