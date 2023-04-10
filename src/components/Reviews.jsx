import { useState } from 'react';
import { MdRateReview, MdStarRate } from 'react-icons/md';
import StarRating from './StarRating';

const Reviews = () => {
    const [addReview, setAddReview] = useState(false);
    const [rating, setRating] = useState(0);
    return (
        <div className="text-white flex flex-col">
            <div className='flex gap-10'>
                <h3 className='font-bold text-[2rem] mb-5'>Reviews</h3>
                <button
                className='flex h-[50px] bg-[#303446] text-white focus:outline-none hover:bg-gray-300 hover:text-black px-3 py-2 rounded-md text-sm font-medium'
                aria-expanded='false'
                aria-haspopup='false'
                onClick={()=>setAddReview(!addReview)}
                >
                    <div className='flex items-center'>
                        <span className='mr-3'>
                            <div className='flex items-center'>
                                <span className='px-3 py-2 rounded-md text-sm font-medium'>
                                    {addReview ? ("Cancel review") : ("Add review")}
                                </span>
                                <MdRateReview className='h-8 w-8' />
                            </div>
                        </span>
                    </div>        
                </button>
            </div>

            {addReview && (
                <form className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <textarea className='bg-[#1F2230] w-full h-40 p-3 rounded-md' placeholder='Write your review here...'></textarea>
                        <div className='flex gap-5'>
                            <div className='flex gap-3 items-center'>
                                <label className='font-bold'>Rating:</label>
                                <StarRating rate={rating} setRating={rate => setRating(rate)} />
                            </div>
                        </div>
                    </div>
                    <button className='bg-[#303446] text-white px-3 py-2 rounded-md text-sm font-medium'>Submit</button>
                </form>
            )}
        </div>
    );
};

export default Reviews;
    