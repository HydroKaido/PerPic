import express from "express";
import { User } from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwtUtils.js";

const router = express.Router();

//https://medium.com/@vahidnety/how-to-hash-password-string-in-a-mern-app-986ed03be8cf
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ error: 'Please input the field' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password is too short' });
        }

        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(200).json({ message: 'User account created', user: newUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please input all fields' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'No user available with this email' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            const token = generateToken(user);
            return res.status(200).json({ message: 'Successfully logged in', token, email: user.email });
        } else {
            return res.status(400).json({ error: 'Incorrect password' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});

export default router;
