import bcrypt from 'bcryptjs';
import { generateToken } from '../resolvers/token/jwt.js';

export const store = async (client, input) => {
    const db = client.db("tmsn_db");
    const collection = db.collection('users');
    const user = await collection.findOne({ email: input.email });

    if (user) {
        throw new Error('User already exist');
    }

    const result = await collection.insertOne({
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
        throw new Error('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid Credentials');
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