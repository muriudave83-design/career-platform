import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Interview Preparation Tips Kenya | Interview Guides | JoinNexiva",

  description:
    "Prepare for internship and graduate interviews with practical interview guides, questions and strategies.",
};

export default function InterviewPreparationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#f7fff8] to-[#e8f5e9]">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
          Interview Preparation
        </span>

        <h1 className="mt-6 text-5xl font-black text-gray-900">
          Interview Preparation Guides
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Prepare confidently for internship, graduate trainee and entry-level
          interviews with practical strategies and expert advice.
        </p>
      </section>
    </main>
  );
}