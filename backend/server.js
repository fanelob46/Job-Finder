import express from "express";
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    ConnectDB();
    console.log(`Server started on http://localhost:${PORT}`)
})