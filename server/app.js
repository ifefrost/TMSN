import * as dotenv from "dotenv";
dotenv.config()

import cors from "cors";
import express from "express";

// Database connection
import connection from "./resolvers/database/connection.js";

// Service layer - this is where we process/handle the http request
import { login, store, profile, favourites } from "./services/user-service.js";

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
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

//get user favourites
app.post("/favour", async (req, res) => {
    try {
        const client = await connection();
        const data = await profile(client, req.body);
        if (!data.likedMovie){
            data.likedMovie = [];
        }
        if (!data.likedTV){
            data.likedTV = [];
        }
        res.send({movie:data.likedMovie, tv: data.likedTV});
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

        return res.send(data);
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

// User Profile Route
app.post("/profile", async (req, res) => {
    try {
        const client = await connection();
        const user = await profile(client, req.body);

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



// Start the server
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})