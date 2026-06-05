import Link from "next/link";

type FeaturedArticleProps = {
  title: string;
  description: string;
  href: string;
};

export default function FeaturedArticle({
  title,
  description,
  href,
}: FeaturedArticleProps) {
  return (
    <section className="mt-20">
      <div
        className="
          relative
          overflow-hidden
          bg-white
          border
          border-green-100
          rounded-[40px]
          shadow-[0_25px_80px_rgba(0,0,0,0.06)]
        "
      >
        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}

          <div className="p-10 md:p-14">

            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-5 py-2 rounded-full text-sm font-bold mb-8">
              ⭐ Featured Guide
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              {title}
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-9 mb-10">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">

              <span className="bg-[#E8F5E9] text-[#00A63E] px-4 py-2 rounded-full font-semibold text-sm">
                Internship Guide
              </span>

              <span className="text-gray-500 font-medium">
                ⏱ 5 min read
              </span>

              <span className="text-gray-500 font-medium">
                🎯 Career Growth
              </span>

            </div>

            <Link
              href={href}
              className="
                inline-flex
                items-center
                gap-3
                bg-[#00C853]
                hover:bg-[#00A63E]
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition-all
                duration-300
                hover:gap-5
                hover:shadow-2xl
              "
            >
              Read Featured Guide
              <span>→</span>
            </Link>

          </div>

          {/* RIGHT SIDE */}

          <div
            className="
              relative
              hidden
              lg:flex
              items-center
              justify-center
              min-h-[420px]
              bg-gradient-to-br
              from-[#E8F5E9]
              via-white
              to-[#C8E6C9]
            "
          >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,83,0.12),transparent_65%)]" />

            <div className="relative text-center">

              <div className="text-8xl mb-6">
                🎓
              </div>

              <div className="text-2xl font-black text-gray-900">
                Launch Your Career
              </div>

              <p className="mt-4 text-gray-600 max-w-xs mx-auto leading-8">
                Discover proven internship strategies, graduate opportunities
                and practical career advice.
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}