import {MdOutlineSearch} from 'react-icons/md';
import {MdArrowForward} from 'react-icons/md';
import poster from '../assets/poster.jpg';

const Home = () => {
    return (
        <div className="mx-auto 2xl:max-w-screen-2xl px-2 sm:px-6 lg:px-8">
            <div className="bg-blue-500 rounded-b-[3rem]">
                <div className="px-6 lg:px-8">
                    <div className="ml-24 max-w-4xl py-32 sm:py-48">
                        <h3 className="text-7xl font-bold text-white">Come for the movies & stay for the community.</h3>
                        <div className="mt-10 flex items-center gap-x-6">
                            <div className="relative mt-1 rounded-md">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdOutlineSearch className="h-8 w-8 text-gray-400" />
                                </div>
                                <input type="text" name="search" id="search" className="focus:ring-gray-400 focus:border-gray-500 block w-[40rem] pl-14 sm:text-lg h-14 border-black border-1 rounded-full" placeholder="Search for any movie, tv show or actor..." />
                            </div>
                            <button className="bg-blue-700 border-white border-2 hover:bg-black text-white font-bold py-3.5 px-8 rounded-full">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-16 my-20 md:pt-24 lg:flex lg:justify-between lg:pt-0">
                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        This year in review.
                    </h2>
                    <p className="mt-3 mb-8 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        The best movies and TV shows of 2022.
                    </p>
                    <button className="flex bg-blue-700 border-white border-2 hover:bg-black text-white font-bold py-2 px-8 rounded-full">Check them out <MdArrowForward className="h-6 w-6 ml-2" /> </button>
                </div>
                <div className="mt-16 h-80 lg:mt-8">
                    <img src={poster} alt="placeholder movie poster" className="rounded-xl object-cover h-[25rem] w-[34rem]"/>
                </div>
            </div>
        </div>
    )
}

export default Home;