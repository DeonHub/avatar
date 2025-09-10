import ResultCard from "./ResultCard";

export default function ResultsList({ results }) {
  if (!results.length) {
    return <p className="p-4 text-gray-500">No results yet. Try searching!</p>;
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((place) => (
        <ResultCard key={place.place_id} place={place} />
      ))}
    </div>
  );
}
