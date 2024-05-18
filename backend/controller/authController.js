import express from "express";
import { User } from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/jwtUtils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ error : 'Username, email, and password are required'});
        }
        const emailExist = await User.findOne({ email });
        if (!password || password.length < 6) {
            return res.status(400).json({ error: "Password is too short" });
        }
        if (emailExist) {
            return res.status(400).json({ error: "Email is already exist" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const register = await User.create({
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

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'No user with this email exists' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = generateToken(user);
            console.log({token})
            return res.status(200).json({ success: 'Password is a match', token });
        } else {
            return res.status(400).json({ error: 'Password does not match' });
        }
    } catch (err) {
        console.error("Error logging in user:", err);
        return res.status(500).json('Internal Server Error');
    }
});

export default router;