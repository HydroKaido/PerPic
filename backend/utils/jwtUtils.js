import jwt from "jsonwebtoken";
import { secretkey } from "../configuration/jwtConfig.js";

function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
    };
    return jwt.sign(payload, secretkey, { expiresIn: "1h" });
}

export { generateToken };
