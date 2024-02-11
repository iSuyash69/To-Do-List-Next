import { NextFunction, Request, Response } from "express";

export const isAdmin=(req:Request,res:Response,next:NextFunction):void=>{
    
    try{
        if(req.body.user.token!=="admin"){
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