import SearchResultItem from "./SearchResultItem";

const SearchResults = ({ results, media }) => {

  return (
    <div className="mx-auto flex flex-wrap mt-5 gap-5 justify-center sm:justify-start">
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