import jwt from "jsonwebtoken";
import { secretkey } from "../utils/jwtUtils.js";

const authenticateToken = (req, res, next) => {
    //Header need to be authorization to identify if the header
    const authHeader = req.header('Authorization');
    //if no authorization created
    if(!authHeader){
        return res.status(401).json({message: 'Missing Token please provide!'});
    }
    //seperate the bearer<token> to bearer <token>
    const [bearer, token] = authHeader.split(" ");
    //authentication if the token is not Bearer and then no token
    if(bearer !== 'Bearer' || !token){
        return res.status(401).json({message: 'Invalid format token'});
    }
    jwt.verify(token, secretkey, (err, decoded) => {
        //display invalid token
        if(err){
            return res.status(401).json({message: 'Invalid token'})
        }
        // Add the decoded information to the request object
        req.user = decoded
        //goes to next middleware
        next();
    })
}

const verification = (token, secretkey) => {
    return jwt.verify(token, secretkey)
}

export {authenticateToken, verification}