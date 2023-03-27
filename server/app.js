import * as dotenv from "dotenv";
dotenv.config()

import cors from "cors";
import express from "express";

// Database connection
import connection from "./resolvers/database/connection.js";

// Service layer - this is where we process/handle the http request
import { login, store, profile, favourites, getUsers, followUser } from "./services/user-service.js";
import { verifyToken } from "./resolvers/token/jwt.js";

const app = express();
const port = 8000;

// Allow request from the front end app (CORS - Cross Origin Resource Sharing)
app.use(
    cors({
        origin: '*'
    })
);

app.use(express.json())

// Health Check endpoint (optional)
app.get("/", (req, res) => {
    res.send({
        message: "OK",
        details: "API is up",
        statusCode: 200
    })
})

// Register Route
app.post("/register", async (req, res) => {
    try {
        const client = await connection();
        const user = await store(client, req.body);
        
        res.send({
            message: "OK",
            data: user,
        });
        client.close();
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
    
})

// Login Route
app.post("/login", async (req, res) => {
    try {
        const client = await connection();
        const user = await login(client, req.body);

        res.send({
            message: "OK",
            data: user,
        });
        client.close();
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

//get user favourites
app.post("/check-fav", async (req, res) => {
    try {
        const client = await connection();
        const data = await profile(client, req.body, req.body);
        if (!data.likedMovie){
            data.likedMovie = [];
        }
        if (!data.likedTV){
            data.likedTV = [];
        }
        res.send({movie:data.likedMovie, tv: data.likedTV});
        client.close();
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

// Add or remove favourites Route
app.post("/favourites", async (req, res) => {
    try {
        const client = await connection();
        const data = await favourites(client, req.body);
        client.close();
        return res.send(data);
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

// User Profile Route
app.post("/profile/:username", async (req, res) => {
    try {
        const client = await connection();
        const user = await profile(client, req.body, req.params);
        client.close();
        return res.send({
            message: "OK",
            data: user,
        });
        
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

// Search Users
app.get('/users', async (req, res) => {
    const client = await connection();
    try {
        const token = req.headers.authorization
        verifyToken(token); //token must be present in the request header
        const username = req.query.username;
        const user = await getUsers(client, username);
        client.close();
        return res.send({
            message: "OK",
            data: user
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

app.post('/follow', async (req, res) => {
    const client = await connection();
    try {
        const user = await followUser(client, req.body);
        client.close();
        return res.send({
            message: "OK",
            data: user
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

app.post('/check-following', async (req, res) => {
    const client = await connection();
    try {
        const data = await profile(client, req.body, req.body);
        if (!data.followers){
            data.followers = [];
        }
        client.close();
        return res.send(data.followers);
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})



// Start the server
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})