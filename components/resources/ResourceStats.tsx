type ResourceStatsProps = {
  articleCount: number;
};

export default function ResourceStats({
  articleCount,
}: ResourceStatsProps) {
  const items = [
    {
      icon: "📘",
      title: `${articleCount} Guide${articleCount !== 1 ? "s" : ""}`,
      description: "Practical internship resources",
    },
    {
      icon: "🎯",
      title: "Career Focused",
      description: "Actionable advice that gets results",
    },
    {
      icon: "🇰🇪",
      title: "Kenya Specific",
      description: "Built for local employers and graduates",
    },
    {
      icon: "✅",
      title: "Free Access",
      description: "No paywalls. Learn and grow.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">
      {items.map((item) => (
        <div
          key={item.title}
          className="
            group
            bg-white
            rounded-[32px]
            p-8
            border
            border-green-100
            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
            transition-all
            duration-300
            hover:-translate-y-2
            hover:border-[#00C853]
            hover:shadow-[0_20px_60px_rgba(0,200,83,0.10)]
          "
        >
          <div className="text-4xl mb-5">
            {item.icon}
          </div>

          <h3 className="text-xl font-black text-gray-900 mb-3">
            {item.title}
          </h3>

          <p className="text-gray-600 leading-7">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
