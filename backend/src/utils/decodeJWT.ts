import jwt, { Secret } from "jsonwebtoken";
import UserAuthToken from "../types/User.types/UserAuthToken.types";

const decodeJWT=(token:string)=>{
    
    const secretKey:Secret=process.env.JWT_SECRET!;         // '!' for bypassing typescript 

    if (secretKey===undefined) {             //just for extra precaution
        console.log("JWT secret key is undefined");
        return; 
    }

    const payload=jwt.verify(token,secretKey) as UserAuthToken;

    return payload;
}

export default decodeJWT;