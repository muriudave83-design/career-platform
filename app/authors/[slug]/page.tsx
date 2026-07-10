import { notFound } from "next/navigation";
import { Metadata } from "next";

import {
  getAuthor,
  getAuthors,
  getArticlesByAuthor,
} from "@/lib/content";

import {
  buildAuthorJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/content/seo";

import AuthorHero from "@/components/authors/AuthorHero";
import AuthorStats from "@/components/authors/AuthorStats";
import AuthorArticleGrid from "@/components/authors/AuthorArticleGrid";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return getAuthors().map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const author = getAuthor(params.slug);

  if (!author) {
    return {};
  }

  return {
    title: `${author.name} | JoinNexiva`,
    description: author.bio,
    alternates: {
      canonical: `https://joinnexiva.com/authors/${author.slug}`,
    },
    openGraph: {
      title: author.name,
      description: author.bio,
      type: "profile",
    },
  };
}

export default async function AuthorPage({
  params,
}: Props) {
  const author = getAuthor(params.slug);

  if (!author) {
    notFound();
  }

  const articles = getArticlesByAuthor(author.slug);

  const authorJsonLd =
    buildAuthorJsonLd(author);

  const organizationJsonLd =
    buildOrganizationJsonLd();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              authorJsonLd
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

      <AuthorHero author={author} />

      <AuthorStats
        articleCount={articles.length}
      />

      <AuthorArticleGrid
        articles={articles}
      />
    </main>
  );
}