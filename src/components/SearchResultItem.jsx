import { useNavigate } from "react-router-dom";
import noImage from '../assets/no-image.jpg';


const imagesBaseUrl = 'https://image.tmdb.org/t/p/w342';

const SearchResultItem = ({ result, media }) => {

  const navigate = useNavigate();

  const navigateToDetails = () => {

    //if person
    if (media === "person" || result.media_type === "person") {
      navigate(`/person/${result.id}`);
    } else {
      //if movie or tv
      navigate(`/details/${result.media_type ?? media}/${result.id}`);
    }
  };

  return (
    <div className="cursor-pointer relative flex flex-col" onClick={navigateToDetails}>
      <div className='absolute w-full h-full justify-center bg-[#11131b] shadow bg-opacity-80 text-white flex flex-col items-center text-center opacity-0 hover:opacity-100 rounded-xl p-2'>
        <div className="mt-auto">
          <h3 className="text-[1.25rem] font-bold">{result.title ?? result.name}</h3>
          <p>{result.release_date ?? result.first_air_date}</p>
        </div>

        {media === "person" || result.media_type === "person" ? <p className="mt-auto mb-5"></p> : (
          <p className="mt-auto mb-5">User Rating: {Math.round(result.vote_average * 10) / 10}</p>
        )}
      </div>
      <img
        src={result.poster_path ?? result.profile_path ? `${imagesBaseUrl}${result.poster_path ?? result.profile_path}` : noImage}
        alt={result.title}
        className='rounded-xl object-cover h-[272px] w-[180px] sm:h-[340px] sm:w-[225px]'
      />
    </div>
  );
};

export default SearchResultItem;
