import React, { useState, useEffect, useCallback } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import SearchResults from "../components/SearchResults";

// @todo: transfer this to an env file
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const result = searchParams.get("result");
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (result) {
      setQuery(result);
    }
  }, [result]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=${pageNum}`
      );
      const json = await response.json();
      setResults(json.results);
      setTotalPages(json.total_pages);
      setTotalResults(json.total_results);
    } catch (error) {
      console.log(error);
    }
  }, [query, pageNum]);

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [query, fetchData]);

  const searchCount = pageNum > 1 ? (pageNum - 1) * 20 + 1 : 1;

  return (
    <div className='mx-auto 2xl:max-w-screen-xl px-8 flex mt-10 mb-20'>
      <aside id='default-sidebar' className='w-64 h-fit' aria-label='Sidebar'>
        <div className='px-3 py-4 overflow-y-auto bg-[#1F2230] rounded-lg'>
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

      <div className='mx-auto ml-10'>
        <form className='flex items-center gap-x-6'>
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
          <button
            type='submit'
            className='bg-blue-700 border-white border-2 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-full hover:shadow'
          >
            Search
          </button>
        </form>
        {totalPages > 1 && (
          <Pagination {...{ results, pageNum, totalResults }} />
        )}
        ;
        <SearchResults results={results} />
        {totalPages > 1 && (
          <div className='flex items-center justify-between rounded-3xl px-4 py-3 sm:px-6 bg-[#1F2230] mt-5'>
            <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
              <Pagination
                {...{ results, pageNum, setPageNum, totalPages, totalResults }}
              />
              <div aria-label='Pagination'>
                <button
                  className='bg-blue-700 h-[46px] w-[105px] border-white border-2 hover:bg-blue-900 text-white font-bold py-1 px-4 mt-3 rounded-full hover:shadow'
                  onClick={pageNum > 1 ? () => setPageNum(pageNum - 1) : null}
                >
                  Previous
                </button>
                <button
                  className='bg-blue-700 h-[46px] w-[105px] border-white border-2 hover:bg-blue-900 text-white font-bold py-1 px-4 mt-3 rounded-full hover:shadow'
                  onClick={
                    pageNum < totalPages ? () => setPageNum(pageNum + 1) : null
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Pagination = ({ results, pageNum, totalResults }) => {
  const searchCount = pageNum > 1 ? (pageNum - 1) * 20 + 1 : 1;

  return (
    <div>
      <p className='text-lg text-white'>
        Showing <span className='font-medium'>{searchCount}</span> to{" "}
        <span className='font-medium'>{searchCount + results.length - 1}</span>{" "}
        of <span className='font-medium'>{totalResults}</span> results
      </p>
    </div>
  );
};

export default Search;
