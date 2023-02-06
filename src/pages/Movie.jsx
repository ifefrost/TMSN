import {MdPlayCircleOutline} from 'react-icons/md';
import poster from "../assets/poster.jpg";
import trailer from "../assets/trailer.png";
import LandscapeSlider from '../components/LandscapeSlider';
import PortraitSlider from '../components/PortraitSlider';

const Movie = () => {


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
        <div className="mx-auto 2xl:max-w-screen-xl px-8">

                <div className='relative w-full'>
                    <img src="https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg" alt="movie poster" className="rounded-b-xl brightness-[0.2] object-cover h-[515px] w-full"/>
                </div>

                <div className="-translate-y-64 flex items-center lg:mt-8 lg:mb-20 mx-10">
                    <div className='min-w-[300px] rounded-xl shadow'>
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
                        <div className="flex items-center gap-10 mt-8">
                            <div className='flex items-center gap-2'>
                                <div className='w-[55px] h-[55px] rounded-full border-white border-4 p-2 pt-3'>
                                    <h4 className='font-bold'>75%</h4>
                                </div>
                                <div>
                                    <p>User</p>
                                    <p>Score</p>
                                </div>
                                
                            </div>
                            <div className='flex items-center gap-2'>
                                <MdPlayCircleOutline className="h-10 w-10" />
                                <p>Play Trailer</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h2 className='text-[2.625rem] mb-4 font-bold'>Synopsis</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                                Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sedrisus.
                                Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div>
                    </div>
                </div>

            <PortraitSlider heading={"Cast & Crew"} movieArray={movieArray} styling={'-mt-52 mb-24'} />

            <LandscapeSlider heading={"Similar Movies"} movieArray={movieArray} styling={'mb-24'} />

        </div>
    );
}

export default Movie