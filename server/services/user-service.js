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
        password: await bcrypt.hash(input.password, 10)
    });

    const token = generateToken({
        id: result.insertedId.toString(),
        email: input.email,
    });

    return {
        token,
        user: {
            id: result.insertedId.toString(),
            email: input.email
        },
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
        user: {
            id: user._id.toString(),
            email: user.email
        },
    };
};

export const profile = async (client, value) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('users');
    const data = verifyToken(value.value);

    const user = await collection.findOne({ _id: new ObjectId(data.id) });

    if (!user) {
        throw new Error('User does not exist');
    }

    return {
        id: user._id.toString(),
        email: user.email,
        username: user.username
    };

};
