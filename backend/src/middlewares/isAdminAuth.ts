import { NextFunction, Request, Response } from "express";
import decodeJWT from "../utils/decodeJWT";

export const isAdmin=(req:Request,res:Response,next:NextFunction):void=>{
    
    try{
        //extract token from the request body
        const {token}=req.body;

        //check if token is defined
        if(!token){
            res.status(401).json({success:false,message:"Token is missing"});
            return;
        }

        //verify the token
        const payload=decodeJWT(token);
        console.log(payload);
        if(!payload){
            res.status(403).json({success:false,message:"Authentication failed, please try again later"});
            return;
        }
        //Add the payload data decoded from the JWT in req
        req.body.user=payload; 
        
        //check if role of user is valid for the route
        if(req.body.user.role!=="admin"){
            res.status(401).json({success:false,message:"Authentication failed, this is protected route only for admins"});
            return;
        }

        next();     //move to the request handler
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Admin authentication failed, please try again later"});
        return; 
    }

}