import mongoose from 'mongoose';
import dotenv from "dotenv";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB!`);
    } catch (error) {
        throw new Error(`Database connection failed: ${error.message}`);
    }
};