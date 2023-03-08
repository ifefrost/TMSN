import * as dotenv from "dotenv";
dotenv.config()

import cors from "cors";
import express from "express";

// Database connection
import connection from "./resolvers/database/connection.js";

// Service layer - this is where we process/handle the http request
import { login, store, profile } from "./services/user-service.js";

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

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})