import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connectDB.js';
import express from 'express';

const app = express();

const Port = process.env.PORT || 8080;
connectDB()
.then(()=>{
    app.listen(Port, ()=>{
        console.log("Express App is listening on Port ",Port);
    });
})
.catch((err)=> console.log("Connection Error: ",err));  