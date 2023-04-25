import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no-image.jpg";
import "swiper/css";
import "swiper/css/navigation";

const PortraitSlider = ({ heading, resultArray, styling, media }) => {
  const portRight = `${heading.toLowerCase().replace(/\s+/g, "-")}-arrow-right`;
  const portLeft = `${heading.toLowerCase().replace(/\s+/g, "-")}-arrow-left`;
  return (
    <div className={styling}>
      <div className='text-white'>
        <h3 className='font-bold sm:text-[2rem] text-[1.7rem] mb-5'>{heading}</h3>
        <div className='flex items-center'>
          <MdKeyboardArrowLeft className={`min-w-[52px] min-h-[52px] cursor-pointer ${portLeft}`} />
          <div className='flex gap-4 overflow-hidden'>
            <Swiper
            className="w-screen p-5"
              modules={[Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                768:{
                  slidesPerView:3,
                  spaceBetween: 0,
                },
                1024:{
                  slidesPerView:4,
                  spaceBetween: 0,
                },
                1280:{
                  slidesPerView:5,
                  spaceBetween: 0,
              }}}
              navigation={{
                nextEl: `.${portRight}`,
                prevEl: `.${portLeft}`,
              }}
            >
              {resultArray.map((result) => (
                <SwiperSlide key={result.id}>
                  <PortraitSliderItem
                    result={result}
                    media={media}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <MdKeyboardArrowRight className={`min-w-[52px] min-h-[52px] cursor-pointer ${portRight}`} />
        </div>
      </div>
    </div>
  );
};

const PortraitSliderItem = ({ result, media }) => {
  const imagesBaseUrl = "https://image.tmdb.org/t/p/w185";
  const navigate = useNavigate();
  const navigateToDetails = () => {
    //if person
    if (result.credit_id) {
      navigate(`/person/${result.id}`);
    } else {
      //if movie or tv
      navigate(`/details/${result.media_type ?? media}/${result.id}`);
      
    }
  };

  return (
    <div className='cursor-pointer p-5 transform transition duration-500 hover:scale-105' onClick={navigateToDetails}>
      <img
        src={
          result.profile_path ?? result.poster_path
            ? `${imagesBaseUrl}${result.profile_path ?? result.poster_path}`
            : noImage
        }
        alt={result.name ?? result.title}
        className='m-auto rounded-xl object-cover h-[250px] w-[165px] hover:shadow'
      />
      <div className='m-auto w-[165px]'>
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
