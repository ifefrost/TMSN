import { useNavigate } from "react-router-dom";


const imagesBaseUrl = 'https://image.tmdb.org/t/p/w342';

const SearchResultItem = ({ result, category }) => {

  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/details/${category}/${result.id}`);
  };

  return (
    <div className="relative flex flex-col"
      onClick={navigateToDetails}
    >
      <div className='absolute w-full h-full justify-center bg-[#11131b] shadow bg-opacity-75 text-white flex flex-col items-center text-center opacity-0 hover:opacity-100 rounded-xl p-2'>
        <div className="mt-auto">
          <h3 className="text-[1.25rem] font-bold">{result.title ?? result.name}</h3>
          <p>{result.release_date ?? result.first_air_date}</p>
        </div>
        <p className="mt-auto mb-5">User Score: {result.vote_average}</p>
      </div>
      <img
        src={result.poster_path ?? result.profile_path ? `${imagesBaseUrl}${result.poster_path ?? result.profile_path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
        alt={result.title}
        className='rounded-xl object-cover h-[340px] w-[225px]'
      />
    </div>
  );
};

export default SearchResultItem;
