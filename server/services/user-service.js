import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { generateToken, verifyToken } from '../resolvers/token/jwt.js';

export const store = async (client, input) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('users');
    const emailValid = await collection.findOne({ email: input.email });
    const username = await collection.findOne({ username: input.username });

    if (emailValid) {
        throw new Error('Account with this email already exists');
    }

    if (username) {
        throw new Error('Username already exists');
    }

    const result = await collection.insertOne({
        username: input.username,
        email: input.email,
        password: await bcrypt.hash(input.password, 10),
        likedMovie:[],
        likedTV:[],
        following:[],
        followers:[]
    });

    const token = generateToken({
        id: result.insertedId.toString(),
        email: input.email,
    });

    return {
        token,
        user: input.username
    };
};

export const login = async (client, input) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('users');
    const user = await collection.findOne({ email: input.email });

    if (!user) {
        throw new Error('Email does not exist');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid Password');
    }

    const token = generateToken({
        id: user._id.toString(),
        email: user.email
    });

    return {
        token,
        user: user.username
    };
};

export const profile = async (client, input, username) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('users');
    const data = verifyToken(input.token);

    const currentUser = await collection.findOne({ _id: new ObjectId(data.id) });

    const user =  await collection.findOne({ username: username.username });

    if (currentUser.username === user.username) {
        return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            likedMovie: user.likedMovie,
            likedTV: user.likedTV,
            following: user.following,
            followers: user.followers,
            currentUser: true
        };
    }

    if (!user) {
        throw new Error('User does not exist');
    }

    return {
        id: user._id.toString(),
        username: user.username,
        likedMovie: user.likedMovie,
        likedTV: user.likedTV,
        following: user.following,
        followers: user.followers,
        currentUser: false
    };

};

export const favourites = async (client, input) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('users');
    const data = verifyToken(input.token);

    // find the logged in user
    const user = await collection.findOne({ _id: new ObjectId(data.id) });

    // if user doesnt exist
    if (!user) {
        throw new Error('User does not exist');
    }

    // if user exists and media type is movie and media id is in the likedMovie array then remove it
    if (input.media_type === 'movie') {
        if (user.likedMovie.includes(input.media_id)) {
            await collection.updateOne(
                { _id: new ObjectId(data.id) },
                { $pull: { likedMovie: input.media_id } }
            );
        } else {
            // if user exists and media type is movie and media id is not in the likedMovie array then add it
            await collection.updateOne(
                { _id: new ObjectId(data.id) },
                { $push: { likedMovie: input.media_id } }
            );
        }
    }

    // if user exists and media type is tv and media id is in the likedTV array then remove it
    if (input.media_type === 'tv') {
        if (user.likedTV.includes(input.media_id)) {
            await collection.updateOne(
                { _id: new ObjectId(data.id) },
                { $pull: { likedTV: input.media_id } }
            );
        } else {
            // if user exists and media type is tv and media id is not in the likedTV array then add it
            await collection.updateOne(
                { _id: new ObjectId(data.id) },
                { $push: { likedTV: input.media_id } }
            );
        }
    }

    return {
        id: user._id.toString(),
        likedMovie: user.likedMovie,
        likedTV: user.likedTV
    };
}

//Get Users
export const getUsers = async (client, filter, limit = 10) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('users');

    const user = await collection
      .find({ username: new RegExp(".*" + filter + ".*") }) // similar to % like in SQL
      .project({ password: 0, email: 0 }) // remove attribute from the query result
      .limit(limit) //limited to 10
      .toArray();

    return user
}

//Follow User
export const followUser = async (client, input) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('users');

    const data = verifyToken(input.token);

    // find the logged in user
    const user = await collection.findOne({ _id: new ObjectId(data.id) });
    // find user to follow
    const userToFollow = await collection.findOne({ username: input.username });

    // if users do not exist
    if (!user || !userToFollow) {
        throw new Error('User does not exist');
    }

    // if user is already following then unfollow
    if (user.following.includes(input.username)) {
        await collection.updateOne(
            { _id: new ObjectId(user._id) },
            { $pull: { following: input.username } }
        );

        await collection.updateOne(
            { _id: new ObjectId(userToFollow._id) },
            { $pull: { followers: user.username } }
        );
    // if user is not following then follow
    } else {
        await collection.updateOne(
            { _id: new ObjectId(user._id) },
            { $push: { following: input.username } }
        );

        await collection.updateOne(
            { _id: new ObjectId(userToFollow._id) },
            { $push: { followers: user.username } }
        );
    }

    return {
        id: user._id.toString(),
        following: user.following,
        followers: user.followers
    };

}

