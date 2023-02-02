import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const LandscapeSlider = ({ heading, movieArray }) => {
  return (
    <div className='text-white'>
      <h3 className='font-bold text-[2rem]'>{heading}</h3>
      <div className='flex items-center gap-10 bg-[#1f2230] rounded-xl justify-center py-10'>
        <MdKeyboardArrowLeft className='w-[52px] h-[52px]' />
        <div className='flex gap-[2rem] overflow-hidden w-[900px]'>
          {movieArray.map((movie) => (
            <LandscapeSliderItem movie={movie} key={movie.id} />
          ))}
        </div>
        <MdKeyboardArrowRight className='w-[52px] h-[52px]' />
      </div>
    </div>
  );
};

const LandscapeSliderItem = ({ movie }) => {
  return (
    <div className=''>
      <img
        src={movie.trailer}
        alt={movie.title}
        className='rounded-xl object-cover h-[155px] w-[275px]'
      />
      <div className='w-[275px] text-center pt-2'>
        <p className='text-white font-bold text-[1.125rem]'>{movie.title}</p>
      </div>
    </div>
  );
};

export default LandscapeSlider;
