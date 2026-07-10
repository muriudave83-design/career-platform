import Link from "next/link";

type ArticleBreadcrumbsProps = {
  category: string;
  title: string;
};

export default function ArticleBreadcrumbs({
  category,
  title,
}: ArticleBreadcrumbsProps) {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
      <Link href="/" className="transition hover:text-[#00C853]">
        Home
      </Link>

      <span>/</span>

      <Link
        href="/resources"
        className="transition hover:text-[#00C853]"
      >
        Resources
      </Link>

      <span>/</span>

      <Link
        href={`/resources/${category}`}
        className="transition hover:text-[#00C853]"
      >
        {category.replace(/-/g, " ")}
      </Link>

      <span>/</span>

      <span className="font-medium text-gray-900">
        {title}
      </span>
    </nav>
  );
}