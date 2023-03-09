import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no-image.jpg";
import { MdArrowBack } from "react-icons/md";

const Person = () => {

    const apiKey = import.meta.env.VITE_API_KEY;
    const { id } = useParams();
    const imagesBaseUrl = "https://image.tmdb.org/t/p/original";
    const [details, setDetails] = useState({});
    const navigate = useNavigate();

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
        <div className='mx-auto max-w-screen-xl px-8 text-white mb-20'>
            {/* back button using useNavigate */}
            <button className='flex items-center bg-blue-700 h-[46px] border-white border-2 hover:bg-blue-900 text-white font-bold py-1 pr-5 pl-4 mt-3 mt-10 rounded-full hover:shadow' onClick={() => navigate(-1)}>
                <MdArrowBack className='h-5 w-5 mr-2'/>Back
            </button>
            
            {/* actor image and details */}
            <div className='flex flex-col md:flex-row mt-10'>
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