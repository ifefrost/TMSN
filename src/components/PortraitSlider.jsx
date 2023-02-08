import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PortraitSlider = ({ heading, resultArray, styling }) => {
  return (
    <div className={styling}>
      <div className='text-white'>
        <h3 className='font-bold text-[2rem] mb-5'>{heading}</h3>
        <div className='flex items-center gap-8'>
          <MdKeyboardArrowLeft className='min-w-[52px] min-h-[52px]' />
          <div className='flex gap-[3.5rem] overflow-hidden bg-gradient-to-r from-[#11131B] via-transparent to-[#11131B]'>
            {resultArray.map((result) => (
              <PortraitSliderItem result={result} key={result.id} />
            ))}
          </div>
          <MdKeyboardArrowRight className='min-w-[52px] min-h-[52px]' />
        </div>
      </div>
    </div>
  );
};

const PortraitSliderItem = ({ result }) => {
  const imagesBaseUrl = "https://image.tmdb.org/t/p/w185";
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/details/${result.media_type}/${result.id}`);
  };

  return (
    <div className='' onClick={navigateToDetails}>
      <img
        src={`${imagesBaseUrl}${result.profile_path ?? result.poster_path}`}
        alt={result.name ?? result.title}
        className='rounded-xl object-cover h-[250px] w-[165px]'
      />
      <div className='w-[165px]'>
        <p className='mt-3 text-white font-bold text-[1.125rem]'>
          {result.name ?? result.title}
        </p>
        <p className='text-[#AAA9A9] text-[1rem]'>
          {result.character ?? result.release_date ?? result.first_air_date}
        </p>
      </div>
    </div>
  );
};

export default PortraitSlider;
