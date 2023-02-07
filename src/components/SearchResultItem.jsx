const imagesBaseUrl = 'https://image.tmdb.org/t/p/original';

const SearchResultItem = ({ result }) => {

  
  return (
    <div className="relative flex flex-col">
      <div className='absolute w-full h-full justify-center bg-[#11131b] bg-opacity-50 text-white flex flex-col items-center text-center opacity-0 hover:opacity-100'>
        <h2>{result.title ?? result.name}</h2>
        <h3>{result.release_date ?? result.first_air_date}</h3>
        <p>{result.vote_average}</p>
      </div>
      <img
        src={result.poster_path ?? result.profile_path ? `${imagesBaseUrl}${result.poster_path ?? result.profile_path}` : 'https://via.placeholder.com/150?text=No+Image+Available'}
        alt={result.title}
        className='rounded-xl object-cover h-[340px] w-[225px]'
      />
    </div>
  );
};

export default SearchResultItem;
