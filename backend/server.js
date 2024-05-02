import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { router_1, router_2 } from "./router.js";
import { connectToDatabase } from "./database_connection.js";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
    path: "./backend/config.env"
})

connectToDatabase()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("*", cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser())
// app.use(router_1)
app.use("/api/v1", router_2)

app.use(express.static(path.join(__dirname, "../frontend/build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on : http://localhost:${process.env.PORT}`)
})