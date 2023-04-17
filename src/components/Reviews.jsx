import React, { useState, useEffect, useCallback } from "react";
import { MdRateReview } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { API_HOST } from "../util/api";
import StarRating from "./StarRating";

const Reviews = ({token, id, media_type}) => {
  const [addReview, setAddReview] = useState(false);
  const [rating, setRating] = useState(0);
  const user = sessionStorage.getItem("user");
  const [reviewDetails, setReviewDetails] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const saveReview = async () => {

    const body = {
      type: media_type,
      id: id,
      review: reviewDetails,
      rating: rating,
      user: user,
    };
    //console.log(body, "saved review");
    try {
      const response = await fetch(`${API_HOST}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error.message, "error");
        throw new Error(error.message);
      }

      //navigate(`/details/${media_type}/${id}`);

    } catch (error) {
      console.log(error);
    }

  };

  const getReviews = async () => {
    setReviews([]);
    try {
      const response = await fetch(
        `${API_HOST}/reviews/${media_type}/${id}`
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error.message, "error");
        throw new Error(error.message);
      }
      const data = await response.json();
      //console.log(data.data.reviews, "data");
      setReviews(data.data.reviews);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReviews();
  }, [media_type, id]);


  return (
    <div className='text-white flex flex-col'>
      <div className='flex gap-10'>
        <h3 className='font-bold text-[2rem] mb-5'>Reviews</h3>
        {token && (<button
          className='flex h-[50px] bg-[#303446] text-white focus:outline-none hover:bg-gray-300 hover:text-black px-3 py-2 rounded-md text-sm font-medium'
          aria-expanded='false'
          aria-haspopup='false'
          onClick={() => setAddReview(!addReview)}
        >
          <div className='flex items-center'>
            <span className='mr-3'>
              <div className='flex items-center'>
                <span className='px-3 py-2 rounded-md text-sm font-medium'>
                  {addReview ? "Cancel review" : "Add review"}
                </span>
                <MdRateReview className='h-8 w-8' />
              </div>
            </span>
          </div>
        </button>)}
      </div>

      {addReview && (
        <form className='flex flex-col gap-5' onSubmit={saveReview}>
          <div className='flex flex-col gap-2'>
            <textarea
              className='bg-[#1F2230] max-w-[750px] min-h-[150px] h-40 p-3 rounded-md'
              placeholder='Write your review here...'
              value={reviewDetails}
              onChange={(event) => setReviewDetails(event.target.value)}
            />
            <div className='flex gap-5'>
              <div className='flex gap-3 items-center'>
                <label className='font-bold'>Rating:</label>
                <StarRating
                  rate={rating}
                  setRating={(rate) => setRating(rate)}
                />
              </div>
            </div>
          </div>
          <button type="buton" className='bg-[#303446] max-w-[200px] text-white px-3 py-3 hover:bg-gray-200 hover:text-black rounded-md text-md font-medium'>
            Submit
          </button>
        </form>
      )}
      {reviews && reviews.length > 0 ? (
        <div className='flex flex-col gap-5 my-10'>
          {reviews.map((review, index) => (
            <div className='flex flex-col gap-4 bg-[#1F2230] p-5 rounded-xl max-w-[800px]' key={index}>
              <div className="flex gap-5 items-center text-sm">
                <div className="flex items-center gap-4 cursor-pointer hover:bg-[#34394d] p-3 rounded-lg" onClick={()=>navigate(`/${review.user}`)}>
                  <div className='w-8 h-8 rounded-full overflow-hidden border-2 dark:border-white border-gray-900'>
                    <img
                      src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${review.user}`}
                      alt='avatar'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className="text-[1.4rem] font-[600]">{review.user}</p>
                </div>
                <StarRating rate={review.rating} />
                {/* add reviews to the 5 stars */}

              </div>
              <p className="italic text-xl">{review.details}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-[1rem] my-5'>
          No reviews. Be the first to review this {media_type}.
        </p>
      )}
    </div>
  );
};

export default Reviews;
