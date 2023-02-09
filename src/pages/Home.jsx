import { MdOutlineSearch, MdArrowForward } from "react-icons/md";
import poster from "../assets/poster.jpg";
import LandscapeSlider from "../components/LandscapeSlider";
import PortraitSlider from "../components/PortraitSlider";
import { useState, useEffect, useCallback } from "react";

const Home = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  //const [latestTrailers, setLatestTrailers] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);

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
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }, []);


// const fetchLatestTrailers = async () => {
//   for (let i = 0; i < nowPlaying.length; i++) {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${nowPlaying[i].id}/videos?api_key=${apiKey}&language=en-US`
//     );
//     const json = await response.json();
    
//     setLatestTrailers(latestTrailers => [...latestTrailers, json.results[0]]);
//   }

// };

// console.log(latestTrailers);

// // map latest trailers to now playing movies
// const latestTrailersMapped = nowPlaying.map((movie, index) => {
//   return {
//     ...movie,
//     trailer: latestTrailers[index],
//   };
// });

// console.log(latestTrailersMapped);


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
    // fetchLatestTrailers();
    fetchTrendingTV();
  }, [fetchTrending, fetchTrendingTV, fetchNowPlaying]);

  return (
    <div className='mx-auto 2xl:max-w-screen-xl px-8'>
      <div className='bg-blue-500 rounded-b-[32px] h-[32rem] flex items-center bg-hero-image bg-cover'>
        <div className='ml-24 max-w-4xl'>
          <h3 className='text-[4rem] leading-none font-bold text-white'>
            Come for the movies & stay for the community.
          </h3>
          <form action="search">
            <div className='mt-10 flex items-center gap-x-6'>
              <div className='relative mt-1 rounded-md'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <MdOutlineSearch className='h-8 w-8 text-gray-400' />
                </div>
                <input
                  type='text'
                  name='result'
                  id='search'
                  className='focus:ring-gray-400 focus:border-gray-500 block w-[40rem] pl-14 sm:text-lg h-14 border-black border-1 rounded-full'
                  placeholder='Search for any movie, tv show or actor...'
                />
              </div>
              <button type="submit" className='bg-blue-700 border-white border-2 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-full hover:shadow'>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='my-20 lg:flex lg:justify-between'>
        <div className='mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left'>
          <h2 className='font-bold text-white text-5xl'>
            This year in review.
          </h2>
          <p className='mb-8 text-gray-300 mt-5 text-xl'>
            The best movies and TV shows of 2022.
          </p>
          <button className='flex bg-blue-700 border-white border-2 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full hover:shadow'>
            Check them out <MdArrowForward className='h-6 w-6 ml-2' />{" "}
          </button>
        </div>
        <div className='h-80 mt-8'>
          <img
            src={poster}
            alt='placeholder movie poster'
            className='rounded-xl object-cover h-[25rem] w-[34rem]'
          />
        </div>
      </div>

      <PortraitSlider
        heading={"Trending Movies this Week"}
        resultArray={trending}
        styling={"mb-24"}
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
        <div className='ml-16'>
          <h3 className='text-5xl font-bold text-white'>Join TMSN today.</h3>
          <p className='my-6 text-white w-96 text-xl'>
            Connect with a growing community with a love for movies and tv.
          </p>
          <button className='flex bg-blue-700 border-white border-2 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full hover:shadow'>
            Sign Up <MdArrowForward className='h-6 w-6 ml-2' />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
