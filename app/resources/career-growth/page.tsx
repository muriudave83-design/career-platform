import { Metadata } from "next";
import { articles } from "@/src/lib/articles";
import ArticleCard from "@/components/resources/ArticleCard";
import CategoryHero from "@/components/resources/CategoryHero";
import FeaturedArticle from "@/components/resources/FeaturedArticle";
import ResourceStats from "@/components/resources/ResourceStats";

export const metadata: Metadata = {
  title:
    "Career Growth Resources | Professional Development | JoinNexiva",
  description:
    "Build workplace skills, personal branding, leadership abilities and career confidence with JoinNexiva.",
};

export default function CareerGrowthPage() {
  const careerArticles = articles.filter(
    (article) => article.category === "career-growth"
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffffff,#f7fff8,#eefcf1)]">
      <section className="max-w-7xl mx-auto px-6 py-20">

        <CategoryHero
          badge="🚀 Career Growth Hub"
          title="Accelerate Your"
          highlight="Career Growth"
          description="Build workplace skills, strengthen your professional brand, develop leadership abilities and create long-term career success."
        />

        <ResourceStats
          articleCount={careerArticles.length}
        />

        {careerArticles.length > 0 && (
          <FeaturedArticle
            title={careerArticles[0].title}
            description={careerArticles[0].description}
            href={`/resources/${careerArticles[0].category}/${careerArticles[0].slug}`}
          />
        )}

        <div className="mt-24">

          <div className="flex items-center justify-between mb-10">

            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Latest Guides
              </h2>

              <p className="text-gray-600 mt-2">
                Explore professional development and career growth resources.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-[#E8F5E9] text-[#00A63E] px-4 py-2 rounded-full font-semibold">
              {careerArticles.length} Guide
              {careerArticles.length !== 1 ? "s" : ""}
            </div>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {careerArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.description}
                href={`/resources/${article.category}/${article.slug}`}
                category="Career Growth Guide"
              />
            ))}

          </div>

        </div>

      </section>
    </main>
  );
}