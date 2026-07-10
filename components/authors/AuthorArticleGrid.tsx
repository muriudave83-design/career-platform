import ArticleCard from "@/components/resources/ArticleCard";
import { Article } from "@/types/article";

type Props = {
  articles: Article[];
};

export default function AuthorArticleGrid({
  articles,
}: Props) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-black text-gray-900">
        Articles
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.frontmatter.slug}
            title={article.frontmatter.title}
            description={
              article.frontmatter.description
            }
            category={article.frontmatter.category.replace(
              /-/g,
              " "
            )}
            href={`/resources/${article.frontmatter.category}/${article.frontmatter.slug}`}
          />
        ))}
      </div>
    </section>
  );
}