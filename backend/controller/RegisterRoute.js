import express from "express";
import { Register } from '../models/RegisterModel.js'
import bcrypt from 'bcrypt'

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ error : 'Username, email, and password are required'});
        }
        const emailExist = await Register.findOne({ email });
        if (!password || password.length < 6) {
            return res.status(400).json({ error: "Password is too short" });
        }
        if (emailExist) {
            return res.status(400).json({ error: "Email is already exist" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const register = await Register.create({
            email,
            username,
            password: hashpassword
        });
        return res.status(200).json({ message: 'Your account is now registered', register });
    } catch (err) {
        console.error("Error registering user:", err);
        return res.status(500).json('Internal Server Error');
    }
});


export default router;