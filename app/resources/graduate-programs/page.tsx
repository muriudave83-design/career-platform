import { Metadata } from "next";
import { articles } from "@/src/lib/articles";
import ArticleCard from "@/components/resources/ArticleCard";
import CategoryHero from "@/components/resources/CategoryHero";
import FeaturedArticle from "@/components/resources/FeaturedArticle";
import ResourceStats from "@/components/resources/ResourceStats";

export const metadata: Metadata = {
  title:
    "Graduate Programs Kenya | Graduate Trainee Opportunities | JoinNexiva",
  description:
    "Explore graduate trainee programs, career opportunities and employer insights for graduates in Kenya.",
};

export default function GraduateProgramsPage() {
  const graduateArticles = articles.filter(
    (article) => article.category === "graduate-programs"
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffffff,#f7fff8,#eefcf1)]">
      <section className="max-w-7xl mx-auto px-6 py-20">

        <CategoryHero
          badge="🎓 Graduate Success Hub"
          title="Top Graduate Programs For"
          highlight="Future Leaders"
          description="Discover graduate trainee programs, leadership development opportunities and career pathways offered by leading employers."
        />

        <ResourceStats
          articleCount={graduateArticles.length}
        />

        {graduateArticles.length > 0 && (
          <FeaturedArticle
            title={graduateArticles[0].title}
            description={graduateArticles[0].description}
            href={`/resources/${graduateArticles[0].category}/${graduateArticles[0].slug}`}
          />
        )}

        <div className="mt-24">

          <div className="flex items-center justify-between mb-10">

            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Latest Guides
              </h2>

              <p className="text-gray-600 mt-2">
                Explore graduate opportunities and career resources.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-[#E8F5E9] text-[#00A63E] px-4 py-2 rounded-full font-semibold">
              {graduateArticles.length} Guide
              {graduateArticles.length !== 1 ? "s" : ""}
            </div>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {graduateArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.description}
                href={`/resources/${article.category}/${article.slug}`}
                category="Graduate Program Guide"
              />
            ))}

          </div>

        </div>

      </section>
    </main>
  );
}