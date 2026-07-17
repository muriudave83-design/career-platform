import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleCard from "@/components/resources/ArticleCard";
import {
  getArticlesByCategory,
  getCategories,
} from "@/lib/content";
import { getCategoryConfig } from "@/lib/content/categories";

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

  const config = getCategoryConfig(category);

  const articles = getArticlesByCategory(category);

  const featuredArticle = config
    ? articles.find(
        (article) =>
          article.frontmatter.slug === config.featuredArticle
      )
    : null;

  if (articles.length === 0 || !config) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl">
          <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            JoinNexiva Career Hub
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-gray-900">
            {config.heroTitle}
          </h1>

          <p className="mt-6 text-xl leading-8 text-gray-600">
            {config.description}
          </p>
        </div>

        {featuredArticle && (
          <section className="mt-16">
            <div className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-10 shadow-sm">
              <span className="inline-flex rounded-full bg-[#00C853] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Start Here
              </span>

              <h2 className="mt-4 text-3xl font-black text-gray-900">
                {featuredArticle.frontmatter.title}
              </h2>

              <p className="mt-4 max-w-3xl text-lg text-gray-600">
                {featuredArticle.frontmatter.description}
              </p>

              <Link
                href={`/resources/${featuredArticle.frontmatter.category}/${featuredArticle.frontmatter.slug}`}
                className="mt-8 inline-flex rounded-xl bg-[#00C853] px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Read the Complete Guide →
              </Link>
            </div>
          </section>
        )}

        <section className="mt-20">
          <h2 className="text-3xl font-black text-gray-900">
            Your Internship Journey
          </h2>

          <p className="mt-3 max-w-3xl text-lg text-gray-600">
            Follow this roadmap from preparing for your first internship
            to turning it into a full-time career opportunity.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {config.journey.map((step, index) => (
              <div
                key={step.article}
                className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C853] font-bold text-white">
                  {index + 1}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-3xl font-black text-gray-900">
            Browse All Internship Guides
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Explore every guide in this collection, whether you're looking
            for internship opportunities, preparing your application, or
            planning your next career step.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        </section>

        <section className="mt-24 rounded-3xl bg-[#00C853] px-10 py-14 text-center text-white">
          <h2 className="text-3xl font-black">
            Ready to Start Your Internship Journey?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-green-50">
            Explore internship opportunities, graduate programmes and
            practical career resources built for Kenyan students and
            graduates.
          </p>

          <Link
            href="/jobs"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#00C853] transition hover:bg-gray-100"
          >
            Browse Opportunities
          </Link>
        </section>
      </section>
    </main>
  );
}