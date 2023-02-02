const SearchResultItem = ({ result }) => {
  return (
    <div className="relative flex flex-col">
      <div className='absolute w-full h-full justify-center bg-[#11131b] bg-opacity-50 text-white flex flex-col items-center text-center opacity-0 hover:opacity-100'>
        <h2>{result.title}</h2>
        <h3>{result.date}</h3>
        <p>{result.rating}</p>
      </div>
      <img
        src={result.poster}
        alt={result.title}
        className='rounded-xl object-cover h-[340px] w-[225px]'
      />
    </div>
  );
};

export default SearchResultItem;
