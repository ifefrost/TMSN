import { MongoClient } from 'mongodb';

// Establish Database connection
const connection = async () => {
    const client = new MongoClient(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    return client;
}

export default connection;