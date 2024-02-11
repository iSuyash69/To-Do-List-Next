import { Schema, model } from "mongoose";
import User from "../types/User.types/User.types";

const userSchema:Schema<User>=new Schema({
    name:{
        type:String,
        required:true,     
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:null,
    },
    role:{
        type:String,
        enum:["admin","user","visitor"],    
    },
},{timestamps:true});

const UserModel=model<User>('User',userSchema);

export default UserModel;