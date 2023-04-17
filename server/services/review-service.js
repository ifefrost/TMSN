// save a review to the database
export const saveReview = async (client, input) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('reviews');

    // check if movie or tv show already has a review
    const itemExists = await collection.findOne({[input.type + 'Id']: input.id});
    // if it does, add new review to the array
    if (itemExists) {
        if (itemExists.reviews.find(review => review.user === input.user)){
            await collection.updateOne(
                {[input.type + 'Id']: input.id},
                { $pull: { reviews: { user: input.user } } }
            );
        }
        await collection.updateOne(
            {[input.type + 'Id']: input.id},
            { $push: { 
                reviews: 
                    {
                        details:input.review,
                        user:input.user,
                        rating:input.rating 
                    } 
                }
            }
        );
    } else{
        // if it doesn't, create a new document with the review for the movie or tv show
        const newItem = await collection.insertOne({
            [input.type + 'Id']: input.id,
            reviews: [{
                details:input.review,
                user:input.user,
                rating:input.rating
            }]
        });
    }
};

// get all reviews for a movie or tv show
export const getReviews = async (client,filter) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('reviews');

    const reviews = await collection.find({[filter.type + 'Id']: filter.id}).toArray();
    return reviews
};

// get all reviews for a user
export const getUserReviews = async (client,filter) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('reviews');

    const reviews = await collection.find({'reviews.user': filter.user}).toArray();
    return reviews.map((review) => {
        return {...review, reviews: review.reviews.filter((item) => item.user === filter.user)}
      })
}