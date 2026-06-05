import { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/src/lib/articles";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category, slug } = await params;

  const article = articles.find(
    (a) => a.category === category && a.slug === slug
  );

  if (!article) {
    return {
      title: "Article Not Found | JoinNexiva",
    };
  }

  return {
    title: `${article.title} | JoinNexiva`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;

  const article = articles.find(
    (a) => a.category === category && a.slug === slug
  );

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffffff,#f7fff8,#e8f5e9)]">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
          {category.replace(/-/g, " ")}
        </span>

        <h1 className="mt-6 text-5xl font-black text-gray-900">
          {article.title}
        </h1>

        <p className="mt-6 text-xl text-gray-600 leading-8">
          {article.description}
        </p>

        <div className="mt-10 bg-white border border-green-100 rounded-3xl p-10 shadow-sm">
          <article className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-8">
              {article.content}
            </div>
          </article>

          <div className="mt-10 p-8 rounded-3xl bg-green-50 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900">
              Find Internship Opportunities
            </h3>

            <p className="mt-3 text-gray-600">
              Browse verified internships and graduate opportunities on
              JoinNexiva.
            </p>

            <a
              href="/internships"
              className="inline-flex mt-5 bg-[#00C853] hover:bg-[#00A63E] text-white px-6 py-3 rounded-2xl font-semibold transition"
            >
              Browse Internships
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}