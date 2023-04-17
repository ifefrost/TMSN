import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { API_HOST } from "../util/api";
import StarRating from "./StarRating";

const UserReviews = ({ user }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [userReviews, setUserReviews] = useState([]);
  const [reviewedMovies, setReviewedMovies] = useState([]);
  const [reviewedTv, setReviewedTv] = useState([]);

  // get all reviews for the user
  const getUserReviews = useCallback(async () => {
    try {
      const response = await fetch(`${API_HOST}/reviews/${user}`);
      if (!response.ok) {
        const error = await response.json();
        console.log(error.message, "error");
        throw new Error(error.message);
      }
      const data = await response.json();
      setUserReviews(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  // get the movie/tv title for each review
  const getReviewDetails = async () => {
    setReviewedMovies([]);
    setReviewedTv([]);
    if (userReviews.length > 0) {
      userReviews.forEach(async (review) => {
        if (review.movieId) {
          await fetch(
            `https://api.themoviedb.org/3/movie/${review.movieId}?api_key=${apiKey}&language=en-US`
          )
            .then((response) => response.json())
            .then((json) => {
              setReviewedMovies((prev) => [
                ...prev,
                { ...review, title: json.title },
              ]);
            });
        }
        if (review.tvId) {
          await fetch(
            `https://api.themoviedb.org/3/tv/${review.tvId}?api_key=${apiKey}&language=en-US`
          )
            .then((response) => response.json())
            .then((json) => {
              setReviewedTv((prev) => [
                ...prev,
                { ...review, title: json.name },
              ]);
            });
        }
      });
    }
  };
  useEffect(() => {
    getUserReviews();
  }, [user]);

  useEffect(() => {
    getReviewDetails();
  }, [userReviews]);

  return (
    <div className='mt-10 text-white'>
      {reviewedMovies.length === 0 ? (
        <p className='text-[1.2rem] italic pb-10'>No movie reviews</p>
      ) : (
        <div className='flex flex-col gap-5'>
          <h3 className='font-bold text-[2rem]'>{`${user}'s Movie reviews`}</h3>
          {reviewedMovies.map((review) => {
            return (
              <div className='flex flex-col gap-2' key={review._id}>
                <Link to={`/details/movie/${review.movieId}`} className='text-[1.2rem] hover:underline'>{review.title}</Link>
                <div className='flex flex-col gap-2'>
                  <StarRating rate={review.reviews[0].rating} />
                  <p className='text-[1.2rem]'>{review.reviews[0].details}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {reviewedTv.length === 0 ? (
        <p className='text-[1.2rem]'>No TV reviews</p>
      ) : (
        <div className='flex flex-col gap-5 mt-10'>
          <h3 className='font-bold text-[2rem]'>{`${user}'s TV show reviews`}</h3>
          {reviewedTv.map((review) => {
            return (
              <div className='flex flex-col gap-2' key={review._id}>
                <Link to={`/details/movie/${review.tvId}`} className='text-[1.2rem] hover:underline'>{review.title}</Link>
                <div className='flex flex-col gap-2'>
                  <StarRating rate={review.reviews[0].rating} />
                  <p className='text-[1.2rem]'>{review.reviews[0].details}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
