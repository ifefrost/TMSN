import SearchResultItem from "./SearchResultItem";

const SearchResults = ({ results }) => {
  return (
    <div className="flex flex-wrap mt-10 gap-5 w-[760px]">
      {results.map((result) => (
        <SearchResultItem key={result.id} result={result} />
      ))}
    </div>
  );
};

export default SearchResults;