import Link from "next/link";

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
  category?: string;
};

export default function ArticleCard({
  title,
  description,
  href,
  category = "Career Guide",
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        block
        overflow-hidden
        bg-white
        rounded-[36px]
        p-8
        border
        border-green-100
        shadow-[0_15px_50px_rgba(0,0,0,0.06)]
        transition-all
        duration-500
        ease-out
        hover:scale-[1.02]
        hover:-translate-y-3
        hover:border-[#00C853]
        hover:shadow-2xl
        hover:shadow-green-200/60
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          bg-[radial-gradient(circle_at_top_right,rgba(0,200,83,0.12),transparent_60%)]
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Top Bar */}
      <div className="relative flex items-center justify-between mb-8">
        <span className="bg-[#E8F5E9] text-[#00A63E] px-4 py-2 rounded-full text-sm font-bold">
          {category}
        </span>

        <div
          className="
            flex
            items-center
            justify-center
            w-12
            h-12
            rounded-2xl
            bg-gray-50
            text-gray-400
            text-2xl
            transition-all
            duration-300
            group-hover:bg-[#00C853]
            group-hover:text-white
            group-hover:rotate-45
          "
        >
          →
        </div>
      </div>

      {/* Headline */}
      <h2
        className="
          relative
          text-3xl
          font-black
          text-[#111827]
          leading-tight
          mb-5
          transition-all
          duration-300
          group-hover:text-[#00A63E]
        "
      >
        {title}
      </h2>

      {/* Description */}
      <p className="relative text-gray-600 leading-8 text-lg mb-10">
        {description}
      </p>

      {/* Bottom Section */}
      <div className="relative flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">
            JoinNexiva Resource
          </div>

          <div className="text-sm text-gray-500 mt-1">
            Career Growth Content
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
            font-bold
            text-[#00A63E]
            text-lg
            transition-all
            duration-300
            group-hover:gap-5
          "
        >
          <span>Read Guide</span>

          <span
            className="
              transition-all
              duration-300
              group-hover:translate-x-2
            "
          >
            →
          </span>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-0
          bg-[#00C853]
          transition-all
          duration-500
          group-hover:w-full
        "
      />
    </Link>
  );
}
