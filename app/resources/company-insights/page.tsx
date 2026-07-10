import { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/content";
import ArticleCard from "@/components/resources/ArticleCard";
import CategoryHero from "@/components/resources/CategoryHero";
import FeaturedArticle from "@/components/resources/FeaturedArticle";
import ResourceStats from "@/components/resources/ResourceStats";

export const metadata: Metadata = {
  title:
    "Company Insights | Employers, Internships & Recruitment | JoinNexiva",
  description:
    "Learn about employers, internship programs, recruitment processes and workplace expectations across different industries.",
};

export default function CompanyInsightsPage() {
  const companyArticles = getArticlesByCategory("company-insights");

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffffff,#f7fff8,#eefcf1)]">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <CategoryHero
          badge="🏢 Employer Insights Hub"
          title="Understand What"
          highlight="Employers Want"
          description="Learn how companies recruit, what hiring managers look for and how to position yourself for internship and graduate opportunities."
        />

        <ResourceStats articleCount={companyArticles.length} />

        {companyArticles.length > 0 && (
          <FeaturedArticle
            title={companyArticles[0].frontmatter.title}
            description={companyArticles[0].frontmatter.description}
            href={`/resources/${companyArticles[0].frontmatter.category}/${companyArticles[0].frontmatter.slug}`}
          />
        )}

        <div className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Latest Guides
              </h2>

              <p className="text-gray-600 mt-2">
                Explore employer insights, recruitment trends and workplace
                guidance.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-[#E8F5E9] text-[#00A63E] px-4 py-2 rounded-full font-semibold">
              {companyArticles.length} Guide
              {companyArticles.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {companyArticles.map((article) => (
              <ArticleCard
                key={article.frontmatter.slug}
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                href={`/resources/${article.frontmatter.category}/${article.frontmatter.slug}`}
                category="Company Insight"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}