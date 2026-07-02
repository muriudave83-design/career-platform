type CategoryHeroProps = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
};

export default function CategoryHero({
  badge,
  title,
  highlight,
  description,
}: CategoryHeroProps) {
  return (
    <div className="text-center max-w-5xl mx-auto">

      <div className="inline-flex items-center gap-2 bg-[#E8F5E9] border border-[#C8E6C9] text-[#00A63E] px-5 py-2 rounded-full text-sm font-semibold mb-8">
        {badge}
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8">
        {title}
        <span className="text-[#00C853]"> {highlight}</span>
      </h1>

      <p className="text-xl text-gray-600 leading-9 max-w-3xl mx-auto">
        {description}
      </p>

    </div>
  );
}
