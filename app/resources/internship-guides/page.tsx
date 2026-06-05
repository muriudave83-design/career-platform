import Link from "next/link";
import { Metadata } from "next";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title:
    "Internship Guides Kenya | How To Get An Internship | JoinNexiva",
  description:
    "Learn how to secure internships, industrial attachments and graduate opportunities in Kenya.",
};

export default function InternshipGuidesPage() {
  const internshipArticles = articles.filter(
    (article) => article.category === "internship-guides"
  );

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black text-gray-900 mb-6">
          Internship Guides
        </h1>

        <p className="text-lg text-gray-600 leading-8 mb-12">
          Explore internship application strategies, industrial attachment
          guidance and practical advice for students and graduates.
        </p>

        <div className="grid gap-6">
          {internshipArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.category}/${article.slug}`}
              className="block border border-green-100 rounded-3xl p-8 hover:border-green-300 hover:shadow-xl transition-all"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {article.title}
              </h2>

              <p className="text-gray-600">
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}