import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import noImage from "../assets/no-image.jpg";

const Person = () => {

    const apiKey = import.meta.env.VITE_API_KEY;
    const { id } = useParams();
    const imagesBaseUrl = "https://image.tmdb.org/t/p/original";
    const [details, setDetails] = useState({});

    const fetchDetails = useCallback(async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`
          );
          const json = await response.json();
          setDetails(json);
          console.log(json);
        } catch (error) {
          console.log(error);
        }
      }, []);

      useEffect(() => {
        fetchDetails();
      }, [fetchDetails]);


    return (
        <div className='mx-auto max-w-screen-xl px-8 text-white my-20'>
            {/* actor image */}
            <div className='flex flex-col md:flex-row'>
                <div className='min-w-[300px] rounded-xl'>
                    <img
                        // if no profile image is available show a placeholder image
                        src={details.profile_path ? `${imagesBaseUrl}${details.profile_path}` : noImage}
                        alt={details.name}
                        className='rounded-xl object-cover h-[450px] w-[300px]'
                    />
                </div>
                {/* actor details */}
                <div className='w-full md:w-2/3 md:pl-8'>
                    <h1 className='text-[3.25rem] leading-none font-bold mb-2'>{details.name}</h1>
                    {/* date of birth */}
                    <div className='text-lg'>
                        {/* <p>
                            {`Born on ${new Date (details.birthday).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })} in ${details.place_of_birth}`}
                        </p> */}
                        {/* if the actor has a birthday show birthday or if they have a place of birth show the birth place */}
                        {details.birthday ? (
                            <p>
                                {`Born on ${new Date (details.birthday).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })} in ${details.place_of_birth}`}
                            </p>
                        ) : (
                            <p className='text-[1rem]'>Date of birth not available</p>
                        )}
                        {details.biography ? (
                            <h2 className='text-[2rem] mb-5 mt-8 font-bold'>Biography</h2>
                        ) : (
                            <h2 className='text-[1rem] mb-5 mt-8'>Biography not available</h2>
                        )}
                        <p className='text-[1rem]'>{details.biography}</p>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Person;