import mongoose from "mongoose";

export const  ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoBb Connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error ${error}`);
        process.exit(1);
    }
    
}