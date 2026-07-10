type ArticleHeaderProps = {
  category: string;
  title: string;
  description: string;
  published: string;
  readingTime: string;
};

export default function ArticleHeader({
  category,
  title,
  description,
  published,
  readingTime,
}: ArticleHeaderProps) {
  return (
    <>
      <span className="rounded-full bg-green-100 px-4 py-2 font-medium text-green-700">
        {category.replace(/-/g, " ")}
      </span>

      <h1 className="mt-6 text-5xl font-black text-gray-900">
        {title}
      </h1>

      <p className="mt-6 text-xl leading-8 text-gray-600">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <time dateTime={published}>
          {new Date(published).toLocaleDateString("en-KE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <span>&bull;</span>

        <span>{readingTime}</span>
      </div>
    </>
  );
}