import SearchResultItem from "./SearchResultItem";

const SearchResults = ({ results }) => {
  return (
    <div className="flex flex-wrap mt-10 gap-5 w-[760px]">
      {results.length === 0 && (
        <div className="flex justify-content">
        <h1 className="text-lg text-white">No Results</h1>
        </div>
      )}
      {results.map((result) => (
        <SearchResultItem key={result.id} result={result} />
      ))}
    </div>
  );
};

export default SearchResults;