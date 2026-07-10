import { Author } from "@/types/author";

type Props = {
  author: Author;
};

export default function AuthorHero({
  author,
}: Props) {
  return (
    <section className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-10">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#00C853]">
          Author
        </p>

        <h1 className="mt-3 text-5xl font-black text-gray-900">
          {author.name}
        </h1>

        <p className="mt-3 text-xl text-green-700">
          {author.role}
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          {author.bio}
        </p>
      </div>
    </section>
  );
}