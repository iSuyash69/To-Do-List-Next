import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import UserAuthToken from "../../src/types/User.types/UserAuthToken.types";

export const auth=(req:Request,res:Response,next:NextFunction):void=>{

    try{
        //extract token from the request body
        const {token}=req.body;

        //check if token is defined
        if(!token){
            res.status(401).json({success:false,message:"Token is missing"});
            return;
        }

        //verify the token
        const secretKey:Secret=process.env.JWT_SECRET!;         // '!' for bypassing typescript 

        if (secretKey===undefined) {             //just for extra precaution
            console.log("JWT secret key is undefined");
            res.status(500).json({success: false,message:"Verifying JWT failed, please try again later"});
            return;
        }

        const payload=jwt.verify(token,secretKey) as UserAuthToken;
        if(!payload){
            res.status(403).json({success: false,message:"Invalid JWT"});
            return;
        }
        //Add the payload data decoded from the JWT in req
        req.body.user=payload;

        next();     //move to the next middleware
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Authentication failed, please try again later"});
        return;
    }

}