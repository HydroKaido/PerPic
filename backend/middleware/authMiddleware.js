import jwt from "jsonwebtoken";
import { secretkey } from "../configuration/jwtConfig.js";

function authenticateToken( req, res, next){
    const authHeader = req.header("Authorization");

    if(!authHeader) {
        return res.status(400).json({message: "Unauthorized: Missing token!"})
    }
    const [bearer, token] = authHeader.split(" ");

    if(bearer !== "Bearer" || !token){
        return res.status(401).json({message: "Unauthorized: Invalid token format"})
    }
    jwt.verify(token, secretkey, (err, user) => {
        if(err){
            return res.status(402).json({message: "Unauthorized: Invalid token"})
        }
        req.user = user;
        next()
    })
    
}

function verifyToken(token){
    return jwt.verify(token, secretkey)
}

export {authenticateToken, verifyToken}