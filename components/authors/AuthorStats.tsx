type Props = {
  articleCount: number;
};

export default function AuthorStats({
  articleCount,
}: Props) {
  return (
    <section className="mt-8 grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-3xl font-black text-[#00C853]">
          {articleCount}
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Published Articles
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-3xl font-black text-[#00C853]">
          Career
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Content Specialist
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-3xl font-black text-[#00C853]">
          JoinNexiva
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Editorial Team
        </p>
      </div>
    </section>
  );
}