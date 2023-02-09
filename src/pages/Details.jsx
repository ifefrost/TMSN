import { MdPlayCircleOutline } from "react-icons/md";
import noImage from "../assets/no-image.jpg";
import LandscapeSlider from "../components/LandscapeSlider";
import PortraitSlider from "../components/PortraitSlider";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Details = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { id, media_type } = useParams();
  const media = media_type;
  const imagesBaseUrl = "https://image.tmdb.org/t/p/original";
  const [details, setDetails] = useState({});
  const [trailer, setTrailer] = useState([]);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);

  const fetchDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US`
      );
      const json = await response.json();
      setDetails(json);
      //console.log(json);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchTrailer = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      const json = await response.json();
      setTrailer(json.results[0]);
      //console.log(json);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchCast = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${apiKey}&language=en-US`
      );
      const json = await response.json();
      setCast(json.cast);
      //console.log(json);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchSimilar = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
      );
      const json = await response.json();
      setSimilar(json.results);
      //console.log(json);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
    fetchCast();
    fetchSimilar();
    fetchTrailer();
  }, [fetchDetails]);

  return (
    <div className='mx-auto max-w-screen-xl px-8'>
      <div className='relative w-full'>
        <img
          src={ details.backdrop_path ? `${imagesBaseUrl}${details.backdrop_path}` : noImage}
          alt='movie poster'
          className='rounded-b-xl brightness-[0.2] object-cover h-[515px] w-full'
        />
      </div>

      <div className='-translate-y-64 flex items-center lg:mt-8 lg:mb-20 mx-10'>
        <div className='min-w-[300px] rounded-xl shadow'>
          <img
            src={ details.poster_path ? `${imagesBaseUrl}${details.poster_path}` : noImage}
            alt='movie poster'
            className='rounded-xl object-cover h-[450px] w-[300px]'
          />
        </div>

        <div className='w-[800px] h-[450px] mx-8 text-white flex flex-col justify-start pt-3'>
          <div className="">
            <div>
              <h1 className='text-[3.25rem] font-bold'>{details.title ?? details.name}</h1>
            </div>
            <div className='flex gap-10'>
              <p>{details.runtime ? (details.runtime / 60).toFixed(0) + 'h ' + (details.runtime % 60) + 'm' : (details.number_of_seasons + ' Seasons')}</p>
              <p>{details.genres?.map((genre) => genre.name).join(", ")}</p>
              <p>{new Date(details.release_date ?? details.first_air_date).toDateString()}</p>
            </div>
            <div className='flex items-center gap-10 mt-8'>
              <div className='flex items-center gap-2'>
                <div className='w-[55px] h-[55px] rounded-full border-white border-4 p-2 pt-3'>
                  <h4 className='font-bold'>{(details.vote_average * 10).toFixed(0)}%</h4>
                </div>
                <div>
                  <p>User</p>
                  <p>Score</p>
                </div>
              </div>
              <div className='cursor-pointer flex items-center gap-2' onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`)}>
                <MdPlayCircleOutline className='h-10 w-10' />
                <p>Play Trailer</p>
              </div>
            </div>
          </div>

          <div className='mt-10'>
            <h2 className='text-[2.625rem] mb-4 font-bold'>Synopsis</h2>
            <p>{details.overview}</p>
          </div>

        </div>
      </div>

      <PortraitSlider
        heading={"Cast & Crew"}
        resultArray={cast}
        media={media}
        styling={"-mt-52 mb-24"}
      />

      <LandscapeSlider
        heading={`Similar ${media_type === "movie" ? "Movies" : "TV Shows"}`}
        resultArray={similar}
        media={media}
        styling={"mb-24"}
      />
    </div>
  );
};

export default Details;
