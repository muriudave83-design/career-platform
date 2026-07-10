import { Metadata } from "next";
import { articles } from "@/lib/articles";
import ArticleCard from "@/components/resources/ArticleCard";
import CategoryHero from "@/components/resources/CategoryHero";
import FeaturedArticle from "@/components/resources/FeaturedArticle";
import ResourceStats from "@/components/resources/ResourceStats";

export const metadata: Metadata = {
  title: "CV Writing Tips Kenya | Professional CV Guides | JoinNexiva",
  description:
    "Learn how to write a professional CV that helps students and graduates secure internships and jobs.",
};

export default function CVWritingPage() {
  const cvArticles = articles.filter(
    (article) => article.category === "cv-writing"
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffffff,#f7fff8,#eefcf1)]">
      <section className="max-w-7xl mx-auto px-6 py-20">

        <CategoryHero
          badge="📄 CV Success Hub"
          title="Write A CV That"
          highlight="Gets Interviews"
          description="Learn how to create professional CVs that stand out to recruiters and increase your chances of securing internships and jobs."
        />

        <ResourceStats
          articleCount={cvArticles.length}
        />

        {cvArticles.length > 0 && (
          <FeaturedArticle
            title={cvArticles[0].title}
            description={cvArticles[0].description}
            href={`/resources/${cvArticles[0].category}/${cvArticles[0].slug}`}
          />
        )}

        <div className="mt-24">

          <div className="flex items-center justify-between mb-10">

            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Latest Guides
              </h2>

              <p className="text-gray-600 mt-2">
                Explore practical CV writing advice and career resources.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-[#E8F5E9] text-[#00A63E] px-4 py-2 rounded-full font-semibold">
              {cvArticles.length} Guide
              {cvArticles.length !== 1 ? "s" : ""}
            </div>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {cvArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.description}
                href={`/resources/${article.category}/${article.slug}`}
                category="CV Writing Guide"
              />
            ))}

          </div>

        </div>

      </section>
    </main>
  );
}
