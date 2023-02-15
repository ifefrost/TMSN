import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no-image.jpg";
import "swiper/css";
import "swiper/css/navigation";

const PortraitSlider = ({ heading, resultArray, styling, media }) => {
  return (
    <div className={styling}>
      <div className='text-white'>
        <h3 className='font-bold text-[2rem] mb-5'>{heading}</h3>
        <div className='flex items-center'>
          <MdKeyboardArrowLeft className='min-w-[52px] min-h-[52px] port-arrow-left' />
          <div className='flex gap-4 overflow-hidden bg-gradient-to-r from-[#11131B] via-transparent to-[#11131B]'>
            <Swiper
              modules={[Navigation]}
              spaceBetween={5}
              slidesPerView={5}
              navigation={{
                nextEl: ".port-arrow-right",
                prevEl: ".port-arrow-left",
              }}
            >
              {resultArray.map((result) => (
                <SwiperSlide>
                  <PortraitSliderItem
                    result={result}
                    key={result.id}
                    media={media}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <MdKeyboardArrowRight className='min-w-[52px] min-h-[52px] port-arrow-right' />
        </div>
      </div>
    </div>
  );
};

const PortraitSliderItem = ({ result, media }) => {
  const imagesBaseUrl = "https://image.tmdb.org/t/p/w185";
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/details/${result.media_type ?? media}/${result.id}`);
  };

  return (
    <div className='cursor-pointer p-5' onClick={navigateToDetails}>
      <img
        src={
          result.profile_path ?? result.poster_path
            ? `${imagesBaseUrl}${result.profile_path ?? result.poster_path}`
            : noImage
        }
        alt={result.name ?? result.title}
        className='rounded-xl object-cover h-[250px] w-[165px] hover:shadow'
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
