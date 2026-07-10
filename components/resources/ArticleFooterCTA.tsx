import Link from "next/link";

export default function ArticleFooterCTA() {
  return (
    <section className="mt-10 rounded-3xl border border-green-200 bg-green-50 p-8">
      <h3 className="text-2xl font-bold text-gray-900">
        Find Internship Opportunities
      </h3>

      <p className="mt-3 text-gray-600">
        Browse verified internships and graduate opportunities on
        JoinNexiva.
      </p>

      <Link
        href="/listings"
        className="mt-5 inline-flex rounded-2xl bg-[#00C853] px-6 py-3 font-semibold text-white transition hover:bg-[#00A63E]"
      >
        Browse Opportunities
      </Link>
    </section>
  );
}