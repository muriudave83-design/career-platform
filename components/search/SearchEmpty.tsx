type Props = {
  query: string;
};

export default function SearchEmpty({
  query,
}: Props) {
  return (
    <div className="p-10 text-center">
      <p className="text-lg font-semibold text-gray-800">
        No results found
      </p>

      <p className="mt-2 text-gray-500">
        Nothing matched "{query}"
      </p>
    </div>
  );
}