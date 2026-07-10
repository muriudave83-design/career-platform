import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  getArticle,
  getArticles,
} from "@/lib/content";
import ArticleCard from "@/components/resources/ArticleCard";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getArticles().map((article) => ({
    category: article.frontmatter.category,
    slug: article.frontmatter.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category, slug } = await params;

  const article = getArticle(category, slug);

  if (!article) {
    return {
      title: "Article Not Found | JoinNexiva",
    };
  }

  return {
    title: `${article.frontmatter.title} | JoinNexiva`,
    description: article.frontmatter.description,

    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      url: `https://joinnexiva.com/resources/${article.frontmatter.category}/${article.frontmatter.slug}`,
      siteName: "JoinNexiva",
    },

    twitter: {
      card: "summary_large_image",
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;

  const article = getArticle(category, slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    author: {
      "@type": "Organization",
      name: "JoinNexiva",
    },
    publisher: {
      "@type": "Organization",
      name: "JoinNexiva",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://joinnexiva.com/resources/${article.frontmatter.category}/${article.frontmatter.slug}`,
    },
  };

  const relatedArticles = getArticles()
    .filter(
      (a) =>
        a.frontmatter.category === article.frontmatter.category &&
        a.frontmatter.slug !== article.frontmatter.slug
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffffff,#f7fff8,#e8f5e9)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="max-w-4xl mx-auto px-6 py-20">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#00C853] transition">
            Home
          </Link>

          <span>/</span>

          <Link
            href="/resources"
            className="hover:text-[#00C853] transition"
          >
            Resources
          </Link>

          <span>/</span>

          <Link
            href={`/resources/${category}`}
            className="hover:text-[#00C853] transition"
          >
            {category.replace(/-/g, " ")}
          </Link>

          <span>/</span>

          <span className="text-gray-900 font-medium">
            {article.frontmatter.title}
          </span>
        </nav>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
          {category.replace(/-/g, " ")}
        </span>

        <h1 className="mt-6 text-5xl font-black text-gray-900">
          {article.frontmatter.title}
        </h1>

        <p className="mt-6 text-xl text-gray-600 leading-8">
          {article.frontmatter.description}
        </p>

        <div className="mt-10 bg-white border border-green-100 rounded-3xl p-10 shadow-sm">
          <article className="max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-black text-gray-900 mt-10 mb-6">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-8 mb-6">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-6 text-gray-700">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-2">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900">
                    {children}
                  </strong>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
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

        {relatedArticles.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black text-gray-900">
                  Related Articles
                </h2>

                <p className="text-gray-600 mt-2">
                  Continue learning with more career resources.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle.frontmatter.slug}
                  title={relatedArticle.frontmatter.title}
                  description={relatedArticle.frontmatter.description}
                  href={`/resources/${relatedArticle.frontmatter.category}/${relatedArticle.frontmatter.slug}`}
                  category={relatedArticle.frontmatter.category.replace(/-/g, " ")}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}