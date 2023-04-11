import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, Link } from "react-router-dom";
import noImage from "../assets/no-image.jpg";
import "swiper/css";
import "swiper/css/navigation";

const LandscapeSlider = ({ heading, resultArray, styling, media }) => {
  const landRight = `${heading.toLowerCase().replace(/\s+/g, "-")}-arrow-right`;
  const landLeft = `${heading.toLowerCase().replace(/\s+/g, "-")}-arrow-left`;
  return (
    <div className={styling}>
      <div className='text-white'>
        <h3 className='font-bold sm:text-[2rem] text-[1.7rem] mb-5'>{heading}</h3>
        <div className='flex items-center gap-10 bg-[#1f2230] rounded-xl justify-center py-10'>
          <MdKeyboardArrowLeft className={`min-w-[52px] min-h-[52px] cursor-pointer ${landLeft}`} />
          <div className='flex gap-[2rem] overflow-hidden w-[900px]'>
            <Swiper
              className="w-screen p-5"
              modules={[Navigation]}
              spaceBetween={50}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768:{
                  slidesPerView:2,
                },
                1024:{
                  slidesPerView:3,
              }}}
              navigation={{
                nextEl: `.${landRight}`,
                prevEl: `.${landLeft}`,
              }}
            >
              {resultArray.map((result) => (
                <SwiperSlide key={result.id}>
                  <LandscapeSliderItem
                    result={result}
                    media={media}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <MdKeyboardArrowRight className={`min-w-[52px] min-h-[52px] cursor-pointer ${landRight}`} />
        </div>
      </div>
    </div>
  );
};

const LandscapeSliderItem = ({ result, media }) => {
  const imagesBaseUrl = "https://image.tmdb.org/t/p/w300";
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/details/${result.media_type ?? media}/${result.id}`);
    window.location.reload();
  };
  return (
    <div className='cursor-pointer transform transition duration-500 hover:scale-105' onClick={navigateToDetails}>
      <img
        src={
          result.backdrop_path
            ? `${imagesBaseUrl}${result.backdrop_path}`
            : noImage
        }
        alt={result.title ?? result.name}
        className='m-auto rounded-xl object-cover h-[155px] w-[275px] border-2 border-[#ffffff]'
      />
      <div className='m-auto w-[275px] text-center pt-2'>
        <p className='text-white font-bold text-[1.125rem]'>
          {result.title ?? result.name}
        </p>
      </div>
    </div>
  );
};

export default LandscapeSlider;
