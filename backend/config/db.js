import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env.const.js";

export const  ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error ${error.message}`);
        process.exit(1);
    }
    
}