import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Writing Tips Kenya | Professional CV Guides | JoinNexiva",
  description:
    "Learn how to write a professional CV that helps students and graduates secure internships and jobs.",
};

export default function CVWritingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#f7fff8] to-[#e8f5e9]">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
          CV Writing
        </span>

        <h1 className="mt-6 text-5xl font-black text-gray-900">
          CV Writing Guides
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Learn how to build a professional CV that stands out to recruiters.
        </p>
      </section>
    </main>
  );
}