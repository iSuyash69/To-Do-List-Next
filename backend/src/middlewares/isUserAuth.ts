import { NextFunction, Request, Response } from "express";

export const isUser=(req:Request,res:Response,next:NextFunction):void=>{
    
    try{
        if(req.body.user.role!=="user"){
            res.status(401).json({success:false,message:"Authentication failed, this is protected route only for users"});
            return;
        }

        next();     //move to the next middleware
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"User authentication failed, please try again later"});
        return; 
    }

}