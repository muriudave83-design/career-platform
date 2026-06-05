import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Graduate Programs Kenya | Graduate Trainee Opportunities | JoinNexiva",

  description:
    "Explore graduate trainee programs, career opportunities and employer insights for graduates in Kenya.",
};

export default function GraduateProgramsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#f7fff8] to-[#e8f5e9]">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
          Graduate Programs
        </span>

        <h1 className="mt-6 text-5xl font-black text-gray-900">
          Graduate Programs
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Discover graduate trainee opportunities, development programs and
          career pathways offered by leading employers.
        </p>
      </section>
    </main>
  );
}