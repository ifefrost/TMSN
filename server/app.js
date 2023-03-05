import * as dotenv from "dotenv";
dotenv.config()

import cors from "cors";
import express from "express";
import connection from "./resolvers/database/connection.js";
import { login, store } from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(
    cors({
        origin: '*'
    })
);

app.use(express.json())

app.get("/", (req, res) => {
    res.send({
        message: "OK",
        details: "API is up",
        statusCode: 200
    })
})

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

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})