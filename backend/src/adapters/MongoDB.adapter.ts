import mongoose, { Connection } from "mongoose";

const connectToMongoDB=async():Promise<Connection>=>{

    const MONGODB_URL=process.env.MONGODB_URL;

    if(!MONGODB_URL){
        console.log("MONGODB_URL not found");
        process.exit(1);
    }

    try{
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB");
        return mongoose.connection;
         
    }
    catch(error){
        console.log("Error connecting to MongoDB",error);
        process.exit(1);
    }

};

export default connectToMongoDB;