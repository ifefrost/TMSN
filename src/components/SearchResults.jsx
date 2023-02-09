import SearchResultItem from "./SearchResultItem";

const SearchResults = ({ results, media }) => {

  return (
    <div className="flex flex-wrap mt-5 gap-5 w-[760px]">
      {results.length === 0 && (
        <div>
          <h1 className="text-lg text-white">No Search Results.</h1>
        </div>
      )}
      {results.map((result) => (
        <SearchResultItem key={result.id} result={result} media={media} />
      ))}
    </div>
  );
};

export default SearchResults;