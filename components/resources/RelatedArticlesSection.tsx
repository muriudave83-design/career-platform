import ArticleCard from "@/components/resources/ArticleCard";
import { Article } from "@/types/article";

type Props = {
  articles: Article[];
};

export default function RelatedArticlesSection({
  articles,
}: Props) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">
            Related Articles
          </h2>

          <p className="mt-2 text-gray-600">
            Continue learning with more career resources.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
  );
}