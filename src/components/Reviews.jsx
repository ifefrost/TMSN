import React, { useState, useEffect, useCallback } from "react";
import { MdRateReview } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "./StarRating";

const Reviews = ({token}) => {
  const [addReview, setAddReview] = useState(false);
  const [rating, setRating] = useState(0);
  const params = useParams();
  const { media_type, id } = params;
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
    console.log(body, "saved review");
    try {
      const response = await fetch(`http://localhost:8000/review`, {
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
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/reviews/${media_type}/${id}`
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error.message, "error");
        throw new Error(error.message);
      }
      const data = await response.json();
      console.log(data.data.reviews, "data");
      setReviews(data.data.reviews);
    } catch (error) {
      console.log(error);
    }
  }, [media_type, id]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);


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
        <form className='flex flex-col gap-5' onSubmit={saveReview} method="post">
          <div className='flex flex-col gap-2'>
            <textarea
              className='bg-[#1F2230] max-w-[750px] min-h-[150px] h-40 p-3 rounded-md'
              placeholder='Write your review here...'
              value={reviewDetails}
              name='review'
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
          <button className='bg-[#303446] max-w-[200px] text-white px-3 py-3 hover:bg-gray-200 hover:text-black rounded-md text-md font-medium'>
            Submit
          </button>
        </form>
      )}
      {reviews && reviews.length > 0 ? (
        <div className='flex flex-col gap-5 my-10'>
          {reviews.map((review) => (
            <div className='flex flex-col gap-2'>
              <div className="flex gap-5 items-center text-sm italic">
                <div className='w-8 h-8 rounded-full overflow-hidden border-2 dark:border-white border-gray-900 cursor-pointer' onClick={()=>navigate(`/${review.user}`)}>
                  <img
                    src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${review.user}`}
                    alt='avatar'
                    className='w-full h-full object-cover'
                  />
                </div>
                <p>{review.user}</p>
                <StarRating rate={review.rating} />
                {/* add reviews to the 5 stars */}



              </div>
              <p className="italic text-xl">{review.details}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-[1.25rem] my-5'>
          No reviews. Be the first to review this {media_type}.
        </p>
      )}
    </div>
  );
};

export default Reviews;
