import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretkey = process.env.secretkey;

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
    }
    return jwt.sign(payload, secretkey, { expiresIn: '1h' })
}

export{secretkey, generateToken}