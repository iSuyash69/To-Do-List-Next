import jwt, { Secret } from "jsonwebtoken";
import UserAuthToken from "../types/User.types/UserAuthToken.types";

const decodeJWT=(token:string):UserAuthToken|null=>{

    const secretKey:Secret=process.env.JWT_SECRET!;         // '!' for bypassing typescript 

    if (secretKey===undefined) {             //just for extra precaution
        console.log("JWT secret key is undefined");
        return null;
    }
     
    try{
        const payload=jwt.verify(token,secretKey) as UserAuthToken;
        return payload;
    }
    catch(error){
        console.error("JWT verification failed:", error);
        return null;
    }
};

export default decodeJWT;