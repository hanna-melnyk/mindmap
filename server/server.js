//server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mindmapRoutes from "./routes/mindmapRoutes.js";
import mainRoutes from "./routes/mainRoutes.js";
import mongoose from "mongoose";


const app = express();
app.use(cors());
app.use(express.json()); //to parse json requests
dotenv.config(); //load variables from .env file

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB!`);
    } catch (error) {
        throw new Error(`Database connection failed: ${error.message}`);
    }
};

connectToDatabase(); //connect to MongoDB

/*Routes---------------------------------------------------------*/
app.use('/', mainRoutes);
app.use('/api/mindmaps', mindmapRoutes);




app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
});