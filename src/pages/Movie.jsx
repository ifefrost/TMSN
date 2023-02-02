import {MdPlayCircleOutline} from 'react-icons/md';

const Movie = () => {
    return (
        <div className="mx-auto 2xl:max-w-screen-2xl px-2 sm:px-6 lg:px-8">
            <div className="flex lg:mt-8 lg:mb-8">
                <div>
                    <img src="https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg" alt="movie poster" className="rounded-xl object-cover h-[450px] w-[300px]"/>
                </div>
                <div className="w-[800px] mx-8 text-white">
                    <div>
                        <h1 className="text-[3.25rem] font-bold">Title of the Movie</h1>
                    </div>
                    <div className="flex gap-10">
                        <p>length</p>
                        <p>genre</p>
                        <p>release date</p>
                    </div>
                    <div className="flex gap-10 mt-8">
                        <p>User Score</p>
                        <div className='flex items-center gap-2'>
                            <MdPlayCircleOutline className="h-10 w-10" />
                            <p>Play Trailer</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className='text-[2.625rem] font-bold'>Synopsis</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sedrisus.
                            Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie