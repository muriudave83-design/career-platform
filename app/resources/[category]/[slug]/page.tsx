import { Metadata } from "next";
import { notFound } from "next/navigation";
import MDXRenderer from "@/lib/content/renderer";
import TableOfContents from "@/components/mdx/TableOfContents";

import {
  getArticle,
  getArticles,
  getAuthor,
  getRelatedArticles,
} from "@/lib/content";

import {
  buildArticleMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/content/seo";

import ArticleBreadcrumbs from "@/components/resources/ArticleBreadcrumbs";
import ArticleHeader from "@/components/resources/ArticleHeader";
import ArticleFooterCTA from "@/components/resources/ArticleFooterCTA";
import RelatedArticlesSection from "@/components/resources/RelatedArticlesSection";
import AuthorCard from "@/components/mdx/AuthorCard";

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

  return buildArticleMetadata(article);
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;

  const article = getArticle(category, slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd =
    buildArticleJsonLd(article);

  const breadcrumbJsonLd =
    buildBreadcrumbJsonLd([
      {
        name: "Home",
        url: "https://joinnexiva.com",
      },
      {
        name: "Resources",
        url: "https://joinnexiva.com/resources",
      },
      {
        name: category.replace(/-/g, " "),
        url: `https://joinnexiva.com/resources/${category}`,
      },
      {
        name: article.frontmatter.title,
        url: `https://joinnexiva.com/resources/${category}/${article.frontmatter.slug}`,
      },
    ]);

  const organizationJsonLd =
    buildOrganizationJsonLd();

  const author = getAuthor(article.frontmatter.author);
  const relatedArticles = getRelatedArticles(article);

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffffff,#f7fff8,#e8f5e9)]">
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              articleJsonLd
            ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbJsonLd
            ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationJsonLd
            ),
          }}
        />
      </>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <ArticleBreadcrumbs
          category={category}
          title={article.frontmatter.title}
        />

        <ArticleHeader
          category={category}
          title={article.frontmatter.title}
          description={article.frontmatter.description}
          published={article.frontmatter.published}
          readingTime={article.readingTime}
        />

        <div className="mt-10 bg-white border border-green-100 rounded-3xl p-10 shadow-sm">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <TableOfContents headings={article.headings} />
            </aside>

            <MDXRenderer source={article.content} />
          </div>

          {author && (
            <AuthorCard author={author} />
          )}

          <ArticleFooterCTA />
        </div>

        <RelatedArticlesSection
          articles={relatedArticles}
        />
      </section>
    </main>
  );
}