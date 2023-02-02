import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PortraitSlider = ({ heading, movieArray }) => {
  return (
    <div className='text-white'>
      <h3 className='font-bold text-[2rem]'>{heading}</h3>
      <div className='flex items-center gap-10'>
        <MdKeyboardArrowLeft className='w-[52px] h-[52px]' />
        <div className='flex gap-[3.5rem]'>
          {movieArray.map((movie) => (
            <PortraitSliderItem movie={movie} key={movie.id} />
          ))}
        </div>
        <MdKeyboardArrowRight className='w-[52px] h-[52px]' />
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
