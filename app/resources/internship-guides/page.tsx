import { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/content";
import ArticleCard from "@/components/resources/ArticleCard";
import CategoryHero from "@/components/resources/CategoryHero";
import FeaturedArticle from "@/components/resources/FeaturedArticle";
import ResourceStats from "@/components/resources/ResourceStats";

export const metadata: Metadata = {
  title:
    "Internship Guides Kenya | How To Get An Internship | JoinNexiva",
  description:
    "Learn how to secure internships, industrial attachments and graduate opportunities in Kenya.",
};

export default function InternshipGuidesPage() {
  const internshipArticles = getArticlesByCategory(
    "internship-guides"
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffffff,#f7fff8,#eefcf1)]">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <CategoryHero
          badge="🚀 Internship Success Hub"
          title="Internship Guides For"
          highlight="Ambitious Students"
          description="Learn how to secure internships, industrial attachments and graduate opportunities from Kenya's leading employers."
        />

        <ResourceStats articleCount={internshipArticles.length} />

        {internshipArticles.length > 0 && (
          <FeaturedArticle
            title={internshipArticles[0].frontmatter.title}
            description={internshipArticles[0].frontmatter.description}
            href={`/resources/${internshipArticles[0].frontmatter.category}/${internshipArticles[0].frontmatter.slug}`}
          />
        )}

        {/* ARTICLE LIBRARY */}

        <div className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Latest Guides
              </h2>

              <p className="text-gray-600 mt-2">
                Explore practical internship advice and career resources.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-[#E8F5E9] text-[#00A63E] px-4 py-2 rounded-full font-semibold">
              {internshipArticles.length} Guide
              {internshipArticles.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {internshipArticles.map((article) => (
              <ArticleCard
                key={article.frontmatter.slug}
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                href={`/resources/${article.frontmatter.category}/${article.frontmatter.slug}`}
                category="Internship Guide"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}