import express,{Express} from "express";
import {Server} from "http";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./adapters/MongoDB.adapter";

//Initialize Express server
const app:Express=express();

//Initialize CORS
app.use(cors());

//Setup ENV
dotenv.config();

//Connect to DB
connectToMongoDB();

//Setup Middleware for parsing incoming requests
app.use(express.json());

//Initialize Port
const port:number=Number(process.env.PORT || 5000);

//Import Routes
import user from "./routes/User.routes";

//-----------------------------Routes----------------------------------

app.use("/user",user);

//Start the Express server
const server:Server=app.listen(port,()=>{
    console.log(`🚀 Server is running on port ${port}`);
});

