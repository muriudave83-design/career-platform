import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Career Growth Resources | Professional Development | JoinNexiva",

  description:
    "Build workplace skills, personal branding, leadership abilities and career confidence with JoinNexiva.",
};

export default function CareerGrowthPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#f7fff8] to-[#e8f5e9]">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
          Career Growth
        </span>

        <h1 className="mt-6 text-5xl font-black text-gray-900">
          Career Growth
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Learn how to develop workplace skills, build your professional brand
          and accelerate your long-term career success.
        </p>
      </section>
    </main>
  );
}