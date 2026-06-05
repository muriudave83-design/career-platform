import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Company Insights | Employers, Internships & Recruitment | JoinNexiva",

  description:
    "Learn about employers, internship programs, recruitment processes and workplace expectations across different industries.",
};

export default function CompanyInsightsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#f7fff8] to-[#e8f5e9]">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
          Company Insights
        </span>

        <h1 className="mt-6 text-5xl font-black text-gray-900">
          Company Insights
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Understand how employers recruit, what they look for in candidates
          and how to position yourself for success.
        </p>
      </section>
    </main>
  );
}