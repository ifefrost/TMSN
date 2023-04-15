import { MdOutlineSearch, MdArrowForward } from "react-icons/md";
import LandscapeSlider from "../components/LandscapeSlider";
import PortraitSlider from "../components/PortraitSlider";
import { useState, useEffect, useCallback } from "react";
import noImage from "../assets/no-image.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [poster, setPoster] = useState([]);
  //const [latestTrailers, setLatestTrailers] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const navigate = useNavigate();

  const fetchTrending = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
      );
      const json = await response.json();
      setTrending(json.results);
      //console.log(json);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      );
      const json = await response.json();
      setNowPlaying(json.results);
      // console.log(json);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchPoster = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&with_genres=28&sort_by=popularity.desc&page=1`
      );
      const json = await response.json();
      setPoster(
        json.results[Math.floor(Math.random() * json.results.length)]
          .backdrop_path
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchTrendingTV = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`
      );
      const json = await response.json();
      setTrendingTV(json.results);
      //console.log(json);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchTrending();
    fetchNowPlaying();
    fetchPoster();
    fetchTrendingTV();
  }, [fetchTrending, fetchTrendingTV, fetchNowPlaying]);

  return (
    <div className='mx-auto px-2 md:px-8 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:max-w-screen-xs max-w-sm'>
      {poster ? <div>
        <div className='bg-blue-500 rounded-b-[32px] h-[32rem] flex items-center bg-hero-image bg-cover'>
          <div className='xl:ml-48 xl:mr-48 lg:ml-24 lg:mr-24 md:ml-8 md:mr-8 ml-5 mr-5'>
            <h3 className='lg:text-[4rem] md:text-[3rem] text-[2.5rem] leading-none font-bold text-white'>
              Come for the movies & stay for the community.
            </h3>
            <form action='search'>
              <div className='mt-10 flex flex-col sm:flex-row items-center gap-6'>
                <div className='relative mt-1 rounded-md w-full'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <MdOutlineSearch className='h-8 w-8 text-gray-400' />
                  </div>
                  <input
                    type='text'
                    name='result'
                    id='search'
                    className='focus:ring-gray-400 focus:border-gray-500 block w-full pl-14 lg:text-lg h-14 border-black border-1 rounded-full'
                    placeholder='Search for any movie, tv show or actor...'
                  />
                </div>
                <button
                  type='submit'
                  className='bg-blue-700 border-white border-2 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-full hover:shadow'
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='my-20 flex flex-col lg:flex-row content-start lg:justify-between'>
          <div className='flex flex-col max-w-md lg:mx-0 lg:flex-auto lg:py-32 lg:text-left'>
            <h2 className='font-bold text-white md:text-5xl sm:text-[2.5rem] text-[2rem]'>
              This year in review.
            </h2>
            <p className='mb-8 text-gray-300 mt-5 sm:text-xl text=[1.25]'>
              Check back at the end of the year to see the best movies and TV shows of 2023.
            </p>
            {/* <button className='flex w-[200px] bg-blue-700 border-white border-2 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full hover:shadow'>
              Check them out <MdArrowForward className='h-6 w-6 ml-2' />{" "}
            </button> */}
          </div>
          <div className='mt-8'>
            <img
              src={
                poster.length ? `https://image.tmdb.org/t/p/original/${poster}` : noImage
              }
              alt='placeholder movie poster'
              className='rounded-xl object-cover h-[25rem] w-[34rem] lg:mx-0'
            />
          </div>
        </div>

        <PortraitSlider
          heading={"Trending Movies this Week"}
          resultArray={trending}
          styling={"mb-20"}
        />

        <LandscapeSlider
          heading={"Now Playing in Theaters"}
          resultArray={nowPlaying}
          media={"movie"}
          styling={"mb-24"}
        />

        <PortraitSlider
          heading={"Trending TV Shows this Week"}
          resultArray={trendingTV}
          styling={"mb-24"}
        />

        <div className='rounded-xl h-80 flex items-center mb-20 bg-footer-image bg-cover'>
          <div className='xs:ml-16 mx-5'>
            <h3 className='md:text-5xl text-[2rem] font-bold text-white'>Join TMSN today.</h3>
            <p className='my-6 text-white sm:w-96 xs:w-72  sm:text-xl text-[1rem]'>
              Connect with a growing community with a love for movies and tv.
            </p>
            <button className='flex bg-blue-700 border-white border-2 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full hover:shadow' onClick={() => navigate('/register')}>
              Sign Up <MdArrowForward className='h-6 w-6 ml-2' />{" "}
            </button>
          </div>
        </div>
      </div> : <h1 className='text-[2rem] font-bold text-white'>Loading TSMN...{window.location.reload()}</h1>}
    </div>
  );
};

export default Home;
