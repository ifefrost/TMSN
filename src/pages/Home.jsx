import {MdOutlineSearch} from 'react-icons/md';

const Home = () => {
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="isolate bg-blue-500 rounded-b-[3rem]">
                <div className="relative px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl py-32 sm:py-48">
                        <div>
                            <h3 className="text-7xl font-bold text-white">Come for the movies & stay for the community.</h3>
                            <div className="mt-10 flex items-center gap-x-6">
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdOutlineSearch className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="text" name="search" id="search" className="focus:ring-gray-400 focus:border-gray-500 block w-[35rem] pl-10 sm:text-md h-10 border-black border-1 rounded-full" placeholder="Search for any movie, tv show or actor..." />
                                </div>
                                <button className="bg-blue-700 border-white border-2 hover:bg-black text-white font-bold py-2 px-5 rounded-full">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;