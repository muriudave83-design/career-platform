import { Metadata } from "next";
import { articles } from "@/src/lib/articles";
import ArticleCard from "@/components/resources/ArticleCard";
import CategoryHero from "@/components/resources/CategoryHero";
import FeaturedArticle from "@/components/resources/FeaturedArticle";
import ResourceStats from "@/components/resources/ResourceStats";

export const metadata: Metadata = {
  title:
    "Interview Preparation Tips Kenya | Interview Guides | JoinNexiva",
  description:
    "Prepare for internship and graduate interviews with practical interview guides, questions and strategies.",
};

export default function InterviewPreparationPage() {
  const interviewArticles = articles.filter(
    (article) => article.category === "interview-preparation"
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffffff,#f7fff8,#eefcf1)]">
      <section className="max-w-7xl mx-auto px-6 py-20">

        <CategoryHero
          badge="🎤 Interview Success Hub"
          title="Ace Every"
          highlight="Interview"
          description="Prepare confidently for internship, graduate trainee and entry-level interviews with practical strategies, common questions and expert advice."
        />

        <ResourceStats
          articleCount={interviewArticles.length}
        />

        {interviewArticles.length > 0 && (
          <FeaturedArticle
            title={interviewArticles[0].title}
            description={interviewArticles[0].description}
            href={`/resources/${interviewArticles[0].category}/${interviewArticles[0].slug}`}
          />
        )}

        <div className="mt-24">

          <div className="flex items-center justify-between mb-10">

            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Latest Guides
              </h2>

              <p className="text-gray-600 mt-2">
                Explore interview preparation resources and practical advice.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-[#E8F5E9] text-[#00A63E] px-4 py-2 rounded-full font-semibold">
              {interviewArticles.length} Guide
              {interviewArticles.length !== 1 ? "s" : ""}
            </div>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {interviewArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.description}
                href={`/resources/${article.category}/${article.slug}`}
                category="Interview Guide"
              />
            ))}

          </div>

        </div>

      </section>
    </main>
  );
}