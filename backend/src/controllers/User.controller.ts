import { Request,Response } from "express";
import UserModel from "../models/User.model";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import UserAuthToken from "../types/User.types/UserAuthToken.types";

export const userSignUp=async(req:Request,res:Response):Promise<Response>=>{

    try{
        //extract fields from the request body
        const {name,email,password}=req.body;
        
        //validation of all fields
        if(!name||!email||!password){           
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        
        //check if user is already registered
        const existingUser=await UserModel.findOne({email});    
        if(existingUser){
            return res.status(409).json({success:false,message:"Email is already registered"});
        }
        
        //hashing password
        const hashRounds=10;
        const hashedPassword=await bcrypt.hash(password,hashRounds);
        if(!hashedPassword){
            return res.status(500).json({success:false,message:"Error in hashing password, please try again later"});
        }

        //format the username to ensure consistency
        const formattedName = (name as string).replace(/\b\w/g, (char) => char.toUpperCase());   

        //finally, save the user to DB
        await UserModel.create({name:formattedName,email,password:hashedPassword,role:'user'});

        return res.status(200).json({success:true,message:"User created successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"User cannot be registration right now, please try again later"});
    }

};

export const userSignIn=async(req:Request,res:Response):Promise<Response>=>{

    try{
        //extract fields from the request body
        const {email,password}=req.body;

        //check validation of all fields
        if(!email||!password){
            return res.status(400).json({success:false,message:"All fields are required"});
        }

        //check if user exists  
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(401).json({success:false,message:"User does not exists"});
        }
        
        //verify password 
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({success:false,message:"Invalid Credentials"});
        }

        //create a jwt and send it the user  
        const payload:UserAuthToken={
            name:user.name,
            email:user.email,
            avatar:user.avatar,
            role:user.role,
        }
        const secretKey:Secret=process.env.JWT_SECRET!;         // '!' for bypassing typescript 
        const expiresIn:SignOptions={expiresIn:'24h'};

        if (secretKey===undefined) {             //just for extra precaution
            console.log("JWT secret key is undefined");
            return res.status(500).json({success: false,message:"Creating JWT failed, please try again later"});
        }
        
        const token=jwt.sign(payload,secretKey,expiresIn);
        return res.cookie("token",token,{httpOnly:true,maxAge:1*24*60*60*1000,secure:false,domain:'localhost'}).status(200).json({success:true,token:token,message:'Authentication successful'});         //the maxAge is written in milliseconds which is equal to 24hrs
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"User authentication failed, please try again later"});
    }
    
};
