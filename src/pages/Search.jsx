import {MdOutlineSearch} from 'react-icons/md';

const Search = () => {
    return (
    <div>
        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>

        <aside id="default-sidebar" class="fixed top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-32" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-slate-900 dark:bg-slate-900 rounded-md">
                <ul class="space-y-2">
                    <li>
                        <span className="ml-5 font-bold text-lg text-gray-50">Filter by</span>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white">
                            <span className="ml-7">All</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white">
                            <span className="flex-1 ml-7 whitespace-nowrap">Movies</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white">
                            <span className="flex-1 ml-7 whitespace-nowrap">TV Shows</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white">
                            <span className="flex-1 ml-7 whitespace-nowrap">Documentaries</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg dark:text-white">
                            <span className="flex-1 ml-7 whitespace-nowrap">Specials</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

        <div className="p-5 sm:ml-80">
            <div className="p-2">
                <div className="flex items-center gap-x-6 ">
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="ml-4 flex items-center gap-x-6">
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdOutlineSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                    <input type="text" name="search" id="search" className="focus:ring-gray-400 focus:border-gray-500 block w-[690px] pl-10 sm:text-md h-10 border-black border-1 rounded-full" placeholder="Search for any movie, tv show or actor..." />
                            </div>
                                <button className="bg-blue-700 border-white border-2 hover:bg-black text-white font-bold py-2 px-5 rounded-full">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-5 sm:ml-80">
            <div class="px-10">
                <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                    <div class="flex items-center justify-center h-[340px] w-[226px] rounded bg-gray-50 dark:bg-gray-800 drop-shadow-lg">
                        <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-2xl text-dark font-semibold">Movie</div>
                    </div>
                    <div class="flex items-center justify-center h-[340px] w-[226px]  rounded bg-gray-50 dark:bg-gray-800 drop-shadow-lg">
                        <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-2xl text-dark font-semibold">Movie</div>
                    </div>
                    <div class="flex items-center justify-center h-[340px] w-[226px]  rounded bg-gray-50 dark:bg-gray-800 drop-shadow-lg">
                        <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-2xl text-dark font-semibold">Movie</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Search;