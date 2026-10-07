import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "@/components/projects/CategoryPage";
import {
  getAllCategorySlugs,
  getCategoryProjectCards,
  getCategoryView,
} from "@/lib/sanity/data";

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/project/[category]">): Promise<Metadata> {
  const { category } = await params;
  const view = await getCategoryView(category);

  if (!view) {
    return { title: "Category not found — N4MES" };
  }

  return {
    title: `${view.title} — N4MES`,
    description: view.description,
    openGraph: {
      title: `${view.title} — N4MES`,
      description: view.description,
    },
  };
}

export default async function CategoryRoute({
  params,
}: PageProps<"/project/[category]">) {
  const { category } = await params;
  const [view, cards] = await Promise.all([
    getCategoryView(category),
    getCategoryProjectCards(category),
  ]);

  if (!view) {
    notFound();
  }

  return <CategoryPage category={view} cards={cards} />;
}
