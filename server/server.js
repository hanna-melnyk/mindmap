//server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectToDatabase} from "./configs/mongodb_connection.js";

const mainRoutes = require('./routes/main.js');


const app = express();
app.use(cors());
app.use(express.json()); //to parse json requests
dotenv.config(); //load variables from .env file


await connectToDatabase(); //connect to MongoDB

/*Routes---------------------------------------------------------*/
app.use('/', mainRoutes);




app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
});