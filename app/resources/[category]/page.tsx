import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleCard from "@/components/resources/ArticleCard";
import {
  getArticlesByCategory,
  getCategories,
} from "@/lib/content";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  return getCategories().map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;

  return {
    title: `${category.replace(/-/g, " ")} | JoinNexiva`,
    description: `Career resources for ${category.replace(/-/g, " ")}.`,
  };
}

export default async function CategoryPage({
  params,
}: Props) {
  const { category } = await params;

  const articles = getArticlesByCategory(category);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <span className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
          Resource Category
        </span>

        <h1 className="mt-6 text-5xl font-black text-gray-900">
          {category.replace(/-/g, " ")}
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Browse every article in this category.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {articles.map((article) => (
            <ArticleCard
              key={article.frontmatter.slug}
              title={article.frontmatter.title}
              description={article.frontmatter.description}
              category={article.frontmatter.category.replace(/-/g, " ")}
              href={`/resources/${article.frontmatter.category}/${article.frontmatter.slug}`}
            />
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/resources"
            className="text-[#00C853] font-semibold hover:underline"
          >
            ← Back to Resources
          </Link>
        </div>
      </section>
    </main>
  );
}