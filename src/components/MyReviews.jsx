import React, { useState, useEffect, useCallback } from "react";
import StarRating from "./StarRating";

const UserReviews = ({ user }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [userReviews, setUserReviews] = useState([]);
  let reviewedMovies = [];
  let reviewedTv = [];
  const getUserReviews = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/reviews/${user}`);
      if (!response.ok) {
        const error = await response.json();
        console.log(error.message, "error");
        throw new Error(error.message);
      }
      const data = await response.json();
      console.log(data.data, "data");
      setUserReviews(data.data);
      console.log(userReviews);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const getReviewDetails = async () => {
    if (userReviews) {
      for (let i = 0; i < userReviews.length; i++) {
        if (userReviews[i].movieId) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${userReviews[i].movieId}?api_key=${apiKey}&language=en-US`
          );
          const json = await response.json();
          const result = {
            ourMovieDetails: userReviews[i],
            apiMovieDetails: json,
          };
          reviewedMovies.push(result);
        }
        if (userReviews[i].tvId) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${userReviews[i].tvId}?api_key=${apiKey}&language=en-US`
          );
          const json = await response.json();
          const result = {
            ourtvDetails: userReviews[i],
            apiTvDetails: json,
          };
          reviewedTv.push(result);
        }
      }
    }
  };

  useEffect(() => {
    getUserReviews();
    }, []);

  useEffect(() => {
    getReviewDetails();
  }, [getUserReviews]);

  return (
    <div className='mt-10 text-white'>
      <h3 className='font-bold sm:text-[2rem] text-[1.7rem] mb-5'>{`${user}'s Reviews`}</h3>
      {/* {userReviews.length === 0 ? (
        <p className='text-[1.2rem]'>No reviews yet</p>
      ) : (
        <div className='flex flex-col gap-5'>
          {userReviews.map((review) => {
            return (
              <div className='flex flex-col gap-2'>
                <p className='text-[1.2rem]'>{review.movieId || review.tvId}</p>
                {review.reviews &&
                  review.reviews.map((review) => {
                    return (
                      <div className='flex flex-col gap-2' key={review.id}>
                        <StarRating rate={review.rating} />
                        <p className='text-[1.2rem]'>{review.details}</p>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      )} */}
      
    </div>
  );
};

export default UserReviews;
