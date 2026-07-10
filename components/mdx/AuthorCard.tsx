import { Author } from "@/types/author";

type Props = {
  author: Author;
};

export default function AuthorCard({
  author,
}: Props) {
  return (
    <section className="mt-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h3 className="text-2xl font-bold">
        About the Author
      </h3>

      <a
        href={`/authors/${author.slug}`}
        className="mt-6 inline-block text-xl font-semibold transition hover:text-[#00C853]"
      >
        {author.name}
      </a>

      <p className="text-[#00C853]">
        {author.role}
      </p>

      <p className="mt-4 leading-7 text-gray-600">
        {author.bio}
      </p>
    </section>
  );
}