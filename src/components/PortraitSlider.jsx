import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PortraitSlider = ({ heading, movieArray, styling }) => {
  return (
    <div className={styling}>
      <div className='text-white'>
        <h3 className='font-bold text-[2rem] mb-5'>{heading}</h3>
        <div className='flex items-center gap-10'>
          <MdKeyboardArrowLeft className='min-w-[52px] min-h-[52px]' />
          <div className='flex gap-[3.5rem] overflow-hidden bg-gradient-to-r from-[#11131B] via-transparent to-[#11131B]'>
            {movieArray.map((movie) => (
              <PortraitSliderItem movie={movie} key={movie.id} />
            ))}
          </div>
          <MdKeyboardArrowRight className='min-w-[52px] min-h-[52px]' />
        </div>
      </div>
    </div>
  );
};


const PortraitSliderItem = ({ movie }) => {
  return (
    <div className="">
      <img
          src={movie.poster}
          alt={movie.title}
          className="rounded-xl object-cover h-[250px] w-[165px]"
      />
      <div className="w-[165px]">
          <p className="text-white font-bold text-[1.125rem]">{movie.title}</p>
          <p className="text-white text-[1rem]">{movie.date}</p>
      </div>
    </div>
  );
}

export default PortraitSlider;
