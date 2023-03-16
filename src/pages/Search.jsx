import React, { useState, useEffect, useCallback } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchResults from "../components/SearchResults";

const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const result = searchParams.get("result");
  const [query, setQuery] = useState(result ||'');
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [category, setCategory] = React.useState('');

  useEffect(() => {
    console.log(result, 'result');
    if (result) {
      setQuery(result);
      fetchData(result);
    }

    return () => {
      // reset state on unmount
      setQuery('');
    };
  }, [result]);

  // listen for category and page change
  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [category, pageNum]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    navigate(`/search?result=${query}`, {
      options: {
        replace: true,
      },
    });
    fetchData(query);
  };

  const handleCategoryChange = (categoryName) => {
    setPageNum(1);
    setCategory(categoryName);
  };


  const fetchData = useCallback(async (searchQuery) => {
    try {
      const searchCategory = category || 'multi';
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${searchCategory}?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${pageNum}&include_adult=false`
      );
      const json = await response.json();
      setResults(json.results);
      setTotalPages(json.total_pages);
      setTotalResults(json.total_results);
    } catch (error) {
      console.log(error);
    }
  }, [query, pageNum, category]);

  return (
    <div className='mx-auto max-w-screen-xl px-8 flex mt-10 mb-20'>
      <aside id='default-sidebar' className='w-64 h-fit' aria-label='Sidebar'>
        <div className='px-3 py-4 overflow-y-auto bg-[#1F2230] rounded-lg'>
          <ul className='space-y-2'>
            <li>
              <span className='ml-5 font-bold text-lg text-gray-50'>
                Filter by
              </span>
            </li>
            <li className={(!category || category === 'multi') ? 'bg-gray-500 rounded-md' : ''} onClick={() => handleCategoryChange('multi')}>
              <div
                className='cursor-pointer flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white'
              >
                <span className='ml-7'>All</span>
              </div>
            </li>
            <li className={category === 'movie' ? 'bg-gray-500 rounded-md' : ''} onClick={() => handleCategoryChange('movie')}>
              <div className='cursor-pointer flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white'>
                <span className='flex-1 ml-7 whitespace-nowrap'>Movies</span>
              </div>
            </li>
            <li className={category === 'tv' ? 'bg-gray-500 rounded-md' : ''} onClick={() => handleCategoryChange('tv')}>
              <div className='cursor-pointer flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white'>
                <span className='flex-1 ml-7 whitespace-nowrap'>TV Shows</span>
              </div>
            </li>
            <li className={category === 'person' ? 'bg-gray-500 rounded-md' : ''} onClick={() => handleCategoryChange('person')}>
              <div className='cursor-pointer flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white'>
                <span className='flex-1 ml-7 whitespace-nowrap'>Actor</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className='mx-auto ml-10'>
        <form className='flex items-center gap-x-6' onSubmit={handleFormSubmit}>
          <div className='relative mt-1 rounded-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <MdOutlineSearch className='h-8 w-8 text-gray-400' />
            </div>
            <input
              type='text'
              name='result'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id='search'
              className='focus:ring-gray-400 focus:border-gray-500 block w-[40rem] pl-14 sm:text-lg h-14 border-black border-1 rounded-full'
              placeholder='Search for any movie, tv show or actor...'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-700 border-white border-2 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-full hover:shadow'
          >
            Search
          </button>
        </form>
        {totalPages > 0 && (
          <TotalResults {...{ results, pageNum, totalResults }} styling={'mt-10'} />
        )}
        ;
        <SearchResults results={results} media={category} />
        {totalPages > 1 && (
          <div className='flex items-center justify-between rounded-3xl p-6 sm:px-6 bg-[#1F2230] mt-10'>

            <TotalResults
              {...{ results, pageNum, setPageNum, totalPages, totalResults }}
            />
            <div aria-label='TotalResults' className="flex gap-5">
              <button
                className='bg-blue-700 h-[46px] w-[105px] border-white border-2 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded-full hover:shadow'
                onClick={pageNum > 1 ? () => setPageNum(pageNum - 1) : null}
              >
                Previous
              </button>
              <button
                className='bg-blue-700 h-[46px] w-[105px] border-white border-2 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded-full hover:shadow'
                onClick={
                  pageNum < totalPages ? () => setPageNum(pageNum + 1) : null
                }
              >
                Next
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

const TotalResults = ({ results, pageNum, totalResults, styling }) => {
  const searchCount = pageNum > 1 ? (pageNum - 1) * 20 + 1 : 1;

  return (
    <div className={styling}>
      <p className='text-lg text-white'>
        Showing <span className='font-medium'>{searchCount}</span> to{" "}
        <span className='font-medium'>{searchCount + results.length - 1}</span>{" "}
        of <span className='font-medium'>{totalResults}</span> results
      </p>
    </div>
  );
};

export default Search;
