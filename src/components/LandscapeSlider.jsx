import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LandscapeSlider = ({ heading, resultArray, styling }) => {
  return (
    <div className={styling}>
      <div className='text-white'>
        <h3 className='font-bold text-[2rem] mb-5'>{heading}</h3>
        <div className='flex items-center gap-10 bg-[#1f2230] rounded-xl justify-center py-10'>
          <MdKeyboardArrowLeft className='min-w-[52px] min-h-[52px]' />
          <div className='flex gap-[2rem] overflow-hidden w-[900px]'>
            {resultArray.map((result) => (
              <LandscapeSliderItem result={result} key={result.id} />
            ))}
          </div>
          <MdKeyboardArrowRight className='min-w-[52px] min-h-[52px]' />
        </div>
      </div>
    </div>
  );
};

const LandscapeSliderItem = ({ result }) => {
  const imagesBaseUrl = "https://image.tmdb.org/t/p/w300";
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/details/${result.media_type}/${result.id}`);
  };
  return (
    <div className='' onClick={navigateToDetails}>
      <img
        src={`${imagesBaseUrl}${result.backdrop_path}`}
        alt={result.title}
        className='rounded-xl object-cover h-[155px] w-[275px]'
      />
      <div className='w-[275px] text-center pt-2'>
        <p className='text-white font-bold text-[1.125rem]'>{result.title}</p>
      </div>
    </div>
  );
};

export default LandscapeSlider;
