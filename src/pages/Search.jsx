import { MdOutlineSearch } from "react-icons/md";
import poster from "../assets/poster.jpg";
import SearchResults from "../components/SearchResults";

const Search = () => {
  const movieArray = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      poster: poster,
      rating: 9.2,
      date: 1994,
      genre: "Drama",
    },
    {
      id: 2,
      title: "The Godfather",
      poster: poster,
      rating: 9.2,
      date: 1972,
      genre: "Crime, Drama",
    },
    {
      id: 3,
      title: "The Godfather: Part II",
      poster: poster,
      rating: 9.0,
      date: 1974,
      genre: "Crime, Drama",
    },
    {
      id: 4,
      title: "The Dark Knight",
      poster: poster,
      rating: 9.0,
      date: 2008,
      genre: "Action, Crime, Drama",
    },
    {
      id: 5,
      title: "The Menu",
      poster: poster,
      rating: 8.9,
      date: 2022,
      genre: "Crime, Drama, Thriller",
    },
  ];

  return (
    <div className='mx-auto 2xl:max-w-screen-xl px-8 h-screen flex mt-10'>
      <aside
        id='default-sidebar'
        className='z-40 w-64 h-fit'
        aria-label='Sidebar'
      >
        <div className='px-3 py-4 overflow-y-auto bg-slate-900 dark:bg-slate-900 rounded-md'>
          <ul className='space-y-2'>
            <li>
              <span className='ml-5 font-bold text-lg text-gray-50'>
                Filter by
              </span>
            </li>
            <li>
              <a
                href='#'
                className='flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white'
              >
                <span className='ml-7'>All</span>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white'
              >
                <span className='flex-1 ml-7 whitespace-nowrap'>Movies</span>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white'
              >
                <span className='flex-1 ml-7 whitespace-nowrap'>TV Shows</span>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white'
              >
                <span className='flex-1 ml-7 whitespace-nowrap'>
                  Documentaries
                </span>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white'
              >
                <span className='flex-1 ml-7 whitespace-nowrap'>Specials</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className='mx-auto'>
        <div className='flex items-center gap-x-6'>
          <div className='relative mt-1 rounded-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <MdOutlineSearch className='h-8 w-8 text-gray-400' />
            </div>
            <input
              type='text'
              name='search'
              id='search'
              className='focus:ring-gray-400 focus:border-gray-500 block w-[40rem] pl-14 sm:text-lg h-14 border-black border-1 rounded-full'
              placeholder='Search for any movie, tv show or actor...'
            />
          </div>
          <button className='bg-blue-700 border-white border-2 hover:bg-black text-white font-bold py-3 px-8 rounded-full'>
            Search
          </button>
        </div>

        <SearchResults results={movieArray} />
      </div>
    </div>
  );
};

export default Search;
