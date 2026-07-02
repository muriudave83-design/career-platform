import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Career Resources | Internship Guides, CV Tips & Graduate Advice | JoinNexiva",

  description:
    "Explore internship guides, graduate career advice, CV writing tips, interview preparation resources and professional development content.",

  keywords: [
    "internships kenya",
    "graduate programs kenya",
    "career advice kenya",
    "cv writing kenya",
    "interview tips kenya",
  ],
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-white via-[#F7FFF8] to-[#E8F5E9]">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-center max-w-4xl mx-auto">

            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
              🚀 JoinNexiva Career Resource Hub
            </span>

            <h1 className="mt-8 text-5xl md:text-7xl font-black text-gray-900 leading-tight">
              Career Guides That Help You Get
              <span className="text-[#00C853]"> Hired Faster</span>
            </h1>

            <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Discover internship advice, CV writing strategies, interview
              preparation guides, graduate program insights and career growth
              resources designed for ambitious students and graduates across Kenya.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/listings"
                className="bg-[#EC4899] hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold transition"
              >
                Explore Internships
              </Link>

              <Link
                href="/resources/internship-guides"
                className="border border-green-200 hover:border-[#00C853] bg-white px-8 py-4 rounded-2xl font-semibold text-gray-900 transition"
              >
                Start Reading Guides
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-black text-[#00C853]">100+</div>
                <div className="text-gray-600">Planned Guides</div>
              </div>

              <div>
                <div className="text-3xl font-black text-[#00C853]">6</div>
                <div className="text-gray-600">Resource Categories</div>
              </div>

              <div>
                <div className="text-3xl font-black text-[#00C853]">Career</div>
                <div className="text-gray-600">Focused Content</div>
              </div>

              <div>
                <div className="text-3xl font-black text-[#00C853]">Kenya</div>
                <div className="text-gray-600">Focused Insights</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <Link
            href="/resources/internship-guides"
            className="block bg-white border border-green-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Internship Guides
            </h2>

            <p className="mt-4 text-gray-600">
              Learn how to secure internships, industrial attachments and
              graduate opportunities.
            </p>
          </Link>

          <Link
            href="/resources/cv-writing"
            className="block bg-white border border-green-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              CV Writing
            </h2>

            <p className="mt-4 text-gray-600">
              Professional CV templates, examples and optimization tips.
            </p>
          </Link>

          <Link
            href="/resources/interview-preparation"
            className="block bg-white border border-green-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Interview Preparation
            </h2>

            <p className="mt-4 text-gray-600">
              Prepare confidently with interview strategies and common
              questions.
            </p>
          </Link>

          <Link
            href="/resources/graduate-programs"
            className="block bg-white border border-green-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Graduate Programs
            </h2>

            <p className="mt-4 text-gray-600">
              Discover graduate trainee opportunities from leading employers.
            </p>
          </Link>

          <Link
            href="/resources/career-growth"
            className="block bg-white border border-green-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Career Growth
            </h2>

            <p className="mt-4 text-gray-600">
              Build workplace skills, personal branding and career confidence.
            </p>
          </Link>

          <Link
            href="/resources/company-insights"
            className="block bg-white border border-green-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Company Insights
            </h2>

            <p className="mt-4 text-gray-600">
              Learn about internships, recruitment processes and employer
              expectations.
            </p>
          </Link>

        </div>
      </section>
    </main>
  );
}
