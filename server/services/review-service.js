export const saveReview = async (client, input) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('reviews');

    const itemExists = await collection.findOne({[input.type + 'Id']: input.id});
    if (itemExists) {
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

export const getReviews = async (client,filter) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('reviews');

    const reviews = await collection.find({[filter.type + 'Id']: filter.id}).toArray();
    return reviews
};