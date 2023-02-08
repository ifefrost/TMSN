import { MdOutlineSearch, MdArrowForward } from "react-icons/md";
import poster from "../assets/poster.jpg";
import trailer from "../assets/trailer.png";
import LandscapeSlider from "../components/LandscapeSlider";
import PortraitSlider from "../components/PortraitSlider";

const Home = () => {

const movieArray = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster: poster,
    rating: 9.2,
    date: 1994,
    genre: "Drama",
    trailer: trailer,
  },
  {
    id: 2,
    title: "The Godfather",
    poster: poster,
    rating: 9.2,
    date: 1972,
    genre: "Crime, Drama",
    trailer: trailer,
  },
  {
    id: 3,
    title: "The Godfather: Part II",
    poster: poster,
    rating: 9.0,
    date: 1974,
    genre: "Crime, Drama",
    trailer: trailer,
  },
  {
    id: 4,
    title: "The Dark Knight",
    poster: poster,
    rating: 9.0,
    date: 2008,
    genre: "Action, Crime, Drama",
    trailer: trailer,
  },
  {
    id: 5,
    title: "The Menu",
    poster: poster,
    rating: 8.9,
    date: 2022,
    genre: "Crime, Drama, Thriller",
    trailer: trailer,
  },
];

  return (
    <div className='mx-auto 2xl:max-w-screen-xl px-8'>
      <div className='bg-blue-500 rounded-b-[32px] h-[32rem] flex items-center'>
        <div className='ml-24 max-w-4xl'>
          <h3 className='text-7xl font-bold text-white'>
            Come for the movies & stay for the community.
          </h3>
          <div className='mt-10 flex items-center gap-x-6'>
            <div className='relative mt-1 rounded-md'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <MdOutlineSearch className='h-8 w-8 text-gray-400' />
              </div>
              <input
                type='text'
                name='search'
                onSubmit={(e) => {
                  e.preventDefault();
                  
                }}
                id='search'
                className='focus:ring-gray-400 focus:border-gray-500 block w-[40rem] pl-14 sm:text-lg h-14 border-black border-1 rounded-full'
                placeholder='Search for any movie, tv show or actor...'
              />
            </div>
            <button className='bg-blue-700 border-white border-2 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-full hover:shadow'>
              Search
            </button>
          </div>
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

      <PortraitSlider heading={"Trending this Week"} movieArray={movieArray} styling={'mb-24'} />

      <LandscapeSlider heading={"Latest Trailers"} movieArray={movieArray} styling={'mb-24'}/>

      <PortraitSlider heading={"Free Ad Supported"} movieArray={movieArray} styling={'mb-24'}/>


      <div className='bg-blue-500 rounded-xl h-80 flex items-center mb-20'>
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
